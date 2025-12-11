# Admin Dashboard UI Patterns for Content Management

## Essential Sections
**Left Sidebar Navigation:**
- Dashboard (stats/overview)
- Posts (list, draft, published, scheduled)
- Media/Assets library
- Comments/Discussions
- Settings (site config, themes, SEO)
- Analytics

## Content Editor Layout

### Three-column or Two-column Setup
1. **Left Panel:** Editor
   - Title input + slug auto-generation
   - Content area with markdown toolbar
   - Save/publish buttons

2. **Middle/Main:** Full preview
   - Live markdown rendering
   - Responsive preview toggle

3. **Right Panel:** Metadata sidebar
   - Publish date + time picker
   - Category + Tags (multi-select)
   - Featured image upload
   - SEO meta (title, description, keywords)
   - Visibility/status (draft, published, scheduled)

## CRUD Table Patterns

### Blog Posts List
```
Columns: Title | Author | Date | Status | Actions
- Checkbox column for bulk operations
- Status indicator: Green (published), Yellow (draft), Red (error)
- Actions menu: Edit, View, Duplicate, Delete
- Row hover reveals quick actions
```

### Bulk Operations
- Checkboxes on each row
- Actions bar above/below table: Delete selected, bulk publish/unpublish
- Confirmation dialog for destructive actions
- Success notification after bulk action

### Filtering & Search
- Search input (searches title, excerpt, tags)
- Filter by status dropdown (All | Draft | Published | Scheduled)
- Filter by category/author
- Sort by date (newest/oldest), views, comments
- Save filter presets

## Visual Design

**Color Scheme:**
- Neutral background: #f8f9fa (light) or #1a1a1a (dark)
- Card sections: White (#fff) with subtle shadow
- Status indicators:
  - Published: Green (#10b981)
  - Draft: Gray (#6b7280)
  - Scheduled: Blue (#3b82f6)
  - Error: Red (#ef4444)
- Primary actions: Blue (#3b82f6)
- Danger actions: Red (#ef4444)

**Interaction States:**
- Hover: Subtle background color shift, shadow increase
- Active/Selected: Border highlight or background color change
- Disabled: Reduced opacity (50%)
- Loading: Spinner or skeleton loader

## Navigation Breadcrumbs
```
Dashboard > Posts > Edit > [Post Title]
```
Clear context for user location in hierarchy

## Key Features
- Autosave drafts every 30 seconds
- Keyboard shortcuts (⌘S to save, ⌘Enter to publish)
- Undo/redo stack for edits
- Version history with preview + rollback
- Inline editing option for quick updates
- Keyboard navigation throughout (Tab focus indicators)
