import { createSignal, Show } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { A } from '@solidjs/router'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [error, setError] = createSignal('')
  const [loading, setLoading] = createSignal(false)
  const [showPassword, setShowPassword] = createSignal(false)

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email(), password: password() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      // Redirect to dashboard
      navigate('/admin/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="min-h-screen bg-[var(--color-surface)] flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        {/* Logo */}
        <div class="text-center mb-8">
          <A href="/" class="inline-flex items-center gap-2 font-heading text-2xl font-semibold text-[var(--color-text)]">
            <span class="text-3xl">&lt;/&gt;</span>
            HoaNguyen.dev
          </A>
        </div>

        {/* Login Card */}
        <div class="card">
          <h1 class="font-heading text-2xl font-semibold text-center mb-2">Welcome back</h1>
          <p class="text-[var(--color-text-muted)] text-center mb-8">
            Sign in to access the admin dashboard
          </p>

          <Show when={error()}>
            <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error()}
            </div>
          </Show>

          <form onSubmit={handleSubmit} class="space-y-6">
            {/* Email */}
            <div>
              <label for="email" class="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
                placeholder="you@example.com"
                class="input"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label for="password" class="block text-sm font-medium mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  type={showPassword() ? 'text' : 'password'}
                  value={password()}
                  onInput={(e) => setPassword(e.currentTarget.value)}
                  placeholder="Enter your password"
                  class="input pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword())}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                >
                  {showPassword() ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded" />
                <span class="text-sm">Remember me</span>
              </label>
              <a href="#" class="text-sm text-[var(--color-accent)] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading()}
              class="btn btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading() ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Back to site */}
        <div class="text-center mt-6">
          <A href="/" class="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] inline-flex items-center gap-2">
            ← Back to website
          </A>
        </div>
      </div>
    </div>
  )
}
