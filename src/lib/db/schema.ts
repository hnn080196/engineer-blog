// Database Schema Types

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[] // JSON array
  featured_image: string | null
  cover_image: string | null // alias for featured_image
  status: 'draft' | 'published' | 'scheduled'
  publish_date: string | null
  created_at: string
  updated_at: string
  views: number
}

export interface Project {
  id: number
  slug: string
  title: string
  description: string
  content: string
  tags: string // JSON array stored as string
  featured_image: string | null
  demo_url: string | null
  github_url: string | null
  status: 'draft' | 'published'
  order_index: number
  created_at: string
  updated_at: string
}

export interface Session {
  id: string
  expires_at: number
  created_at: string
}

export interface SiteSettings {
  key: string
  value: string
}

// SQL Schema Initialization
export const SCHEMA_SQL = `
-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Uncategorized',
  tags TEXT NOT NULL DEFAULT '[]',
  featured_image TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  views INTEGER NOT NULL DEFAULT 0
);

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_publish_date ON posts(publish_date);

-- Full-text search for posts
CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
  title,
  excerpt,
  content,
  tags,
  content='posts',
  content_rowid='id'
);

-- Triggers to keep FTS in sync
CREATE TRIGGER IF NOT EXISTS posts_ai AFTER INSERT ON posts BEGIN
  INSERT INTO posts_fts(rowid, title, excerpt, content, tags)
  VALUES (new.id, new.title, new.excerpt, new.content, new.tags);
END;

CREATE TRIGGER IF NOT EXISTS posts_ad AFTER DELETE ON posts BEGIN
  INSERT INTO posts_fts(posts_fts, rowid, title, excerpt, content, tags)
  VALUES ('delete', old.id, old.title, old.excerpt, old.content, old.tags);
END;

CREATE TRIGGER IF NOT EXISTS posts_au AFTER UPDATE ON posts BEGIN
  INSERT INTO posts_fts(posts_fts, rowid, title, excerpt, content, tags)
  VALUES ('delete', old.id, old.title, old.excerpt, old.content, old.tags);
  INSERT INTO posts_fts(rowid, title, excerpt, content, tags)
  VALUES (new.id, new.title, new.excerpt, new.content, new.tags);
END;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  tags TEXT NOT NULL DEFAULT '[]',
  featured_image TEXT,
  demo_url TEXT,
  github_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`
