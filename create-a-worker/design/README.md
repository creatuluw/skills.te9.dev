# Design Principles

## Purpose

This directory houses all design principles, architectural rules, and domain modeling patterns that govern how work should be structured and decisions should be made within the skill-creator domain.

Design files are the canonical source of truth for "why we do things this way." They provide the reasoning behind conventions, methods, and patterns used throughout this skill.

---

## Why It's Used

Design principles guide decision-making when multiple valid approaches exist. Without clear design principles:

- Workers make ad-hoc decisions that may work individually but create inconsistency across the project
- Technical debt accumulates as short-term choices diverge from long-term goals
- Architectural problems emerge when components follow different paradigms
- Reviews become subjective ("I don't like this") rather than objective ("this violates principle X")
- Onboarding requires more time as implicit knowledge isn't documented

**Design files provide the "why behind the how."**

Conventions tell you *what* to do. Methods tell you *how* to do it. Design principles tell you *why* it should be done that way.

---

## When to Use It

Consult this directory:

- **When facing an architectural or design decision** — principles should guide your choice
- **When evaluating whether an approach aligns with domain principles** — check compliance
- **When multiple methods could apply** — let design principles guide selection
- **When reviewing work for quality** — verify adherence to documented principles
- **When onboarding new workers** — principles provide foundational understanding
- **When resolving disagreements** — principles serve as objective arbitration

---

## What to Add Here

Each file in this directory should document a principle or set of related principles using the following structure:

### Required Sections

1. **Clear principle/rule name as title** — Use a descriptive, memorable name (e.g., "Single Source of Truth", "Explicit Over Implicit")

2. **The principle stated precisely** — One or two sentences that capture the core rule

3. **Why this principle matters (rationale)** — Explain the reasoning and what benefits adherence provides

4. **What happens when violated (consequences)** — Describe the negative outcomes, bugs, or maintenance burden that result

5. **Examples of correct adherence** — Show concrete instances of the principle applied correctly

6. **Examples of violations** — Show concrete instances where the principle was broken and the problems caused

7. **How to verify compliance (tests/checks)** — Provide actionable methods to check if work follows this principle

8. **Relationships to other principles** — Note any dependencies, tensions, or synergies with other documented principles

### File Naming Convention

- Use kebab-case: `single-source-of-truth.md`
- Name files after the primary principle they document
- Group related principles in a single file if they're tightly coupled

---

## Where to Find Detailed Instructions

| Resource | Location | Description |
|----------|----------|-------------|
| Fundamentals extraction method | `methods/fundamentals-extraction.md` | How to extract and distill design principles from domain expertise |
| Domain modeling | `design/domain-modeling.md` | Patterns and rules for modeling the domain accurately |
| Skill architecture | `design/skill-architecture.md` | Structural principles governing how skills are organized |
| Writing conventions | `conventions/writing-conventions.md` | Formatting and style rules for documentation |

---

## Post-Creation Checklist

After creating or updating design principle files, verify:

- [ ] All foundational domain principles are documented
- [ ] Each principle has rationale (why it matters)
- [ ] Each principle has consequences (what happens when violated)
- [ ] Mental models and decision trees are included where appropriate
- [ ] Principles are testable (verification method defined)
- [ ] No principle contradicts another (consistency check performed)
- [ ] Principles are ordered by importance/frequency of application
- [ ] Cross-references to related methods and patterns exist
- [ ] SKILL.md references the design/ directory appropriately

---

## Maintenance Notes

Design principles should be:
- **Stable** — They shouldn't change frequently; if they do, they may be tactics rather than principles
- **Reviewed regularly** — Ensure they remain relevant and don't contradict new additions
- **Versioned** — If a principle evolves, document the change and rationale
- **Practical** — Every principle must have clear verification methods; if you can't verify it, it's too abstract