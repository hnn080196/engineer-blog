# Phase 03: Public Pages

**Related**: [Phase 02: Database & Content](./phase-02-database-content.md) ← → [Phase 04: Admin Auth](./phase-04-admin-auth.md)

## Overview

**Date**: 2025-12-11
**Priority**: High
**Status**: ⏸️ Pending
**Estimated Time**: 3 days

Build public-facing pages: home, blog list, blog post detail, projects showcase, about page. Implement SSG for posts, ISG for lists.

## Key Insights

- SolidStart supports `createAsync` for data fetching with SSR/SSG
- MDX components need custom wrapper for proper styling
- Syntax highlighting via Shiki provides best DX
- Pagination via URL params (`?page=2`)

## Requirements

### Functional
- Home page with hero and recent posts
- Blog list with pagination (10 per page)
- Search bar with instant results
- Tag filtering
- Blog post rendering with syntax highlighting
- Projects showcase grid
- About page with bio

### Technical
- SSG for individual blog posts (static at build)
- ISG for blog list (revalidate every 60s)
- Responsive design (mobile-first)
- Dark/light theme toggle
- Accessible navigation (ARIA labels)

## Architecture Decisions

### Routing Structure
```
/                    → Home page (SSG)
/blog                → Blog list (ISG, paginated)
/blog?tag=typescript → Filtered by tag
/blog?q=search       → Search results
/blog/[slug]         → Post detail (SSG)
/projects            → Projects showcase (SSG)
/about               → About page (SSG)
```

### Component Hierarchy
```
BaseLayout
├── Header
│   ├── Nav
│   └── ThemeToggle
├── Main (slot)
│   ├── BlogList
│   │   ├── SearchBar
│   │   ├── TagFilter
│   │   ├── PostCard[]
│   │   └── Pagination
│   └── BlogPost
│       ├── PostMeta
│       ├── MDXContent
│       └── RelatedPosts
└── Footer
```

## Implementation Steps

### 1. Install UI Dependencies
```bash
bun add solid-heroicons clsx tailwindcss
bun add -d @tailwindcss/typography autoprefixer postcss
```

### 2. Configure Tailwind
**`tailwind.config.js`**:
```js
export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
}
```

### 3. Create Theme Toggle
**`src/components/layout/theme-toggle.tsx`**:
```tsx
import { createSignal, onMount } from 'solid-js'

export function ThemeToggle() {
  const [theme, setTheme] = createSignal('light')

  onMount(() => {
    const stored = localStorage.getItem('theme')
    setTheme(stored || 'light')
  })

  const toggle = () => {
    const next = theme() === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', next)
  }

  return <button onClick={toggle}>Toggle</button>
}
```

### 4. Build Home Page
**`src/routes/index.tsx`**:
```tsx
import { createAsync } from '@solidjs/router'
import { getPublishedPosts } from '~/lib/db/queries'

export default function Home() {
  const posts = createAsync(() => getPublishedPosts(3, 0))

  return (
    <BaseLayout>
      <section class="hero">
        <h1>Welcome to My Blog</h1>
        <p>Thoughts on software engineering...</p>
      </section>

      <section class="recent-posts">
        <h2>Recent Posts</h2>
        <For each={posts()}>
          {post => <PostCard {...post} />}
        </For>
      </section>
    </BaseLayout>
  )
}
```

### 5. Create Blog List Page
**`src/routes/blog/index.tsx`**:
```tsx
import { createAsync, useSearchParams } from '@solidjs/router'
import { getPublishedPosts, searchPosts } from '~/lib/db/queries'

export default function BlogList() {
  const [params] = useSearchParams()

  const posts = createAsync(async () => {
    const page = parseInt(params.page || '1')
    const query = params.q
    const tag = params.tag

    if (query) return searchPosts(query)
    if (tag) return getPostsByTag(tag)
    return getPublishedPosts(10, (page - 1) * 10)
  })

  return (
    <BaseLayout>
      <h1>Blog</h1>
      <SearchBar />
      <TagCloud />
      <For each={posts()}>
        {post => <PostCard {...post} />}
      </For>
      <Pagination total={posts()?.length || 0} perPage={10} />
    </BaseLayout>
  )
}
```

