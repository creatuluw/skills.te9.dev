# Output Format Guide

Reference for the exact formatting conventions used in the generated `design-patterns.md` file.

---

## Table of Contents

1. [Document Header](#document-header)
2. [Section Formatting Rules](#section-formatting-rules)
3. [Section 1: Design Token System](#section-1-design-token-system)
4. [Section 2: Typography Scale](#section-2-typography-scale)
5. [Section 3: Color Palette](#section-3-color-palette)
6. [Section 4: Spacing Scale](#section-4-spacing-scale)
7. [Section 5: Component Patterns](#section-5-component-patterns)
8. [Section 6: Animation Tokens](#section-6-animation-tokens)
9. [Section 7: Responsive Breakpoints](#section-7-responsive-breakpoints)
10. [Section 8: Accessibility Requirements](#section-8-accessibility-requirements)
11. [Section 9: Consistency Enforcement](#section-9-consistency-enforcement)
12. [Section 10: Quick Reference](#section-10-quick-reference)
13. [Document Footer](#document-footer)

---

## Document Header

Every `design-patterns.md` must start with this header structure:

```markdown
# [Project Name] Design Patterns — Context Reference

> **Purpose:** Use this file as context when creating user interfaces. It contains all design tokens, component patterns, animation guidelines, responsive strategies, and accessibility requirements for the [Project Name] design system.
>
> **Version:** [X.X] | **Last Updated:** [Month Year]

---

## Table of Contents

1. [Design Token System](#1-design-token-system)
2. [Typography Scale](#2-typography-scale)
3. [Color Palette](#3-color-palette)
4. [Spacing Scale](#4-spacing-scale)
5. [Component Patterns](#5-component-patterns)
6. [Animation Tokens](#6-animation-tokens)
7. [Responsive Breakpoints](#7-responsive-breakpoints)
8. [Accessibility Requirements](#8-accessibility-requirements)
9. [Consistency Enforcement](#9-consistency-enforcement)
10. [Quick Reference](#10-quick-reference)

---
```

---

## Section Formatting Rules

### General Rules

1. **Section headers** use `## ` (h2) with numbered format: `## 1. Section Name`
2. **Sub-section headers** use `### ` (h3): `### Token Hierarchy`
3. **Sub-sub-sections** use `#### ` (h4) only when needed for deep nesting
4. **Every section** ends with `---` (horizontal rule) as a separator
5. **Code blocks** specify language: ` ```css `, ` ```html `, ` ```typescript `, ` ```javascript `
6. **Tables** always have header rows and consistent column alignment
7. **No empty sections** — if a source has no data for a section, omit the section entirely

### Code Block Conventions

- **CSS/HTML**: Use actual Tailwind classes, not descriptions
- **TypeScript**: Use proper CVA syntax with `import` statements
- **JavaScript**: Use `const` for variable declarations, arrow functions for callbacks
- **Comments in code**: Use `/* ... */` for CSS, `//` for JS/TS, `<!-- ... -->` for HTML
- **Code comments** should explain *why*, not *what*

### Table Conventions

- **Header row** is always present
- **Columns** separated by `|` with consistent spacing
- **Alignment**: Left-align text columns, right-align numeric columns
- **Boolean values**: Use checkmark/cross symbols where appropriate

### Token Naming Conventions

- **Colors**: `--color-brand-*`, `--color-success-*`, `--color-warning-*`, `--color-error-*`, `--color-info-*`
- **Fonts**: `--font-heading`, `--font-body`, `--font-sans`
- **Radii**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`, `--radius-full`
- **Shadows**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`
- **Durations**: `--duration-instant`, `--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-slower`
- **Easings**: `--ease-default`, `--ease-in`, `--ease-out`, `--ease-in-out`, `--ease-spring`

---

## Section 1: Design Token System

### Required Sub-sections

1. **Token Hierarchy** — table explaining the three layers
2. **Tailwind v4 Configuration** — full `@theme` block in a CSS code fence
3. **Component Token Pattern (CVA)** — TypeScript code fence with button variant example

### Token Hierarchy Table Format

```markdown
| Layer | Example | Purpose |
|-------|---------|---------|
| **Global Tokens** | `zinc-500: #71717A` | Raw, primitive values |
| **Alias Tokens** | `brand-muted: zinc-500` | Semantic mapping with meaning |
| **Component Tokens** | `button-text: brand-dark` | Scoped to specific components |
```

Followed by a **Key Principle** callout:
```markdown
**Key Principle:** Design decisions are expressed once and consumed everywhere. Use tokens, not raw values.
```

### Tailwind Configuration Code Block

Use this structure:

```markdown
### Tailwind v4 Configuration

```css
/* app.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-brand-bg: #F5F5F5;
  --color-brand-dark: #1A1A1A;
  /* ... all color tokens ... */

  /* Font Families */
  --font-heading: 'Instrument Serif', Georgia, serif;
  --font-body: 'Manrope', 'Inter', system-ui, sans-serif;
  /* ... all font tokens ... */

  /* Border Radius */
  --radius-sm: 0.25rem;
  /* ... all radius tokens ... */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  /* ... all shadow tokens ... */

  /* Animation Durations */
  --duration-instant: 100ms;
  /* ... all duration tokens ... */

  /* Easing Curves */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  /* ... all easing tokens ... */

  /* Animations */
  --animate-fade-in-up: fade-in-up 0.8s var(--ease-spring) forwards;
}
```

Group tokens by category with `/* ... */` comments. Include every token from the source materials.

### CVA Pattern Code Block

Use this structure:

```markdown
### Component Token Pattern (CVA)

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      intent: {
        primary: 'bg-brand-dark text-white hover:bg-black rounded-full',
        secondary: 'bg-white text-brand-dark hover:bg-zinc-100 rounded-xl',
        outlined: 'border border-zinc-600 text-white hover:border-zinc-400 rounded-full',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-7 py-3.5 text-sm',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  }
)
```

Use the actual variant values from the source. Include the `import` statement.

---

## Section 2: Typography Scale

### Required Sub-sections

1. **Font Families** — table with font name, weights, and usage
2. **Font Loading** — HTML `<link>` tags
3. **Type Scale Definitions** — table mapping context to sizes
4. **Heading Hierarchy** — HTML example showing h1/h2/h3/p
5. **Body Text Patterns** — CSS classes for body text variants

### Font Families Table

```markdown
| Font | Weights | Usage |
|------|---------|-------|
| `Instrument Serif` | 400, 500, 600, 700 | Headings, logo, quotes |
| `Manrope` | 300, 400, 500, 600, 700 | Body text, UI text |
| `Inter` | 300, 400, 500, 600, 700 | Sans-serif fallback |
```

### Font Loading Code Block

```markdown
### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale Table

```markdown
### Type Scale Definitions

| Context | Size | Responsive Classes |
|---------|------|--------------------|
| Hero heading | 44px → 56px → 68px | `text-[44px] sm:text-[56px] lg:text-[68px]` |
| Section heading | 32px → 40px → 52px | `text-[32px] sm:text-[40px] lg:text-[52px]` |
| Modal heading | 30px → 36px | `text-2xl sm:text-3xl` |
| Card title | 18px | `text-lg` |
| Body text | 15px | `text-[15px]` |
| Small text | 12px | `text-xs` |
| Labels | 10px | `text-[10px]` |
```

### Heading Hierarchy

```markdown
### Heading Hierarchy

```html
<h1 class="font-heading text-[44px] sm:text-[56px] lg:text-[68px] leading-[1.1] tracking-tight text-brand-dark">
  Page Title
</h1>

<h2 class="font-heading text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.15] tracking-tight text-brand-dark">
  Section Title
</h2>

<h3 class="font-heading text-xl md:text-2xl leading-snug text-brand-dark">
  Subsection Title
</h3>

<p class="font-body text-[15px] leading-relaxed text-brand-muted">
  Body text content goes here.
</p>
```

---

## Section 3: Color Palette

### Required Sub-sections

1. **Brand Colors** — table with token, hex, and usage
2. **Semantic Colors** — table with state, foreground, and background
3. **WCAG Contrast Ratios** — requirements table
4. **The 60-30-10 Color Rule** — explanation with project values
5. **Dark Mode Support** — CSS variables with `:root` and `.dark`

### Brand Colors Table

```markdown
| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | `#F5F5F5` | Page background |
| `brand-dark` | `#1A1A1A` | Primary text, buttons |
| `brand-muted` | `#71717A` | Secondary text |
| `brand-light` | `#A1A1AA` | Decorative elements |
```

### Semantic Colors Table

```markdown
| State | Foreground | Background |
|-------|-----------|------------|
| Success | `#15803D` | `#F0FDF4` |
| Warning | `#B45309` | `#FFFBEB` |
| Error | `#B91C1C` | `#FEF2F2` |
| Info | `#1D4ED8` | `#EFF6FF` |
```

### 60-30-10 Rule

```markdown
### The 60-30-10 Color Rule

- **60% Dominant**: `brand-bg` (#F5F5F5) — backgrounds, large surface areas
- **30% Secondary**: `brand-dark` (#1A1A1A) — text, buttons, navigation
- **10% Accent**: `brand-muted` (#71717A) — tags, secondary elements, subtle UI
```

### Dark Mode Support

```markdown
### Dark Mode Support

```css
:root {
  --color-brand-bg: #F5F5F5;
  --color-brand-dark: #1A1A1A;
  --color-brand-muted: #71717A;
  --color-brand-light: #A1A1AA;
}

.dark {
  --color-brand-bg: #1A1A1A;
  --color-brand-dark: #F5F5F5;
  --color-brand-muted: #A1A1AA;
  --color-brand-light: #71717A;
}
```

---

## Section 4: Spacing Scale

### Required Sub-sections

1. **Grid System** — base unit and rationale
2. **Complete Spacing Scale** — full table of values
3. **Container Constraints** — max-widths
4. **Responsive Padding Pattern** — horizontal padding progression
5. **Layout Utility Classes** — CSS class definitions
6. **Section Spacing Pattern** — vertical rhythm
7. **Component Spacing Reference** — per-component spacing table

### Grid System

```markdown
### 8-Point Grid System

All spacing values are multiples of the 8px base unit (with 4px exceptions for tight layouts).

| Base | Values |
|------|--------|
| 4px | `1` (half-step for tight spacing) |
| 8px | `2` |
| 12px | `3` |
| 16px | `4` |
| 20px | `5` |
| 24px | `6` |
| 32px | `8` |
| 40px | `10` |
| 48px | `12` |
| 64px | `16` |
| 80px | `20` |
| 96px | `24` |
| 128px | `32` |
```

### Container Constraints

```markdown
### Container Constraints

| Context | Max Width | Tailwind |
|---------|-----------|----------|
| Page | 1400px | `max-w-[1400px] mx-auto` |
| Content | 1200px | `max-w-[1200px] mx-auto` |
| Prose | 720px | `max-w-prose mx-auto` |
```

### Layout Utility Classes

Define each utility class in its own CSS block:

```markdown
### Layout Utility Classes

```css
.page-container {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}

.content-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.section-padding {
  padding-top: 96px;
  padding-bottom: 96px;
}

.hero-padding {
  padding-top: 80px;
  padding-bottom: 80px;
}

.card-spacing {
  padding: 24px;
}

.grid-default {
  display: grid;
  gap: 24px;
}
```

### Component Spacing Reference Table

```markdown
### Component Spacing Reference

| Component | Property | Mobile | Desktop |
|-----------|----------|--------|---------|
| Page padding | horizontal | `px-6` (24px) | `md:px-10` (40px) |
| Section padding | vertical | `py-16` (64px) | `md:py-24` (96px) |
| Hero padding | vertical | `py-20` (80px) | `md:py-32` (128px) |
| Card padding | all sides | `p-6` (24px) | — |
| Button (md) | horizontal | `px-6 py-3` | — |
| Tag pill | horizontal | `px-3 py-1.5` | — |
| Form fields | between | `space-y-5` (20px) | — |
```

---

## Section 5: Component Patterns

### Pattern Format

Each pattern uses this consistent structure:

```markdown
### Pattern [N]: [Pattern Name]

[Brief description — what it is and when to use it]

```html
[HTML markup with Tailwind classes — real, copy-paste-ready]
```

[Optional: Custom CSS if needed]

```css
.custom-class {
  /* styles beyond Tailwind */
}
```

[Optional: JavaScript behavior if needed]

```javascript
// Behavior description
const element = document.querySelector(...)
```

---

### Pattern Numbering

Number patterns sequentially. Include these if present in sources:

1. Fixed Navbar with Blur Backdrop
2. Split Hero Layout
3. Image Card with Hover Overlay
4. Portfolio Grid with Category Filtering
5. Slide-up Modal
6. Vertical Timeline
7. Tag Pills
8. Primary/Secondary Buttons
9. Scroll-triggered Section Reveals
10. Skills/Progress Bars
11. Testimonial
12. Contact Form
13. Multi-column Footer
14. Custom Scrollbar
15. Background Texture

### HTML Markup Conventions

- Use **semantic elements**: `<nav>`, `<section>`, `<footer>`, `<aside>`
- Include **all Tailwind classes** — do not abbreviate or use placeholders
- Include **ARIA attributes** where relevant: `aria-label`, `aria-hidden`, `role`
- Use **Lucide icon syntax** if the project uses Lucide: `<i data-lucide="icon-name">`
- **Indent** with 2 spaces

### CSS Convention

- Only include CSS for **custom classes** not achievable with Tailwind alone
- Common custom CSS needs: pseudo-elements (`::after`), hover overlay transitions, scrollbar styling, keyframe animations
- Use the actual class names from the source

### JavaScript Convention

- Use `const` for declarations
- Use arrow functions for callbacks
- Include `IntersectionObserver` configuration with `threshold` and `rootMargin`
- Include event listeners with behavior descriptions
- Comment non-obvious logic

---

## Section 6: Animation Tokens

### Required Sub-sections

1. **Duration Tokens** — table
2. **Easing Tokens** — table with full cubic-bezier values
3. **Delay Tokens (Stagger Pattern)** — stagger increment and delay classes
4. **Keyframe Animations** — `@keyframes` CSS blocks
5. **Animation Patterns from Reference Design** — applied patterns with CSS
6. **Performance Rules** — bullet list

### Duration Tokens Table

```markdown
| Token | Value | Usage |
|-------|-------|-------|
| instant | 100ms | Micro-interactions, tooltip show/hide |
| fast | 200ms | Button hover, small transitions |
| normal | 300ms | Standard transitions, nav link hover |
| slow | 500ms | Complex state changes, filter transitions |
| slower | 800ms | Entrance animations (fadeInUp) |
```

### Easing Tokens Table

```markdown
| Token | Value | Usage |
|-------|-------|-------|
| default | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| in | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |
| out | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric transitions |
| spring | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Playful, organic motion |
```

### Keyframe Animations

```markdown
### Keyframe Animations

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Performance Rules

```markdown
### Performance Rules

- **Only animate `transform` and `opacity`** — these are GPU-accelerated and don't trigger layout
- **Avoid animating** `width`, `height`, `top`, `left`, `margin`, `padding` — these cause layout reflow
- **Use `will-change` sparingly** — only on elements about to animate, remove after animation
- **Prefer CSS animations** over JavaScript for simple entrance/exit effects
- **Use `prefers-reduced-motion`** to disable animations for users who prefer reduced motion
```

---

## Section 7: Responsive Breakpoints

### Required Sub-sections

1. **Breakpoint Table** — prefix, min-width, CSS, typical device
2. **Mobile-First Strategy** — explanation
3. **Reference Design Responsive Patterns** — table of patterns

### Breakpoint Table

```markdown
| Prefix | Min Width | CSS | Typical Device |
|--------|-----------|-----|----------------|
| (default) | 0px | (base styles) | Mobile phones |
| `sm:` | 640px | `@media (min-width: 640px)` | Large phones / small tablets |
| `md:` | 768px | `@media (min-width: 768px)` | Tablets |
| `lg:` | 1024px | `@media (min-width: 1024px)` | Laptops |
| `xl:` | 1280px | `@media (min-width: 1280px)` | Desktops |
| `2xl:` | 1536px | `@media (min-width: 1536px)` | Large desktops |
```

### Mobile-First Strategy

```markdown
### Mobile-First Strategy

Base styles target mobile devices. Use `min-width` media queries (via Tailwind's `sm:`, `md:`, `lg:` prefixes) to progressively enhance for larger screens.

**Pattern:** Write mobile styles first, then add `sm:`, `md:`, `lg:` overrides.
```

### Responsive Patterns Table

```markdown
### Reference Design Responsive Patterns

| Pattern | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Portfolio grid | `grid-cols-1` | `sm:grid-cols-2` | `lg:grid-cols-3` |
| Hero grid | `grid-cols-1` | — | `lg:grid-cols-12` |
| Section padding | `px-6` | `sm:px-8` | `md:px-10` |
| Hero heading | `text-[44px]` | `sm:text-[56px]` | `lg:text-[68px]` |
| Desktop nav | `hidden` | — | `md:flex` |
| Mobile menu btn | (visible) | — | `md:hidden` |
```

---

## Section 8: Accessibility Requirements

### Required Sub-sections

1. **WCAG Level** — conformance target
2. **Four Principles (POUR)** — numbered list
3. **Key Success Criteria** — table
4. **Semantic HTML Requirements** — landmark elements
5. **ARIA Patterns** — code examples
6. **Focus Management** — CSS focus styles
7. **prefers-reduced-motion Support** — CSS media query block
8. **Color Contrast Requirements** — ratio table
9. **Form Accessibility** — labeled inputs, error handling

### Key Success Criteria Table

```markdown
| Criterion | Level | Requirement |
|-----------|-------|-------------|
| 1.1.1 Non-text Content | A | All images have alt text |
| 1.3.1 Info and Relationships | A | Semantic HTML structure |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 for normal text |
| 1.4.10 Reflow | AA | Content reflows at 320px width |
| 2.1.1 Keyboard | A | All functionality keyboard accessible |
| 2.4.7 Focus Visible | AA | Keyboard focus indicator visible |
| 2.5.8 Target Size | AA | 24x24px minimum touch targets |
| 4.1.2 Name, Role, Value | A | Accessible names for all controls |
```

### Focus Management Code Block

```markdown
### Focus Management

```css
/* Show focus ring for keyboard users only */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #1A1A1A;
  outline-offset: 2px;
}
```

### prefers-reduced-motion Block

```markdown
### prefers-reduced-motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .section-reveal {
    opacity: 1;
    transform: none;
  }

  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Section 9: Consistency Enforcement

### Required Sub-sections

1. **Design Token Guardrails** — rules
2. **Shared Component Library** — guidance
3. **ESLint Rules** — config block
4. **Stylelint Rules** — config block
5. **Visual Regression Testing** — example test
6. **Design Review Checklist** — checklist items
7. **PR Template Embed** — markdown template

### ESLint Rules Block

```markdown
### ESLint Rules

```javascript
// .eslintrc.js
{
  rules: {
    "tailwindcss/no-arbitrary-value": "warn",
    "tailwindcss/enforces-negative-arbitrary-values": "warn"
  }
}
```

### Design Review Checklist

```markdown
### Design Review Checklist

- [ ] Uses design tokens instead of raw values (colors, spacing, typography)
- [ ] Components follow established patterns from this document
- [ ] Responsive breakpoints applied correctly (mobile-first)
- [ ] Color contrast meets WCAG 2.1 AA requirements
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Interactive elements have visible focus indicators
- [ ] Images have meaningful alt text or `alt=""` for decorative
- [ ] Forms have proper labels and error handling
```

### PR Template

```markdown
### PR Template Embed

```markdown
## Design System Compliance

- [ ] Uses design tokens (no raw color/spacing values)
- [ ] Follows component patterns from design-patterns.md
- [ ] Responsive at all breakpoints (mobile-first)
- [ ] Meets WCAG 2.1 AA accessibility requirements
- [ ] Animations respect prefers-reduced-motion
```

---

## Section 10: Quick Reference

### Required Tables

The Quick Reference section contains these summary tables in this exact order:

1. **Colors**
2. **Fonts**
3. **Font Sizes**
4. **Border Radii**
5. **Shadows**
6. **Z-Index Scale**
7. **Spacing Values**
8. **Animation Values**
9. **Icon Sizes**

### Colors Table

```markdown
### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | `#F5F5F5` | Page background |
| `brand-dark` | `#1A1A1A` | Primary text, buttons |
| `brand-muted` | `#71717A` | Secondary text |
| `brand-light` | `#A1A1AA` | Decorative, scrollbar hover |
| `white` | `#FFFFFF` | Card surfaces, inverted text |
| Success | `#22C55E` / bg `#F0FDF4` | Success states |
| Warning | `#F59E0B` / bg `#FFFBEB` | Warning states |
| Error | `#EF4444` / bg `#FEF2F2` | Error states |
| Info | `#3B82F6` / bg `#EFF6FF` | Info states |
```

Include all contextual colors (navbar background with opacity, overlays, scrollbar colors) as additional rows.

### Fonts Table

```markdown
### Fonts

| Font | Weights | Usage |
|------|---------|-------|
| `Instrument Serif` | 400, 500, 600, 700 | Headings, logo, quotes |
| `Manrope` | 300, 400, 500, 600, 700 | Body text, UI text |
| `Inter` | 300, 400, 500, 600, 700 | Sans-serif fallback |
```

### Font Sizes Table

```markdown
### Font Sizes

| Context | Size | Responsive |
|---------|------|------------|
| Hero heading | 44px → 56px → 68px | `text-[44px] sm:text-[56px] lg:text-[68px]` |
| Section heading | 32px → 40px → 52px | `text-[32px] sm:text-[40px] lg:text-[52px]` |
| Modal heading | 30px → 36px | `text-2xl sm:text-3xl` |
| Testimonial quote | 24px → 30px → 36px | `text-[24px] sm:text-[30px] lg:text-[36px]` |
| Timeline heading | 20px → 24px | `text-xl md:text-2xl` |
| Card title | 18px | `text-lg` |
| Body text | 15px | `text-[15px]` |
| Card description | 14px | `text-[14px]` |
| Small text | 12px | `text-xs` |
| Labels | 10px | `text-[10px]` |
```

### Border Radii Table

```markdown
### Border Radii

| Element | Value | Tailwind |
|---------|-------|----------|
| Cards, timeline items | 12px | `rounded-xl` |
| Hero image, modal | 16px–24px | `rounded-2xl` / `md:rounded-3xl` |
| Buttons, tags, pills | 9999px | `rounded-full` |
| Form inputs | 12px | `rounded-xl` |
| Skill bars | 9999px | `rounded-full` |
| Avatars | 9999px | `rounded-full` |
```

### Shadows Table

```markdown
### Shadows

| Element | Value | Tailwind |
|---------|-------|----------|
| Timeline cards | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` |
| Floating labels | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` |
| Modal | `0 25px 50px rgba(0,0,0,0.25)` | `shadow-2xl` |
| Navbar scroll | `0 1px 20px rgba(0,0,0,0.06)` | Custom |
```

### Z-Index Scale Table

```markdown
### Z-Index Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `z-base` | 0 | Normal flow |
| `z-dropdown` | 1000 | Dropdowns |
| `z-sticky` | 2000 | Sticky headers |
| `z-overlay` | 3000 | Modal backdrops |
| `z-modal` | 4000 | Modal content |
| `z-popover` | 5000 | Tooltips |
| `z-toast` | 6000 | Notifications |
```

Add project-specific overrides as additional rows (e.g., `Navbar | z-50 | Reference design navbar`).

### Spacing Values Table

```markdown
### Spacing Values

| Context | Mobile | Desktop |
|---------|--------|---------|
| Page horizontal padding | `px-6` (24px) | `sm:px-8` (32px) \| `md:px-10` (40px) |
| Section vertical padding | `py-16` (64px) | `md:py-24` (96px) |
| Hero vertical padding | `py-20` (80px) | `md:py-32` (128px) |
| Footer padding | `py-12` (48px) | `md:py-16` (64px) |
| Navbar height | `h-16` (64px) | `md:h-20` (80px) |
| Max content width | `max-w-[1400px]` | `max-w-[1400px]` |
| Card grid gap | `gap-5` (20px) | `md:gap-6` (24px) |
| Card internal padding | `p-6` (24px) | — |
| Button padding (primary) | `px-6 py-3` | — |
| Tag pill padding | `px-3 py-1.5` | — |
| Form field spacing | `space-y-5` (20px) | — |
```

### Animation Values Table

```markdown
### Animation Values

| Property | Value |
|----------|-------|
| Primary easing | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| fadeInUp distance | `translateY(30px)` |
| fadeInUp duration | `0.8s` |
| Stagger delay increment | `~70-80ms` |
| Hover scale | `scale(1.04)` |
| Hover transition | `0.3s` (image: `0.7s`) |
| Modal slide-up | `translateY(40px)` |
| Modal transform duration | `0.4s` |
| Observer threshold | `0.1` |
| Observer rootMargin | `0px 0px -60px 0px` |
```

### Icon Sizes Table

```markdown
### Icon Sizes

| Context | Size |
|---------|------|
| Inline with text | `w-4 h-4` (16px) |
| Standalone in button | `w-4 h-4` to `w-5 h-5` (16-20px) |
| Navigation icons | `w-5 h-5` (20px) |
| Decorative (quote) | `w-10 h-10` (40px) |
| Social icons | `w-5 h-5` (20px) |
```

---

## Document Footer

End the document with this attribution line:

```markdown
---

*This document synthesizes research findings from: [list all source folders used].*
```

Example:

```markdown
---

*This document synthesizes research findings from: design-systems, design-consistency, design-principles, typography-and-color, layout-and-spacing, animation-and-motion, responsive-and-accessible, and component-patterns.*
```

---

## Formatting Do's and Don'ts

### Do

- Use exact hex values, not color names
- Include full cubic-bezier notation, not easing names alone
- Use real Tailwind class strings, not descriptions
- Include responsive breakpoint progressions (mobile → tablet → desktop)
- Use semantic HTML elements in component patterns
- Include ARIA attributes in interactive components
- Number component patterns sequentially
- Use `font-heading` and `font-body` references, not raw font-family strings

### Don't

- Use placeholder text like "add your color here"
- Abbreviate Tailwind class strings (write `bg-brand-dark text-white hover:bg-black rounded-full`, not `bg-dark text-white hover:bg-black rounded`)
- Use pseudocode or describe markup instead of writing it
- Omit JavaScript behavior from interactive components
- Use `px` values without the Tailwind class equivalent
- Leave any section from the required structure empty without omitting it entirely
- Mix Tailwind v3 (`tailwind.config.js`) and v4 (`@theme`) syntax