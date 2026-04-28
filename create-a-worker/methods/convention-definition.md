# Convention Definition Method

## Purpose

This method provides a systematic approach to documenting domain conventions—shared rules and standards that ensure consistency across a codebase, team, or organization. Well-documented conventions reduce cognitive load, prevent common errors, and enable new contributors to write code that matches existing patterns.

## When to Use

- **Building new skills**: When capturing domain-specific conventions that practitioners must follow
- **Onboarding documentation**: When creating reference material for new team members
- **Standardization efforts**: When establishing or updating coding standards across a project
- **Skill maintenance**: When conventions evolve and documentation needs updating
- **Cross-team alignment**: When multiple teams must follow consistent patterns

---

## Convention Categories

### 1. Naming Conventions

Rules for naming identifiers, files, modules, and other artifacts.

**Examples:**
- Variable naming patterns (camelCase, snake_case, UPPER_SNAKE_CASE)
- File naming patterns (kebab-case, PascalCase, singular vs plural)
- Module naming hierarchies
- Function naming patterns (verb-noun, get/set/is prefixes)
- Constant naming patterns

### 2. Structural Conventions

Rules for organizing code, files, and project structure.

**Examples:**
- Directory structure patterns
- File organization within modules
- Import/export ordering
- Class member ordering (fields, constructor, methods)
- Module boundary definitions

### 3. Style Conventions

Rules for code appearance and formatting.

**Examples:**
- Indentation and whitespace rules
- Brace style (same-line, next-line)
- Line length limits
- Comment formatting
- String quote preferences

### 4. Process Conventions

Rules for development workflow and processes.

**Examples:**
- Git commit message formats
- Branch naming strategies
- Code review requirements
- Testing expectations
- Deployment procedures

### 5. Domain-Specific Conventions

Rules specific to a particular technology, framework, or business domain.

**Examples:**
- React component patterns (functional, hooks usage)
- Database query conventions
- API design patterns (REST, GraphQL)
- Error handling strategies
- Authentication/authorization patterns

---

## Convention Documentation Template

### Template Structure

```markdown
### [CON-XXX]: Convention Name

**Category:** [Naming | Structural | Style | Process | Domain-Specific]
**Priority:** [Mandatory | Recommended | Preferred]
**Applies to:** [Languages/Frameworks/Contexts]

#### Rule

[Clear, unambiguous statement of the convention]

#### Rationale

[Why this convention exists. What problem it solves. What benefits it provides.]

#### Correct Example

[Code or artifact showing proper application of the convention]

#### Violation Example

[Code or artifact showing incorrect application or violation]

#### Verification Method

[How to check compliance: automated tool, manual review, checklist item]

#### Related Conventions

- [Links to related or complementary conventions]
- [Links to conflicting conventions that take lower priority]

#### Notes

[Additional context, exceptions, or migration guidance]
```

### Field Guidelines

**Rule Statement:**
- Use imperative mood ("Use camelCase for variables")
- Be specific and unambiguous
- Include scope when applicable ("In React components, use...")
- State both what to do AND what not to do when helpful

**Rationale:**
- Explain the "why" not just the "what"
- Reference concrete benefits (readability, tooling, consistency)
- Acknowledge trade-offs when they exist
- Link to evidence or权威 sources when available

**Examples:**
- Show realistic, production-quality code
- Include enough context to understand the example
- Highlight the specific convention being demonstrated
- Show the pattern, not just a single instance

---

## Priority Levels

### Mandatory (Must Follow)

Conventions that prevent bugs, security issues, or critical inconsistencies.

**Characteristics:**
- Violation causes measurable harm
- Enforcement is typically automated
- Exceptions require explicit approval
- Non-compliance blocks merging/deployment

**Decision Criteria:**
- Does violating this cause bugs or security vulnerabilities?
- Does this prevent data corruption or loss?
- Is this required for system correctness?
- Would violation break production systems?

