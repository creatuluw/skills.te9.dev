# Domain Discovery & Research

Extract the complete body of knowledge a domain expert possesses so the skill can reproduce expert-level work.

## Purpose

Domain discovery is the foundational phase of skill creation. Before a single line of skill content is written, you must thoroughly understand the domain — its concepts, methods, conventions, pitfalls, quality criteria, and the unwritten rules that separate novices from experts. This method ensures no critical knowledge area is overlooked and that the resulting skill carries the full depth of expertise a worker needs to produce excellent work.

A skill built on incomplete domain knowledge will produce incomplete work. The skill's value comes from the depth and completeness of its domain knowledge, and that depth begins with rigorous discovery.

## When to Use

- At the start of every new skill creation, before any content is written
- When upgrading an existing skill with deeper domain expertise
- When a skill has been producing suboptimal results and gaps in domain knowledge are suspected
- When merging multiple domains into a hybrid skill (e.g., full-stack development combining frontend, backend, and DevOps)

Do NOT skip discovery even when the user says "just create a skill for X." Explain that thorough discovery is essential and will produce a dramatically better skill.

---

## Step-by-Step Discovery Process

### Step 1: Define the Domain Boundary

Clarify what the domain encompasses and where it ends. Domains that are too broad produce shallow skills; domains that are too narrow produce skills that can't handle real-world complexity.

**Actions:**
1. Write a one-sentence domain definition: "This skill operates in the domain of [X], which encompasses [Y]."
2. Identify what is explicitly IN scope
3. Identify what is explicitly OUT of scope
4. Identify boundary areas that overlap with adjacent domains
5. Document dependencies on other domains (e.g., API design depends on HTTP knowledge)

**Output:** Domain Boundary Statement

**Example:**
```
Domain: REST API Development
IN scope: HTTP methods, status codes, resource modeling, authentication,
          versioning, error handling, pagination, HATEOAS basics
OUT of scope: Specific framework implementation (Express, FastAPI),
              database schema design, frontend consumption patterns
Dependencies: HTTP protocol, JSON specification, authentication protocols
Adjacent domains: Database design, frontend development, DevOps/deployment
```

### Step 2: Identify Target Audience and Expertise Level

Determine who the skill is for and what baseline knowledge they have. This determines how much foundational explanation is needed versus how much can be assumed.

**Actions:**
1. Define the target user profile (junior developer, senior engineer, designer, data scientist, etc.)
2. Identify what baseline knowledge can be assumed
3. Identify what must be taught explicitly
4. Determine the expertise ceiling — should the skill support expert-level work or stop at intermediate?

**Output:** Target Audience Profile

**Example:**
```
Target: Mid-level software engineer
Assumed knowledge: Basic programming, Git, command line
Must teach: Domain-specific patterns, advanced techniques, domain conventions
Expertise ceiling: Support through senior-level work; advanced/edge-case
                   techniques included but marked as advanced
```

### Step 3: Enumerate Knowledge Areas

Systematically list every area of expertise the domain requires. This is the most critical step — missing a knowledge area means the skill will have a blind spot.

Use the Knowledge Area Enumeration Template (below) to ensure comprehensive coverage.

**Actions:**
1. Brainstorm all knowledge areas without filtering
2. Organize into categories (core, supporting, contextual)
3. Validate against the Completeness Validation Criteria (below)
4. Cross-reference with domain documentation, textbooks, and expert sources
5. Present to the user for validation: "Did I miss anything?"

**Output:** Complete Knowledge Area Inventory

### Step 4: Extract Fundamental Principles

For each knowledge area, identify the foundational principles that govern all work in that area. These are the rules that experts internalize and apply unconsciously.

**Actions:**
1. List the invariants — what must ALWAYS be true
2. List the constraints — what must NEVER happen
3. List the heuristics — what guides decision-making
4. List the trade-offs — what experts weigh when making choices
5. For each principle, capture the rationale: why does this principle exist?

**Output:** Fundamental Principles per Knowledge Area

**See also:** `methods/fundamentals-extraction.md` for deep extraction techniques.

