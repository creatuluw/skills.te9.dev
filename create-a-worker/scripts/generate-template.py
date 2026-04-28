#!/usr/bin/env python3
"""
generate-template.py - Generate a skill skeleton from a domain name and brief description.

This script creates a complete skill directory structure with placeholder files
and a properly formatted SKILL.md file following the skills-anatomy specification.

Usage:
    python generate-template.py --domain "my-domain" --description "My domain description" --output-path ./skills

For agent use:
    - All output is structured and machine-readable
    - Clear error messages with exit codes
    - Non-interactive execution
"""

import argparse
import os
import re
import sys
from pathlib import Path
from typing import Dict, List

# Exit codes
EXIT_SUCCESS = 0
EXIT_INVALID_ARGS = 1
EXIT_FILE_EXISTS = 2
EXIT_PERMISSION_ERROR = 3
EXIT_IO_ERROR = 4


# Directory structure for a skill
SKILL_DIRECTORIES = [
    "product",
    "methods",
    "design",
    "conventions",
    "scripts",
    "sources",
    "assets",
]

# Placeholder content templates for each directory
PLACEHOLDER_CONTENT = {
    "product": {
        "README.md": """# {domain} - Product Context

This directory contains product-focused documentation for the {domain} skill.

## What to Include

- **User stories**: Who uses this domain knowledge and why
- **Use cases**: Common scenarios where this skill applies
- **Requirements**: Functional and non-functional requirements
- **Constraints**: Limitations and boundaries
- **Success criteria**: How to measure successful application of this skill

## Suggested Files

- `user-stories.md` - User stories and personas
- `use-cases.md` - Detailed use case descriptions
- `requirements.md` - Requirements documentation
- `constraints.md` - Known constraints and limitations
""",
        "user-stories.md": """# {domain} - User Stories

## Story 1: [Title]

**As a** [role],
**I want to** [action],
**So that** [benefit].

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

---

_Add more user stories following the pattern above._
""",
    },
    "methods": {
        "README.md": """# {domain} - Methods

This directory contains step-by-step methods for working with {domain}.

## What to Include

- **Procedures**: Step-by-step instructions for common tasks
- **Algorithms**: Core algorithms and their implementations
- **Workflows**: End-to-end process descriptions
- **Recipes**: Common solutions to frequent problems

## Method Template

Each method file should follow this structure:

1. **When to use this method**
2. **Prerequisites**
3. **Steps** (with code examples where applicable)
4. **Expected outcome**
5. **Good and bad examples**
6. **Self-learning/feedback considerations**

## Suggested Files

- `basic-{domain}.md` - Fundamental methods
- `advanced-{domain}.md` - Advanced techniques
- `troubleshooting.md` - Common issues and solutions
""",
        "basic-methods.md": """# {domain} - Basic Methods

## Method: [Method Name]

### When to Use
Describe when this method is applicable.

### Prerequisites
- Prerequisite 1
- Prerequisite 2

### Steps

1. First step description
   ```language
   # Code example if applicable
   ```

2. Second step description

### Expected Outcome
Describe what success looks like.

### Examples

#### Good Example
```
# Show correct usage
```

#### Bad Example
```
# Show incorrect usage and explain why
```

### Self-Learning Notes
- How to improve this method based on feedback
- Metrics to track for continuous improvement

---

_Add more methods following the pattern above._
""",
    },
    "design": {
        "README.md": """# {domain} - Design

This directory contains design documentation and architecture decisions for {domain}.

## What to Include

- **Architecture**: System or component architecture
- **Design patterns**: Patterns applicable to this domain
- **Decision records**: Architecture Decision Records (ADRs)
- **Diagrams**: Visual representations (stored in assets/)
- **Trade-offs**: Design trade-off analyses

## Suggested Files

- `architecture.md` - Overall architecture
- `design-patterns.md` - Relevant design patterns
- `adr/` - Architecture Decision Records
""",
        "design-patterns.md": """# {domain} - Design Patterns

## Pattern: [Pattern Name]

### Context
When is this pattern applicable?

### Problem
What problem does this pattern solve?

### Solution
Describe the pattern solution.

### Examples

#### Good Example
```
# Show correct pattern implementation
```

#### Bad Example
```
# Show anti-pattern or incorrect usage
```

### Trade-offs
- **Pros**: List advantages
- **Cons**: List disadvantages

---

_Add more patterns following the structure above._
""",
    },
    "conventions": {
        "README.md": """# {domain} - Conventions

This directory contains coding conventions, standards, and best practices for {domain}.

## What to Include

- **Naming conventions**: How to name things
- **Code style**: Formatting and style rules
- **Best practices**: Recommended approaches
- **Anti-patterns**: Things to avoid
- **Gotchas**: Common pitfalls and how to avoid them

## Suggested Files

- `naming.md` - Naming conventions
- `code-style.md` - Code style guide
- `best-practices.md` - Best practices
- `anti-patterns.md` - Anti-patterns to avoid
- `gotchas.md` - Common gotchas
""",
        "best-practices.md": """# {domain} - Best Practices

## Practice 1: [Practice Title]

### Principle
Describe the underlying principle.

### Rationale
Why does this practice exist?

### Implementation
How to apply this practice.

### Examples

#### Good Example
```
# Show best practice in action
```

#### Bad Example
```
# Show what NOT to do
```

---

_Add more best practices following the pattern above._
""",
        "gotchas.md": """# {domain} - Gotchas

## Gotcha 1: [Gotcha Title]

### The Problem
Describe the pitfall.

### Why It Happens
Explain the root cause.

### How to Avoid
Provide prevention strategies.

### How to Detect
How to recognize if you've fallen into this trap.

### Example

```language
# Show the problematic code/scenario
```

### Solution

```language
# Show the correct approach
```

---

_Add more gotchas following the pattern above._
""",
    },
    "scripts": {
        "README.md": """# {domain} - Scripts

This directory contains utility scripts for working with {domain}.

## What to Include

- **Automation scripts**: Repetitive task automation
- **Validation scripts**: Quality checks and validation
- **Generation scripts**: Code or documentation generators
- **Analysis scripts**: Domain-specific analysis tools

## Guidelines

- Each script should have a `--help` flag
- Scripts should be non-interactive (suitable for automation)
- Include clear error messages
- Use structured output (JSON where appropriate)
- Document all dependencies

## Suggested Files

- `validate.sh` - Validation script
- `analyze.py` - Analysis script
- `generate.py` - Generation script
""",
    },
    "sources": {
        "README.md": """# {domain} - Sources

This directory contains source materials and references for {domain}.

## What to Include

- **Reference documentation**: Official docs and standards
- **Tutorials**: Learning resources
- **Articles**: Blog posts and technical articles
- **Books**: Relevant book recommendations
- **Tools**: Useful tools and utilities

## Suggested Files

- `references.md` - Reference documentation links
- `learning-resources.md` - Tutorials and guides
- `tools.md` - Tool recommendations
""",
        "references.md": """# {domain} - References

## Official Documentation

- [Doc 1](url) - Description
- [Doc 2](url) - Description

## Standards

- Standard 1: Description
- Standard 2: Description

## Books

- **Book Title** by Author - Brief description of relevance

## Articles

- [Article Title](url) - Brief description

---

_Update this file with verified, high-quality sources._
""",
    },
    "assets": {
        "README.md": """# {domain} - Assets

This directory contains binary assets and media files for {domain}.

## What to Include

- **Images**: Diagrams, screenshots, illustrations
- **Diagrams**: Architecture diagrams, flowcharts
- **Templates**: File templates, code templates
- **Examples**: Example files, sample data

## Guidelines

- Use descriptive file names
- Include alt text descriptions in referencing markdown
- Keep file sizes reasonable
- Prefer SVG for diagrams where possible
- Use standard formats (PNG, JPG, SVG, PDF)

## Directory Structure

```
assets/
├── images/      # Screenshots, illustrations
├── diagrams/    # Architecture and flow diagrams
├── templates/   # File templates
└── examples/    # Example files
```
""",
    },
}


