# Quality Standards for Production-Ready Skills

## The Apprentice Test

The ultimate measure of skill quality: could a junior practitioner produce expert-level work using only this skill as guidance?

### Test Criteria

1. **Clarity Test**: Can the apprentice understand what to do without asking questions?
2. **Completeness Test**: Does the skill provide everything needed, with no critical gaps?
3. **Confidence Test**: Does the apprentice feel certain they're making the right decisions?
4. **Correctness Test**: Does the final output match expert-quality standards?
5. **Efficiency Test**: Can the apprentice complete the task without excessive backtracking?

### Passing Standard

A skill passes the apprentice test when three junior practitioners, working independently, all produce work that meets expert standards without external help.

## Completeness Standards

### Knowledge Area Coverage

Every skill must address all relevant knowledge areas:

1. **Core Concepts**: Fundamental ideas that define the domain
2. **Key Terminology**: Specialized vocabulary with clear definitions
3. **Critical Facts**: Non-obvious information that impacts decisions
4. **Common Scenarios**: Typical situations the practitioner will encounter
5. **Edge Cases**: Unusual situations that require special handling

### Method Completeness

Each method must include:

- **Purpose**: What the method accomplishes
- **Prerequisites**: What must be true before starting
- **Inputs**: Required and optional inputs with formats
- **Steps**: Sequential actions to complete the method
- **Outputs**: Expected deliverables and their formats
- **Validation**: How to verify correct execution
- **Troubleshooting**: Common failures and their remedies
- **Examples**: At least two worked examples (simple and complex)

### Convention Completeness

Each convention must include:

- **Rule**: The explicit standard to follow
- **Rationale**: Why this rule exists (not just what it is)
- **Examples**: Correct and incorrect demonstrations
- **Exceptions**: When the rule does not apply
- **Verification**: How to check compliance

### Gap Detection

Check for gaps by asking:

1. What questions would a newcomer ask that aren't answered?
2. What mistakes do beginners make that aren't warned against?
3. What decisions require domain knowledge not provided?
4. What steps assume prior experience?
5. What context is missing that experts take for granted?

## Accuracy Standards

### Domain Knowledge Accuracy

1. **Technical Correctness**: All code, commands, and procedures must work as described
2. **Current Practices**: Standards reflect current best practices, not deprecated approaches
3. **Version Specificity**: When version matters, specify which version
4. **Contextual Accuracy**: Advice applies correctly to stated context

### Best Practice Currency

1. **Review Frequency**: Skills should be reviewed quarterly for currency
2. **Change Indicators**: Mark areas prone to rapid change
3. **Deprecation Notices**: Flag outdated approaches with migration guidance
4. **Source Attribution**: Cite authoritative sources for factual claims

### Validation Requirements

1. **Tested Examples**: All examples must be tested and verified working
2. **Reviewed Content**: Domain experts must review technical content
3. **Real-World Validation**: Content validated against real-world usage
4. **Feedback Integration**: User feedback must be addressed

## Usability Standards

### Navigation

1. **SKILL.md Index**: Complete navigation index with all sections
2. **Cross-References**: Bidirectional links between related content
3. **Consistent Structure**: Same organizational pattern across sections
4. **Discoverability**: Content findable through multiple navigation paths

### Findability

1. **Descriptive Titles**: Section names clearly indicate content
2. **Search Terms**: Include common synonyms and alternate terms
3. **Logical Grouping**: Related content placed together
4. **Progressive Disclosure**: Quick answers in SKILL.md, depth in files

### Actionability

1. **Clear Instructions**: Imperative phrasing with specific actions
2. **Complete Steps**: No missing steps or assumed knowledge
3. **Decision Criteria**: Explicit rules for choosing between options
4. **Expected Outcomes**: What success looks like at each step
5. **Error Recovery**: What to do when things go wrong

### Cognitive Load Management

1. **Chunking**: Information presented in digestible units
2. **Sequencing**: Content ordered from simple to complex
3. **Signposting**: Clear indicators of content purpose and scope
4. **Redundancy**: Critical information repeated appropriately

## Self-Learning Standards

### Feedback Mechanisms

1. **Usage Tracking**: Mechanisms to detect how the skill is used
2. **Error Detection**: Ways to identify when the skill leads to errors
3. **Success Indicators**: Signals that the skill produced good outcomes
4. **User Feedback**: Channels for practitioners to report issues

### Improvement Triggers

Flag the skill for review when:

1. **Repeated Errors**: Multiple users make the same mistake
2. **Frequent Questions**: Same clarification requested repeatedly
3. **Outdated Information**: Content no longer matches current practice
4. **Missing Scenarios**: New situations not covered by existing methods
5. **Better Approaches**: Superior techniques discovered

### Evolution Protocol

1. **Version Tracking**: Track skill versions and changes
2. **Change Log**: Document what changed and why
3. **Backward Compatibility**: Ensure existing work remains valid
4. **Migration Guidance**: Help users transition to updated approaches

## Anatomy Compliance Standards

### Required Components

Every production skill must have:

- [ ] `SKILL.md` with complete frontmatter and navigation index
- [ ] `product/` directory with comprehensive domain knowledge
- [ ] `methods/` directory with executable procedures
- [ ] `conventions/` directory with enforced standards
- [ ] `design/` directory with architectural decisions (if applicable)

### Component Quality

1. **SKILL.md**: Serves as both entry point and quick reference
2. **Product Knowledge**: Covers domain completely without redundancy
3. **Methods**: Each one independently executable
4. **Conventions**: Clear rules with rationale and verification
5. **Design**: Documents key decisions and their rationale

### Cross-Component Consistency

1. **Terminology**: Same terms used consistently across all files
2. **Examples**: Consistent style and complexity level
3. **References**: All cross-references valid and bidirectional
4. **Tone**: Uniform voice throughout the skill

## Documentation Quality Standards

### Writing Quality

1. **Clarity**: Every sentence has a single, unambiguous interpretation
2. **Conciseness**: No unnecessary words or redundant information
3. **Consistency**: Same patterns and structures throughout
4. **Correctness**: No grammatical or technical errors

### Formatting Standards

1. **Markdown Compliance**: Valid markdown with no syntax errors
2. **Heading Hierarchy**: Proper nesting with no skipped levels
3. **Code Blocks**: Language specified for all code blocks
4. **Lists**: Consistent use of ordered and unordered lists
5. **Tables**: Used appropriately for structured data

### Link Quality

1. **Internal Links**: All cross-references resolve correctly
2. **Descriptive Text**: Link text describes the target
3. **No Orphans**: Every file is reachable from navigation
4. **No Broken Links**: No references to non-existent content

## Production Readiness Review Checklist

### Content Review

- [ ] All knowledge areas covered with no critical gaps
- [ ] All methods tested and verified working
- [ ] All conventions have rationale and examples
- [ ] All examples are correct and tested
- [ ] All edge cases documented
- [ ] All common errors addressed

### Structure Review

- [ ] SKILL.md frontmatter complete and accurate
- [ ] Navigation index complete and ordered logically
- [ ] Directory structure follows conventions
- [ ] File naming follows conventions
- [ ] Cross-references are valid and bidirectional

### Quality Review

- [ ] Passes the apprentice test with three independent reviewers
- [ ] No grammatical or spelling errors
- [ ] Consistent terminology throughout
- [ ] Consistent voice and tone
- [ ] Appropriate level of detail for target audience

### Usability Review

- [ ] Content is findable through multiple paths
- [ ] Instructions are actionable without ambiguity
- [ ] Decision criteria are explicit
- [ ] Error recovery guidance is included
- [ ] Progressive disclosure is implemented

### Technical Review

- [ ] All code examples execute correctly
- [ ] All procedures produce expected results
- [ ] All tool references are current
- [ ] All version requirements specified
- [ ] All platform constraints documented

### Maintenance Review

- [ ] Review date is set
- [ ] Content owner is identified
- [ ] Feedback mechanism is established
- [ ] Update triggers are defined
- [ ] Version history is initialized

## Quality Metrics

### Quantitative Standards

1. **Completeness**: 100% of required sections present
2. **Accuracy**: 0 known errors at release
3. **Coverage**: All common scenarios addressed
4. **Usability**: Apprentice test pass rate ≥ 95%

### Qualitative Standards

1. **Confidence**: Practitioners feel certain using the skill
2. **Efficiency**: Tasks completed without excessive navigation
3. **Satisfaction**: Positive feedback from practitioners
4. **Adoption**: Skill is used as intended without workarounds

## Enforcement

These standards are enforced through:

1. **Review Process**: All skills must pass review before production use
2. **Regular Audits**: Periodic checks against evolving standards
3. **Feedback Loops**: Continuous improvement based on usage data
4. **Version Control**: Changes tracked and reversible