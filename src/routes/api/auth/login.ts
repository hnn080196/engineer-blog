import type { APIEvent } from '@solidjs/start/server'
import { verifyAdminCredentials, createSession, getSessionCookieConfig } from '~/lib/auth'

export async function POST(event: APIEvent) {
  try {
    const body = await event.request.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const isValid = await verifyAdminCredentials(email, password)

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create session
    const sessionId = createSession()
    const cookieConfig = getSessionCookieConfig(sessionId)

    // Set cookie
    const cookieValue = `${cookieConfig.name}=${cookieConfig.value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${cookieConfig.options.maxAge}${
      cookieConfig.options.secure ? '; Secure' : ''
    }`

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookieValue
        }
      }
    )
  } catch (error) {
    console.error('Login error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