### Step 5: Catalog Methods and Techniques

Document every method and technique practitioners use in the domain. This forms the core "how-to" knowledge of the skill.

**Actions:**
1. List all standard methods used in the domain
2. For each method, capture:
   - What it achieves (purpose)
   - When it's used (triggers/conditions)
   - How it's performed (procedure)
   - What can go wrong (gotchas)
3. Identify variations — methods that have multiple valid approaches
4. Note deprecated or outdated methods to actively avoid
5. Identify methods unique to the user's team or organization

**Output:** Methods and Techniques Catalog

**See also:** `methods/methods-codification.md` for documentation templates.

### Step 6: Identify Patterns and Anti-Patterns

Recognize recurring solution structures (patterns) and recurring mistake structures (anti-patterns) in the domain.

**Actions:**
1. List commonly occurring problems in the domain
2. For each problem, identify the standard solution pattern
3. Document anti-patterns — approaches that seem correct but lead to problems
4. Capture pattern composition rules — which patterns work together, which conflict
5. Note domain-specific pattern names and terminology

**Output:** Pattern and Anti-Pattern Inventory

### Step 7: Gather Conventions and Standards

Collect all conventions, standards, and norms that practitioners follow. These may be industry-wide, language-specific, framework-specific, or team-specific.

**Actions:**
1. Research industry standards (e.g., RFCs, W3C specs, ISO standards)
2. Identify language/framework conventions (e.g., PEP 8 for Python, Airbnb style for JS)
3. Ask the user about team-specific conventions
4. Document naming conventions, structural conventions, and style conventions
5. For each convention, capture the rationale — why does it exist?

**Output:** Conventions and Standards Collection

### Step 8: Document Quality Criteria and Evaluation Methods

Define what "good" looks like in the domain and how to evaluate work quality.

**Actions:**
1. List all quality dimensions relevant to the domain (correctness, performance, maintainability, security, etc.)
2. For each dimension, define measurable criteria
3. Identify standard evaluation methods (code review checklists, testing strategies, performance benchmarks)
4. Document common quality pitfalls — what passes initial review but fails in production
5. Define the "definition of done" for typical domain tasks

**Output:** Quality Criteria and Evaluation Framework

### Step 9: Collect Common Pitfalls and Edge Cases

Gather the non-obvious problems that trip up practitioners, especially those that aren't covered in standard documentation.

**Actions:**
1. List common mistakes practitioners make
2. Identify edge cases that standard methods don't handle well
3. Document "gotchas" — things that seem straightforward but have hidden complexity
4. Collect war stories — real-world failures and what caused them
5. Note environment-specific issues (platform quirks, version incompatibilities)

**Output:** Pitfalls and Edge Cases Register

### Step 10: Validate with the User

Present the complete discovery findings to the user for validation and gap-filling.

**Actions:**
1. Present the full Knowledge Area Inventory
2. Ask: "Are there domain-specific methods, proprietary techniques, or team conventions I should include?"
3. Ask: "What areas do you find existing practitioners most often get wrong?"
4. Ask: "Are there upcoming changes or trends in this domain I should account for?"
5. Incorporate user feedback and re-validate

**Output:** Validated Domain Knowledge Base

---

## Knowledge Area Enumeration Template

Use this template when enumerating knowledge areas in Step 3. Copy and fill in for each knowledge area identified.

```markdown
### Knowledge Area: [Name]

**Category:** Core / Supporting / Contextual
**Priority:** Critical / High / Medium / Low
**Description:** [What this knowledge area covers in 1-2 sentences]

**Fundamental Principles:**
- [Principle 1]: [Brief explanation]
- [Principle 2]: [Brief explanation]

**Key Methods:**
- [Method 1]: [One-line description]
- [Method 2]: [One-line description]

**Common Pitfalls:**
- [Pitfall 1]: [Why it happens]
- [Pitfall 2]: [Why it happens]

**Quality Criteria:**
- [Criterion 1]: [How to measure]
- [Criterion 2]: [How to measure]

**Sources:**
- [Source 1]
- [Source 2]

**Dependencies on other knowledge areas:**
- [Area X] for [reason]
```

