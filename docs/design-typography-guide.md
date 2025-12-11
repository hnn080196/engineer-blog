# Typography Guide for Tech Blogs

## Google Fonts Recommendations

### Headings (H1-H3)
**Primary Option:** Crimson Pro or Playfair Display
- H1: 48-56px, weight 700, line-height 1.2
- H2: 36-42px, weight 600, line-height 1.3
- H3: 24-28px, weight 600, line-height 1.4

### Body Text
**Technical Content:** JetBrains Mono
**Elegant Alternative:** Lora

Specifications:
- Primary: 16-18px, weight 400, line-height 1.6
- Secondary: 14px, weight 400, line-height 1.5

### Code/Monospace
**Recommended:** Fira Code or Source Code Pro
- Size: 13-14px, weight 400, line-height 1.5

### Alternative Pairing
Merriweather (body) + JetBrains Mono (code) for sophisticated aesthetic

---

## Font Loading Performance Tips

1. Use `font-display: swap` for better CLS (Cumulative Layout Shift)
2. Load max 2-3 font families (regular + bold weights only)
3. Implement `@font-face` with variable fonts where available
4. Use system fonts as fallback stack
