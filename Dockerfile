# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 solidjs

# Copy built application
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/public ./public

# Create data directory for SQLite
RUN mkdir -p /app/data && chown solidjs:nodejs /app/data

# Set ownership
RUN chown -R solidjs:nodejs /app

USER solidjs

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["bun", "run", ".output/server/index.mjs"]
