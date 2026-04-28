# Domain Modeling Design Principles

## Overview

Domain modeling is the process of translating real-world expertise into skill form. A domain expert doesn't think in terms of "procedural knowledge" or "conditional rules"—they think holistically about their craft. The challenge of domain modeling is capturing that holistic expertise in a structured format that workers can access progressively and apply effectively.

This document defines how to extract, analyze, codify, and validate domain knowledge into skill anatomy.

---

## 1. The Knowledge Extraction Pipeline

### Overview

Knowledge extraction is a four-stage pipeline that transforms raw domain expertise into validated skill content. Each stage has distinct inputs, processes, and outputs.

```
Domain Knowledge → Analysis → Codification → Validation
     (raw)          (structured)  (skill form)   (verified)
```

### Stage 1: Domain (Raw Knowledge)

**Input**: Unstructured expertise from various sources.

**Sources of Domain Knowledge**:
- Expert interviews and observations
- Existing documentation and manuals
- Codebases and configuration files
- Process documentation and runbooks
- Error logs and incident reports
- Forum discussions and Q&A
- Standards documents and specifications
- Teaching materials and tutorials

**Capture Techniques**:

*Technique 1: Task Observation*
Watch an expert perform their work. Document every decision point, not just the actions.
- What do they check before acting?
- What shortcuts do they take?
- What do they double-check?
- Where do they hesitate or look things up?

*Technique 2: Decision Archaeology*
Examine completed work and trace back to decisions:
- Why was this approach chosen over alternatives?
- What constraints influenced the decision?
- What would have happened with a different choice?

*Technique 3: Failure Analysis*
Study what went wrong in past failures:
- What was the root cause?
- What knowledge would have prevented it?
- How do experts avoid this failure mode?

*Technique 4: Mental Model Extraction*
Ask experts to explain their thinking:
- "What are you checking right now?"
- "What would concern you about this approach?"
- "How would you teach this to a beginner?"

### Stage 2: Analysis (Structured Knowledge)

**Input**: Raw domain knowledge from Stage 1.

**Process**: Classify and organize knowledge by type, priority, and relationships.

**Analysis Activities**:

1. **Classify Knowledge Types** (see Section 2 for types)
   - Tag each piece of knowledge as procedural, declarative, conditional, or relational
   
2. **Identify Knowledge Priority**
   - Critical: Must know to perform basic tasks
   - Important: Needed for quality work
   - Supplementary: Useful for edge cases and optimization
   
3. **Map Knowledge Relationships**
   - Dependencies: "To understand X, you must first know Y"
   - Alternatives: "X or Y can achieve similar results"
   - Contexts: "X applies in situation A, Y in situation B"
   
4. **Identify Knowledge Gaps**
   - Missing steps in documented procedures
   - Undocumented decision criteria
   - Assumed knowledge that isn't stated

**Output**: A structured knowledge map showing types, priorities, and relationships.

### Stage 3: Codification (Skill Form)

**Input**: Structured knowledge map from Stage 2.

**Process**: Translate knowledge into skill anatomy format.

**Codification Rules**:
- Procedural knowledge → `methods/` files
- Declarative knowledge → `conventions/` or `SKILL.md`
- Conditional knowledge → decision trees in `methods/` or principles in `design/`
- Relational knowledge → cross-references and navigation in `SKILL.md`

See Section 3 for detailed mapping guidance.

**Output**: Draft skill files in proper anatomy structure.

### Stage 4: Validation (Verified Knowledge)

**Input**: Draft skill files from Stage 3.

**Process**: Verify that codified knowledge produces competent work.

**Validation Techniques**:

*Technique 1: Apprentice Test*
Give the skill to a worker with no domain background. Can they produce competent output?
- If yes: Knowledge is sufficiently captured
- If no: Identify what's missing or unclear

*Technique 2: Expert Review*
Have domain experts review the skill:
- Is anything wrong or misleading?
- Is anything critical missing?
- Are the priorities correct?

*Technique 3: Scenario Testing*
Walk through realistic scenarios using only the skill:
- Can you find the right method for each scenario?
- Can you complete each method without external help?
- Do results match expert expectations?

*Technique 4: Gap Reanalysis*
After validation, return to Stage 2 analysis:
- What knowledge was needed that wasn't captured?
- What classifications were wrong?
- What relationships were missed?

**Output**: Validated skill ready for use and iterative improvement.

---

## 2. Types of Domain Knowledge

### Understanding Knowledge Types

Domain knowledge comes in four fundamental types. Each type serves a different purpose and is best captured in different skill structures.

### Type 1: Procedural Knowledge

**Definition**: Knowledge about how to do something—step-by-step processes and actions.

