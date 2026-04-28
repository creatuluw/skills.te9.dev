# Design Domain Extraction Guide

Reference for extracting design system information from each subfolder's findings and source materials.

---

## Table of Contents

1. [design-systems/](#design-systems)
2. [typography-and-color/](#typography-and-color)
3. [layout-and-spacing/](#layout-and-spacing)
4. [component-patterns/](#component-patterns)
5. [animation-and-motion/](#animation-and-motion)
6. [responsive-and-accessible/](#responsive-and-accessible)
7. [design-principles/](#design-principles)
8. [design-consistency/](#design-consistency)
9. [design-blueprint.md](#design-blueprint)
10. [Conflict Resolution](#conflict-resolution)

---

## design-systems/

### What to Extract

**Purpose:** This folder establishes the foundational token architecture and component variant strategy.

**Extract for Section 1 — Design Token System:**
- Token hierarchy model (global tokens, alias tokens, component tokens)
- Tailwind configuration approach (`@theme` block structure for v4)
- CVA (class-variance-authority) variant pattern for components
- Design system governance model (versioning, contribution, deprecation)

**Key Questions to Answer:**
- What are the three token layers and how do they relate?
- How is the Tailwind config structured (`@import "tailwindcss"` + `@theme`)?
- What does the CVA pattern look like for a button component?

**Extraction Pattern:**
- Look for `@theme` CSS blocks with `--color-*`, `--font-*`, `--radius-*`, `--shadow-*` declarations
- Look for `const buttonVariants = cva(...)` patterns showing variant structure
- Look for tables describing token hierarchy

**Skip:** General design system philosophy, tool comparisons, team scaling strategies — these are background context, not tokens.

---

## typography-and-color/

### What to Extract

**Purpose:** Defines the complete typographic system and color palette.

**Extract for Section 2 — Typography Scale:**
- Font families with their weights (e.g., `Instrument Serif: 400, 500, 600, 700`)
- Font loading strategy (`<link>` tags with `display=swap`)
- Type scale definitions — exact sizes for each context (hero, section headings, body, small text, labels)
- Heading hierarchy (h1 through h3/p with exact classes)
- Body text patterns (regular, muted, small)
- Line height and letter spacing values
- Font pairing strategy if documented

**Extract for Section 3 — Color Palette:**
- Brand colors as hex values (primary, secondary, muted, light, background)
- Semantic color tokens (success, warning, error, info with both foreground and background)
- WCAG contrast ratio requirements (4.5:1 for normal text, 3:1 for large text/UI)
- 60-30-10 color rule explanation and application
- Dark mode support — CSS variable pattern with `:root` and `.dark` selectors

**Key Questions to Answer:**
- What are the exact hex values for every brand color?
- What font-size values are used for hero headings, section headings, body text?
- What are the responsive typography classes (`text-[44px] sm:text-[56px] lg:text-[68px]`)?
- How is dark mode implemented (CSS variables, class toggle)?

**Extraction Pattern:**
- Look for CSS `@theme` blocks with `--color-*` and `--font-*` declarations
- Look for HTML showing font loading: `<link href="..." rel="stylesheet">`
- Look for tables mapping contexts to sizes (e.g., "Hero heading | 44px → 56px → 68px")
- Look for `:root` and `.dark` CSS blocks showing color variable pairs
- Look for WCAG contrast analysis tables

**Skip:** General typography theory, font pairing theory without specific values, performance optimization tips.

---

## layout-and-spacing/

### What to Extract

**Purpose:** Defines the spatial system — grid, spacing scale, containers, and vertical rhythm.

**Extract for Section 4 — Spacing Scale:**
- Grid system base unit (typically 8px) and rationale
- Complete spacing scale table (token name → value → common usage)
- Container max-width constraints (e.g., `max-w-[1400px]`)
- Responsive padding patterns (e.g., `px-6 sm:px-8 md:px-10`)
- Layout utility class definitions (`.page-container`, `.content-container`, `.section-padding`, `.hero-padding`, `.card-spacing`, `.grid-default`)
- Section spacing pattern (vertical rhythm values for mobile and desktop)
- Component spacing reference table (cards, buttons, tags, timeline, forms)
- CSS shorthand pitfalls and how to avoid them

**Key Questions to Answer:**
- What is the base grid unit and complete spacing scale?
- What are the container max-widths at each breakpoint?
- What are the standard padding values for page, section, hero, and card?
- How much vertical space separates sections on mobile vs. desktop?
- What spacing values do specific components use (button padding, tag padding, form field spacing)?

**Extraction Pattern:**
- Look for spacing scale tables mapping names to values
- Look for CSS class definitions like `.page-container { max-width: ... }`
- Look for responsive padding patterns showing breakpoint progression
- Look for "Component Spacing Reference" or similar tables
- Look for grid layout patterns (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`)

**Skip:** General layout theory, Grid vs. Flexbox comparison without specific project values, generic best practices.

---

## component-patterns/

### What to Extract

**Purpose:** The most content-rich source — defines every reusable UI component with markup, styles, and behavior.

**Extract for Section 5 — Component Patterns:**
Each pattern must include:
1. **Description** — What it is and when to use it
2. **HTML markup** — Real, copy-paste-ready code with Tailwind classes
3. **CSS** — Custom classes beyond Tailwind (hover effects, animations, pseudo-elements)
4. **JavaScript** — Behavior (scroll listeners, observers, filter logic, modal open/close)

**Required Patterns to Extract (if present in sources):**

| # | Pattern Name | Key Elements |
|---|-------------|-------------|
| 1 | Fixed Navbar with Blur | Sticky positioning, backdrop-blur, scroll shadow, nav link hover underline, mobile hamburger |
| 2 | Split Hero Layout | Grid-based text+image split, section labels, CTA buttons, scroll indicator |
| 3 | Image Card with Hover Overlay | Aspect ratio container, image scale on hover, overlay with icon, title, description |
| 4 | Portfolio Grid with Filtering | Responsive grid, category filter buttons, filter JavaScript, fade+slide transition |
| 5 | Slide-up Modal | Backdrop with blur, slide-up content, open/close animation classes, close button |
| 6 | Vertical Timeline | Timeline line with dot markers, animated line drawing, step items with number/title/description |
| 7 | Tag Pills | Rounded-full badges, hover states, consistent padding |
| 8 | Primary/Secondary Buttons | CTA button variants, icon sizing, full-width option |
| 9 | Scroll-triggered Reveals | IntersectionObserver setup, threshold and rootMargin values, `.section-reveal` / `.revealed` classes |
| 10 | Skills/Progress Bars | Label + percentage, animated fill bar, rounded-full track |
| 11 | Testimonial | Quote icon, blockquote, author info with avatar, name, role |
| 12 | Contact Form | Inline labels, input/select/textarea fields, submit button, success message |
| 13 | Multi-column Footer | Logo + tagline, social links, copyright, responsive stacking |
| 14 | Custom Scrollbar | Webkit scrollbar pseudo-elements, thumb/track/hover colors |
| 15 | Background Texture | SVG noise overlay, opacity, absolute positioning |

**Key Questions to Answer:**
- What is the exact HTML structure for each pattern?
- What Tailwind classes are applied to each element?
- What custom CSS is needed (hover effects, pseudo-elements, animations)?
- What JavaScript drives interactive behavior (observers, listeners, state management)?

**Extraction Pattern:**
- Look for HTML code blocks starting with semantic elements (`<nav>`, `<section>`, `<div>`, `<footer>`)
- Look for CSS blocks defining custom classes (`.nav-link::after`, `.artwork-card .artwork-overlay`, `.modal-backdrop`)
- Look for JavaScript blocks with `const`, `addEventListener`, `IntersectionObserver`, `classList`
- Extract exact class strings from elements — do not paraphrase Tailwind classes
- Note animation states: what classes are added/removed on interaction

**Skip:** General component design theory, accessibility notes (covered in responsive-and-accessible), animation details (covered in animation-and-motion).

---

## animation-and-motion/

### What to Extract

**Purpose:** Defines all animation tokens, patterns, and performance rules.

**Extract for Section 6 — Animation Tokens:**

**Duration Tokens:**
| Token | Value | Usage |
|-------|-------|-------|
| instant | 100ms | Micro-interactions |
| fast | 200ms | Button hover, small transitions |
| normal | 300ms | Standard transitions, nav link hover |
| slow | 500ms | Complex state changes |
| slower | 800ms | Entrance animations (fadeInUp) |

**Easing Tokens:**
| Token | Value | Usage |
|-------|-------|-------|
| default | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard easing |
| in | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving |
| out | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering |
| in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric transitions |
| spring | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Playful, organic motion |

**Delay Tokens (Stagger Pattern):**
- Stagger delay increment (typically 70-80ms per child)
- `.delay-1` through `.delay-5` values

**Keyframe Animations:**
- `fade-in-up` — opacity 0→1, translateY(30px→0), duration 0.8s
- Stagger-in — sequential reveal of children with delay increment
- Any custom keyframes from the source

**Animation Patterns:**
- Card hover: `transform: scale(1.04)`, duration 0.3s (image: 0.7s)
- Modal: backdrop opacity 0.3s, content translateY(40px) 0.4s
- Timeline line: stroke-dashoffset animation, duration 1.5s
- Nav link underline: `width` transition, duration 0.3s
- Scroll indicator: bounce translateY(6px), 2s infinite

**Performance Rules:**
- Only animate `transform` and `opacity` (the golden rule)
- Use `will-change` sparingly, only on elements about to animate
- Use `translate3d(0,0,0)` or `translateZ(0)` for GPU acceleration when needed
- Remove `will-change` after animation completes

**Extraction Pattern:**
- Look for CSS custom properties defining durations and easings
- Look for `@keyframes` blocks
- Look for `transition:` and `animation:` property declarations
- Look for performance best practice sections
- Look for `prefers-reduced-motion` implementation details (note: full accessibility treatment goes in Section 8)

---

## responsive-and-accessible/

### What to Extract

### For Section 7 — Responsive Breakpoints:

**Breakpoint Table:**

| Prefix | Min Width | CSS | Typical Device |
|--------|-----------|-----|----------------|
| (base) | 0px | — | Mobile |
| `sm:` | 640px | `@media (min-width: 640px)` | Large phones / small tablets |
| `md:` | 768px | `@media (min-width: 768px)` | Tablets |
| `lg:` | 1024px | `@media (min-width: 1024px)` | Laptops |
| `xl:` | 1280px | `@media (min-width: 1280px)` | Desktops |
| `2xl:` | 1536px | `@media (min-width: 1536px)` | Large desktops |

**Mobile-First Strategy:**
- Base styles target mobile
- Progressive enhancement via `min-width` media queries
- Content determines breakpoints, not devices

**Responsive Pattern Examples from Source:**
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Spacing: `px-6 sm:px-8 md:px-10`
- Typography: `text-[44px] sm:text-[56px] lg:text-[68px]`
- Visibility: `hidden md:flex` / `md:hidden`

### For Section 8 — Accessibility Requirements:

**WCAG Level:** Typically 2.1 AA

**Four Principles (POUR):**
1. Perceivable
2. Operable
3. Understandable
4. Robust

**Key Success Criteria Table:**
| Criterion | Level | Requirement |
|-----------|-------|-------------|
| 1.1.1 Non-text Content | A | All images have alt text |
| 1.3.1 Info and Relationships | A | Semantic HTML structure |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 normal text, 3:1 large text |
| 1.4.10 Reflow | AA | Content reflows at 320px |
| 2.1.1 Keyboard | A | All functionality keyboard accessible |
| 2.4.7 Focus Visible | AA | Keyboard focus indicator visible |
| 4.1.2 Name, Role, Value | A | Accessible names for all controls |

**Semantic HTML Requirements:**
- Landmark elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`
- Heading hierarchy: no skipped levels
- Form labels: explicit `<label for="...">`

**ARIA Patterns:**
- First rule: prefer native HTML over ARIA
- `aria-label` for icon-only buttons
- `aria-expanded` for toggles
- `aria-hidden="true"` for decorative icons
- `role="dialog"` for modals

**Focus Management:**
- `:focus-visible` for keyboard-only focus rings
- Skip navigation link
- Modal focus trap
- Focus return after modal close

**prefers-reduced-motion Support:**
- CSS: `@media (prefers-reduced-motion: reduce)` to disable/simplify animations
- JS: Check `window.matchMedia('(prefers-reduced-motion: reduce)')` before programmatic animations
- Svelte: Conditional duration (`duration: motionOk ? 300 : 0`)

**Color Contrast Requirements:**
- Normal text (< 18px): 4.5:1 minimum
- Large text (>= 18px or 14px bold): 3:1 minimum
- UI components: 3:1 minimum

**Form Accessibility:**
- Every input has associated label
- Error messages linked via `aria-describedby`
- `aria-invalid="true"` on fields with errors
- Group related controls with `<fieldset>` + `<legend>`

**Extraction Pattern:**
- Look for WCAG criterion tables
- Look for HTML examples with ARIA attributes
- Look for CSS focus styles (`:focus-visible`)
- Look for `@media (prefers-reduced-motion)` blocks
- Look for contrast ratio analysis tables

---

## design-principles/

### What to Extract

**Purpose:** Provides the philosophical foundation that informs design decisions.

**What to Include (sparingly) in the Output:**
This section's findings primarily inform *how we write about* the design system, not what tokens go into it. Extract:

- The **60-30-10 Color Rule** — include in Section 3 (Color Palette) as a guiding principle
- **Core visual principles** (hierarchy, contrast, alignment, proximity, repetition, balance, white space) — reference in the Quick Reference intro if space permits
- **UX laws** (Jakob's, Fitts's, Hick's, Miller's) — these explain *why* certain patterns exist; mention briefly in relevant component patterns if the source makes explicit connections

**What NOT to Include:**
- Lengthy explanations of Gestalt principles
- General design theory divorced from specific project values
- Academic explanations without concrete token/pattern connections

**Extraction Pattern:**
- Scan for specific project values tied to principles
- Look for "60-30-10" sections with hex values
- Look for Tailwind CSS examples showing principle application

---

## design-consistency/

### What to Extract

**Purpose:** Defines enforcement mechanisms that keep the design system consistent.

**Extract for Section 9 — Consistency Enforcement:**

**Design Token Guardrails:**
- Rule: use design tokens, never raw values
- Rule: extend the system, don't bypass it

**Shared Component Library:**
- Single source of truth for each component
- Component file structure convention

**ESLint Rules:**
```
"tailwindcss/no-arbitrary-value": "warn"
"tailwindcss/enforces-negative-arbitrary-values": "warn"
```

**Stylelint Rules:**
```
"color-no-hex": true (enforce token usage)
"declaration-block-no-duplicate-properties": true
```

**Visual Regression Testing:**
- Tool recommendation (typically Playwright)
- Test pattern: capture screenshot, compare to baseline
- Example test code block

**Design Review Checklist:**
- Are design tokens used instead of raw values?
- Do components follow established patterns?
- Are responsive breakpoints applied correctly?
- Is color contrast AA-compliant?
- Are animations respectful of prefers-reduced-motion?

**PR Template Embed:**
```markdown
## Design System Compliance
- [ ] Uses design tokens (no raw color/spacing values)
- [ ] Follows component patterns from design-patterns.md
- [ ] Responsive at all breakpoints (mobile-first)
- [ ] Meets WCAG 2.1 AA accessibility
- [ ] Animations respect prefers-reduced-motion
```

**Extraction Pattern:**
- Look for ESLint/Stylelint config blocks
- Look for checklist items
- Look for PR template sections
- Look for testing code examples

---

## design-blueprint

### What to Extract

**Purpose:** The canonical specification. If it exists, it overrides all other sources.

The blueprint typically contains all 10 sections already organized. When it exists:

1. **Use it as the primary source** for every section
2. **Cross-reference with findings files** to fill gaps or add detail
3. **Flag conflicts** where findings disagree with the blueprint (blueprint wins)

**Extraction Pattern:**
- Read the entire blueprint first to understand its structure
- Map each blueprint section to the required output section
- For each section, check if findings files contain additional detail not in the blueprint
- Merge additional detail into the blueprint's framework

---

## Conflict Resolution

### Source Priority Order

When sources disagree on a value or pattern, apply this priority:

1. **`design-blueprint.md`** — Authoritative specification. If it says `rounded-xl` for cards, that's the answer.
2. **`design-patterns.md` (existing)** — Current system of record. Respected unless blueprint contradicts.
3. **`component-patterns/findings.md`** — Concrete implementations from actual code. High confidence.
4. **`design-systems/findings.md`** — Token architecture. Authoritative for token definitions.
5. **`typography-and-color/findings.md`** — Font and color specifications.
6. **`layout-and-spacing/findings.md`** — Spacing values and layout patterns.
7. **`animation-and-motion/findings.md`** — Animation tokens and patterns.
8. **`responsive-and-accessible/findings.md`** — Breakpoint and accessibility requirements.
9. **`design-consistency/findings.md`** — Enforcement rules and checklists.
10. **`design-principles/findings.md`** — Philosophy and rationale (lowest priority for exact values).

### Common Conflict Types

| Conflict Type | Example | Resolution |
|--------------|---------|------------|
| Different border radius | Blueprint says `rounded-xl`, component findings says `rounded-2xl` | Use blueprint value |
| Different spacing | Layout findings says `py-24 md:py-32`, blueprint says `py-16 md:py-24` | Use blueprint value |
| Missing value in blueprint | Blueprint doesn't specify scrollbar colors | Use component findings value |
| Animation duration mismatch | Animation findings says 0.8s, blueprint says 0.6s | Use blueprint value |
| Token name differences | One source uses `brand-primary`, another uses `brand-dark` | Use the name from the Tailwind `@theme` config |

### How to Handle Conflicts in Output

- **Do not** note conflicts in the output document — present a single, consistent system
- **Do** choose the higher-priority source's value
- **Do** ensure internal consistency — if the blueprint says `rounded-xl` for cards, all card patterns in Section 5 should use `rounded-xl`

---

## Quick Extraction Checklist

Use this when analyzing a new design folder:

- [ ] **design-systems/**: Token hierarchy, Tailwind `@theme` config, CVA pattern
- [ ] **typography-and-color/**: All font families + weights, font-size scale, hex colors, dark mode vars
- [ ] **layout-and-spacing/**: Grid unit, spacing scale, container widths, section spacing, component spacing
- [ ] **component-patterns/**: All 15 patterns with HTML + CSS + JS
- [ ] **animation-and-motion/**: Duration tokens, easing tokens, keyframes, stagger delays, performance rules
- [ ] **responsive-and-accessible/**: Breakpoint table, mobile-first patterns, WCAG criteria, ARIA patterns, focus styles, reduced motion
- [ ] **design-principles/**: 60-30-10 rule, any project-specific principles tied to tokens
- [ ] **design-consistency/**: ESLint rules, Stylelint rules, review checklist, PR template
- [ ] **design-blueprint.md**: Read fully as authoritative source