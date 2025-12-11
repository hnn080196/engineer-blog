# Tech Blog Design System (2024-2025)

Complete design specification for modern tech/developer blog with portfolio integration.

**Status:** Research-backed, industry best practices, ready for implementation.

---

## Overview

This design system establishes consistent, minimalist aesthetic for portfolio + blog combo sites. Focus on clean typography, professional color palettes, and developer-friendly code block styling.

### Key Principles
1. **Content-First:** Generous whitespace, no decorative clutter
2. **Minimalist:** Single accent color, limited visual elements
3. **Accessible:** WCAG AAA compliance, keyboard navigation, semantic HTML
4. **Responsive:** Mobile-first approach, fluid typography
5. **Performance:** Optimized fonts, lazy loading, efficient CSS

---

## Documentation Map

### Quick Start
- **[Quick Reference](design-quick-reference.md)** — One-page lookup for colors, fonts, spacing, shadows

### Core Specifications
- **[Typography Guide](design-typography-guide.md)** — Google Fonts, sizing, pairing strategies
- **[Color Palettes](design-color-palettes.md)** — Light/dark hex codes, accessibility, usage guidelines
- **[Spacing & Shadows](design-spacing-shadows.md)** — Spacing scale, border radius, 3-level shadow system

### Component Design
- **[Code Blocks](design-code-blocks.md)** — Syntax highlighting themes, copy button, styling specs
- **[Card Layouts](design-card-layouts.md)** — Blog cards, featured posts, project grids, hover effects
- **[Header & Footer](design-header-footer.md)** — Navigation bar, breadcrumbs, footer structure

### Layout & Navigation
- **[Mobile Navigation](design-mobile-navigation.md)** — Hamburger menu, responsive breakpoints, touch-friendly design
- **[Information Architecture](design-information-architecture.md)** — Sitemap, hierarchy, accessibility features, search/discovery

### Implementation
- **[Implementation Checklist](design-implementation-checklist.md)** — 100+ verification steps before launch
- **[Systems Summary](design-systems-summary.md)** — Consolidated reference with tables, tools, trends

---

## Recommended Font Stack

| Use | Font | Alternative |
|-----|------|-------------|
| **Headings** | Crimson Pro (serif) | Playfair Display |
| **Body** | Lora (serif) | Merriweather |
| **Code** | Fira Code (mono) | Source Code Pro |
| **Technical Alt** | JetBrains Mono | IBM Plex Mono |

**Load from Google Fonts.** Use `font-display: swap` for performance.

---

## Color Palette Summary

### Light Mode
- **Text:** #1a1a1a (near-black)
- **Muted:** #666666 (secondary)
- **Accent:** #0066ff (electric blue)
- **Background:** #ffffff (white)
- **Surface:** #f5f5f5 (light gray)
- **Code BG:** #f8f8f8 (tinted white)

### Dark Mode
- **Text:** #ffffff (white)
- **Muted:** #b0b0b0 (light gray)
- **Accent:** #4da6ff (softer blue)
- **Background:** #0d1117 (deep navy, GitHub-inspired)
- **Surface:** #161b22 (elevated)
- **Code BG:** #0d1117 (matches background)

**WCAG AAA Compliant:** All text combinations meet 7:1 contrast ratio.

---

## Spacing Scale (Rem-based)

```
4px (xs)   → Micro padding, small gaps
8px (sm)   → Input padding, small margins
16px (md)  → Standard margin, padding
24px (lg)  → Card spacing, list gaps
32px (xl)  → Section margins
48px (2xl) → Section padding top/bottom
64px (3xl) → Hero sections, large margins
```

**Content max-width:** 65 characters (~900px at 16px base)

---

## Shadow System

| Level | Value | Use |
|-------|-------|-----|
| **Subtle** | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards at rest |
| **Medium** | `0 10px 25px rgba(0,0,0,0.12)` | Hover states, elevation |
| **Strong** | `0 20px 50px rgba(0,0,0,0.2)` | Modals, dropdowns |
| **Inset** | `inset 0 1px 3px rgba(0,0,0,0.1)` | Code blocks, inputs |

**Border Radius:** 4px (inputs) → 8px (cards) → 12px (containers) → 50% (circles)

---

## Navigation Structure

### Header (64px fixed/sticky)
```
[Logo]  [Links: Home Blog Projects About]  [Theme] [Socials]
```

### Footer
```
[About] [Articles] [Resources] [Socials]
────────────────────────────────────────
© 2025 Your Name. All rights reserved.
```

