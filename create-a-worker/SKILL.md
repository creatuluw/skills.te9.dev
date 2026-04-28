---
name: skill-creator
description: >
  Create advanced worker/dev/engineer skills with complete domain knowledge including
  methods, techniques, patterns, conventions, design principles, and self-learning
  capabilities. Use when building new skills for specialized domains, creating
  worker skills that produce high-quality solutions, or upgrading existing skills
  with deeper domain expertise and adaptive improvement mechanisms.
---

# Skill Creator — Advanced Worker Skill Engineering

Create skills that think like domain experts. Every skill you produce must carry the complete
library of logic, patterns, conventions, methods, techniques, designs, and principles a worker
needs to produce excellent work in its domain. Skills must also be self-learning and adaptive.

**Critical:** `methods/` is REQUIRED for every worker skill. A worker without methods cannot
solve problems. Methods are the operational core — the "how-to" knowledge that turns domain
understanding into implemented solutions. Every other directory is optional but `methods/` and
`SKILL.md` are non-negotiable.

## When to Use This Skill

- Creating a new worker/dev/engineer skill for any domain
- Building skills that need deep domain expertise and methods
- Upgrading existing skills with better methods, patterns, or self-learning
- Designing skill anatomy and structure for complex domains
- Ensuring skills improve over time through feedback loops

---

## Navigation Index

```
skill-creator/
├── SKILL.md                          ← You are here
│
├── methods/                          ← REQUIRED — All creation methods & techniques
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── domain-discovery.md           → Purpose: Extract complete domain knowledge
│   ├── anatomy-design.md             → Purpose: Structure the skill's anatomy
│   ├── fundamentals-extraction.md    → Purpose: Codify core principles & rules
│   ├── methods-codification.md       → Purpose: Document techniques with examples
│   ├── pattern-library.md            → Purpose: Build reusable pattern collection
│   ├── convention-definition.md      → Purpose: Establish domain conventions
│   ├── self-learning-design.md       → Purpose: Embed adaptive improvement
│   ├── quality-validation.md         → Purpose: Validate skill completeness
│   └── iterative-refinement.md       → Purpose: Evolve skills over time
│
├── design/                           ← Design principles & architecture rules
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── skill-architecture.md         → How to architect a skill for maximum effectiveness
│   ├── progressive-disclosure.md     → How to layer content for context efficiency
│   ├── self-learning-patterns.md     → Design patterns for adaptive skills
│   └── domain-modeling.md            → How to model domain knowledge into skill form
│
├── conventions/                      ← Conventions every created skill must follow
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── naming-and-structure.md       → Naming, structure, and format conventions
│   ├── writing-conventions.md        → How to write clear, effective skill content
│   └── quality-standards.md          → Standards for production-ready skills
│
├── scripts/                          ← Executable tools for skill creation
│   ├── README.md                     → Purpose, usage guide, content checklist
│   ├── validate-skill.sh             → Validate a skill against anatomy specification
│   ├── analyze-coverage.py           → Analyze domain knowledge coverage
│   └── generate-template.py          → Generate skill skeleton from domain analysis
│
├── sources/                          ← Reference sources and specs
│   ├── README.md                     → Purpose, usage guide, content checklist
│   └── skill-specification.md        → The agent skills specification reference
│
└── assets/                           ← Templates and output resources
    ├── README.md                     → Purpose, usage guide, content checklist
    ├── skill-skeleton.md             → Template for new skill SKILL.md structure
    ├── method-chapter-template.md    → Template for method documentation chapters
    └── self-learning-checklist.md    → Checklist for adaptive skill features
```

---

## Shorthand Method Chapters

### Chapter 1: Domain Discovery & Research

**Purpose:** Extract the complete body of knowledge a domain expert possesses so the
skill can reproduce expert-level work.

**When to use:** At the start of every new skill creation. Before writing a single line
of the skill, you must understand the domain completely.

**Where to find full method:** `methods/domain-discovery.md`

**Shorthand workflow:**
1. **Identify the domain** — Clarify what domain the worker skill operates in
2. **Enumerate knowledge areas** — List every area of expertise the domain requires:
   - Core concepts and mental models
   - Standard methods and techniques
   - Design patterns and architectural approaches
   - Domain-specific conventions and standards
   - Common pitfalls and how experts avoid them
   - Quality criteria and evaluation methods
   - Tools, frameworks, and libraries in common use
