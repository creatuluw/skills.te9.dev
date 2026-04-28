# Method: Skill Anatomy Design

## Purpose

Structure the skill's directory anatomy so knowledge is organized for efficient progressive disclosure and maximum worker effectiveness. The anatomy determines how a worker navigates the skill's knowledge at runtime — poor anatomy means the worker loads the wrong context, misses critical information, or wastes tokens on irrelevant detail.

## When to Use

- After completing domain discovery and before writing any skill content
- When restructuring an existing skill that has grown disorganized
- When a skill's SKILL.md exceeds 500 lines and needs decomposition
- When adding significant new knowledge areas to an existing skill
- When a worker skill consistently loads wrong or incomplete context

---

## The Full Anatomy Specification

Every worker skill must conform to this directory structure, defined in the project-level `skills-anatomy.md`:

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata (required)
│   │   ├── name: (required)
│   │   └── description: (required)
│   ├── Markdown index (required)                 - A file tree with shorthand instruction on how to navigate
│   └── Shorthand Method Chapters (required)      - One shorthand chapter per implementation method with its purpose, when to use, where to find
└── Bundled Resources (optional)
    ├── product/                                  - A high-level overview of the product we are working on
    ├── methods/                                  - All implementation methods and techniques with good and bad examples
    ├── design/                                   - What the global design patterns, principles and rules are
    ├── conventions/                              - All conventions we need to adhere to
    ├── scripts/                                  - Executable code that is used for logging, implementation and testing (Python/Bash/etc.)
    ├── sources/                                  - Sources relevant to our product, architecture and designs, like package docs or online resources, etc
    └── assets/                                   - Files used in output, implementing features or testing logic (templates, icons, fonts, etc.)
