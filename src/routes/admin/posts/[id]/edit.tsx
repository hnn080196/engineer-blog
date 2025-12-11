import { createResource, createSignal, Show } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'
import TipTapEditor from '~/components/admin/tiptap-editor'
import { posts as postsRepo } from '~/lib/db'
import type { Post } from '~/lib/db/schema'

// Server function to get post by ID
async function getPost(id: string): Promise<Post | null> {
  'use server'
  return postsRepo.getById(id) || null
}

export default function EditPost() {
  const params = useParams()
  const navigate = useNavigate()
  const [post] = createResource(() => params.id, getPost)
  const [saving, setSaving] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const [success, setSuccess] = createSignal(false)

  const [form, setForm] = createSignal<{
    title: string
    slug: string
    content: string
    excerpt: string
    category: string
    tags: string
    cover_image: string
    status: 'draft' | 'published' | 'scheduled'
    publish_date: string
  } | null>(null)

  // Initialize form when post loads
  const initForm = () => {
    const p = post()
    if (p && !form()) {
      setForm({
        title: p.title,
        slug: p.slug,
        content: p.content,
        excerpt: p.excerpt || '',
        category: p.category,
        tags: p.tags.join(', '),
        cover_image: p.cover_image || '',
        status: p.status,
        publish_date: p.publish_date ? new Date(p.publish_date).toISOString().slice(0, 16) : '',
      })
    }
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    const f = form()
    if (!f) return

    setError(null)
    setSuccess(false)
    setSaving(true)

    try {
      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean),
          publish_date: f.publish_date || null,
          cover_image: f.cover_image || null,
        }),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to update post')
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
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
        <Show when={post.loading}>
          <div class="text-center py-12">Loading post...</div>
        </Show>

        <Show when={post.error || (!post.loading && !post())}>
          <div class="text-center py-12">
            <p class="text-red-500 mb-4">Post not found</p>
            <button onClick={() => navigate('/admin/posts')} class="btn btn-primary">
              Back to Posts
            </button>
          </div>
        </Show>

        <Show when={!post.loading && post()}>
          {(() => {
            initForm()
            return null
          })()}

          {/* Header */}
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="font-heading text-2xl font-semibold">Edit Post</h1>
              <p class="text-[var(--color-text-muted)]">Update your blog post</p>
            </div>
            <div class="flex gap-2">
              <a
                href={`/blog/${post()!.slug}`}
                target="_blank"
                class="btn bg-[var(--color-surface)] hover:bg-[var(--color-border)]"
              >
                Preview
              </a>
            </div>
          </div>

          <Show when={form()}>
            <form onSubmit={handleSubmit} class="max-w-4xl">
              {error() && (
                <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                  {error()}
                </div>
              )}

              {success() && (
                <div class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                  Post updated successfully!
                </div>
              )}

              <div class="grid gap-6">
                {/* Title */}
                <div class="card">
                  <label class="block mb-2 text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={form()!.title}
                    onInput={(e) => setForm((prev) => prev && { ...prev, title: e.currentTarget.value })}
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
                    value={form()!.slug}
                    onInput={(e) => setForm((prev) => prev && { ...prev, slug: e.currentTarget.value })}
                    class="input w-full"
                    placeholder="post-url-slug"
                    required
                  />
                  <p class="mt-1 text-xs text-[var(--color-text-muted)]">
                    URL: /blog/{form()!.slug || 'post-slug'}
                  </p>
                </div>

                {/* Content */}
                <div class="card">
                  <label class="block mb-2 text-sm font-medium">Content</label>
                  <TipTapEditor
                    content={form()!.content}
                    onChange={(content) => setForm((prev) => prev && { ...prev, content })}
                    placeholder="Start writing your post..."
                  />
                </div>

                {/* Excerpt */}
                <div class="card">
                  <label class="block mb-2 text-sm font-medium">Excerpt</label>
                  <textarea
                    value={form()!.excerpt}
                    onInput={(e) => setForm((prev) => prev && { ...prev, excerpt: e.currentTarget.value })}
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
                      value={form()!.category}
                      onChange={(e) => setForm((prev) => prev && { ...prev, category: e.currentTarget.value })}
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
                      value={form()!.tags}
                      onInput={(e) => setForm((prev) => prev && { ...prev, tags: e.currentTarget.value })}
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
                    value={form()!.cover_image}
                    onInput={(e) => setForm((prev) => prev && { ...prev, cover_image: e.currentTarget.value })}
                    class="input w-full"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Status & Publish Date */}
                <div class="grid md:grid-cols-2 gap-6">
                  <div class="card">
                    <label class="block mb-2 text-sm font-medium">Status</label>
                    <select
                      value={form()!.status}
                      onChange={(e) =>
                        setForm((prev) =>
                          prev && {
                            ...prev,
                            status: e.currentTarget.value as 'draft' | 'published' | 'scheduled',
                          }
                        )
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
                      value={form()!.publish_date}
                      onInput={(e) => setForm((prev) => prev && { ...prev, publish_date: e.currentTarget.value })}
                      class="input w-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div class="flex items-center gap-4">
                  <button type="submit" class="btn btn-primary" disabled={saving()}>
                    {saving() ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/admin/posts')}
                    class="btn bg-[var(--color-surface)] hover:bg-[var(--color-border)]"
                  >
                    Back to Posts
                  </button>
                </div>
              </div>
            </form>
          </Show>
        </Show>
      </main>
    </div>
  )
}
