# Phase 06: TipTap Editor Integration

**Related**: [Phase 05: Admin Panel](./phase-05-admin-panel.md) ← → [Phase 07: SEO & Performance](./phase-07-seo-performance.md)

## Overview

**Date**: 2025-12-11
**Priority**: High
**Status**: ⏸️ Pending
**Estimated Time**: 3 days

Integrate TipTap WYSIWYG editor with SolidJS wrapper, implement image upload with drag-drop, add markdown export, preview mode, and custom extensions.

## Key Insights

- TipTap requires custom SolidJS wrapper (no official support)
- Image upload needs backend endpoint + storage strategy
- Markdown export via tiptap-markdown extension
- Preview mode uses same MDX renderer as public pages

## Requirements

### Functional
- Rich text editing (bold, italic, headings, lists)
- Code blocks with syntax highlighting
- Image upload via drag-drop or file picker
- Link insertion with preview
- Markdown import/export
- Live preview toggle
- Autosave drafts
- Keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)

### Technical
- TipTap core + extensions
- Custom SolidJS integration
- Image upload to local filesystem or S3
- Markdown serialization
- Undo/redo history

## Architecture Decisions

### TipTap Extensions
```
StarterKit (basic formatting)
├── Bold, Italic, Strike
├── Heading, Paragraph
├── BulletList, OrderedList
└── Blockquote, CodeBlock

Additional:
├── Image (with upload)
├── Link (with validation)
├── CodeBlockLowlight (syntax highlighting)
├── Placeholder
└── CharacterCount
```

### Image Upload Strategy
**Option 1: Local Filesystem** (chosen for simplicity)
- Upload to `public/uploads/images/`
- Serve via static file handler
- Pros: Simple, no external deps
- Cons: Not scalable, no CDN

**Option 2: S3/R2** (future upgrade)
- Upload to cloud storage
- Serve via CDN
- Pros: Scalable, fast delivery
- Cons: Requires credentials, costs

### Component Architecture
```tsx
<Editor>
  ├── <Toolbar>
  │   ├── <FormatButtons />
  │   ├── <ImageUploadButton />
  │   └── <PreviewToggle />
  ├── <EditorContent />
  └── <PreviewPane />
```

## Implementation Steps

### 1. Install TipTap Dependencies
```bash
bun add @tiptap/core @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-code-block-lowlight
bun add lowlight tiptap-markdown
bun add @solidjs/reactivity
```

### 2. Create SolidJS TipTap Wrapper
**`src/lib/editor/tiptap-solid.tsx`**:
```tsx
import { createEffect, onCleanup, onMount } from 'solid-js'
import { Editor, EditorOptions } from '@tiptap/core'

export function useTipTap(options: Partial<EditorOptions>) {
  let editor: Editor | null = null

  onMount(() => {
    editor = new Editor({
      ...options,
      element: document.querySelector('.tiptap-editor'),
    })
  })

  onCleanup(() => {
    editor?.destroy()
  })

  return () => editor
}

export function EditorContent(props: { editor: Editor }) {
  let ref: HTMLDivElement

  createEffect(() => {
    if (ref && props.editor) {
      props.editor.options.element = ref
    }
  })

  return <div ref={ref!} class="tiptap-editor" />
}
```

### 3. Create Editor Extensions Config
**`src/lib/editor/extensions.ts`**:
```ts
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'

export const extensions = [
  StarterKit.configure({
    codeBlock: false, // Use CodeBlockLowlight instead
  }),
  Image.configure({
    inline: true,
    allowBase64: false,
  }),
  Link.configure({
    openOnClick: false,
    linkOnPaste: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: 'typescript',
  }),
  Markdown.configure({
    transformPastedText: true,
  }),
]
```

### 4. Create Editor Component
**`src/components/admin/editor.tsx`**:
```tsx
import { createSignal, Show } from 'solid-js'
import { useTipTap, EditorContent } from '~/lib/editor/tiptap-solid'
import { extensions } from '~/lib/editor/extensions'

export function Editor(props: {
  content: string
  onChange: (content: string) => void
}) {
  const [showPreview, setShowPreview] = createSignal(false)

  const editor = useTipTap({
    extensions,
    content: props.content,
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown()
      props.onChange(markdown)
    },
  })

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })

    const { url } = await res.json()
    editor()?.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div class="editor-wrapper">
      <Toolbar editor={editor()} onImageUpload={handleImageUpload} />

      <div class="flex gap-4">
        <Show when={!showPreview()}>
          <EditorContent editor={editor()!} />
        </Show>

        <Show when={showPreview()}>
          <PreviewPane content={editor()?.storage.markdown.getMarkdown()} />
        </Show>
      </div>

      <button onClick={() => setShowPreview(!showPreview())}>
        {showPreview() ? 'Edit' : 'Preview'}
      </button>
    </div>
  )
}
```