```

### Anatomy Component Details

#### SKILL.md (Required)

The single entry point for the skill. This is Tier 2 — the file that gets loaded when the worker activates the skill. It must contain:

1. **YAML Frontmatter** — Machine-readable metadata:
   - `name`: The skill's unique identifier (kebab-case)
   - `description`: A rich description explaining when to use the skill and what it produces

2. **Markdown Index** — A file tree showing the complete anatomy with one-line navigation instructions for each file. This tells the worker exactly where to find each piece of knowledge.

3. **Shorthand Method Chapters** — One section per major method, each containing:
   - Purpose statement (what this method achieves)
   - When-to-use trigger (specific conditions that activate this method)
   - Where-to-find reference (exact file path for the full method)
   - Shorthand workflow (compressed procedure — 4-8 steps max)
   - Critical rule (the one thing that must never be violated)

**Hard constraint:** The SKILL.md body (everything after frontmatter) must stay under 500 lines. This is a progressive disclosure requirement — detail belongs in Tier 3 files.

#### product/ (Optional)

High-level overview of what the skill produces. Use when:
- The skill builds a specific product (e.g., a web application, an API)
- There are product-level requirements that span all methods
- The worker needs to understand the end goal to make correct decisions

Contents typically include:
- `overview.md` — What the product is, who uses it, what it does
- `requirements.md` — Product-level requirements and acceptance criteria
- `architecture.md` — High-level system architecture if applicable
- `user-stories.md` — Key user stories that drive implementation decisions

#### methods/ (Optional but strongly recommended)

The core "how-to" knowledge of the skill. Every implementation method and technique the worker needs lives here. Each file must follow the method documentation template:

- `purpose` — What this method achieves
- `when-to-use` — Specific conditions that trigger this method
- `procedure` — Step-by-step instructions an agent can follow
- `good-example` — Correct application with explanation
- `bad-example` — Incorrect application with explanation of what went wrong
- `gotchas` — Non-obvious pitfalls
- `alternatives` — When this method isn't the best choice

Naming convention: Use kebab-case, descriptive names. Examples:
- `domain-discovery.md`
- `component-design.md`
- `error-handling.md`
- `database-migration.md`

#### design/ (Optional but strongly recommended)

Global design patterns, principles, and rules that govern all work in the domain. Unlike methods (which say "how"), design says "what must be true regardless of how." Contents:

- `principles.md` — Core domain principles with rule + rationale + consequence
- `patterns.md` — Reusable design patterns with problem/solution/consequences
- `rules.md` — Hard rules that must never be violated
- `mental-models.md` — How experts think about the domain
- `architecture.md` — Architectural decisions and their rationale

#### conventions/ (Optional)

All conventions the worker must follow. Every convention must include rationale — conventions without "why" get questioned and ignored. Contents:

- `naming.md` — Naming conventions for files, variables, components, etc.
- `structure.md` — Directory and file organization conventions
- `style.md` — Code style, formatting, and documentation style
- `process.md` — Workflow and process conventions
- `domain-specific.md` — Conventions unique to this domain

Each convention file must follow this structure:
1. The rule (what must be done)
2. The rationale (why it matters)
3. Correct application example
4. Violation example
5. How to verify compliance

#### scripts/ (Optional)

Executable code used for logging, implementation, and testing. All scripts must:
- Be self-contained and runnable from the skill root
- Include a header comment explaining purpose and usage
- Return meaningful exit codes (0 = success, non-zero = failure)
- Handle errors gracefully with clear messages

Common scripts:
- `validate.sh` or `validate.py` — Validate skill structure or output
- `setup.sh` — Initialize the skill's environment
- `test.sh` or `test.py` — Run skill-specific tests
- `analyze.py` — Analyze coverage, completeness, or quality

#### sources/ (Optional)

Reference materials the worker may need to consult. These are pointers to external documentation, not copies of it. Contents:

- `documentation.md` — Links and references to official docs
- `packages.md` — Key packages/libraries with version and usage notes
- `tutorials.md` — Curated learning resources
- `specifications.md` — Relevant standards or specifications

Each source entry must include:
- What the source covers
- When the worker should consult it
- The URL or reference path
- Any version-specific notes

#### assets/ (Optional)

Static files used in output, feature implementation, or testing. These are concrete resources the worker can use directly:

- Templates (skeleton files for common outputs)
- Configuration files (default configs, linting rules)
- Test fixtures (sample data, mock responses)
- Media files (icons, images, fonts — if relevant)
- Code snippets (reusable code blocks)

Assets should never contain logic or instructions — only data and templates.

---

## Knowledge-to-Directory Mapping Guide

The central design decision in anatomy design is mapping domain knowledge to the correct directory. Use this decision framework:

### Decision Tree

```
Is this knowledge about HOW to do something?
├── YES → Is it a specific procedure with steps?
│   ├── YES → methods/
│   └── NO → Is it a reusable solution structure?
│       ├── YES → design/patterns.md
│       └── NO → Is it a rule that governs decisions?
│           ├── YES → design/rules.md or design/principles.md
│           └── NO → conventions/
└── NO → Is it about WHAT the skill produces?
    ├── YES → product/
    └── NO → Is it a reference to external information?
        ├── YES → sources/
        └── NO → Is it a runnable tool?
            ├── YES → scripts/
            └── NO → Is it a static resource used in output?
                ├── YES → assets/
                └── NO → Re-examine the knowledge — does it belong in the skill at all?
```

### Detailed Mapping Rules

| Knowledge Type | Target Directory | File Naming | Example |
|---|---|---|---|
| Step-by-step procedures | `methods/` | `{procedure-name}.md` | `methods/database-migration.md` |
| Design principles | `design/` | `principles.md` (consolidate) | `design/principles.md` |
| Architectural patterns | `design/` | `patterns.md` or separate files | `design/mvc-pattern.md` |
| Mental models | `design/` | `mental-models.md` | `design/mental-models.md` |
| Naming rules | `conventions/` | `naming.md` | `conventions/naming.md` |
| Code style rules | `conventions/` | `style.md` | `conventions/style.md` |
| Product requirements | `product/` | `requirements.md` | `product/requirements.md` |
| Validation scripts | `scripts/` | `{action}.sh` or `{action}.py` | `scripts/validate.sh` |
| External documentation links | `sources/` | `documentation.md` | `sources/documentation.md` |
| Template files | `assets/` | `{template-name}.md` | `assets/component-template.md` |
| Test fixtures | `assets/` | `fixtures/{name}.json` | `assets/fixtures/sample-response.json` |

### When Knowledge Spans Multiple Directories

Some knowledge naturally spans categories. Handle these cases as follows:

**Principles that are also conventions:**
If a principle has become a domain convention (e.g., "REST APIs use nouns for endpoints"), document it in BOTH locations:
- `design/principles.md` — The full principle with rationale
- `conventions/style.md` — The convention rule with compliance check

Cross-reference: The convention file should say "See `design/principles.md#rest-naming` for the full rationale."

