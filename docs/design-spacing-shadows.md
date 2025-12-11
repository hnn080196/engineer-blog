# Spacing, Shadows & Border Radius Guide

## Spacing Scale (Rem-based)

Consistent spacing prevents visual chaos and aids responsive design.

```
xs:   0.25rem  (4px)
sm:   0.5rem   (8px)
md:   1rem     (16px)
lg:   1.5rem   (24px)
xl:   2rem     (32px)
2xl:  3rem     (48px)
3xl:  4rem     (64px)
```

### Content Layout
- **Section Padding:** 3rem top/bottom (desktop), 2rem (tablet), 1.5rem (mobile)
- **Content Max-width:** 65ch character width (~900px at 16px font)
- **Gutter (grid gap):** 1.5rem (24px) desktop, 1rem (16px) mobile
- **Margin between sections:** 4rem-6rem

## Border Radius Hierarchy

Rounded corners indicate importance and visual hierarchy.

```
Micro (inputs, badges):    4px
Small (cards, blocks):     8px
Medium (containers):       12px
Large (hero sections):     16px
Circles (avatars):         50%
```

## Shadow System (3-Level)

### Subtle Shadow (cards at rest)
```css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
```
Use for: Blog cards, subtle elevation, borders

### Medium Shadow (cards on hover/focus)
```css
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
```
Use for: Hover states, card elevation, interactive elements

### Strong Shadow (modals, dropdowns)
```css
box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
```
Use for: Modals, dropdowns, important overlays

### Inset Shadow (code blocks)
```css
box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
```
Use for: Code blocks, sunken appearance, input fields

## Border Styling

**Standard border:** 1px solid [border-color]
**Code blocks:** No border (rely on background + inset shadow)
**Inputs/forms:** 1px solid [border-color], 4px radius
**Dividers:** 1px solid [border-color] at full width or constrained

### Dark Mode Shadow Adjustments
Increase opacity slightly for visibility:
- Subtle: `rgba(0, 0, 0, 0.2)`
- Medium: `rgba(0, 0, 0, 0.3)`
- Strong: `rgba(0, 0, 0, 0.4)`

## Transition/Animation Timing

- **Micro interactions:** 150-200ms
- **Standard transitions:** 200-300ms
- **Large animations:** 300-400ms
- **Easing function:** `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard)
