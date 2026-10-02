# te9.dev Skills

A collection of agent skills. Every skill is a folder with a `SKILL.md` (plus optional scripts/references). Install one, and its description enters your agent's system prompt — the agent then triggers it automatically on matching requests.

**LLMs: this README is a routing index.** Find the section matching the user's task, pick the skill whose *use when* matches, then read that skill's `SKILL.md` before acting. Where several skills overlap, the routing notes say which to prefer.

## Install a skill

Every skill in this repo is a folder with a `SKILL.md`. Three ways to install one (e.g. `dataset-to-planboard`):

```bash
# 1. skills CLI (auto-detects your agent: pi, Claude Code, Cursor, …)
npx skills add creatuluw/skills.te9.dev/dataset-to-planboard

# 2. plain git — copy the folder into your agent's skills directory
git clone --depth 1 https://github.com/creatuluw/skills.te9.dev
cp -r skills.te9.dev/dataset-to-planboard ~/.pi/agent/skills/   # pi
# cp -r skills.te9.dev/dataset-to-planboard ~/.claude/skills/   # Claude Code

# 3. single file — fetch SKILL.md raw and place it in a skill folder
curl -o SKILL.md https://raw.githubusercontent.com/creatuluw/skills.te9.dev/main/dataset-to-planboard/SKILL.md
```

After installing, restart the agent (or start a new session) — the skill's description appears in the system prompt and triggers automatically on matching requests. Scripts inside a skill folder are referenced by the skill itself; keep the folder structure intact.

---

## Skill index

### Research & web

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **te9-research** | Deep research on any question, multi-angle analysis, fact-checked cited answer | Fractal multi-agent research: question → angles → recursive sub-angles, parallel exploration, one synthesized report. Four strategies (recursive, socratic, perspective + blind-spots, web-grounded). |
| **web-research** | "Research X online", compare options, cited report | Multi-source web search via delegated subagents → cited research report. |
| **deep-research-v3** | Systematic multi-angle web methodology before writing content | Iterative search → gap analysis → synthesis. Use this one of the three deep-research versions; v1/v2 are kept as iterations. |
| **tinyfish** | Search the web or fetch a specific URL as clean LLM-ready markdown | TinyFish Search + Fetch API (real browser rendering). Use alongside native websearch for extra coverage. |
| **productsear.ch** | Finding libraries, packages, tools, or patterns for a build problem | Curated product search with purpose/category metadata — named products, not blog posts. |
| **youtube-transcript** | User gives a YouTube URL and wants the transcript/subtitles | Extracts the transcript, with or without timestamps. |

### Planning & specs (before code)

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **brainstorming** | Any creative/constructive work starts from a vague idea | Disciplined reasoning to turn the idea into a validated design before building. |
| **interview-me** | The ask is underspecified ("build me X", no who/why) | One-question-at-a-time interview until ~95% confidence on the real intent. |
| **new-prd-interview** | A PM/engineer wants to define a new capability/initiative | Structured stakeholder interview → PRD from which specs/tasks can be extracted. |
| **spec-writer** | A feature spec with requirements + acceptance criteria is the deliverable | Written feature specification. |
| **te9-spec** | Full spec-driven build: requirements → implementation → tests → deploy | Orchestrated 6-step workflow with TDD. |
| **identify-models** | The domain model (entities, states, invariants) is unclear — or needs an audit | Grills the problem until the correct model falls out, or audits an existing solution against the problem's true model; always writes a deliverable. |
| **ontology** | Skills/agents need shared typed memory (entities, links, constraints) | Typed knowledge graph with query/planning operations. |

### Code quality & workflows

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **karpathy** | Always-on behavioral guidance while writing/reviewing/refactoring code | Anti-overcomplication rules: surgical changes, surfaced assumptions, verifiable success criteria. |
| **tdd-workflow** | Building features or fixing bugs test-first | RED-GREEN-REFACTOR loop principles. |
| **e2e-testing-patterns** | Writing E2E tests or debugging flaky ones | Playwright/Cypress patterns for reliable suites. |
| **thermo-nuclear-code-review** | An extremely strict, harsh maintainability review is requested | Deep audit of abstraction quality, giant files, spaghetti conditions. |
| **smell** | Architecture bad smells / complexity hotspots / anti-patterns survey | Markdown report of violations across design, patterns, performance. |
| **dead-code-detector** | Finding unused code, imports, variables, functions | Safe-removal candidate list. |
| **codebase-graph** | "Map the codebase", who-calls-X, impact analysis | Typed symbol graph (files, symbols, imports/calls edges) as `graph.json`. |
| **endpoint-inspect** | Understanding or improving one API endpoint + its dependency chain | Architectural insights and recommendations for that endpoint. |
| **deepsec-vulnerability-scanner** | Security vulnerability scan of a large codebase | Agent-powered deepsec scanner workflow. |

