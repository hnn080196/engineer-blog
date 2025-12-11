import type { APIEvent } from '@solidjs/start/server'
import { isAuthenticated } from '~/lib/auth'
import { posts } from '~/lib/db'

// GET all posts
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url)
  const status = url.searchParams.get('status')
  const limit = url.searchParams.get('limit')

  const options: { status?: 'published' | 'draft' | 'scheduled'; limit?: number } = {}
  if (status && ['published', 'draft', 'scheduled'].includes(status)) {
    options.status = status as 'published' | 'draft' | 'scheduled'
  }
  if (limit) {
    options.limit = parseInt(limit, 10)
  }

  const allPosts = posts.getAll(options)

  return new Response(JSON.stringify(allPosts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

// POST create new post
export async function POST(event: APIEvent) {
  const cookieHeader = event.request.headers.get('cookie')
  if (!isAuthenticated(cookieHeader)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await event.request.json()

    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return new Response(
        JSON.stringify({ error: 'Title, slug, and content are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if slug already exists
    const existing = posts.getBySlug(body.slug)
    if (existing) {
      return new Response(
        JSON.stringify({ error: 'A post with this slug already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const newPost = posts.create({
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || '',
      category: body.category || 'Uncategorized',
      tags: body.tags || [],
      cover_image: body.cover_image || null,
      status: body.status || 'draft',
      publish_date: body.publish_date || null,
    })

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Create post error:', error)
    return new Response(JSON.stringify({ error: 'Failed to create post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
