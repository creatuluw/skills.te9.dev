# LVS Design System v1.0

## Fonts

- **Heading:** `'Space Grotesk', system-ui, sans-serif` — weights 400–700
- **Body:** `'Manrope', system-ui, sans-serif` — weights 300–700
- **Load:** `<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">`

## Icons

- **Library:** Solar via Iconify (`<iconify-icon icon="solar:name-bold-duotone">`)
- **Script:** `<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>`
- Use `bold-duotone` for filled emphasis, `linear` for subtle contexts

## Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-brand-bg` | `#F5F5F5` | Page background |
| `--color-brand-dark` | `#181617` | Primary text, buttons |
| `--color-accent` | `#ED722E` | CTAs, highlights |
| `--color-accent-light` | `#FCEEE5` | Accent tint |
| `--color-accent-dark` | `#C45A1A` | Accent hover |
| `--color-brand-muted` | `#71717A` | Secondary text, labels |
| `--color-brand-light` | `#A1A1AA` | Decorative only (fails AA) |
| `--color-success-500` | `#22C55E` | Success / bg `#F0FDF4` / text `#15803D` |
| `--color-warning-500` | `#F59E0B` | Warning / bg `#FFFBEB` / text `#B45309` |
| `--color-error-500` | `#EF4444` | Error / bg `#FEF2F2` / text `#B91C1C` |
| `--color-info-500` | `#3B82F6` | Info / bg `#EFF6FF` / text `#1D4ED8` |
| `--color-neutral-500` | `#6B7280` | Neutral / bg `#F9FAFB` / text `#374151` |

**60-30-10 Rule:** 60% `#F5F5F5` (bg) · 30% `#181617` (structure) · 10% accent/muted

## Typography Scale

| Name | Size | Wt | LH | LS | Use |
|---|---|---|---|---|---|
| hero-xl | 56px | 700 | 1.1 | −0.02em | Hero lg |
| hero-md | 44px | 700 | 1.1 | −0.02em | Hero md |
| hero-sm | 36px | 600 | 1.15 | −0.01em | Hero mobile |
| section-xl | 40px | 700 | 1.2 | −0.02em | Section lg |
| section-md | 32px | 600 | 1.2 | −0.01em | Section desktop |
| section-sm | 24px | 600 | 1.25 | 0 | Section mobile |
| modal-title | 22px | 600 | 1.3 | 0 | Modal heading |
| card-title | 18px | 600 | 1.4 | 0 | Card title |
| body-lg | 18px | 400 | 1.6 | 0 | Lead text |
| body | 15px | 400 | 1.6 | 0 | Default body |
| body-sm | 14px | 400 | 1.5 | 0 | UI text |
| body-xs | 13px | 400 | 1.5 | 0 | Helper text |
| small | 12px | 400 | 1.4 | 0 | Metadata |
| label | 11px | 700 | 1.4 | 0.05em | Uppercase labels |
| caption | 12px | 500 | 1.4 | 0 | Captions |

All headings use `font-family: var(--font-heading)`. Body/default uses `var(--font-body)`.

## Spacing (8px Grid)

Base unit: **8px**. Half-step 4px for icon alignment only.

| Token | px | Use |
|---|---|---|
| 1 | 4 | Micro: icon gaps, badge padding |
| 2 | 8 | Tight: sibling elements |
| 3 | 12 | Button vertical pad, internal gaps |
| 4 | 16 | Standard: list items, card guts |
| 5 | 20 | Card grid gaps |
| 6 | 24 | Card padding, page pad mobile |
| 8 | 32 | Section internal |
| 10 | 40 | Page pad desktop |
| 12 | 48 | Major section breaks |
| 16 | 64 | Page-level |
| 20 | 80 | Hero pad mobile |
| 24 | 96 | Section pad mobile |
| 32 | 128 | Section pad desktop |

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Inputs, checkboxes |
| `--radius-md` | 8px | Cards, panels, tables |
| `--radius-lg` | 12px | Modals, dialogs, cards |
| `--radius-xl` | 16px | Hero image |
| `--radius-2xl` | 24px | Modal content |
| `--radius-full` | 9999px | Pills, badges, avatars, buttons |

## Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Resting cards |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Dropdowns, hover |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Tooltips, toasts |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Drawers, dialogs |
| `--shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Modals |

## Breakpoints

| Name | Min | Cols | Margin |
|---|---|---|---|
| Mobile | 0 | 4 | 24px |
| Tablet | 640px | 8 | 32px |
| Desktop | 768px | 12 | 40px |
| Wide | 1024px | 12 | 40px |
| Max | 1400px | 12 | auto |

Max content width: **1400px**. Mobile-first strategy. Sidebar appears at 1024px (240px wide).

## Animation Tokens

| Token | Value |
|---|---|
| `--duration-fast` | 200ms |
| `--duration-normal` | 300ms |
| `--duration-slow` | 500ms |
| `--duration-slower` | 800ms |
| `--ease-spring` | `cubic-bezier(0.2, 0.8, 0.2, 1)` |

**Keyframes:**
- `fadeInUp`: 0→1 opacity, 30px→0 translateY, 0.8s spring
- `scrollBounce`: 0→6px→0 translateY, 2s infinite ease-in-out
- `drawLine`: 0→100% height, 1.5s spring

**Stagger:** `.stagger-in > *` — 0.6s fadeInUp, 70ms increment per child.

**Section reveal:** `.section-reveal` starts opacity:0 translateY(30px), `.revealed` animates in. Observer: threshold 0.1, rootMargin `-60px`.

**Reduced motion (mandatory):** Disable all animations, show final states.

## Components

### Button

`.btn .btn-primary` / `.btn-secondary` / `.btn-outlined`

```html
<button class="btn btn-primary"><span class="btn-inner">Label</span></button>
```

- Pill shape (`radius-full`), `0.75rem 1.75rem` padding, `0.875rem` font, `500` weight
- Primary: bg `--color-brand-dark`, hover `#000`
- Secondary: bg `#fff`, border `--color-brand-muted`, hover border `--color-brand-dark`
- Outlined: transparent bg, muted border/text, hover darkens
- Danger: `.btn-danger` — bg `--color-error-500`
- Transition: `all var(--duration-normal) var(--ease-spring)`

### Input / Select

```html
<input type="text" class="input" placeholder="..." />
<select class="select"><option>...</option></select>
```

- Full width, `0.75rem 1rem` padding, `14px` body font, `#d4d4d8` border, `radius-md`
- Focus: border `--color-brand-dark`, ring `0 0 0 3px rgba(26,26,26,0.1)`
- Select: custom SVG chevron, `appearance: none`

### Checkbox / Radio / Switch

- `.checkbox-wrapper > input.checkbox + span` / `.radio-wrapper` / `.switch`
- Custom `appearance: none`, 1.125rem square (checkbox) / circle (radio)
- Checked: bg `--color-brand-dark`, white checkmark/dot
- Switch: 2.25×1.25rem, knob slides 1rem, bg transitions `#d4d4d8` → `--color-brand-dark`

### Card

```html
<div class="card">
  <div class="card-title">Title</div>
  <p class="card-desc">Description</p>
</div>
```

- bg `#fff`, border `1px solid rgba(0,0,0,0.06)`, radius-lg, `1.5rem` pad, shadow-sm. No hover.

### Table

```html
<div class="table-container">
  <table class="table">
    <tr><th>...</th></tr>
    <tr><td>...</td></tr>
  </table>
</div>
```

- Bordered container, `14px` font, th: bg `--color-brand-bg`, font-weight 600
- `.striped` row: `rgba(0,0,0,0.02)` bg. Last row: no bottom border.

### List

```html
<ul class="list">
  <li class="list-item"><span class="list-item-icon">✓</span> Text</li>
  <li class="list-item list-item-spread">Label<span class="badge badge-success">Live</span></li>
</ul>
```

- Bordered, radius-lg, `1rem` padding, `0.75rem` gap, `14px` font
- `.list-item-spread` for `justify-content: space-between`

### Tabs

```html
<div class="tabs" data-tab-group="name">
  <div class="tab active" data-tab="panel1">Tab 1</div>
  <div class="tab" data-tab="panel2">Tab 2</div>
</div>
<div data-tab-panel="panel1">Content</div>
<div data-tab-panel="panel2" style="display:none">Content</div>
```

- Flex row, `1px solid #d4d4d8` bottom border, active: `2px solid --color-brand-dark`
- Tab: `0.75rem 1.5rem`, `14px`, weight 500, muted→dark on hover/active