3. **Research fundamentals** — For each area, extract:
   - The fundamental principles that underpin the domain
   - The rules that must never be broken
   - The heuristics that guide decision-making
   - The trade-offs that experts navigate
4. **Validate completeness** — Ask: "Would a junior practitioner using only this skill
   produce work that an expert would approve?" If not, identify what's missing.
5. **Ask the user** — Present findings and ask: "Are there domain-specific methods,
   proprietary techniques, or team conventions I should include?"

**Critical rule:** Never skip discovery. A skill built on incomplete domain knowledge
will produce incomplete work. The skill's value comes from the depth and completeness
of its domain knowledge.

---

### Chapter 2: Skill Anatomy Design

**Purpose:** Structure the skill's directory anatomy so knowledge is organized for
efficient progressive disclosure and maximum worker effectiveness.

**When to use:** After domain discovery, before writing any skill content.

**Where to find full method:** `methods/anatomy-design.md`

**Shorthand workflow:**
1. **Map knowledge to anatomy** — Assign each knowledge area to the appropriate directory:
   - `SKILL.md` — Navigation index and shorthand method chapters (always)
   - `product/` — High-level overview of what the skill produces (if applicable)
   - `methods/` — All implementation methods with purpose, when-to-use, good/bad examples
   - `design/` — Global design patterns, principles, and rules
   - `conventions/` — All conventions to adhere to
   - `scripts/` — Executable code for logging, implementation, testing
   - `sources/` — Relevant docs, package references, online resources
   - `assets/` — Templates, icons, fonts, test fixtures
2. **Design the SKILL.md index** — Create a file tree with shorthand navigation instructions
3. **Plan shorthand chapters** — One chapter per major method, each with purpose,
   when-to-use, and where-to-find
4. **Ensure Tier 2 stays under 500 lines** — The SKILL.md body must be concise;
   detail lives in referenced files

**Critical rule:** The anatomy must match the structure in `skills-anatomy.md`. Every
optional directory is optional in presence but mandatory in quality if included.

---

### Chapter 3: Fundamentals & Principles Extraction

**Purpose:** Codify the core principles, rules, and mental models that form the
foundation of all domain work.

**When to use:** For every skill — fundamentals are non-negotiable. A worker without
fundamentals will make decisions that look correct but violate domain principles.

**Where to find full method:** `methods/fundamentals-extraction.md`

**Shorthand workflow:**
1. **Identify foundational principles** — The laws of the domain that govern all work:
   - What must always be true (invariants)
   - What must never happen (constraints)
   - What guides all decisions (heuristics)
2. **Extract mental models** — How domain experts think about problems:
   - Decomposition patterns (how experts break down complex problems)
   - Decision trees (what path experts follow and why)
   - Abstraction levels (when to think high-level vs. detail-level)
3. **Document the "why" behind rules** — Rules without reasoning get ignored.
   Every rule must explain: what happens if you violate this, and why that's bad.
4. **Create principle tests** — For each principle, define: "How would you verify
   that work produced adheres to this principle?"

**Critical rule:** Fundamentals go in `design/` and are referenced from SKILL.md.
They are loaded at Tier 3 (on demand) but should be loaded early in any complex task.

---

### Chapter 4: Methods & Techniques Codification

**Purpose:** Document every implementation method and technique the worker needs,
with good and bad examples, step-by-step procedures, and decision criteria.

**When to use:** This is the core of every skill — the "how-to" knowledge.

**Where to find full method:** `methods/methods-codification.md`

**Shorthand workflow:**
1. **Enumerate all methods** — List every technique the domain requires
2. **For each method, document:**
   - **Purpose:** What this method achieves
   - **When to use:** Specific conditions that trigger this method
   - **Procedure:** Step-by-step instructions (favor procedures over declarations)
   - **Good example:** Correct application with explanation of why it's good
   - **Bad example:** Incorrect application with explanation of what went wrong
   - **Gotchas:** Non-obvious pitfalls that catch practitioners off guard
   - **Alternatives:** When this method isn't the best choice, what to use instead
3. **Order by frequency** — Most commonly used methods first in SKILL.md shorthand
4. **Cross-reference** — Link related methods and note when multiple methods apply

