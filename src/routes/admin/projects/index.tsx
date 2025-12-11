import { createResource, createSignal, For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import AdminSidebar from '~/components/admin/sidebar'
import { projects as projectsRepo } from '~/lib/db'
import type { Project } from '~/lib/db/schema'

// Server function to get projects
async function getProjects() {
  'use server'
  return projectsRepo.getAll()
}

export default function AdminProjects() {
  const [projects, { refetch }] = createResource(getProjects)
  const [deleting, setDeleting] = createSignal<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeleting(id)
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        refetch()
      } else {
        alert('Failed to delete project')
      }
    } catch (err) {
      alert('Error deleting project')
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
            <h1 class="font-heading text-2xl font-semibold">Projects</h1>
            <p class="text-[var(--color-text-muted)]">Manage your portfolio projects</p>
          </div>
          <A href="/admin/projects/new" class="btn btn-primary">
            + New Project
          </A>
        </div>

        {/* Projects Grid */}
        <div class="card">
          <Show when={!projects.loading} fallback={<div class="text-center py-12">Loading projects...</div>}>
            <Show
              when={projects() && projects()!.length > 0}
              fallback={
                <div class="text-center py-12">
                  <p class="text-[var(--color-text-muted)] mb-4">No projects found</p>
                  <A href="/admin/projects/new" class="btn btn-primary">
                    Create your first project
                  </A>
                </div>
              }
            >
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={projects()}>
                  {(project) => (
                    <div class="border border-[var(--color-border)] rounded-lg overflow-hidden">
                      {project.featured_image && (
                        <img
                          src={project.featured_image}
                          alt={project.title}
                          class="w-full h-40 object-cover"
                        />
                      )}
                      <div class="p-4">
                        <div class="flex items-center justify-between mb-2">
                          <h3 class="font-heading font-semibold">{project.title}</h3>
                          <span
                            class={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'published'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p class="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div class="flex items-center gap-2">
                          <A
                            href={`/admin/projects/${project.id}/edit`}
                            class="flex-1 text-center py-2 text-sm bg-[var(--color-surface)] hover:bg-[var(--color-border)] rounded transition-colors"
                          >
                            Edit
                          </A>
                          <button
                            onClick={() => handleDelete(project.id)}
                            disabled={deleting() === project.id}
                            class="px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50"
                          >
                            {deleting() === project.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </Show>
        </div>
      </main>
    </div>
  )
}
