import { createSignal, For, Show } from 'solid-js'
import AdminSidebar from '~/components/admin/sidebar'

export default function AdminMedia() {
  const [uploading, setUploading] = createSignal(false)
  const [error, setError] = createSignal<string | null>(null)
  const [images, setImages] = createSignal<{ url: string; filename: string }[]>([])
  const [copied, setCopied] = createSignal<string | null>(null)

  let fileInput: HTMLInputElement | undefined

  const handleUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files || files.length === 0) return

    setError(null)
    setUploading(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files.item(i)
        if (!file) continue
        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const result = await res.json()
          throw new Error(result.error || 'Upload failed')
        }

        const result = await res.json()
        setImages((prev) => [result, ...prev])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInput) fileInput.value = ''
    }
  }

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(url)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      setError('Failed to copy to clipboard')
    }
  }

  return (
    <div class="flex min-h-screen bg-[var(--color-surface)]">
      <AdminSidebar />

      <main class="flex-1 p-8">
        {/* Header */}
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="font-heading text-2xl font-semibold">Media</h1>
            <p class="text-[var(--color-text-muted)]">Upload and manage images</p>
          </div>
          <button
            onClick={() => fileInput?.click()}
            class="btn btn-primary"
            disabled={uploading()}
          >
            {uploading() ? 'Uploading...' : '+ Upload Image'}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            class="hidden"
          />
        </div>

        {error() && (
          <div class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
            {error()}
          </div>
        )}

        {/* Upload Zone */}
        <div
          class="card mb-8 border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
          onClick={() => fileInput?.click()}
        >
          <div class="text-center py-12">
            <span class="text-4xl mb-4 block">Upload</span>
            <p class="text-[var(--color-text-muted)] mb-2">
              Click to upload or drag and drop
            </p>
            <p class="text-sm text-[var(--color-text-muted)]">
              JPEG, PNG, GIF, WebP, SVG (max 5MB)
            </p>
          </div>
        </div>

        {/* Uploaded Images */}
        <Show when={images().length > 0}>
          <div class="card">
            <h2 class="font-heading font-semibold mb-4">Uploaded Images</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <For each={images()}>
                {(image) => (
                  <div class="group relative rounded-lg overflow-hidden bg-[var(--color-surface)]">
                    <img
                      src={image.url}
                      alt={image.filename}
                      class="w-full h-32 object-cover"
                    />
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => copyToClipboard(image.url)}
                        class="px-3 py-1.5 bg-white text-black rounded text-sm font-medium"
                      >
                        {copied() === image.url ? 'Copied!' : 'Copy URL'}
                      </button>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>

        <Show when={images().length === 0}>
          <div class="text-center py-12 text-[var(--color-text-muted)]">
            <p>No images uploaded yet</p>
            <p class="text-sm mt-2">Upload images to use in your posts</p>
          </div>
        </Show>
      </main>
    </div>
  )
}