**Example:**
```
Rule: Always validate user input on the server side
Rationale: Client-side validation can be bypassed, leading to injection attacks
Enforcement: Automated security scanning + code review checklist
```

### Recommended (Should Follow)

Conventions that significantly improve code quality and maintainability.

**Characteristics:**
- Violation reduces code quality but doesn't break things
- Enforcement may be automated with override capability
- Exceptions are documented but don't require approval
- Non-compliance triggers warnings

**Decision Criteria:**
- Does this significantly improve readability?
- Does this reduce maintenance burden?
- Is this important for consistency?
- Would violation confuse other developers?

**Example:**
```
Rule: Use descriptive variable names that convey intent
Rationale: Code is read more often than written; clear names reduce cognitive load
Enforcement: Linter rules for minimum name length + code review
```

### Preferred (Nice to Follow)

Conventions that represent best practices but allow flexibility.

**Characteristics:**
- Violation has minimal impact
- Enforcement is manual or advisory
- Exceptions are common and acceptable
- Non-compliance is noted but accepted

**Decision Criteria:**
- Is this a style preference?
- Does this improve aesthetics more than functionality?
- Is there legitimate room for alternative approaches?
- Would enforcement be overly restrictive?

**Example:**
```
Rule: Prefer early returns to reduce nesting
Rationale: Flat code is easier to read and reason about
Enforcement: Code review suggestions (optional)
```

---

## Enforcement Methods

### Automated Scripts

**When to Use:** For rules that can be programmatically verified.

**Implementation:**
```bash
#!/bin/bash
# Example: Check file naming convention
# Convention: All source files use kebab-case

find src -type f -name "*.ts" | while read file; do
  basename=$(basename "$file" .ts)
  if [[ ! "$basename" =~ ^[a-z][a-z0-9]*(-[a-z0-9]+)*$ ]]; then
    echo "VIOLATION: $file does not follow kebab-case naming"
  fi
done
```

**Best Practices:**
- Make scripts part of CI/CD pipeline
- Provide clear error messages
- Allow configuration for exceptions
- Generate compliance reports

### Linters and Formatters

**When to Use:** For rules supported by existing tooling.

**Configuration Example:**
```json
{
  "rules": {
    "naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      }
    ]
  }
}
```

**Best Practices:**
- Use industry-standard tools (ESLint, Prettier, etc.)
- Document custom rule configurations
- Provide setup instructions
- Include auto-fix capability when possible

### Code Review Checklists

**When to Use:** For rules requiring human judgment.

**Checklist Template:**
```markdown
## Convention Compliance Checklist

### Naming
- [ ] Variables use camelCase
- [ ] Constants use UPPER_SNAKE_CASE
- [ ] Files use kebab-case
- [ ] Classes use PascalCase
- [ ] Boolean variables start with is/has/can/should

### Structure
- [ ] Imports ordered by type (external, internal, relative)
- [ ] Classes follow member ordering convention
- [ ] Related files grouped in same directory

### Style
- [ ] Consistent indentation (2 spaces)
- [ ] No trailing whitespace
- [ ] Lines under 100 characters

### Domain-Specific
- [ ] React components are functional with hooks
- [ ] API responses follow standard envelope format
- [ ] Error handling uses custom error classes
```

### Documentation Generation

**When to Use:** For conventions that affect documentation.

**Approach:**
- Extract convention documentation from source code
- Generate convention reference from configuration files
- Keep documentation synchronized with enforcement rules
- Produce compliance reports from automated checks

---

## Handling Conflicting Conventions

### Conflict Resolution Framework

When conventions conflict, apply these resolution steps:

#### 1. Identify the Conflict

```markdown
**Conflict:** Convention A says X, Convention B says Y

Convention A: "Use camelCase for all JSON keys"
Convention B: "Match database column names (snake_case)"

Context: API response serialization
```

#### 2. Analyze Impact

