import { hash, verify } from '@node-rs/argon2'
import { sessions } from '../db'

const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 30 * 24 * 60 * 60 // 30 days in seconds

// Hash password using Argon2
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1
  })
}

// Verify password against hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await verify(hashedPassword, password)
  } catch {
    return false
  }
}

// Create a new session and return the session ID
export function createSession(): string {
  return sessions.create(SESSION_DURATION)
}

// Validate session by ID
export function validateSession(sessionId: string): boolean {
  return sessions.validate(sessionId)
}

// Delete session (logout)
export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId)
}

// Clean up expired sessions
export function cleanupSessions(): void {
  sessions.cleanup()
}

// Get session cookie configuration
export function getSessionCookieConfig(sessionId: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: SESSION_DURATION,
      path: '/'
    }
  }
}

// Parse session from cookie string
export function parseSessionCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    if (key && value) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, string>)

  return cookies[SESSION_COOKIE_NAME] || null
}

// Check if request is authenticated
export function isAuthenticated(cookieHeader: string | null): boolean {
  const sessionId = parseSessionCookie(cookieHeader)
  if (!sessionId) return false
  return validateSession(sessionId)
}

// Admin credentials check (single admin)
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminEmail || !adminPasswordHash) {
    console.error('Admin credentials not configured in environment variables')
    return false
  }

  if (email !== adminEmail) {
    return false
  }

  return await verifyPassword(password, adminPasswordHash)
}
