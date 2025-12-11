# Phase 08: Deployment

**Related**: [Phase 07: SEO & Performance](./phase-07-seo-performance.md) ← [Plan Overview](./plan.md)

## Overview

**Date**: 2025-12-11
**Priority**: Critical
**Status**: ⏸️ Pending
**Estimated Time**: 2 days

Containerize application with Docker, configure Caddy reverse proxy with auto HTTPS, and deploy to self-hosted VPS.

## Key Insights

- Docker ensures consistent environment
- Caddy provides automatic HTTPS (Let's Encrypt)
- SQLite simplifies database deployment (no separate server)
- Multi-stage build reduces image size
- Health checks ensure uptime

## Requirements

### Deployment
- Docker container with Bun runtime
- Caddy reverse proxy with auto HTTPS
- Automatic SSL certificate renewal
- Environment variable management
- Database persistence via volumes
- Automated deployment via GitHub Actions (optional)

### Security
- Firewall rules (UFW)
- Non-root Docker user
- Secure session secrets
- Rate limiting
- HTTPS-only

## Architecture Decisions

### Deployment Stack
```
VPS (Ubuntu 22.04)
├── Docker
│   └── App Container (Bun + SolidStart)
├── Caddy (Port 80/443)
│   └── Reverse Proxy to :3000
├── SQLite (Volume mount)
└── Uploads (Volume mount)
```

### CI/CD Flow (Optional)
```
Git Push → GitHub Actions → Build Docker Image → Push to Registry → SSH to VPS → Pull & Restart
```

## Implementation Steps

### 1. Create Dockerfile
**`Dockerfile`**:
```dockerfile
# Multi-stage build
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source
COPY . .

# Build application
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy built app
COPY --from=builder /app/.output ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/db ./db
COPY --from=builder /app/content ./content

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 bunuser && \
    chown -R bunuser:nodejs /app

USER bunuser

EXPOSE 3000

ENV NODE_ENV=production

CMD ["bun", "run", "start"]
```

### 2. Create Docker Compose
**`docker-compose.yml`**:
```yaml
version: '3.8'

services:
  app:
    build: .
    restart: unless-stopped
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_PATH=/app/data/blog.db
      - SESSION_SECRET=${SESSION_SECRET}
      - ADMIN_EMAIL=${ADMIN_EMAIL}
    volumes:
      - ./data:/app/data
      - ./uploads:/app/public/uploads
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/api/health']
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  caddy:
    image: caddy:2-alpine
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - app

volumes:
  caddy_data:
  caddy_config:
```

### 3. Create Caddyfile
**`Caddyfile`**:
```
yourdomain.com {
    reverse_proxy app:3000

    encode gzip

    # Security headers
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        X-XSS-Protection "1; mode=block"
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Rate limiting
    rate_limit {
        zone static {
            key {remote_host}
            events 100
            window 1m
        }
    }

    # Cache static assets
    @static {
        path *.js *.css *.png *.jpg *.jpeg *.webp *.svg *.ico
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Logs
    log {
        output file /var/log/caddy/access.log
        format json
    }
}
```

### 4. Create Health Check Endpoint
**`src/routes/api/health.ts`**:
```ts
import { json } from '@solidjs/router'
import { db } from '~/lib/db/client'

export async function GET() {
  try {
    // Check database connection
    db.prepare('SELECT 1').get()

    return json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  } catch (error) {
    return json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 503 }
    )
  }
}
```

### 5. Create Environment Template
**`.env.production.example`**:
```env
NODE_ENV=production
DATABASE_PATH=/app/data/blog.db
SESSION_SECRET=generate-secure-random-string-here
ADMIN_EMAIL=admin@yourdomain.com
BASE_URL=https://yourdomain.com
```

### 6. VPS Setup Script
**`scripts/vps-setup.sh`**:
```bash
#!/bin/bash

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Setup firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# Create app directory
mkdir -p ~/blog
cd ~/blog

# Clone repository
git clone https://github.com/yourusername/engineer-blog.git .

# Create data directories
mkdir -p data uploads

# Copy environment file
cp .env.production.example .env.local
# Edit .env.local with actual values

# Build and start
docker-compose up -d

# Create admin user
docker-compose exec app bun run create-admin admin@yourdomain.com your-password

echo "✓ Deployment complete!"
echo "Visit https://yourdomain.com"
```

### 7. Create Deploy Script
**`scripts/deploy.sh`**:
```bash
#!/bin/bash

# Pull latest code
git pull origin main

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Run migrations
docker-compose exec app bun run migrate

# Rebuild content index
docker-compose exec app bun run index

# Check health
sleep 5
curl -f http://localhost:3000/api/health || exit 1

echo "✓ Deployment successful!"
```

### 8. GitHub Actions Workflow (Optional)
**`.github/workflows/deploy.yml`**:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/blog
            bash scripts/deploy.sh
```

### 9. Add Backup Script
**`scripts/backup.sh`**:
```bash
#!/bin/bash

DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="$HOME/backups"

mkdir -p $BACKUP_DIR

# Backup database
cp data/blog.db $BACKUP_DIR/blog-$DATE.db

# Backup uploads
tar -czf $BACKUP_DIR/uploads-$DATE.tar.gz uploads/

# Keep only last 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

echo "✓ Backup completed: $DATE"
```

Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * /home/user/blog/scripts/backup.sh
```

## Related Code Files

**New Files**:
- `Dockerfile` - Container definition
- `docker-compose.yml` - Service orchestration
- `Caddyfile` - Reverse proxy config
- `src/routes/api/health.ts` - Health check endpoint
- `.env.production.example` - Production env template
- `scripts/vps-setup.sh` - Initial VPS setup
- `scripts/deploy.sh` - Deployment script
- `scripts/backup.sh` - Backup automation
- `.github/workflows/deploy.yml` - CI/CD workflow

## Todo Checklist

- [ ] Create Dockerfile with multi-stage build
- [ ] Create docker-compose.yml
- [ ] Configure Caddyfile
- [ ] Create health check endpoint
- [ ] Prepare environment variables
- [ ] Setup VPS (Ubuntu, Docker, UFW)
- [ ] Configure domain DNS (A record)
- [ ] Deploy application
- [ ] Verify HTTPS works
- [ ] Create admin user
- [ ] Test admin login
- [ ] Setup backup cron job
- [ ] Configure monitoring (optional)
- [ ] Test deployment script

## Success Criteria

- ✅ Application accessible via HTTPS
- ✅ SSL certificate auto-renews
- ✅ Docker container runs without errors
- ✅ Health check endpoint returns 200
- ✅ Admin panel accessible
- ✅ Database persists across restarts
- ✅ Uploads persist across restarts
- ✅ Backup script runs successfully
- ✅ No security warnings in browser

## Risk Assessment

**Medium Risk**: VPS security, data persistence

**Mitigation**:
- Enable UFW firewall
- Use non-root Docker user
- Regular security updates
- Automated backups
- Monitor logs for attacks
- Use strong session secrets
- Enable Fail2Ban (optional)

## Deployment Checklist

### Pre-deployment
- [ ] Review all environment variables
- [ ] Generate strong session secret
- [ ] Configure domain DNS
- [ ] Test build locally

### Deployment
- [ ] SSH into VPS
- [ ] Run setup script
- [ ] Verify containers running
- [ ] Create admin user
- [ ] Test admin login
- [ ] Check logs for errors

### Post-deployment
- [ ] Verify HTTPS working
- [ ] Test all public pages
- [ ] Test admin CRUD operations
- [ ] Verify sitemap/RSS accessible
- [ ] Setup monitoring
- [ ] Configure backups
- [ ] Document deployment process

## Monitoring & Maintenance

**Daily**:
- Check application logs: `docker-compose logs -f app`
- Monitor disk usage: `df -h`

**Weekly**:
- Review access logs
- Check for security updates
- Test backup restoration

**Monthly**:
- Update dependencies: `bun update`
- Review performance metrics
- Optimize database: `VACUUM`

## Unresolved Questions

- Use S3 for image uploads in future?
- Add CDN (Cloudflare) for static assets?
- Implement monitoring (Grafana/Prometheus)?
- Add search analytics (Plausible)?

## Next Steps

1. Review and approve this plan
2. Begin Phase 01: Project Setup
3. Follow phases sequentially
4. Test thoroughly at each phase
5. Deploy to production after Phase 08 complete
