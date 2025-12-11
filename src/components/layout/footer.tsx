import { A } from '@solidjs/router'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { href: 'https://github.com', label: 'GitHub' },
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://linkedin.com', label: 'LinkedIn' },
  ]

  const footerLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/rss.xml', label: 'RSS' },
  ]

  return (
    <footer class="border-t border-[var(--color-border)] mt-16 bg-[var(--color-bg)]">
      <div class="container mx-auto px-4 py-12">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div class="md:col-span-2">
            <A href="/" class="font-heading text-xl font-semibold text-[var(--color-text)]">
              HoaNguyen.dev
            </A>
            <p class="mt-2 text-[var(--color-text-muted)] max-w-md">
              Software engineer writing about web development, system design, and developer productivity.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 class="font-heading font-semibold mb-4 text-[var(--color-text)]">Links</h4>
            <ul class="space-y-2">
              {footerLinks.map((link) => (
                <li>
                  <A
                    href={link.href}
                    class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </A>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 class="font-heading font-semibold mb-4 text-[var(--color-text)]">Connect</h4>
            <ul class="space-y-2">
              {socialLinks.map((link) => (
                <li>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div class="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-[var(--color-text-muted)]">
            © {currentYear} HoaNguyen.dev. All rights reserved.
          </p>
          <p class="text-sm text-[var(--color-text-muted)]">
            Built with SolidStart + Bun
          </p>
        </div>
      </div>
    </footer>
  )
}