Ask:
- Which convention has higher priority?
- Which convention serves a more critical purpose?
- Which convention is more widely applicable?
- Which convention would be easier to change?

#### 3. Determine Resolution Strategy

**Strategy A: Context-Dependent Application**
```markdown
Resolution: Use camelCase for external APIs (Convention A), 
snake_case for internal database code (Convention B).
Boundary: Translation layer at API boundary.
```

**Strategy B: Priority Override**
```markdown
Resolution: Convention B (Mandatory) overrides Convention A (Recommended)
Convention A is suspended in database-related contexts.
```

**Strategy C: Convention Evolution**
```markdown
Resolution: Both conventions are updated to a new unified approach.
Migration plan: [details]
```

#### 4. Document the Resolution

```markdown
### Convention Conflict: JSON Key Naming

**Status:** Resolved
**Resolution:** Context-dependent
**Date:** 2024-01-15

**Decision:**
- External APIs: camelCase (matches JavaScript ecosystem)
- Internal/database: snake_case (matches SQL conventions)
- Translation: Automated at API boundary using serialization library

**Rationale:**
Both conventions serve valid purposes in their contexts. 
The API boundary provides a natural translation point.
```

---

## Good and Bad Examples

### Good Convention Documentation

```markdown
### CON-012: Component File Structure

**Category:** Structural
**Priority:** Mandatory
**Applies to:** React/TypeScript projects

#### Rule

Each React component must be in its own directory containing:
1. `ComponentName.tsx` - The component implementation
2. `ComponentName.test.tsx` - Unit tests
3. `ComponentName.module.css` - Scoped styles (if needed)
4. `index.ts` - Barrel export

#### Rationale

Consistent file structure enables developers to find related files quickly. 
The directory structure makes it clear where tests, styles, and exports live 
without having to search the codebase. This convention scales well as components 
grow in complexity and need additional files (hooks, utils, types).

#### Correct Example

```
src/components/
  UserProfile/
    UserProfile.tsx
    UserProfile.test.tsx
    UserProfile.module.css
    index.ts
  NavigationBar/
    NavigationBar.tsx
    NavigationBar.test.tsx
    index.ts
```

#### Violation Example

```
src/components/
  UserProfile.tsx
  UserProfile.test.tsx
  NavigationBar.tsx
  NavigationBar.test.tsx
  styles/
    UserProfile.css
```

#### Verification Method

- **Automated:** Custom script validates directory structure matches pattern
- **Manual:** Code review checklist item
- **CI/CD:** Fails build if structure violated for new components

#### Related Conventions

- CON-015: Barrel Export Pattern
- CON-018: Test File Placement

#### Notes

Legacy components may not follow this structure. Do not refactor existing 
components unless making significant changes. New components MUST follow 
this convention.
```

### Bad Convention Documentation

```markdown
### File Naming

Files should be named consistently. Use good names that make sense.
Follow the existing patterns in the codebase.

Example: `userProfile.tsx`

Don't use bad names.
```

**Problems:**
- No clear rule statement
- No rationale explaining why
- No violation example showing what to avoid
- No verification method
- Vague and subjective language
- Missing priority and category

---

## Keeping Conventions Current

### Regular Review Process

#### Monthly: Convention Audit
- Review all active conventions for relevance
- Identify outdated or contradictory rules
- Collect developer feedback on friction points
- Update examples to reflect current patterns

#### Quarterly: Convention Evolution
- Analyze new patterns emerging in codebase
- Evaluate industry best practice changes
- Update conventions to reflect technology updates
- Retire conventions that no longer serve purpose

#### Annually: Convention Reset
- Comprehensive review of all conventions
- Survey team satisfaction and compliance
- Align with organizational changes
- Update documentation format if needed

### Convention Lifecycle

