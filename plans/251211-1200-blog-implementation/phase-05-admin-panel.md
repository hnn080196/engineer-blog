# Phase 05: Admin Panel

**Related**: [Phase 04: Admin Auth](./phase-04-admin-auth.md) ← → [Phase 06: Editor](./phase-06-editor.md)

## Overview

**Date**: 2025-12-11
**Priority**: High
**Status**: ⏸️ Pending
**Estimated Time**: 2 days

Build admin dashboard with stats overview, posts management (list/create/edit/delete), projects management.

## Key Insights

- Dashboard shows key metrics (total posts, views, drafts)
- Posts table with sort/filter capabilities
- Quick actions (publish, archive, delete)
- Form validation before submission

## Requirements

### Functional
- Dashboard with stats cards
- Posts list table (sortable, filterable)
- Create new post form
- Edit existing post
- Delete post with confirmation
- Projects CRUD operations
- Draft/publish toggle

### UX
- Loading states during async operations
- Success/error toast notifications
- Confirm dialogs for destructive actions
- Keyboard shortcuts (Ctrl+S to save)

## Architecture Decisions

### Admin Routes Structure
```
/admin/login              → Login page (public)
/admin/dashboard          → Stats overview (protected)
/admin/posts              → Posts list (protected)
/admin/posts/new          → Create post (protected)
/admin/posts/[id]/edit    → Edit post (protected)
/admin/projects           → Projects list (protected)
/admin/projects/new       → Create project (protected)
```

### Component Structure
```
AdminLayout
├── Sidebar
│   ├── NavLinks
│   └── LogoutButton
└── Main
    ├── Dashboard
    │   ├── StatsCard[]
    │   └── RecentActivity
    ├── PostsList
    │   ├── Toolbar (search, filter)
    │   ├── PostsTable
    │   └── Pagination
    └── PostForm
        ├── TitleInput
        ├── SlugInput
        ├── EditorWrapper (Phase 06)
        └── MetadataInputs
```

## Implementation Steps

### 1. Create Admin Layout
**`src/components/admin/admin-layout.tsx`**:
```tsx
import { requireAuth } from '~/server/middleware/auth'
import { ParentComponent } from 'solid-js'

export const AdminLayout: ParentComponent = (props) => {
  const session = requireAuth()

  return (
    <div class="flex min-h-screen">
      <aside class="w-64 bg-gray-900 text-white">
        <nav>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/posts">Posts</a>
          <a href="/admin/projects">Projects</a>
        </nav>
        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main class="flex-1 p-8">
        {props.children}
      </main>
    </div>
  )
}
```

### 2. Create Dashboard Page
**`src/routes/admin/dashboard.tsx`**:
```tsx
import { createAsync } from '@solidjs/router'
import { requireAuth } from '~/server/middleware/auth'
import { getStats } from '~/lib/db/queries'

export default function Dashboard() {
  requireAuth()
  const stats = createAsync(() => getStats())

  return (
    <AdminLayout>
      <h1>Dashboard</h1>

      <div class="grid grid-cols-4 gap-4">
        <StatsCard title="Total Posts" value={stats()?.totalPosts} />
        <StatsCard title="Total Views" value={stats()?.totalViews} />
        <StatsCard title="Drafts" value={stats()?.drafts} />
        <StatsCard title="Tags" value={stats()?.totalTags} />
      </div>

      <section>
        <h2>Recent Activity</h2>
        <RecentPostsList />
      </section>
    </AdminLayout>
  )
}
```

### 3. Create Posts List Page
**`src/routes/admin/posts/index.tsx`**:
```tsx
import { createAsync, A } from '@solidjs/router'
import { requireAuth } from '~/server/middleware/auth'
import { getAllPostsAdmin } from '~/lib/db/queries'

export default function PostsList() {
  requireAuth()
  const posts = createAsync(() => getAllPostsAdmin())

  return (
    <AdminLayout>
      <div class="flex justify-between items-center">
        <h1>Posts</h1>
        <A href="/admin/posts/new" class="btn-primary">
          New Post
        </A>
      </div>

      <table class="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Published</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <For each={posts()}>
            {post => (
              <tr>
                <td>{post.title}</td>
                <td>{post.draft ? 'Draft' : 'Published'}</td>
                <td>{post.published_date}</td>
                <td>{post.view_count}</td>
                <td>
                  <A href={`/admin/posts/${post.id}/edit`}>Edit</A>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </AdminLayout>
  )
}
```