### Comprehensive Knowledge Area Checklist

When enumerating knowledge areas, ensure you cover ALL of these dimensions:

**Conceptual Knowledge:**
- [ ] Core concepts and terminology
- [ ] Mental models and conceptual frameworks
- [ ] Domain ontology — how entities relate to each other
- [ ] Scope boundaries — what's in and out of the domain

**Procedural Knowledge:**
- [ ] Standard operating procedures
- [ ] Step-by-step workflows for common tasks
- [ ] Decision trees for choosing between approaches
- [ ] Troubleshooting and diagnostic procedures

**Design Knowledge:**
- [ ] Design patterns and architectural approaches
- [ ] Design principles and rules
- [ ] Trade-off analysis frameworks
- [ ] System design methodologies

**Technical Knowledge:**
- [ ] Tools and their usage
- [ ] Frameworks, libraries, and ecosystems
- [ ] Configuration and setup procedures
- [ ] Platform-specific considerations

**Quality Knowledge:**
- [ ] Quality standards and criteria
- [ ] Testing and verification methods
- [ ] Code review / work review standards
- [ ] Performance benchmarks and targets

**Convention Knowledge:**
- [ ] Naming conventions
- [ ] Structural conventions (file organization, layout)
- [ ] Style conventions (formatting, presentation)
- [ ] Process conventions (workflow, review, deployment)

**Contextual Knowledge:**
- [ ] Domain history and evolution
- [ ] Current trends and emerging practices
- [ ] Common team structures and collaboration patterns
- [ ] Stakeholder expectations and communication norms

**Error Knowledge:**
- [ ] Common mistakes and how to avoid them
- [ ] Anti-patterns and their warning signs
- [ ] Debugging and troubleshooting strategies
- [ ] Edge cases and corner cases

---

## Domain Expert Interview Questions

When you have access to a domain expert (including the user), use these questions to extract deep knowledge. Ask follow-up questions based on their answers.

### Opening Questions
1. "If you had to explain this domain to a smart colleague from a different field, how would you describe it?"
2. "What are the 5 most important concepts someone needs to understand to work in this domain?"
3. "What's the difference between a junior and senior practitioner in this field?"

### Knowledge Depth Questions
4. "What are the fundamental principles that govern all work in this domain?"
5. "What rules should NEVER be broken, and what happens when they are?"
6. "What heuristics do you use when making decisions in this domain?"
7. "What trade-offs do you find yourself weighing most often?"

### Practical Experience Questions
8. "Walk me through how you'd approach [common domain task] from start to finish."
9. "What's your process for deciding between [Approach A] and [Approach B]?"
10. "What tools do you reach for most often, and why those specifically?"

### Pitfall and Edge Case Questions
11. "What mistakes do you see practitioners make most often?"
12. "What are the non-obvious gotchas in this domain?"
13. "Can you tell me about a time something went wrong and what caused it?"
14. "What edge cases always seem to catch people off guard?"

### Quality and Evaluation Questions
15. "How do you evaluate whether work in this domain is 'good'?"
16. "What separates adequate work from excellent work?"
17. "What does your review checklist look like?"
18. "What quality issues do you see most frequently in others' work?"

### Convention and Culture Questions
19. "What conventions does everyone in this domain follow?"
20. "Are there team-specific or organization-specific conventions I should know about?"
21. "What naming or structural conventions do you consider essential?"
22. "What conventions exist that you disagree with, and why?"

### Evolution and Trends Questions
23. "How has this domain changed in the last few years?"
24. "What emerging practices should I be aware of?"
25. "What practices are becoming deprecated or considered anti-patterns?"
26. "Where do you go to stay current in this domain?"

### Gap-Filling Questions
27. "Are there areas of this domain I haven't asked about that are important?"
28. "If you could only teach one thing about this domain, what would it be?"
29. "What do you wish someone had told you when you started in this domain?"
30. "Is there anything about this domain that's hard to learn from documentation alone?"

---

## Research Strategies by Domain Type