### Mobile
- Hamburger menu (top-right)
- Full-screen overlay navigation
- Vertical link stack

---

## Blog Post Card

```
Image (16:9)
─────────────
[CATEGORY]
Post Title (24px bold)
Excerpt here... (2 lines max)
─────────────
📅 Date · Read Time · Author
```

**Hover effect:** +shadow elevation, translateY(-4px) at 250ms

---

## Code Block Styling

- **Theme:** Dracula (dark), Atom One Light (light)
- **Border radius:** 8px
- **Padding:** 24px
- **Font size:** 13-14px
- **Line height:** 1.5
- **Features:** Copy button, language tag, line numbers (optional)

---

## Responsive Breakpoints

| Screen | Width | Columns | Font Size |
|--------|-------|---------|-----------|
| Mobile | <640px | 1 | 14-16px |
| Tablet | 641-1024px | 2 | 15-17px |
| Desktop | >1024px | 3 | 16-18px |

---

## Accessibility Requirements

### WCAG AAA Compliance
- ✓ Color contrast: 7:1 minimum (text)
- ✓ Focus indicators: 2px solid outline, always visible
- ✓ Keyboard navigation: Tab through all interactive elements
- ✓ Semantic HTML: `<nav>`, `<article>`, `<header>`, `<footer>`
- ✓ ARIA labels: buttons, toggles, icon-only elements
- ✓ Alt text: all meaningful images
- ✓ Skip link: "Skip to main content" (visible on focus)

### Mobile
- ✓ Touch targets: 44x44px minimum
- ✓ Font size: 16px+ on inputs (prevent zoom)
- ✓ Viewport: `width=device-width, initial-scale=1`
- ✓ Smooth scrolling: `-webkit-overflow-scrolling: touch`

---

## Design Trends (2024-2025)

✓ Serif + Mono pairing (Crimson Pro + JetBrains Mono)
✓ Dark mode parity (equal design attention, not afterthought)
✓ Glassmorphism borders (subtle backdrop blur)
✓ Minimal gradients (1-2 strategic uses)
✓ Scroll animations (fade-in, slide-in at 250-400ms)
✓ Neumorphism shadows (soft, 3D-lite appearance)
✓ Custom illustrations (category badges, icons)

---

## Tools & Resources

**Fonts:** [fonts.google.com](https://fonts.google.com)
**Colors:** [Coolors.co](https://coolors.co), [ColorHunt.co](https://colorhunt.co)
**Shadows:** [BoxShadow.io](https://boxshadow.io)
**Syntax:** [Dracula.io](https://draculatheme.com), [Atom One](https://atom.io/themes)
**Inspiration:** Vercel, CSS-Tricks, Stripe, Tailwind blogs

---

## Implementation Timeline

1. **Design tokens** — Export colors, spacing, typography to CSS variables (1-2 hours)
2. **Base styles** — HTML, typography, spacing foundation (2-3 hours)
3. **Components** — Cards, navigation, code blocks (4-6 hours)
4. **Dark mode** — Color scheme toggle, media query implementation (2-3 hours)
5. **Responsive** — Mobile/tablet breakpoints, touch-friendly (3-4 hours)
6. **Accessibility** — WCAG AAA audit, testing (2-3 hours)
7. **Optimization** — Font loading, image optimization, performance (2-3 hours)
8. **Testing** — Cross-browser, responsive, screen reader (2-3 hours)

**Total:** ~20-27 hours for full implementation

---

## Next Steps

1. ✓ Read [Quick Reference](design-quick-reference.md) for immediate values
2. ✓ Review [Typography Guide](design-typography-guide.md) for font setup
3. ✓ Extract colors from [Color Palettes](design-color-palettes.md) into CSS variables
4. ✓ Use [Spacing & Shadows](design-spacing-shadows.md) for layout foundation
5. ✓ Design [Code Blocks](design-code-blocks.md) with syntax highlighting
6. ✓ Build [Card Layouts](design-card-layouts.md) components
7. ✓ Implement [Navigation](design-header-footer.md) with mobile responsive [Mobile Navigation](design-mobile-navigation.md)
8. ✓ Verify [Information Architecture](design-information-architecture.md) and accessibility
9. ✓ Use [Implementation Checklist](design-implementation-checklist.md) before launch

---

**Last Updated:** December 2025
**Research Basis:** Industry best practices, 2024-2025 design trends, WCAG AAA standards
