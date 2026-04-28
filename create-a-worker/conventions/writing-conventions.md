# Writing Conventions

Standards for writing clear, actionable, and efficient skill content that
enables an apprentice-level practitioner to produce expert-level work.

---

## Voice and Tone

### Expert-to-Apprentice Voice

Write as a senior practitioner mentoring a capable but inexperienced colleague.

**Characteristics of the voice:**
- Direct and confident
- Instructional without being condescending
- Authoritative without being authoritarian
- Practical rather than theoretical
- Assumes intelligence, not experience

**Do:**
- State rules definitively
- Explain the "why" behind non-obvious rules
- Acknowledge when trade-offs exist
- Provide context for decisions

**Do Not:**
- Hedge with "you might want to" or "consider"
- Over-explain basic concepts
- Use academic or overly formal language
- Assume prior domain expertise
- Write in passive voice

---

## Imperative Phrasing

All instructions use imperative mood. State what to do, not what could be done.

### Correct Imperative Form

```text
Create a new file named `config.json`.
Add the `timeout` property to the configuration.
Run the test suite before committing.
```

### Incorrect Forms to Avoid

```text
You should create a new file named `config.json`.      # Too soft
The file config.json needs to be created.              # Passive
It is recommended to add the timeout property.         # Hedging
Consider running the test suite before committing.     # Uncertain
```

### When to Use Non-Imperative Forms

Use descriptive voice only when:
- Explaining concepts, not giving instructions
- Describing system behavior
- Providing background context
- Stating principles or conventions

---

## Writing Procedures

Procedures are step-by-step instructions that accomplish a specific task.

### Procedure Structure

Every procedure must include:
1. **Title**: Clear statement of the outcome
2. **Prerequisites**: What must be true before starting
3. **Steps**: Numbered, sequential actions
4. **Verification**: How to confirm success

### Step Writing Rules

**One action per step.** Do not combine multiple operations.

```text
GOOD:
1. Open the configuration file.
2. Locate the `database` section.
3. Set the `pool_size` value to `10`.

BAD:
1. Open the configuration file and set the pool_size to 10 in the database section.
```

**Start with a verb.** Each step begins with an action word.

```text
GOOD:
1. Navigate to the project root.
2. Run `npm install`.
3. Verify the installation completed without errors.

BAD:
1. The project root is where you navigate.
2. npm install should be run.
3. Check if installation worked.
```

**Include expected output.** When a command produces important output, show it.

```text
4. Run the validation script:
   ```bash
   npm run validate
   ```
   Expected output:
   ```
   ✓ All checks passed
   ```
```

**Specify error handling.** Note what to do if a step fails.

```text
5. Run the database migration:
   ```bash
   npm run migrate
   ```
   If migration fails, check the database connection settings in `.env`.
```

---

## Writing Gotchas

Gotchas document non-obvious pitfalls that cause significant problems.

### Gotcha Structure

Every gotcha must contain three elements:
1. **Problem**: What goes wrong
2. **Impact**: Why it matters
3. **Correct Approach**: What to do instead

### Gotcha Format

```markdown
### Gotcha: [Descriptive Name]

**Problem:** [What the practitioner might do wrong]

**Impact:** [What breaks or degrades as a result]

**Correct Approach:** [What to do instead]

[Optional: Code example showing correct approach]
```

### Gotcha Example

```markdown
### Gotcha: Async Operation Without Await

**Problem:** Calling an async function without `await` causes the promise
to float unhandled.

**Impact:** Errors are silently swallowed. The function appears to complete
successfully but may have failed. Debugging becomes extremely difficult
because failures have no stack trace at the call site.

**Correct Approach:** Always `await` async functions or explicitly handle
the promise with `.catch()`.

```typescript
// WRONG
async function processData() {
  saveToDatabase(data);  // Floats away!
  return { status: 'saved' };
}

// CORRECT
async function processData() {
  await saveToDatabase(data);
  return { status: 'saved' };
}
```
```

---

## Writing Example Pairs

Good/bad example pairs demonstrate correct and incorrect approaches side by side.

### Example Pair Structure

```markdown
[Context line explaining what the example demonstrates]

```[language]
// BAD
[Incorrect implementation]
```

```[language]
// GOOD  
[Correct implementation]
```

[Explanation of the difference]
```

### Example Pair Rules

1. **Show bad first, good second.** This creates a "problem → solution" flow.
2. **Minimal examples.** Include only the code relevant to the point.
3. **Annotate the difference.** Briefly explain why the good version is better.
4. **Same scenario.** Both examples must solve the same problem.
5. **Realistic code.** Use plausible variable names and logic.

### Example Pair Annotations

```markdown
The good version avoids the race condition by using a single atomic update
operation instead of separate read and write steps.
```

Keep annotations to one or two sentences. Link to detailed explanations
elsewhere if needed.

---

## Writing Principles

Principles state fundamental rules that guide decision-making.

### Principle Structure

Every principle must contain:
1. **Rule**: The directive
2. **Rationale**: Why the rule exists
3. **Consequence**: What happens if you violate it

### Principle Format

```markdown
### [Principle Name]

[Rule statement]

**Rationale:** [Why this rule exists]

**Consequence:** [What happens when violated]
```

### Principle Example