def sanitize_domain_to_name(domain: str) -> str:
    """Convert a domain name to a valid skill name.

    Args:
        domain: The domain name to convert

    Returns:
        A sanitized skill name (lowercase, hyphens only)
    """
    # Convert to lowercase
    name = domain.lower().strip()

    # Replace spaces and underscores with hyphens
    name = re.sub(r"[\s_]+", "-", name)

    # Remove any character that isn't alphanumeric or hyphen
    name = re.sub(r"[^a-z0-9-]", "", name)

    # Remove leading/trailing hyphens
    name = name.strip("-")

    # Replace consecutive hyphens with single hyphen
    name = re.sub(r"-+", "-", name)

    return name


def validate_name(name: str) -> List[str]:
    """Validate a skill name against the anatomy specification.

    Args:
        name: The skill name to validate

    Returns:
        List of validation errors (empty if valid)
    """
    errors = []

    if not name:
        errors.append("Name cannot be empty")
        return errors

    if len(name) > 64:
        errors.append(f"Name exceeds 64 characters (got {len(name)})")

    if not re.match(r"^[a-z0-9-]+$", name):
        errors.append("Name must contain only lowercase letters, numbers, and hyphens")

    if name.startswith("-") or name.endswith("-"):
        errors.append("Name cannot start or end with a hyphen")

    if "--" in name:
        errors.append("Name cannot contain consecutive hyphens")

    return errors


