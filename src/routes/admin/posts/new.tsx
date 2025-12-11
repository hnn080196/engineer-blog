import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'
import TipTapEditor from '~/components/admin/tiptap-editor'

export default function NewPost() {
  const navigate = useNavigate()
  const [saving, setSaving] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  const [form, setForm] = createSignal({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'Engineering',
    tags: '',
    cover_image: '',
    status: 'draft' as 'draft' | 'published' | 'scheduled',
    publish_date: '',
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const data = form()
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: data.tags.split(',').map((t) => t.trim()).filter(Boolean),
          publish_date: data.publish_date || null,
          cover_image: data.cover_image || null,
        }),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to create post')
      }

      const post = await res.json()
      navigate(`/admin/posts/${post.id}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div class="flex min-h-screen bg-[var(--color-surface)]">
      <AdminSidebar />

      <main class="flex-1 p-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-heading text-2xl font-semibold">New Post</h1>
            <p class="text-[var(--color-text-muted)]">Create a new blog post</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} class="max-w-4xl">
          {error() && (
            <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error()}
            </div>
          )}

          <div class="grid gap-6">
            {/* Title */}
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                value={form().title}
                onInput={(e) => handleTitleChange(e.currentTarget.value)}
                class="input w-full"
                placeholder="Enter post title"
                required
              />
            </div>

            {/* Slug */}
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Slug</label>
              <input
                type="text"
                value={form().slug}
                onInput={(e) => setForm((prev) => ({ ...prev, slug: e.currentTarget.value }))}
                class="input w-full"
                placeholder="post-url-slug"
                required
              />
              <p class="mt-1 text-xs text-[var(--color-text-muted)]">
                URL: /blog/{form().slug || 'post-slug'}
              </p>
            </div>

            {/* Content */}
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Content</label>
              <TipTapEditor
                content={form().content}
                onChange={(content) => setForm((prev) => ({ ...prev, content }))}
                placeholder="Start writing your post..."
              />
            </div>

            {/* Excerpt */}
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Excerpt</label>
              <textarea
                value={form().excerpt}
                onInput={(e) => setForm((prev) => ({ ...prev, excerpt: e.currentTarget.value }))}
                class="input w-full"
                rows={3}
                placeholder="Brief description for previews and SEO"
              />
            </div>

            {/* Category & Tags */}
            <div class="grid md:grid-cols-2 gap-6">
              <div class="card">
                <label class="block mb-2 text-sm font-medium">Category</label>
                <select
                  value={form().category}
                  onChange={(e) => setForm((prev) => ({ ...prev, category: e.currentTarget.value }))}
                  class="input w-full"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Career">Career</option>
                  <option value="Tutorial">Tutorial</option>
                </select>
              </div>

              <div class="card">
                <label class="block mb-2 text-sm font-medium">Tags</label>
                <input
                  type="text"
                  value={form().tags}
                  onInput={(e) => setForm((prev) => ({ ...prev, tags: e.currentTarget.value }))}
                  class="input w-full"
                  placeholder="react, typescript, web"
                />
                <p class="mt-1 text-xs text-[var(--color-text-muted)]">Comma-separated</p>
              </div>
            </div>

            {/* Cover Image */}
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Cover Image URL</label>
              <input
                type="url"
                value={form().cover_image}
                onInput={(e) => setForm((prev) => ({ ...prev, cover_image: e.currentTarget.value }))}
                class="input w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Status & Publish Date */}
            <div class="grid md:grid-cols-2 gap-6">
              <div class="card">
                <label class="block mb-2 text-sm font-medium">Status</label>
                <select
                  value={form().status}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.currentTarget.value as 'draft' | 'published' | 'scheduled',
                    }))
                  }
                  class="input w-full"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>

              <div class="card">
                <label class="block mb-2 text-sm font-medium">Publish Date</label>
                <input
                  type="datetime-local"
                  value={form().publish_date}
                  onInput={(e) => setForm((prev) => ({ ...prev, publish_date: e.currentTarget.value }))}
                  class="input w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div class="flex items-center gap-4">
              <button type="submit" class="btn btn-primary" disabled={saving()}>
                {saving() ? 'Creating...' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                class="btn bg-[var(--color-surface)] hover:bg-[var(--color-border)]"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
