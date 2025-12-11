# Markdown Editor UI/UX Patterns

## Editor Layout

### Split-Pane Configuration
**Primary Pattern:** 50/50 or 60/40 split
- **Left Pane:** Raw markdown input with line numbers
- **Right Pane:** Live HTML preview with syntax highlighting
- **Resizable divider:** Allow user to adjust pane widths

**Alternative:** Full-screen editor with preview toggle button

## Toolbar Design

### Top Toolbar (Horizontal)
**Text Formatting:**
- Bold (**text**) - icon: B
- Italic (*text*) - icon: I
- Code (`code`) - icon: < >
- Strikethrough (~~text~~) - icon: S with line

**Structure:**
- Headers (H1-H6 dropdown)
- Lists (unordered, ordered, checkbox)
- Blockquote
- Horizontal rule

**Insert:**
- Link (Ctrl+K) - modal for URL + title
- Image (Ctrl+Shift+I) - file upload or URL
- Code block (Ctrl+Alt+C) - language selector
- Table - visual UI to define rows/columns

**Utilities:**
- Undo/Redo
- Full-screen toggle
- Settings (theme, font size, tab width)
- Help/keyboard shortcuts panel

### Keyboard Shortcuts
```
⌘B / Ctrl+B     → Bold
⌘I / Ctrl+I     → Italic
⌘K / Ctrl+K     → Insert link
⌘Alt+C          → Code block
Tab              → Indent
Shift+Tab        → Outdent
⌘Z / Ctrl+Z     → Undo
⌘Shift+Z        → Redo
```

## UX Features

### Editor Capabilities
- **Line numbers** with optional folding/collapsing
- **Syntax highlighting** for code blocks
- **Auto-closing brackets/quotes** (optional toggle)
- **Tab for indentation** (2, 4 spaces, or tab configurable)
- **Word count** and **reading time** display

### Content Insertion
- **Paste image → auto-upload + markdown insertion**
- **Drag-drop files** for upload
- **Table generator** with visual grid UI
- **Link preview** on hover (shows URL or title)
- **Search & replace** functionality (Ctrl+H)

### Live Preview
- **Real-time rendering** as user types
- **Syntax highlighting** for code blocks (Prism.js, highlight.js)
- **Heading anchors** auto-generated for TOC
- **Responsive preview** (toggle mobile view)
- **Scroll sync** - preview scrolls with editor

## Visual Design

### Color Scheme
**Editor:**
- Background: #1e1e1e (dark)
- Text: #e0e0e0 (light gray)
- Line numbers: #6b7280 (muted)
- Cursor: #61afef (blue)

**Syntax Highlighting (Code Blocks):**
- Keywords: #c586c0 (purple)
- Strings: #ce9178 (orange)
- Numbers: #b5cea8 (green)
- Comments: #6a9955 (muted green)
- Operators: #d4d4d4 (light gray)

**Preview Pane:**
- Background: White or light gray
- Rendered markdown follows blog's design system
- Clear visual contrast from editor

### Typography
- **Monospace font:** Fira Code, Monaco, Menlo, or system monospace
- **Editor font size:** 14-16px (user-adjustable)
- **Line height:** 1.6 (comfortable reading)
- **Word wrap:** Toggle between on/off

## Implementation Examples
- **CodeMirror** - Extensive customization, plugin ecosystem
- **Monaco Editor** - VS Code experience, powerful features
- **Ace Editor** - Lightweight, good performance
- **Codemirror 6** - Modern rewrite, extensible architecture

## Accessibility
- Full keyboard navigation
- Proper ARIA labels on toolbar buttons
- Focus indicators on all interactive elements
- Screen reader support for preview pane
