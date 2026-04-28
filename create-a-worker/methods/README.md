# Methods Directory

## Purpose

This directory houses ALL implementation methods and techniques that the skill-creator uses to build worker skills. Methods are the operational core of any worker skill — without them, a worker cannot solve problems.

This is why `methods/` is **REQUIRED** in every skill. A worker skill without methods is like a craftsman without tools: knowledgeable but powerless to act.

---

## Why It's Used

Methods translate domain knowledge into actionable procedures. Consider the difference:

- **With principles only**: A worker knows *what* should be done ("Code should be maintainable")
- **With methods**: A worker knows *how* to do it ("Step 1: Identify code smells. Step 2: Refactor using these specific patterns...")

Methods provide the step-by-step procedures, good/bad examples, gotchas, and decision criteria that enable a worker to actually implement solutions. They bridge the gap between knowing and doing.

---

## When to Use It

### During Skill Creation
Every method the skill-creator itself needs lives here. When building a new worker skill, the skill-creator references these methods to understand how to codify domain expertise.

### During Skill Usage
The created worker skill's `methods/` directory is where the worker finds "how-to" knowledge for every task. When a worker encounters a problem, it searches methods for the relevant procedure.

### During Skill Refinement
New methods discovered through self-learning are added here. As workers gain experience, they identify gaps in existing methods or discover entirely new approaches that should be codified.

---

## What to Add Here

Each file in `methods/` must contain these sections:

```markdown
# Method Name

## Purpose
What this method achieves in 1-2 sentences.

## When to Use
Specific conditions that trigger this method.
Be precise: "When handling API rate limits" not "When working with APIs."

## Procedure
1. First action (one action per step)
2. Second action
3. Third action
...

## Good Example
[Correct application with explanation of why it works]

## Bad Example
[Incorrect application with explanation of what went wrong]

## Gotchas
- Non-obvious pitfall #1
- Non-obvious pitfall #2

## Alternatives
- When this method isn't the best choice, consider...

## Self-Learning Integration
How this method could be improved over time through experience.
```

### Example Method File Structure

```markdown
# Error Handling in API Calls

## Purpose
Provides a reliable pattern for handling HTTP errors when calling external APIs.

## When to Use
- When making any external API request
- When wrapping third-party library calls
- When implementing retry logic for flaky services

## Procedure
1. Wrap the API call in a try-catch block
2. Check the response status code
3. For 4xx errors, log and return a user-friendly message
4. For 5xx errors, implement exponential backoff retry
5. After max retries, log the failure and notify monitoring

## Good Example
[Shows proper retry with backoff, clear error messages, and monitoring integration]

## Bad Example
[Shows bare try-catch that swallows errors silently]

## Gotchas
- Rate limits (429) should use the Retry-After header, not exponential backoff
- Network timeouts aren't the same as server errors

## Alternatives
- Circuit breaker pattern for chronic failures
- Bulkhead pattern for isolating failures

## Self-Learning Integration
Track which error types occur most frequently to optimize retry strategies.
```

---

## Where to Find Detailed Instructions

| Resource | Location | Purpose |
|----------|----------|---------|
| Method chapter template | `assets/method-chapter-template.md` | Full documentation format |
| Method codification technique | `methods/methods-codification.md` | How to extract and codify methods |
| Writing conventions | `conventions/writing-conventions.md` | Style and formatting rules |

---

## Post-Creation Checklist

After the skill-creator runs, verify:

- [ ] Every domain method has a corresponding file in `methods/`
- [ ] Each method file has all required sections (purpose, when-to-use, procedure, good example, bad example, gotchas, alternatives)
- [ ] Every method has **BOTH** a good AND a bad example
- [ ] Procedures use numbered steps with one action per step
- [ ] Methods are cross-referenced where they relate to each other
- [ ] Self-learning integration is documented for each method
- [ ] Methods are ordered by frequency of use (most common first)
- [ ] No method file exceeds 400 lines (split if needed)
- [ ] All method file names use kebab-case and are descriptive
- [ ] `SKILL.md` shorthand chapters accurately summarize each method

---

## Current Methods

| Method | File | Description |
|--------|------|-------------|
| Anatomy Design | `anatomy-design.md` | Structuring skill anatomy |
| Convention Definition | `convention-definition.md` | Creating writing conventions |
| Domain Discovery | `domain-discovery.md` | Exploring domain knowledge |
| Fundamentals Extraction | `fundamentals-extraction.md` | Extracting core concepts |
| Iterative Refinement | `iterative-refinement.md` | Improving skills over time |
| Methods Codification | `methods-codification.md` | Codifying methods |
| Pattern Library | `pattern-library.md` | Building reusable patterns |
| Quality Validation | `quality-validation.md` | Ensuring skill quality |
| Self-Learning Design | `self-learning-design.md` | Enabling autonomous improvement |

---

*Methods are the engine of worker skills. Without them, knowledge remains theoretical. With them, workers can act decisively and correctly.*