**Critical rule:** Every method must include both good and bad examples. Workers learn
as much from seeing what not to do as from seeing what to do.

---

### Chapter 5: Pattern Library Construction

**Purpose:** Build a reusable collection of design patterns, architectural patterns,
and implementation patterns that the worker can apply to solve common problems.

**When to use:** When the domain has recurring problems with proven solution structures.

**Where to find full method:** `methods/pattern-library.md`

**Shorthand workflow:**
1. **Identify recurring problems** — What situations come up repeatedly in this domain?
2. **Document each pattern:**
   - **Problem statement:** What situation this pattern addresses
   - **Solution structure:** The general form of the solution
   - **Implementation guide:** How to apply the pattern step-by-step
   - **Consequences:** Benefits and trade-offs of using this pattern
   - **When NOT to use:** Situations where this pattern is counterproductive
3. **Organize by abstraction level:**
   - Architectural patterns (system-level decisions)
   - Design patterns (component-level decisions)
   - Implementation patterns (code-level decisions)
4. **Provide composition rules** — How patterns combine, which conflict, which enhance

**Critical rule:** Patterns must be actionable, not theoretical. Each pattern must
include a concrete example of its application in the target domain.

---

### Chapter 6: Convention Definition

**Purpose:** Establish all conventions the worker must follow — naming, formatting,
structural, stylistic, and domain-specific conventions.

**When to use:** When the domain has established conventions, or when the user's
team/project has specific conventions to enforce.

**Where to find full method:** `methods/convention-definition.md`

**Shorthand workflow:**
1. **Identify convention categories:**
   - **Naming conventions:** How things are named (files, variables, components)
   - **Structural conventions:** How things are organized (directory layout, file structure)
   - **Style conventions:** How things are formatted (code style, document style)
   - **Process conventions:** How work is done (workflow steps, review processes)
   - **Domain conventions:** Standards specific to the domain (design standards, etc.)
2. **For each convention, document:**
   - The rule (what must be done)
   - The rationale (why it matters)
   - Examples of correct application
   - Examples of violations
   - How to verify compliance
3. **Prioritize** — Which conventions are mandatory vs. recommended vs. preferred
4. **Include enforcement methods** — Scripts, linters, or checklists that verify conventions

**Critical rule:** Conventions without rationale get questioned and ignored. Always
explain why a convention exists and what happens when it's violated.

---

### Chapter 7: Self-Learning & Adaptive Design

**Purpose:** Embed mechanisms that allow the skill to improve over time by learning
from outcomes, recognizing better methods, and providing feedback for evolution.

**When to use:** Every skill must include self-learning capabilities. A static skill
degrades as methods evolve and better approaches are discovered.

**Where to find full method:** `methods/self-learning-design.md`

**Shorthand workflow:**
1. **Design feedback collection:**
   - Track what methods were applied and their outcomes
   - Note when the worker had to deviate from documented methods
   - Record when the user corrected or redirected the worker's approach
   - Log cases where no documented method covered the situation
2. **Design improvement triggers:**
   - When a better approach is spotted in external sources
   - When a documented method consistently produces suboptimal results
   - When a new pattern emerges from repeated successful solutions
   - When domain conventions evolve (new standards, deprecated practices)
3. **Design feedback mechanisms:**
   - Provide the user with a "skill improvement report" when issues are spotted
   - Suggest specific changes to methods, patterns, or conventions
   - Flag contradictions between documented methods and observed best practices
   - Recommend new methods or patterns to codify
4. **Design adaptation points:**
   - Method selection: When multiple methods apply, which performed better?
   - Pattern application: Which patterns led to the best outcomes?
   - Convention updates: Which conventions caused friction without benefit?
   - Knowledge gaps: What situations arose that no method covered?

**Critical rule:** Self-learning is not optional. Every skill must include at minimum:
(1) a mechanism to detect when current methods are insufficient, and (2) a feedback
channel to the user for skill improvement.

---

### Chapter 8: Quality Validation & Evaluation

**Purpose:** Validate that the created skill is complete, correct, and will produce
high-quality work. Ensure nothing critical is missing.

**When to use:** After initial skill creation, after any skill update, and periodically
to ensure the skill hasn't drifted from best practices.

