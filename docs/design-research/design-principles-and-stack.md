# Design Principles & Recommended Tech Stack

## Core Design Principles

### 1. Content-First
- Remove distractions and visual clutter
- Maximize readability and scanning efficiency
- Let content be the hero

### 2. Generous Spacing
- Section margins: 1.5-2rem between sections
- Paragraph spacing: 1.5-2rem between block elements
- Breathing room around text blocks
- Whitespace improves cognitive load

### 3. Typography Hierarchy
- **H1 (Main title):** 2-3rem, bold weight
- **H2 (Section title):** 1.5-2rem, semi-bold
- **H3 (Subsection):** 1.25rem, semi-bold
- **Body copy:** 1rem (16px), line-height 1.6-1.8
- **Small text:** 0.875rem, reduced line-height

### 4. Color Restraint
- **Primary colors:** 2-3 main colors max
- **Neutral palette:** Grays for backgrounds, text, borders
- **Accent color:** 1 brand color for CTAs, highlights
- **Total palette:** 5-7 colors (including neutrals)
- **Avoid:** Unnecessary bright colors, gradients (unless intentional)

### 5. Responsive Design
- Mobile-first approach
- Readable at all breakpoints (320px to 2560px+)
- Touch-friendly tap targets (44x44px minimum)
- No horizontal scrolling on mobile
- Flexible layout (grid or flex)

### 6. Performance
- Optimize images (WebP with fallbacks)
- Minimize CSS/JavaScript
- Lazy-load below-fold content
- Static site generation for blogs (pre-built HTML)
- Fast Time to First Byte (TTFB < 100ms)
- Lighthouse score target: 90+

### 7. Accessibility
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Sufficient color contrast (4.5:1 for text)
- Semantic HTML
- ARIA labels for interactive elements
- Alt text for all images

### 8. Consistent Navigation
- Same header/nav structure across all pages
- Clear visual indicators for current page
- Consistent footer across site
- Breadcrumb navigation for deep pages
- Mobile menu that doesn't hide content

## Recommended Tech Stack

### Frontend Framework
**Next.js** (Recommended)
- Server-side rendering for SEO
- Static site generation for blog posts
- Image optimization built-in
- API routes for admin panel
- Excellent developer experience

**Alternative:** Astro
- Static-first approach
- Excellent for content sites
- Partial hydration (less JavaScript)
- Content collections API for blog management

### Styling & CSS
**Tailwind CSS**
- Utility-first approach
- Scalable, component-friendly
- Dark mode support built-in
- Responsive utilities (mobile-first)
- Large ecosystem (plugins, templates)

**Alternative:** CSS Modules + PostCSS
- Better for custom, branded design
- Scoped styling prevents conflicts

### Content Management
**Markdown Processing:**
- **Unified/Remark:** Flexible markdown parser
- **MDX:** Embed React components in markdown
- **Contentlayer:** Type-safe content layer for markdown/YAML

**CMS Options:**
1. **File-based:** Markdown files in git (Contentlayer)
2. **Headless CMS:** Sanity, Strapi, Contentful
3. **Git-based:** GitHub/GitLab as CMS with GitHub Actions

### Editor for Markdown
**Monaco Editor** (Recommended for admin)
- VS Code experience
- Powerful features (search, replace, multi-cursor)
- Good performance
- Extensive customization

**Alternatives:**
- CodeMirror 6 (lightweight, modular)
- Ace Editor (minimal setup)

### Dark Mode Implementation
**next-themes** (If using Next.js)
- Easy system preference detection
- localStorage persistence
- No flash on page load
- Built-in React hooks

**Custom approach:**
- CSS variables + data attributes
- ~50 lines of JavaScript

### Analytics
**Privacy-Focused Options:**
- **Plausible Analytics** - GDPR compliant, simple
- **Fathom Analytics** - Lightweight, fast
- **GoAccess** - Open-source, self-hosted

**Avoid:** Google Analytics (heavy, privacy concerns)

### Additional Libraries
- **Remark plugins:** TOC generation, syntax highlighting (shiki/highlight.js)
- **Next/Image:** Image optimization
- **Zustand/Jotai:** Lightweight state management
- **Framer Motion:** Smooth animations (optional)
- **clsx/classnames:** Conditional CSS class merging

## Performance Budgets

### Ideal Metrics
- **First Contentful Paint (FCP):** < 1.5s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Total JavaScript:** < 100KB (gzipped)
- **Total CSS:** < 30KB (gzipped)
- **Total Images:** < 500KB per article (with optimization)

## SEO Essentials
- Meta title + description on every page
- Open Graph tags for social sharing
- XML sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD for articles)
- Mobile-responsive design
- Fast loading speed
- Canonical tags for duplicate content prevention
