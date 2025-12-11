import { marked } from 'marked'
import { createHighlighter, type Highlighter } from 'shiki'

let highlighter: Highlighter | null = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['typescript', 'javascript', 'jsx', 'tsx', 'json', 'html', 'css', 'bash', 'python', 'go', 'rust', 'sql', 'yaml', 'markdown', 'dockerfile']
    })
  }
  return highlighter
}

export interface ParsedContent {
  html: string
  toc: TocItem[]
  readingTime: number
}

export interface TocItem {
  id: string
  text: string
  level: number
}

// Extract headings for table of contents
function extractToc(html: string): TocItem[] {
  const toc: TocItem[] = []
  const headingRegex = /<h([2-4])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-4]>/gi
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    toc.push({
      level: parseInt(match[1]!),
      id: match[2]!,
      text: match[3]!.trim()
    })
  }

  return toc
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}

// Generate slug from text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Parse markdown content with syntax highlighting
export async function parseMarkdown(content: string, theme: 'light' | 'dark' = 'light'): Promise<ParsedContent> {
  const hl = await getHighlighter()
  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light'

  // Custom renderer for code blocks
  const renderer = new marked.Renderer()

  renderer.code = ({ text, lang }) => {
    const language = lang || 'text'
    try {
      const highlighted = hl.codeToHtml(text, {
        lang: language,
        theme: shikiTheme
      })
      return `<div class="code-block" data-language="${language}">
        <div class="code-header">
          <span class="code-language">${language}</span>
          <button class="copy-button" onclick="navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent)">Copy</button>
        </div>
        ${highlighted}
      </div>`
    } catch {
      return `<pre><code class="language-${language}">${text}</code></pre>`
    }
  }

  // Add IDs to headings for TOC
  renderer.heading = ({ text, depth }) => {
    const id = slugify(text)
    return `<h${depth} id="${id}"><a href="#${id}" class="heading-anchor">#</a>${text}</h${depth}>`
  }

  // External links open in new tab
  renderer.link = ({ href, title, text }) => {
    const isExternal = href.startsWith('http')
    const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
    const titleAttr = title ? ` title="${title}"` : ''
    return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`
  }

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true
  })

  const html = await marked.parse(content)
  const toc = extractToc(html)
  const readingTime = calculateReadingTime(content)

  return { html, toc, readingTime }
}

// Parse frontmatter from markdown file
export function parseFrontmatter(content: string): { frontmatter: Record<string, string>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: {}, content }
  }

  const frontmatterStr = match[1]!
  const bodyContent = match[2]!

  const frontmatter: Record<string, string> = {}
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      frontmatter[key] = value
    }
  })

  return { frontmatter, content: bodyContent }
}
