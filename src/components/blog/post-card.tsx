import { A } from '@solidjs/router'
import type { Post } from '~/lib/db/schema'
import { formatDate } from '~/lib/utils'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard(props: PostCardProps) {
  const tags = () => props.post.tags || []

  return (
    <A
      href={`/blog/${props.post.slug}`}
      class={`card group block ${props.featured ? 'md:flex md:gap-6' : ''}`}
    >
      {/* Featured Image */}
      {props.post.featured_image && (
        <div class={`${props.featured ? 'md:w-1/2' : ''} mb-4 md:mb-0`}>
          <img
            src={props.post.featured_image}
            alt={props.post.title}
            class="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div class={props.featured && props.post.featured_image ? 'md:w-1/2' : ''}>
        {/* Category */}
        <span class="tag mb-2">{props.post.category}</span>

        {/* Title */}
        <h3 class={`font-heading font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors ${
          props.featured ? 'text-xl md:text-2xl' : 'text-lg'
        }`}>
          {props.post.title}
        </h3>

        {/* Excerpt */}
        <p class="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2">
          {props.post.excerpt}
        </p>

        {/* Meta */}
        <div class="flex items-center justify-between">
          <span class="text-sm text-[var(--color-text-muted)]">
            {formatDate(props.post.publish_date || props.post.created_at)}
          </span>

          {/* Tags */}
          <div class="flex gap-2">
            {tags().slice(0, 2).map((tag) => (
              <span class="text-xs text-[var(--color-text-muted)]">#{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </A>
  )
}
