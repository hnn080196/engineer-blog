# Tech Blog Design Research - Executive Summary

## 5-7 Exemplary Tech Blog Designs

| Site | Layout | Key Features | Color Scheme |
|------|--------|--------------|--------------|
| **swyx.io** | Full-width hero + 800px centered content | Newsletter CTA, social links, reading time badges | Light bg, teal accent |
| **overreacted.io** | Single-column (~600px), minimal whitespace | Distraction-free, strong hierarchy via spacing | Off-white, black text, minimal accent |
| **joshwcomeau.com** | CSS Grid responsive, featured articles | Interactive explorations, animated transitions | Dark mode default, pastel accents |
| **tkdodo.eu** | Sidebar nav + main content, responsive stacking | TOC auto-generation, code highlighting, brutalist | Light gray, navy text, blue links |
| **peterbe.com** | Classic blog + sidebar archives | Search, category filtering, comments | Minimal palette (white/gray/black) |
| **kentcdodds.com** | Full-width grid, multi-content hub | Blog + courses + talks, strong CTAs, social proof | Light bg, blue accent, generous spacing |
| **netlify.com/blog** | Marketing hero + card grid | Author cards, category badges, featured articles | Teal accent (#00c7b7), navy primary |

## Portfolio + Blog Combo Patterns

**Two-tier structure:**
- Hero with bio + quick CTA
- Featured projects (screenshot + "Read Case Study" link)
- Blog feed with metadata (date, reading time, category)
- Unified navigation: portfolio | blog | about | contact
- Shared footer with social/contact
- Internal linking between projects and blog posts

**Example sites:** joshwcomeau.com, swyx.io, kentcdodds.com

## Admin Dashboard UI Essentials

**Left sidebar nav:** Dashboard, Posts, Media, Comments, Settings, Analytics

**Content editor (2-3 column):**
- Left: Title + markdown editor + toolbar
- Middle: Live preview
- Right: Metadata (date, category, tags, featured image, SEO)

**Post list table:**
- Columns: Title | Author | Date | Status | Actions
- Status indicators: Green (published), Yellow (draft), Red (error)
- Bulk operations with checkboxes
- Search + filter by status/category
- Inline editing + quick actions on hover

**Color scheme:** Neutral bg (#f8f9fa), white cards, status-based indicators (green/yellow/red)

## Markdown Editor Patterns

**Layout:** 50/50 split pane (editor left, live preview right)

**Toolbar:** Bold, italic, code, link, headers, lists, blockquote, insert image/code/table

**Key UX features:**
- Line numbers with folding
- Syntax highlighting for code blocks
- Auto-closing brackets
- Tab for indentation
- Paste image → auto-upload + markdown insertion
- Search & replace (Ctrl+H)
- Live preview with scroll sync
- Word count + reading time

**Visual design:** Dark editor (#1e1e1e bg, #e0e0e0 text), monospace font (Fira Code, Monaco), clear editor/preview contrast

**Implementation options:** CodeMirror 6, Monaco Editor, Ace Editor

## Dark/Light Mode Toggle

**Placement:** Top-right header (most discoverable)

**Design:**
- Icon-only (20-24px moon/sun)
- Current mode shows what you can switch TO
- Tooltip on hover: "Switch to Dark Mode"
- 200-300ms smooth transition

**Implementation:**
```javascript
// 1. Check localStorage + system preference
// 2. Set data-theme attribute on <html>
// 3. Use CSS variables for colors
// 4. Persist user choice to localStorage
// 5. Listen for system preference changes
```

**Color guidelines:**
- Light: #fff bg, #1a1a1a text
- Dark: #0f172a bg, #f1f5f9 text
- WCAG AA contrast: 4.5:1 minimum
- Avoid pure black/white; use softer colors

**Examples:** GitHub (moon icon, smooth), Tailwind Docs (Light/Dark/System toggle), Deno (instant feedback)

## Design Principles (Content-First Aesthetic)

1. **Content-First:** Remove distractions, maximize readability
2. **Generous Spacing:** 1.5-2rem margins between sections
3. **Typography Hierarchy:** H1 2-3rem, H2 1.5rem, body 1rem, line-height 1.6-1.8
4. **Color Restraint:** 2-3 main colors + neutrals (5-7 total)
5. **Responsive Design:** Mobile-first, readable 320px-2560px+
6. **Performance:** Optimized images, minimal CSS/JS, SSG for blogs
7. **Accessibility:** WCAG AA, keyboard nav, 4.5:1 contrast
8. **Consistent Navigation:** Same header/footer across all pages

## Recommended Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Frontend** | Next.js | SSR/SSG, image optimization, excellent DX |
| **Styling** | Tailwind CSS | Scalable, dark mode built-in, responsive utilities |
| **Content** | Markdown + Contentlayer | Type-safe, easy git-based workflow |
| **Markdown Editor** | Monaco Editor | Powerful, familiar (VS Code), customizable |
| **Dark Mode** | next-themes | Seamless, no flash on load, system preference detection |
| **Analytics** | Plausible/Fathom | Privacy-focused, lightweight |

## Performance Targets

- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1
- JS: < 100KB (gzipped)
- CSS: < 30KB (gzipped)
- Lighthouse: 90+ score

---

**Research Coverage:** 7 blog designs, 2 pattern categories, 4 UI/UX areas, tech stack recommendations, design principles

**Unresolved Questions:**
- Server-side vs client-side markdown rendering preference for your use case?
- Target audience technical level (beginners vs advanced)?
- Expected blog post frequency and archive size?
