# Naming and Structure Conventions

This document defines the naming and structural conventions that every created skill must follow. These conventions ensure consistency, discoverability, and maintainability across all skills in the studio.

---

## Skill Directory Naming Rules

Skill directory names serve as unique identifiers and must follow strict naming conventions:

### Rules

1. **Lowercase only**: All characters must be lowercase ASCII letters (a-z)
2. **Hyphen-separated**: Use hyphens (`-`) to separate words, not underscores or spaces
3. **No leading or trailing hyphens**: The name must not start or end with a hyphen
4. **No consecutive hyphens**: Never use two or more hyphens in a row
5. **Length**: Between 1 and 64 characters inclusive
6. **Allowed characters**: Only lowercase letters (a-z), digits (0-9), and hyphens (-)
7. **No reserved names**: Avoid names that conflict with system directories or common utilities

### Valid Examples

```
react-component-builder
api-integration-testing
data-pipeline-orchestration
ml-model-training
css-animation-patterns
debugging-node-js
```

### Invalid Examples

```
React-Component-Builder    # Uppercase letters
react_component_builder    # Underscores instead of hyphens
react--component           # Consecutive hyphens
-react-components          # Leading hyphen
api-testing-               # Trailing hyphen
API Testing                # Spaces and uppercase
```

### Verification Pattern

```regex
^[a-z0-9]([a-z0-9-]*[a-z0-9])?$
```

Additionally, the total length must be between 1 and 64 characters.

---

## SKILL.md Frontmatter Format

Every skill must have a `SKILL.md` file at its root with YAML frontmatter:

### Required Fields

```yaml
---
name: Human-Readable Skill Name
description: A concise one-sentence description of what this skill enables.
---
```

### Optional Fields

```yaml
---
name: Human-Readable Skill Name
description: A concise one-sentence description of what this skill enables.
version: 1.0.0
author: Author Name
tags:
  - tag-one
  - tag-two
  - tag-three
prerequisites:
  - Required skill or knowledge area
---
```

### Frontmatter Rules

1. **name**: Required. Use Title Case with spaces. Must be human-readable and descriptive.
2. **description**: Required. One sentence, under 100 characters preferred. Explain what the skill enables, not how it works.
3. **version**: Optional. Semantic versioning (MAJOR.MINOR.PATCH).
4. **author**: Optional. Name of the skill creator or team.
5. **tags**: Optional. Lowercase, hyphenated tags for categorization.
6. **prerequisites**: Optional. Skills or knowledge assumed before using this skill.

### Example

```yaml
---
name: RESTful API Design
description: Design and implement RESTful APIs following industry best practices.
version: 2.1.0
tags:
  - api-design
  - rest
  - backend
prerequisites:
  - HTTP fundamentals
  - JSON data format
---
```

---

## Directory Naming Conventions

Skills must organize content into standardized directories:

### Standard Directories

| Directory | Purpose | Required |
|-----------|---------|----------|
| `product/` | Knowledge about what is being built (domain concepts, entities, models) | Recommended |
| `methods/` | How-to procedures and step-by-step guides | Recommended |
| `design/` | Design patterns, architectural decisions, and trade-offs | Optional |
| `conventions/` | Rules, standards, and best practices | Optional |
| `scripts/` | Executable scripts and automation tools | Optional |
| `sources/` | Reference materials, documentation links, and citations | Optional |
| `assets/` | Images, diagrams, templates, and other static resources | Optional |

### Directory Rules

1. **Lowercase names**: All directory names must be lowercase
2. **No hyphens in standard directories**: Use the exact names listed above
3. **Custom subdirectories**: May use kebab-case if creating nested directories
4. **No empty directories**: Every directory must contain at least one file
5. **No deeply nested structures**: Limit nesting to 3 levels maximum

### Example Structure

```
skill-name/
├── SKILL.md
├── product/
│   ├── entities.md
│   └── data-models.md
├── methods/
│   ├── creating-components.md
│   └── testing-components.md
├── design/
│   ├── architecture-patterns.md
│   └── trade-offs.md
├── conventions/
│   ├── naming-rules.md
│   └── code-style.md
├── scripts/
│   └── setup.sh
├── sources/
│   └── references.md
└── assets/
    └── diagram.png
```

---

## File Naming Conventions

Files within each directory must follow consistent naming conventions:

### Rules

