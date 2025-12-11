# Mobile Navigation & Responsive Design

## Mobile Hamburger Menu

### Hamburger Icon
- **Icon:** 3-line hamburger (24x24px)
- **Position:** Fixed top-right
- **Background:** Transparent
- **Hover state:** Background pill (#f5f5f5 light / #1a1a1a dark)
- **Z-index:** 1000 (above content)

### Mobile Menu Overlay
- **Position:** Full-screen fixed
- **Background:** [background-color] (with optional backdrop blur)
- **Animation:** Slide-in from left (300ms)
- **Links layout:** Vertical stack
- **Link padding:** 1rem top/bottom, 2rem left
- **Link font size:** 18px
- **Close button:** X icon top-right (or click outside)

### Mobile Menu Items
```
Home
Blog
Projects
About
Contact
[Theme Toggle]
[Social Icons]
```

---

## Responsive Breakpoints

- **Mobile:** 0-640px (single column, stacked navigation)
- **Tablet:** 641-1024px (2 columns, simplified header)
- **Desktop:** 1025px+ (full layout, full navigation)

### Header Adaptations
- **Mobile:** Logo + hamburger only
- **Tablet:** Logo + simplified nav (3-4 items) + hamburger
- **Desktop:** Full layout

### Content Adaptations
- **Mobile:** Single column, max-width 100%
- **Tablet:** Adjusted spacing, 2-column grids
- **Desktop:** Full design with proper whitespace

---

## Touch-Friendly Design

- **Button/link size:** Minimum 44x44px (mobile)
- **Link spacing:** 0.5rem vertical gaps for accidental taps
- **Hover states:** Tap states on mobile (use :active)
- **Click targets:** Adequate padding around interactive elements

---

## Mobile Performance

- **Smooth scrolling:** `-webkit-overflow-scrolling: touch`
- **Simplified shadows:** Reduce shadow complexity on mobile
- **Font sizes:** Minimum 16px for inputs (prevents zoom on iOS)
- **Viewport meta:** `<meta name="viewport" content="width=device-width, initial-scale=1">`
