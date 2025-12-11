# Phase 02: Database & Content

**Related**: [Phase 01: Project Setup](./phase-01-project-setup.md) ← → [Phase 03: Public Pages](./phase-03-public-pages.md)

## Overview

**Date**: 2025-12-11
**Priority**: Critical
**Status**: ⏸️ Pending
**Estimated Time**: 2 days

Create SQLite schema for blog metadata, implement MDX loader/processor, build content indexing system.

## Key Insights

- SQLite full-text search (FTS5) provides fast blog search
- MDX frontmatter stores metadata (title, date, tags, excerpt)
- Separate content files from database index for version control
- On-demand indexing avoids build-time complexity

## Requirements

### Functional
- Parse MDX files with frontmatter
- Store post metadata in SQLite
- Support full-text search on title/excerpt/content
- Tag filtering and pagination
- Sync filesystem changes to database

### Technical
- better-sqlite3 for sync operations
- MDX parser with frontmatter support
- FTS5 virtual table for search
- File watcher for dev mode auto-sync

## Architecture Decisions

### Database Schema
```sql
-- posts table: metadata index
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_path TEXT NOT NULL,
  published_date TEXT NOT NULL,
  updated_date TEXT,
  draft BOOLEAN DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- tags table
CREATE TABLE tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- post_tags junction table
CREATE TABLE post_tags (
  post_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- FTS5 virtual table for search
CREATE VIRTUAL TABLE posts_fts USING fts5(
  slug,
  title,
  excerpt,
  content,
  content=posts,
  content_rowid=id
);

-- projects table
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT, -- JSON array
  demo_url TEXT,
  repo_url TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### MDX Frontmatter Format
```yaml
---
title: "Building a Blog with SolidStart"
slug: "solidstart-blog-tutorial"
excerpt: "Learn how to build a modern blog..."
published: 2025-12-11
updated: 2025-12-11
tags: [solidjs, typescript, tutorial]
draft: false
cover: "/images/covers/solidstart-blog.jpg"
---
```

## Implementation Steps

### 1. Install MDX Dependencies
```bash
bun add @mdx-js/rollup remark-frontmatter remark-mdx-frontmatter
bun add shiki gray-matter
```

### 2. Create Database Client
**`src/lib/db/client.ts`**:
```ts
import Database from 'better-sqlite3'

const db = new Database(process.env.DATABASE_PATH!)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export { db }
```

### 3. Create Migration System
**`src/lib/db/migrations.ts`**:
```ts
export function runMigrations(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (...);
    CREATE TABLE IF NOT EXISTS tags (...);
    CREATE TABLE IF NOT EXISTS post_tags (...);
    CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(...);
    CREATE TABLE IF NOT EXISTS projects (...);
  `)
}
```

### 4. Build MDX Processor
**`src/lib/mdx/processor.ts`**:
```ts
import matter from 'gray-matter'
import { compile } from '@mdx-js/mdx'
import { getHighlighter } from 'shiki'

export async function processMDX(filePath: string) {
  const raw = await Bun.file(filePath).text()
  const { data: frontmatter, content } = matter(raw)

  const compiled = await compile(content, {
    remarkPlugins: [/* syntax highlighting */],
  })

  return { frontmatter, compiled }
}
```

### 5. Create Content Indexer
**`src/lib/mdx/indexer.ts`**:
```ts
import { db } from '../db/client'
import { processMDX } from './processor'
import { glob } from 'glob'

export async function indexAllPosts() {
  const files = await glob('content/blog/**/*.mdx')

  for (const file of files) {
    const { frontmatter, compiled } = await processMDX(file)

    // Insert/update post in database
    db.prepare(`
      INSERT INTO posts (slug, title, excerpt, content_path, published_date, draft)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        excerpt = excluded.excerpt,
        updated_date = excluded.published_date
    `).run(
      frontmatter.slug,
      frontmatter.title,
      frontmatter.excerpt,
      file,
      frontmatter.published,
      frontmatter.draft ? 1 : 0
    )

    // Index tags
    for (const tag of frontmatter.tags || []) {
      // Insert tag and create post_tags relation
    }

    // Update FTS index
    db.prepare(`
      INSERT INTO posts_fts (slug, title, excerpt, content)
      VALUES (?, ?, ?, ?)
    `).run(frontmatter.slug, frontmatter.title, frontmatter.excerpt, compiled)
  }
}
```

### 6. Create Database Query Helpers
**`src/lib/db/queries.ts`**:
```ts
export function getPublishedPosts(limit = 10, offset = 0) {
  return db.prepare(`
    SELECT * FROM posts
    WHERE draft = 0
    ORDER BY published_date DESC
    LIMIT ? OFFSET ?
  `).all(limit, offset)
}

export function searchPosts(query: string) {
  return db.prepare(`
    SELECT posts.* FROM posts_fts
    JOIN posts ON posts_fts.rowid = posts.id
    WHERE posts_fts MATCH ?
    ORDER BY rank
  `).all(query)
}

export function getPostsByTag(tagSlug: string) {
  return db.prepare(`
    SELECT p.* FROM posts p
    JOIN post_tags pt ON p.id = pt.post_id
    JOIN tags t ON pt.tag_id = t.id
    WHERE t.slug = ? AND p.draft = 0
    ORDER BY p.published_date DESC
  `).all(tagSlug)
}
```

### 7. Create Build Script
**`scripts/build-index.ts`**:
```ts
import { runMigrations } from '../src/lib/db/migrations'
import { indexAllPosts } from '../src/lib/mdx/indexer'
import { db } from '../src/lib/db/client'

runMigrations(db)
await indexAllPosts()
console.log('✓ Content indexed')
process.exit(0)
```

Add to `package.json`:
```json
{
  "scripts": {
    "index": "bun run scripts/build-index.ts"
  }
}
```

## Related Code Files

**New Files**:
- `src/lib/db/client.ts` - SQLite client instance
- `src/lib/db/migrations.ts` - Schema migrations
- `src/lib/db/queries.ts` - Database query helpers
- `src/lib/mdx/processor.ts` - MDX compilation
- `src/lib/mdx/indexer.ts` - Content indexing logic
- `scripts/build-index.ts` - CLI indexer script

**Modified Files**:
- `package.json` - Add `index` script

## Todo Checklist

- [ ] Install MDX and database dependencies
- [ ] Create SQLite database client
- [ ] Write migration system
- [ ] Implement MDX processor with frontmatter
- [ ] Build content indexer
- [ ] Create database query helpers
- [ ] Add syntax highlighting (shiki)
- [ ] Create build script for indexing
- [ ] Test with sample MDX files
- [ ] Verify FTS5 search works

## Success Criteria

- ✅ MDX files parse with frontmatter
- ✅ Posts inserted into SQLite correctly
- ✅ Full-text search returns relevant results
- ✅ Tag filtering works
- ✅ `bun run index` rebuilds database
- ✅ No N+1 queries in post listing

## Risk Assessment

**Medium Risk**: MDX + SQLite sync complexity

**Mitigation**:
- Run indexer as prebuild step
- Add file watcher for dev mode
- Log errors during indexing
- Validate frontmatter schema

## Next Steps

→ Proceed to [Phase 03: Public Pages](./phase-03-public-pages.md) to build blog rendering.
