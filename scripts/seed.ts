// Database seeding script
import { getDb, posts, projects, settings } from '../src/lib/db'
import { hashPassword } from '../src/lib/auth'

async function seed() {
  console.log('🌱 Seeding database...')

  const db = getDb()

  // Clear existing data
  db.exec('DELETE FROM posts')
  db.exec('DELETE FROM projects')
  db.exec('DELETE FROM sessions')

  // Seed posts
  const samplePosts = [
    {
      slug: 'building-type-safe-apis-trpc-zod',
      title: 'Building Type-Safe APIs with tRPC and Zod',
      excerpt: 'Learn how to create end-to-end type-safe APIs using tRPC and Zod validation schemas.',
      content: `# Building Type-Safe APIs with tRPC and Zod

Type safety is one of the most powerful features of TypeScript, yet maintaining it across the full stack has traditionally been challenging. With **tRPC** and **Zod**, we can finally achieve true end-to-end type safety without code generation or schema duplication.

## What is tRPC?

tRPC (TypeScript Remote Procedure Call) is a framework that enables you to build fully type-safe APIs without schemas or code generation. It leverages TypeScript's type inference to provide:

- Automatic type inference for inputs and outputs
- No code generation required
- First-class support for React Query
- Built-in support for subscriptions

## Setting Up the Project

Let's start by installing the necessary dependencies:

\`\`\`bash
npm install @trpc/server @trpc/client @trpc/react-query zod
\`\`\`

## Creating the Router

\`\`\`typescript
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: \`Hello, \${input.name}!\` }
    }),
})

export type AppRouter = typeof appRouter
\`\`\`

## Conclusion

tRPC and Zod together provide an incredible developer experience for building type-safe APIs. The automatic type inference eliminates an entire class of runtime errors while keeping your codebase lean and maintainable.`,
      category: 'TypeScript',
      tags: JSON.stringify(['typescript', 'trpc', 'zod', 'api']),
      status: 'published' as const,
      publish_date: '2025-12-08',
      featured_image: null
    },
    {
      slug: 'optimizing-react-server-components',
      title: 'Optimizing React Server Components',
      excerpt: 'Deep dive into React Server Components performance optimization techniques.',
      content: `# Optimizing React Server Components

React Server Components (RSC) represent a paradigm shift in how we build React applications. By rendering components on the server, we can dramatically reduce the JavaScript sent to the client.

## Understanding Server Components

Server Components run exclusively on the server and have zero impact on bundle size. They can:

- Directly access databases
- Read from the filesystem
- Use server-only dependencies

## Performance Benefits

\`\`\`typescript
// This component runs only on the server
async function ProductList() {
  const products = await db.products.findMany()

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Best Practices

1. Keep client components small and focused
2. Use server components for data fetching
3. Leverage streaming for better UX
4. Minimize client-server boundaries`,
      category: 'Performance',
      tags: JSON.stringify(['react', 'performance', 'rsc', 'nextjs']),
      status: 'published' as const,
      publish_date: '2025-12-05',
      featured_image: null
    },
    {
      slug: 'zero-downtime-deployments-guide',
      title: 'Zero-Downtime Deployments Guide',
      excerpt: 'A comprehensive guide to achieving zero-downtime deployments in production.',
      content: `# Zero-Downtime Deployments Guide

Deploying new versions of your application without interrupting user experience is crucial for modern web applications. This guide covers strategies and best practices for achieving zero-downtime deployments.

## Deployment Strategies

### Blue-Green Deployment

\`\`\`yaml
# docker-compose.yml
services:
  app-blue:
    image: myapp:v1
    ports:
      - "3000"
  app-green:
    image: myapp:v2
    ports:
      - "3001"
  nginx:
    image: nginx
    ports:
      - "80:80"
\`\`\`

### Rolling Updates

Rolling updates gradually replace old instances with new ones:

1. Start new instance
2. Wait for health check
3. Route traffic to new instance
4. Stop old instance
5. Repeat until all instances updated

## Database Migrations

Handle schema changes carefully:

- Use expand-contract pattern
- Never break backward compatibility
- Run migrations before deployment`,
      category: 'DevOps',
      tags: JSON.stringify(['devops', 'deployment', 'docker', 'ci-cd']),
      status: 'published' as const,
      publish_date: '2025-12-03',
      featured_image: null
    }
  ]

  for (const post of samplePosts) {
    posts.create(post)
    console.log(`  ✓ Created post: ${post.title}`)
  }

  // Seed projects
  const sampleProjects = [
    {
      slug: 'devdash',
      title: 'DevDash',
      description: 'A real-time dashboard for monitoring CI/CD pipelines across multiple platforms.',
      content: `# DevDash

DevDash is a unified dashboard for monitoring your CI/CD pipelines across GitHub Actions, GitLab CI, and Jenkins.

## Features

- Real-time build status updates
- Multi-platform support
- Custom notifications
- Team collaboration`,
      tags: JSON.stringify(['React', 'GraphQL', 'WebSocket']),
      demo_url: 'https://devdash.demo',
      github_url: 'https://github.com/demo/devdash',
      status: 'published' as const,
      order_index: 1,
      featured_image: null
    },
    {
      slug: 'api-gateway',
      title: 'API Gateway',
      description: 'High-performance API gateway with rate limiting, caching, and analytics.',
      content: `# API Gateway

A lightweight, high-performance API gateway built with Go.

## Features

- Rate limiting per client
- Response caching with Redis
- Request/response logging
- Health check endpoints`,
      tags: JSON.stringify(['Go', 'Redis', 'Docker']),
      demo_url: null,
      github_url: 'https://github.com/demo/api-gateway',
      status: 'published' as const,
      order_index: 2,
      featured_image: null
    },
    {
      slug: 'codenotes',
      title: 'CodeNotes',
      description: 'Markdown note-taking app with code syntax highlighting and Git sync.',
      content: `# CodeNotes

A developer-focused note-taking application with first-class support for code snippets.

## Features

- Markdown editing with live preview
- Syntax highlighting for 50+ languages
- Git-based sync
- Cross-platform (macOS, Windows, Linux)`,
      tags: JSON.stringify(['TypeScript', 'Electron', 'MDX']),
      demo_url: 'https://codenotes.app',
      github_url: 'https://github.com/demo/codenotes',
      status: 'published' as const,
      order_index: 3,
      featured_image: null
    }
  ]

  for (const project of sampleProjects) {
    projects.create(project)
    console.log(`  ✓ Created project: ${project.title}`)
  }

  // Generate admin password hash (you should change this!)
  const defaultPassword = 'admin123'
  const passwordHash = await hashPassword(defaultPassword)
  console.log('\n📝 Admin credentials:')
  console.log(`   Email: admin@example.com`)
  console.log(`   Password: ${defaultPassword}`)
  console.log(`   Hash: ${passwordHash}`)
  console.log('\n   Add these to your .env.local:')
  console.log(`   ADMIN_EMAIL=admin@example.com`)
  console.log(`   ADMIN_PASSWORD_HASH=${passwordHash}`)

  // Set some default settings
  settings.set('site_title', 'HoaNguyen.dev')
  settings.set('site_description', 'Software engineering blog and portfolio')
  settings.set('site_url', 'http://localhost:3000')

  console.log('\n✅ Database seeded successfully!')
}

seed().catch(console.error)
