import type { APIEvent } from '@solidjs/start/server'
import { posts, projects } from '~/lib/db'

const SITE_URL = 'https://hoanguyen.dev' // Update with actual domain

export async function GET(_event: APIEvent) {
  const allPosts = posts.getAll({ status: 'published' })
  const allProjects = projects.getAll()

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
  ]

  const postPages = allPosts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: post.updated_at || post.publish_date || post.created_at,
  }))

  const projectPages = allProjects.map((project) => ({
    url: `/projects#${project.id}`,
    priority: '0.6',
    changefreq: 'monthly',
  }))

  type SitemapPage = {
    url: string
    priority: string
    changefreq: string
    lastmod?: string | null
  }

  const allPages: SitemapPage[] = [...staticPages, ...postPages, ...projectPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>${
      page.lastmod
        ? `
    <lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>`
        : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
