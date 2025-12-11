# Navigation Patterns for Portfolio + Blog Combo

## Header Navigation

### Structure
```
┌────────────────────────────────────────────────┐
│ [Logo]  [Nav Links]  [Theme Toggle] [Socials] │
└────────────────────────────────────────────────┘
```

### Specifications
- **Height:** 64px (3.5rem)
- **Position:** Fixed or sticky
- **Background:** Transparent or blend (use backdrop blur for sophistication)
- **Padding:** 0 2rem (horizontal)
- **Alignment:** Flexbox space-between

### Logo
- **Font size:** 18-20px
- **Font weight:** 700
- **Color:** Primary text color
- **Link:** Always to home page
- **Space right:** 3rem

### Nav Links
- **Alignment:** Center
- **Spacing:** 2rem between items
- **Font size:** 14-16px
- **Font weight:** 500
- **Active state:** Underline (2px solid [accent], 8px offset)
- **Hover state:** Color change to [accent] color with 200ms transition

### Links Order
Home → Blog → Projects → About → Contact

### Theme Toggle Button
- **Position:** Right side
- **Icon:** Sun/Moon icon
- **Size:** 24px
- **Padding:** 8px (circle button)
- **Border radius:** 50%
- **Background:** Transparent with hover state
- **Tooltip:** "Toggle dark mode"

### Social Links
- **Icons:** 20px
- **Spacing:** 1rem
- **Color:** Secondary text
- **Hover color:** Accent color
- **Icons:** GitHub, Twitter/X, LinkedIn, Email

---

## Breadcrumb Navigation

Used on blog article and project detail pages.

```
Home / Blog / [Category] / [Post Title]
```

### Styling
- **Font size:** 14px
- **Color:** Secondary (muted)
- **Separator:** " / " (with spaces)
- **Last item:** Bold or accent color
- **Margin top:** 2rem (above post title)
- **Margin bottom:** 3rem

### Responsive Behavior
- **Mobile:** Collapse to "Home / [Current Page]"
- **Tablet+:** Show full breadcrumb

---

## Mobile Navigation

### Hamburger Menu
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

## Sidebar / Secondary Navigation

Optional for large portfolio sections (not recommended for minimalist design).

If used:
- **Width:** 240-280px
- **Position:** Left side, sticky
- **Links:** Hierarchical (parent + children)
- **Spacing:** 1rem between sections
- **Collapse/expand:** Available for deep hierarchies

---

## Footer Navigation

### Structure
```
┌──────────────────────────────────────────────┐
│ [About] [Articles] [Resources] [Socials]     │
├──────────────────────────────────────────────┤
│ © 2025 Your Name. All rights reserved.       │
└──────────────────────────────────────────────┘
```

### Layout
- **Columns:** 4 (responsive: 2 on tablet, 1 on mobile)
- **Background:** Slightly elevated (surface color)
- **Padding:** 3rem vertical, 2rem horizontal
- **Border top:** 1px solid [border-color]

### Column 1: About
- Brief bio (2-3 lines)
- Call to action link

### Column 2: Articles
- Recent posts (3-5 links)
- "View all" link

### Column 3: Resources
- Tools/links used
- Recommendations
- "More..." link

### Column 4: Social Media
- Icons (24px)
- Links to profiles
- "More socials" link

### Copyright Section
- **Font size:** 12px
- **Color:** Secondary (muted)
- **Text:** "© 2025 [Name]. All rights reserved."
- **Alignment:** Center or left
- **Padding top:** 2rem (separate from columns)
- **Border top:** 1px solid [border-color]

---

## Information Architecture

### Sitemap
```
Home (Hero + CTA)
├─ Featured Projects
├─ Latest Articles
└─ Newsletter Signup

Portfolio
└─ Project Grid (filterable)
   ├─ Project Detail
   │  ├─ Gallery
   │  ├─ Description
   │  ├─ Tech Stack
   │  └─ Links (Live, GitHub)

Blog
├─ All Posts (searchable, filterable)
├─ Posts by Category
├─ Posts by Tag
└─ Post Detail
   ├─ Hero Image
   ├─ Article Content
   ├─ Code Blocks
   ├─ Related Posts
   └─ Comments (optional)

About
├─ Bio
├─ Timeline/Experience
├─ Skills
└─ Social Links

Contact
└─ Form or Email Link
```

---

## Navigation Accessibility

- **Semantic HTML:** `<nav>`, `<a>` tags
- **ARIA labels:** `aria-current="page"` for active link
- **Skip link:** Skip to main content (hidden, visible on focus)
- **Focus order:** Logical, matches visual order
- **Focus indicator:** Visible 2px outline
- **Color contrast:** Links meet WCAG AA
- **Keyboard navigation:** All interactive elements keyboard-accessible
