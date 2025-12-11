# Header & Footer Navigation

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