**Characteristics**:
- Sequential: Steps have a meaningful order
- Actionable: Each step describes something to do
- Verifiable: You can check if a step was completed correctly
- Contextual: May depend on conditions (if X, then step A; else step B)

**Examples**:
- "To deploy a service, first build the image, then push to registry, then update the deployment manifest"
- "To debug a failing test, reproduce locally, isolate the failing assertion, trace the data flow"
- "To create a new API endpoint, define the route, implement the handler, add validation, write tests"

**Capture Format**: Ordered steps with decision points.

```markdown
## Procedure: Deploy Service

1. Build Docker image: `docker build -t service-name .`
2. Tag with version: `docker tag service-name registry/service-name:v1.2`
3. Push to registry: `docker push registry/service-name:v1.2`
4. Update deployment manifest with new image tag
5. Apply manifest: `kubectl apply -f deployment.yaml`
6. Verify rollout: `kubectl rollout status deployment/service-name`
```

### Type 2: Declarative Knowledge

**Definition**: Knowledge about what is true—facts, definitions, rules, and standards.

**Characteristics**:
- Static: Doesn't change based on context
- Definitional: Describes what things are or how they should be
- Referenceable: Can be looked up when needed
- Universal: Applies across all contexts within scope

**Examples**:
- "API responses must include a correlation-id header"
- "Variable names use camelCase, type names use PascalCase"
- "The skill anatomy has five directories: methods, design, conventions, sources, assets"
- "Error codes follow the pattern: DOMAIN-SEVERITY-NUMBER"

**Capture Format**: Clear statements, often in lists or tables.

```markdown
## Naming Conventions

- Files: kebab-case (e.g., `create-skill.md`)
- Directories: lowercase, no separators (e.g., `methods/`)
- Variables: camelCase (e.g., `skillName`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRIES`)
```

### Type 3: Conditional Knowledge

**Definition**: Knowledge about when to do what—decision criteria, situational awareness, and contextual judgment.

**Characteristics**:
- Situational: Applies only under specific conditions
- Decision-oriented: Helps choose between alternatives
- Judgment-based: Often requires weighing trade-offs
- Experiential: Comes from seeing many situations

**Examples**:
- "Use caching when data is read frequently and changes rarely"
- "If the build fails on CI but passes locally, check for environment differences"
- "Choose the streaming approach when data exceeds available memory"
- "Prefer composition over inheritance when behaviors vary independently"

**Capture Format**: Decision trees, if-then rules, or principle statements.

```markdown
## Choosing a Deployment Strategy

| Situation | Strategy | Rationale |
|-----------|----------|-----------|
| Low traffic, simple app | Rolling update | Simple, sufficient for the risk level |
| High traffic, can't afford downtime | Blue-green | Zero-downtime switching |
| High traffic, gradual validation | Canary | Progressive rollout with early detection |
| Critical service, must rollback instantly | Blue-green | Instant rollback capability |
```

### Type 4: Relational Knowledge

**Definition**: Knowledge about how things connect—relationships, dependencies, and structure.

**Characteristics**:
- Structural: Describes how components relate
- Navigational: Helps find related knowledge
- Contextual: Provides the "big picture" view
- Foundational: Often needed before detailed knowledge makes sense

**Examples**:
- "The API gateway depends on the auth service for token validation"
- "Configuration files reference environment variables defined in the deployment manifest"
- "This skill is a prerequisite for the deployment skill"
- "The testing strategy applies at three levels: unit, integration, and end-to-end"

**Capture Format**: Maps, dependency diagrams, cross-references.

```markdown
## Skill Dependencies

```
skill-creator (this skill)
    ├── References: skill-anatomy (for structure rules)
    ├── References: skill-testing (for quality validation)
    └── Used by: skill-maintainer (for ongoing skill maintenance)
```
```

---

## 3. Mapping Knowledge Types to Skill Anatomy

### Directory Mapping

| Knowledge Type | Primary Location | Secondary Location | When to Use Secondary |
|---------------|------------------|-------------------|----------------------|
| Procedural | `methods/` | `SKILL.md` (summary) | When the procedure is a key capability |
| Declarative | `conventions/` | `design/` (rationale) | When the rule needs explanation |
| Conditional | `methods/` (decision trees) | `design/` (principles) | When judgment is nuanced |
| Relational | `SKILL.md` (navigation) | `design/` (architecture) | When relationships are complex |

### Mapping Process

**Step 1: Classify the knowledge**
Determine its primary type (procedural, declarative, conditional, relational).

**Step 2: Determine priority**
Is it critical, important, or supplementary?

**Step 3: Select location based on type and priority**

```
Procedural + Critical → methods/primary-method.md
Procedural + Important → methods/standard-method.md
Procedural + Supplementary → methods/advanced-method.md or omit