**Where to find full method:** `methods/quality-validation.md`

**Shorthand workflow:**
1. **Completeness check:**
   - Are all domain knowledge areas covered?
   - Does every method have purpose, when-to-use, good/bad examples?
   - Are all conventions documented with rationale?
   - Are all fundamental principles explained with "why"?
   - Is the self-learning mechanism fully designed?
2. **Structure validation:**
   - Does the anatomy match `skills-anatomy.md`?
   - Is SKILL.md under 500 lines?
   - Are file references one level deep from skill root?
   - Do shorthand chapters link to detailed files correctly?
3. **Quality assessment:**
   - Would a worker using this skill produce expert-level output?
   - Are the examples clear and domain-accurate?
   - Are gotchas comprehensive and specific?
   - Can a worker navigate to the right method for any given task?
4. **Run validation script:** `scripts/validate-skill.sh <skill-path>`

**Critical rule:** A skill that passes validation must be sufficient for a worker to
produce high-quality work without additional domain knowledge from the user.

---

### Chapter 9: Iterative Refinement & Evolution

**Purpose:** Continuously improve the skill based on real-world usage, feedback,
and evolving domain knowledge.

**When to use:** After the skill has been used for real tasks, and whenever the
self-learning mechanisms surface improvement opportunities.

**Where to find full method:** `methods/iterative-refinement.md`

**Shorthand workflow:**
1. **Collect signals:**
   - User corrections and redirections
   - Tasks where the worker struggled or produced suboptimal output
   - New methods or patterns discovered during work
   - Changes in domain conventions or standards
2. **Analyze patterns:**
   - Are certain methods consistently producing issues?
   - Are there gaps where no method covers a common situation?
   - Are conventions causing friction without adding value?
   - Are examples still accurate and relevant?
3. **Prioritize improvements:**
   - Critical: Methods that produce incorrect results
   - High: Knowledge gaps that block common tasks
   - Medium: Better methods or patterns discovered
   - Low: Style improvements or minor clarifications
4. **Apply improvements:**
   - Update method documentation with better approaches
   - Add new methods or patterns discovered
   - Revise conventions that caused issues
   - Enhance examples with real-world cases
5. **Validate changes:** Re-run quality validation after any update

**Critical rule:** Treat the skill as a living document. Every use is an opportunity
to learn and improve. The skill should get better with every interaction.

---

## Gotchas

- **Never create a skill without domain discovery.** The user may ask you to "just create
  a skill for X" but a skill without deep domain knowledge is worse than no skill — it
  gives false confidence while producing mediocre work.

- **Progressive disclosure is mandatory.** Do not stuff everything into SKILL.md. The
  index + shorthand chapters pattern exists to keep Tier 2 under 500 lines while giving
  the worker access to deep knowledge at Tier 3.

- **Good examples need bad examples.** A method with only correct examples teaches the
  worker what to do but not what to avoid. Every method must show both.

- **Fundamentals before techniques.** A worker who knows techniques without fundamentals
  will apply them incorrectly in novel situations. Principles guide method selection.

- **Self-learning is not an add-on.** It must be woven into the skill's design from the
  start, not bolted on at the end. Design the feedback loops alongside the methods.

- **The anatomy in `skills-anatomy.md` is the target.** Every skill you create must
  conform to this anatomy. Deviation is only acceptable when the user explicitly requests
  it and understands the trade-offs.

- **Ask before assuming.** When uncertain about domain specifics, team conventions, or
  method preferences, ask the user. A skill built on assumptions will conflict with
  actual practice.

- **Conventions change.** Document the date/version of conventions and include the
  self-learning trigger to detect when they've become outdated.

- **Methods are required.** Never create a worker skill without a `methods/` directory
  containing at least one method file. A worker without methods is a reference manual,
  not a practitioner. Methods are how the worker actually solves problems.

---

## Task Tracking System

When creating a skill, you MUST maintain a running task list. Present the current status
at the start of each major step and re-present the full list whenever the user asks
"status", "progress", "where are we", or "task list". Mark completed items with ✅.

**Full Task List:**

### Phase 1: Discovery & Planning

