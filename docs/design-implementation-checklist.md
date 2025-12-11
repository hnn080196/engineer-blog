# Design Implementation Checklist

Verification steps before launch.

---

## Typography Setup

- [ ] Google Fonts loaded with `font-display: swap`
- [ ] Crimson Pro imported (weights: 600, 700)
- [ ] Lora imported (weight: 400)
- [ ] Fira Code imported (weight: 400)
- [ ] Font stack fallbacks defined in CSS
- [ ] Line heights applied per spec
- [ ] Letter spacing normalized (no custom adjustments)

---

## Color System

- [ ] CSS custom properties defined (--color-primary, --color-accent, etc.)
- [ ] Light mode colors applied
- [ ] Dark mode colors applied
- [ ] Media query `prefers-color-scheme: dark` implemented
- [ ] Accent color meets WCAG AA contrast (7:1)
- [ ] All semantic colors defined (success, warning, error)

---

## Spacing & Layout

- [ ] Spacing scale variables defined (--space-xs through --space-3xl)
- [ ] Max-width constraint: 65ch on content containers
- [ ] Section padding: 3rem (desktop), 2rem (mobile)
- [ ] Gutter spacing: 1.5rem (24px) on desktop, 1rem (16px) mobile
- [ ] Margin collapse handled (use padding on parent)

---

## Shadows & Borders

- [ ] Subtle shadow applied to cards at rest
- [ ] Medium shadow applied to hover states
- [ ] Strong shadow applied to modals/overlays
- [ ] Inset shadow applied to code blocks
- [ ] Border radius values consistent (4/8/12/50%)
- [ ] Borders: 1px solid with proper color
- [ ] No double borders (box-shadow used instead where needed)

---

## Navigation

- [ ] Header: fixed/sticky, 64px height, flexbox layout
- [ ] Logo: links to home, 18-20px font size
- [ ] Nav links: spacing 2rem, 14-16px font, hover underline
- [ ] Active link: 2px solid underline with 8px offset
- [ ] Theme toggle: 24px circle button, top right
- [ ] Social icons: 20px, hover color to accent
- [ ] Mobile: hamburger menu, full-screen overlay
- [ ] Breadcrumbs: 14px, secondary color, responsive collapse
- [ ] Footer: 4 columns, copyright section below

---

## Code Blocks

- [ ] Syntax theme installed (Dracula or Atom One Light)
- [ ] Border radius: 8px
- [ ] Padding: 24px (1.5rem)
- [ ] Font size: 13-14px
- [ ] Line height: 1.5
- [ ] Copy button: positioned top-right, appears on hover
- [ ] Language tag: top-left, uppercase, 12px
- [ ] Line numbers: optional, right-aligned, #999 color
- [ ] Horizontal scroll for long lines
- [ ] Focus states visible on copy button

---

## Card Components

- [ ] Blog cards: 3 columns desktop, 2 tablet, 1 mobile
- [ ] Gap between cards: 2rem (32px)
- [ ] Card structure: image → tag → title → excerpt → meta
- [ ] Image aspect ratio: 16:9 (cards), 21:9 (featured)
- [ ] Category tag: accent background, 4px radius, 12px font
- [ ] Title: 24-28px, bold, 1.3 line-height
- [ ] Excerpt: 16px, secondary color, max 2 lines
- [ ] Meta: 14px, date • read time • author
- [ ] Hover effect: shadow elevation + 4px upward translate at 250ms
- [ ] Focus states: 2px accent outline, 2px offset

---

## Images & Media

- [ ] Images: WebP with JPG fallback
- [ ] Lazy loading: `loading="lazy"` on off-screen images
- [ ] Alt text: descriptive, 120-160 chars
- [ ] Featured images: slight desaturation (-10-15%)
- [ ] Aspect ratios: 16:9 (cards), 21:9 (hero), 1:1 (avatars)
- [ ] Optimization: compressed, appropriate file size

---

## Accessibility

- [ ] WCAG AAA contrast: text ≥ 7:1
- [ ] Focus indicators: 2px solid, always visible
- [ ] Semantic HTML: `<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- [ ] ARIA labels: buttons, toggles, icons
- [ ] Skip link: "Skip to main content", hidden until focus
- [ ] Keyboard navigation: all interactive elements accessible via Tab
- [ ] Focus order: logical, matches visual order
- [ ] Color not sole indicator: use text + icons
- [ ] Form labels: associated with inputs
- [ ] Heading hierarchy: H1 → H2 → H3 (no skips)
- [ ] Alt text: all meaningful images
- [ ] Screen reader: proper ARIA roles

---

## Mobile Responsiveness

- [ ] Viewport meta tag: `width=device-width, initial-scale=1`
- [ ] Touch targets: 44x44px minimum
- [ ] Font size: 16px minimum on inputs (iOS zoom prevention)
- [ ] Media queries: 640px, 1024px breakpoints
- [ ] Header: simplified on mobile (logo + hamburger)
- [ ] Navigation: full-screen overlay on mobile
- [ ] Spacing: reduced on mobile (2rem sections)
- [ ] Images: responsive (max-width: 100%)
- [ ] Text: readable at 200% zoom
- [ ] Smooth scrolling: `-webkit-overflow-scrolling: touch`

---

## Performance

- [ ] Font loading: `font-display: swap`
- [ ] Google Fonts: ~30KB total
- [ ] Images: compressed, appropriate dimensions
- [ ] Code splitting: separate bundles for blog vs portfolio
- [ ] Lazy loading: images, components
- [ ] CSS: minified, no unused rules
- [ ] JavaScript: minified, deferred where possible
- [ ] Caching: long-lived cache headers (1 year for assets)
- [ ] CDN: static files served from CDN

---

## Dark Mode

- [ ] Color scheme preference: `prefers-color-scheme: dark`
- [ ] System default: respected
- [ ] Manual toggle: persisted to localStorage
- [ ] All components: themed for dark mode
- [ ] Images: optional desaturation adjustment for dark
- [ ] Code blocks: Dracula theme for dark mode
- [ ] Shadows: increased opacity in dark mode
- [ ] No pure black: use #0d1117 instead

---

## Testing

- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1440px)
- [ ] Lighthouse: ≥90 performance, ≥95 accessibility
- [ ] WAVE: no errors, minimal warnings
- [ ] axe DevTools: no violations
- [ ] Keyboard navigation: Tab through entire site
- [ ] Screen reader: test with NVDA/JAWS
- [ ] Print styles: articles print cleanly
- [ ] OS dark mode: toggle and verify
- [ ] Reduced motion: `prefers-reduced-motion: reduce` respected

---

## Final Sign-Off

- [ ] Design system documented (this checklist + related guides)
- [ ] Components library created/updated
- [ ] Design tokens exported (colors, spacing, shadows)
- [ ] Style guide created for team reference
- [ ] All files minified and optimized
- [ ] Live site performance verified
- [ ] User feedback collected and noted
