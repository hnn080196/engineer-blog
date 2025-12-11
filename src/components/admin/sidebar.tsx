import { A, useLocation, useNavigate } from '@solidjs/router'

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => location.pathname.startsWith(path)

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/posts', label: 'Posts', icon: '📝' },
    { href: '/admin/projects', label: 'Projects', icon: '📦' },
    { href: '/admin/media', label: 'Media', icon: '🖼️' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    navigate('/admin/login')
  }

  return (
    <aside class="w-64 bg-[var(--color-bg)] border-r border-[var(--color-border)] min-h-screen flex flex-col">
      {/* Logo */}
      <div class="p-4 border-b border-[var(--color-border)]">
        <A href="/admin/dashboard" class="flex items-center gap-2 font-heading text-lg font-semibold">
          <span class="text-xl">&lt;/&gt;</span>
          Admin
        </A>
      </div>

      {/* Navigation */}
      <nav class="flex-1 p-4">
        <div class="space-y-1">
          {menuItems.map((item) => (
            <A
              href={item.href}
              class={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </A>
          ))}
        </div>

        <div class="mt-8 pt-4 border-t border-[var(--color-border)]">
          <p class="px-4 text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
            Quick Actions
          </p>
          <A
            href="/admin/posts/new"
            class="flex items-center gap-3 px-4 py-2.5 text-[var(--color-accent)] hover:bg-[var(--color-surface)] rounded-lg transition-colors"
          >
            <span>➕</span>
            <span>New Post</span>
          </A>
        </div>
      </nav>

      {/* User Section */}
      <div class="p-4 border-t border-[var(--color-border)]">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
            👤
          </div>
          <div>
            <p class="font-medium text-sm">Hoa Nguyen</p>
            <p class="text-xs text-[var(--color-text-muted)]">Administrator</p>
          </div>
        </div>

        <div class="flex gap-2">
          <A
            href="/"
            target="_blank"
            class="flex-1 text-center text-sm py-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] bg-[var(--color-surface)] rounded-lg transition-colors"
          >
            View Site
          </A>
          <button
            onClick={handleLogout}
            class="flex-1 text-sm py-2 text-red-500 hover:text-red-600 bg-[var(--color-surface)] rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  )
}
