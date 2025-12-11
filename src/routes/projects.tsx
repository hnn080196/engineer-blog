import { createResource, For, Show } from 'solid-js'
import { A } from '@solidjs/router'
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import { projects as projectsRepo } from '~/lib/db'
import { safeJsonParse } from '~/lib/utils'

// Server function to get projects
async function getProjects() {
  'use server'
  return projectsRepo.getAll({ status: 'published' })
}

export default function Projects() {
  const [projects] = createResource(getProjects)

  return (
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />

      <main class="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div class="mb-12">
          <h1 class="font-heading text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p class="text-lg text-[var(--color-text-muted)] max-w-2xl">
            A collection of projects I've built. From open-source tools to full-stack applications.
          </p>
        </div>

        {/* Projects Grid */}
        <Show
          when={!projects.loading}
          fallback={<div class="text-center py-12">Loading projects...</div>}
        >
          <Show
            when={projects() && projects()!.length > 0}
            fallback={
              <div class="text-center py-12 text-[var(--color-text-muted)]">
                No projects found.
              </div>
            }
          >
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <For each={projects()}>
                {(project) => {
                  const tags = safeJsonParse<string[]>(project.tags, [])
                  return (
                    <article class="card group">
                      {/* Project Image */}
                      <div class="h-48 bg-[var(--color-surface)] rounded-lg mb-4 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                        {project.featured_image ? (
                          <img
                            src={project.featured_image}
                            alt={project.title}
                            class="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          '📦'
                        )}
                      </div>

                      {/* Title */}
                      <h3 class="font-heading text-xl font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p class="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div class="flex flex-wrap gap-2 mb-4">
                        <For each={tags}>
                          {(tag) => <span class="tag">{tag}</span>}
                        </For>
                      </div>

                      {/* Links */}
                      <div class="flex gap-4 pt-4 border-t border-[var(--color-border)]">
                        <Show when={project.demo_url}>
                          <a
                            href={project.demo_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
                          >
                            🔗 Live Demo
                          </a>
                        </Show>
                        <Show when={project.github_url}>
                          <a
                            href={project.github_url!}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] flex items-center gap-1"
                          >
                            📂 Source
                          </a>
                        </Show>
                      </div>
                    </article>
                  )
                }}
              </For>
            </div>
          </Show>
        </Show>

        {/* CTA */}
        <div class="mt-16 text-center">
          <div class="bg-[var(--color-surface)] rounded-2xl p-8 md:p-12">
            <h3 class="font-heading text-2xl font-semibold mb-4">Interested in working together?</h3>
            <p class="text-[var(--color-text-muted)] mb-6">
              I'm always open to discussing new projects and opportunities.
            </p>
            <A href="/about" class="btn btn-primary px-6 py-3">
              Get in Touch
            </A>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