### Frontend design & UI

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **modern-frontend-design** | Building a frontend that should look premium/high-end SaaS | Design + build guidance against generic AI layouts. |
| **hallmark** | Greenfield page, redesign, or design audit; anti-AI-slop by name | Design skill for building/auditing/redesigning pages, incl. extraction from URLs/screenshots. |
| **design-skills/** (19 skills) | A specific design verb: `impeccable` (build polished UI), `shape` (plan UX first), `critique`, `audit`, `polish`, `layout`, `typeset`, `animate`, `adapt` (responsive), `optimize` (perf), `distill`/`quieter` (simplify), `bolder`/`colorize`/`delight` (more impact), `clarify` (UX copy), `overdrive` (wow-factor) | One focused skill per design concern; `impeccable` is the entry point for building. |
| **taste-skills/** (7 skills) | A named aesthetic or enforcement: `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`, `design-taste-frontend`, `redesign-existing-projects`, `full-output-enforcement`, `stitch-design-taste` | Opinionated style packs with concrete rules (fonts, spacing, shadows, blocked defaults). |
| **variate** | User wants design variations/alternatives of one file to choose between | Renders real variations on localhost behind a card-flip picker. |

### HTML documents, diagrams & slides

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **html-docs** | An interactive self-contained HTML document is the deliverable (report, explainer, prototype, deck, diagram) | 20-template HTML document generator. |
| **effective-html/** (6 skills) | Single-file HTML artifacts: `html` (general), plus specialists `html-diagram`, `html-plan`, `html-prototype`, `html-wireframe`, `design-artifact` (visual direction) | Invocable directly or routed from the broad `html` skill. |
| **diagram-design** | Architecture/flowchart/sequence/ER/timeline diagrams | Standalone HTML with inline SVG, neutral editorial skin. |
| **blueprinter** | Diagrams in flat engineering-blueprint style | HTML/CSS blueprint look. |
| **slideops** | Slides/deck/presentation about a repo, feature, or architecture | HTML slide deck generation. |
| **slides-to-pdf** | Convert an HTML slide deck to PDF | Export any single-file HTML deck. |
| **app-tour-demo** | Interactive step-by-step demo of a web-app feature | Playwright DOM snapshots replayed with animated cursor, subtitles, checkmarks. |
| **hyperframes-cli** | Running/troubleshooting `npx hyperframes` (video compositions) | CLI dev loop: init, lint, preview, render, doctor. |

### 3D & procedural graphics (Three.js)

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **code-only-graphics** | Any described 2D/3D object built entirely from code, no assets | Single self-contained HTML: primitives, canvas textures, GLSL/TSL, instancing. |
| **img2threejs** | Reference image → 3D model (object or character) | Quality-gated, animation-ready procedural model from an image. |
| **three-js-advanced-1** | Detailed sculpted characters/miniatures from references (giant, humanoid) | TypeScript + Three.js sculpting workflow with PBR textures and a case study. |
| **three-js-extracted** | Highest-fidelity scenes from reference images | SDF implicit-field sculpting + marching cubes variant. Use when the advanced-1 result isn't enough. |

### Writing & prose

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **te9-writing** | Blog posts/tutorials/docs in Patrick's (te9) tutorial-first voice, de-slopped | Voice rewrite + deterministic slop linter. |
| **toepy-writing** | Any text in toepy's voice (email, chat, docs) | Older/broader voice skill: warm expert-enthusiast style guide. |
| **unslop** | Make AI-sounding text human: audit-only or two-pass rewrite | Detection + reconstruction flow with large pattern packs and evals. |

### Documentation

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **documentation-writing** | READMEs, API docs, guides, inline docs | Technical writing guidance. |
| **user-guide-writing** | End-user/admin-facing docs: onboarding, how-to, FAQ, help center | Task-completion docs for non-developers. |
| **llm-docs** | Codebase docs optimized for LLM consumption | git-ingest based `.llm-docs/` with routes, deps, progressive disclosure. |
| **simple-docs** | Document a process/flow/event step by step with file refs | Navigable node tree wrapped in a plain-language HTML doc. |
| **docling-document-intelligence** | Parse/convert/chunk a provided PDF, DOCX, PPTX, HTML, or image | Docling pipeline: markdown/JSON extraction, structure analysis, RAG chunking. |
| **pdf-extraction** | Quick text/tables/metadata from a PDF | pdfplumber extraction. |

### Learning & teaching

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **teach** | User wants to learn a skill/concept within this workspace | Interactive teaching flow. |
| **course-creator** | Design a full course/curriculum | Learning objectives + assessments. |
| **book-illustrator** | Children's book illustration guidance | Age-appropriate styles, color, character design. |

### Platforms & integrations

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **neo** | Any task needing the user's real logged-in browser (sign in, read, act, download) | BrowserOS neo over MCP with strict tab hygiene (open tab → close tab). |
| **pocketbase-best-practices** | Building/designing on PocketBase | Collection design, API rules, auth, realtime, deployment. |
| **pocketbase-e2e** | Full PocketBase lifecycle for studie.monster specifically | Setup, collections, migrations, auth, ops. |
| **formbricks-mgr** | Formbricks surveys: create/update, single-use links, exports | Senior Formbricks specialist workflow + API automation. |
| **dataset-to-planboard** | Any dataset (xlsx/csv/json) → plan.pippeloi.nl breakdown board | Reverse-engineers the dataset, builds import JSON, validates, uploads. |
| **railway-docs** | Questions about Railway or a docs.railway.com URL | Fetches current Railway docs before answering. |
| **mastering-typescript** | Enterprise TypeScript 5.9+ patterns | Type-system fundamentals through framework integration. |
| **svelte5-best-practices** | Writing/reviewing Svelte 5 + SvelteKit | Runes (`$state`, `$derived`, …), snippets, migration guidance. |
| **sveltekit-svelte5-tailwind-skill** | Building sites with SvelteKit 2 + Svelte 5 + Tailwind v4 together | Integration conventions for the trio. |
| **tailwindcss-layout** | Flex/grid layouts, positioning, z-index, container queries | Focused layout reference. |
| **opencode-go-integrator** | Adding LLM features via OpenCode Zen Go endpoints (GLM-5, Kimi K2, …) | Integration patterns for chat/completions/streaming. |
| **opencode-infinite-loop** | Run an agent autonomously on a spec until done | Unattended OpenCode loop setup. |
| **autoresearch** | Autonomous experiment loop for an optimization target | Set up + run experiments unattended. |
| **council-of-high-intelligence** | Complex problem needing multi-persona deliberation | Historical-thinker council debate. |

### Meta: skills about skills

| Skill | Route here when | What you get |
|-------|-----------------|--------------|
| **skill-creator** | Create or update a skill (canonical guide) | Effective skill structure and packaging. |
| **write-a-skill** | Create a new skill with bundled resources | Structure + progressive disclosure scaffolding. |
| **add-evals-to-skill** | Add an eval suite to an existing skill | `evals/` folder, runner, cases, SKILL.md section. |
| **find-skills** | "Is there a skill that can…?" | Discovery + install of matching skills. |
| **okf-open-knowledge-format** | Create/validate OKF knowledge bundles | The OKF spec itself. |
| **okf-wiki** | Build/maintain an OKF wiki for a project or codebase | Ready-made concept templates (tables, datasets, PK/FK docs) + validation scripts. |
| **design-pattern-creator** | Generate/update a project's `design-patterns.md` | Regenerates from design-system source materials. |

### Vendored collections (multiple skills inside)

| Path | What's inside |
|-------|---------------|
| **matt-pocock/** , **matt-pocock-skills/** | Matt Pocock's engineering/misc/productivity skills (tdd, diagnosing-bugs, code-review, grilling, …) — each collection has its own README and `skills/` tree; one may supersede the other. |
| **council-of-high-intelligence/** | Full repo of the council skill (agents, scripts, configs). |

---

## Choosing between overlapping skills

- **Research**: `te9-research` (deepest, multi-agent) → `web-research` (standard cited report) → `tinyfish` (single URLs / extra search coverage). `deep-research-v3` is the current iteration of the older `deep-research-v1/v2`.
- **Planning**: vague idea → `brainstorming`; underspecified ask → `interview-me`; defined initiative → `new-prd-interview`; deliverable spec → `spec-writer`; full build pipeline → `te9-spec`.
- **HTML deliverable**: interactive document → `html-docs`; general artifact → `effective-html/html`; slides → `slideops`; diagram → `diagram-design`.
- **3D**: described object from scratch → `code-only-graphics`; from a reference image → `img2threejs` / `three-js-extracted`; sculpted character → `three-js-advanced-1`.
- **Voice writing**: blog/tutorial in te9 voice → `te9-writing`; any text in toepy voice → `toepy-writing`; de-slopping existing AI text → `unslop`.
