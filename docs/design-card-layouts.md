# Card & Blog Post Layout Guide

## Blog Post Card Grid

### Responsive Layout
```
Desktop:  3 columns (or 2-column featured + 1-column grid)
Tablet:   2 columns
Mobile:   1 column
Gap:      2rem (32px)
```

### Single Card Structure

```
┌─────────────────────────┐
│  Featured Image (16:9)  │ ← 8px border-radius
├─────────────────────────┤
│ [CATEGORY TAG]          │ ← xs font, accent bg, 4px radius
│ Post Title              │ ← 24-28px, bold, 1.3 line-height
│ Excerpt text here...    │ ← 16px, secondary color
│ ...max 2 lines          │ ← text-overflow: ellipsis
├─────────────────────────┤
│ 📅 Dec 11 · 5 min read  │ ← 14px, muted, flex with icons
│ by Author Name          │
└─────────────────────────┘
```

### Card Styling
```css
border-radius: 8px;
padding: 16px;
background-color: [surface-color];
border: 1px solid [border-color];
box-shadow: [subtle-shadow];
transition: box-shadow 250ms ease, transform 250ms ease;

&:hover {
  box-shadow: [medium-shadow];
  transform: translateY(-4px);
}
```

## Featured Post Card (Hero/Featured Grid Item)

Larger emphasis for top article:

```
┌──────────────────────────────────┐
│                                  │
│    Featured Image (21:9)         │
│                                  │
├──────────────────────────────────┤
│ [FEATURED]                       │ ← Larger badge
│ Featured Post Title              │ ← 36-42px, bold
│ Longer excerpt showing...         │ ← 18px, 3-4 lines
│ more details about this article  │
├──────────────────────────────────┤
│ 📅 Dec 11 · 8 min read           │
│ Author · Category                │
└──────────────────────────────────┘
```

Grid position: Spans full width (desktop) or 2 columns (tablet)

## Category Tags

- **Background:** Accent color with 10-20% opacity
- **Text color:** Accent color (darker variant)
- **Padding:** 4px 10px
- **Border radius:** 4px
- **Font size:** 12px
- **Font weight:** 600
- **Text transform:** capitalize or uppercase
- **Margin bottom:** 12px

Examples: `[TUTORIAL]` `[DESIGN]` `[PERFORMANCE]` `[TOOLING]`

## Project Card (Portfolio Grid)

Minimal variation for project showcase:

```
┌──────────────────────┐
│  Project Image       │ ← 16:9 ratio
├──────────────────────┤
│ Project Title        │ ← 20px, bold
│ Brief description    │ ← 14px, muted
│ Tech stack: React... │ ← 12px, gray
│ [View] [GitHub]      │ ← Links/buttons
└──────────────────────┘
```

## Card Interactions

### Hover State
- Shadow elevation (subtle → medium)
- Slight upward translate (4px)
- Duration: 250ms ease

### Focus State (keyboard navigation)
- Outline: 2px solid [accent-color]
- Outline offset: 2px
- Border radius maintained

### Active State
- Opacity: 0.7
- Cursor: pointer

## Featured Image Recommendations

1. **Aspect ratio:** 16:9 for cards, 21:9 for featured hero
2. **Content:** Use illustrations or carefully cropped photography
3. **Optimization:** Serve WebP with JPG fallback
4. **Lazy loading:** Defer off-screen images
5. **Filter:** Slight desaturation (-10-15%) for cohesion

## Accessibility Considerations

- Image alt text (descriptive, 120-160 chars)
- Semantic HTML: `<article>` wrapper
- Heading hierarchy: h2 for card titles (not h3)
- Link color contrast: Meet WCAG AA minimum
- Focus visible on interactive elements
