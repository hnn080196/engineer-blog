import { createResource, Show, For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import SEO from '~/components/seo'
import { posts as postsRepo } from '~/lib/db'
import { parseMarkdown } from '~/lib/mdx'
import { formatDate } from '~/lib/utils'

// Server function to get post by slug
async function getPost(slug: string) {
  'use server'
  const post = postsRepo.getBySlug(slug)
  if (!post) return null

  // Increment view count
  postsRepo.incrementViews(post.id)

  // Parse markdown content
  const parsed = await parseMarkdown(post.content)

  // Get related posts (same category)
  const relatedPosts = postsRepo.getByCategory(post.category)
    .filter(p => p.id !== post.id)
    .slice(0, 3)

  return {
    post,
    content: parsed,
    relatedPosts
  }
}

export default function BlogPost() {
  const params = useParams()
  const [data] = createResource(() => params.slug, getPost)

  const tags = () => data()?.post?.tags || []

  return (
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />

      <Show
        when={!data.loading}
        fallback={
          <main class="container mx-auto px-4 py-12">
            <div class="text-center">Loading...</div>
          </main>
        }
      >
        <Show
          when={data()}
          fallback={
            <main class="container mx-auto px-4 py-12">
              <div class="text-center">
                <h1 class="font-heading text-2xl mb-4">Post not found</h1>
                <A href="/blog" class="text-[var(--color-accent)]">← Back to blog</A>
              </div>
            </main>
          }
        >
          <SEO
            title={data()!.post.title}
            description={data()!.post.excerpt}
            image={data()!.post.cover_image || undefined}
            url={`https://hoanguyen.dev/blog/${data()!.post.slug}`}
            type="article"
            publishedTime={data()!.post.publish_date || data()!.post.created_at}
            author="Hoa Nguyen"
            tags={tags()}
          />
          <main>
            {/* Breadcrumb */}
            <div class="container mx-auto px-4 py-4">
              <nav class="text-sm text-[var(--color-text-muted)]">
                <A href="/" class="hover:text-[var(--color-accent)]">Home</A>
                <span class="mx-2">/</span>
                <A href="/blog" class="hover:text-[var(--color-accent)]">Blog</A>
                <span class="mx-2">/</span>
                <span>{data()!.post.category}</span>
              </nav>
            </div>

            <article class="container mx-auto px-4 py-8">
              <div class="grid lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div class="lg:col-span-3">
                  {/* Header */}
                  <header class="mb-8">
                    <span class="tag mb-4">{data()!.post.category}</span>
                    <h1 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {data()!.post.title}
                    </h1>
                    <p class="text-lg text-[var(--color-text-muted)] mb-6">
                      {data()!.post.excerpt}
                    </p>

                    {/* Meta */}
                    <div class="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                      <div class="flex items-center gap-2">
                        <span class="w-8 h-8 bg-[var(--color-surface)] rounded-full flex items-center justify-center">
                          👤
                        </span>
                        <span>Hoa Nguyen</span>
                      </div>
                      <span>|</span>
                      <span>{formatDate(data()!.post.publish_date || data()!.post.created_at)}</span>
                      <span>|</span>
                      <span>{data()!.content.readingTime} min read</span>
                      <span>|</span>
                      <span>{data()!.post.views} views</span>
                    </div>
                  </header>

                  {/* Featured Image */}
                  <Show when={data()!.post.featured_image}>
                    <img
                      src={data()!.post.featured_image!}
                      alt={data()!.post.title}
                      class="w-full h-auto rounded-lg mb-8"
                    />
                  </Show>

                  {/* Content */}
                  <div
                    class="prose prose-lg max-w-none"
                    innerHTML={data()!.content.html}
                  />

                  {/* Tags */}
                  <div class="mt-8 pt-8 border-t border-[var(--color-border)]">
                    <div class="flex flex-wrap gap-2">
                      <For each={tags()}>
                        {(tag) => (
                          <span class="tag">#{tag}</span>
                        )}
                      </For>
                    </div>
                  </div>

                  {/* Author Box */}
                  <div class="mt-8 p-6 bg-[var(--color-surface)] rounded-xl">
                    <div class="flex items-center gap-4">
                      <div class="w-16 h-16 bg-[var(--color-border)] rounded-full flex items-center justify-center text-2xl">
                        👨‍💻
                      </div>
                      <div>
                        <h4 class="font-heading font-semibold">Hoa Nguyen</h4>
                        <p class="text-sm text-[var(--color-text-muted)]">
                          Software engineer writing about web development and system design.
                        </p>
                        <A href="/about" class="text-sm text-[var(--color-accent)]">
                          View profile →
                        </A>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <aside class="lg:col-span-1">
                  <div class="sticky top-24 space-y-6">
                    {/* Table of Contents */}
                    <Show when={data()!.content.toc.length > 0}>
                      <div class="card">
                        <h4 class="font-heading font-semibold mb-4">On This Page</h4>
                        <nav>
                          <ul class="space-y-2 text-sm">
                            <For each={data()!.content.toc}>
                              {(item) => (
                                <li style={{ "padding-left": `${(item.level - 2) * 12}px` }}>
                                  <a
                                    href={`#${item.id}`}
                                    class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                                  >
                                    {item.text}
                                  </a>
                                </li>
                              )}
                            </For>
                          </ul>
                        </nav>
                      </div>
                    </Show>
                  </div>
                </aside>
              </div>

              {/* Related Posts */}
              <Show when={data()!.relatedPosts.length > 0}>
                <section class="mt-16 pt-8 border-t border-[var(--color-border)]">
                  <h3 class="font-heading text-2xl font-semibold mb-8">Related Posts</h3>
                  <div class="grid md:grid-cols-3 gap-6">
                    <For each={data()!.relatedPosts}>
                      {(post) => (
                        <A href={`/blog/${post.slug}`} class="card group">
                          <span class="tag mb-2">{post.category}</span>
                          <h4 class="font-heading font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                            {post.title}
                          </h4>
                          <p class="text-sm text-[var(--color-text-muted)] mt-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </A>
                      )}
                    </For>
                  </div>
                </section>
              </Show>
            </article>
          </main>
        </Show>
      </Show>

      <Footer />

      {/* Prose styles for markdown content */}
      <style>{`
        .prose {
          color: var(--color-text);
        }
        .prose h1, .prose h2, .prose h3, .prose h4 {
          font-family: var(--font-heading);
          color: var(--color-text);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose h2 { font-size: 1.75rem; }
        .prose h3 { font-size: 1.5rem; }
        .prose h4 { font-size: 1.25rem; }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }
        .prose a {
          color: var(--color-accent);
        }
        .prose ul, .prose ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin: 0.5rem 0;
        }
        .prose blockquote {
          border-left: 4px solid var(--color-accent);
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: var(--color-text-muted);
          font-style: italic;
        }
        .prose img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5rem 0;
        }
        .code-block {
          position: relative;
          margin: 1.5rem 0;
        }
        .code-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 1rem;
          background: var(--color-surface);
          border-radius: 8px 8px 0 0;
          border: 1px solid var(--color-border);
          border-bottom: none;
        }
        .code-language {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--color-text-muted);
        }
        .copy-button {
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 4px;
          cursor: pointer;
          color: var(--color-text-muted);
        }
        .copy-button:hover {
          background: var(--color-border);
        }
        .code-block pre {
          margin: 0 !important;
          border-radius: 0 0 8px 8px !important;
        }
        .heading-anchor {
          opacity: 0;
          margin-right: 0.5rem;
          color: var(--color-text-muted);
        }
        h2:hover .heading-anchor,
        h3:hover .heading-anchor,
        h4:hover .heading-anchor {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
