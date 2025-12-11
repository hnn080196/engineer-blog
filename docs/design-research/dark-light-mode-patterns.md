# Dark/Light Mode Toggle Implementations

## Toggle Placement

### Recommended Locations
1. **Header/Navigation (Top-right)** - Most discoverable
2. **Settings Menu** - Secondary option
3. **Sticky sidebar** - Always accessible on scroll
4. **Footer** - Least intrusive, grouped with other utilities

### Best Practice
- **Primary location:** Top-right header corner
- **Sticky:** Remains visible while scrolling
- **Responsive:** Moves to menu on mobile devices

## Visual Design

### Toggle Button Style

**Icon-Only (Recommended):**
- 20-24px icons
- Clear visual state (filled vs outlined)
- Current mode icon shows what user can switch TO
  - Showing sun icon = currently dark, can switch to light
  - Showing moon icon = currently light, can switch to dark

**Icon + Label:**
- Icon on left, text on right
- Slightly larger clickable area
- Labels: "Dark mode" or "Light mode"

### Interactions
- **Hover state:** Subtle background change (opacity increase)
- **Active state:** Icon changes to indicate new mode
- **Transition:** 200-300ms smooth color transition across site
- **Tooltip:** On hover, show "Switch to Dark Mode" / "Switch to Light Mode"

## Technical Implementation

### CSS Variables Approach
```css
/* Light mode (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --border: #e5e7eb;
  --accent: #3b82f6;
}

/* Dark mode */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --border: #334155;
  --accent: #60a5fa;
}
```

### Detection & Storage
1. **System preference detection:** `prefers-color-scheme` media query
2. **User preference detection:** Check localStorage for saved preference
3. **Fallback:** Default to light mode if no preference found
4. **Sync:** Set `data-theme` attribute on `<html>` element

### JavaScript Logic
```javascript
// 1. Check localStorage for saved preference
const savedTheme = localStorage.getItem('theme');

// 2. Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 3. Determine theme
const theme = savedTheme || (prefersDark ? 'dark' : 'light');

// 4. Apply theme
document.documentElement.setAttribute('data-theme', theme);

// 5. Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});

// 6. Toggle function
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}
```

## Color Scheme Guidelines

### Light Mode
- Background: #ffffff or #f8f9fa
- Text: #1a1a1a or #2d3748
- Contrast ratio: 4.5:1 (WCAG AA)
- Borders: #e5e7eb or #cbd5e1

### Dark Mode
- Background: #0f172a or #1a202c
- Text: #f1f5f9 or #e2e8f0
- Contrast ratio: 4.5:1 (WCAG AA)
- Borders: #334155 or #475569

### Accent Colors
- Maintain brightness across both modes
- Light mode: Saturated, medium-bright colors
- Dark mode: Slightly lighter/more vibrant for contrast
- Example: Blue #3b82f6 (light) → #60a5fa (dark)

## Implementation Examples

**GitHub:**
- Moon icon in top-right
- Smooth 300ms transition
- Syncs with system preference by default
- Manual override stored in settings

**Tailwind Docs:**
- Three-way toggle: Light | Dark | System
- Shows current selection
- Respects user's system preference initially
- Toggle persists across sessions

**Deno.com:**
- Quick icon toggle in header
- Instant visual feedback
- All components update simultaneously
- No layout shift during transition

## Best Practices
1. **Default to system preference** - Respects user's OS settings
2. **Allow manual override** - User preference takes precedence
3. **Persist choice** - Save to localStorage
4. **Smooth transition** - 200-300ms prevents jarring changes
5. **Complete coverage** - All components must support both modes
6. **Test contrast** - Ensure WCAG AA compliance
7. **Avoid pure black/white** - Use softer colors (#0f172a instead of #000000)
8. **Consistent throughout** - Same theme across all pages
