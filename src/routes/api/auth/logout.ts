import type { APIEvent } from '@solidjs/start/server'
import { parseSessionCookie, deleteSession } from '~/lib/auth'

export async function POST(event: APIEvent) {
  try {
    const cookieHeader = event.request.headers.get('cookie')
    const sessionId = parseSessionCookie(cookieHeader)

    if (sessionId) {
      deleteSession(sessionId)
    }

    // Clear the session cookie
    const clearCookie = 'admin_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': clearCookie
        }
      }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
