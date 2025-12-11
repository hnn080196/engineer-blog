# Tech Stack

## Core Framework
| Component | Technology | Version |
|-----------|------------|---------|
| Runtime | Bun | 1.0+ |
| Framework | SolidStart | Latest |
| Language | TypeScript | 5.x |

## Content & Admin
| Component | Technology |
|-----------|------------|
| Content Storage | MDX files + SQLite index |
| Editor | TipTap (headless) with SolidJS wrapper |
| Image Processing | Sharp (AVIF/WebP) |

## Auth & Database
| Component | Technology |
|-----------|------------|
| Authentication | Session-based + Argon2 |
| Database | SQLite (better-sqlite3) |
| Session Storage | SQLite |

## Deployment
| Component | Technology |
|-----------|------------|
| Container | Docker + Bun image |
| Reverse Proxy | Caddy (auto HTTPS) |
| Target | Self-hosted VPS |

## Key Dependencies
```json
{
  "solid-js": "^1.8.x",
  "solid-start": "^1.x",
  "@tiptap/core": "^2.x",
  "@tiptap/pm": "^2.x",
  "better-sqlite3": "^9.x",
  "sharp": "^0.33.x",
  "@node-rs/argon2": "^1.x",
  "marked": "^12.x"
}
```

## Architecture
```
/src
├── routes/           # File-based routing
│   ├── index.tsx     # Portfolio home (SSG)
│   ├── blog/         # Blog pages (SSG/ISG)
│   ├── projects/     # Portfolio projects
│   ├── admin/        # Protected admin panel
│   └── api/          # API endpoints
├── components/       # Reusable components
├── lib/              # Utilities, content loader
├── server/           # Server-side logic, DB
└── posts/            # MDX content files
```

## Performance Targets
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- TTFB: < 200ms
