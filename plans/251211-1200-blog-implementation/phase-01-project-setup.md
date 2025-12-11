# Phase 01: Project Setup

**Related**: [Plan Overview](./plan.md) → Phase 02: [Database & Content](./phase-02-database-content.md)

## Overview

**Date**: 2025-12-11
**Priority**: Critical
**Status**: ⏸️ Pending
**Estimated Time**: 1 day

Initialize SolidStart project with Bun, configure TypeScript, establish folder structure, and set up development tooling.

## Key Insights

- Bun runtime provides faster install/build times vs npm/yarn
- SolidStart supports both SSG and ISG out of the box
- TypeScript strict mode catches errors early
- Flat folder structure aids navigation for small projects

## Requirements

### Functional
- SolidStart app runs on `bun dev`
- TypeScript compiles without errors
- Hot module reload works
- Environment variables load correctly

### Technical
- Bun v1.0+
- SolidStart v0.5+
- TypeScript v5.3+
- Node v20+ (fallback compatibility)

## Architecture Decisions

### Tech Stack Rationale
| Choice | Reason |
|--------|--------|
| Bun | 3x faster than npm, native TS support, all-in-one tool |
| SolidStart | Better TS inference than Next.js, simpler API |
| better-sqlite3 | Synchronous API, zero dependencies, fast |
| Vitest | Native ESM support, fast, SolidJS compatible |

### Folder Structure
```
engineer-blog/
├── src/
│   ├── routes/              # File-based routing
│   │   ├── index.tsx        # Home page
│   │   ├── blog/
│   │   │   ├── index.tsx    # Blog list
│   │   │   └── [slug].tsx   # Post detail
│   │   ├── admin/
│   │   │   ├── login.tsx
│   │   │   └── dashboard/
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── layout/
│   │   ├── blog/
│   │   └── admin/
│   ├── lib/
│   │   ├── db/              # SQLite client
│   │   ├── mdx/             # MDX processor
│   │   ├── auth/            # Session management
│   │   └── utils/
│   ├── server/
│   │   └── middleware/      # Auth middleware
│   └── styles/
│       ├── global.css
│       └── theme.css
├── content/
│   └── blog/                # MDX files
├── public/
│   └── uploads/             # User-uploaded images
├── db/
│   └── blog.db              # SQLite database
├── .env.example
├── .env.local
├── tsconfig.json
└── bun.config.ts
```

## Implementation Steps

### 1. Initialize Project
```bash
bun create solid
cd engineer-blog
bun install
```

### 2. Configure TypeScript
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "jsxImportSource": "solid-js",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### 3. Install Core Dependencies
```bash
bun add better-sqlite3 @node-rs/argon2
bun add -d @types/better-sqlite3
```

### 4. Create Folder Structure
```bash
mkdir -p src/{routes/{blog,admin,api},components/{layout,blog,admin},lib/{db,mdx,auth,utils},server/middleware,styles}
mkdir -p content/blog public/uploads db
```

### 5. Setup Environment Variables
Create `.env.example`:
```env
NODE_ENV=development
DATABASE_PATH=./db/blog.db
SESSION_SECRET=generate-random-32-char-string
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD_HASH=will-be-generated
```

Copy to `.env.local` and fill in values.

### 6. Create Base Config Files
**`app.config.ts`**:
```ts
import { defineConfig } from '@solidjs/start/config'

export default defineConfig({
  ssr: true,
  server: {
    preset: 'bun',
  },
})
```

### 7. Update `.gitignore`
```
node_modules/
.solid/
dist/
.env.local
db/*.db
db/*.db-*
public/uploads/*
!public/uploads/.gitkeep
.DS_Store
```

### 8. Create Basic Layout Component
**`src/components/layout/base-layout.tsx`**:
```tsx
import { ParentComponent } from 'solid-js'

export const BaseLayout: ParentComponent = (props) => {
  return (
    <div class="min-h-screen">
      <header>
        <nav>{/* Nav items */}</nav>
      </header>
      <main>{props.children}</main>
      <footer>{/* Footer */}</footer>
    </div>
  )
}
```

### 9. Verify Setup
```bash
bun run dev
```
Visit `http://localhost:3000` to confirm app runs.

## Related Code Files

**New Files**:
- `src/routes/index.tsx` - Home page placeholder
- `src/components/layout/base-layout.tsx` - Layout wrapper
- `tsconfig.json` - TypeScript config
- `app.config.ts` - SolidStart config
- `.env.example` - Environment template
- `.gitignore` - Git exclusions

## Todo Checklist

- [ ] Initialize SolidStart project with Bun
- [ ] Configure TypeScript strict mode
- [ ] Create folder structure
- [ ] Install core dependencies (sqlite3, argon2)
- [ ] Setup environment variables
- [ ] Create base layout component
- [ ] Verify dev server runs
- [ ] Create `.gitignore` with proper exclusions
- [ ] Commit initial setup

## Success Criteria

- ✅ `bun dev` starts dev server on port 3000
- ✅ TypeScript compiles without errors
- ✅ Hot reload works when editing files
- ✅ All folders exist per structure
- ✅ Environment variables load from `.env.local`
- ✅ Git repo initialized with clean status

## Risk Assessment

**Low Risk**: SolidStart and Bun are stable, well-documented. Standard setup process.

**Mitigation**:
- Follow official SolidStart starter template
- Use LTS versions of all tools
- Test basic routing before proceeding

## Next Steps

→ Proceed to [Phase 02: Database & Content](./phase-02-database-content.md) to create SQLite schema and MDX loader.
