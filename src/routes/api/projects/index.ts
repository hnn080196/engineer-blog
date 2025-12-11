import type { APIEvent } from '@solidjs/start/server'
import { isAuthenticated } from '~/lib/auth'
import { projects } from '~/lib/db'

// GET all projects
export async function GET(event: APIEvent) {
  const url = new URL(event.request.url)
  const status = url.searchParams.get('status')

  const options: { status?: 'published' | 'draft' } = {}
  if (status && ['published', 'draft'].includes(status)) {
    options.status = status as 'published' | 'draft'
  }

  const allProjects = projects.getAll(options)

  return new Response(JSON.stringify(allProjects), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}

// POST create new project
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

    if (!body.title || !body.slug) {
      return new Response(
        JSON.stringify({ error: 'Title and slug are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const existing = projects.getBySlug(body.slug)
    if (existing) {
      return new Response(
        JSON.stringify({ error: 'A project with this slug already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const id = projects.create({
      title: body.title,
      slug: body.slug,
      description: body.description || '',
      content: body.content || '',
      tags: body.tags || '[]',
      featured_image: body.featured_image || null,
      demo_url: body.demo_url || null,
      github_url: body.github_url || null,
      status: body.status || 'draft',
      order_index: body.order_index || 0,
    })

    return new Response(JSON.stringify({ id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Create project error:', error)
    return new Response(JSON.stringify({ error: 'Failed to create project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