1. **Kebab-case**: Use lowercase letters with hyphens separating words
2. **Descriptive**: File names should clearly indicate their content
3. **No abbreviations**: Use full words unless the abbreviation is universal (e.g., api, url)
4. **Markdown extension**: Content files use `.md` extension
5. **Length**: Between 5 and 60 characters including extension
6. **No numbers as prefixes**: Do not use numerical prefixes for ordering

### Valid Examples

```
component-lifecycle.md
error-handling-patterns.md
authentication-flow.md
database-migrations.md
api-rate-limiting.md
responsive-layouts.md
```

### Invalid Examples

```
ComponentLifecycle.md     # PascalCase
component_lifecycle.md    # Underscores
01-introduction.md        # Numbered prefix
cmpnt-lfcycle.md          # Cryptic abbreviations
stuff.md                  # Non-descriptive
```

### Directory-Specific Guidelines

- **product/**: Name files after domain concepts (`entities.md`, `data-models.md`)
- **methods/**: Use gerunds or action phrases (`creating-components.md`, `deploying-applications.md`)
- **design/**: Name after patterns or decisions (`architecture-patterns.md`, `caching-strategies.md`)
- **conventions/**: Name after rule categories (`naming-rules.md`, `code-style.md`)
- **scripts/**: Use imperative verbs (`setup.sh`, `validate.js`)
- **sources/**: Use content type (`references.md`, `external-docs.md`)

---

## Navigation Index Format

The SKILL.md file must include a navigation index after the frontmatter:

### Format

```markdown
## Navigation

- [Product](#product)
  - [Topic One](product/topic-one.md)
  - [Topic Two](product/topic-two.md)
- [Methods](#methods)
  - [Procedure One](methods/procedure-one.md)
- [Conventions](#conventions)
  - [Convention One](conventions/convention-one.md)
```

### Navigation Rules

1. **Hierarchical**: Group by directory, then list files
2. **Alphabetical**: Sort files within each directory alphabetically
3. **Relative paths**: Use relative paths from SKILL.md location
4. **Anchor links**: Include anchor links for directory headers in SKILL.md
5. **Descriptive labels**: Use human-readable labels, not file names

---

## Shorthand Chapter Format

Shorthand chapters in SKILL.md provide quick reference summaries with links to detailed content:

### Format

```markdown
## Methods

### Creating Components

Build reusable UI components following atomic design principles.

Key steps:
1. Define the component interface
2. Implement the component logic
3. Add styles and variants
4. Write tests

See: [Full Procedure](methods/creating-components.md)
```

### Shorthand Rules

1. **Heading level**: Use `##` for directories, `###` for topics
2. **Summary**: One to three sentences summarizing the content
3. **Key points**: Use bullet lists or numbered lists for highlights
4. **Link to detail**: Always include a "See:" or "Reference:" link to the full file
5. **Token efficient**: Keep shorthand under 15 lines per topic

---

## Cross-Reference Link Format

Links between files must follow a consistent format:

### Internal Links (Within Same Skill)

```markdown
[Link Text](relative/path/to/file.md)
[Link Text](relative/path/to/file.md#section-heading)
```

### Anchor Links (Within Same File)

```markdown
[Link Text](#section-heading)
```

### Cross-Skill Links

```markdown
[Link Text](../../other-skill/SKILL.md)
[Link Text](../../other-skill/methods/procedure.md)
```

### Link Rules

1. **Relative paths only**: Never use absolute paths
2. **Descriptive text**: Link text must describe the target, not say "click here"
3. **Section anchors**: Use lowercase, hyphenated section headings for anchors
4. **Verify links**: All links must point to existing files or sections
5. **Prefer markdown links**: Use `[text](url)` format, not reference-style links

### Anchor Generation

Markdown anchors are generated from headings by:
1. Converting to lowercase
2. Replacing spaces with hyphens
3. Removing punctuation (except hyphens)
4. Making anchors unique by appending `-1`, `-2`, etc. for duplicates

Example: `## Creating REST APIs` becomes `#creating-rest-apis`

---

## Verification Checklist

Before considering a skill complete, verify:

- [ ] Directory name matches `^[a-z0-9]([a-z0-9-]*[a-z0-9])?$` and is 1-64 characters
- [ ] SKILL.md exists with valid YAML frontmatter (name and description required)
- [ ] All directories use lowercase standard names (product, methods, design, etc.)
- [ ] All files use kebab-case with descriptive names
- [ ] Navigation index in SKILL.md lists all content files
- [ ] Shorthand chapters link to detailed files
- [ ] All cross-reference links are valid and use relative paths
- [ ] No empty directories exist
- [ ] No orphaned files (not linked from SKILL.md)