Declarative + Critical → SKILL.md conventions summary
Declarative + Important → conventions/standard-rules.md
Declarative + Supplementary → conventions/detailed-rules.md

Conditional + Critical → methods/decision-tree.md
Conditional + Important → design/decision-principles.md
Conditional + Supplementary → design/advanced-patterns.md

Relational + Critical → SKILL.md navigation section
Relational + Important → design/architecture.md
Relational + Supplementary → Inline cross-references
```

**Step 4: Create cross-references**
Ensure methods reference relevant conventions and design documents.

### Common Mapping Mistakes

**Mistake 1: Mixing types in one file**
Don't put procedural steps and declarative rules in the same section. Separate them so workers can load just what they need.

**Mistake 2: Putting conditional knowledge only in design/**
Conditional knowledge (when to use what) is often critical for task success. If a worker needs to make a decision, the decision criteria should be in the method, not buried in a design document.

**Mistake 3: Omitting relational knowledge**
Workers need to understand how parts of the domain connect. Without relational knowledge, they can't navigate effectively or understand context.

---

## 4. Knowledge Compression: Thorough Without Verbose

### The Compression Challenge

Domain experts often have extensive knowledge. Capturing all of it would create an unusable skill. The challenge: be thorough enough for competent work without being so verbose that the skill becomes unusable.

### Compression Principles

**Principle 1: Outcome Over Process**
Focus on what needs to be achieved, not every possible way to achieve it.

```markdown
# Bad (exhaustive)
To install dependencies, you can use npm, yarn, or pnpm.
With npm: run `npm install`
With yarn: run `yarn install`
With pnpm: run `pnpm install`
Each has different flags for production-only, dev-only, etc...

# Good (compressed)
Install dependencies: `npm install`
For production only: `npm install --production`
```

**Principle 2: Pattern Over Instance**
Teach the pattern, not every instance of the pattern.

```markdown
# Bad (enumerating instances)
To validate an email, use regex: /^[^@]+@[^@]+\.[^@]+$/
To validate a phone, use regex: /^\d{3}-\d{3}-\d{4}$/
To validate a date, use regex: /^\d{4}-\d{2}-\d{2}$/

# Good (teaching pattern)
To validate input format, define a regex pattern that matches expected format.
Common patterns are in `sources/validation-examples.md`.
```

**Principle 3: Reference Over Duplication**
State the rule once, reference it everywhere.

```markdown
# Bad (duplicated)
## Method A
Always log errors with context before throwing.

## Method B
Always log errors with context before throwing.

## Method C
Always log errors with context before throwing.

# Good (referenced)
## Method A
Handle errors per `conventions/error-handling.md`.

## Method B
Handle errors per `conventions/error-handling.md`.
```

**Principle 4: Critical Path Over Complete Coverage**
Document the critical path thoroughly. Point to principles for variations.

```markdown
## Standard Deployment (covers 80% of cases)
1. Build image
2. Push to registry
3. Update manifest
4. Apply and verify

## For non-standard cases
See `design/deployment-patterns.md` for blue-green, canary, and rollback strategies.
```

### Compression Metrics

A well-compressed skill has these characteristics:
- **No duplicated content**: The same rule doesn't appear in multiple files
- **Proportional detail**: Common tasks have more detail than rare tasks
- **Shorthand chapters**: Summaries that expand on demand
- **Reference density**: Methods reference conventions and design rather than re-explaining

---

## 5. The "Teaching an Apprentice" Test

### The Test

Imagine you are teaching a motivated but inexperienced apprentice. You give them your skill and ask them to complete a realistic task.

**Questions to ask**:
1. Can they figure out what to do without asking you questions?
2. Can they handle minor variations without explicit instructions?
3. Do they know when they're in over their head and need help?
4. Would an expert reviewing their work find it acceptable?

### Applying the Test

**Step 1: Select a realistic task**
Choose a task that represents common work in the domain.

**Step 2: Provide only the skill**
Give a worker (acting as apprentice) access only to the skill files. No additional context.

**Step 3: Observe execution**
Watch what happens:
- Where do they get stuck?
- What do they misunderstand?
- What do they skip that they shouldn't?
- What do they over-engineer?

**Step 4: Evaluate output**
Have a domain expert evaluate the result without knowing it was produced from the skill.

**Step 5: Identify gaps**
Map execution problems back to knowledge gaps:
- Missing knowledge → Add to appropriate location
- Unclear knowledge → Clarify or add examples
- Misplaced knowledge → Reorganize structure
- Excessive knowledge → Apply compression

### Passing Criteria

A skill passes the apprentice test when:
- An inexperienced worker can complete 80% of common tasks successfully
- Output quality is acceptable to domain experts
- Workers can identify when they're outside the skill's scope
- Workers can find relevant information without excessive searching

---

## 6. Domain Boundary Definition

### Why Boundaries Matter

Every domain has edges. Skills that try to cover everything end up covering nothing well. Clear boundaries ensure a skill is deep where it matters and honest about what it doesn't cover.

### Defining Scope

**The Scope Statement**: Every skill should have a clear scope statement in SKILL.md:

```markdown
## Scope

