import Database from 'better-sqlite3'
import { SCHEMA_SQL, type Post, type Project, type Session } from './schema'

// Raw post from database (tags as string)
interface RawPost extends Omit<Post, 'tags' | 'cover_image' | 'id'> {
  id: number
  tags: string
}

// Map raw DB post to Post type
function mapPost(raw: RawPost): Post {
  return {
    ...raw,
    id: String(raw.id),
    tags: JSON.parse(raw.tags || '[]'),
    cover_image: raw.featured_image,
  }
}

// Database singleton
let db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = process.env.DATABASE_PATH || './db/blog.db'
    db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')

    // Initialize schema
    db.exec(SCHEMA_SQL)
  }
  return db
}

// Posts Repository
export const posts = {
  getAll(options?: { status?: string; limit?: number; offset?: number }) {
    const db = getDb()
    let sql = 'SELECT * FROM posts'
    const params: unknown[] = []

    if (options?.status) {
      sql += ' WHERE status = ?'
      params.push(options.status)
    }

    sql += ' ORDER BY publish_date DESC, created_at DESC'

    if (options?.limit) {
      sql += ' LIMIT ?'
      params.push(options.limit)
      if (options?.offset) {
        sql += ' OFFSET ?'
        params.push(options.offset)
      }
    }

    const rows = db.prepare(sql).all(...params) as RawPost[]
    return rows.map(mapPost)
  },

  getBySlug(slug: string) {
    const db = getDb()
    const row = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as RawPost | undefined
    return row ? mapPost(row) : undefined
  },

  getById(id: string | number) {
    const db = getDb()
    const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id) as RawPost | undefined
    return row ? mapPost(row) : undefined
  },

  getByCategory(category: string) {
    const db = getDb()
    const rows = db.prepare('SELECT * FROM posts WHERE category = ? AND status = ? ORDER BY publish_date DESC')
      .all(category, 'published') as RawPost[]
    return rows.map(mapPost)
  },

  search(query: string) {
    const db = getDb()
    const rows = db.prepare(`
      SELECT p.* FROM posts p
      JOIN posts_fts ON p.id = posts_fts.rowid
      WHERE posts_fts MATCH ?
      AND p.status = 'published'
      ORDER BY rank
      LIMIT 20
    `).all(query) as RawPost[]
    return rows.map(mapPost)
  },

  getCategories() {
    const db = getDb()
    return db.prepare(`
      SELECT category, COUNT(*) as count
      FROM posts
      WHERE status = 'published'
      GROUP BY category
      ORDER BY count DESC
    `).all() as { category: string; count: number }[]
  },

  getTags() {
    const db = getDb()
    const posts = db.prepare('SELECT tags FROM posts WHERE status = ?').all('published') as { tags: string }[]
    const tagCount: Record<string, number> = {}

    posts.forEach(post => {
      const tags = JSON.parse(post.tags) as string[]
      tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    })

    return Object.entries(tagCount)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  },

  create(post: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'views' | 'featured_image'> & { cover_image?: string | null }) {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO posts (slug, title, excerpt, content, category, tags, featured_image, status, publish_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      post.slug,
      post.title,
      post.excerpt,
      post.content,
      post.category,
      JSON.stringify(post.tags || []),
      post.cover_image || null,
      post.status,
      post.publish_date
    )
    return this.getById(result.lastInsertRowid as number)!
  },

  update(id: string | number, post: Partial<Omit<Post, 'id' | 'created_at' | 'views'>>) {
    const db = getDb()
    const fields: string[] = []
    const values: unknown[] = []

    Object.entries(post).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'cover_image') {
        if (key === 'tags' && Array.isArray(value)) {
          fields.push('tags = ?')
          values.push(JSON.stringify(value))
        } else {
          fields.push(`${key} = ?`)
          values.push(value)
        }
      }
      if (key === 'cover_image') {
        fields.push('featured_image = ?')
        values.push(value)
      }
    })

    fields.push("updated_at = datetime('now')")
    values.push(id)

    const sql = `UPDATE posts SET ${fields.join(', ')} WHERE id = ?`
    db.prepare(sql).run(...values)
    return this.getById(id)!
  },

  delete(id: string | number) {
    const db = getDb()
    return db.prepare('DELETE FROM posts WHERE id = ?').run(id)
  },

  incrementViews(id: string | number) {
    const db = getDb()
    return db.prepare('UPDATE posts SET views = views + 1 WHERE id = ?').run(id)
  },

  count(status?: string) {
    const db = getDb()
    if (status) {
      return (db.prepare('SELECT COUNT(*) as count FROM posts WHERE status = ?').get(status) as { count: number }).count
    }
    return (db.prepare('SELECT COUNT(*) as count FROM posts').get() as { count: number }).count
  }
}

