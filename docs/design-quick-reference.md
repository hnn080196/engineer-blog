# Design Quick Reference Card

Fast lookup for common design values.

---

## Typography at a Glance

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 | Crimson Pro | 48-56px | 700 |
| H2 | Crimson Pro | 36-42px | 600 |
| H3 | Crimson Pro | 24-28px | 600 |
| Body | Lora | 16-18px | 400 |
| Meta | Lora | 14px | 400 |
| Code | Fira Code | 13-14px | 400 |

---

## Color Palette (Hex)

### Light
```
Text:       #1a1a1a
Muted:      #666666
Accent:     #0066ff
Background: #ffffff
Surface:    #f5f5f5
Border:     #e0e0e0
Code BG:    #f8f8f8
```

### Dark
```
Text:       #ffffff
Muted:      #b0b0b0
Accent:     #4da6ff
Background: #0d1117
Surface:    #161b22
Border:     #30363d
Code BG:    #0d1117
```

---

## Spacing Values (px)

4 • 8 • 16 • 24 • 32 • 48 • 64

---

## Shadow Levels

**Subtle:** `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`
**Medium:** `0 10px 25px rgba(0,0,0,0.12)`
**Strong:** `0 20px 50px rgba(0,0,0,0.2)`

---

## Border Radius

4px (inputs) • 8px (cards) • 12px (containers) • 50% (circles)

---

## Layout

- **Max-width:** 65ch (~900px)
- **Gutter:** 24px (desktop), 16px (mobile)
- **Header:** 64px height
- **Cards:** 3 cols (desktop), 2 (tablet), 1 (mobile)

---

## Transitions

Duration: 200-300ms
Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

---

## Code Blocks

- Radius: 8px
- Padding: 24px
- Theme: Dracula (dark) / Atom One Light (light)
- Font size: 13-14px
- Line height: 1.5

---

## Navigation Links Order

Home → Blog → Projects → About → Contact

---

## Hover Effects

Cards: +shadow + translateY(-4px) at 250ms ease
Links: accent color + underline at 200ms ease
Buttons: brightness increase at 200ms ease

---

## Mobile-First Breakpoints

Mobile: 0-640px
Tablet: 641-1024px
Desktop: 1025px+

---

## Accessibility Minimums

- Text contrast: 7:1 (WCAG AAA)
- Focus ring: 2px solid accent
- Touch target: 44x44px
- Font size: 16px minimum (inputs)

---

## Key Design Files

- `design-typography-guide.md` - Fonts
- `design-color-palettes.md` - Colors
- `design-spacing-shadows.md` - Layout
- `design-code-blocks.md` - Code styling
- `design-card-layouts.md` - Cards
- `design-header-footer.md` - Header/Footer
- `design-information-architecture.md` - Site structure
