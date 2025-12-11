# Phase 07: SEO & Performance

**Related**: [Phase 06: Editor](./phase-06-editor.md) ← → [Phase 08: Deployment](./phase-08-deployment.md)

## Overview

**Date**: 2025-12-11
**Priority**: High
**Status**: ⏸️ Pending
**Estimated Time**: 2 days

Implement SEO meta tags, OpenGraph, Twitter Cards, JSON-LD structured data, sitemap.xml, RSS feed, and performance optimizations.

## Key Insights

- Meta tags crucial for social sharing
- Structured data improves search appearance
- Sitemap helps search engine crawling
- RSS feed for subscribers
- Image optimization reduces load times

## Requirements

### SEO
- Dynamic meta tags (title, description)
- OpenGraph tags for social sharing
- Twitter Card tags
- Canonical URLs
- JSON-LD structured data (Article, BlogPosting)
- Sitemap.xml (dynamic)
- RSS feed
- Robots.txt

### Performance
- Image optimization (WebP, lazy loading)
- CSS/JS minification
- Font optimization
- Preload critical resources
- Lighthouse score >90

## Architecture Decisions

### Meta Tags Strategy
```tsx
<Head>
  <title>{post.title} | My Blog</title>
  <meta name="description" content={post.excerpt} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  <meta property="og:image" content={post.cover} />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</Head>
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "datePublished": "2025-12-11",
  "image": "https://example.com/cover.jpg"
}
```

## Implementation Steps

### 1. Create SEO Component
**`src/components/seo/meta-tags.tsx`**:
```tsx
import { Title, Meta } from '@solidjs/meta'

export function MetaTags(props: {
  title: string
  description: string
  image?: string
  url: string
  type?: 'website' | 'article'
}) {
  const fullTitle = `${props.title} | My Tech Blog`

  return (
    <>
      <Title>{fullTitle}</Title>
      <Meta name="description" content={props.description} />

      {/* OpenGraph */}
      <Meta property="og:title" content={fullTitle} />
      <Meta property="og:description" content={props.description} />
      <Meta property="og:url" content={props.url} />
      <Meta property="og:type" content={props.type || 'website'} />
      <Meta property="og:image" content={props.image || '/og-default.jpg'} />

      {/* Twitter */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={fullTitle} />
      <Meta name="twitter:description" content={props.description} />
      <Meta name="twitter:image" content={props.image || '/og-default.jpg'} />

      {/* Canonical */}
      <link rel="canonical" href={props.url} />
    </>
  )
}
```

### 2. Add JSON-LD Structured Data
**`src/components/seo/structured-data.tsx`**:
```tsx
export function BlogPostingSchema(props: {
  title: string
  excerpt: string
  published: string
  updated?: string
  image?: string
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.excerpt,
    author: {
      '@type': 'Person',
      name: 'Your Name',
      url: 'https://yoursite.com/about',
    },
    datePublished: props.published,
    dateModified: props.updated || props.published,
    image: props.image,
    url: props.url,
    publisher: {
      '@type': 'Person',
      name: 'Your Name',
    },
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}
```

### 3. Update Blog Post Page with SEO
**`src/routes/blog/[slug].tsx`** (modify):
```tsx
import { MetaTags } from '~/components/seo/meta-tags'
import { BlogPostingSchema } from '~/components/seo/structured-data'

export default function BlogPost() {
  const post = createAsync(() => getPostBySlug(params.slug))

  return (
    <>
      <MetaTags
        title={post()?.title}
        description={post()?.excerpt}
        image={post()?.cover}
        url={`https://yoursite.com/blog/${post()?.slug}`}
        type="article"
      />

      <BlogPostingSchema
        title={post()?.title}
        excerpt={post()?.excerpt}
        published={post()?.published_date}
        updated={post()?.updated_date}
        image={post()?.cover}
        url={`https://yoursite.com/blog/${post()?.slug}`}
      />

      <BaseLayout>
        {/* Post content */}
      </BaseLayout>
    </>
  )
}
```

### 4. Generate Sitemap
**`src/routes/sitemap.xml.ts`**:
```ts
import { getPublishedPosts } from '~/lib/db/queries'