def generate_file_tree(skill_name: str, directories: List[str]) -> str:
    """Generate a visual file tree for the navigation index.

    Args:
        skill_name: The name of the skill
        directories: List of subdirectories

    Returns:
        A string representation of the file tree
    """
    lines = [f"{skill_name}/"]
    lines.append("├── SKILL.md")

    for i, dirname in enumerate(directories):
        is_last_dir = i == len(directories) - 1
        prefix = "└── " if is_last_dir else "├── "
        lines.append(f"{prefix}{dirname}/")

        # Add placeholder files for directories that have content
        if dirname in PLACEHOLDER_CONTENT:
            files = list(PLACEHOLDER_CONTENT[dirname].keys())
            for j, filename in enumerate(files):
                is_last_file = j == len(files) - 1
                file_prefix = "    └── " if is_last_file else "    ├── "
                connector = "    " if is_last_dir else "│   "
                if is_last_file:
                    lines.append(f"{connector}{file_prefix.strip()}{filename}")
                else:
                    lines.append(f"{connector}├── {filename}")

    return "\n".join(lines)


def generate_skill_md(domain: str, name: str, description: str) -> str:
    """Generate the SKILL.md content.

    Args:
        domain: The original domain name
        name: The sanitized skill name
        description: The skill description

    Returns:
        Complete SKILL.md content
    """
    file_tree = generate_file_tree(name, SKILL_DIRECTORIES)

    content = f"""---
name: {name}
description: {description}
version: 0.1.0
created: "{{{{DATE}}}}"
---

# {domain}

{description}

## Navigation

```
{file_tree}
```

## Quick Reference

### Core Concepts
- Define the core concepts of {domain} here
- Link to detailed documentation in `product/`

### Key Methods
- List the primary methods here
- Link to detailed instructions in `methods/`

### Important Conventions
- Highlight critical conventions here
- Link to full conventions in `conventions/`

---

## Method: Understanding {domain}

### When to Use
When you need to apply knowledge about {domain} to solve problems or make decisions.

### Prerequisites
- Basic understanding of {domain} concepts
- Familiarity with related tools and frameworks

### Steps

1. **Identify the problem context**
   - Determine which aspect of {domain} applies

2. **Consult relevant methods**
   - Check `methods/` directory for applicable procedures

3. **Apply conventions**
   - Follow standards defined in `conventions/`

4. **Validate the approach**
   - Use design principles from `design/`

### Expected Outcome
A well-informed decision or implementation that follows {domain} best practices.

### Examples

#### Good Example
```
# Demonstrate proper application of {domain} knowledge
# Include clear, idiomatic code or process
```

#### Bad Example
```
# Demonstrate common mistakes or anti-patterns
# Explain why this approach is problematic
```

### Self-Learning
- **Feedback mechanism**: How to gather feedback on {domain} implementations
- **Improvement process**: How to refine skills based on outcomes
- **Metrics**: What to measure to track proficiency

---

## Method: Troubleshooting {domain} Issues

### When to Use
When encountering problems or unexpected behavior in {domain}.

### Prerequisites
- Understanding of the expected behavior
- Access to relevant logs or error information

### Steps

1. **Identify symptoms**
   - Document what's happening vs. what's expected

2. **Consult known issues**
   - Check `conventions/gotchas.md` for common pitfalls

3. **Isolate the problem**
   - Narrow down the root cause

4. **Apply the fix**
   - Use verified solutions from methods documentation

5. **Document the resolution**
   - Add to knowledge base for future reference

### Expected Outcome
Root cause identified and issue resolved, with knowledge captured for future use.

---

*This skill template was generated automatically. Customize and expand based on your specific domain knowledge.*
"""

    return content


