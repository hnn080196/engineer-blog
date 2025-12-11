import type { APIEvent } from '@solidjs/start/server'
import { isAuthenticated } from '~/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const UPLOAD_DIR = './public/uploads'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(event: APIEvent) {
  const cookieHeader = event.request.headers.get('cookie')
  if (!isAuthenticated(cookieHeader)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const formData = await event.request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return new Response(JSON.stringify({ error: 'File too large. Max size: 5MB' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true })
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 8)
    const filename = `${timestamp}-${randomStr}.${ext}`
    const filepath = join(UPLOAD_DIR, filename)

    // Write file
    const buffer = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(buffer))

    // Return the public URL
    const url = `/uploads/${filename}`

    return new Response(JSON.stringify({ url, filename }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