### 5. Create Toolbar Component
**`src/components/admin/editor-toolbar.tsx`**:
```tsx
import { Editor } from '@tiptap/core'

export function Toolbar(props: {
  editor: Editor
  onImageUpload: (file: File) => void
}) {
  const { editor } = props

  return (
    <div class="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        classList={{ 'is-active': editor.isActive('bold') }}
      >
        Bold
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        classList={{ 'is-active': editor.isActive('italic') }}
      >
        Italic
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        classList={{ 'is-active': editor.isActive('heading', { level: 2 }) }}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        classList={{ 'is-active': editor.isActive('codeBlock') }}
      >
        Code Block
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          if (file) props.onImageUpload(file)
        }}
      />
    </div>
  )
}
```

### 6. Create Image Upload API
**`src/routes/api/admin/upload.ts`**:
```ts
import { json } from '@solidjs/router'
import { requireAuth } from '~/server/middleware/auth'
import { writeFile } from 'node:fs/promises'
import { nanoid } from 'nanoid'
import path from 'node:path'

export async function POST({ request }: { request: Request }) {
  requireAuth(request)

  const formData = await request.formData()
  const file = formData.get('image') as File

  if (!file) {
    return json({ error: 'No file provided' }, { status: 400 })
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return json({ error: 'Invalid file type' }, { status: 400 })
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return json({ error: 'File too large' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const filename = `${nanoid(12)}.${ext}`
  const filepath = path.join(process.cwd(), 'public/uploads/images', filename)

  const buffer = await file.arrayBuffer()
  await writeFile(filepath, Buffer.from(buffer))

  return json({ url: `/uploads/images/${filename}` })
}
```

### 7. Add Autosave
**`src/components/admin/editor.tsx`** (add):
```tsx
import { createEffect, createSignal } from 'solid-js'

const [lastSaved, setLastSaved] = createSignal<Date | null>(null)

// Autosave every 30 seconds
createEffect(() => {
  const content = editor()?.storage.markdown.getMarkdown()
  if (!content) return

  const timer = setTimeout(async () => {
    await fetch('/api/admin/posts/autosave', {
      method: 'POST',
      body: JSON.stringify({ content }),
    })
    setLastSaved(new Date())
  }, 30000)

  return () => clearTimeout(timer)
})
```

### 8. Create Preview Pane
**`src/components/admin/preview-pane.tsx`**:
```tsx
import { Show } from 'solid-js'
import { MDXProvider } from '@mdx-js/solid'
import { mdxComponents } from '~/components/blog/mdx-components'

export function PreviewPane(props: { content: string }) {
  return (
    <div class="preview-pane prose dark:prose-invert">
      <MDXProvider components={mdxComponents}>
        <Show when={props.content}>
          {/* Render MDX content */}
          {props.content}
        </Show>
      </MDXProvider>
    </div>
  )
}
```

### 9. Add Editor Styles
**`src/styles/editor.css`**:
```css
.tiptap-editor {
  min-height: 500px;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.tiptap-editor:focus {
  outline: 2px solid #3b82f6;
}

.toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.toolbar button.is-active {
  background-color: #3b82f6;
  color: white;
}
```

## Related Code Files

**New Files**:
- `src/lib/editor/tiptap-solid.tsx` - SolidJS wrapper
- `src/lib/editor/extensions.ts` - TipTap extensions config
- `src/components/admin/editor.tsx` - Main editor component
- `src/components/admin/editor-toolbar.tsx` - Formatting toolbar
- `src/components/admin/preview-pane.tsx` - Preview mode
- `src/routes/api/admin/upload.ts` - Image upload endpoint
- `src/styles/editor.css` - Editor styles

**Modified Files**:
- `src/components/admin/post-form.tsx` - Replace textarea with Editor

## Todo Checklist

- [ ] Install TipTap dependencies
- [ ] Create SolidJS wrapper for TipTap
- [ ] Configure extensions
- [ ] Build editor component
- [ ] Create toolbar with formatting buttons
- [ ] Implement image upload endpoint
- [ ] Add drag-drop image upload
- [ ] Implement markdown export
- [ ] Build preview pane
- [ ] Add autosave functionality
- [ ] Add keyboard shortcuts
- [ ] Style editor UI
- [ ] Test in post form
- [ ] Handle edge cases (large files, errors)

## Success Criteria

- ✅ Editor renders with formatting options
- ✅ Bold, italic, headings work correctly
- ✅ Images upload and display
- ✅ Code blocks have syntax highlighting
- ✅ Markdown export produces valid MDX
- ✅ Preview matches public blog rendering
- ✅ Autosave works every 30 seconds
- ✅ No memory leaks on editor unmount

## Risk Assessment

**High Risk**: TipTap SolidJS integration (unofficial)

**Mitigation**:
- Use TipTap's vanilla JS API
- Create minimal wrapper (avoid overengineering)
- Test thoroughly for memory leaks
- Consider alternative: Monaco editor with markdown mode

**Medium Risk**: Image upload security

**Mitigation**:
- Validate file types and sizes
- Use unique filenames (nanoid)
- Store outside public git repo
- Add rate limiting

## Next Steps

→ Proceed to [Phase 07: SEO & Performance](./phase-07-seo-performance.md) to optimize for search engines.
