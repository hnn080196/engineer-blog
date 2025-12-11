import { createSignal, onMount, Show } from 'solid-js'
import { A, useLocation } from '@solidjs/router'

export default function Header() {
  const [theme, setTheme] = createSignal<'light' | 'dark'>('light')
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false)
  const location = useLocation()

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

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
  ]

  return (
    <header class="sticky top-0 z-50 bg-[var(--color-bg)]/95 border-b border-[var(--color-border)] backdrop-blur-sm">
      <nav class="container mx-auto px-4 h-16 flex items-center justify-between">
        <A
          href="/"
          class="font-heading text-xl font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
        >
          HoaNguyen.dev
        </A>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <A
              href={link.href}
              class={`transition-colors ${
                isActive(link.href)
                  ? 'text-[var(--color-accent)] font-medium'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'
              }`}
            >
              {link.label}
            </A>
          ))}

          <button
            onClick={toggleTheme}
            class="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg cursor-pointer text-[var(--color-text)] hover:bg-[var(--color-border)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme() === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div class="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            class="p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
            aria-label="Toggle theme"
          >
            {theme() === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen())}
            class="p-2"
            aria-label="Toggle menu"
          >
            <Show when={mobileMenuOpen()} fallback={<span class="text-xl">☰</span>}>
              <span class="text-xl">✕</span>
            </Show>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Show when={mobileMenuOpen()}>
        <div class="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div class="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <A
                href={link.href}
                class={`py-2 ${
                  isActive(link.href)
                    ? 'text-[var(--color-accent)] font-medium'
                    : 'text-[var(--color-text-muted)]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </A>
            ))}
          </div>
        </div>
      </Show>
    </header>
  )
}
