import { createSignal, For, Show, createResource } from 'solid-js'
import { A } from '@solidjs/router'
import Header from '~/components/layout/header'
import Footer from '~/components/layout/footer'
import PostCard from '~/components/blog/post-card'
import { posts as postsRepo } from '~/lib/db'
import type { Post } from '~/lib/db/schema'

// Server function to get posts
async function getPosts() {
  'use server'
  const allPosts = postsRepo.getAll({ status: 'published' })
  const categories = postsRepo.getCategories()
  const tags = postsRepo.getTags()
  return { posts: allPosts, categories, tags }
}

export default function BlogIndex() {
  const [data] = createResource(getPosts)
  const [searchQuery, setSearchQuery] = createSignal('')
  const [selectedCategory, setSelectedCategory] = createSignal<string | null>(null)

  const filteredPosts = () => {
    if (!data()) return []
    let filtered = data()!.posts

    if (selectedCategory()) {
      filtered = filtered.filter(p => p.category === selectedCategory())
    }

    if (searchQuery()) {
      const query = searchQuery().toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  return (
    <div class="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />

      <main class="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div class="mb-12">
          <h1 class="font-heading text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p class="text-lg text-[var(--color-text-muted)] max-w-2xl">
            Thoughts on software engineering, web development, and building products that matter.
          </p>
        </div>

        {/* Search and Filters */}
        <div class="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="search"
            placeholder="Search articles..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            class="input max-w-md"
          />

          <Show when={data()}>
            <div class="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                class={`px-4 py-2 rounded-full text-sm transition-colors ${
                  !selectedCategory()
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'
                }`}
              >
                All
              </button>
              <For each={data()!.categories}>
                {(cat) => (
                  <button
                    onClick={() => setSelectedCategory(cat.category)}
                    class={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedCategory() === cat.category
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]'
                    }`}
                  >
                    {cat.category}
                  </button>
                )}
              </For>
            </div>
          </Show>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          {/* Posts Grid */}
          <div class="lg:col-span-2">
            <Show
              when={!data.loading}
              fallback={<div class="text-center py-12">Loading posts...</div>}
            >
              <Show
                when={filteredPosts().length > 0}
                fallback={
                  <div class="text-center py-12 text-[var(--color-text-muted)]">
                    No posts found.
                  </div>
                }
              >
                {/* Featured Post */}
                <Show when={filteredPosts()[0] && !searchQuery() && !selectedCategory()}>
                  <div class="mb-8">
                    <span class="tag mb-4">Featured</span>
                    <PostCard post={filteredPosts()[0]!} featured />
                  </div>
                </Show>

                {/* Posts List */}
                <div class="grid md:grid-cols-2 gap-6">
                  <For each={searchQuery() || selectedCategory() ? filteredPosts() : filteredPosts().slice(1)}>
                    {(post) => <PostCard post={post} />}
                  </For>
                </div>
              </Show>
            </Show>
          </div>

          {/* Sidebar */}
          <aside class="space-y-8">
            {/* Categories */}
            <Show when={data()}>
              <div class="card">
                <h3 class="font-heading font-semibold mb-4">Categories</h3>
                <ul class="space-y-2">
                  <For each={data()!.categories}>
                    {(cat) => (
                      <li class="flex justify-between items-center">
                        <button
                          onClick={() => setSelectedCategory(cat.category)}
                          class="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          {cat.category}
                        </button>
                        <span class="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded">
                          {cat.count}
                        </span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>

            {/* Popular Tags */}
            <Show when={data()}>
              <div class="card">
                <h3 class="font-heading font-semibold mb-4">Popular Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <For each={data()!.tags.slice(0, 10)}>
                    {(tag) => (
                      <span class="tag cursor-pointer hover:bg-[var(--color-border)] transition-colors">
                        {tag.tag}
                      </span>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
