# Phase 04: Admin Authentication

**Related**: [Phase 03: Public Pages](./phase-03-public-pages.md) ← → [Phase 05: Admin Panel](./phase-05-admin-panel.md)

## Overview

**Date**: 2025-12-11
**Priority**: Critical
**Status**: ⏸️ Pending
**Estimated Time**: 2 days

Implement session-based authentication with Argon2 password hashing, secure session management, and auth middleware.

## Key Insights

- Session-based auth simpler than JWT for single admin
- Argon2 more secure than bcrypt (memory-hard)
- HTTP-only cookies prevent XSS attacks
- Middleware protects admin routes at framework level

## Requirements

### Functional
- Admin login with email/password
- Secure session creation and validation
- Logout functionality
- Protected admin routes
- "Remember me" option (30-day session)

### Security
- Argon2id password hashing
- HTTP-only, Secure, SameSite cookies
- CSRF protection
- Rate limiting on login endpoint
- Session expiration (1 hour default, 30 days if remembered)

## Architecture Decisions

### Session Storage
Store sessions in SQLite (single admin, low traffic):

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_expires ON sessions(expires_at);
```

### Auth Flow
```
Login → Verify password → Create session → Set cookie → Redirect to dashboard
Protected route → Check cookie → Validate session → Allow/deny
Logout → Delete session → Clear cookie → Redirect to home
```

## Implementation Steps

### 1. Install Dependencies
```bash
bun add @node-rs/argon2 nanoid
```

### 2. Create Users Table
**`src/lib/db/migrations.ts`** (add to existing):
```ts
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
`)
```

### 3. Create Auth Utilities
**`src/lib/auth/password.ts`**:
```ts
import { hash, verify } from '@node-rs/argon2'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return verify(hash, password)
}
```

**`src/lib/auth/session.ts`**:
```ts
import { nanoid } from 'nanoid'
import { db } from '../db/client'

export function createSession(userId: number, rememberMe = false) {
  const sessionId = nanoid(32)
  const expiresAt = Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000)

  db.prepare(`
    INSERT INTO sessions (id, user_id, expires_at)
    VALUES (?, ?, ?)
  `).run(sessionId, userId, expiresAt)

  return { sessionId, expiresAt }
}

export function validateSession(sessionId: string) {
  const session = db.prepare(`
    SELECT s.*, u.email, u.name
    FROM sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.id = ? AND s.expires_at > unixepoch() * 1000
  `).get(sessionId)

  return session || null
}

export function deleteSession(sessionId: string) {
  db.prepare(`DELETE FROM sessions WHERE id = ?`).run(sessionId)
}

export function cleanExpiredSessions() {
  db.prepare(`DELETE FROM sessions WHERE expires_at < unixepoch() * 1000`).run()
}
```

### 4. Create Login API Route
**`src/routes/api/auth/login.ts`**:
```ts
import { json } from '@solidjs/router'
import { verifyPassword } from '~/lib/auth/password'
import { createSession } from '~/lib/auth/session'
import { db } from '~/lib/db/client'

export async function POST({ request }: { request: Request }) {
  const { email, password, rememberMe } = await request.json()

  // Rate limiting (simple in-memory)
  // TODO: Implement proper rate limiting

  const user = db.prepare(`
    SELECT * FROM users WHERE email = ?
  `).get(email)

  if (!user || !(await verifyPassword(user.password_hash, password))) {
    return json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const { sessionId, expiresAt } = createSession(user.id, rememberMe)

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${(expiresAt - Date.now()) / 1000}`,
      },
    }
  )
}
```

### 5. Create Logout API Route
**`src/routes/api/auth/logout.ts`**:
```ts
import { json } from '@solidjs/router'
import { deleteSession } from '~/lib/auth/session'

