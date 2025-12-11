import { Title, Meta, Link } from '@solidjs/meta'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  tags?: string[]
}

const SITE_NAME = 'Hoa Nguyen | Engineer Blog'
const DEFAULT_DESCRIPTION = 'Technical insights, tutorials, and thoughts on software engineering, DevOps, and building great products.'
const SITE_URL = 'https://hoanguyen.dev' // Update with actual domain

export default function SEO(props: SEOProps) {
  const title = () => props.title ? `${props.title} | ${SITE_NAME}` : SITE_NAME
  const description = () => props.description || DEFAULT_DESCRIPTION
  const image = () => props.image || `${SITE_URL}/og-default.png`
  const url = () => props.url || SITE_URL

  return (
    <>
      <Title>{title()}</Title>
      <Meta name="description" content={description()} />
      <Link rel="canonical" href={url()} />

      {/* Open Graph */}
      <Meta property="og:title" content={title()} />
      <Meta property="og:description" content={description()} />
      <Meta property="og:image" content={image()} />
      <Meta property="og:url" content={url()} />
      <Meta property="og:type" content={props.type || 'website'} />
      <Meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={title()} />
      <Meta name="twitter:description" content={description()} />
      <Meta name="twitter:image" content={image()} />

      {/* Article specific */}
      {props.type === 'article' && props.publishedTime && (
        <Meta property="article:published_time" content={props.publishedTime} />
      )}
      {props.type === 'article' && props.author && (
        <Meta property="article:author" content={props.author} />
      )}
      {props.type === 'article' && props.tags && props.tags.map((tag) => (
        <Meta property="article:tag" content={tag} />
      ))}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(
          props.type === 'article'
            ? {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: props.title,
                description: description(),
                image: image(),
                url: url(),
                datePublished: props.publishedTime,
                author: {
                  '@type': 'Person',
                  name: props.author || 'Hoa Nguyen',
                },
                publisher: {
                  '@type': 'Organization',
                  name: SITE_NAME,
                },
              }
            : {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: SITE_NAME,
                description: DEFAULT_DESCRIPTION,
                url: SITE_URL,
                author: {
                  '@type': 'Person',
                  name: 'Hoa Nguyen',
                },
              }
        )}
      </script>
    </>
  )
}
