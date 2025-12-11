# Personal Blog Implementation Plan

**Project**: SolidStart Personal Blog with IT Concept
**Created**: 2025-12-11
**Stack**: SolidStart + Bun + TypeScript + SQLite + TipTap
**Deployment**: Docker + Caddy + Self-hosted VPS

## Project Summary

Modern personal blog platform featuring MDX content, admin panel with TipTap editor, session-based auth, SQLite database, and optimized SEO. Clean minimalist design with light/dark mode toggle.

**Core Features**:
- Public: Home, blog list (paginated/searchable/tags), MDX posts, projects, about
- Admin: Dashboard, posts/projects CRUD, TipTap editor with image upload
- Technical: SSG posts, ISG lists, sitemap, RSS, OpenGraph, JSON-LD

## Architecture Overview

```
├── src/
│   ├── routes/          # SolidStart file-based routing
│   ├── components/      # Reusable UI components
│   ├── lib/            # Core utilities, MDX, DB
│   ├── server/         # API routes, auth middleware
│   └── styles/         # Global CSS, theme
├── content/            # MDX blog posts
├── public/             # Static assets
└── db/                # SQLite database
```

## Implementation Phases

| Phase | Status | Description | Est. Days |
|-------|--------|-------------|-----------|
| [Phase 01](./phase-01-project-setup.md) | ⏸️ Pending | Project initialization, tooling, structure | 1 |
| [Phase 02](./phase-02-database-content.md) | ⏸️ Pending | SQLite schema, MDX loader, indexing | 2 |
| [Phase 03](./phase-03-public-pages.md) | ⏸️ Pending | Blog, portfolio, home page rendering | 3 |
| [Phase 04](./phase-04-admin-auth.md) | ⏸️ Pending | Session auth, Argon2, middleware | 2 |
| [Phase 05](./phase-05-admin-panel.md) | ⏸️ Pending | Dashboard, CRUD operations | 2 |
| [Phase 06](./phase-06-editor.md) | ⏸️ Pending | TipTap integration, image handling | 3 |
| [Phase 07](./phase-07-seo-performance.md) | ⏸️ Pending | Meta tags, sitemap, RSS, optimization | 2 |
| [Phase 08](./phase-08-deployment.md) | ⏸️ Pending | Docker, Caddy, VPS deployment | 2 |

**Total Estimated**: 17 days

## Key Decisions

1. **SolidStart over Next.js**: Better TS support, simpler mental model, reactive primitives
2. **SQLite over Postgres**: Single-admin use case, zero-config, simpler deployment
3. **MDX files over CMS**: Version-controlled content, developer-friendly workflow
4. **Session auth over JWT**: Stateful sessions better for single admin, easier revocation
5. **TipTap over Monaco**: Richer editing UX, better image handling, WYSIWYG

## Success Criteria

- [ ] Blog posts render with syntax highlighting
- [ ] Search and tag filtering work smoothly
- [ ] Admin can create/edit posts via TipTap editor
- [ ] Images upload and display correctly
- [ ] SEO meta tags present on all pages
- [ ] Lighthouse score >90 performance
- [ ] Deploys successfully via Docker

## Risk Assessment

**High Risk**:
- TipTap SolidJS integration (unofficial wrapper may need custom work)
- Image upload handling (S3 vs local storage decision)

**Medium Risk**:
- MDX + SQLite sync mechanism (rebuild index on content change)
- VPS security hardening (Caddy config, firewall rules)

**Low Risk**:
- Auth implementation (well-documented patterns)
- SolidStart SSG/ISG (native support)

## Next Steps

1. Review and approve this plan
2. Start Phase 01: Project Setup
3. Initialize git repo with proper .gitignore
4. Set up development environment