def create_directory_structure(base_path: Path, skill_name: str) -> Dict[str, Path]:
    """Create the skill directory structure.

    Args:
        base_path: The base output path
        skill_name: The sanitized skill name

    Returns:
        Dictionary mapping directory names to their paths

    Raises:
        FileExistsError: If the skill directory already exists
        PermissionError: If unable to create directories
    """
    skill_path = base_path / skill_name

    # Check if directory already exists
    if skill_path.exists():
        raise FileExistsError(
            f"Skill directory already exists: {skill_path}\n"
            f"Remove it or choose a different output path."
        )

    paths = {"root": skill_path}

    try:
        # Create root directory
        skill_path.mkdir(parents=True, exist_ok=False)

        # Create subdirectories
        for dirname in SKILL_DIRECTORIES:
            dir_path = skill_path / dirname
            dir_path.mkdir(exist_ok=True)
            paths[dirname] = dir_path

    except PermissionError as e:
        raise PermissionError(
            f"Permission denied creating directory: {e}\n"
            f"Check write permissions for: {base_path}"
        )

    return paths


def create_placeholder_files(
    paths: Dict[str, Path], domain: str, name: str
) -> List[str]:
    """Create placeholder files in each directory.

    Args:
        paths: Dictionary mapping directory names to paths
        domain: The original domain name
        name: The sanitized skill name

    Returns:
        List of created file paths
    """
    created_files = []

    # Create SKILL.md
    skill_md_content = generate_skill_md(domain, name, "")
    skill_md_path = paths["root"] / "SKILL.md"

    with open(skill_md_path, "w", encoding="utf-8") as f:
        f.write(skill_md_content)
    created_files.append(str(skill_md_path))

    # Create placeholder files in each directory
    for dirname, files in PLACEHOLDER_CONTENT.items():
        if dirname in paths:
            for filename, template in files.items():
                # Replace placeholders in template
                content = template.format(domain=domain, name=name)
                file_path = paths[dirname] / filename

                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                created_files.append(str(file_path))

    return created_files