**Methods that embody patterns:**
If a method implements a design pattern (e.g., "implementing the repository pattern"):
- `methods/repository-implementation.md` — The step-by-step HOW
- `design/patterns.md` — The pattern definition, consequences, and when to use it

The method file should reference the pattern: "This method implements the Repository Pattern (see `design/patterns.md#repository`)."

**Product knowledge that affects methods:**
If the product has requirements that constrain methods:
- `product/requirements.md` — The requirement
- The method files — Reference the requirement and explain how to satisfy it

---

## How to Design the SKILL.md Navigation Index

The navigation index is the most critical piece of anatomy design. A well-designed index lets the worker find exactly the right knowledge in one hop. A poorly-designed index forces the worker to scan multiple files, wasting context and increasing error rates.

### Index Design Principles

1. **One line per file** — Each file gets exactly one line in the index with a brief "→" annotation explaining its purpose
2. **Purpose annotations are navigation aids** — They should answer "would I need this file for X task?" not "what does this file contain?"
3. **Order by usage frequency** — The most commonly needed files appear first within each directory
4. **Use tree structure** — Indentation shows hierarchy; directories are clearly separated

### Index Template

```markdown
## Navigation Index

```
{skill-name}/
├── SKILL.md                          ← You are here
│
├── methods/                          ← All implementation methods & techniques
│   ├── {most-common-method}.md       → Purpose: {what it achieves, when you'd need it}
│   ├── {second-most-common}.md       → Purpose: {what it achieves, when you'd need it}
│   └── {less-common-method}.md       → Purpose: {what it achieves, when you'd need it}
│
├── design/                           ← Design principles & architecture rules
│   ├── principles.md                 → Purpose: {core principles governing all work}
│   ├── patterns.md                   → Purpose: {reusable design patterns}
│   └── {specific-design}.md          → Purpose: {specific design concern}
│
├── conventions/                      ← Conventions to adhere to
│   ├── naming.md                     → Purpose: {naming rules for the domain}
│   ├── style.md                      → Purpose: {formatting and style rules}
│   └── {domain-specific}.md          → Purpose: {domain-specific conventions}
│
├── scripts/                          ← Executable tools
│   ├── {primary-script}              → Purpose: {what it does, when to run it}
│   └── {secondary-script}            → Purpose: {what it does, when to run it}
│
├── sources/                          ← Reference materials
│   └── {reference-file}.md           → Purpose: {what references, when to consult}
│
└── assets/                           ← Templates and resources
    ├── {template}.md                 → Purpose: {what it templates, when to use}
    └── {resource}                    → Purpose: {what it provides, when to use}
```
```

### Index Annotation Quality Criteria

Good annotations answer the worker's question: "Should I load this file for my current task?"

**Good annotations:**
```
├── api-design.md          → Purpose: Design REST/GraphQL APIs with correct endpoints, auth, and error handling
├── testing.md             → Purpose: Write tests for any component, including unit, integration, and e2e
├── error-handling.md      → Purpose: Implement error handling, recovery, and user-facing error messages
```

**Bad annotations:**
```
├── api-design.md          → Purpose: API design information
├── testing.md             → Purpose: Testing documentation
├── error-handling.md      → Purpose: Error handling stuff
```

The bad annotations force the worker to load the file to find out if it's relevant. The good annotations let the worker decide from the index alone.

---

## How to Write Shorthand Method Chapters

Shorthand chapters are the Tier 2 representation of each method — compressed summaries that give the worker enough information to decide whether to load the full method and a quick-reference procedure for common cases.

### Shorthand Chapter Structure

Every shorthand chapter must include these elements in this exact order:

```markdown
### Chapter {N}: {Method Name}

**Purpose:** {One sentence saying what this method achieves. Start with a verb.}

**When to use:** {Specific conditions that trigger this method. Use concrete signals, not abstractions.}

**Where to find full method:** `methods/{filename}.md`

**Shorthand workflow:**
1. **{Step name}** — {What to do, 5-15 words}
2. **{Step name}** — {What to do, 5-15 words}
3. **{Step name}** — {What to do, 5-15 words}
4. **{Step name}** — {What to do, 5-15 words}

**Critical rule:** {The one thing that must never be violated. Explain the consequence of violation.}
```

### Shorthand Writing Rules

1. **4-8 steps maximum** — If you need more than 8 steps, you're writing a full procedure, not a shorthand
2. **Bold step names** — Each step starts with a bold keyword that the worker can scan quickly
3. **Em-dash descriptions** — Step descriptions use em-dash (—) to separate the name from the detail
4. **No examples in shorthand** — Examples live in the Tier 3 file; shorthand is purely procedural
5. **One critical rule** — Every chapter has exactly one critical rule, not zero, not three
6. **Purpose is one sentence** — If you can't say it in one sentence, the method scope is too broad
7. **When-to-use is specific** — "When the user asks to create a new API endpoint" not "When working on APIs"

### Shorthand Compression Technique

To compress a full method into shorthand:

1. Read the full method's procedure section
2. Identify the 4-8 most essential steps (remove setup, validation, and edge-case steps)
3. Rewrite each step as a bold name + em-dash + one-line description
4. Extract the single most important rule as the critical rule
5. Verify: Can a worker who already knows the domain follow this? If yes, it's good shorthand.

### Ordering Shorthand Chapters

Order chapters by frequency of use during typical skill operation:

1. **Most-used methods first** — The methods the worker will need on almost every invocation
2. **Core workflow in sequence** — If methods form a natural workflow, present them in that order
3. **Foundational methods before advanced** — Methods that other methods depend on come first
4. **Cross-cutting concerns last** — Methods like testing, error handling, documentation that apply broadly

---

## Progressive Disclosure Rules

Progressive disclosure is the architectural principle that ensures the worker loads only the context it needs, when it needs it. The skill anatomy implements three tiers:

### Tier 1: Frontmatter Only
- **What:** YAML frontmatter (name + description)
- **When loaded:** Skill selection — the system reads this to decide if the skill matches the task
- **Size target:** 2-5 lines
- **Design rule:** Description must be rich enough for accurate skill selection without loading anything else

### Tier 2: SKILL.md Full Content
- **What:** The entire SKILL.md file (index + all shorthand chapters)
- **When loaded:** When the skill is activated for a task
- **Size target:** Under 500 lines
- **Design rule:** Must give the worker enough context to identify which Tier 3 files to load

### Tier 3: Referenced Files
- **What:** Individual files from methods/, design/, conventions/, etc.
- **When loaded:** On demand, when the worker determines it needs the specific knowledge
- **Size target:** No hard limit, but each file should address one coherent topic
- **Design rule:** Each file must be self-contained — readable without loading other Tier 3 files

### The 500-Line Rule

The SKILL.md body must stay under 500 lines. This is not arbitrary — it's a hard constraint based on context efficiency:

**Why 500 lines?**
- The worker needs room for the task context, user instructions, and conversation history
- Loading 500+ lines of skill content plus task context approaches practical limits
- Shorthand chapters provide enough detail for method selection; full detail is in Tier 3

**How to stay under 500 lines:**
1. One shorthand chapter = approximately 20-30 lines
2. 9 chapters × 25 lines = 225 lines for shorthand content
3. Navigation index = approximately 30-50 lines
4. Gotchas section = approximately 30-50 lines
5. Creation checklist = approximately 20-30 lines
6. Header + frontmatter + introduction = approximately 30 lines
7. Total: approximately 385-415 lines, leaving buffer for domain-specific additions

**When you exceed 500 lines:**
1. Remove any full procedures that have corresponding Tier 3 files
2. Compress shorthand workflows further (remove sub-steps, keep only essential)
3. Consolidate gotchas that say similar things
4. Move detailed examples out of shorthand (they belong in Tier 3)
5. If still over, consider splitting the skill into two focused skills

### File Reference Rules

1. **One level deep** — File references from SKILL.md point to `methods/{name}.md`, not `methods/subdir/{name}.md`
2. **No nesting** — Do not create subdirectories within anatomy directories unless absolutely necessary
3. **Explicit paths** — Always use the full relative path: `methods/domain-discovery.md`, not just `domain-discovery.md`
4. **Verify all references** — Every path in the navigation index must resolve to an actual file

---

## Template for Anatomy Design Decisions

Use this template when designing the anatomy for a new skill. Fill it in after domain discovery, before creating any files.

```markdown
# Anatomy Design: {Skill Name}

## 1. Skill Identity
- **Name:** {kebab-case name}
- **Description:** {2-3 sentence description rich in keywords for skill selection}
- **Primary domain:** {What domain does this skill operate in?}
- **Target user:** {Who will activate this skill? (e.g., developers, designers, data scientists)}

## 2. Knowledge Inventory

List every knowledge area discovered during domain discovery and its mapped location:

| Knowledge Area | Directory | File(s) | Rationale |
|---|---|---|---|
| {Area 1} | {dir}/ | {file1.md, file2.md} | {Why this location} |
| {Area 2} | {dir}/ | {file.md} | {Why this location} |

## 3. Directories Decision

Check which directories are included and explain why:

- [ ] `product/` — {Why included or why not needed}
- [ ] `methods/` — {Why included or why not needed}
- [ ] `design/` — {Why included or why not needed}
- [ ] `conventions/` — {Why included or why not needed}
- [ ] `scripts/` — {Why included or why not needed}
- [ ] `sources/` — {Why included or why not needed}
- [ ] `assets/` — {Why included or why not needed}

## 4. Method Files

List all methods files in priority order (most-used first):

1. `{filename}.md` — {Purpose, 10 words max} — Priority: {Critical/High/Medium}
2. `{filename}.md` — {Purpose, 10 words max} — Priority: {Critical/High/Medium}

## 5. Shorthand Chapter Order

List the order of shorthand chapters in SKILL.md:

1. Chapter 1: {Name} — {Why first}
2. Chapter 2: {Name} — {Why second}
...
N. Chapter N: {Name} — {Why last}

## 6. SKILL.md Line Budget

| Section | Estimated Lines | Notes |
|---|---|---|
| Frontmatter | ~5 | name + description |
| Introduction + When to Use | ~15 | Brief orientation |
| Navigation Index | ~{N} | Based on file count |
| Shorthand Chapter 1 | ~25 | {Name} |
| Shorthand Chapter 2 | ~25 | {Name} |
| ... | ... | ... |
| Shorthand Chapter N | ~25 | {Name} |
| Gotchas | ~{N} | Based on gotcha count |
| Checklist | ~15 | Standard checklist |
| **Total** | **~{N}** | **Must be under 500** |

## 7. Cross-Reference Map

Note any knowledge that appears in multiple locations:

| Knowledge | Primary Location | Referenced From | Cross-Ref Type |
|---|---|---|---|
| {Knowledge 1} | {file} | {files that reference it} | {See also / Implements / Constrained by} |

## 8. Design Decisions

Document any non-obvious anatomy decisions:

- **Decision:** {What you decided}
  - **Rationale:** {Why}
  - **Alternative considered:** {What else you considered}
  - **Trade-off:** {What you gained/lost}
```

---

## Good and Bad Examples of Anatomy Design

### Good Example: React Component Library Skill

```
react-component-lib/
├── SKILL.md                          ← You are here
│
├── methods/                          ← All implementation methods & techniques
│   ├── component-creation.md         → Purpose: Create new components with correct structure, props, and state
│   ├── hook-creation.md              → Purpose: Build custom hooks with proper dependency management and cleanup
│   ├── styling.md                    → Purpose: Apply styles using CSS modules, styled-components, or Tailwind
│   ├── testing.md                    → Purpose: Write unit tests, integration tests, and snapshot tests
│   ├── storybook-setup.md            → Purpose: Create Storybook stories for component documentation
│   ├── accessibility.md              → Purpose: Implement ARIA attributes, keyboard nav, and screen reader support
│   └── performance.md                → Purpose: Optimize rendering, memoization, and bundle size
│
├── design/                           ← Design principles & architecture rules
│   ├── principles.md                 → Purpose: Core component design principles (composition, single responsibility, etc.)
│   ├── patterns.md                   → Purpose: Compound components, render props, HOCs, and other React patterns
│   └── architecture.md               → Purpose: Library structure, barrel exports, and dependency rules
│
├── conventions/                      ← Conventions to adhere to
│   ├── naming.md                     → Purpose: Component, hook, prop, and file naming conventions
│   ├── structure.md                  → Purpose: Directory and file organization within the library
│   ├── typescript.md                 → Purpose: TypeScript usage rules, generic patterns, and type organization
│   └── documentation.md              → Purpose: JSDoc, README, and changelog conventions
│
├── scripts/                          ← Executable tools
│   ├── validate.sh                   → Purpose: Validate component structure, naming, and exports
│   ├── generate-component.py         → Purpose: Scaffold a new component with all required files
│   └── check-bundle.py               → Purpose: Analyze bundle size impact of changes
│
├── sources/                          ← Reference materials
│   ├── react-docs.md                 → Purpose: Key React API references and version-specific notes
│   └── testing-libs.md               → Purpose: Testing library documentation and best practices
│
└── assets/                           ← Templates and resources
    ├── component-template.tsx        → Purpose: Starter template for new components
    ├── test-template.test.tsx        → Purpose: Starter template for component tests
    └── story-template.stories.tsx    → Purpose: Starter template for Storybook stories
```

**Why this is good:**
- Every file has a purpose annotation that tells the worker when it's needed
- Methods are ordered by frequency (component creation is most common)
- Directories are complete but not bloated — each has a clear purpose
- Cross-cutting concerns (testing, accessibility, performance) are separate methods
- Templates in assets/ align with the methods (creation, testing, storybook)
- A worker looking at this index can immediately find the right file for any React component task

### Good Example: Minimal API Development Skill

```
api-development/
├── SKILL.md                          ← You are here
│
├── methods/                          ← All implementation methods & techniques
│   ├── endpoint-design.md            → Purpose: Design REST endpoints with correct HTTP methods, paths, and status codes
│   ├── data-validation.md            → Purpose: Implement request/response validation with schema definitions
│   ├── authentication.md             → Purpose: Implement auth middleware, token management, and permission checks
│   ├── error-handling.md             → Purpose: Structure error responses and implement error recovery
│   └── database-operations.md        → Purpose: Design queries, transactions, and data access patterns
│
├── design/
│   └── principles.md                 → Purpose: API design principles (statelessness, idempotency, HATEOAS)
│
└── conventions/
    └── naming.md                     → Purpose: Endpoint naming, field naming, and response structure conventions
```

**Why this is good:**
- Only includes directories that are needed — no empty ceremony directories
- Methods cover the essential API development workflow
- Design and conventions are consolidated into single files (the domain doesn't need more)
- The index would be short and scannable
- Nothing is missing that would block a worker from building an API

### Bad Example: Bloated Monolithic Skill

```
everything-web/
├── SKILL.md (1,200 lines)
│   ├── ...full procedures for every method inlined...
│   ├── ...complete design patterns listed here...
│   └── ...all conventions documented in full...
│
├── methods/
│   ├── frontend.md (3,000 lines covering React, Vue, Angular, Svelte)
│   ├── backend.md (4,500 lines covering Node, Python, Go, Rust)
│   └── devops.md (2,000 lines covering Docker, K8s, CI/CD, AWS)
│
└── (no other directories)
```

**Why this is bad:**
- SKILL.md is 1,200 lines — violates the 500-line progressive disclosure rule
- Methods are massive monolithic files — a worker loading "frontend.md" gets 3,000 lines about 4 frameworks when it only needs one
- No design/ directory means principles are mixed into methods
- No conventions/ directory means the worker doesn't know what rules to follow
- No assets/ means no templates — the worker must construct everything from prose
- The worker can't efficiently find relevant knowledge — everything is in giant files

### Bad Example: Over-Fragmented Skill

```
react-dev/
├── SKILL.md
├── methods/
│   ├── create-functional-component.md
│   ├── create-class-component.md
│   ├── use-state-hook.md
│   ├── use-effect-hook.md
│   ├── use-context-hook.md
│   ├── use-reducer-hook.md
│   ├── use-memo-hook.md
│   ├── use-callback-hook.md
│   ├── use-ref-hook.md
│   ├── basic-styling.md
│   ├── css-modules-styling.md
│   ├── styled-components-styling.md
│   ├── tailwind-styling.md
│   ├── unit-testing.md
│   ├── integration-testing.md
│   ├── e2e-testing.md
│   ├── snapshot-testing.md
│   ├── accessibility-testing.md
│   └── (35 more files...)
├── design/
│   ├── principle-1.md
│   ├── principle-2.md
│   ├── principle-3.md
│   └── (12 more principle files...)
└── conventions/
    ├── component-naming.md
    ├── file-naming.md
    ├── directory-naming.md
    ├── variable-naming.md
    ├── function-naming.md
    └── (8 more naming files...)
```

**Why this is bad:**
- 35+ method files make the navigation index overwhelming and hard to scan
- Each hook in its own file is too granular — combine related hooks into "hooks-state.md", "hooks-effects.md", etc.
- Each styling approach in its own file creates decision paralysis — combine into "styling.md" with sections
- One principle per file forces the worker to load multiple files for a complete mental model
- Naming conventions split across files makes it impossible to see the full naming system at once
- The worker spends more time navigating than working

### Bad Example: Inconsistent Organization

```
my-skill/
├── SKILL.md
├── methods/
│   ├── how-to-build-components.md       ← Bad: verbose "how-to" prefix
│   ├── testing_guide.md                 ← Bad: underscore instead of kebab-case
│   ├── ComponentDesign.md               ← Bad: PascalCase
│   └── api.md                           ← Bad: ambiguous — is this design or implementation?
├── design/
│   ├── patterns_and_principles.md       ← Bad: combined file for two distinct knowledge types
│   └── stuff.md                         ← Bad: meaningless file name
├── src/                                 ← Bad: not a valid anatomy directory
│   └── helpers.ts
└── docs/                                ← Bad: not a valid anatomy directory — should be sources/
    └── readme.md
```

**Why this is bad:**
- Inconsistent naming conventions (how-to, underscore, PascalCase, kebab-case)
- Ambiguous file names that don't tell the worker what's inside
- Invalid directories (`src/`, `docs/`) that violate the anatomy specification
- Combined files that should be separate (patterns + principles)
- Meaningless file names (`stuff.md`) that provide zero navigation value
- A worker seeing this index has no reliable way to find what it needs

---

## Anatomy Design Validation Checklist

Before finalizing any anatomy design, verify:

- [ ] **Specification compliance** — Every directory is one of the valid anatomy directories
- [ ] **SKILL.md under 500 lines** — Count the estimated lines; if over, compress further
- [ ] **Every file has a purpose annotation** — No file appears in the index without a "→ Purpose:" line
- [ ] **Purpose annotations are task-oriented** — They answer "when would I need this?" not "what's in here?"
- [ ] **Methods are ordered by frequency** — The most-used methods appear first
- [ ] **No monolithic files** — No single file exceeds ~500 lines of content
- [ ] **No over-fragmentation** — Related knowledge is grouped, not split into tiny files
- [ ] **Naming is consistent** — All files use kebab-case, descriptive names
- [ ] **Cross-references are documented** — Knowledge appearing in multiple places is noted
- [ ] **All paths are one level deep** — No nested subdirectories within anatomy directories
- [ ] **The knowledge inventory is complete** — Every knowledge area from discovery has a home
- [ ] **No orphan knowledge** — Every file is referenced from the navigation index
- [ ] **Shorthand chapters cover all methods** — Every methods/ file has a corresponding shorthand chapter
- [ ] **Critical rules are present** — Every shorthand chapter has exactly one critical rule
- [ ] **File references are valid** — Every path in the index would resolve to an actual file

---

## Common Anatomy Design Mistakes

1. **Putting full procedures in SKILL.md** — Shorthand chapters should be compressed summaries, not complete methods. If a worker can follow the shorthand without loading the full file, the shorthand is too detailed.

2. **Creating directories you don't need** — An empty directory adds clutter and confusion. Only create directories where you have actual content to put in them.

3. **Mixing concerns in single files** — A file called `frontend.md` that covers React, Vue, testing, styling, and deployment is a sign you need to split into focused files.

4. **Organizing by technology instead of task** — Workers think in terms of tasks ("how do I add authentication?"), not technologies ("what does the auth library documentation say?"). Organize around what the worker is trying to accomplish.

5. **Forgetting the worker's perspective** — Design anatomy for the agent that will navigate it, not for the human that authored it. The worker doesn't have your memorized context — it relies entirely on the index annotations and file names.

6. **Ignoring the 500-line rule** — This isn't a suggestion. A SKILL.md over 500 lines degrades worker performance because the worker has less context available for the actual task. Every line in SKILL.md is a line not available for the worker's reasoning.

7. **No cross-references** — When knowledge spans files, the worker needs explicit pointers. Without "See also `design/principles.md#composition`", the worker may not know related knowledge exists.

8. **Ambiguous file names** — `utils.md`, `helpers.md`, `misc.md`, `general.md` — these names tell the worker nothing about when to load the file. Every file name should be a clear signal of its contents.