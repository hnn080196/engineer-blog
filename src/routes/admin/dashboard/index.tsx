import { createResource, For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'
import { posts as postsRepo, projects as projectsRepo } from '~/lib/db'
import { formatDate, formatRelativeTime } from '~/lib/utils'

// Server function to get dashboard data
async function getDashboardData() {
  'use server'
  const publishedPosts = postsRepo.count('published')
  const draftPosts = postsRepo.count('draft')
  const totalPosts = postsRepo.count()
  const recentPosts = postsRepo.getAll({ limit: 5 })
  const projects = projectsRepo.getAll().length

  // Calculate total views
  const allPosts = postsRepo.getAll()
  const totalViews = allPosts.reduce((sum, post) => sum + post.views, 0)

  return {
    stats: {
      totalPosts,
      publishedPosts,
      draftPosts,
      projects,
      totalViews,
    },
    recentPosts
  }
}

export default function AdminDashboard() {
  const [data] = createResource(getDashboardData)

  return (
    <div class="flex min-h-screen bg-[var(--color-surface)]">
      <AdminSidebar />

      <main class="flex-1 p-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-heading text-2xl font-semibold">Dashboard</h1>
            <p class="text-[var(--color-text-muted)]">Welcome back! Here's what's happening with your blog.</p>
          </div>
          <A href="/admin/posts/new" class="btn btn-primary">
            ➕ New Post
          </A>
        </div>

        <Show when={!data.loading && data()}>
          {/* Stats Grid */}
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div class="card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[var(--color-text-muted)] text-sm">Total Posts</p>
                  <p class="font-heading text-3xl font-bold">{data()!.stats.totalPosts}</p>
                </div>
                <span class="text-4xl opacity-50">📝</span>
              </div>
              <p class="mt-2 text-sm text-green-500">
                +{data()!.stats.draftPosts} drafts
              </p>
            </div>

            <div class="card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[var(--color-text-muted)] text-sm">Total Views</p>
                  <p class="font-heading text-3xl font-bold">
                    {data()!.stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <span class="text-4xl opacity-50">👁️</span>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[var(--color-text-muted)] text-sm">Published</p>
                  <p class="font-heading text-3xl font-bold">{data()!.stats.publishedPosts}</p>
                </div>
                <span class="text-4xl opacity-50">✅</span>
              </div>
            </div>

            <div class="card">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[var(--color-text-muted)] text-sm">Projects</p>
                  <p class="font-heading text-3xl font-bold">{data()!.stats.projects}</p>
                </div>
                <span class="text-4xl opacity-50">📦</span>
              </div>
            </div>
          </div>

          <div class="grid lg:grid-cols-3 gap-8">
            {/* Recent Posts */}
            <div class="lg:col-span-2 card">
              <div class="flex items-center justify-between mb-6">
                <h2 class="font-heading font-semibold">Recent Posts</h2>
                <A href="/admin/posts" class="text-sm text-[var(--color-accent)]">
                  View all
                </A>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-[var(--color-border)]">
                      <th class="text-left py-3 text-sm font-medium text-[var(--color-text-muted)]">Title</th>
                      <th class="text-left py-3 text-sm font-medium text-[var(--color-text-muted)]">Status</th>
                      <th class="text-left py-3 text-sm font-medium text-[var(--color-text-muted)]">Date</th>
                      <th class="text-right py-3 text-sm font-medium text-[var(--color-text-muted)]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={data()!.recentPosts}>
                      {(post) => (
                        <tr class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)]">
                          <td class="py-4">
                            <div>
                              <p class="font-medium">{post.title}</p>
                              <p class="text-sm text-[var(--color-text-muted)]">{post.category}</p>
                            </div>
                          </td>
                          <td class="py-4">
                            <span class={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              post.status === 'published'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : post.status === 'draft'
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td class="py-4 text-sm text-[var(--color-text-muted)]">
                            {formatDate(post.publish_date || post.created_at)}
                          </td>
                          <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                              <A
                                href={`/admin/posts/${post.id}/edit`}
                                class="p-2 hover:bg-[var(--color-border)] rounded transition-colors"
                                title="Edit"
                              >
                                ✏️
                              </A>
                              <A
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                class="p-2 hover:bg-[var(--color-border)] rounded transition-colors"
                                title="View"
                              >
                                👁️
                              </A>
                            </div>
                          </td>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div class="space-y-6">
              <div class="card">
                <h2 class="font-heading font-semibold mb-4">Quick Actions</h2>
                <div class="space-y-3">
                  <A
                    href="/admin/posts/new"
                    class="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                  >
                    <span class="text-2xl">➕</span>
                    <div>
                      <p class="font-medium">New Post</p>
                      <p class="text-sm text-[var(--color-text-muted)]">Create a new blog post</p>
                    </div>
                  </A>
                  <A
                    href="/admin/media"
                    class="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                  >
                    <span class="text-2xl">📤</span>
                    <div>
                      <p class="font-medium">Upload Media</p>
                      <p class="text-sm text-[var(--color-text-muted)]">Add images or files</p>
                    </div>
                  </A>
                  <A
                    href="/admin/settings"
                    class="flex items-center gap-3 p-3 bg-[var(--color-surface)] rounded-lg hover:bg-[var(--color-border)] transition-colors"
                  >
                    <span class="text-2xl">⚙️</span>
                    <div>
                      <p class="font-medium">Settings</p>
                      <p class="text-sm text-[var(--color-text-muted)]">Configure your blog</p>
                    </div>
                  </A>
                </div>
              </div>
            </div>
          </div>
        </Show>

        <Show when={data.loading}>
          <div class="text-center py-12">Loading dashboard...</div>
        </Show>
      </main>
    </div>
  )
}