```markdown
#### Proposed → Active → Deprecated → Retired

**Proposed:** Convention is suggested but not yet enforced
- Document in "Proposed Conventions" section
- Solicit feedback from team
- Pilot on new code

**Active:** Convention is current and enforced
- Full documentation in main conventions
- Automated enforcement in place
- Included in onboarding

**Deprecated:** Convention is being phased out
- Mark with deprecation notice
- Provide migration path
- Date for full retirement

**Retired:** Convention is no longer applicable
- Move to historical archive
- Remove enforcement tools
- Update dependent documentation
```

### Trigger-Based Updates

**When to Update Conventions:**

1. **Technology Changes**
   - Framework version upgrades
   - New language features
   - Tool changes

2. **Team Feedback**
   - Developers report confusion
   - Consistent violations suggest convention needs revision
   - Better approaches discovered

3. **Pattern Evolution**
   - New best practices emerge
   - Codebase patterns drift from conventions
   - Performance or security insights change approach

4. **Scale Changes**
   - Team size changes significantly
   - Codebase grows beyond original conventions
   - New domains or services added

### Versioning Conventions

```markdown
### Convention Version History

#### CON-012: Component File Structure

| Version | Date       | Change                              | Author   |
|---------|------------|-------------------------------------|----------|
| 1.0     | 2024-01-15 | Initial convention                  | @lead    |
| 1.1     | 2024-03-20 | Added test file requirement         | @qa-lead |
| 2.0     | 2024-06-01 | Changed to directory-based structure| @team    |

#### Migration Guide (v1 → v2)

The flat file structure has been replaced with directory-based structure.
New components MUST use v2 structure. Existing components should be 
migrated when significantly modified.

**Automated Migration:** `npm run migrate-component-structure <ComponentName>`
```

---

## Integration with Other Methods

### With Pattern Library
- Patterns should follow conventions
- Conventions may reference patterns as correct examples
- New patterns may require convention updates

### With Self-Learning Design
- Convention violations are feedback signals
- Frequent violations suggest convention needs revision
- New patterns may emerge that should become conventions

### With Quality Validation
- Convention completeness is a validation criterion
- Convention documentation quality affects skill quality score
- Validation failures may reveal missing conventions

### With Iterative Refinement
- Convention updates are a type of refinement
- Refinement signals may indicate convention friction
- Refinement cycles should include convention review

---

## Checklist for Convention Definition

When documenting conventions, verify:

- [ ] Convention has clear, unambiguous rule statement
- [ ] Rationale explains why, not just what
- [ ] Both correct and violation examples are provided
- [ ] Priority level is assigned and justified
- [ ] Verification method is specified
- [ ] Related conventions are linked
- [ ] Conflicts with other conventions are addressed
- [ ] Exceptions are documented (if applicable)
- [ ] Enforcement approach is defined
- [ ] Review/update schedule is established
- [ ] Version history is maintained

---

## Common Pitfalls

### 1. Over-Specification
**Problem:** Too many conventions create cognitive overload.
**Solution:** Focus on conventions that prevent real problems. Prefer "Recommended" over "Mandatory" when possible.

### 2. Under-Specification
**Problem:** Vague conventions are interpreted differently.
**Solution:** Use concrete examples. Show correct AND incorrect applications.

### 3. No Enforcement
**Problem:** Documented but unenforced conventions are ignored.
**Solution:** Automate enforcement where possible. Include in code review process.

### 4. Stale Conventions
**Problem:** Conventions don't evolve with the codebase.
**Solution:** Regular review schedule. Listen to developer feedback.

### 5. Inconsistent Application
**Problem:** Conventions apply to some areas but not others without clear reason.
**Solution:** Define scope explicitly. Document exceptions with rationale.

---

## Summary

Effective convention documentation requires:
1. Clear categorization and prioritization
2. Comprehensive documentation with rationale and examples
3. Practical enforcement mechanisms
4. Conflict resolution strategies
5. Regular maintenance and evolution
6. Integration with the broader skill ecosystem

Well-documented conventions reduce friction, improve consistency, and accelerate developer onboarding when they are kept current and practically applicable.