### 6. Create Blog Post Page
**`src/routes/blog/[slug].tsx`**:
```tsx
import { createAsync, RouteDefinition } from '@solidjs/router'
import { MDXProvider } from '@mdx-js/solid'
import { getPostBySlug } from '~/lib/db/queries'
import { loadMDXContent } from '~/lib/mdx/loader'

export const route = {
  preload: ({ params }) => getPostBySlug(params.slug)
} satisfies RouteDefinition

export default function BlogPost() {
  const post = createAsync(() => getPostBySlug(params.slug))
  const content = createAsync(() => loadMDXContent(post()?.content_path))

  return (
    <BaseLayout>
      <article class="prose dark:prose-invert">
        <header>
          <h1>{post()?.title}</h1>
          <time>{post()?.published_date}</time>
          <TagList tags={post()?.tags} />
        </header>

        <MDXProvider components={mdxComponents}>
          {content()}
        </MDXProvider>
      </article>
    </BaseLayout>
  )
}
```

### 7. Create MDX Components
**`src/components/blog/mdx-components.tsx`**:
```tsx
export const mdxComponents = {
  h1: (props) => <h1 class="text-4xl font-bold" {...props} />,
  h2: (props) => <h2 class="text-3xl font-bold" {...props} />,
  code: (props) => <CodeBlock {...props} />,
  img: (props) => <Image {...props} />,
  a: (props) => <Link {...props} />,
}
```

### 8. Create Projects Page
**`src/routes/projects.tsx`**:
```tsx
import { createAsync } from '@solidjs/router'
import { getAllProjects } from '~/lib/db/queries'

export default function Projects() {
  const projects = createAsync(() => getAllProjects())

  return (
    <BaseLayout>
      <h1>Projects</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <For each={projects()}>
          {project => <ProjectCard {...project} />}
        </For>
      </div>
    </BaseLayout>
  )
}
```

### 9. Add Pagination Component
**`src/components/blog/pagination.tsx`**:
```tsx
export function Pagination(props: { total: number; perPage: number }) {
  const totalPages = () => Math.ceil(props.total / props.perPage)

  return (
    <nav>
      <For each={Array.from({ length: totalPages() }, (_, i) => i + 1)}>
        {page => (
          <a href={`?page=${page}`}>{page}</a>
        )}
      </For>
    </nav>
  )
}
```

## Related Code Files

**New Files**:
- `src/routes/index.tsx` - Home page
- `src/routes/blog/index.tsx` - Blog list
- `src/routes/blog/[slug].tsx` - Post detail
- `src/routes/projects.tsx` - Projects showcase
- `src/routes/about.tsx` - About page
- `src/components/blog/post-card.tsx` - Post preview card
- `src/components/blog/pagination.tsx` - Pagination controls
- `src/components/blog/search-bar.tsx` - Search input
- `src/components/blog/tag-cloud.tsx` - Tag filter
- `src/components/blog/mdx-components.tsx` - Custom MDX components
- `src/components/layout/theme-toggle.tsx` - Dark mode toggle

## Todo Checklist

- [ ] Install Tailwind + typography plugin
- [ ] Create theme toggle with localStorage
- [ ] Build home page with hero section
- [ ] Implement blog list with pagination
- [ ] Add search functionality
- [ ] Create tag filtering
- [ ] Build blog post detail page
- [ ] Style MDX content with custom components
- [ ] Add syntax highlighting
- [ ] Create projects showcase
- [ ] Build about page
- [ ] Test responsive design
- [ ] Verify SSG/ISG works

## Success Criteria

- ✅ All pages render correctly
- ✅ Blog list paginates properly
- ✅ Search returns accurate results
- ✅ Posts display with proper formatting
- ✅ Code blocks have syntax highlighting
- ✅ Theme toggle persists on reload
- ✅ Mobile responsive (< 768px)
- ✅ No layout shifts (CLS < 0.1)

## Risk Assessment

**Low Risk**: Standard SolidStart patterns, well-documented.

**Mitigation**:
- Follow official SolidStart examples
- Test SSG build output
- Use Lighthouse for performance audit

## Next Steps

→ Proceed to [Phase 04: Admin Auth](./phase-04-admin-auth.md) to implement session-based authentication.