export async function GET() {
  const posts = await getPublishedPosts(1000, 0)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yoursite.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yoursite.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts
    .map(
      (post) => `
  <url>
    <loc>https://yoursite.com/blog/${post.slug}</loc>
    <lastmod>${post.updated_date || post.published_date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

### 5. Generate RSS Feed
**`src/routes/rss.xml.ts`**:
```ts
import { getPublishedPosts } from '~/lib/db/queries'

export async function GET() {
  const posts = await getPublishedPosts(20, 0)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>My Tech Blog</title>
    <description>Thoughts on software engineering</description>
    <link>https://yoursite.com</link>
    <atom:link href="https://yoursite.com/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <description>${post.excerpt}</description>
      <link>https://yoursite.com/blog/${post.slug}</link>
      <guid>https://yoursite.com/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
```

### 6. Create robots.txt
**`public/robots.txt`**:
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://yoursite.com/sitemap.xml
```

### 7. Optimize Images
**`src/components/blog/optimized-image.tsx`**:
```tsx
export function OptimizedImage(props: {
  src: string
  alt: string
  width?: number
  height?: number
}) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      loading="lazy"
      decoding="async"
      style={{
        'content-visibility': 'auto',
      }}
    />
  )
}
```

### 8. Add Font Optimization
**`src/root.tsx`** (modify):
```tsx
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </Head>
      <Body>
        <Suspense>
          <Routes>
            <FileRoutes />
          </Routes>
        </Suspense>
      </Body>
    </Html>
  )
}
```

### 9. Add Performance Monitoring
**`src/lib/analytics/web-vitals.ts`**:
```ts
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'

export function reportWebVitals() {
  onCLS(console.log)
  onFID(console.log)
  onLCP(console.log)
  onFCP(console.log)
  onTTFB(console.log)
}
```

### 10. Configure Build Optimization
**`app.config.ts`** (modify):
```ts
export default defineConfig({
  ssr: true,
  server: {
    preset: 'bun',
  },
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['solid-js', '@solidjs/router'],
          },
        },
      },
    },
  },
})
```

## Related Code Files

**New Files**:
- `src/components/seo/meta-tags.tsx` - SEO meta tags component
- `src/components/seo/structured-data.tsx` - JSON-LD schemas
- `src/routes/sitemap.xml.ts` - Dynamic sitemap
- `src/routes/rss.xml.ts` - RSS feed generator
- `src/components/blog/optimized-image.tsx` - Image optimization
- `src/lib/analytics/web-vitals.ts` - Performance monitoring
- `public/robots.txt` - Search engine crawler rules

**Modified Files**:
- `src/routes/blog/[slug].tsx` - Add meta tags
- `src/root.tsx` - Font optimization
- `app.config.ts` - Build optimization

## Todo Checklist

- [ ] Create meta tags component
- [ ] Add JSON-LD structured data
- [ ] Generate dynamic sitemap
- [ ] Create RSS feed
- [ ] Add robots.txt
- [ ] Optimize images (lazy loading)
- [ ] Add font preloading
- [ ] Minify CSS/JS
- [ ] Test OpenGraph preview (Facebook, LinkedIn)
- [ ] Test Twitter Card preview
- [ ] Run Lighthouse audit
- [ ] Fix performance issues
- [ ] Validate structured data (Google Rich Results)

## Success Criteria

- ✅ All pages have proper meta tags
- ✅ OpenGraph preview works on social media
- ✅ Sitemap accessible at /sitemap.xml
- ✅ RSS feed accessible at /rss.xml
- ✅ Lighthouse performance score >90
- ✅ Lighthouse SEO score 100
- ✅ No console errors
- ✅ Images lazy load correctly

## Risk Assessment

**Low Risk**: Standard SEO practices.

**Mitigation**:
- Use Google Rich Results Test
- Test with Facebook Sharing Debugger
- Monitor Core Web Vitals

## Next Steps

→ Proceed to [Phase 08: Deployment](./phase-08-deployment.md) to containerize and deploy to VPS.
