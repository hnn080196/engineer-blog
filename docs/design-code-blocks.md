# Code Block & Syntax Highlighting Guide

## Syntax Highlighting Themes

### Light Mode
**Recommended:** Atom One Light or GitHub Light
- Clean, readable for technical content
- High contrast for accessibility
- Suitable for printed documentation

### Dark Mode
**Recommended:** Dracula or One Dark Pro
- Popular in developer community
- WCAG AAA accessible
- Reduces eye strain in dark environments

**Alternative:** Nord or Solarized Dark (more muted)

---

## Code Block Styling

### Container Design
```css
border-radius: 8px;
padding: 24px; /* 1.5rem */
line-height: 1.5;
font-size: 13-14px;
font-family: 'Fira Code' or 'Source Code Pro';
background-color: [code-bg-color];
overflow-x: auto; /* horizontal scroll for long lines */
```

### Typography
- **Font size:** 13-14px (slightly smaller than body)
- **Line height:** 1.5 (tight but readable)
- **Letter spacing:** normal (no modification)
- **Tab width:** 2 spaces (configurable per language)

### Elements

#### Copy Button
- Position: top-right corner
- Appears on hover
- Icon: Copy icon (or "Copy" text)
- Background: transparent until hover
- Color: accent color on hover
- Animation: 200ms fade-in

#### Line Numbers (optional)
- Alignment: right-aligned
- Color: #999 (light mode) / #666 (dark mode)
- Font size: 13px
- Padding: 0 1rem right
- Not selectable (user-select: none)

#### Language Tag
- Position: top-left corner
- Font size: 12px
- Text transform: uppercase
- Color: #666 (light) / #999 (dark)
- Example: "typescript", "javascript", "python"
- Font weight: 600 (semi-bold)

### Inline Code
- Background: [surface-color]
- Padding: 2px 6px
- Border radius: 4px
- Font size: 14px
- No copy button

### Scrollbar Styling (Optional)
```css
scrollbar-width: thin;
scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
```

## Accessibility Features

1. **Color contrast:** Syntax colors must meet WCAG AA
2. **Focus indicator:** Visible focus ring (2px)
3. **Keyboard navigation:** Tab through copy button
4. **Screen reader:** Add aria-label to code blocks
5. **Zoom support:** Code must remain readable at 200% zoom

## Example Implementation Checklist

- [ ] Syntax theme installed (Dracula/Atom One Light)
- [ ] Copy button functional with visual feedback
- [ ] Line numbers optional but styled correctly
- [ ] Language tag displayed (if supported)
- [ ] Horizontal scroll for long lines
- [ ] Focus states visible
- [ ] Mobile: Full-width or limited scroll area
