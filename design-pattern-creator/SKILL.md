---
name: design-pattern-creator
description: Creates and regenerates design-patterns.md files from a design system's source materials. Use when (1) creating a new design-patterns.md for a project's design system, (2) updating or regenerating an existing design-patterns.md after design source materials change, (3) reverse-engineering design findings, tokens, component patterns, and principles into a single consolidated context reference, or (4) the user asks to build, update, or generate the design patterns document. Triggers on mentions of design patterns, design system documentation, design token consolidation, or UI pattern cataloging.
---

# Design Pattern Creator

Generates a consolidated `design-patterns.md` — a single context-reference document that captures an entire design system's tokens, patterns, rules, and components so any LLM can produce consistent UI.

## Output

The deliverable is always a `design-patterns.md` file at the root of the design folder.

## Workflow

### 1. Discover Source Materials

Scan the project's `design/` folder (or equivalent) for all subfolders and files:

```
design/
  animation-and-motion/findings.md
  component-patterns/findings.md
  design-consistency/findings.md
  design-principles/findings.md
  design-systems/findings.md
  layout-and-spacing/findings.md
  responsive-and-accessible/findings.md
  typography-and-color/findings.md
  design-blueprint.md
  design-patterns.md       ← this is the OUTPUT
```

If source materials are organized differently, adapt — read every findings document, blueprint, and reference file available.

### 2. Analyze Each Source

Read every source file. For each, extract:

- **Tokens**: Exact values (colors as hex, spacing in px/rem, durations in ms, font sizes, etc.)
- **Patterns**: Reusable HTML/CSS/JS structures with their Tailwind classes
- **Rules**: Constraints, guardrails, and "always/never" statements
- **Principles**: Design philosophy and rationale behind decisions

### 3. Consolidate Into design-patterns.md

Follow the **Required Structure** below. Every section must be populated from the analyzed sources.

Cross-reference between sources to resolve conflicts (e.g., if `component-patterns/findings.md` says `rounded-xl` for cards but `design-blueprint.md` says `rounded-2xl`, note both and prefer the blueprint as authoritative).

### 4. Validate Completeness

After writing, verify every source finding is represented. Use the checklist:

- [ ] Every color token from findings appears in the Quick Reference
- [ ] Every component pattern has HTML + CSS + behavior notes
- [ ] Animation tokens include duration, easing, and delay values
- [ ] Responsive breakpoints are specified with mobile-first guidance
- [ ] Accessibility requirements reference WCAG criteria
- [ ] Consistency enforcement includes lint rules and review checklist

---

## Required Structure

The output `design-patterns.md` must contain these 10 sections in this order:

1. **Design Token System** — Token hierarchy (global/alias/component), Tailwind configuration with `@theme` block, CVA pattern for component variants
2. **Typography Scale** — Font families with weights, font loading, type scale definitions, heading hierarchy, body text patterns
3. **Color Palette** — Brand colors as hex, semantic color tokens, WCAG contrast ratios, 60-30-10 rule, dark mode support with CSS variables
4. **Spacing Scale** — Grid system (typically 8-point), complete spacing scale table, container constraints, responsive padding, layout utility classes, section spacing, component spacing reference
5. **Component Patterns** — Each pattern as a numbered sub-section with: description, HTML markup, CSS classes, JavaScript behavior. Include at minimum: navbar, hero, card, grid/filter, modal, timeline, tags, buttons, scroll reveals, progress bars, testimonial, contact form, footer, scrollbar, background texture
6. **Animation Tokens** — Duration tokens, easing tokens, delay tokens (stagger), keyframe definitions, animation patterns from source, performance rules
7. **Responsive Breakpoints** — Breakpoint table (prefix/min-width/device), mobile-first strategy explanation, responsive pattern examples
8. **Accessibility Requirements** — WCAG level, POUR principles, key success criteria table, semantic HTML requirements, ARIA patterns, focus management, `prefers-reduced-motion` support, color contrast requirements, form accessibility
9. **Consistency Enforcement** — Token guardrails, shared component library guidance, ESLint rules, Stylelint rules, visual regression testing, design review checklist, PR template embed
10. **Quick Reference** — Summary tables: colors (token/hex/usage), fonts (family/weights/usage), font sizes (context/responsive classes), border radii, shadows, z-index scale, spacing values (mobile/desktop), animation values, icon sizes

---

## Key Principles

### Authoritative Source Order

When sources conflict, prefer in this order:
1. `design-blueprint.md` (if it exists) — the canonical specification
2. `design-patterns.md` (existing version) — current system of record
3. `component-patterns/findings.md` — concrete implementations
4. Other `findings.md` files — research and recommendations

### Exact Values, Not Approximations

Every token must be an exact value from the source:
- Colors: hex codes (`#F5F5F5`), not descriptions ("light gray")
- Spacing: pixel or rem values (`24px`, `1.5rem`)
- Durations: milliseconds (`300ms`, `0.8s`)
- Easing: full cubic-bezier notation (`cubic-bezier(0.2, 0.8, 0.2, 1)`)

### Working Code, Not Pseudocode

All HTML patterns must be real markup with actual Tailwind classes. All CSS must be valid. All JavaScript must be functional. No placeholders or pseudocode.

### Mobile-First Responsive

All responsive patterns use mobile-first approach — base styles for mobile, `sm:` / `md:` / `lg:` prefixes for progressive enhancement.

### Tailwind v4 Convention

Use Tailwind v4 `@theme` directive syntax for design tokens, not the v3 `tailwind.config.js` format. Include CVA (class-variance-authority) for component variant patterns.

---

## Detailed References

For guidance on analyzing specific design domains, read these reference files:

- **[references/design-domain-guide.md](references/design-domain-guide.md)** — What to extract from each design subfolder, domain-specific extraction patterns, and conflict resolution strategies
- **[references/output-format-guide.md](references/output-format-guide.md)** — Exact formatting conventions for each section, markdown table structures, code block formatting, and the Quick Reference template