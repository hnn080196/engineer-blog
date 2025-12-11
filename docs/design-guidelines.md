# Design Guidelines - Engineer Blog

> Complete design system specification for a modern IT/developer personal blog.
> Status: Production-ready | Last Updated: December 2025

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Typography System](#typography-system)
3. [Color Tokens](#color-tokens)
4. [Spacing Scale](#spacing-scale)
5. [Border & Radius](#border--radius)
6. [Shadow System](#shadow-system)
7. [Components](#components)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Animation Guidelines](#animation-guidelines)
10. [Dark Mode Implementation](#dark-mode-implementation)
11. [Accessibility Standards](#accessibility-standards)

---

## Design Principles

### Core Philosophy
1. **Content-First** - Typography and readability above decoration
2. **Clean Minimalist** - Generous whitespace, single accent color
3. **Developer-Friendly** - Excellent code block styling, technical aesthetic
4. **Accessible** - WCAG AAA compliance, keyboard navigation
5. **Responsive** - Mobile-first approach, fluid scaling

### Visual Identity
- **Style**: Clean minimalist tech
- **Vibe**: Professional, modern, developer-friendly
- **Mood**: Calm, focused, intelligent

---

## Typography System

### Font Stack

```css
:root {
  /* Primary Fonts */
  --font-heading: 'Crimson Pro', Georgia, 'Times New Roman', serif;
  --font-body: 'Lora', Georgia, 'Times New Roman', serif;
  --font-code: 'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Consolas', monospace;

  /* Alternative Technical Stack */
  --font-heading-alt: 'JetBrains Mono', monospace;
  --font-body-alt: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* System Fallback */
  --font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}
```

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Fira+Code:wght@400;500&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

```css
:root {
  /* Base Size */
  --text-base: 16px;

  /* Headings */
  --text-h1: clamp(2.5rem, 5vw, 3.5rem);    /* 40-56px */
  --text-h2: clamp(2rem, 4vw, 2.625rem);     /* 32-42px */
  --text-h3: clamp(1.5rem, 3vw, 1.75rem);    /* 24-28px */
  --text-h4: clamp(1.25rem, 2.5vw, 1.375rem); /* 20-22px */
  --text-h5: 1.125rem;                        /* 18px */
  --text-h6: 1rem;                            /* 16px */

  /* Body Text */
  --text-lg: 1.125rem;   /* 18px - Lead paragraphs */
  --text-md: 1rem;       /* 16px - Body text */
  --text-sm: 0.875rem;   /* 14px - Captions, meta */
  --text-xs: 0.75rem;    /* 12px - Labels, badges */

  /* Code */
  --text-code: 0.875rem; /* 14px */
  --text-code-sm: 0.8125rem; /* 13px */

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.35;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;
  --leading-loose: 1.8;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;

  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
```

### Typography Classes

```css
/* Headings */
h1, .h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

h2, .h2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

h3, .h3 {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-snug);
}

h4, .h4 {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-normal);
}

h5, .h5 {
  font-family: var(--font-body);
  font-size: var(--text-h5);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-normal);
}

h6, .h6 {
  font-family: var(--font-body);
  font-size: var(--text-h6);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

/* Body */
body, .body {
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: var(--weight-regular);
  line-height: var(--leading-relaxed);
}

/* Lead Paragraph */
.lead {
  font-size: var(--text-lg);
  line-height: var(--leading-loose);
  color: var(--color-text-secondary);
}

/* Small/Meta */
.small, small {
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
}

.caption {
  font-size: var(--text-xs);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

/* Code */
code, .code {
  font-family: var(--font-code);
  font-size: var(--text-code);
  line-height: var(--leading-normal);
}
```

---

## Color Tokens

### CSS Custom Properties

```css
:root {
  /* ========================================
     LIGHT MODE (Default)
     ======================================== */

  /* Text Colors */
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-text-tertiary: #888888;
  --color-text-inverse: #ffffff;

  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-tertiary: #ebebeb;
  --color-bg-inverse: #1a1a1a;

  /* Surface Colors (Cards, Elevated) */
  --color-surface: #ffffff;
  --color-surface-elevated: #fafafa;
  --color-surface-hover: #f0f0f0;

  /* Border Colors */
  --color-border: #e0e0e0;
  --color-border-light: #eeeeee;
  --color-border-focus: #0066ff;

  /* Accent Colors */
  --color-accent: #0066ff;
  --color-accent-hover: #0052cc;
  --color-accent-light: #e6f0ff;
  --color-accent-dark: #004099;

  /* Code Block Colors */
  --color-code-bg: #f8f8f8;
  --color-code-text: #1a1a1a;
  --color-code-border: #e0e0e0;

  /* Semantic Colors */
  --color-success: #28a745;
  --color-success-light: #d4edda;
  --color-warning: #ffc107;
  --color-warning-light: #fff3cd;
  --color-error: #dc3545;
  --color-error-light: #f8d7da;
  --color-info: #17a2b8;
  --color-info-light: #d1ecf1;

  /* Status Colors (Admin) */
  --color-status-published: #10b981;
  --color-status-draft: #6b7280;
  --color-status-scheduled: #3b82f6;
  --color-status-archived: #9ca3af;

  /* Overlay */
  --color-overlay: rgba(0, 0, 0, 0.5);
  --color-overlay-light: rgba(0, 0, 0, 0.1);
}

/* ========================================
   DARK MODE
   ======================================== */

[data-theme="dark"],
.dark {
  /* Text Colors */
  --color-text-primary: #ffffff;
  --color-text-secondary: #b0b0b0;
  --color-text-tertiary: #888888;
  --color-text-inverse: #1a1a1a;

  /* Background Colors */
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-bg-tertiary: #21262d;
  --color-bg-inverse: #ffffff;

  /* Surface Colors */
  --color-surface: #161b22;
  --color-surface-elevated: #1c2128;
  --color-surface-hover: #21262d;

  /* Border Colors */
  --color-border: #30363d;
  --color-border-light: #21262d;
  --color-border-focus: #4da6ff;

  /* Accent Colors */
  --color-accent: #4da6ff;
  --color-accent-hover: #79c0ff;
  --color-accent-light: #1c3a5e;
  --color-accent-dark: #2d6cb5;

  /* Code Block Colors */
  --color-code-bg: #0d1117;
  --color-code-text: #e6edf3;
  --color-code-border: #30363d;

  /* Semantic Colors (adjusted for dark) */
  --color-success: #3fb950;
  --color-success-light: #1a3d24;
  --color-warning: #d29922;
  --color-warning-light: #3d3219;
  --color-error: #f85149;
  --color-error-light: #3d1a1a;
  --color-info: #58a6ff;
  --color-info-light: #1a2d3d;

  /* Overlay */
  --color-overlay: rgba(0, 0, 0, 0.7);
  --color-overlay-light: rgba(255, 255, 255, 0.1);
}

/* System preference support */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Apply dark mode variables */
    --color-text-primary: #ffffff;
    --color-text-secondary: #b0b0b0;
    --color-bg-primary: #0d1117;
    --color-bg-secondary: #161b22;
    --color-surface: #161b22;
    --color-border: #30363d;
    --color-accent: #4da6ff;
    --color-code-bg: #0d1117;
    --color-code-text: #e6edf3;
  }
}
```

### Syntax Highlighting (Code Blocks)

```css
/* Dracula Theme (Dark Mode) */
.dark .highlight,
[data-theme="dark"] .highlight {
  --syntax-bg: #282a36;
  --syntax-fg: #f8f8f2;
  --syntax-comment: #6272a4;
  --syntax-keyword: #ff79c6;
  --syntax-string: #f1fa8c;
  --syntax-number: #bd93f9;
  --syntax-function: #50fa7b;
  --syntax-operator: #ff79c6;
  --syntax-class: #8be9fd;
  --syntax-variable: #f8f8f2;
}

/* Atom One Light (Light Mode) */
.highlight,
[data-theme="light"] .highlight {
  --syntax-bg: #fafafa;
  --syntax-fg: #383a42;
  --syntax-comment: #a0a1a7;
  --syntax-keyword: #a626a4;
  --syntax-string: #50a14f;
  --syntax-number: #986801;
  --syntax-function: #4078f2;
  --syntax-operator: #0184bc;
  --syntax-class: #c18401;
  --syntax-variable: #e45649;
}
```

---

## Spacing Scale

### 8px Base Grid

```css
:root {
  /* Spacing Scale */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* Semantic Spacing */
  --space-xs: var(--space-1);   /* 4px */
  --space-sm: var(--space-2);   /* 8px */
  --space-md: var(--space-4);   /* 16px */
  --space-lg: var(--space-6);   /* 24px */
  --space-xl: var(--space-8);   /* 32px */
  --space-2xl: var(--space-12); /* 48px */
  --space-3xl: var(--space-16); /* 64px */

  /* Component-Specific */
  --space-input-x: var(--space-4);   /* 16px */
  --space-input-y: var(--space-3);   /* 12px */
  --space-button-x: var(--space-6);  /* 24px */
  --space-button-y: var(--space-3);  /* 12px */
  --space-card: var(--space-6);      /* 24px */
  --space-section: var(--space-16);  /* 64px */

  /* Layout */
  --gutter: var(--space-6);          /* 24px */
  --gutter-mobile: var(--space-4);   /* 16px */
  --container-padding: var(--space-4);

  /* Content Width */
  --content-width: 65ch;             /* ~900px */
  --content-width-wide: 80ch;        /* ~1100px */
  --container-max: 1200px;
  --container-narrow: 720px;
}
```

### Usage Examples

```css
/* Section Spacing */
.section {
  padding-top: var(--space-section);
  padding-bottom: var(--space-section);
}

/* Card Spacing */
.card {
  padding: var(--space-card);
  gap: var(--space-md);
}

/* List Gap */
.blog-grid {
  gap: var(--space-lg);
}
```

---

## Border & Radius

```css
:root {
  /* Border Widths */
  --border-width: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;

  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 4px;      /* Inputs, badges, tags */
  --radius-md: 8px;      /* Cards, buttons */
  --radius-lg: 12px;     /* Containers, modals */
  --radius-xl: 16px;     /* Large cards, hero sections */
  --radius-2xl: 24px;    /* Feature cards */
  --radius-full: 9999px; /* Pills, avatars */

  /* Semantic Radius */
  --radius-input: var(--radius-sm);
  --radius-button: var(--radius-md);
  --radius-card: var(--radius-md);
  --radius-modal: var(--radius-lg);
  --radius-code: var(--radius-md);
}
```

---

## Shadow System

```css
:root {
  /* ========================================
     LIGHT MODE SHADOWS
     ======================================== */

  /* Elevation Levels */
  --shadow-none: none;

  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08),
               0 1px 2px rgba(0, 0, 0, 0.04);

  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07),
               0 2px 4px rgba(0, 0, 0, 0.05);

  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.12),
               0 4px 10px rgba(0, 0, 0, 0.06);

  --shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.2),
               0 8px 20px rgba(0, 0, 0, 0.08);

  /* Inset Shadows */
  --shadow-inset: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-inset-sm: inset 0 1px 2px rgba(0, 0, 0, 0.06);

  /* Focus Ring */
  --shadow-focus: 0 0 0 3px rgba(0, 102, 255, 0.3);

  /* Semantic Shadows */
  --shadow-card: var(--shadow-sm);
  --shadow-card-hover: var(--shadow-lg);
  --shadow-dropdown: var(--shadow-lg);
  --shadow-modal: var(--shadow-xl);
  --shadow-button: var(--shadow-xs);
  --shadow-input: var(--shadow-inset-sm);
}

/* ========================================
   DARK MODE SHADOWS
   ======================================== */

[data-theme="dark"],
.dark {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);

  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3),
               0 1px 2px rgba(0, 0, 0, 0.2);

  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4),
               0 2px 4px rgba(0, 0, 0, 0.2);

  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.5),
               0 4px 10px rgba(0, 0, 0, 0.3);

  --shadow-xl: 0 20px 50px rgba(0, 0, 0, 0.6),
               0 8px 20px rgba(0, 0, 0, 0.4);

  --shadow-inset: inset 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-focus: 0 0 0 3px rgba(77, 166, 255, 0.3);
}
```

---

## Components

### Buttons

```css
/* Base Button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-button-y) var(--space-button-x);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: 1;
  text-decoration: none;
  border-radius: var(--radius-button);
  border: var(--border-width) solid transparent;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Primary Button */
.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-color: var(--color-accent);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* Secondary/Outline Button */
.btn-secondary {
  background-color: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn-secondary:hover {
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
}

/* Ghost Button */
.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);
  border-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--color-surface-hover);
}

/* Button Sizes */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-xs);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-md);
}
```

### Form Inputs

```css
/* Base Input */
.input {
  width: 100%;
  padding: var(--space-input-y) var(--space-input-x);
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--leading-normal);
  color: var(--color-text-primary);
  background-color: var(--color-bg-primary);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-input);
  box-shadow: var(--shadow-input);
  transition: border-color var(--transition-fast),
              box-shadow var(--transition-fast);
}

.input::placeholder {
  color: var(--color-text-tertiary);
}

.input:hover {
  border-color: var(--color-text-tertiary);
}

.input:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: var(--shadow-focus);
}

/* Textarea */
.textarea {
  min-height: 120px;
  resize: vertical;
}

/* Select */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--space-4) center;
  padding-right: var(--space-10);
}

/* Checkbox & Radio */
.checkbox,
.radio {
  width: 18px;
  height: 18px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

/* Label */
.label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-primary);
}

/* Form Group */
.form-group {
  margin-bottom: var(--space-lg);
}

/* Input Error State */
.input-error {
  border-color: var(--color-error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.3);
}

.error-message {
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-error);
}
```

### Cards

```css
/* Base Card */
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-card);
  border: var(--border-width) solid var(--color-border-light);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

.card-body {
  padding: var(--space-card);
}

.card-header {
  padding: var(--space-4) var(--space-card);
  border-bottom: var(--border-width) solid var(--color-border-light);
}

.card-footer {
  padding: var(--space-4) var(--space-card);
  border-top: var(--border-width) solid var(--color-border-light);
  background-color: var(--color-bg-secondary);
}

/* Blog Post Card */
.post-card {
  display: flex;
  flex-direction: column;
}

.post-card-image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.post-card-category {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  color: var(--color-accent);
  background-color: var(--color-accent-light);
  border-radius: var(--radius-sm);
}

.post-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  margin: var(--space-3) 0;
  line-height: var(--leading-snug);
}

.post-card-excerpt {
  font-size: var(--text-md);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
}

.post-card-meta-divider::before {
  content: "·";
  margin: 0 var(--space-1);
}
```

### Navigation

```css
/* Header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  background-color: var(--color-bg-primary);
  border-bottom: var(--border-width) solid var(--color-border-light);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.logo {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

/* Nav Links */
.nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-2) 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast),
              border-color var(--transition-fast);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-accent);
}

/* Mobile Menu Button */
.menu-toggle {
  display: none;
  padding: var(--space-2);
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background-color: var(--color-bg-primary);
    border-bottom: var(--border-width) solid var(--color-border);
    padding: var(--space-lg);
    gap: var(--space-md);
  }
}
```

### Code Blocks

```css
/* Inline Code */
code:not(pre code) {
  font-family: var(--font-code);
  font-size: 0.9em;
  padding: 0.15em 0.4em;
  background-color: var(--color-code-bg);
  border-radius: var(--radius-sm);
  color: var(--color-accent);
}

/* Code Block Container */
.code-block {
  position: relative;
  margin: var(--space-lg) 0;
}

/* Pre Element */
pre {
  font-family: var(--font-code);
  font-size: var(--text-code);
  line-height: var(--leading-normal);
  padding: var(--space-6);
  background-color: var(--color-code-bg);
  border: var(--border-width) solid var(--color-code-border);
  border-radius: var(--radius-code);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

pre code {
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  background: none;
  border-radius: 0;
  color: var(--color-code-text);
}

/* Language Badge */
.code-lang {
  position: absolute;
  top: 0;
  right: 0;
  padding: var(--space-1) var(--space-3);
  font-family: var(--font-code);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  background-color: var(--color-bg-tertiary);
  border-bottom-left-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Copy Button */
.code-copy {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  padding: var(--space-2);
  background-color: var(--color-surface);
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.code-block:hover .code-copy {
  opacity: 1;
}

/* Line Numbers */
.line-numbers {
  counter-reset: line;
}

.line-numbers .line::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 2em;
  margin-right: var(--space-4);
  text-align: right;
  color: var(--color-text-tertiary);
  user-select: none;
}
```

### Tags & Badges

```css
/* Tag */
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: background-color var(--transition-fast),
              color var(--transition-fast);
}

.tag:hover {
  background-color: var(--color-accent-light);
  color: var(--color-accent);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-text-inverse);
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
}

/* Status Badge */
.status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-full);
}

.status::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-published {
  color: var(--color-status-published);
  background-color: rgba(16, 185, 129, 0.1);
}

.status-published::before {
  background-color: var(--color-status-published);
}

.status-draft {
  color: var(--color-status-draft);
  background-color: rgba(107, 114, 128, 0.1);
}

.status-draft::before {
  background-color: var(--color-status-draft);
}

.status-scheduled {
  color: var(--color-status-scheduled);
  background-color: rgba(59, 130, 246, 0.1);
}

.status-scheduled::before {
  background-color: var(--color-status-scheduled);
}
```

---

## Responsive Breakpoints

```css
:root {
  /* Breakpoint Values */
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}

/* Mobile-First Breakpoints */

/* Small devices (landscape phones, 640px+) */
@media (min-width: 640px) {
  /* sm: styles */
}

/* Medium devices (tablets, 768px+) */
@media (min-width: 768px) {
  /* md: styles */
}

/* Large devices (desktops, 1024px+) */
@media (min-width: 1024px) {
  /* lg: styles */
}

/* Extra large devices (large desktops, 1280px+) */
@media (min-width: 1280px) {
  /* xl: styles */
}

/* 2XL screens (1536px+) */
@media (min-width: 1536px) {
  /* 2xl: styles */
}
```

### Grid System

```css
/* Container */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: var(--gutter-mobile);
  padding-right: var(--gutter-mobile);
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--gutter);
    padding-right: var(--gutter);
  }
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Content Layout */
.content-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);
}

@media (min-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr 300px;
  }
}
```

---

## Animation Guidelines

```css
:root {
  /* Duration */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;

  /* Easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Shorthand Transitions */
  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-normal: var(--duration-normal) var(--ease-out);
  --transition-slow: var(--duration-slow) var(--ease-out);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Classes

```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn var(--duration-normal) var(--ease-out);
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp var(--duration-normal) var(--ease-out);
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn var(--duration-fast) var(--ease-out);
}

/* Hover Effects */
.hover-lift {
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.hover-scale {
  transition: transform var(--transition-fast);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

---

## Dark Mode Implementation

### Toggle Implementation

```javascript
// Theme Toggle
const themeToggle = document.querySelector('[data-theme-toggle]');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return prefersDark.matches ? 'dark' : 'light';
}

// Initialize
setTheme(getPreferredTheme());

// Toggle handler
themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system changes
prefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
```

### Theme Toggle Button

```html
<button
  data-theme-toggle
  aria-label="Toggle theme"
  class="btn btn-ghost"
>
  <svg class="icon-sun" viewBox="0 0 24 24"><!-- Sun icon --></svg>
  <svg class="icon-moon" viewBox="0 0 24 24"><!-- Moon icon --></svg>
</button>

<style>
[data-theme="light"] .icon-moon { display: none; }
[data-theme="dark"] .icon-sun { display: none; }
</style>
```

---

## Accessibility Standards

### WCAG AAA Requirements

```css
/* Focus Indicators - Always visible */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-accent);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  z-index: 1000;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: var(--space-4);
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Touch Targets */
.touch-target {
  min-width: 44px;
  min-height: 44px;
}
```

### Color Contrast Verification

| Combination | Ratio | WCAG Level |
|-------------|-------|------------|
| Light: #1a1a1a on #ffffff | 16.1:1 | AAA |
| Light: #666666 on #ffffff | 5.7:1 | AA |
| Light: #0066ff on #ffffff | 4.5:1 | AA |
| Dark: #ffffff on #0d1117 | 15.1:1 | AAA |
| Dark: #b0b0b0 on #0d1117 | 8.5:1 | AAA |
| Dark: #4da6ff on #0d1117 | 7.2:1 | AAA |

### Semantic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title | Site Name</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Navigation links -->
    </nav>
  </header>

  <main id="main-content" role="main">
    <article>
      <header>
        <h1>Article Title</h1>
        <p>Meta information</p>
      </header>

      <section aria-labelledby="section-heading">
        <h2 id="section-heading">Section Title</h2>
        <!-- Content -->
      </section>
    </article>

    <aside role="complementary" aria-label="Related content">
      <!-- Sidebar content -->
    </aside>
  </main>

  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</body>
</html>
```

---

## Quick Reference

### Essential Values

| Property | Value |
|----------|-------|
| Base font size | 16px |
| Content max-width | 65ch (~900px) |
| Container max | 1200px |
| Header height | 64px |
| Card padding | 24px |
| Border radius (card) | 8px |
| Transition | 250ms ease-out |

### Color Quick Look

| Use | Light | Dark |
|-----|-------|------|
| Text | #1a1a1a | #ffffff |
| Muted | #666666 | #b0b0b0 |
| Background | #ffffff | #0d1117 |
| Surface | #f5f5f5 | #161b22 |
| Accent | #0066ff | #4da6ff |
| Border | #e0e0e0 | #30363d |

### Spacing Scale

```
4px · 8px · 16px · 24px · 32px · 48px · 64px
```

---

## File References

- Typography details: `design-typography-guide.md`
- Color specifications: `design-color-palettes.md`
- Spacing & shadows: `design-spacing-shadows.md`
- Code block styling: `design-code-blocks.md`
- Card components: `design-card-layouts.md`
- Navigation patterns: `design-header-footer.md`
- Site structure: `design-information-architecture.md`

---

*Last Updated: December 2025*
*Version: 1.0.0*