- [ ] **T1.1** Identify the target domain and skill purpose
- [ ] **T1.2** Enumerate all domain knowledge areas (concepts, methods, patterns, conventions, pitfalls, tools)
- [ ] **T1.3** Research domain fundamentals (principles, invariants, heuristics, mental models)
- [ ] **T1.4** Research domain methods (standard techniques, procedures, decision criteria)
- [ ] **T1.5** Research domain patterns (recurring problems, proven solutions)
- [ ] **T1.6** Research domain conventions (naming, structure, style, process, standards)
- [ ] **T1.7** Present discovery findings to user for validation and gap identification
- [ ] **T1.8** Incorporate user feedback and domain-specific knowledge
- [ ] **T1.9** User confirms discovery is complete

### Phase 2: Anatomy & Structure

- [ ] **T2.1** Map knowledge areas to directory structure (methods/, design/, conventions/, etc.)
- [ ] **T2.2** Design SKILL.md navigation index
- [ ] **T2.3** Identify shorthand chapters needed (one per major method)
- [ ] **T2.4** Create directory skeleton with README.md in each subfolder
- [ ] **T2.5** User confirms anatomy design

### Phase 3: Core Content Creation

- [ ] **T3.1** Write fundamentals and principles in `design/`
- [ ] **T3.2** Write ALL methods in `methods/` — each with: purpose, when-to-use, procedure, good example, bad example, gotchas, alternatives
- [ ] **T3.3** Verify every method has both good AND bad examples
- [ ] **T3.4** Write design patterns in `design/` (if domain has recurring structures)
- [ ] **T3.5** Write conventions in `conventions/` — each with: rule, rationale, examples, verification
- [ ] **T3.6** Write sources and references in `sources/`
- [ ] **T3.7** Create templates and assets in `assets/`
- [ ] **T3.8** Create scripts in `scripts/` (validation, tooling)

### Phase 4: SKILL.md Authoring

- [ ] **T4.1** Write YAML frontmatter (name, description, optional fields)
- [ ] **T4.2** Write navigation index with file tree
- [ ] **T4.3** Write all shorthand method chapters (purpose, when-to-use, where-to-find)
- [ ] **T4.4** Write gotchas section with domain-specific pitfalls
- [ ] **T4.5** Verify SKILL.md body is under 500 lines

### Phase 5: Self-Learning Integration

- [ ] **T5.1** Design feedback collection mechanism (what to track, how to surface)
- [ ] **T5.2** Define improvement triggers (performance, external, pattern, convention)
- [ ] **T5.3** Design feedback channels (improvement reports, contradiction flags, gap alerts)
- [ ] **T5.4** Identify adaptation points (method selection, pattern application, convention updates)
- [ ] **T5.5** Embed self-learning references in methods and conventions
- [ ] **T5.6** User confirms self-learning design

### Phase 6: Validation & Delivery

- [ ] **T6.1** Run completeness check (all knowledge areas covered?)
- [ ] **T6.2** Run structure validation (anatomy matches spec, file refs one level deep?)
- [ ] **T6.3** Run quality assessment (examples clear, gotchas comprehensive, methods navigable?)
- [ ] **T6.4** Run `scripts/validate-skill.sh` against created skill
- [ ] **T6.5** Run `scripts/analyze-coverage.py` for coverage score
- [ ] **T6.6** Fix all FAIL issues, address all WARN issues
- [ ] **T6.7** Present completed skill to user for final review
- [ ] **T6.8** Incorporate final user feedback
- [ ] **T6.9** User approves skill as production-ready

### Phase 7: Iterative Refinement Setup

- [ ] **T7.1** Document how to collect usage signals
- [ ] **T7.2** Establish improvement prioritization framework
- [ ] **T7.3** Create feedback loop documentation for ongoing refinement
- [ ] **T7.4** Hand off skill with improvement instructions to user

---

**How to use this list:**

1. Announce start/completion of each task: "Starting **T3.2**..." / "Completed **T3.2** ✅"
2. Re-display status at session start and when user asks for progress
3. Never mark complete until quality criteria pass; adjust if user skips/reorders

**Progress summary format:**
```
Phase 1: Discovery & Planning       [█████████░] 8/9  — Awaiting user confirmation
Phase 2: Anatomy & Structure        [░░░░░░░░░░] 0/5
Phase 3: Core Content Creation      [░░░░░░░░░░] 0/8
...                                                                  (continue per phase)
```