Different domain types require different research approaches. Use the strategies appropriate for the domain you're researching.

### Software Engineering Domains

**Examples:** Web development, API design, database engineering, DevOps, mobile development

**Primary sources:**
- Official documentation for languages, frameworks, and tools
- RFC specifications for protocol-based domains
- GitHub repositories with high-quality code in the domain
- Stack Overflow patterns — what questions are asked most frequently
- Engineering blogs from leading companies (Uber Engineering, Netflix TechBlog, etc.)

**Research approach:**
1. Read the official "getting started" guide to understand basics
2. Study the "advanced" or "guides" sections for deeper knowledge
3. Examine well-regarded open-source projects in the domain
4. Search for "best practices" and "common mistakes" articles
5. Review style guides (Google, Airbnb, etc.) for conventions
6. Look for conference talks and technical presentations
7. Study architectural decision records (ADRs) from real projects

**Key indicators of completeness:**
- All major frameworks/tools are covered
- Error handling patterns are documented
- Performance considerations are included
- Security practices are addressed
- Testing strategies are covered

### Data Science & ML Domains

**Examples:** Machine learning, data engineering, statistical analysis, NLP, computer vision

**Primary sources:**
- Academic papers and surveys (arXiv, Google Scholar)
- Framework documentation (scikit-learn, PyTorch, TensorFlow)
- Kaggle competitions and winning solutions
- Textbooks for foundational theory
- Domain-specific benchmarks and datasets

**Research approach:**
1. Start with foundational theory — what mathematical principles underpin the domain
2. Study standard algorithms and their implementations
3. Research evaluation metrics and validation methods
4. Examine common data preprocessing and feature engineering techniques
5. Study model selection and hyperparameter tuning approaches
6. Research deployment and production considerations
7. Look for reproducibility guidelines and experiment tracking practices

**Key indicators of completeness:**
- Mathematical foundations are explained intuitively
- Data quality and preprocessing are thoroughly covered
- Model evaluation and validation methods are documented
- Common failure modes (overfitting, data leakage, etc.) are addressed
- Production deployment considerations are included

### Design Domains

**Examples:** UI/UX design, visual design, interaction design, information architecture

**Primary sources:**
- Design systems from leading companies (Material Design, Apple HIG, IBM Carbon)
- Design pattern libraries
- User research methodologies
- Accessibility guidelines (WCAG)
- Typography and color theory references

**Research approach:**
1. Study established design systems for patterns and conventions
2. Research user research and testing methodologies
3. Review accessibility standards and compliance requirements
4. Study platform-specific design guidelines
5. Examine design critique frameworks
6. Research design-to-handoff processes
7. Look for common design anti-patterns and their causes

**Key indicators of completeness:**
- User-centered design principles are documented
- Accessibility requirements are thoroughly covered
- Platform conventions are addressed
- Design review criteria are clear
- Handoff and implementation considerations are included

### Infrastructure & DevOps Domains

**Examples:** Cloud architecture, containerization, CI/CD, monitoring, security

**Primary sources:**
- Cloud provider documentation (AWS, GCP, Azure)
- Well-architected frameworks (AWS Well-Architected, etc.)
- Infrastructure as Code best practices
- Incident post-mortems from engineering blogs
- Security frameworks (NIST, OWASP, CIS Benchmarks)

**Research approach:**
1. Study the well-architected framework for the target platform
2. Research infrastructure as code patterns and anti-patterns
3. Study monitoring, alerting, and observability practices
4. Research disaster recovery and business continuity patterns
5. Study security hardening and compliance requirements
6. Examine common failure modes from incident reports
7. Research cost optimization strategies

**Key indicators of completeness:**
- Reliability and availability patterns are covered
- Security best practices are thorough
- Monitoring and alerting strategies are documented
- Disaster recovery procedures are included
- Cost considerations are addressed

### Domain-Specific Business Domains

**Examples:** Finance, healthcare, legal tech, e-commerce, education

**Primary sources:**
- Industry regulations and compliance standards
- Domain-specific textbooks and reference materials
- Professional certification study materials
- Industry body publications and standards
- Subject matter expert interviews