```markdown
### Single Source of Truth

Every piece of knowledge must have a single, authoritative representation
within the system.

**Rationale:** Duplicate knowledge inevitably diverges. When the same
information exists in multiple places, updates get missed and
inconsistencies emerge.

**Consequence:** Violating this principle leads to conflicting configurations,
stale documentation, and unpredictable behavior that wastes debugging time.
```

---

## Writing Conventions

Conventions specify mandatory practices with their justification.

### Convention Structure

Every convention must contain:
1. **Rule**: What must be done
2. **Why**: The justification
3. **Examples**: Correct application
4. **Verification**: How to check compliance

### Convention Format

```markdown
### [Convention Name]

[Rule statement]

**Why:** [Justification]

**Examples:**
[Correct usage examples]

**Verification:** [How to verify compliance]
```

### Convention Example

```markdown
### Use Typed Constants for Magic Values

All magic values (numbers, strings) must be extracted into named constants
with explicit types.

**Why:** Named constants document intent, enable IDE navigation, and make
future changes safe through single-point-of-edit.

**Examples:**
```typescript
const MAX_RETRY_ATTEMPTS: number = 3;
const DEFAULT_TIMEOUT_MS: number = 5000;
const API_BASE_URL: string = 'https://api.example.com/v2';
```

**Verification:** Search for numeric literals other than 0, 1, or -1 and
string literals in logic. All should reference named constants.
```

---

## Progressive Disclosure

Skill content uses a layered approach: summary first, details on demand.

### Layer 1: SKILL.md (Shorthand)

The SKILL.md file contains:
- One-line summaries of each concept
- Cross-references to detailed files
- Quick-reference tables
- Essential rules only

### Layer 2: Detail Files

Individual files contain:
- Full explanations
- Complete examples
- Edge cases and gotchas
- Rationale and context

### Layer 3: Sources (When Needed)

External references for:
- Official documentation links
- Standards specifications
- Academic papers or deep dives

### Writing for Progressive Disclosure

**In SKILL.md:**
```markdown
See `conventions/naming.md` for complete naming rules.
```

**In the detail file:**
```markdown
# Naming Conventions

Complete rules for naming files, variables, and modules...

[Full content here]
```

**Never duplicate content.** If information exists in a detail file,
SKILL.md should reference it, not repeat it.

---

## Markdown Formatting Standards

### Document Structure

```markdown
# Title

Brief introduction paragraph.

---

## Section Title

Section content.

### Subsection Title

Subsection content.
```

### Horizontal Rules

Use `---` to separate major sections. Not between every subsection.

### Headers

- H1 (`#`): Document title only
- H2 (`##`): Major sections
- H3 (`###`): Subsections
- H4 (`####`): Rarely, for deep nesting

**Do not skip levels.** Do not jump from H2 to H4.

### Lists

```markdown
- Unordered lists for items without sequence
- Each item starts with a capital letter
- No period at end of list items

1. Ordered lists for sequential steps
2. Each step starts with a capital letter
3. One action per item
```

### Code Blocks

````markdown
```language
code here
```
````

Always specify the language for syntax highlighting.

### Inline Code

Use backticks for:
- File names: `config.json`
- Command names: `npm install`
- Variable names: `pool_size`
- Function names: `processData()`
- Paths: `src/utils/helpers.ts`

### Emphasis

- **Bold** for important terms on first introduction
- *Italic* rarely, for subtle emphasis
- Never use for decoration

### Tables

Use tables for structured reference data:

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Value 1  | Value 2  | Value 3  |
```

---

## Token Efficiency Guidelines

### Minimize Redundancy

**Do not repeat yourself.** State a rule once, reference it thereafter.

```text
GOOD:
"Follow the naming conventions in `conventions/naming.md`."

BAD:
"Use lowercase with hyphens for file names (see naming rules), use
lowercase with hyphens for directory names (see naming rules), use
lowercase with hyphens for branch names..."
```

### Prefer Examples Over Explanation

A good example replaces paragraphs of explanation.

```text
GOOD:
"Name files using kebab-case:

\`\`\`
user-authentication.ts
api-client.ts
database-connection.ts
\`\`\`"

BAD:
"Files should be named using lowercase letters with hyphens separating
words. This means all letters should be lowercase, and words should not
be concatenated but rather separated by the hyphen character..."
```

### Use Cross-References

Link to existing content rather than restating it.

```text
"For error handling patterns, see `methods/error-handling.md`."
```

### Be Specific

Specific instructions save tokens over vague ones that require clarification.

```text
GOOD:
"Set `timeout` to `5000` (milliseconds)."

BAD:
"Set the timeout to an appropriate value based on your requirements."
```

### Omit the Obvious

Do not document what the audience already knows or what is self-evident.

```text
GOOD:
"Config structure:

\`\`\`yaml
database:
  host: string
  port: number
\`\`\`"

BAD:
"Config structure - note that YAML uses indentation and key-value pairs
separated by colons:

\`\`\`yaml
database:
  host: string   # The host is a string value
  port: number   # The port is a number value
\`\`\`"
```

### Use Abbreviations Consistently

Define once, use throughout:
- Config (not configuration)
- Dir (not directory) in paths only
- Env (not environment)
- Auth (not authentication)

### Consolidate Related Rules

Group related rules into a single section rather than scattering them.

```text
GOOD: "Naming Conventions" section with all naming rules.

BAD: File naming in one section, variable naming in another, function
naming in a third, all following the same pattern.
```
