# Sources

## Purpose

The `sources/` directory houses reference documentation, package docs, API specifications, online resource links, and any external knowledge the worker needs to consult during its work.

This folder acts as the worker's library—a curated collection of pointers to the information that exists outside the skill itself.

---

## Why It's Used

No skill can contain all knowledge inline. Skills are designed to be focused and actionable, not encyclopedic. Sources provide the worker with pointers to external documentation it can consult when it needs deeper detail than what's in the skill itself.

Sources bridge the gap between:
- **"What you need to know"** — the skill's methods and procedures
- **"Where to find the full details"** — the external references and documentation

Without sources, the worker would either need to hallucinate details or fail when encountering situations requiring specific external knowledge.

---

## When to Use It

Consult the sources directory when:

- **The worker needs detailed API documentation** — endpoint specifications, authentication flows, rate limits
- **Referencing package-specific behavior or configuration** — how a library handles edge cases, configuration options
- **Looking up syntax, parameters, or options** — CLI flags, function signatures, configuration keys
- **The skill references external standards or specifications** — protocols, file formats, industry standards
- **Self-learning discovers new resources worth adding** — new APIs discovered, updated documentation found

---

## What to Add Here

Each source file should contain the following information:

### Required Fields

| Field | Description |
|-------|-------------|
| **Source Title** | Clear, descriptive name of the resource |
| **Description** | Brief summary of what the source contains |
| **Resource Type** | One of: `specification`, `api-docs`, `tutorial`, `reference`, `package-docs` |
| **URL or File Reference** | Where to find the resource (link or path) |
| **Scope** | What the resource covers |
| **When to Consult** | Specific situations where this source is useful |

### Recommended Fields

| Field | Description |
|-------|-------------|
| **Key Sections** | Most relevant parts to focus on |
| **Last Verified** | Date when the source was last checked for accuracy |
| **Priority** | How critical this source is (`high`, `medium`, `low`) |

### Source File Template

```markdown
# [Source Title]

**Type:** [specification | api-docs | tutorial | reference | package-docs]
**URL:** [link to resource]
**Last Verified:** YYYY-MM-DD

## Description
[Brief description of the resource]

## Scope
[What this resource covers]

## When to Consult
- [Situation 1]
- [Situation 2]

## Key Sections
- [Section 1]: [Why it's important]
- [Section 2]: [Why it's important]
```

---

## Organization

Organize sources by category using subdirectories or naming conventions:

```
sources/
├── api/              # API documentation and specifications
├── packages/         # Package and library documentation
├── standards/        # External standards and protocols
├── tutorials/        # Step-by-step guides and walkthroughs
└── reference/        # General reference materials
```

---

## Where to Find Detailed Instructions

For more information on creating and maintaining sources:

| Topic | Location |
|-------|----------|
| Domain discovery method | `methods/domain-discovery.md` |
| Quality standards | `conventions/quality-standards.md` |
| Self-learning design | `methods/self-learning-design.md` |

---

## Post-Creation Checklist

After adding sources, verify:

- [ ] All critical external references are documented
- [ ] Each source has a description and scope
- [ ] URLs are valid and accessible
- [ ] When-to-consult guidance is included
- [ ] Sources are organized by category
- [ ] Staleness detection dates are set (`Last Verified`)
- [ ] Sources referenced from methods/design link correctly