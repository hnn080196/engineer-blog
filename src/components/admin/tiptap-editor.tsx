import { createSignal, onMount, onCleanup, Show } from 'solid-js'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

interface TipTapEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const lowlight = createLowlight(common)

export default function TipTapEditor(props: TipTapEditorProps) {
  let editorRef: HTMLDivElement | undefined
  const [editor, setEditor] = createSignal<Editor | null>(null)
  const [showLinkInput, setShowLinkInput] = createSignal(false)
  const [linkUrl, setLinkUrl] = createSignal('')
  const [showImageInput, setShowImageInput] = createSignal(false)
  const [imageUrl, setImageUrl] = createSignal('')

  onMount(() => {
    const newEditor = new Editor({
      element: editorRef!,
      extensions: [
        StarterKit.configure({
          codeBlock: false,
        }),
        Image.configure({
          HTMLAttributes: {
            class: 'rounded-lg max-w-full',
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: 'text-[var(--color-accent)] underline',
          },
        }),
        Placeholder.configure({
          placeholder: props.placeholder || 'Start writing...',
        }),
        CodeBlockLowlight.configure({
          lowlight,
          HTMLAttributes: {
            class: 'bg-[var(--color-surface)] rounded-lg p-4 font-code text-sm overflow-x-auto',
          },
        }),
      ],
      content: props.content,
      editorProps: {
        attributes: {
          class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-4',
        },
      },
      onUpdate: ({ editor }) => {
        props.onChange(editor.getHTML())
      },
    })

    setEditor(newEditor)
  })

  onCleanup(() => {
    editor()?.destroy()
  })

  const addLink = () => {
    const url = linkUrl()
    if (url) {
      editor()?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
    setShowLinkInput(false)
    setLinkUrl('')
  }

  const addImage = () => {
    const url = imageUrl()
    if (url) {
      editor()?.chain().focus().setImage({ src: url }).run()
    }
    setShowImageInput(false)
    setImageUrl('')
  }

  return (
    <div class="border border-[var(--color-border)] rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div class="flex flex-wrap items-center gap-1 p-2 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleBold().run()}
          class={`toolbar-btn ${editor()?.isActive('bold') ? 'is-active' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleItalic().run()}
          class={`toolbar-btn ${editor()?.isActive('italic') ? 'is-active' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleStrike().run()}
          class={`toolbar-btn ${editor()?.isActive('strike') ? 'is-active' : ''}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleCode().run()}
          class={`toolbar-btn ${editor()?.isActive('code') ? 'is-active' : ''}`}
          title="Inline Code"
        >
          {'</>'}
        </button>

        <span class="w-px h-6 bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleHeading({ level: 1 }).run()}
          class={`toolbar-btn ${editor()?.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleHeading({ level: 2 }).run()}
          class={`toolbar-btn ${editor()?.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleHeading({ level: 3 }).run()}
          class={`toolbar-btn ${editor()?.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
          title="Heading 3"
        >
          H3
        </button>

        <span class="w-px h-6 bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleBulletList().run()}
          class={`toolbar-btn ${editor()?.isActive('bulletList') ? 'is-active' : ''}`}
          title="Bullet List"
        >
          *
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleOrderedList().run()}
          class={`toolbar-btn ${editor()?.isActive('orderedList') ? 'is-active' : ''}`}
          title="Ordered List"
        >
          1.
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleBlockquote().run()}
          class={`toolbar-btn ${editor()?.isActive('blockquote') ? 'is-active' : ''}`}
          title="Blockquote"
        >
          {'>'}
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().toggleCodeBlock().run()}
          class={`toolbar-btn ${editor()?.isActive('codeBlock') ? 'is-active' : ''}`}
          title="Code Block"
        >
          {'{ }'}
        </button>

        <span class="w-px h-6 bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => setShowLinkInput(!showLinkInput())}
          class={`toolbar-btn ${editor()?.isActive('link') ? 'is-active' : ''}`}
          title="Add Link"
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => setShowImageInput(!showImageInput())}
          class="toolbar-btn"
          title="Add Image"
        >
          Img
        </button>

        <span class="w-px h-6 bg-[var(--color-border)] mx-1" />

        <button
          type="button"
          onClick={() => editor()?.chain().focus().setHorizontalRule().run()}
          class="toolbar-btn"
          title="Horizontal Rule"
        >
          ---
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().undo().run()}
          class="toolbar-btn"
          title="Undo"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor()?.chain().focus().redo().run()}
          class="toolbar-btn"
          title="Redo"
        >
          Redo
        </button>
      </div>

      {/* Link Input */}
      <Show when={showLinkInput()}>
        <div class="flex items-center gap-2 p-2 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <input
            type="url"
            value={linkUrl()}
            onInput={(e) => setLinkUrl(e.currentTarget.value)}
            placeholder="Enter URL..."
            class="input flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addLink()}
          />
          <button type="button" onClick={addLink} class="btn btn-primary text-sm">
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false)
              setLinkUrl('')
            }}
            class="btn text-sm"
          >
            Cancel
          </button>
        </div>
      </Show>

      {/* Image Input */}
      <Show when={showImageInput()}>
        <div class="flex items-center gap-2 p-2 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <input
            type="url"
            value={imageUrl()}
            onInput={(e) => setImageUrl(e.currentTarget.value)}
            placeholder="Enter image URL..."
            class="input flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addImage()}
          />
          <button type="button" onClick={addImage} class="btn btn-primary text-sm">
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowImageInput(false)
              setImageUrl('')
            }}
            class="btn text-sm"
          >
            Cancel
          </button>
        </div>
      </Show>

      {/* Editor */}
      <div ref={editorRef} class="bg-[var(--color-bg)]" />

      <style>{`
        .toolbar-btn {
          padding: 0.375rem 0.625rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          transition: all 0.15s;
          background: transparent;
          color: var(--color-text-muted);
        }
        .toolbar-btn:hover {
          background: var(--color-border);
          color: var(--color-text);
        }
        .toolbar-btn.is-active {
          background: var(--color-accent);
          color: white;
        }
        .ProseMirror {
          min-height: 400px;
          padding: 1rem;
        }
        .ProseMirror:focus {
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: var(--color-text-muted);
          pointer-events: none;
          float: left;
          height: 0;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror p {
          margin-bottom: 0.75rem;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid var(--color-accent);
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
        }
        .ProseMirror code {
          background: var(--color-surface);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-family: var(--font-code);
        }
        .ProseMirror pre {
          background: var(--color-surface);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .ProseMirror pre code {
          background: none;
          padding: 0;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  )
}