### In Scope
This skill covers:
- Creating new skills from scratch
- Structuring skill anatomy (methods, design, conventions)
- Writing effective method procedures
- Designing progressive disclosure patterns

### Out of Scope
This skill does NOT cover:
- Skill deployment and hosting
- Multi-agent coordination
- Domain-specific content creation (e.g., medical, legal)
- General software engineering practices
```

### Boundary Decision Framework

When deciding if knowledge belongs in a skill:

**Question 1: Is this core to the domain?**
- Core: Workers cannot complete basic tasks without it → Include
- Peripheral: Workers might encounter it but can work around it → Reference, don't include
- External: It belongs to a different domain → Exclude with reference

**Question 2: Can we provide unique value?**
- Yes: Our codified knowledge is better than generic references → Include
- No: External documentation covers this adequately → Reference

**Question 3: Is it sustainable?**
- Yes: This knowledge changes slowly and we can maintain it → Include
- No: This changes frequently and we can't keep up → Reference external source

### Boundary Markers

Mark boundaries clearly so workers know when they're approaching the edge:

```markdown
## Beyond This Skill

When you encounter these situations, seek specialized knowledge:
- **Advanced security**: See security skill or consult security team
- **Performance optimization**: See performance skill for profiling and optimization
- **Legacy system integration**: See legacy-integration skill for migration patterns
```

---

## 7. Cross-Domain Skills

### The Overlap Problem

Many real-world tasks span multiple domains. A deployment might involve both infrastructure and security concerns. A data pipeline might involve both data engineering and domain-specific transformations.

### Handling Overlap Patterns

**Pattern 1: Reference, Don't Duplicate**

When a task touches another domain, reference that domain's skill rather than embedding its knowledge:

```markdown
## Step 5: Configure Authentication

This skill handles the authentication setup for our framework.
For security best practices (token handling, secret management),
load the security skill: `security-skill/SKILL.md`
```

**Pattern 2: Integration Methods**

Create methods that specifically handle cross-domain tasks:

```markdown
# methods/deploy-with-security.md

## Purpose
Deploy a service following both deployment and security best practices.

## Prerequisites
- Load deployment skill: `deployment-skill/SKILL.md`
- Load security skill: `security-skill/SKILL.md`

## Procedure
This method coordinates between the deployment and security domains...
```

**Pattern 3: Boundary Agreements**

When skills overlap, document which skill owns what:

```markdown
## Domain Agreements

| Knowledge Area | Owning Skill | Overlap Handling |
|---------------|--------------|------------------|
| Deployment procedures | deployment skill | Full ownership |
| Deployment security | security skill | Deployment skill references security skill |
| Health check configuration | deployment skill | Security skill references deployment skill |
| Secret management | security skill | Full ownership |
```

**Pattern 4: Shared Conventions**

When multiple skills need the same conventions, create a shared reference:

```markdown
# Shared convention reference
Both deployment and security skills reference:
`shared-conventions/error-formatting.md`
```

### Avoiding Overlap Anti-Patterns

**Anti-Pattern 1: The All-Encompassing Skill**
One skill tries to cover everything. Results in a bloated, unmaintainable mess.

**Anti-Pattern 2: The Overlapping Skills**
Two skills cover the same knowledge differently, causing confusion about which to use.

**Anti-Pattern 3: The Orphaned Knowledge**
Knowledge that doesn't fit neatly into one skill, so it's not in any skill.

**Anti-Pattern 4: The Circular Dependency**
Skill A depends on Skill B which depends on Skill A.

Solution: Extract shared knowledge to a third skill or shared conventions.

---

## Summary: Domain Modeling Checklist

- [ ] **Extraction pipeline followed**: Knowledge went through all four stages
- [ ] **Knowledge typed correctly**: Each piece is classified as procedural, declarative, conditional, or relational
- [ ] **Mapped to anatomy**: Knowledge types are in their correct directories
- [ ] **Compressed effectively**: Content is thorough without being verbose
- [ ] **Apprentice test passed**: Inexperienced workers can produce competent output
- [ ] **Boundaries defined**: Scope is clear about what's in and out
- [ ] **Cross-domain handled**: Overlaps with other domains are addressed

Domain modeling is the bridge between human expertise and worker capability. A well-modeled domain doesn't just capture what experts know—it captures how experts think, decide, and act. When done right, the skill becomes a force multiplier, enabling any worker to operate at expert level within the domain's scope.