import type { APIEvent } from '@solidjs/start/server'
import { isAuthenticated } from '~/lib/auth'
import { projects } from '~/lib/db'

// DELETE project
export async function DELETE(event: APIEvent) {
  const cookieHeader = event.request.headers.get('cookie')
  if (!isAuthenticated(cookieHeader)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const id = event.params.id
  if (!id) {
    return new Response(JSON.stringify({ error: 'Project ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    projects.delete(parseInt(id, 10))
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Delete project error:', error)
    return new Response(JSON.stringify({ error: 'Failed to delete project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// PUT update project
export async function PUT(event: APIEvent) {
  const cookieHeader = event.request.headers.get('cookie')
  if (!isAuthenticated(cookieHeader)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const id = event.params.id
  if (!id) {
    return new Response(JSON.stringify({ error: 'Project ID required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await event.request.json()
    projects.update(parseInt(id, 10), body)

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Update project error:', error)
    return new Response(JSON.stringify({ error: 'Failed to update project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