export async function POST({ request }: { request: Request }) {
  const cookie = request.headers.get('Cookie')
  const sessionId = cookie?.match(/session=([^;]+)/)?.[1]

  if (sessionId) {
    deleteSession(sessionId)
  }

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      },
    }
  )
}
```

### 6. Create Auth Middleware
**`src/server/middleware/auth.ts`**:
```ts
import { redirect } from '@solidjs/router'
import { validateSession } from '~/lib/auth/session'

export function requireAuth(request: Request) {
  const cookie = request.headers.get('Cookie')
  const sessionId = cookie?.match(/session=([^;]+)/)?.[1]

  if (!sessionId) {
    throw redirect('/admin/login')
  }

  const session = validateSession(sessionId)

  if (!session) {
    throw redirect('/admin/login')
  }

  return session
}
```

### 7. Create Login Page
**`src/routes/admin/login.tsx`**:
```tsx
import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

export default function Login() {
  const [email, setEmail] = createSignal('')
  const [password, setPassword] = createSignal('')
  const [rememberMe, setRememberMe] = createSignal(false)
  const [error, setError] = createSignal('')
  const navigate = useNavigate()

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email(),
        password: password(),
        rememberMe: rememberMe(),
      }),
    })

    if (res.ok) {
      navigate('/admin/dashboard')
    } else {
      const data = await res.json()
      setError(data.error)
    }
  }

  return (
    <div class="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} class="max-w-md w-full">
        <h1>Admin Login</h1>

        {error() && <div class="text-red-500">{error()}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword(e.currentTarget.value)}
          required
        />

        <label>
          <input
            type="checkbox"
            checked={rememberMe()}
            onChange={(e) => setRememberMe(e.currentTarget.checked)}
          />
          Remember me (30 days)
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
```

### 8. Create Admin User Script
**`scripts/create-admin.ts`**:
```ts
import { hashPassword } from '../src/lib/auth/password'
import { db } from '../src/lib/db/client'

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Usage: bun run scripts/create-admin.ts <email> <password>')
  process.exit(1)
}

const passwordHash = await hashPassword(password)

db.prepare(`
  INSERT INTO users (email, password_hash, name)
  VALUES (?, ?, ?)
`).run(email, passwordHash, 'Admin')

console.log(`✓ Admin user created: ${email}`)
```

Add to `package.json`:
```json
{
  "scripts": {
    "create-admin": "bun run scripts/create-admin.ts"
  }
}
```

## Related Code Files

**New Files**:
- `src/lib/auth/password.ts` - Password hashing utilities
- `src/lib/auth/session.ts` - Session management
- `src/server/middleware/auth.ts` - Auth middleware
- `src/routes/api/auth/login.ts` - Login endpoint
- `src/routes/api/auth/logout.ts` - Logout endpoint
- `src/routes/admin/login.tsx` - Login page
- `scripts/create-admin.ts` - Admin user creation script

**Modified Files**:
- `src/lib/db/migrations.ts` - Add users/sessions tables

## Todo Checklist

- [ ] Install Argon2 and nanoid
- [ ] Create users and sessions tables
- [ ] Implement password hashing utilities
- [ ] Build session management functions
- [ ] Create login API route
- [ ] Create logout API route
- [ ] Implement auth middleware
- [ ] Build login page UI
- [ ] Create admin user script
- [ ] Test login/logout flow
- [ ] Verify session persistence
- [ ] Test "remember me" functionality

## Success Criteria

- ✅ Admin can log in with correct credentials
- ✅ Invalid credentials rejected
- ✅ Session persists across page reloads
- ✅ Protected routes redirect to login
- ✅ Logout clears session
- ✅ "Remember me" extends session to 30 days
- ✅ Expired sessions cleaned up
- ✅ Cookies are HTTP-only and Secure

## Risk Assessment

**Medium Risk**: Session management complexity

**Mitigation**:
- Use proven session library patterns
- Test expiration edge cases
- Add session cleanup cron job
- Monitor for session fixation attacks

## Next Steps

→ Proceed to [Phase 05: Admin Panel](./phase-05-admin-panel.md) to build dashboard and CRUD operations.
