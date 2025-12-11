import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'

export default function NewProject() {
  const navigate = useNavigate()
  const [saving, setSaving] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)

  const [form, setForm] = createSignal({
    title: '',
    slug: '',
    description: '',
    content: '',
    tags: '',
    featured_image: '',
    demo_url: '',
    github_url: '',
    status: 'draft' as 'draft' | 'published',
    order_index: 0,
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
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          tags: JSON.stringify(data.tags.split(',').map((t) => t.trim()).filter(Boolean)),
          featured_image: data.featured_image || null,
          demo_url: data.demo_url || null,
          github_url: data.github_url || null,
        }),
      })

      if (!res.ok) {
        const result = await res.json()
        throw new Error(result.error || 'Failed to create project')
      }

      navigate('/admin/projects')
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
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-heading text-2xl font-semibold">New Project</h1>
            <p class="text-[var(--color-text-muted)]">Add a new portfolio project</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} class="max-w-4xl">
          {error() && (
            <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error()}
            </div>
          )}

          <div class="grid gap-6">
            <div class="card">
              <label class="block mb-2 text-sm font-medium">Title</label>
              <input
                type="text"
                value={form().title}
                onInput={(e) => handleTitleChange(e.currentTarget.value)}
                class="input w-full"
                placeholder="Project name"
                required
              />
            </div>

            <div class="card">
              <label class="block mb-2 text-sm font-medium">Slug</label>
              <input
                type="text"
                value={form().slug}
                onInput={(e) => setForm((prev) => ({ ...prev, slug: e.currentTarget.value }))}
                class="input w-full"
                placeholder="project-slug"
                required
              />
            </div>

            <div class="card">
              <label class="block mb-2 text-sm font-medium">Description</label>
              <textarea
                value={form().description}
                onInput={(e) => setForm((prev) => ({ ...prev, description: e.currentTarget.value }))}
                class="input w-full"
                rows={3}
                placeholder="Brief project description"
                required
              />
            </div>

            <div class="card">
              <label class="block mb-2 text-sm font-medium">Content (Markdown)</label>
              <textarea
                value={form().content}
                onInput={(e) => setForm((prev) => ({ ...prev, content: e.currentTarget.value }))}
                class="input w-full font-code text-sm"
                rows={10}
                placeholder="Detailed project description..."
              />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="card">
                <label class="block mb-2 text-sm font-medium">Tags</label>
                <input
                  type="text"
                  value={form().tags}
                  onInput={(e) => setForm((prev) => ({ ...prev, tags: e.currentTarget.value }))}
                  class="input w-full"
                  placeholder="react, typescript, node"
                />
              </div>

              <div class="card">
                <label class="block mb-2 text-sm font-medium">Featured Image URL</label>
                <input
                  type="url"
                  value={form().featured_image}
                  onInput={(e) => setForm((prev) => ({ ...prev, featured_image: e.currentTarget.value }))}
                  class="input w-full"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="card">
                <label class="block mb-2 text-sm font-medium">Demo URL</label>
                <input
                  type="url"
                  value={form().demo_url}
                  onInput={(e) => setForm((prev) => ({ ...prev, demo_url: e.currentTarget.value }))}
                  class="input w-full"
                  placeholder="https://demo.example.com"
                />
              </div>

              <div class="card">
                <label class="block mb-2 text-sm font-medium">GitHub URL</label>
                <input
                  type="url"
                  value={form().github_url}
                  onInput={(e) => setForm((prev) => ({ ...prev, github_url: e.currentTarget.value }))}
                  class="input w-full"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="card">
                <label class="block mb-2 text-sm font-medium">Status</label>
                <select
                  value={form().status}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      status: e.currentTarget.value as 'draft' | 'published',
                    }))
                  }
                  class="input w-full"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div class="card">
                <label class="block mb-2 text-sm font-medium">Order Index</label>
                <input
                  type="number"
                  value={form().order_index}
                  onInput={(e) => setForm((prev) => ({ ...prev, order_index: parseInt(e.currentTarget.value) || 0 }))}
                  class="input w-full"
                  min="0"
                />
              </div>
            </div>

            <div class="flex items-center gap-4">
              <button type="submit" class="btn btn-primary" disabled={saving()}>
                {saving() ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/projects')}
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
