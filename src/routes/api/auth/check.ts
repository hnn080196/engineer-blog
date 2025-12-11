import type { APIEvent } from '@solidjs/start/server'
import { isAuthenticated } from '~/lib/auth'

export async function GET(event: APIEvent) {
  const cookieHeader = event.request.headers.get('cookie')
  const authenticated = isAuthenticated(cookieHeader)

  return new Response(
    JSON.stringify({ authenticated }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}