**Research approach:**
1. Research regulatory requirements and compliance obligations
2. Study domain-specific terminology and ontology
3. Understand business processes and workflows
4. Research common domain-specific constraints and rules
5. Study integration patterns with other systems
6. Research data privacy and security requirements
7. Look for industry-specific quality standards

**Key indicators of completeness:**
- Regulatory requirements are thoroughly documented
- Domain terminology is accurately defined
- Business rules and constraints are captured
- Integration points with other domains are identified
- Compliance verification methods are included

---

## Completeness Validation Criteria

After completing domain discovery, validate your findings against these criteria. If any criterion fails, return to the discovery process and fill gaps.

### The "Junior to Expert" Test

**Criterion:** Would a junior practitioner using only the discovered knowledge produce work that an expert would approve?

**How to validate:**
1. Pick 3 typical tasks in the domain
2. Trace through what knowledge would be needed to complete each task
3. Verify that all needed knowledge has been discovered
4. Identify any assumptions that aren't covered

**Pass:** All tasks can be completed with discovered knowledge
**Fail:** Tasks require knowledge not yet discovered

### The "Why Does This Exist" Test

**Criterion:** For every rule, convention, and method, can you explain why it exists and what happens if it's ignored?

**How to validate:**
1. List all rules and conventions discovered
2. For each, write the rationale in one sentence
3. For each, describe the consequence of violation in one sentence
4. Flag any rule where you can't articulate both

**Pass:** Every rule has clear rationale and consequence
**Fail:** Rules exist without explanation

### The "Blind Spot" Test

**Criterion:** Are there domain tasks or situations that no discovered knowledge covers?

**How to validate:**
1. List 10 common scenarios in the domain
2. For each, identify which knowledge areas apply
3. Check that every scenario is covered by at least one knowledge area
4. Identify scenarios that fall through the cracks

**Pass:** All common scenarios are covered
**Fail:** Scenarios exist with no knowledge coverage

### The "Expert Review" Test

**Criterion:** Would a domain expert agree that the knowledge inventory is complete?

**How to validate:**
1. Present the knowledge area inventory to the user or a domain expert
2. Ask: "What's missing?"
3. Ask: "What would you add?"
4. Ask: "What's wrong or misleading?"

**Pass:** Expert confirms completeness with no significant additions
**Fail:** Expert identifies significant gaps

### The "Anti-Pattern Coverage" Test

**Criterion:** For every method and pattern, are the corresponding anti-patterns and failure modes documented?

**How to validate:**
1. List all methods and patterns discovered
2. For each, identify the common failure mode or anti-pattern
3. Verify that pitfalls are documented for each method
4. Check that "what not to do" exists alongside "what to do"

**Pass:** Every method has corresponding pitfall documentation
**Fail:** Methods lack failure mode documentation

---

## Common Mistakes During Discovery

### Mistake 1: Skipping Discovery Because "You Already Know the Domain"

**What happens:** The skill creator assumes their knowledge is sufficient and skips rigorous discovery.

**Result:** The skill contains knowledge gaps that only surface during real-world use, producing incorrect or incomplete work.

**Prevention:** Always follow the full discovery process, even for domains you're familiar with. You'll be surprised what you've forgotten or never knew.

### Mistake 2: Confusing Documentation with Domain Knowledge

**What happens:** The skill creator reads official documentation and assumes that's the complete picture.

**Result:** The skill knows the "happy path" but not the real-world complexities, edge cases, and unwritten rules that documentation often omits.

**Prevention:** Supplement documentation with real-world sources: Stack Overflow, engineering blogs, incident reports, and expert interviews.

### Mistake 3: Going Too Broad

**What happens:** The domain boundary is defined too widely, attempting to cover too much territory.

**Result:** The skill has shallow coverage of many areas instead of deep coverage of the target domain. Workers can't produce expert-level work in any area.

**Prevention:** Define tight domain boundaries. It's better to have multiple focused skills than one shallow mega-skill.

### Mistake 4: Ignoring Conventions