def main():
    """Main entry point for the skill template generator."""
    parser = argparse.ArgumentParser(
        description="Generate a skill skeleton from a domain name and brief description.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s --domain "react-hooks" --description "React hooks patterns and best practices"
  %(prog)s --domain "API Design" --output-path ./skills --description "RESTful API design principles"

Exit Codes:
  0 - Success
  1 - Invalid arguments
  2 - Skill directory already exists
  3 - Permission error
  4 - IO error
        """,
    )

    parser.add_argument(
        "--domain",
        required=True,
        help="The domain name for the skill (will be sanitized to a valid skill name)",
    )

    parser.add_argument(
        "--description",
        required=True,
        help="Brief description of the skill (under 1024 characters)",
    )

    parser.add_argument(
        "--output-path",
        default=".",
        help="Output path where the skill directory will be created (default: current directory)",
    )

    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing skill directory if it exists",
    )

    args = parser.parse_args()

    # Validate description length
    if len(args.description) > 1024:
        print("ERROR: Description exceeds 1024 characters", file=sys.stderr)
        print(f"  Current length: {len(args.description)}", file=sys.stderr)
        sys.exit(EXIT_INVALID_ARGS)

    if not args.description.strip():
        print("ERROR: Description cannot be empty", file=sys.stderr)
        sys.exit(EXIT_INVALID_ARGS)

    # Sanitize domain to skill name
    skill_name = sanitize_domain_to_name(args.domain)

    # Validate the generated name
    name_errors = validate_name(skill_name)
    if name_errors:
        print("ERROR: Invalid domain name after sanitization:", file=sys.stderr)
        for error in name_errors:
            print(f"  - {error}", file=sys.stderr)
        print(f"  Original: '{args.domain}'", file=sys.stderr)
        print(f"  Sanitized: '{skill_name}'", file=sys.stderr)
        sys.exit(EXIT_INVALID_ARGS)

    # Validate output path
    output_path = Path(args.output_path)
    if not output_path.exists():
        try:
            output_path.mkdir(parents=True, exist_ok=True)
        except PermissionError:
            print(f"ERROR: Cannot create output path: {output_path}", file=sys.stderr)
            sys.exit(EXIT_PERMISSION_ERROR)

    if not output_path.is_dir():
        print(f"ERROR: Output path is not a directory: {output_path}", file=sys.stderr)
        sys.exit(EXIT_INVALID_ARGS)

    # Check if skill directory exists
    skill_path = output_path / skill_name
    if skill_path.exists():
        if args.overwrite:
            import shutil

            try:
                shutil.rmtree(skill_path)
            except PermissionError:
                print(
                    f"ERROR: Cannot remove existing directory: {skill_path}",
                    file=sys.stderr,
                )
                sys.exit(EXIT_PERMISSION_ERROR)
        else:
            print(
                f"ERROR: Skill directory already exists: {skill_path}", file=sys.stderr
            )
            print(
                "  Use --overwrite to replace it, or choose a different output path",
                file=sys.stderr,
            )
            sys.exit(EXIT_FILE_EXISTS)

    # Generate the skill structure
    try:
        print(f"Generating skill skeleton for: {args.domain}")
        print(f"  Skill name: {skill_name}")
        print(f"  Output path: {output_path}")
        print()

        # Create directory structure
        paths = create_directory_structure(output_path, skill_name)
        print(f"✓ Created directory structure")

        # Generate SKILL.md content with description
        description = args.description.strip()
        skill_md_content = generate_skill_md(args.domain, skill_name, description)
        skill_md_path = paths["root"] / "SKILL.md"

        with open(skill_md_path, "w", encoding="utf-8") as f:
            f.write(skill_md_content)

        # Create placeholder files
        created_files = create_placeholder_files(paths, args.domain, skill_name)

        print(f"✓ Created {len(created_files)} files:")
        for filepath in created_files:
            rel_path = Path(filepath).relative_to(output_path)
            print(f"  - {rel_path}")

        print()
        print("SUCCESS: Skill skeleton generated successfully!")
        print()
        print("Next steps:")
        print(f"  1. Review and customize: {skill_path / 'SKILL.md'}")
        print(f"  2. Add domain-specific methods to: {skill_path / 'methods/'}")
        print(f"  3. Define conventions in: {skill_path / 'conventions/'}")
        print(f"  4. Add design documentation to: {skill_path / 'design/'}")
        print(f"  5. Run validation: scripts/validate-skill.sh {skill_path}")

        sys.exit(EXIT_SUCCESS)

    except FileExistsError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(EXIT_FILE_EXISTS)

    except PermissionError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(EXIT_PERMISSION_ERROR)

    except IOError as e:
        print(f"ERROR: Failed to write file: {e}", file=sys.stderr)
        sys.exit(EXIT_IO_ERROR)

    except Exception as e:
        print(f"ERROR: Unexpected error: {e}", file=sys.stderr)
        sys.exit(EXIT_IO_ERROR)


if __name__ == "__main__":
    main()
