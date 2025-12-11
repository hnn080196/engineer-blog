# Information Architecture & Site Structure

## Sitemap

```
Home (Hero + CTA)
├─ Featured Projects (3-4 max)
├─ Latest Articles (3 posts)
└─ Newsletter Signup

Portfolio
├─ Project Grid (filterable by category/tech)
└─ Project Detail
   ├─ Gallery/Screenshots
   ├─ Description
   ├─ Tech Stack
   └─ Links (Live Demo, GitHub, etc.)

Blog
├─ All Posts (searchable, filterable by tag/category)
├─ Posts by Category
├─ Posts by Tag
└─ Post Detail
   ├─ Hero Image
   ├─ Metadata (date, author, reading time)
   ├─ Article Content
   ├─ Code Blocks
   ├─ Related Posts (3-5)
   └─ Comments (optional)

About
├─ Personal Bio
├─ Timeline/Experience
├─ Skills/Tech Stack
└─ Social Links

Contact
└─ Contact Form or Email Link
```

---

## Navigation Hierarchy

### Primary Navigation (Header)
- Home
- Blog
- Projects
- About
- Contact

### Secondary Navigation (Footer)
- About section links
- Article archives
- Resources/tools
- Social media

### Contextual Navigation
- Breadcrumbs (article pages)
- Related posts/projects (detail pages)
- Category filters (grid pages)
- Search functionality (optional)

---

## Accessibility Features

### Semantic HTML
- `<nav>` for navigation regions
- `<a>` for links
- `<article>` for blog posts
- `<aside>` for related content

### ARIA Attributes
- `aria-current="page"` for active navigation link
- `aria-label` for icon-only buttons
- `aria-hidden="true"` for decorative elements

### Navigation Accessibility
- **Skip link:** "Skip to main content" (hidden, visible on focus)
- **Focus order:** Logical, matches visual order
- **Focus indicator:** Visible 2px outline (not removed)
- **Color contrast:** Links meet WCAG AA minimum (7:1 preferred)
- **Keyboard navigation:** All interactive elements must be keyboard-accessible
- **Tab order:** Natural or explicitly managed with tabindex

---

## Search & Discovery

### Blog Search (Optional)
- Client-side search (Algolia, Lunr) or server-side (API)
- Search across: titles, excerpts, tags
- Real-time results as user types
- Clear results display

### Category/Tag Filtering
- Categories for broad classification
- Tags for specific topics
- Multi-select filtering
- Show post count per category

### Related Posts
- Appear at bottom of article
- Show 3-5 related posts
- Linked by category/tags
- Thumbnail + title + excerpt

---

## Performance Considerations

- **Lazy loading:** Blog cards, images (load on scroll)
- **Code splitting:** Separate bundles for blog vs. portfolio
- **Static generation:** Pre-render pages at build time (SSG)
- **Caching:** Long-lived cache headers for static assets
- **Compression:** Gzip/Brotli for text, WebP for images
