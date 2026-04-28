# Assets

## Purpose

The `assets/` directory houses static resources used in output generation, feature implementation, and testing. This includes templates, configuration files, test fixtures, sample data, diagrams, icons, fonts, and any non-executable files the worker needs to function effectively.

Assets are the building blocks that enable consistent, high-quality output without reinventing the wheel each time.

---

## Why It's Used

Assets provide consistent starting points and reference materials for the worker. Rather than generating boilerplate from scratch each time, the worker uses templates. Rather than inventing test data, the worker uses fixtures.

**Benefits:**
- **Consistency** — Templates ensure uniform structure across outputs
- **Efficiency** — Pre-built resources reduce generation time
- **Accuracy** — Tested fixtures provide reliable reference data
- **Quality** — Curated assets maintain high standards

Assets ensure consistency and reduce errors in repetitive output patterns.

---

## When to Use It

Refer to assets when:

- **Generating output from a template** — Use skeleton templates for new skills or method chapters
- **Test fixtures or sample data are needed** — Load realistic data for testing and examples
- **Configuration templates are needed** — Reference standard configurations
- **Visual resources are referenced** — Access diagrams, icons, or other visual assets
- **A consistent starting point is needed** — Use templates for common output formats

---

## What to Add Here

Asset files should follow these guidelines:

### Naming Conventions
- Use **descriptive, kebab-case filenames** (e.g., `skill-skeleton.md`, `method-chapter-template.md`)
- Be specific and clear about the asset's purpose

### Documentation
- Include a **brief comment or header** explaining what the asset is for
- Be **self-documenting** with clear placeholders and instructions
- Add **usage notes** when the purpose isn't immediately obvious

### File Considerations
- Keep files **small enough to load efficiently** (avoid large binary files)
- Use text-based formats when possible for transparency and editability
- Organize complex assets into subdirectories if needed

### Quality Standards
- Test fixtures should represent **realistic scenarios**
- Templates should cover **all common output patterns**
- Placeholders should be **clearly marked** with instructions

---

## Where to Find Detailed Instructions

| Resource | Location |
|----------|----------|
| Skill skeleton template | `assets/skill-skeleton.md` |
| Method chapter template | `assets/method-chapter-template.md` |
| Self-learning checklist | `assets/self-learning-checklist.md` |
| Writing conventions | `conventions/writing-conventions.md` |

---

## Post-Creation Checklist

After adding or modifying assets, verify the following:

- [ ] All templates have clear placeholder values and instructions
- [ ] Assets are referenced correctly from `SKILL.md` and methods
- [ ] File sizes are reasonable (assets load efficiently)
- [ ] Asset filenames use kebab-case and are descriptive
- [ ] Usage notes are included for non-obvious assets
- [ ] Test fixtures represent realistic scenarios
- [ ] Templates cover all common output patterns

---

## Examples

### Good Asset File
```
# Method Chapter Template
# Used to generate consistent method documentation
# Replace all {{PLACEHOLDER}} values with actual content

## {{METHOD_NAME}}

### Purpose
{{Describe what this method does}}

### Steps
1. {{Step 1 description}}
2. {{Step 2 description}}
```

### Poor Asset File
```
template.md
(No description, no clear placeholders)
```

---

*Assets are the foundation of consistent, reliable output. Invest time in creating clear, well-documented assets.*