### Modal

```html
<div class="modal-overlay" id="id" onclick="if(event.target===this)this.classList.remove('active')">
  <div class="modal">
    <button class="modal-close" onclick="...">×</button>
    <div class="modal-title">Title</div>
    <p class="modal-desc">Description</p>
    <div class="flex-row-end">
      <button class="btn btn-secondary"><span class="btn-inner">Cancel</span></button>
      <button class="btn btn-primary"><span class="btn-inner">Confirm</span></button>
    </div>
  </div>
</div>
```

- Overlay: `rgba(0,0,0,0.6)` + `backdrop-filter: blur(4px)`, z-100, opacity/visibility transition
- Modal: `#fff`, radius-2xl, `2rem` pad, max-500px, shadow-2xl, translateY(20px)→0
- Close: `2rem` circle, top-right `1.5rem`

### Alert / Toast

```html
<div class="alert alert-success"><iconify-icon icon="solar:check-circle-bold-duotone"></iconify-icon><span>Message</span></div>
<div class="toast"><iconify-icon icon="..." style="color:var(--color-success-500)"></iconify-icon><span>Message</span></div>
```

- Alert variants: `.alert-success` / `-warning` / `-error` / `-info` / `-neutral`
- Alert: flex, `1rem` pad, `0.75rem` gap, radius-md, 1px border, `14px` font, icon `1.25rem`
- Toast: white bg, border-subtle, shadow-lg, `14px`

### Badge / Tooltip / Avatar

- **Badge:** `.badge` — inline-flex, `0.25rem 0.75rem`, 12px, 500, radius-full. Variants: `-success`, `-warning`, `-error`, `-info`
- **Tooltip:** `.tooltip-container > .tooltip` — absolute above, bg `--color-brand-dark`, white text, `0.5rem 0.75rem`, radius-md, 12px, opacity transition
- **Avatar:** `.avatar` — 2.5rem circle, bg `--color-brand-bg`, 14px bold, or `<img>` with object-fit cover

### Tag Pill

```html
<span class="tag-pill">Category</span>
```

- `0.375rem 0.75rem`, 12px, 500, `1px solid #d4d4d8`, radius-full, bg `#fff`
- Hover: bg `--color-brand-dark`, color `#fff`

### Navbar

- Fixed top, `backdrop-filter: blur(16px)`, bg `rgba(245,245,245,0.85)`, border-bottom subtle
- Height: `4rem` mobile / `5rem` desktop. Nav links hidden on mobile
- `.scrolled`: `box-shadow: 0 1px 20px rgba(0,0,0,0.06)` when `pageYOffset > 80`
- Logo: heading font, 1.25rem, 700. Links: 0.875rem, 500, muted→dark+underline on hover
- CTA: pill button, `0.625rem 1.25rem`, dark bg, hover `#000`

## Patterns

### Grid & Layout

- 8px base unit, max-width 1400px, `border-box` sizing
- Gutters: 8px or 16px only. Margins: 24→32→40px by breakpoint
- **Responsive:** fluid columns (editorial, dashboards, heroes)
- **Adaptive:** fixed boxes that wrap (card grids, product listings)
- **Strict:** scroll at threshold (data tables, code blocks)

### Forms

```html
<div class="form-stack">
  <div>
    <label class="form-label">Label</label>
    <input class="input" placeholder="..." />
  </div>
  <button class="btn btn-primary"><span class="btn-inner">Submit</span></button>
</div>
```

- `.form-stack`: grid gap 1rem
- `.form-label`: 11px, 700, uppercase, `0.05em` ls, muted color, `0.5rem` mb

### Empty / Error States

Centered layout: emoji icon → heading (heading font, 600) → meta-text description → CTA button.

## Rules

### Mandatory Implementation

1. **Vanilla CSS** with `:root` custom properties. No Tailwind utilities in HTML.
2. **Semantic class names** (`.section-heading`, `.feature-card`, not utility strings)
3. **Zero external CSS dependencies.** Only Google Fonts `<link>` allowed.
4. **Mobile-first** responsive approach.
5. **Longhand** padding-top/bottom for sections with `.page-container`. Never shorthand `padding`.
6. **`-webkit-font-smoothing: antialiased`** on body.
7. **`scroll-behavior: smooth`** on html.