**What happens:** The skill creator focuses on technical knowledge and overlooks conventions, style, and process norms.

**Result:** The worker produces technically correct work that doesn't fit the team's conventions, causing friction in review and integration.

**Prevention:** Explicitly include convention discovery in every knowledge area enumeration. Ask the user about team-specific conventions.

### Mistake 5: Not Documenting Failure Modes

**What happens:** The discovery focuses on correct approaches without documenting what goes wrong and why.

**Result:** Workers know what to do but not what to avoid. They fall into common traps that experts have learned to sidestep.

**Prevention:** For every method and pattern, explicitly research and document failure modes, anti-patterns, and common mistakes.

### Mistake 6: Assuming One Right Way

**What happens:** The skill creator finds one valid approach and assumes it's the only approach.

**Result:** The skill is rigid and doesn't handle situations where multiple valid approaches exist. Workers can't adapt to context-specific requirements.

**Prevention:** Explicitly search for alternative approaches. When multiple methods are valid, document all of them with guidance on when to use each.

### Mistake 7: Copying Without Understanding

**What happens:** The skill creator copies content from sources without deeply understanding the reasoning behind it.

**Result:** The skill contains accurate-sounding content that the creator can't adapt or debug when issues arise during skill creation.

**Prevention:** For every piece of knowledge, ensure you understand the "why" before documenting it. If you can't explain it simply, you don't understand it well enough.

### Mistake 8: Neglecting Tool and Environment Specifics

**What happens:** The discovery covers abstract domain knowledge without addressing specific tools, versions, and environments.

**Result:** Workers know the theory but struggle with practical implementation because tool-specific details are missing.

**Prevention:** Include tool-specific knowledge: configuration, quirks, version differences, and environment setup.

### Mistake 9: Failing to Validate with the User

**What happens:** The skill creator completes discovery and moves straight to content creation without user validation.

**Result:** The skill may miss proprietary methods, team-specific conventions, or domain nuances unique to the user's context.

**Prevention:** Always present discovery findings to the user before proceeding. Use the expert interview questions and validation criteria.

### Mistake 10: Treating Discovery as a One-Time Event

**What happens:** Discovery is done once at the start and never revisited.

**Result:** The skill becomes stale as the domain evolves. New methods emerge, conventions change, and better practices are discovered.

**Prevention:** Design self-learning mechanisms that surface the need for re-discovery. Schedule periodic reviews of domain knowledge currency.

---

## Good and Bad Examples

### Good Example: Domain Discovery for a React Frontend Skill

**Domain Boundary Statement:**
```
Domain: React Frontend Development
IN scope: Component design, state management, hooks, routing, performance
          optimization, testing, accessibility, form handling, error boundaries
OUT of scope: Backend API development, database design, DevOps/deployment,
              CSS-in-JS library internals
Dependencies: JavaScript/TypeScript, HTML, CSS, HTTP, browser APIs
Adjacent domains: Backend development, UX design, testing/QA
```

**Knowledge Area Inventory (excerpt):**
```
1. Component Architecture (Core, Critical)
   - Principles: Composition over inheritance, single responsibility,
     controlled vs. uncontrolled components
   - Methods: Component decomposition, prop drilling vs. context,
     render props and HOCs
   - Pitfalls: Prop drilling too deep, god components, premature abstraction
   - Quality: Component reusability test, prop interface clarity

2. State Management (Core, Critical)
   - Principles: Single source of truth, state colocation,
     derived state over synchronized state
   - Methods: useState, useReducer, Context API, external stores (Redux, Zustand)
   - Pitfalls: Stale closures, unnecessary re-renders, state synchronization bugs
   - Quality: State update predictability, render performance

3. Performance Optimization (Core, High)
   - Principles: Measure before optimizing, avoid premature optimization,
     profile-guided optimization
   - Methods: React.memo, useMemo, useCallback, code splitting, lazy loading,
     virtualization
   - Pitfalls: Over-memoizing, measuring incorrectly, optimizing the wrong bottleneck
   - Quality: Lighthouse scores, render count analysis, bundle size monitoring

4. Testing (Core, High)
   - Principles: Test behavior not implementation, user-centric testing,
     testing pyramid
   - Methods: Unit tests (Jest), component tests (Testing Library), E2E (Cypress/Playwright)
   - Pitfalls: Testing implementation details, brittle selectors, over-mocking
   - Quality: Coverage metrics, test reliability, CI integration

5. Accessibility (Supporting, High)
   - Principles: WCAG compliance, keyboard navigation, screen reader compatibility
   - Methods: Semantic HTML, ARIA attributes, focus management, announcements
   - Pitfalls: Missing alt text, keyboard traps, dynamic content without announcements
   - Quality: axe audit, manual keyboard testing, screen reader testing
```

