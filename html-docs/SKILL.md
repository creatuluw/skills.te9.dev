---
name: html-docs
description: "Create richly interactive, self-contained HTML documents from user prompts. Use when the user wants: (1) exploration & planning docs (comparisons, design exploration, implementation plans), (2) code review & understanding (annotated PRs, architecture maps), (3) design references (design systems, component variants), (4) prototypes (animations, clickable flows), (5) diagrams & illustrations (Mermaid via pretty-mermaid → SVG, SVG figures, flowcharts), (6) slide decks, (7) research & learning (explainers, tutorials), (8) reports (status, incident post-mortems), (9) custom editing interfaces (triage boards, flag editors, prompt tuners). Trigger on keywords: make an HTML, create a page, render as HTML, build a document, or any prompt asking for a visual/interactive document. Also trigger when the user describes a document use case that would benefit from interactive HTML rather than static markdown."
---

# html-docs

Create self-contained `.html` documents from the 21 templates at [thariqs.github.io/html-effectiveness](https://thariqs.github.io/html-effectiveness/). Each template is a single file — no build step. Diagrams use [Pretty-Mermaid](https://github.com/imxv/Pretty-mermaid-skills) (Mermaid → themed SVG via Node.js); the final HTML has zero JS dependencies.

## Workflow

### 1. Classify the prompt

Read `references/CATEGORIES.md` to map the user prompt to one of 9 categories and 21 document types. If the prompt clearly matches, proceed. If ambiguous, ask the user.

### 2. Load the template

Read the corresponding template from `assets/templates/{filename}`. The template's HTML structure, CSS, and JS are the starting point.

### 3. Adapt the template

Replace placeholder content (titles, descriptions, data, examples) with the user's actual content. Preserve the original layout, interaction patterns, and visual design. Only deviate when the user's data demands it.

### 4. Add diagrams with Pretty-Mermaid

When the document calls for a diagram (flowchart, architecture layout, class relationships, network graph, database ERD, sequence flows):

1. **Write a `.mmd` file** using Mermaid syntax. Start from a template in `assets/diagrams/`.
2. **Render to SVG** via pretty-mermaid:
   ```bash
   cd .agents/skills/pretty-mermaid && node scripts/render.mjs \
     --input ../../html-docs/assets/diagrams/diagram.mmd \
     --output ../../html-docs/assets/diagrams/diagram.svg \
     --theme github-light
   ```
3. **Post-process the SVG** — pretty-mermaid's output has issues that must be fixed before embedding:
   - Strip `@import url(https://fonts.googleapis.com/...)` — replace with system font stack
   - Replace all `var(--*)` and `color-mix()` with explicit hex colors (they silently fail in inline SVGs)
   - Map theme colors to the document's design tokens (see Design Conventions below)
4. **Embed the SVG inline** in the HTML `<body>` — copy the `<svg>...</svg>` from the output file.

The boilerplate for every diagram:

```html
<div class="diagram-panel" id="diagram-1">
  <button class="fs-btn" title="Fullscreen" onclick="toggleFs('diagram-1')">
    <svg class="fs-icon-max" ...><!-- maximize icon --></svg>
    <svg class="fs-icon-min" ... style="display:none"><!-- minimize icon --></svg>
  </button>
  <button class="fs-btn reset-btn" title="Reset view" onclick="resetView('diagram-1')">
    <svg ...><!-- reset icon --></svg>
  </button>
  <div class="diagram-viewport">
    <svg><!-- post-processed SVG content --></svg>
  </div>
</div>
```

- **Zero JS dependencies** for diagrams — static SVG; pan/zoom/fullscreen is vanilla JS included in the document
- **Theme first, render once** — render with `github-light`, then post-process colors to match doc design tokens
- **Template `.mmd` files** in `assets/diagrams/` are the canonical starting points — copy and modify

Read `references/PRETTY-MERMAID.md` for theme reference, diagram type syntax, rendering options, and the SVG post-processing checklist.

### 5. Handle unrecognized use cases

If the prompt doesn't match any existing template type:
1. Read `references/NEW_TEMPLATE_GUIDE.md` for the process
2. Propose a template structure to the user (describe what sections/components you'd include)
3. Wait for approval before generating
4. After approval, save the new template to `assets/templates/` for future reuse

## Design Conventions

Follow these for all output documents:
- **Single self-contained `.html`** — all CSS in `<style>`, all JS at end of `<body>`
- **No external dependencies** — diagrams are rendered server-side to static SVG via pretty-mermaid; no npm, no CDN, no external fonts
- **Pretty-Mermaid for diagrams** — write Mermaid `.mmd` → render SVG → post-process (strip Google Fonts, replace `color-mix()`/`var()` with explicit hex) → embed inline. See `assets/diagrams/` for `.mmd` templates and `references/PRETTY-MERMAID.md`.
- **Diagram interactivity** — every `.diagram-viewport` gets vanilla JS pan (drag), zoom (scroll wheel), reset (double-click or ↺ button), and fullscreen (⛶ button)
- **Diagram background unification** — panel, viewport, and SVG must all use the same CSS variable for background (`var(--ivory)`) to avoid visible seams when zoomed out
- **Dark mode** — support via `prefers-color-scheme: dark` or a toggle button. Diagram colors should use CSS variables so they adapt automatically.
- **Export / Print** — every document must include a print button using `window.print()` with a `@media print` stylesheet that hides sidebar and toolbar buttons
- **Responsive** — works on mobile and desktop
- **System font stack** — `system-ui, -apple-system, sans-serif` (strip any Google Fonts `@import` from SVG output)
- **Semantic HTML** — `<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<aside>` as appropriate

## Template Index

The file `assets/templates/index.json` maps all 21 templates by category, slug, and filename. Use it for quick lookup.
