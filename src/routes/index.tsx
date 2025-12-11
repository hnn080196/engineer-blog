import { createSignal, onMount, For } from 'solid-js'
import { A } from '@solidjs/router'

export default function Home() {
  const [theme, setTheme] = createSignal<'light' | 'dark'>('light')

  onMount(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initial = saved || (prefersDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
    if (initial === 'dark') {
      document.documentElement.classList.add('dark')
    }
  })

  const toggleTheme = () => {
    const next = theme() === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', next)
  }

  const projects = [
    {
      title: 'DevDash',
      desc: 'A real-time dashboard for monitoring CI/CD pipelines across multiple platforms.',
      tags: ['React', 'GraphQL', 'WebSocket'],
      icon: '📊',
    },
    {
      title: 'API Gateway',
      desc: 'High-performance API gateway with rate limiting, caching, and analytics.',
      tags: ['Go', 'Redis', 'Docker'],
      icon: '🔗',
    },
    {
      title: 'CodeNotes',
      desc: 'Markdown note-taking app with code syntax highlighting and Git sync.',
      tags: ['TypeScript', 'Electron', 'MDX'],
      icon: '📝',
    },
  ]

  const posts = [
    {
      title: 'Building Type-Safe APIs with tRPC and Zod',
      date: 'Dec 8, 2025',
      category: 'TypeScript',
      readTime: '8 min read',
      slug: 'building-type-safe-apis-trpc-zod',
    },
    {
      title: 'Optimizing React Server Components',
      date: 'Dec 5, 2025',
      category: 'Performance',
      readTime: '6 min read',
      slug: 'optimizing-react-server-components',
    },
    {
      title: 'Zero-Downtime Deployments Guide',
      date: 'Dec 3, 2025',
      category: 'DevOps',
      readTime: '10 min read',
      slug: 'zero-downtime-deployments-guide',
    },
  ]

  return (
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
      {/* Navigation */}
      <header class="sticky top-0 z-50 bg-[var(--color-bg)] border-b border-[var(--color-border)] backdrop-blur-sm">
        <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
          <A href="/" class="font-heading text-xl font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">
            HoaNguyen.dev
          </A>

          <div class="flex items-center gap-6">
            <A href="/" class="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-medium">Home</A>
            <A href="/blog" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Blog</A>
            <A href="/projects" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">Projects</A>
            <A href="/about" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">About</A>

            <button
              onClick={toggleTheme}
              class="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg cursor-pointer text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme() === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section class="container mx-auto px-4 py-16 md:py-24">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full mb-6">
              ⚙️ Software Engineer
            </span>
            <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hi, I'm <span class="text-[var(--color-accent)]">Hoa Nguyen</span>
            </h1>
            <p class="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed max-w-lg">
              I build scalable web applications and write about software engineering,
              system design, and developer productivity. Currently focused on TypeScript,
              React, and cloud-native architectures.
            </p>
            <div class="flex flex-wrap gap-4">
              <A href="/blog" class="btn btn-primary px-6 py-3 rounded-lg font-medium">
                Read the Blog
              </A>
              <A href="/projects" class="btn btn-secondary px-6 py-3 rounded-lg font-medium">
                View Projects
              </A>
            </div>
          </div>

          <div class="flex justify-center">
            <div class="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)] flex items-center justify-center text-7xl md:text-8xl shadow-lg">
              👨‍💻
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section class="container mx-auto px-4 py-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-heading text-2xl md:text-3xl font-semibold">Featured Projects</h2>
          <A href="/projects" class="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
            View all projects
            <span>→</span>
          </A>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <For each={projects}>
            {(project) => (
              <article class="card group cursor-pointer">
                <div class="h-36 bg-[var(--color-surface)] rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
                  {project.icon}
                </div>
                <h4 class="font-heading text-lg font-semibold mb-2">{project.title}</h4>
                <p class="text-sm text-[var(--color-text-muted)] mb-4 line-clamp-2">
                  {project.desc}
                </p>
                <div class="flex flex-wrap gap-2">
                  <For each={project.tags}>
                    {(tag) => (
                      <span class="tag">{tag}</span>
                    )}
                  </For>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>

      {/* Latest Posts */}
      <section class="container mx-auto px-4 py-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-heading text-2xl md:text-3xl font-semibold">Latest Posts</h2>
          <A href="/blog" class="flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">
            View all posts
            <span>→</span>
          </A>
        </div>

        <div class="flex flex-col gap-4">
          <For each={posts}>
            {(post) => (
              <A href={`/blog/${post.slug}`} class="card flex justify-between items-center group">
                <div>
                  <span class="tag mb-2">{post.category}</span>
                  <h4 class="font-heading text-lg font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {post.title}
                  </h4>
                  <span class="text-sm text-[var(--color-text-muted)]">
                    {post.date} · {post.readTime}
                  </span>
                </div>
                <span class="text-[var(--color-accent)] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </A>
            )}
          </For>
        </div>
      </section>

      {/* Newsletter Section */}
      <section class="container mx-auto px-4 py-16">
        <div class="bg-[var(--color-surface)] rounded-2xl p-8 md:p-12 text-center">
          <h3 class="font-heading text-2xl md:text-3xl font-semibold mb-4">Stay Updated</h3>
          <p class="text-[var(--color-text-muted)] mb-6 max-w-md mx-auto">
            Subscribe to my newsletter for weekly insights on web development, system design, and tech career tips.
          </p>
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              class="input flex-1"
              required
            />
            <button type="submit" class="btn btn-primary px-6 py-3 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t border-[var(--color-border)] mt-16">
        <div class="container mx-auto px-4 py-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-[var(--color-text-muted)] text-sm">
              © 2025 HoaNguyen.dev. All rights reserved.
            </p>
            <div class="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
