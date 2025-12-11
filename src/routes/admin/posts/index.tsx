import { createResource, createSignal, For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'
import { posts as postsRepo } from '~/lib/db'
import { formatDate } from '~/lib/utils'
import type { Post } from '~/lib/db/schema'

// Server function to get posts with filtering
async function getPosts(status?: string) {
  'use server'
  if (status && status !== 'all') {
    return postsRepo.getAll({ status: status as Post['status'] })
  }
  return postsRepo.getAll()
}

export default function AdminPosts() {
  const [filter, setFilter] = createSignal<string>('all')
  const [posts, { refetch }] = createResource(() => filter(), getPosts)
  const [deleting, setDeleting] = createSignal<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' })
      if (res.ok) {
        refetch()
      } else {
        alert('Failed to delete post')
      }
    } catch (err) {
      alert('Error deleting post')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div class="flex min-h-screen bg-[var(--color-surface)]">
      <AdminSidebar />

      <main class="flex-1 p-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-heading text-2xl font-semibold">Posts</h1>
            <p class="text-[var(--color-text-muted)]">Manage your blog posts</p>
          </div>
          <A href="/admin/posts/new" class="btn btn-primary">
            + New Post
          </A>
        </div>

        {/* Filters */}
        <div class="card mb-6">
          <div class="flex items-center gap-4">
            <span class="text-sm text-[var(--color-text-muted)]">Filter:</span>
            <div class="flex gap-2">
              {['all', 'published', 'draft', 'scheduled'].map((status) => (
                <button
                  onClick={() => setFilter(status)}
                  class={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    filter() === status
                      ? 'bg-[var(--color-accent)] text-white'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div class="card">
          <Show when={!posts.loading} fallback={<div class="text-center py-12">Loading posts...</div>}>
            <Show
              when={posts() && posts()!.length > 0}
              fallback={
                <div class="text-center py-12">
                  <p class="text-[var(--color-text-muted)] mb-4">No posts found</p>
                  <A href="/admin/posts/new" class="btn btn-primary">
                    Create your first post
                  </A>
                </div>
              }
            >
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[var(--color-border)]">
                      <th class="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Title</th>
                      <th class="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Category</th>
                      <th class="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Status</th>
                      <th class="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Views</th>
                      <th class="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Date</th>
                      <th class="text-right py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={posts()}>
                      {(post) => (
                        <tr class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]">
                          <td class="py-4 px-4">
                            <div>
                              <p class="font-medium">{post.title}</p>
                              <p class="text-sm text-[var(--color-text-muted)] truncate max-w-xs">
                                {post.excerpt}
                              </p>
                            </div>
                          </td>
                          <td class="py-4 px-4">
                            <span class="tag">{post.category}</span>
                          </td>
                          <td class="py-4 px-4">
                            <span
                              class={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                                post.status === 'published'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : post.status === 'draft'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}
                            >
                              {post.status}
                            </span>
                          </td>
                          <td class="py-4 px-4 text-sm text-[var(--color-text-muted)]">
                            {post.views.toLocaleString()}
                          </td>
                          <td class="py-4 px-4 text-sm text-[var(--color-text-muted)]">
                            {formatDate(post.publish_date || post.created_at)}
                          </td>
                          <td class="py-4 px-4">
                            <div class="flex items-center justify-end gap-2">
                              <A
                                href={`/admin/posts/${post.id}/edit`}
                                class="p-2 hover:bg-[var(--color-border)] rounded transition-colors"
                                title="Edit"
                              >
                                Edit
                              </A>
                              <A
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                class="p-2 hover:bg-[var(--color-border)] rounded transition-colors"
                                title="View"
                              >
                                View
                              </A>
                              <button
                                onClick={() => handleDelete(post.id)}
                                disabled={deleting() === post.id}
                                class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                                title="Delete"
                              >
                                {deleting() === post.id ? '...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </Show>
          </Show>
        </div>
      </main>
    </div>
  )
}
