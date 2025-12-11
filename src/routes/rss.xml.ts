import type { APIEvent } from '@solidjs/start/server'
import { posts } from '~/lib/db'

const SITE_URL = 'https://hoanguyen.dev' // Update with actual domain
const SITE_NAME = 'Hoa Nguyen | Engineer Blog'
const SITE_DESCRIPTION = 'Technical insights, tutorials, and thoughts on software engineering, DevOps, and building great products.'

export async function GET(_event: APIEvent) {
  const allPosts = posts.getAll({ status: 'published' })

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <managingEditor>hoa@hoanguyen.dev (Hoa Nguyen)</managingEditor>
    <webMaster>hoa@hoanguyen.dev (Hoa Nguyen)</webMaster>
${allPosts
  .map(
    (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publish_date || post.created_at).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
