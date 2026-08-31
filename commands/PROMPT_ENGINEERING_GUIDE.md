# The Definitive Prompt Engineering Guide for AI/LLM Agents

A comprehensive reference synthesizing best practices from Anthropic (Claude), OpenAI (GPT), and industry research. Every principle includes **purpose**, **relevancy to end results**, **how to implement it**, and **examples across 4 domains**: webapp development (TypeScript + SvelteKit), image prompting, skill creation, and web research.

---

## Table of Contents

1.  [Lead with Clear Instructions & Use Delimiters](#1-lead-with-clear-instructions--use-delimiters)
2.  [Be Specific; Eliminate Fluff](#2-be-specific-eliminate-fluff)
3.  [Assign a Persona / Role](#3-assign-a-persona--role)
4.  [Provide Relevant Examples (Few-Shot)](#4-provide-relevant-examples-few-shot)
5.  [Specify the Desired Output Format](#5-specify-the-desired-output-format)
6.  [Supply Context & Data Strategically](#6-supply-context--data-strategically)
7.  [Use Chain-of-Thought & Structured Reasoning](#7-use-chain-of-thought--structured-reasoning)
8.  [Say What TO Do, Not What NOT to Do](#8-say-what-to-do-not-what-not-to-do)
9.  [Ask for Evidence, Citations & Self-Correction](#9-ask-for-evidence-citations--self-correction)
10. [Iterate: Prompt → Review → Refine](#10-iterate-prompt--review--refine)
11. [Optimize for Tool Use & Agentic Workflows](#11-optimize-for-tool-use--agentic-workflows)
12. [Model Parameters & Configuration](#12-model-parameters--configuration)
13. [Design Subagent Architectures (Orchestrator-Executor Pattern)](#13-design-subagent-architectures-orchestrator-executor-pattern)

---

## 1. Lead with Clear Instructions & Use Delimiters

### Purpose
AI models parse linearly: the first words in a prompt establish framing and intent. Placing instructions at the start ensures the model understands *what to do* before processing any data. Delimiters (XML tags, triple backticks, `"""`, `###`) then cleanly separate the instruction from the content, eliminating ambiguity.

### Relevancy to End Results
- **Without this** → the model may treat data as part of the instruction or vice versa, leading to tasks being applied to the wrong content or missed entirely.
- **With this** → deterministic, repeatable behavior. The model reliably distinguishes "what to do" from "what to work on."

### How to Include It Best
1.  Open with a single imperative sentence stating the core task.
2.  Follow with delimited context/input using consistent markers.
3.  For complex prompts, nest delimiters: `<task>...</task>`, `<context>...</context>`, `<input>...</input>`.

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Build a SvelteKit login form with email/password fields, client-side validation, and a form action.

<spec>
- Fields: email (required, email format), password (required, min 8 chars)
- Show inline validation errors on blur using $page.form
- On submit, POST to /api/auth/login via SvelteKit form action
- Disable button while submitting, show a loading spinner
- Use use:enhance for progressive enhancement
</spec>
```

```markdown
Create a SvelteKit load function that fetches paginated data with error handling.

```ts
// Write the load function here
```

Requirements:
- Accept page param and URL search params for pagination
- Fetch from /api/items?page={page}&limit={limit}
- Return { items, page, totalPages, total }
- Handle fetch errors with error() helper
- Type the return type with a custom interface
```

**Image Prompting**

```markdown
Generate a photorealistic product shot of a minimalist ceramic coffee mug.

<style>soft studio lighting, warm earth-tone background, shallow depth of field, 8K product photography</style>

<composition>centered, slight three-quarter angle, clean surfaces, no shadows visible below the base</composition>
```

```markdown
Create an isometric pixel-art scene of a small Japanese ramen shop at night.

<colors>warm amber lanterns, indigo sky, warm glow from windows</colors>

<details>neon sign reading "RAMEN", steam rising from bowls, cherry blossom branch in corner</details>
```

**Skill Creation**

```markdown
Create an opencode skill that helps users debug Node.js memory leaks.

<role>system performance expert specializing in Node.js runtime analysis</role>

<capabilities>
- Analyze heap snapshots
- Identify common leak patterns (closures, listeners, globals)
- Suggest targeted fixes
</capabilities>
```

```markdown
Write a VS Code extension that formats markdown tables on save.

<behavior>
- Detect markdown files on save
- Align all table columns by padding cell content
- Do NOT modify non-table content
</behavior>
```

**Web Research**

```markdown
Research the current state of WebGPU adoption in production web applications.

<question>Which major websites are using WebGPU in production, and what specific use cases (rendering, compute, ML inference) are they targeting?</question>

<constraints>
- Prioritize sources from 2025–2026
- Include adoption blockers if mentioned
- Cite specific company/product names
</constraints>
```

```markdown
Compare the pricing models of Vercel, Netlify, and Cloudflare Pages for a Next.js app expected to get 500k monthly visits.

<parameters>
- 500k monthly visits
- 10GB bandwidth
- 3 edge functions per request
- ISR with on-demand revalidation
</parameters>
```

---

## 2. Be Specific; Eliminate Fluff

### Purpose
Vague language forces the model to guess your intent. Specific, concrete instructions — with measurable constraints — remove ambiguity. Imprecise descriptions (e.g., "fairly short," "a few sentences, not too much more") waste tokens and produce inconsistent results.

### Relevancy to End Results
- **Vague** → generic, off-target output that needs multiple rounds of correction.
- **Specific** → first-try output that matches your requirements, saving iterations.

### How to Include It Best
- Use **numbers** (word count, line count, number of items, exact dimensions).
- Specify **tone**, **audience**, **format**, and **constraints** as explicit values.
- Replace qualitative terms ("easy", "modern", "fast") with measurable criteria.
- Provide **negative constraints** only when necessary: "Do NOT use external dependencies" is better stated as "Use only vanilla JavaScript and the Fetch API."

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Build a responsive SvelteKit header component with:
- Logo slot on the left, 4 nav links via $$slots, CTA button on the right
- Hamburger menu toggled at 768px breakpoint using a media query store
- Sticky positioning with scrolled state tracked via a Svelte action
- Colors: bg var(--color-bg) → var(--color-bg-scrolled) on scroll, text var(--color-text)
- No external CSS frameworks — use CSS custom properties and Svelte scoped styles only
```

```markdown
Write a SvelteKit server-side hook (handle) that rate-limits API routes:
- Allows 100 requests per IP per 15-minute sliding window
- Returns 429 with Retry-After header when exceeded
- Stores state in a Map<string, { count, resetTime }>
- Uses event.platform?.env for production storage (Cloudflare KV / Node memory fallback)
- Exported as: export const handle = rateLimiter({ max: 100, windowMs: 900_000 })
```

**Image Prompting**

```markdown
A steampunk owl with brass gears visible through its chest, perched on an oak branch against a full moon. Engraved copper feather textures, rivet details, warm amber bioluminescent eyes. Volumetric fog at the base. 16:9 ratio, cinematic lighting, photorealistic render, octane style.
```

```markdown
An ethereal fantasy landscape: floating crystal islands connected by glowing vines, waterfalls cascading into misty voids below. Pastel gradient sky (lavender to coral), bioluminescent flora in cool blue/pink tones, tiny winged silhouettes in the distance. Wide-angle composition, atmospheric perspective, hyperdetailed digital painting.
```

**Skill Creation**

```markdown
Build an opencode skill for PostgreSQL query optimization. It must:
1. Accept a raw SQL query as input
2. Check for missing indexes using pg_catalog
3. Flag SELECT * on wide tables
4. Suggest WHERE clause order optimizations
5. Output a structured report: {query, issues: Array<{severity, line, suggestion}>, estimated_impact}
6. Max response time: under 3 seconds per query
```

```markdown
Create a GitHub Actions skill that:
- Triggers on pull_request (opened, synchronize, reopened)
- Runs eslint with the project's config
- Posts results as a PR comment using github-script
- Fails the check only if there are >10 errors or any error of severity "error"
- Caches node_modules between runs
```

**Web Research**

```markdown
Find 5 real-world case studies of companies that migrated from PostgreSQL to CockroachDB between 2023 and 2026. For each, list:
- Company name and size (revenue or employee count)
- Migration reason (specific pain point)
- Did they achieve <50ms p99 latency after migration?
- What was the biggest unexpected cost?
- Source URL
```

```markdown
Research the carbon footprint of streaming 1 hour of 4K video vs playing 1 hour of a AAA game on a high-end PC. Find peer-reviewed numbers or reputable industry reports published 2023 or later. Report results as CO2e in grams, with measurement methodology noted. If Gaming PC numbers vary by title, average across 3 top-selling games.
```

---

## 3. Assign a Persona / Role

### Purpose
Setting a role focuses the model's tone, vocabulary, depth, and frame of reference. A role acts as an implicit set of constraints and priorities that align the output with a specific expertise or perspective.

### Relevancy to End Results
- **No role** → generic, "assistant-like" responses that may lack depth or the right framing.
- **With role** → responses adopt domain-appropriate terminology, depth, and reasoning patterns. Improves accuracy for technical domains by 20–40% in practice.

### How to Include It Best
- Use `<role>...</role>` or a system-level `You are a...` statement.
- Include **who** they are, **who the audience is**, and **what constraints their role imposes**.
- For sustained conversations, establish the role in the first message — it persists.
- Add role-appropriate limitations: "You are a senior DevOps engineer. Prioritize security and reproducibility over developer convenience."

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
You are a senior SvelteKit architect reviewing a +page.server.ts load function. The audience is a junior developer. Evaluate for: excessive waterfall fetches, missing error boundaries, incorrect cache headers, and improper use of locals vs cookies. Cite specific lines. Suggest concrete SvelteKit patterns (use load functions properly, leverage streaming with await parent()).
```

```markdown
You are a security engineer auditing a SvelteKit project that handles PII under GDPR. Flag every instance of: missing CSRF protection on form actions, data leakage through shared page stores, improper use of event.cookies (missing httpOnly/secure flags), and sensitive data in $page.data that shouldn't be serialized to the client. Classify each finding as CRITICAL / HIGH / MEDIUM / LOW.
```

**Image Prompting**

```markdown
You are a world-class cinematographer and art director. Describe a movie scene establishing shot for a noir thriller set in a neon-lit 2090s Tokyo. Include camera lens choice, lighting setup, color grading reference, and blocking. Use industry terminology (anamorphic, practicals, motivated lighting, LUT).
```

```markdown
You are a children's book illustrator specializing in watercolor. Design a friendly dragon character for a bedtime story. The dragon should feel warm and approachable — round shapes, soft pastel scales (mint green with peach underbelly), large expressive eyes. No sharp teeth or spikes. Show 3 poses: flying, sleeping, waving.
```

**Skill Creation**

```markdown
You are a senior opencode skill developer. Create a skill that converts natural language feature requests into structured PRD documents. Follow these domain conventions:
- Use markdown with ## headings for each PRD section
- Every requirement gets a unique ID like REQ-001
- Include a RACI matrix
- Append an open questions section
```

```markdown
You are a Svelte 5 performance expert. Write a skill that scans a Svelte codebase for common reactivity anti-patterns: unnecessary $state() usage, missing untrack() wrappers, over-use of $effect() where derived is better. Output findings grouped by file, with before/after code snippets for each fix.
```

**Web Research**

```markdown
You are a venture capital analyst researching the Web3 infrastructure space. Evaluate 3 projects (EigenLayer, Celestia, Arbitrum Orbit) on: total value secured, developer ecosystem health (monthly active devs, GitHub stars), revenue model viability, and centralization risks. Use a scorecard format (1-10 per dimension). Cite specific on-chain data where possible.
```

```markdown
You are a staff software engineer at a FAANG company evaluating build tools. Compare Turbopack, Vite, and Bun for a monorepo with 200+ packages. Assessment criteria: cold start time, HMR latency for a 1000-module app, plugin ecosystem maturity, and production build output size. Your team values DX and debuggability above raw speed.
```

---

## 4. Provide Relevant Examples (Few-Shot)

### Purpose
Examples (a.k.a. few-shot prompting) are the most reliable way to steer output format, tone, structure, and reasoning pattern. A model shown 2–5 well-crafted examples generalizes the pattern to new inputs far more accurately than any instruction can.

### Relevancy to End Results
- **Without examples** → the model must infer the pattern, often getting format or edge cases wrong.
- **With examples** → near-deterministic output for well-scoped tasks. Reduces format errors by 50–80%.

### How to Include It Best
- Wrap examples in `<example>` tags (or `<examples>` for multiple).
- Make examples **diverse** — cover edge cases, not just the happy path.
- Make examples **relevant** — mirror the actual distribution of inputs.
- Use `##` or `---` separators between input/output pairs.
- For reasoning tasks, include the *thinking* inside the example: `<example><thinking>...</thinking><output>...</output></example>`.

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Given a user story, generate the SvelteKit route structure + page load function signature:

<example>
User story: As a user, I want to view my profile page with my recent orders.
Route: /profile (src/routes/profile/+page.svelte + +page.server.ts)
Load function params: { locals: { user: { id: string } }, url, fetch }
Data returned: { user: UserProfile, recentOrders: Order[] }
Error handling: If user not authenticated, redirect to /login with 303
</example>

<example>
User story: As an admin, I want to delete a user account from the admin panel.
Route: /admin/users/[id] (src/routes/admin/users/[id]/+page.server.ts)
Form action: DELETE with action name "delete"
Request validation: confirm = string (must equal "DELETE")
Response: redirect to /admin/users with success flash message
Error handling: If user doesn't exist, throw error(404, "User not found")
Auth: Check locals.user.role === "admin", else throw redirect(303, "/login")
</example>

Now generate for: "As a team member, I want to edit a task's due date inline on the task detail page."
```

```markdown
Convert these component specifications to Svelte 5 runes syntax following the pattern below.

<example>
Spec: A dropdown that shows 10 items, supports filtering, and dispatches a select event.
Component:
```svelte
<script lang="ts">
  let { items, onselect }: { items: string[]; onselect: (v: string) => void } = $props();
  let filter = $state("");
  let filtered = $derived(items.filter(i => i.includes(filter)));
</script>
```
</example>

<example>
Spec: A modal that shows a loading skeleton while data fetches, then renders children.
Component:
```svelte
<script lang="ts">
  let { open, loading, children }: { open: boolean; loading: boolean; children: import("svelte").Snippet } = $props();
</script>
```
</example>

Now convert: "A resizable textarea that auto-saves its contents to localStorage after 500ms of inactivity."
```

**Image Prompting**

```markdown
I will give you a mood keyword. Generate a Midjourney prompt following this pattern:

<example>
Keyword: "melancholy"
Prompt: A solitary figure in a rain-drenched city street at dusk, reflective wet pavement mirroring distant neon signs, muted indigo and steel-gray palette, soft watercolor bleed on cold-press paper, loose gestural brushwork, emotional atmosphere over detail --ar 16:9 --s 750 --v 6
</example>

<example>
Keyword: "triumph"
Prompt: A lone climber reaching a mountain summit at golden hour, arms raised against a blazing sunburst piercing through clouds, dramatic chiaroscuro lighting, gritty textured oil painting on canvas, impasto technique with visible palette knife strokes, heroic composition --ar 4:3 --s 1000 --v 6
</example>

Now: Keyword: "serenity"
```

```markdown
Given a character concept, generate a consistent character sheet prompt:

<example>Character concept: A robot gardener in a post-apocalyptic world
Sheet prompt: Robot gardener character design, four views (front, side, back, 3/4), rusted bronze chassis with overgrown moss and flowering vines, one eye glowing warm amber, one eye dark, gardening tools repurposed as limbs, clean lineart on white background, concept art turnaround sheet, grid layout, uniform lighting --ar 3:2 --v 6</example>

Now: Character concept: "A time-traveling librarian from the year 4000"
```

**Skill Creation**

```markdown
You are generating opencode skills from user requests. Follow this exact structure:

<example>
Request: "Create a skill that checks TypeScript files for unused exports"
Output:
name: check-unused-exports
description: Scans TypeScript files for exported symbols that are never imported elsewhere in the project
prompt: |
  You are a code quality tool. Analyze the project's TypeScript files and identify all exported functions, types, and interfaces that have zero import references across the codebase. Exclude index.ts barrel files. For each finding, provide the file path, export name, and a confidence score (high/medium/low). Output as a JSON array.
</example>

<example>
Request: "Create a skill that explains git commands in plain English"
Output:
name: git-explain
description: Translates git commands into plain-English explanations of what they do to the repository
prompt: |
  You are a git tutor for junior developers. Given a git command, explain: (1) what each flag means, (2) what happens to the working tree, index, and HEAD, (3) a real-world scenario where this command is useful. Use analogies. Keep explanations under 3 sentences per point.
</example>

Now: Request: "Create a skill that reviews Dockerfiles for best practices"
```

```markdown
Translate these user intents into skill configuration JSON:

<example>
Intent: "I want the AI to check my Python code follows PEP8"
Skill config:
{
  "name": "pep8-linter",
  "version": "1.0.0",
  "triggers": ["*.py"],
  "prompt": "Review the provided Python code for PEP8 violations. Check: indentation (4 spaces), line length (<79 chars), naming conventions (snake_case for functions/vars, PascalCase for classes), imports order (stdlib, third-party, local). Output each violation as: LINE:{n} {rule-code}: {description}",
  "output_format": "text"
}
</example>

<example>
Intent: "I want a skill that generates unit test stubs for Go functions"
Skill config:
{
  "name": "go-test-stubber",
  "version": "1.0.0",
  "triggers": ["*_test.go"],
  "prompt": "Given a Go function signature, generate a table-driven test stub using testing.T and subtests. Include: test name, input struct, expected output, and a mock setup comment. Use the standard library only — no testify or third-party test frameworks.",
  "output_format": "code"
}
</example>

Now: Intent: "I want a skill that summarizes PR descriptions from git log"
```

**Web Research**

```markdown
Answer research questions using this evidence-format pattern:

<example>
Question: What is the latency overhead of WebAssembly compared to native JavaScript in browsers?
Answer:
- Load time: Wasm is ~20-40% faster to parse than JS for large codebases (source: V8 blog, 2024)
- Execution: Wasm averages 1.2x-1.5x faster than JS for compute-heavy tasks (source: Mozilla Hacks, 2023 benchmarks using spec benchmarks)
- However: Wasm-to-JS bridge calls add 2-5ns overhead per crossing (source: Chrome Platform Status)
- Verdict: Wasm wins for compute; loses for DOM-heavy operations due to bridge cost
</example>

Now: Question: Is React Server Components adoption worth the architectural complexity for a content-heavy site in 2026?
```

```markdown
Compare technologies using this structured comparison format:

<example>
Topic: SQLite vs DuckDB for analytical workloads
Comparison:
| Dimension | SQLite | DuckDB |
|-----------|--------|--------|
| Query engine | Row-based | Columnar vectorized |
| Best for | OLTP, embedded, <10M rows | OLAP, multi-billion row aggregations |
| Concurrency | Single writer | Parallel joins across cores |
| Extension ecosystem | Extensive (FTS, Spatialite, etc.) | Growing (Parquet, Iceberg, Postgres) |
| Memory efficiency | Excellent | Good (spills to disk) |

Bottom-line recommendation: Use SQLite for transactional apps and simple analytics. Use DuckDB when you need to join 100M+ row datasets or query Parquet files directly.
</example>

Now: Topic: Redis vs KeyDB vs Dragonfly for caching at 100k req/s
```

---

## 5. Specify the Desired Output Format

### Purpose
Explicitly telling the model *how* to structure its response ensures consistency, parsability, and usability. Whether you need JSON, a table, a code block, a bullet list, or a specific schema — spell it out.

### Relevancy to End Results
- **Without format spec** → inconsistent structure, extra preamble, hard-to-parse output.
- **With format spec** → machine-parseable output, consistent structure, usable immediately.

### How to Include It Best
- State the format in the first sentence: "Respond in JSON."
- Show the schema when possible: `{"key": "value_type", ...}`
- Use natural language format descriptors: "3 bullet points, each starting with a verb."
- For code: specify language for syntax highlighting: "Output inside a ```tsx code block."
- Combine with the "say what to do" principle: "Your response must be valid JSON. Do NOT include any text outside the JSON block."

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Analyze this SvelteKit build error and respond with a JSON object in this exact shape:

```json
{
  "root_cause": "string — one sentence",
  "file": "string — relative file path",
  "line": number,
  "fix": "string — code snippet with the corrected line(s)",
  "why_it_happened": "string — explanation in one paragraph"
}
```

Error: 500 — Cannot read properties of undefined (reading 'map') at src/routes/orders/+page.svelte:18
Preview of line 18: {#each $page.data.orders as order}
```

```markdown
List 5 Svelte 5 performance optimization techniques. For each, provide:
- Technique name (bolded)
- When to apply it (one sentence)
- Before/after code example using runes syntax
- Estimated improvement (e.g., "2-5x fewer re-renders for lists >100 items")
```

**Image Prompting**

```markdown
Generate a prompt for DALL-E 3 as a single paragraph under 300 characters. Do not include any explanatory text, labels, or prefixes — just the prompt itself. The prompt should describe: subject, environment, lighting, color palette, and art style in that order.
```

```markdown
Given this concept, generate:
1. A Midjourney prompt (include --ar, --s, --v parameters)
2. A DALL-E 3 prompt (plain paragraph, <300 chars)
3. A Stable Diffusion prompt (include negative prompt)

Format each in its own ###-separated section. No other text.

Concept: A futuristic library where books are holographic data streams.
```

**Skill Creation**

```markdown
Write a skill definition as YAML frontmatter + markdown body:

```yaml
name: <string>
description: <string, max 120 chars>
version: <semver>
triggers:
  - <glob pattern, e.g., "*.ts">
```
Then, on a new line, write the full system prompt for the skill as a markdown blockquote.
```

```markdown
Generate a PR description template as a structured skill. Output must be:

```json
{
  "skill_name": "generate-pr-description",
  "trigger": "on git push to branch with open PR",
  "instructions": ["step 1", "step 2", ...],
  "output_template": "# Summary\n## Changes\n## Testing\n## Related Issues"
}
```

Use the branch name, diff, and commit messages to fill the template.
```

**Web Research**

```markdown
Research the top 5 vector databases in 2026. Present results as a markdown table with columns:
| Product | License | Best For | Query Latency (p99) | Max Dimensions | Pricing Model |

Then, below the table, add a single paragraph recommendation for a startup with <$10k/mo infra budget.
```

```markdown
Summarize this article in exactly 4 sentences. Sentence 1: the problem. Sentence 2: the proposed solution. Sentence 3: key result. Sentence 4: limitation or next step. Do not add any text before or after the 4 sentences.
```

---

## 6. Supply Context & Data Strategically

### Purpose
Models do not have access to your private data, recent events (past their training cutoff), or deep domain specifics unless you provide them. Including relevant facts, figures, documents, and constraints directly in the prompt gives the model the raw material it needs to produce accurate, grounded outputs.

### Relevancy to End Results
- **Without context** → hallucinated numbers, invented facts, generic advice that doesn't fit your situation.
- **With context** → factual, actionable output tied to your specific data. Reduces hallucination by 40–60%.

### How to Include It Best
- **Put long documents at the top** of the prompt, before the instruction and query.
- **Wrap data in distinct delimiters** `<document>...</document>` or `<data>...</data>`.
- **Label the data source** — the model performs better when it knows what each piece of data represents.
- For **multi-document** tasks, structure with `<documents><document index="1"><source>...</source><content>...</content></document></documents>`.
- Ask the model to **quote relevant passages** before answering (grounded generation).

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
I need you to refactor this SvelteKit page. Here is the current code:

<current_code>
<script lang="ts">
  let posts: any[] = $state([]);
  let loading = $state(true);
  let error = $state("");

  async function load() {
    const res = await fetch("/api/posts");
    posts = await res.json();
    loading = false;
  }
  $effect(() => { load(); });
</script>

{#if loading}<p>Loading...</p>{:else if error}<p>{error}</p>{:else}
  {#each posts as post}
    <p>{post.title}</p>
  {/each}
{/if}
</current_code>

Refactoring goals (in priority order):
1. Move data fetching to a SvelteKit load function in +page.server.ts
2. Add proper TypeScript types for the Post interface
3. Handle fetch errors with SvelteKit's error() helper
4. Add streaming with await parent() for parallel data loading
5. Remove the $effect — data should come from $page.data

Show the complete refactored files: +page.server.ts and +page.svelte.
```

```markdown
Here is our SvelteKit API response schema (returned from a load function):

```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "role": "admin | user | viewer",
  "permissions": ["read", "write", "delete"],
  "lastLoginAt": "ISO8601 | null",
  "metadata": { "department": "string", "title": "string" }
}
```

And here is a failing Playwright test:

```ts
await expect(page.locator("text=Engineering")).toBeHidden()
// Expected: element not visible
// Received: <td>Engineering</td> is visible
```

The test asserts that the department metadata should NOT be visible on the profile page. Explain why this test fails and fix either the component or the test.
```

**Image Prompting**

```markdown
Here is a reference color palette from our brand guidelines:
- Primary: #2A5C82 (deep teal)
- Secondary: #E8C37B (warm gold)
- Accent: #D4514A (terra cotta)
- Background: #F7F3EE (warm white)
- Text: #1A1A2E (near black)

Generate 3 hero banner concepts for a luxury travel brand using exactly these colors. Each concept: describe the scene, lighting, composition, and which colors dominate. Output as a short paragraph per concept.
```

```markdown
Our user avatar needs to match these specifications:
- Style: flat vector, 2D, no gradients
- Size: must work at 48x48px and 256x256px
- Elements: a simplified human silhouette with the first letter of the user's name
- Restrictions: no eyes or facial features (privacy), rounded corners (4px)

Generate a prompt that produces this avatar style consistently.
```

**Skill Creation**

```markdown
Here is the existing skill ecosystem in my opencode setup:

<existing_skills>
- docker-validator: checks docker-compose files for correctness
- pr-reviewer: analyzes PR diffs for code quality
- api-docs-generator: creates OpenAPI specs from route files
- db-migration-checker: validates SQL migration sequences
</existing_skills>

I need a new skill that acts as a "pre-commit orchestrator" — it runs all the above skills on staged files and only reports the consolidated results. The skill should:

<requirements>
- Accept a list of staged file paths
- Route each file to the correct skill by file extension/name
- Collect results and deduplicate overlapping findings
- Output a single structured report with pass/fail per file
- Must not modify any files — read-only
</requirements>

Design the skill configuration and system prompt.
```

```markdown
Here is the OpenAPI spec for our internal API (sensitive, don't share):

<api_spec>
[truncated — imagine a 200-line OpenAPI 3.0 YAML describing a task management API with endpoints for CRUD operations on tasks, users, projects, and notifications]
</api_spec>

Create a skill named "task-api-helper" that:
1. Understands the API spec (included above)
2. Can generate curl examples for any endpoint
3. Can explain error codes returned by any endpoint
4. Can generate TypeScript types matching the response schemas

The skill prompt should reference the spec directly and be able to answer natural language questions about the API.
```

**Web Research**

```markdown
Our startup is building a Developer Experience (DX) tool for micro-frontends. Here is our positioning:

<product_context>
- Product: "Helix" — a runtime integration layer for micro-frontends
- Target users: frontend infra teams at companies with 5+ independent frontend teams
- Key differentiator: shared dependency deduplication at the network level (no duplicate React instances)
- Current competitors: Module Federation (Webpack 5), Piral, Single-SPA, OpenMFP
- We are pre-seed, building the MVP in 3 months
</product_context>

Research the competitive landscape. For each competitor, find: their latest features (2025-2026), their pricing (if public), common complaints from users, and gaps in their offering that Helix could exploit. Present as a SWOT-like table with a recommended positioning strategy paragraph.
```

```markdown
I have this server error log. Identify the root cause and suggest a fix:

```
Error: EMFILE: too many open files, watch
  at FSWatcher.start (internal/fs/watchers.js:165:26)
  at NodeWatcher._watchDir (chokidar/index.js:255:14)
  at NodeWatcher._addDir (chokidar/index.js:290:19)
  at new NodeWatcher (chokidar/index.js:70:16)

Context:
- Running on Ubuntu 22.04 in Docker
- Node.js 20.x
- Using chokidar (via Vite dev server)
- Project has ~15,000 files in node_modules
- fs.inotify.max_user_watches is set to 8192
```
```

---

## 7. Use Chain-of-Thought & Structured Reasoning

### Purpose
For complex tasks — analysis, debugging, planning, math, or multi-step logic — asking the model to reason step by step before answering dramatically improves accuracy. This mirrors how humans approach hard problems and gives the model "thinking space."

### Relevancy to End Results
- **Direct answer** → the model shortcuts to a plausible-sounding (often wrong) conclusion.
- **Chain-of-thought** → the model arrives at the correct answer through structured reasoning, especially for tasks requiring 3+ reasoning steps.

### How to Include It Best
- Add "Think through this step by step" or "Before answering, reason through the problem."
- Use XML tags: `<thinking>...</thinking>` before `<answer>...</answer>` to separate reasoning from output.
- For agentic systems with thinking mode (Claude), let the model think naturally but guide the thinking with: "First, restate the problem in your own words. Then list the constraints. Then work through the options. Finally, commit to one approach."
- For coding: "Explain your understanding of the bug before suggesting a fix."

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
I have this race condition in a SvelteKit load function with nested $effect reads. Before suggesting a fix, do the following step-by-step:

1. Trace what triggers each $effect and whether they can interleave
2. Identify which closures capture stale page store values and why
3. Determine whether an $effect's cleanup function is properly aborting in-flight requests
4. Propose the minimal fix (prefer moving logic into the load function or using a single $effect with an abort controller)

Here is the code:
```svelte
<script lang="ts">
  let profile = $state(null);
  let posts = $state(null);
  let loading = $state(false);

  $effect(() => {
    loading = true;
    const id = $page.data.userId;
    fetch(`/api/user/${id}/profile`).then(r => r.json()).then(d => profile = d);
  });

  $effect(() => {
    const id = $page.data.userId;
    fetch(`/api/user/${id}/posts`).then(r => r.json()).then(d => posts = d);
    loading = false;
  });
</script>
```
```

```markdown
We need to choose between SvelteKit server load functions (+page.server.ts) and universal load functions (+page.ts) for a product detail page. Think through:

1. What data on the product page requires database access? (price, inventory, description, reviews)
2. What data can be fetched directly from a public API or CDN? (images, related products)
3. Which parts need authentication tokens stored in cookies vs public data?
4. Where is the SEO-critical content that must be in the initial HTML?
5. How does this affect the client-side JS bundle size and serialization cost?

After thinking through each point, recommend which routes should use server vs universal load functions.
```

**Image Prompting**

```markdown
I want a logo for a brand called "Stonepeak" — an outdoor gear company. Before generating the prompt, think through:

1. What visual metaphors represent "stone" and "peak"?
2. What emotions should the logo evoke? (ruggedness, reliability, adventure)
3. What color palette fits the outdoor/gear industry?
4. What logo styles work best for apparel (embroidery) vs web (favicon)?
5. What are common logo clichés in this space that I should avoid?

After reasoning, generate 3 distinct logo prompt concepts.
```

```markdown
I need a hero image for a SaaS landing page targeting enterprise CFOs. Think through:

1. What visual language resonates with CFOs? (clarity, control, data, authority)
2. What colors signal enterprise trust without being boring?
3. Overused SaaS imagery to avoid (handshake, stock graph, "teams collaborating around a table")
4. Desired emotional response: "This tool will give me control over chaos"

Then generate 2 prompt options — one abstract/data-visualization style, one metaphorical.
```

**Skill Creation**

```markdown
I want to create an opencode skill that helps developers set up CI/CD pipelines. Before writing the skill, think through:

1. What CI/CD platforms do our users commonly use? (GitHub Actions, GitLab CI, CircleCI)
2. What are the most common pipeline stages? (lint, test, build, deploy)
3. What auth tokens or secrets would the skill need access to?
4. Where should generated config files be placed?
5. What validation should the skill perform on the generated config?

After reasoning, write the skill prompt.
```

```markdown
I need a skill that converts Figma design tokens to Tailwind CSS config. Reason through:

1. Design token categories: colors, spacing, typography, shadows, border radius
2. Which Tailwind v4 configuration format should we use? (CSS-based config vs JS)
3. How should the skill handle token names that don't map 1:1 to Tailwind conventions?
4. What about breakpoints? Figma uses custom names, Tailwind uses sm/md/lg/xl — how to bridge?
5. Should the skill generate both the Tailwind config AND a reference mapping file?

Write the skill definition after reasoning.
```

**Web Research**

```markdown
Research the question: "Should we use tRPC or a traditional REST API for our new Next.js app?"

Before searching, think through:
1. What criteria matter most for this decision? (type safety, DX, performance, team skill level, third-party consumers)
2. What are the trade-offs at different team sizes? (2 devs vs 20 devs)
3. Are there any 2025-2026 developments that changed the calculus? (tRPC v12? New Next.js patterns?)

Then search for each criterion and synthesize a recommendation.
```

```markdown
Analyze whether migrating from a monolith to micro-services was worth it for these 3 companies: Shopify, Etsy, and Uber.

For each company, think through:
1. What problem led them to consider microservices?
2. What migration approach did they take? (strangler fig, big bang, etc.)
3. What metrics changed after migration? (deploy frequency, MTTR, team velocity, cost)
4. Did any of them reverse the decision or recommend against it?
5. What lessons apply to a team of 15 engineers?

Synthesize the learnings into actionable advice.
```

---

## 8. Say What TO Do, Not What NOT to Do

### Purpose
Negative instructions ("Don't do X") are statistically weak — the model must first *activate* the concept of X in order to avoid it, which paradoxically makes X more likely. Positive instructions ("Do Y instead") are far more effective because they give the model a clear behavioral target.

### Relevancy to End Results
- **"Don't use markdown"** → the model may still use markdown because it had to think about markdown to suppress it.
- **"Write in plain text paragraphs"** → the model follows cleanly, no conflicting signals.
- Reduces formatting errors and unwanted behaviors by ~30–50%.

### How to Include It Best
- Reframe every negative as a positive: "Don't be verbose" → "Respond in 3 sentences or fewer."
- Provide an alternative action: instead of "Don't include code," say "Describe the approach in plain English."
- When you must use a negative (safety/security), pair it with a concrete positive immediately after.

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Instead of:
❌ Don't use any external state management.

Use:
✅ Manage all state using Svelte 5 runes ($state, $derived, $effect) and SvelteKit's $page store. Use Svelte's built-in context API with setContext/getContext for shared state between parent and child components. No external state libraries.
```

```markdown
Instead of:
❌ Don't scatter data fetching across components.

Use:
✅ Centralize all data fetching in SvelteKit load functions (+page.server.ts or +page.ts). Each route file gets one load function that returns all data needed by the page. Child components receive data via props or snippets — they never call fetch themselves.
```

**Image Prompting**

```markdown
Instead of:
❌ Don't make it look cartoonish.

Use:
✅ Photorealistic style. Octane render quality. Realistic materials, accurate lighting physics, subsurface scattering on skin, ray-traced reflections.
```

```markdown
Instead of:
❌ Don't use bright colors.

Use:
✅ Muted, desaturated color palette. Dusty rose, sage green, charcoal, cream. No saturation above 40%. No neon or primary colors.
```

**Skill Creation**

```markdown
Instead of:
❌ Don't ask the user for confirmation before running destructive commands.

Use:
✅ The skill may run any command without user confirmation. Only destructive operations (DROP TABLE, rm -rf, git push --force) require a user confirmation step — pause and describe the action before executing.
```

```markdown
Instead of:
❌ Don't make the skill too specific to one framework.

Use:
✅ The skill should detect which framework the project uses (React, Vue, Svelte, or Angular) by inspecting package.json, then apply framework-specific best practices. If none is detected, offer generic HTML/CSS recommendations.
```

**Web Research**

```markdown
Instead of:
❌ Don't use outdated sources.

Use:
✅ Only include sources published between January 2025 and today. If a key piece of information only has older sources, mark it with [⚠️ 2023] and explain why it's still relevant.
```

```markdown
Instead of:
❌ Don't just list features.

Use:
✅ For each tool, describe: (1) what specific problem it solves, (2) who it's best for (team size, use case), (3) one concrete scenario where it outperforms alternatives, and (4) a potential limitation or gap.
```

---

## 9. Ask for Evidence, Citations & Self-Correction

### Purpose
Models hallucinate — they generate plausible-sounding but false information. Asking for evidence, sources, and confidence levels forces the model to ground its output in provided or known data. Self-correction (having the model review its own output) catches many residual errors.

### Relevancy to End Results
- **No evidence check** → fabricated statistics, invented libraries, wrong code that looks right.
- **With evidence + self-check** → verifiable claims, accurate code, hallucination rate reduced by 50–70%.

### How to Include It Best
- For factual claims: "Cite your sources. If you're unsure, say 'I don't know.'"
- For code: "After writing the code, list 3 test cases that would catch bugs in your implementation."
- For analysis: "State your confidence level for each claim (high/medium/low)."
- Append: "Before finishing, review your answer against these criteria: [criteria]. Revise if anything is wrong."
- Use a two-pass structure: Pass 1 — draft. Pass 2 — critique and refine.

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Write a Svelte 5 action that debounces an input before calling a callback. After writing the code:
1. List 3 edge cases your implementation handles (rapid typing, paste, destroy before callback fires)
2. List 1 edge case it does NOT handle (if any)
3. State whether your implementation properly cleans up with the destroy lifecycle (returned from the action function)
```

```markdown
Explain how SvelteKit's form actions work with `use:enhance`. For each claim about behavior, cite the specific SvelteKit documentation source (e.g., "kit.svelte.dev/docs/form-actions: 'A form action is a function...'"). If you are inferring behavior that is not explicitly documented (e.g., exact timing of $page.form updates), mark it as [inference].
```

**Image Prompting**

```markdown
Generate a prompt for a fantasy castle scene. After generating it, review your own prompt:
1. Does it specify lighting conditions? If not, add them.
2. Does it specify aspect ratio? If not, add --ar 16:9.
3. Does it use any terms that AI image models commonly misinterpret? If so, replace them with more concrete synonyms.
4. Output the FINAL prompt only after this self-review.
```

```markdown
I want a prompt that consistently generates images of cats in the style of Studio Ghibli. Before you write it, explain:
1. What specific visual elements define the "Ghibli style"? (color palette, line quality, background detail, character proportions)
2. Which of these elements are reliably reproducible by current image models?
3. Which elements typically fail or get misinterpreted?

Then write the prompt. Afterward, suggest 3 variations to test for consistency.
```

**Skill Creation**

```markdown
Design a skill that validates JSON files against a JSON Schema. In the skill prompt, include:
- A step where the skill EXPLAINS each validation error before reporting it
- A confidence score per error (CRITICAL/WARNING/INFO based on schema keyword: required properties are CRITICAL, pattern mismatches are WARNING, description mismatches are INFO)
- A final summary line: "X errors, Y warnings, Z info — [pass/fail] based on zero CRITICAL errors required"
```

```markdown
Write a skill that generates SQL queries from natural language. At the end of the skill prompt, add:
"After generating each query, do a self-review:
1. Does the query handle NULLs correctly for every JOIN and WHERE clause?
2. Does it use proper parameterized placeholders (? or $1) instead of string interpolation?
3. Are all table names qualified with the schema if ambiguous?
4. Does the query avoid SELECT *?

If any check fails, regenerate the query.
"
```

**Web Research**

```markdown
Find statistics on web framework market share in 2025-2026. For each number, state:
- The exact source (URL or publication name)
- The methodology (survey? web crawl? CDN data? npm downloads?)
- Your confidence level in the number (high/medium/low — and why)

If sources disagree, present both sides and explain the likely reason for the discrepancy.
```

```markdown
Research best practices for error handling in Rust. For each best practice you find:
1. Cite the official Rust reference, Rust Book, or a well-known Rustacean (with source)
2. State whether this is a consensus view, a debated topic, or a niche pattern
3. Provide a code example that follows the practice

After gathering practices, do a self-check: "Are any of these practices contradictory? If so, explain the trade-off."
```

---

## 10. Iterate: Prompt → Review → Refine

### Purpose
No prompt is perfect on the first try. The most effective prompt engineers treat prompting as an iterative conversation: start simple, examine the output, identify what's missing or wrong, and refine the prompt with more specificity, examples, or constraints.

### Relevancy to End Results
- **Single-shot** → works for trivial tasks but fails as complexity increases.
- **Iterative** → the difference between a generic result and a production-quality result. Each iteration compounds improvements.

### How to Include It Best
- **Start minimal**: one sentence describing the task.
- **Review the output** for: missing format, wrong tone, factual errors, shallow depth.
- **Add one thing per iteration**: more context, an example, a format spec, a constraint.
- **Keep a prompt version log** for critical tasks. Track: what you changed and how output changed.
- For complex agentic tasks, use the model itself to critique your prompt: "Rate this prompt on clarity, specificity, and completeness from 1–10. Suggest 3 improvements."

### Examples

**Webapp Development**

Iteration sequence for a webapp task (TypeScript + SvelteKit):

```
v1: "Build a to-do app."

Review: Too vague. No framework, no features, no state management pattern.

v2: "Build a to-do app with SvelteKit + TypeScript. Features: add, complete, delete, filter by status. Use $state runes. Persist to localStorage."

Review: Missing component structure and route design.

v3: "Build a to-do app with SvelteKit + TypeScript (file-based routing). Use $state for local state, split into: src/routes/+page.svelte (main page), src/lib/components/TodoInput.svelte, TodoList.svelte, TodoItem.svelte, FilterBar.svelte. Persist to localStorage with a reusable write/store pattern. Each component under 60 lines."

Review: Good, but need the data model and form action for adding todos.

v4: "Build a to-do app with SvelteKit + TypeScript. Data model: { id: string, text: string, completed: boolean, createdAt: string (ISO) }. Use a form action in +page.server.ts for adding todos (POST). Use $state for client-side filter and toggle/delete state. Components: TodoInput (form with input + submit), TodoList (receives filtered todos via prop), TodoItem (checkbox + text + delete button), FilterBar (All / Active / Completed as buttons that set a $state variable). Styling: scoped Svelte styles with CSS custom properties, clean minimal design. Persist completed/deleted state to localStorage via a $effect that syncs. No external dependencies."
```

**Image Prompting**

Iteration sequence:

```
v1: "A cyberpunk character portrait."

Review: Too generic. No pose, style, or composition.

v2: "A cyberpunk detective character portrait, close up, neon lit, rain, gritty."

Review: Better but missing aspect ratio, rendering style, specific lighting.

v3: "A cyberpunk detective portrait, close-up from low angle, blue and pink neon split lighting on face, rain streaks on lens, tired expression, detailed cybernetic eye implant, gritty textured skin pores, cinematic DOF, 8K, unreal engine 5 render --ar 2:3 --s 750 --v 6"

Review: Good. Could add wardrobe detail and environment background.

v4: "A cyberpunk detective portrait, close-up from low angle, blue and pink neon split lighting on face, rain streaks on camera lens, tired bloodshot eyes with one cybernetic replacement (glowing amber iris, visible circuitry), stubble, worn leather jacket collar visible at bottom edge, steam rising from a coffee cup in foreground right, gritty textured skin pores, volumetric fog, cinematic DOF, sharp focus on eyes, 8K, Unreal Engine 5 render --ar 2:3 --s 750 --v 6 --style raw"
```

**Skill Creation**

Iteration sequence:

```
v1: "A skill that reviews code."

Review: Vague. What language? What kind of review? What output format?

v2: "A skill that reviews Python code for bugs. It should output issues."

Review: Better but what kind of bugs? How are issues formatted? What frameworks?

v3: "A skill that reviews Python code for: type errors, unhandled exceptions, performance issues (O(n²) loops), and missing edge cases (empty lists, None values). Output: list of findings with file:line, severity (critical/warning/info), and a suggested fix snippet."

Review: Good. Now add trigger pattern and make it framework-aware.

v4:
name: python-code-reviewer
triggers: ["*.py"]
prompt: |
  You are a senior Python code reviewer. Analyze the provided .py file for:
  - Type errors (especially in untyped or loosely-typed functions)
  - Unhandled exceptions (bare excepts, missing specific exception types)
  - Performance antipatterns (O(n²) inside loops, inefficient list/dict construction)
  - Edge case misses (empty iterables, None without guard, zero-division risks)
  - Import issues (unused imports, circular import risks)
  - Asyncio issues (forgotten awaits, blocking calls in async functions)

  For framework projects: if you see Django views, check for N+1 queries and missing select_related. If you see FastAPI, check for proper dependency injection and response models.

  Output format:
  ## Findings
  | Severity | File:Line | Issue | Suggested Fix |
  |---|---|---|---|

  Followed by a summary line: "X critical, Y warnings, Z info — [PASS/FAIL]"
  Failing criteria: any CRITICAL finding = FAIL.
```

**Web Research**

Iteration sequence:

```
v1: "Research the best frontend framework."

Review: Subjective, no criteria, no constraints. Will get an opinion piece.

v2: "Compare React, Vue, and Svelte for a data-heavy dashboard app. Consider performance, ecosystem, and learning curve."

Review: Better but performance metrics are vague. What data volume? What team size?

v3: "Compare React (with Recoil), Vue (with Pinia), and Svelte (with runes) for building a dashboard that renders 10,000 rows of real-time updating financial data. Assessment criteria:
- Re-render performance with 10k rows updating at 1Hz
- Bundle size for initial load
- Developer experience for a team of 5 mid-level devs
- Ecosystem support for data grid libraries (AG Grid, TanStack Table)
- Production adoption evidence from 2024-2026"

Review: Excellent. Now ask for specific numbers and sources.

v4: "Research question: For a real-time financial dashboard with 10k rows updating at 1Hz, which frontend framework (React, Vue, Svelte) performs best?

Retrieve specific benchmarks (render time per update, memory usage at 10k nodes) from official framework docs, blog posts, or third-party benchmarks dated 2024-2026.

For each framework, report:
- Cold render time (ms) for 10k rows
- Update render time (ms) per 1Hz tick
- Memory usage (MB) after 5 minutes of updates
- Bundle size (KB gzipped)

If head-to-head benchmarks don't exist, synthesize from individual benchmarks with the same test conditions. Note confidence levels.

After reporting, recommend ONE framework and justify in 2 paragraphs."
```

---

## 11. Optimize for Tool Use & Agentic Workflows

### Purpose
When an AI agent has access to tools (code execution, file search, web search, database queries, etc.), the prompt must guide *when* and *how* to use those tools. Well-structured agent prompts produce autonomous, efficient behavior. Poorly structured ones cause over-triggering, under-triggering, or inefficient sequential tool use.

### Relevancy to End Results
- **No tool guidance** → agent may talk instead of acting, or fire too many unnecessary tool calls.
- **With tool guidance** → autonomous task completion, parallel tool execution, correct tool selection. 2–5x faster task completion.

### How to Include It Best
- Define the **decision boundary**: "Use web search when you need current information. Use the code executor to verify code before suggesting it."
- Encourage **parallelism**: "If you need to read 3 files, call all 3 reads in parallel in a single turn."
- For agentic coding: "Default to implementing changes rather than just suggesting them."
- For research agents: "Use multiple parallel searches with different phrasings when exploring a topic."
- Provide a **default action**: "If uncertain, use web search to find the answer rather than guessing."
- Discourage **over-triggering**: "Only use the delete-file tool when the user explicitly asks to delete something."
- For multi-step tasks: "Work through this systematically. Use the thinking tool to plan, then execute tool calls, then summarize."

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
You have access to: read files, write files, run bash commands, and search the web.

Your task is to build a SvelteKit blog with Markdown (MDsveX) support.

Workflow:
1. First, read package.json to see what's already installed
2. Search the web for "SvelteKit MDsveX setup 2026" and read the top result
3. Install needed packages (one npm install command)
4. Create the config: mdsvex.config.js and update svelte.config.js
5. Create 3 example blog posts in src/routes/blog/posts/ as .md files
6. Create the routes: src/routes/blog/+page.svelte (list with load function) and src/routes/blog/[slug]/+page.svelte (single post + load function)
7. Run `npm run dev` and confirm it starts without errors
8. Report the final file structure

Run steps 1 and 2 in parallel. Then proceed sequentially.
```

```markdown
You have access to: read files, write files, run bash commands, search the web.

Investigate and fix the slow-loading SvelteKit dashboard page:

1. Read src/routes/dashboard/+page.server.ts to find the current load function and identify slow queries/endpoints
2. Search the web for "SvelteKit streaming load function deferred" to learn about streaming patterns
3. Refactor the load function to use deferred data (load function returning a promise for non-critical data while rendering critical data immediately)
4. Re-run `npm run dev` and check the initial HTML size is reduced
5. Add a loading skeleton in +page.svelte using {#await} blocks for the deferred data

After the refactor, report what data was moved to deferred and the estimated improvement in time-to-first-byte.
```

**Image Prompting**

```markdown
You have access to: image generation API, file system.

Workflow for creating a brand identity kit:
1. FIRST: Search the web for "current brand identity design trends 2026" and read 2 results
2. THEN: Analyze the uploaded logo and brand guidelines document
3. Generate 3 color palette options using the image generation API (prompt: abstract color grade swatches in [specific styles])
4. For each palette, generate a hero image mockup showing a website header with that palette
5. Write a summary comparing the 3 options

Each image generation call should include specific style parameters. Generate multiple options in parallel where possible.
```

**Skill Creation**

```markdown
You have tools: read file, write file, run shell, search web, list directory.

Create an opencode skill from scratch:

1. First, list the current skills directory to understand the naming conventions
2. Read 2 existing skill files to understand the format
3. Search the web for "opencode skill documentation" to check for any recent API changes
4. Create the skill file at the correct path
5. Run any validation/parsing available to confirm the skill is valid JSON/YAML
6. Report the created skill's location and summary

Execute steps 1-3 in parallel where possible.
```

```markdown
You have tools: read file, search web, git diff.

Your task is to review a PR and create a skill that automates similar reviews:

1. Read the PR diff (use git diff main...HEAD or read the changed files directly)
2. Search the web for "code review checklist for [language/framework]" to find 3 authoritative checklists
3. Synthesize the checklists into a skill prompt
4. Write the skill to the skills/ directory
5. Optional: run the new skill on the current PR diff to test it
6. Report the diff and any findings from the test run

Do NOT commit any files — just create the skill locally.
```

**Web Research**

```markdown
You have tools: web search (can call multiple times in parallel), file write.

Research the question: "What are the best state management libraries for React in 2026?"

Strategy:
1. Generate 3 search queries and run them in parallel:
   - "best React state management library 2026 comparison"
   - "zustand vs jotai vs valtio benchmarks 2026"
   - "React 19 state management best practices 2026"
2. Read the top 2 results from each search
3. Synthesize findings into a comparison table (library, bundle size, performance, learning curve, adoption trend)
4. Write the table to research-output.md
5. Add a section with your recommendation based on team size scenarios
```

```markdown
You have tools: web search, web page fetch, file write.

Investigate this error and find a fix:

Error: "Module not found: Can't resolve 'fs' in './src/components/ServerComponent.tsx'"

Plan:
1. Search the web for the exact error message + "Next.js"
2. Read the top 2 results (full page content)
3. If the results mention a specific Next.js configuration fix, also search for "Next.js fs module webpack config"
4. Write the solution to a fix.md file
5. Also suggest a preventive measure to add to next.config.js

Report the root cause and the exact steps to fix.
```

---

## 12. Model Parameters & Configuration

### Purpose
The model, temperature, effort/thinking budget, max output tokens, and stop sequences are levers that control output quality, creativity, cost, and latency. Picking the right settings is as important as the prompt text itself.

### Relevancy to End Results
- **Wrong parameters** → overly creative factual outputs, truncated responses, wasted tokens on irrelevant exploration.
- **Right parameters** → optimal balance of accuracy, creativity, speed, and cost.

### How to Include It Best

| Parameter | Use Case | Setting |
|---|---|---|
| **temperature** | Factual extraction, code generation, classification | `0.0 – 0.2` |
| **temperature** | Creative writing, brainstorming, image prompts | `0.7 – 1.0` |
| **temperature** | Balanced use cases | `0.3 – 0.5` |
| **effort / thinking** | Complex reasoning, multi-step agentic tasks | `high` or `xhigh` |
| **effort / thinking** | Simple lookups, classification, chat | `low` or `medium` |
| **max_tokens** | Set based on expected output length + 20% buffer | e.g., `4096`, `8192`, `65536` |
| **stop sequences** | When you need output to end at a specific delimiter | e.g., `["```", "\n\n\n"]` |
| **model selection** | Most capable for complex tasks | Latest model (Claude Opus, GPT-4o, etc.) |
| **model selection** | Cost-sensitive, simple tasks | Smaller model (Claude Haiku, GPT-4o-mini) |

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
Task: Generate a SvelteKit load function that fetches and validates data against a Zod schema.
Settings: temperature: 0.0, effort: low, model: latest capable model
Rationale: Schema validation and data fetching must be deterministic — zero creativity needed. Low effort is sufficient since this is a straightforward pattern.
```

```markdown
Task: Design the route layout for a SvelteKit e-commerce app with auth, admin dashboard, product pages, and checkout.
Settings: temperature: 0.4, effort: high, model: latest capable model
Rationale: Route architecture requires thoughtful grouping (+layout.svelte nesting, auth guards via hooks, shared load functions). High effort ensures the model considers all edge cases (shared layouts, redirect logic, data dependencies between nested routes). Low temperature keeps the output practical.
```

**Image Prompting**

```markdown
Task: Generate a DALL-E prompt for a photorealistic product image.
Settings: temperature: 0.2, model: latest capable model
Rationale: Product shots need precise adherence to brand specifications. Low temperature keeps details consistent.
```

```markdown
Task: Generate 5 wildly different artistic interpretations of "freedom" for a concept art mood board.
Settings: temperature: 1.0, model: latest capable model
Rationale: Maximum diversity in interpretation. We want surprising, divergent outputs.
```

**Skill Creation**

```markdown
Task: Write a skill that extracts structured data from invoices.
Settings: temperature: 0.0, effort: medium, model: latest capable model
Rationale: Extraction must be deterministic. Medium effort is sufficient — this is a pattern-matching task, not deep reasoning.
```

```markdown
Task: Design a skill that generates creative marketing copy for social media posts.
Settings: temperature: 0.8, effort: high, model: latest capable model
Rationale: Copywriting benefits from creativity. High effort ensures the model considers audience, platform constraints, and brand voice.
```

**Web Research**

```markdown
Task: Research factual specifications of the latest MacBook Pro.
Settings: temperature: 0.0, effort: low, model: latest capable model
Rationale: Pure factual retrieval. Low effort is sufficient since the model just needs to search, extract, and present.
```

```markdown
Task: Synthesize a strategic recommendation for a startup's go-to-market strategy based on competitor analysis.
Settings: temperature: 0.4, effort: xhigh, model: latest capable model
Rationale: Requires synthesizing multiple data points into a coherent strategy. xhigh effort lets the model reason deeply about trade-offs, market positioning, and risk factors. Low temperature keeps recommendations grounded.
```

---

## 13. Design Subagent Architectures (Orchestrator-Executor Pattern)

### Purpose
As tasks grow in scope, a single AI session suffers from **context rot** — performance degrades as the conversation history accumulates. The solution is to split work across multiple isolated agents: an **Orchestrator** that plans and delegates, and **Executor** subagents that each receive one atomic task in a clean session. Subagents fight context decay, enable parallel execution, and let you assign different models to different roles.

### Relevancy to End Results
- **Single monolithic session** → after 5-15 interactions, the model loses focus, hallucinates constraints, and produces lower-quality output regardless of the model's capability.
- **Orchestrator-Executor pattern** → each task starts with zero accumulated noise. Quality stays consistent across 50+ tasks. You can also use cheaper/faster models for orchestration and reserve expensive models for execution.

### How to Include It Best

**Architecture principles:**

1. **Orchestrator plans; Executors do.** The Orchestrator reads the task list, picks the next task, and delegates. The Executor receives one task at a time and completes it in an isolated session.
2. **Keep task definitions atomic.** Each task should be completable in 1-3 interactions. If a task needs more, break it down further.
3. **Pass context explicitly, not implicitly.** Don't rely on conversation history. Use shared files (progress.txt, tasks.json) for inter-agent communication.
4. **Consider model specialization.** Use a cheaper/faster model for the Orchestrator (it mainly reads and delegates) and a more capable model for Executors (where the actual coding/writing happens).

**Prompt structure for the Orchestrator:**

```markdown
You are an Orchestrator agent. Your job is to coordinate task execution by delegating to an Executor subagent.

<instructions>
1. Read the task list from tasks/tasks.json
2. Pick the next task that has status "pending"
3. Update its status to "in_progress" in tasks/tasks.json
4. Delegate the task to the Executor subagent — pass only:
   - The task name and description
   - The file paths the task needs to read/modify
   - The spec/spec.md for context
5. After the Executor completes, verify:
   - Were all acceptance criteria met?
   - Are there new/modified files that need review?
6. Update the task status to "completed" or "failed" with notes
7. Proceed to the next pending task
8. When all tasks are done, summarize what was implemented

Communication rules:
- Do NOT implement anything yourself — delegate every task
- Use the Executor subagent tool (not regular chat) for each task
- Pass only the minimum context needed, not the full conversation history
- If a task fails, log the reason and move to the next — don't retry in the same session
</instructions>
```

**Prompt structure for the Executor:**

```markdown
You are an Executor agent. You receive one atomic task at a time and implement it.

<instructions>
1. Read the task description carefully
2. Read the relevant sections of spec/spec.md for context
3. Read any existing files the task modifies
4. Implement the task — write or modify files as needed
5. Update the progress log in progress.txt with:
   - What was implemented
   - Any deviations from the spec (and why)
   - Areas that need human review
6. Report back to the Orchestrator: success/failure + summary

Constraints:
- Focus ONLY on the assigned task — do not fix unrelated code
- Do not refactor beyond what the task requires
- Use the project's existing conventions (refer to copilot-instructions.md or equivalent)
- If the task is ambiguous, make a reasonable assumption and note it in the progress log
- Always leave the code compilable — even if the task is partial
</instructions>
```

**File-based state tracking pattern (shared between agents):**
```json
// tasks/tasks.json
{
  "tasks": [
    {
      "id": 1,
      "name": "Add user authentication",
      "status": "completed",
      "files": ["src/routes/login/+page.svelte", "src/hooks.server.ts"],
      "notes": "Implemented email/password login with session cookies"
    },
    {
      "id": 2,
      "name": "Create dashboard layout",
      "status": "in_progress",
      "files": ["src/routes/dashboard/+layout.svelte"],
      "notes": ""
    },
    {
      "id": 3,
      "name": "Add user settings page",
      "status": "pending",
      "files": ["src/routes/settings/+page.svelte"],
      "notes": ""
    }
  ]
}
```

**Context budget protocol:**

Add this instruction when your Orchestrator delegates tasks:
```markdown
ECONOMY MODE: When delegating, provide ONLY:
- The task ID and name
- The file paths to read
- The 3 most relevant spec sections (title + 1 line each)
- Do NOT include the conversation history, previous task outputs, or the full spec
```

### Examples

**Webapp Development (TypeScript + SvelteKit)**

```markdown
You are an Orchestrator agent for a SvelteKit project. Break down and delegate the implementation of a team dashboard feature.

The tasks are defined in tasks/tasks.json:

<tasks>
[
  { "id": 1, "name": "Create Team model + DB schema", "status": "pending", "files": ["src/lib/server/db/schema.ts"] },
  { "id": 2, "name": "Build team invite API endpoint", "status": "pending", "files": ["src/routes/api/team/invite/+server.ts"] },
  { "id": 3, "name": "Build team member list page", "status": "pending", "files": ["src/routes/team/[id]/+page.svelte", "src/routes/team/[id]/+page.server.ts"] },
  { "id": 4, "name": "Add role-based permissions (owner, admin, member)", "status": "pending", "files": ["src/hooks.server.ts", "src/lib/server/auth.ts"] }
]
</tasks>

Rules:
- Execute tasks in order (schema → API → UI → permissions)
- Each task goes to a fresh Executor subagent session — do NOT pass previous task results
- After each task, update tasks.json status and add brief notes
- If a task fails, log the error to tasks.json and continue with the next task
- When all done, write a summary to progress.txt
```

```markdown
You are an Executor subagent. Implement only the following task:

<task>
ID: 3
Name: Build team member list page
Description: Create a SvelteKit page at /team/[id] that lists all team members with their roles and status (active/pending). The team ID comes from the URL params. Fetch member data from the API endpoint /api/team/[id]/members (already exists).
Acceptance criteria:
- Route: src/routes/team/[id]/+page.server.ts + +page.svelte
- Load function fetches members, returns { members: Member[] }
- Page displays: member name, email, role badge, status indicator
- Status "pending" shows an "invitation sent" badge
- Empty state: "No team members yet"
- Loading state: skeleton rows
- TypeScript: Member = { id: string, name: string, email: string, role: "owner" | "admin" | "member", status: "active" | "pending" }
- Styling: scoped Svelte styles, matches project design tokens from src/app.css
</task>

<context>
Project conventions: Svelte 5 runes, scoped CSS, single-word component names in PascalCase.
Do NOT modify any files outside this task's scope.
Report back: success OR failure with reason.
</context>
```

**Image Prompting**

```markdown
You are an Orchestrator for an image generation pipeline. You have 3 Executor subagents — one for each style (photorealistic, vector/illustration, pixel art). Your task is to produce a brand identity kit.

Brand brief: "Nova" — a plant-based energy drink targeting gamers.

Tasks:
1. Generate 3 logo concepts (photorealistic subagent)
2. Generate 3 can mockups (photorealistic subagent)
3. Generate social media banner templates (vector subagent)
4. Generate pixel art power-up icons (pixel art subagent)

Delegate each task to the correct subagent. Pass the full brand brief + color palette each time. Do NOT pass outputs from previous tasks — each subagent starts fresh.
```

**Skill Creation**

```markdown
You are an Orchestrator building an opencode skill ecosystem. You have an Executor subagent.

The spec for the new skill system:

<spec>
We need 3 skills:
1. "route-analyzer" — scans SvelteKit routes and reports missing +layout.server.ts or +page.ts files
2. "type-generator" — reads JSON API responses and generates TypeScript interfaces
3. "hook-validator" — checks hooks.server.ts for missing error handling in handle()

Tasks to complete:
1. Create route-analyzer skill definition
2. Create type-generator skill definition
3. Create hook-validator skill definition
4. Create a meta-skill "skill-orchestrator" that runs all 3 and consolidates output
</spec>

Rules:
- Execute exactly one task per Executor call
- After each task, update the spec to mark progress
- Pass only the task description + the spec sections relevant to that task
- Do NOT pass previous skill outputs between tasks
```

**Web Research**

```markdown
You are an Orchestrator for a research project. You have 3 Executor subagents available — one per domain.

Research question: "What is the best SvelteKit hosting platform for a European startup with GDPR requirements?"

Break this into parallel research tasks:
1. Compare Vercel, Netlify, Cloudflare Pages for SvelteKit hosting (Executor 1)
2. Research GDPR compliance requirements for each platform's data region options (Executor 2)
3. Find real-world latency benchmarks from European data centers for each provider (Executor 3)

Launch all 3 in parallel. After all complete, synthesize into a single recommendation report. Do NOT share interim findings between Executors — each works independently.
```

---

## Quick Reference: Prompt Engineering Checklist

Before finalizing any prompt, verify:

- [ ] **Instructions first** — does the prompt lead with the task?
- [ ] **Delimiters** — are instructions, context, and examples clearly separated?
- [ ] **Specific** — are all vague terms replaced with measurable quantities?
- [ ] **Role** — does the model know who it is and who it's talking to?
- [ ] **Examples** — are 2-5 diverse examples provided for complex tasks?
- [ ] **Output format** — is the exact structure specified (JSON, table, bullets, etc.)?
- [ ] **Context** — is all necessary data included in the prompt?
- [ ] **Chain of thought** — is step-by-step reasoning requested for complex tasks?
- [ ] **Positive instructions** — are all "don't" statements reframed as "do"?
- [ ] **Evidence check** — does the prompt ask for sources or self-review?
- [ ] **Parameters tuned** — are temperature, effort, and model appropriate for the task?
- [ ] **Iterated** — has the prompt been tested and refined at least once?
- [ ] **Subagent ready** — for multi-step work, is there an Orchestrator delegating to isolated Executor sessions to prevent context rot?

---

## Summary

| # | Principle | One-Liner |
|---|---|---|
| 1 | **Lead & Delimit** | Task first, then context, separated by clear markers. |
| 2 | **Be Specific** | Use numbers, names, and concrete constraints — not adjectives. |
| 3 | **Assign a Role** | Define who the model is and who it serves. |
| 4 | **Provide Examples** | 2-5 diverse examples beat any instruction for format/pattern. |
| 5 | **Specify Output Format** | Tell the model exactly how to structure its response. |
| 6 | **Supply Context** | Give the model the data it needs — don't make it guess. |
| 7 | **Use Chain of Thought** | For multi-step tasks, ask the model to reason before answering. |
| 8 | **Say What TO Do** | Positive instructions outperform negative ones. |
| 9 | **Ask for Evidence** | Cite sources, self-review, and state confidence levels. |
| 10 | **Iterate** | Start simple, review output, add one refinement per round. |
| 11 | **Optimize Tools** | Guide when/how to use tools; encourage parallelism. |
| 12 | **Tune Parameters** | Low temp for facts, high for creativity; match effort to task complexity. |
| 13 | **Subagent Architectures** | Orchestrator delegates; Executors deliver in clean isolated sessions. |
