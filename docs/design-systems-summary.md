# Design System Summary (2024-2025)

Quick reference guide for tech blog design implementation.

---

## Typography Stack

| Use Case | Font | Size | Weight | Line Height |
|----------|------|------|--------|-------------|
| Headings (H1) | Crimson Pro | 48-56px | 700 | 1.2 |
| Headings (H2) | Crimson Pro | 36-42px | 600 | 1.3 |
| Headings (H3) | Crimson Pro | 24-28px | 600 | 1.4 |
| Body | Lora or JetBrains Mono | 16-18px | 400 | 1.6 |
| Secondary | Lora | 14px | 400 | 1.5 |
| Code | Fira Code | 13-14px | 400 | 1.5 |

**Alternative Pairing:** Merriweather (body) + JetBrains Mono (code)

---

## Color Reference

### Light Mode
| Element | Color | Usage |
|---------|-------|-------|
| Primary Text | #1a1a1a | Body, headings |
| Secondary Text | #666666 | Metadata, muted |
| Accent | #0066ff | Links, buttons, CTAs |
| Background | #ffffff | Page base |
| Surface | #f5f5f5 | Cards, sections |
| Border | #e0e0e0 | Dividers |
| Code BG | #f8f8f8 | Code blocks |

### Dark Mode
| Element | Color | Usage |
|---------|-------|-------|
| Primary Text | #ffffff | Body, headings |
| Secondary Text | #b0b0b0 | Metadata, muted |
| Accent | #4da6ff | Links, buttons, CTAs |
| Background | #0d1117 | Page base |
| Surface | #161b22 | Cards, sections |
| Border | #30363d | Dividers |
| Code BG | #0d1117 | Code blocks |

---

## Spacing Scale

```
4px   (xs)   → Micro padding, gaps
8px   (sm)   → Small padding, margins
16px  (md)   → Standard margin/padding
24px  (lg)   → Section spacing
32px  (xl)   → Large margins
48px  (2xl)  → Section padding top/bottom
64px  (3xl)  → Hero sections
```

---

## Shadows & Borders

| Type | Value | Use Case |
|------|-------|----------|
| Subtle | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Cards at rest |
| Medium | `0 10px 25px rgba(0,0,0,0.12)` | Hover states, elevation |
| Strong | `0 20px 50px rgba(0,0,0,0.2)` | Modals, dropdowns |
| Inset | `inset 0 1px 3px rgba(0,0,0,0.1)` | Code blocks |

**Border Radius:** 4px (micro) → 8px (cards) → 12px (containers) → 50% (circles)

---

## Layout Constraints

- **Max-width content:** 65ch (~900px)
- **Gutter/gap:** 24px (desktop), 16px (mobile)
- **Section padding:** 48px top/bottom (desktop), 32px (mobile)
- **Card columns:** 3 (desktop), 2 (tablet), 1 (mobile)
- **Featured post:** Spans full width or 2 columns

---

## Code Block Styling

- **Border radius:** 8px
- **Padding:** 24px (1.5rem)
- **Line height:** 1.5
- **Font size:** 13-14px
- **Theme:** Dracula (dark) / Atom One Light (light)
- **Features:** Copy button, language tag, line numbers (optional)

---

## Navigation

### Header (64px height)
- Logo (left)
- Nav links (center): Home → Blog → Projects → About
- Theme toggle (right)
- Social icons (far right)

### Footer
- 4-column layout: About | Articles | Resources | Socials
- Copyright section at bottom
- Links: 14px, secondary spacing

### Mobile
- Hamburger menu (top-right)
- Full-screen overlay navigation
- Vertical stack layout

---

## Card Components

### Blog Card
```
Image (16:9) → Category tag → Title → Excerpt → Meta
Hover: +shadow, translateY(-4px)
```

### Featured Card
```
Image (21:9) → Category tag → Large title → Extended excerpt → Meta
Spans: full width (desktop) or 2 columns (tablet)
```

### Project Card
```
Image (16:9) → Title → Description → Tech stack → Links
Compact, minimal styling
```

---

## Animations & Transitions

- **Duration:** 200-300ms (standard)
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design)
- **Hover:** Shadow + scale/translate changes
- **Page load:** Fade-in, staggered animations
- **Mobile:** Reduced motion respect (prefers-reduced-motion)

---

## Accessibility Standards

- **Color contrast:** WCAG AAA (7:1) for text
- **Focus indicators:** 2px outline, visible always
- **Semantic HTML:** Proper heading hierarchy, nav regions
- **Keyboard navigation:** All elements accessible via Tab
- **Screen readers:** Proper ARIA labels, alt text
- **Font size:** Minimum 16px for inputs (iOS)
- **Touch targets:** 44x44px minimum (mobile)

---

## Trending Elements (2024-2025)

- Glassmorphism (subtle backdrop blur on nav/cards)
- Serif + Mono combo (Crimson Pro + JetBrains Mono)
- Minimal gradients (1-2 places max)
- Neumorphism shadows (soft, 3D-lite)
- Scroll animations (fade-in, slide-in at 250-400ms)
- Custom illustrations (category badges, hero icons)
- Dark mode parity (equal design attention)

---

## Tools & Resources

- **Fonts:** fonts.google.com
- **Colors:** Coolors.co, ColorHunt.co
- **Shadows:** BoxShadow.io
- **Syntax highlighting:** Dracula.io, Atom One
- **Inspiration:** Vercel, CSS-Tricks, Stripe, Tailwind blogs
- **Component library:** Smolui.com

---

## Implementation Checklist

- [ ] Typography: Google Fonts loaded with font-display: swap
- [ ] Color system: CSS custom properties (--color-primary, etc.)
- [ ] Spacing: Consistent rem-based scale
- [ ] Shadows: 3-level system applied
- [ ] Code blocks: Syntax highlighting + copy button
- [ ] Navigation: Sticky header, responsive menu
- [ ] Cards: Grid system, hover effects
- [ ] Dark mode: Full implementation, media query aware
- [ ] Accessibility: WCAG AAA, semantic HTML, focus states
- [ ] Performance: Images optimized, lazy loading, code splitting
- [ ] Mobile: Touch-friendly, responsive, readable at 200% zoom

---

## Related Documentation

See detailed guides:
- `design-typography-guide.md` - Font specifications
- `design-color-palettes.md` - Complete color reference
- `design-spacing-shadows.md` - Layout systems
- `design-code-blocks.md` - Syntax highlighting setup
- `design-card-layouts.md` - Component designs
- `design-header-footer.md` - Header/footer specs
- `design-mobile-navigation.md` - Mobile responsiveness
- `design-information-architecture.md` - Site structure