**Why this is good:**
- Clear domain boundary with explicit in/out scope
- Knowledge areas are categorized and prioritized
- Each area includes principles, methods, pitfalls, AND quality criteria
- Adjacent domains identified for boundary awareness
- The inventory is comprehensive enough to guide skill content creation

### Bad Example: Domain Discovery for a React Frontend Skill

**Domain Boundary Statement:**
```
Domain: React
Covers: React stuff
```

**Knowledge Area Inventory (excerpt):**
```
1. Components
   - How to make components

2. Hooks
   - useState
   - useEffect

3. Redux
   - Setting up Redux
```

**Why this is bad:**
- No boundary definition — "React stuff" is vague and unbounded
- Knowledge areas are superficial with no depth
- Missing critical areas: testing, performance, accessibility, error handling, routing
- No principles, pitfalls, or quality criteria documented
- No prioritization — all areas seem equally important (or unimportant)
- "How to make components" is a declaration, not a knowledge structure
- Redux is listed but Context API and other state management approaches are missing
- This will produce a skill that knows React exists but can't produce expert-level work

### Good Example: Domain Discovery for a Database Design Skill

**User Consultation Result:**
```
Presented initial findings to user. User added:
- "We use PostgreSQL exclusively — include Postgres-specific features like JSONB,
   array types, and partial indexes."
- "Our team follows the 'database first' design pattern where the schema is the
   source of truth. Include migration-driven development."
- "We have a custom naming convention: tables are singular, columns are snake_case,
   foreign keys are always [referenced_table]_id."
- "Common issue: our devs often forget to add indexes for foreign keys. Make sure
   that's prominent."
- "We use row-level security in some schemas. Include that in the skill."
Incorporated all feedback into knowledge inventory.
```

**Why this is good:**
- Discovery was validated with the user
- Team-specific conventions were captured
- Real-world pain points were identified and incorporated
- The result combines general domain knowledge with team-specific practices

### Bad Example: Domain Discovery for a Database Design Skill

**User Consultation Result:**
```
(User asked to create a database design skill)
Creator: "I know databases. I'll create the skill based on my knowledge."
(No user consultation was performed)
Result: Skill covers MySQL conventions for a team that uses PostgreSQL.
        Missing critical team-specific conventions.
        Missing row-level security which is essential for their multi-tenant app.
```

**Why this is bad:**
- Creator skipped user validation entirely
- Assumptions were made about tools and conventions
- The resulting skill is misaligned with actual needs
- Critical domain-specific features (row-level security) were missed
- This will produce work that doesn't fit the team's actual practice

---

## Summary Checklist

Before concluding domain discovery, verify:

- [ ] Domain boundary is clearly defined with explicit in/out scope
- [ ] Target audience and expertise level are documented
- [ ] All knowledge areas are enumerated using the template
- [ ] All 8 knowledge dimensions from the checklist are covered
- [ ] Fundamental principles are extracted for each knowledge area
- [ ] Methods and techniques are cataloged
- [ ] Patterns and anti-patterns are identified
- [ ] Conventions and standards are collected
- [ ] Quality criteria and evaluation methods are documented
- [ ] Common pitfalls and edge cases are captured
- [ ] User has validated findings and contributed domain-specific knowledge
- [ ] All completeness validation criteria pass
- [ ] No common mistakes have been made

If any item is unchecked, revisit the relevant section before proceeding to anatomy design.