### Accessibility (WCAG 2.1 AA)

- Skip link: `<a href="#main-content" class="skip-link">Skip</a>` (absolute off-screen, focus brings on-screen)
- Focus ring: `:focus-visible { outline: 2px solid var(--color-brand-dark); outline-offset: 2px; }`
- Contrast: `#181617` on `#F5F5F5` = 17.4:1 ✓, `#71717A` on `#F5F5F5` = 4.6:1 ✓, `#A1A1AA` on `#F5F5F5` = 2.6:1 ✗ (decorative only)
- Reduced motion: disable all keyframe animations, show final states
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`

### Interaction States (5 required per component)

1. **Default** — resting
2. **Hover** — `transition: var(--duration-normal)`
3. **Focus** — outline ring (not box-shadow alone)
4. **Active/pressed** — visual feedback
5. **Disabled** — `opacity: 0.5`, `cursor: not-allowed`

### Design Principles

1. **Balance** — Distribute visual weight evenly
2. **Contrast** — Differentiate through opposition
3. **Emphasis** — One focal point per view
4. **Movement** — Lead the eye through content
5. **Pattern** — Repeat motifs for consistency
6. **Proportion** — Size by importance
7. **Repetition** — Reuse tokens everywhere
8. **Rhythm** — 8px grid strictly applied
9. **Unity** — Shared tokens, borders, radii
10. **Hierarchy** — Clear reading order via size, weight, color, position
11. **Variety** — Controlled diversity within consistency
12. **White Space** — Margins are not wasted space

## Boilerplate

### CSS Reset (mandatory)

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }
img { display: block; max-width: 100%; }
body { font-family: var(--font-body); background: var(--color-brand-bg); color: var(--color-brand-dark); -webkit-font-smoothing: antialiased; }
html { scroll-behavior: smooth; }
```

### CSS Variables (copy to `:root`)

```css
:root {
  --color-brand-bg: #F5F5F5; --color-brand-dark: #181617;
  --color-accent: #ED722E; --color-accent-light: #FCEEE5; --color-accent-dark: #C45A1A;
  --color-brand-muted: #71717A; --color-brand-light: #A1A1AA;
  --color-success-50: #F0FDF4; --color-success-500: #22C55E; --color-success-700: #15803D;
  --color-warning-50: #FFFBEB; --color-warning-500: #F59E0B; --color-warning-700: #B45309;
  --color-error-50: #FEF2F2; --color-error-500: #EF4444; --color-error-700: #B91C1C;
  --color-info-50: #EFF6FF; --color-info-500: #3B82F6; --color-info-700: #1D4ED8;
  --color-neutral-50: #F9FAFB; --color-neutral-500: #6B7280; --color-neutral-700: #374151;
  --font-heading: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Manrope', system-ui, sans-serif;
  --duration-fast: 200ms; --duration-normal: 300ms; --duration-slow: 500ms; --duration-slower: 800ms;
  --ease-spring: cubic-bezier(0.2, 0.8, 0.2, 1);
  --radius-sm: 0.25rem; --radius-md: 0.5rem; --radius-lg: 0.75rem;
  --radius-xl: 1rem; --radius-2xl: 1.5rem; --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05); --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1); --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
  --shadow-2xl: 0 25px 50px rgba(0,0,0,0.25);
  --border-subtle: 1px solid rgba(0,0,0,0.06);
}
```

### Navbar Scroll JS (mandatory)

```js
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.pageYOffset > 80);
});
```

### Scroll Reveal JS (mandatory)

```js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.section-reveal').forEach(el => revealObserver.observe(el));
```

### Reduced Motion (mandatory)

```css
@media (prefers-reduced-motion: reduce) {
  .section-reveal { opacity: 1; transform: none; transition: none; }
  .animate-fade-in-up { animation: none; opacity: 1; transform: none; }
  .stagger-in > * { animation: none; opacity: 1; transform: none; }
  .timeline-line { animation: none; height: 100%; }
  .scroll-indicator { animation: none; }
}
```

### Z-Index Scale

base: 0 · dropdown: 1000 · sticky: 2000 · overlay: 3000 · modal: 4000 · popover: 5000 · toast: 6000 · navbar: 50 · skip-link: 9999