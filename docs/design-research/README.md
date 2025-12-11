# Tech Blog Design Research

This directory contains comprehensive research and analysis of modern tech blog designs, patterns, and best practices.

## Files Overview

1. **blog-design-examples.md**
   - 7 exemplary tech blog designs
   - Layout, colors, typography, and unique features for each
   - Examples: swyx.io, overreacted.io, joshwcomeau.com, tkdodo.eu, and more

2. **portfolio-blog-patterns.md**
   - Portfolio + blog combination site layout strategies
   - Two-tier approach and key design patterns
   - Best practices for integrating portfolio and blog content

3. **admin-dashboard-ui.md**
   - Admin dashboard UI patterns for content management
   - CRUD table layouts and bulk operations
   - Content editor layouts with metadata sidebar
   - Visual design guidelines and color schemes

4. **markdown-editor-patterns.md**
   - Markdown editor UI/UX best practices
   - Split-pane editor layout patterns
   - Toolbar design and keyboard shortcuts
   - Editor capabilities and visual design
   - Implementation examples (CodeMirror, Monaco, Ace)

5. **dark-light-mode-patterns.md**
   - Dark/light mode toggle placement and design
   - Technical implementation with CSS variables
   - System preference detection and localStorage persistence
   - Color scheme guidelines (WCAG compliance)
   - Implementation examples from GitHub, Tailwind, Deno

6. **design-principles-and-stack.md**
   - 8 core design principles (content-first, spacing, hierarchy, etc.)
   - Recommended tech stack for engineer blog
   - Performance budgets and metrics
   - SEO essentials

## Key Takeaways

### Most Common Patterns
- **Layout:** Centered content (600-800px), generous margins
- **Typography:** Clear hierarchy with 1.5-1.8 line height
- **Colors:** 2-3 main colors + neutrals, minimal accent usage
- **Navigation:** Top nav bar with dark mode toggle
- **Content:** First principle - readability over decoration

### Tech Stack Recommendation
- **Frontend:** Next.js or Astro
- **Styling:** Tailwind CSS
- **Content:** Markdown + Contentlayer or MDX
- **Editor:** Monaco Editor for admin panel
- **Dark Mode:** next-themes or custom CSS approach
- **Analytics:** Plausible or Fathom (privacy-focused)

### Design Principles to Follow
1. Content-first approach
2. Generous spacing and whitespace
3. Strong typography hierarchy
4. Color restraint (5-7 colors max)
5. Mobile-first responsive design
6. Performance optimization
7. WCAG AA accessibility compliance
8. Consistent navigation throughout

---

For implementation guidance, refer to individual files for specific patterns and best practices.