### 4. Create Post Form Component
**`src/components/admin/post-form.tsx`**:
```tsx
import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

export function PostForm(props: { initialData?: Post }) {
  const [title, setTitle] = createSignal(props.initialData?.title || '')
  const [slug, setSlug] = createSignal(props.initialData?.slug || '')
  const [excerpt, setExcerpt] = createSignal(props.initialData?.excerpt || '')
  const [content, setContent] = createSignal(props.initialData?.content || '')
  const [draft, setDraft] = createSignal(props.initialData?.draft || true)
  const [tags, setTags] = createSignal(props.initialData?.tags || [])

  const navigate = useNavigate()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()

    const method = props.initialData ? 'PUT' : 'POST'
    const url = props.initialData
      ? `/api/admin/posts/${props.initialData.id}`
      : '/api/admin/posts'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title(),
        slug: slug(),
        excerpt: excerpt(),
        content: content(),
        draft: draft(),
        tags: tags(),
      }),
    })

    if (res.ok) {
      navigate('/admin/posts')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title()}
        onInput={(e) => {
          setTitle(e.currentTarget.value)
          setSlug(slugify(e.currentTarget.value))
        }}
      />

      <input
        type="text"
        placeholder="Slug"
        value={slug()}
        onInput={(e) => setSlug(e.currentTarget.value)}
      />

      <textarea
        placeholder="Excerpt"
        value={excerpt()}
        onInput={(e) => setExcerpt(e.currentTarget.value)}
      />

      {/* TipTap editor placeholder - Phase 06 */}
      <textarea
        placeholder="Content (Markdown)"
        value={content()}
        onInput={(e) => setContent(e.currentTarget.value)}
        rows={20}
      />

      <TagInput value={tags()} onChange={setTags} />

      <label>
        <input
          type="checkbox"
          checked={draft()}
          onChange={(e) => setDraft(e.currentTarget.checked)}
        />
        Save as draft
      </label>

      <div class="flex gap-4">
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/admin/posts')}>
          Cancel
        </button>
      </div>
    </form>
  )
}
```

### 5. Create API Routes
**`src/routes/api/admin/posts/index.ts`**:
```ts
import { json } from '@solidjs/router'
import { requireAuth } from '~/server/middleware/auth'
import { db } from '~/lib/db/client'

export async function POST({ request }: { request: Request }) {
  requireAuth(request)

  const data = await request.json()

  const result = db.prepare(`
    INSERT INTO posts (slug, title, excerpt, content_path, published_date, draft)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    data.slug,
    data.title,
    data.excerpt,
    `content/blog/${data.slug}.mdx`,
    new Date().toISOString(),
    data.draft ? 1 : 0
  )

  // Write MDX file
  await writeMDXFile(`content/blog/${data.slug}.mdx`, data)

  return json({ id: result.lastInsertRowid })
}
```

**`src/routes/api/admin/posts/[id].ts`**:
```ts
export async function PUT({ request, params }: { request: Request; params: any }) {
  requireAuth(request)

  const data = await request.json()

  db.prepare(`
    UPDATE posts
    SET title = ?, excerpt = ?, draft = ?, updated_date = ?
    WHERE id = ?
  `).run(data.title, data.excerpt, data.draft ? 1 : 0, new Date().toISOString(), params.id)

  return json({ success: true })
}

export async function DELETE({ request, params }: { request: Request; params: any }) {
  requireAuth(request)

  db.prepare(`DELETE FROM posts WHERE id = ?`).run(params.id)

  return json({ success: true })
}
```

### 6. Create Stats Query
**`src/lib/db/queries.ts`** (add):
```ts
export function getStats() {
  const totalPosts = db.prepare(`SELECT COUNT(*) as count FROM posts WHERE draft = 0`).get()
  const drafts = db.prepare(`SELECT COUNT(*) as count FROM posts WHERE draft = 1`).get()
  const totalViews = db.prepare(`SELECT SUM(view_count) as sum FROM posts`).get()
  const totalTags = db.prepare(`SELECT COUNT(*) as count FROM tags`).get()

  return {
    totalPosts: totalPosts.count,
    drafts: drafts.count,
    totalViews: totalViews.sum || 0,
    totalTags: totalTags.count,
  }
}
```

## Related Code Files

**New Files**:
- `src/components/admin/admin-layout.tsx` - Admin wrapper
- `src/components/admin/post-form.tsx` - Post form component
- `src/components/admin/stats-card.tsx` - Dashboard stat card
- `src/routes/admin/dashboard.tsx` - Dashboard page
- `src/routes/admin/posts/index.tsx` - Posts list
- `src/routes/admin/posts/new.tsx` - Create post
- `src/routes/admin/posts/[id]/edit.tsx` - Edit post
- `src/routes/api/admin/posts/index.ts` - Create post API
- `src/routes/api/admin/posts/[id].ts` - Update/delete API

**Modified Files**:
- `src/lib/db/queries.ts` - Add stats queries

## Todo Checklist

- [ ] Create admin layout component
- [ ] Build dashboard with stats
- [ ] Implement posts list table
- [ ] Create post form component
- [ ] Build new post page
- [ ] Build edit post page
- [ ] Implement create post API
- [ ] Implement update post API
- [ ] Implement delete post API
- [ ] Add confirm dialog for delete
- [ ] Test CRUD operations
- [ ] Add loading states

## Success Criteria

- ✅ Admin can view dashboard stats
- ✅ Posts list displays all posts
- ✅ Admin can create new posts
- ✅ Admin can edit existing posts
- ✅ Admin can delete posts
- ✅ Draft toggle works
- ✅ Form validation works
- ✅ Auth required for all admin routes

## Risk Assessment

**Low Risk**: Standard CRUD operations.

**Mitigation**:
- Validate all inputs
- Use transactions for data integrity
- Add soft delete option

## Next Steps

→ Proceed to [Phase 06: Editor](./phase-06-editor.md) to integrate TipTap editor.