// Projects Repository
export const projects = {
  getAll(options?: { status?: string }) {
    const db = getDb()
    let sql = 'SELECT * FROM projects'
    const params: unknown[] = []

    if (options?.status) {
      sql += ' WHERE status = ?'
      params.push(options.status)
    }

    sql += ' ORDER BY order_index ASC, created_at DESC'
    return db.prepare(sql).all(...params) as Project[]
  },

  getBySlug(slug: string) {
    const db = getDb()
    return db.prepare('SELECT * FROM projects WHERE slug = ?').get(slug) as Project | undefined
  },

  create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const db = getDb()
    const stmt = db.prepare(`
      INSERT INTO projects (slug, title, description, content, tags, featured_image, demo_url, github_url, status, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(
      project.slug,
      project.title,
      project.description,
      project.content,
      project.tags,
      project.featured_image,
      project.demo_url,
      project.github_url,
      project.status,
      project.order_index
    )
    return result.lastInsertRowid as number
  },

  update(id: number, project: Partial<Omit<Project, 'id' | 'created_at'>>) {
    const db = getDb()
    const fields: string[] = []
    const values: unknown[] = []

    Object.entries(project).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = ?`)
        values.push(value)
      }
    })

    fields.push("updated_at = datetime('now')")
    values.push(id)

    const sql = `UPDATE projects SET ${fields.join(', ')} WHERE id = ?`
    return db.prepare(sql).run(...values)
  },

  delete(id: number) {
    const db = getDb()
    return db.prepare('DELETE FROM projects WHERE id = ?').run(id)
  }
}

// Sessions Repository
export const sessions = {
  create(expiresInSeconds: number = 30 * 24 * 60 * 60) {
    const db = getDb()
    const id = crypto.randomUUID()
    const expiresAt = Date.now() + expiresInSeconds * 1000

    db.prepare('INSERT INTO sessions (id, expires_at) VALUES (?, ?)').run(id, expiresAt)
    return id
  },

  validate(id: string) {
    const db = getDb()
    const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id) as Session | undefined

    if (!session) return false
    if (session.expires_at < Date.now()) {
      db.prepare('DELETE FROM sessions WHERE id = ?').run(id)
      return false
    }

    return true
  },

  delete(id: string) {
    const db = getDb()
    return db.prepare('DELETE FROM sessions WHERE id = ?').run(id)
  },

  cleanup() {
    const db = getDb()
    return db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now())
  }
}

// Site Settings Repository
export const settings = {
  get(key: string) {
    const db = getDb()
    const row = db.prepare('SELECT value FROM site_settings WHERE key = ?').get(key) as { value: string } | undefined
    return row?.value
  },

  set(key: string, value: string) {
    const db = getDb()
    return db.prepare(`
      INSERT INTO site_settings (key, value) VALUES (?, ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value
    `).run(key, value)
  },

  getAll() {
    const db = getDb()
    return db.prepare('SELECT * FROM site_settings').all() as { key: string; value: string }[]
  }
}
