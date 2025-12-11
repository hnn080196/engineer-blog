# Tech Blog Design Research Report 2024-2025

## 1. TYPOGRAPHY (Google Fonts Recommendations)

**Headings (H1-H3):** Crimson Pro or Playfair Display
- H1: 48-56px, weight 700, line-height 1.2
- H2: 36-42px, weight 600, line-height 1.3
- H3: 24-28px, weight 600, line-height 1.4

**Body Text:** JetBrains Mono (technical), or Lora (elegant serif)
- Primary: 16-18px, weight 400, line-height 1.6
- Secondary: 14px, weight 400, line-height 1.5

**Code/Monospace:** Fira Code or Source Code Pro
- Size: 13-14px, weight 400, line-height 1.5

**Alternative pairing:** Merriweather (body) + JetBrains Mono (code)

---

## 2. COLOR PALETTES

### Light Mode
```
Primary:      #1a1a1a (near-black text)
Secondary:    #666666 (muted text)
Accent:       #0066ff (electric blue)
Background:   #ffffff (white)
Surface:      #f5f5f5 (light gray)
Border:       #e0e0e0 (subtle gray)
Code BG:      #f8f8f8 (near-white with slight tint)
```

### Dark Mode
```
Primary:      #ffffff (white text)
Secondary:    #b0b0b0 (light gray text)
Accent:       #4da6ff (softer blue)
Background:   #0d1117 (GitHub-dark inspired)
Surface:      #161b22 (elevated surface)
Border:       #30363d (subtle dark border)
Code BG:      #0d1117 (matches background)
```

---

## 3. SPACING & TYPOGRAPHY SCALE

**Spacing Scale (rem):**
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

**Section Padding:** 3rem top/bottom (desktop), 2rem (mobile)
**Content Max-width:** 65ch (character width, ~900px)

---

## 4. SHADOWS & BORDERS

**Border Radius:**
- Micro elements (inputs, tags): 4px
- Cards/blocks: 8px
- Large containers: 12px
- Circles: 50%

**Shadows:**
- Subtle (cards): `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)`
- Medium (hover): `0 10px 25px rgba(0,0,0,0.12)`
- Strong (modals): `0 20px 50px rgba(0,0,0,0.2)`
- Inset (code blocks): `inset 0 1px 3px rgba(0,0,0,0.1)`

**Border:** 1px solid [border-color], except code blocks use no border

---

## 5. CODE BLOCK STYLING

**Syntax Highlighting Themes:**
- **Light:** Atom One Light or GitHub Light (clean, readable)
- **Dark:** Dracula or One Dark Pro (popular, accessible)

**Code Block Design:**
- Rounded corners: 8px
- Padding: 1.5rem (24px)
- Line-height: 1.5
- Font-size: 13-14px
- Copy button: top-right corner, appears on hover
- Line numbers: optional, #999 color, right-aligned
- Language tag: top-left, 12px, caps, #666 (light) / #999 (dark)

---

## 6. CARD DESIGNS FOR BLOG POSTS

```
Grid: 2-3 columns (desktop), 1 column (mobile)
Spacing: 2rem gap

Card Structure:
├─ Featured Image (16:9 ratio, 8px radius)
├─ Category Tag (xs font, accent color background)
├─ Title (24px, bold, line-height 1.3)
├─ Excerpt (16px, secondary color, 2 lines max)
├─ Meta (14px, gray)
│  └─ Date • Read time • Author
└─ Hover Effect: +8px shadow, slight scale (1.02)
```

**Featured Image:** Slightly desaturated or custom illustrations over photos

---

## 7. NAVIGATION PATTERNS

**Top Navigation Bar:**
- Fixed or sticky header
- Logo (left), nav links (center), mode toggle + socials (right)
- Height: 64px, blend seamlessly with background
- Active state: underline (2px) vs. background pill (8px radius)

**Breadcrumb Navigation:**
- Used on article pages: Home > Blog > [Category] > [Post Title]
- Font: 14px, gray, separated by "/"

**Mobile Navigation:**
- Hamburger menu (3-line icon)
- Full-screen overlay with smooth slide animation
- Link padding: 1rem vertical

**Footer:**
- Multi-column layout: About | Articles | Resources | Socials
- Links: 14px
- Background: slight contrast change (surface color)
- Copyright: 12px, muted color

---

## 8. MINIMALIST DESIGN PATTERNS

**Key Principles:**
1. **Whitespace-driven:** Generous padding/margins, breathing room
2. **Content-first:** Minimal decorative elements, let content shine
3. **Monochromatic accents:** Single accent color for CTAs/highlights
4. **Grid-based:** 12-column layout for consistency
5. **Micro-interactions:** Subtle hover states, smooth transitions (200-300ms)
6. **Consistent hierarchy:** Clear visual distinction via size/weight, not color

**Recommended Layouts:**
- Hero section: minimal text + centered CTA
- Blog grid: asymmetric (featured post large, others regular)
- About section: bio text + professional photo, side-by-side
- Case studies: image + text alternating layout

---

## 9. PORTFOLIO + BLOG COMBO SITES

**Information Architecture:**
```
Home
├─ Hero + CTA
├─ Featured Projects (3-4 max)
├─ Latest Articles (3 posts)
└─ Newsletter signup

Portfolio
└─ Project grid with filters

Blog
├─ All posts grid
└─ Post detail + comments

About
└─ Bio + social links
```

**Visual Continuity:**
- Same typography/color palette across sections
- Consistent spacing scale
- Unified component library
- Shared navigation pattern

---

## 10. TRENDING ELEMENTS (2024-2025)

- **Glassmorphism borders:** Subtle backdrop blur on nav/cards
- **Gradient accents:** Minimal use (1-2 places max)
- **Neumorphism shadows:** Soft, 3D-lite appearance
- **Animation on scroll:** Fade-in, slide-in effects (250-400ms)
- **Custom illustrations:** Hero icons, category badges
- **Serif + Mono combo:** Professional aesthetic (Crimson Pro + JetBrains Mono)
- **Dark mode as parity:** Not afterthought, full design consideration

---

## Quick Reference Checklist

- [ ] Typography: Crimson Pro (headers) + Lora/JetBrains Mono (body)
- [ ] Light: #1a1a1a text on #ffffff background
- [ ] Dark: #ffffff text on #0d1117 background
- [ ] Accent: #0066ff (light) / #4da6ff (dark)
- [ ] Spacing scale: 4px, 8px, 16px, 24px, 32px, 48px, 64px
- [ ] Shadows: Subtle, Medium, Strong (3 levels)
- [ ] Border radius: 4px, 8px, 12px for hierarchy
- [ ] Code blocks: 13-14px, Dracula theme, copy button
- [ ] Cards: 8px radius, hover shadow, 2-3 columns desktop
- [ ] Navigation: Fixed/sticky, 64px height, underline active state
- [ ] Max-width content: 65ch (~900px)
- [ ] Transitions: 200-300ms ease

---

## Resources & Inspiration

**Design References:**
- Vercel blog (minimalist tech aesthetic)
- CSS-Tricks (web dev blog gold standard)
- Stripe blog (sophisticated color/type usage)
- Tailwind blog (component showcase)

**Tools:**
- Google Fonts: fonts.google.com
- Coolors.co: color palette generation
- Typescale.com: font size calculator
- Smolui.com: minimal component library
