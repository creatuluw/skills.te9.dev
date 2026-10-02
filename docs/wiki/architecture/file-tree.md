---
type: Artifact
title: File tree
description: Complete project file listing with per-file descriptions.
timestamp: "2026-10-02T10:26:23.977Z"
---

# File tree — generated 2026-10-02T10:26:23.977Z
# Depth-capped at 3 levels. Excludes .git internals, node_modules, __pycache__, and
# gitignored strays (~/ accidental clone, .work/, .pi/, reports/, three-js-advanced-gpt-6.zip).
# Vendored skills are committed as plain directories — no embedded .git (see [[vendor-skills-as-plain-dirs]]).

```text
.
├── .agents/
│   └── skills/
├── .archive/
│   ├── codebase-context/
│   │   ├── evals/
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── codebase-documenter/
│   │   ├── assets/
│   │   ├── references/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── SKILL.md
│   ├── codebase-to-course/
│   │   ├── references/
│   │   ├── README.md
│   │   └── SKILL.md
│   ├── plugins/
│   │   └── autoresearch-context.ts
│   ├── research_opencode_models/
│   │   ├── findings_deepseek_qwen.md
│   │   ├── findings_glm_kimi.md
│   │   ├── findings_mimo_minimax.md
│   │   ├── research_plan.md
│   │   └── research_report.md
│   ├── .architecture.md
│   ├── AGENTS.md
│   ├── autoresearch-dashboard.md
│   ├── autoresearch.md
│   ├── karpathy-examples.md
│   ├── karpathy-guidelines.md
│   └── karpathy-readme.md
├── .design-system/
│   ├── design-system.json
│   ├── design-system.md
│   ├── index.html
│   ├── script.js
│   └── style.css
├── add-evals-to-skill/
│   ├── evals/
│   │   ├── fixtures/
│   │   ├── cases.mjs
│   │   └── run.mjs
│   ├── references/
│   │   └── EVAL-DESIGN.md
│   ├── scripts/
│   │   ├── analyze.mjs
│   │   └── scaffold.mjs
│   ├── templates/
│   │   ├── cases-script-skill.mjs
│   │   ├── evals.json
│   │   ├── grade.mjs
│   │   ├── run-script-skill.mjs
│   │   ├── sectie-instructie.md
│   │   └── sectie-script.md
│   ├── README.md
│   └── SKILL.md
├── app-tour-demo/
│   ├── evals/
│   │   ├── fixtures/
│   │   ├── cases.mjs
│   │   └── run.mjs
│   ├── references/
│   │   └── PLAYER.md
│   ├── scripts/
│   │   ├── build.mjs
│   │   ├── capture.mjs
│   │   └── verify.mjs
│   ├── templates/
│   │   └── player.html
│   └── SKILL.md
├── autoresearch/
│   └── SKILL.md
├── blueprinter/
│   └── SKILL.md
├── book-illustrator/
│   ├── references/
│   │   ├── character_design.md
│   │   ├── color_theory.md
│   │   ├── composition.md
│   │   └── illustration_styles.md
│   └── SKILL.md
├── brainstorming/
│   └── SKILL.md
├── code-only-graphics/
│   ├── assets/
│   │   └── scaffold.html
│   ├── examples/
│   │   ├── hex-terrain-tiles-v2.html
│   │   ├── hex-terrain-tiles-v3.html
│   │   ├── hex-terrain-tiles-v4.html
│   │   ├── house-v2.html
│   │   └── house.html
│   ├── references/
│   │   ├── learnings.md
│   │   ├── recipes.md
│   │   └── techniques.md
│   ├── CHANGELOG.md
│   └── SKILL.md
├── codebase-graph/
│   ├── references/
│   │   ├── queries.md
│   │   ├── schema.yaml
│   │   └── test_cases.md
│   ├── scripts/
│   │   ├── codebase-graph.py
│   │   └── requirements.txt
│   ├── README.md
│   └── SKILL.md
├── commands/
│   ├── autoresearch.md
│   ├── prompt.md
│   ├── PROMPT_ENGINEERING_GUIDE.md
│   └── yo.md
├── council-of-high-intelligence/
│   ├── .claude-plugin/
│   │   ├── marketplace.json
│   │   └── plugin.json
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   ├── workflows/
│   │   ├── FUNDING.yml
│   │   └── PULL_REQUEST_TEMPLATE.md
│   ├── agents/
│   │   ├── council-ada.md
│   │   ├── council-aristotle.md
│   │   ├── council-aurelius.md
│   │   ├── council-feynman.md
│   │   ├── council-kahneman.md
│   │   ├── council-karpathy.md
│   │   ├── council-lao-tzu.md
│   │   ├── council-machiavelli.md
│   │   ├── council-meadows.md
│   │   ├── council-munger.md
│   │   ├── council-musashi.md
│   │   ├── council-rams.md
│   │   ├── council-socrates.md
│   │   ├── council-sun-tzu.md
│   │   ├── council-sutskever.md
│   │   ├── council-taleb.md
│   │   ├── council-torvalds.md
│   │   └── council-watts.md
│   ├── assets/
│   │   ├── BRAND.md
│   │   ├── decision-field-notes.jpeg
│   │   ├── deliberation-blueprint.svg
│   │   ├── github-social.svg
│   │   ├── header.jpeg
│   │   ├── logo-mark.svg
│   │   ├── mode-selector.jpeg
│   │   ├── outcome-ledger.jpeg
│   │   ├── panel-composition.jpeg
│   │   ├── provider-routing.jpeg
│   │   ├── social-preview.jpeg
│   │   ├── star-history-dark.svg
│   │   ├── star-history-light.svg
│   │   └── verdict-blueprint.jpeg
│   ├── configs/
│   │   ├── auto-route-defaults.yaml
│   │   ├── provider-model-slots.cursor.example.yaml
│   │   ├── provider-model-slots.example.yaml
│   │   └── provider-model-slots.nim.example.yaml
│   ├── demos/
│   │   ├── session-pack.md
│   │   └── verdict-template.md
│   ├── scripts/
│   │   ├── convert-agents-opencode.py
│   │   ├── council-simulation-checklist.sh
│   │   ├── detect-providers.sh
│   │   ├── gen-star-history.py
│   │   └── validate-roster.py
│   ├── skills/
│   │   └── council/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .markdownlint.json
│   ├── CHANGELOG.md
│   ├── CLAUDE.md
│   ├── CONTRIBUTING.md
│   ├── install.sh
│   ├── LICENSE
│   ├── README.md
│   ├── SECURITY.md
│   ├── SKILL.codex.md
│   ├── SKILL.gemini.md
│   ├── SKILL.md
│   └── SKILL.opencode.md
├── course-creator/
│   └── SKILL.md
├── dataset-to-planboard/
│   ├── scripts/
│   │   └── validate_planboard.py
│   ├── SKILL.md
│   └── TEMPLATE.md
├── dead-code-detector/
│   └── SKILL.md
├── deep-research-v1/
│   └── SKILL.md
├── deep-research-v2/
│   ├── reference/
│   │   ├── continuation.md
│   │   ├── html-generation.md
│   │   ├── methodology.md
│   │   ├── quality-gates.md
│   │   ├── report-assembly.md
│   │   └── weasyprint_guidelines.md
│   ├── schemas/
│   │   ├── claim.schema.json
│   │   ├── evidence.schema.json
│   │   ├── run_manifest.schema.json
│   │   └── source.schema.json
│   ├── scripts/
│   │   ├── citation_manager.py
│   │   ├── evidence_store.py
│   │   ├── extract_claims.py
│   │   ├── md_to_html.py
│   │   ├── research_engine.py
│   │   ├── source_evaluator.py
│   │   ├── validate_report.py
│   │   ├── verify_citations.py
│   │   ├── verify_claim_support.py
│   │   └── verify_html.py
│   ├── templates/
│   │   ├── mckinsey_report_template.html
│   │   └── report_template.md
│   ├── tests/
│   │   ├── fixtures/
│   │   ├── test_citation_manager.py
│   │   ├── test_evidence_store.py
│   │   ├── test_extract_claims.py
│   │   └── test_verify_claim_support.py
│   ├── README.md
│   ├── requirements.txt
│   └── SKILL.md
├── deep-research-v3/
│   └── SKILL.md
├── deepsec-vulnerability-scanner/
│   └── SKILL.md
├── design-pattern-creator/
│   ├── references/
│   │   ├── design-domain-guide.md
│   │   └── output-format-guide.md
│   └── SKILL.md
├── design-skills/
│   ├── adapt/
│   │   └── SKILL.md
│   ├── animate/
│   │   └── SKILL.md
│   ├── audit/
│   │   └── SKILL.md
│   ├── bolder/
│   │   └── SKILL.md
│   ├── clarify/
│   │   └── SKILL.md
│   ├── colorize/
│   │   └── SKILL.md
│   ├── critique/
│   │   ├── reference/
│   │   └── SKILL.md
│   ├── delight/
│   │   └── SKILL.md
│   ├── distill/
│   │   └── SKILL.md
│   ├── impeccable/
│   │   ├── reference/
│   │   ├── scripts/
│   │   └── SKILL.md
│   ├── layout/
│   │   └── SKILL.md
│   ├── optimize/
│   │   └── SKILL.md
│   ├── overdrive/
│   │   └── SKILL.md
│   ├── polish/
│   │   └── SKILL.md
│   ├── quieter/
│   │   └── SKILL.md
│   ├── shape/
│   │   └── SKILL.md
│   └── typeset/
│       └── SKILL.md
├── diagram-design/
│   ├── assets/
│   │   ├── example-architecture-dark.html
│   │   ├── example-architecture-full.html
│   │   ├── example-architecture.html
│   │   ├── example-er-dark.html
│   │   ├── example-er-full.html
│   │   ├── example-er.html
│   │   ├── example-flowchart-dark.html
│   │   ├── example-flowchart-full.html
│   │   ├── example-flowchart.html
│   │   ├── example-layers-dark.html
│   │   ├── example-layers-full.html
│   │   ├── example-layers.html
│   │   ├── example-nested-dark.html
│   │   ├── example-nested-full.html
│   │   ├── example-nested.html
│   │   ├── example-pyramid-dark.html
│   │   ├── example-pyramid-full.html
│   │   ├── example-pyramid.html
│   │   ├── example-quadrant-consultant.html
│   │   ├── example-quadrant-dark.html
│   │   ├── example-quadrant-full.html
│   │   ├── example-quadrant.html
│   │   ├── example-sequence-dark.html
│   │   ├── example-sequence-full.html
│   │   ├── example-sequence.html
│   │   ├── example-state-dark.html
│   │   ├── example-state-full.html
│   │   ├── example-state.html
│   │   ├── example-swimlane-dark.html
│   │   ├── example-swimlane-full.html
│   │   ├── example-swimlane.html
│   │   ├── example-timeline-dark.html
│   │   ├── example-timeline-full.html
│   │   ├── example-timeline.html
│   │   ├── example-tree-dark.html
│   │   ├── example-tree-full.html
│   │   ├── example-tree.html
│   │   ├── example-venn-dark.html
│   │   ├── example-venn-full.html
│   │   ├── example-venn.html
│   │   ├── index.html
│   │   ├── template-dark.html
│   │   ├── template-full.html
│   │   └── template.html
│   ├── references/
│   │   ├── onboarding.md
│   │   ├── primitive-annotation.md
│   │   ├── primitive-sketchy.md
│   │   ├── style-guide.md
│   │   ├── type-architecture.md
│   │   ├── type-er.md
│   │   ├── type-flowchart.md
│   │   ├── type-layers.md
│   │   ├── type-nested.md
│   │   ├── type-pyramid.md
│   │   ├── type-quadrant.md
│   │   ├── type-sequence.md
│   │   ├── type-state.md
│   │   ├── type-swimlane.md
│   │   ├── type-timeline.md
│   │   ├── type-tree.md
│   │   └── type-venn.md
│   └── SKILL.md
├── docling-document-intelligence/
│   ├── scripts/
│   │   └── docling-evaluate.py
│   ├── EXAMPLE.md
│   ├── improvement-log.md
│   ├── pipelines.md
│   ├── README.md
│   └── SKILL.md
├── docs/
│   └── wiki/
│       ├── architecture/
│       ├── changelog/
│       ├── decisions/
│       ├── learnings/
│       ├── pages/
│       ├── preferences/
│       ├── rules/
│       ├── glossary.md
│       ├── index.md
│       ├── last_updated.md
│       ├── log.md
│       ├── memory.md
│       └── overview.md
├── documentation-writing/
│   └── SKILL.md
├── e2e-testing-patterns/
│   ├── references/
│   │   └── details.md
│   └── SKILL.md
├── effective-html/
│   ├── design-artifact/
│   │   ├── agents/
│   │   └── SKILL.md
│   ├── html/
│   │   ├── agents/
│   │   ├── references/
│   │   └── SKILL.md
│   ├── html-diagram/
│   │   ├── agents/
│   │   └── SKILL.md
│   ├── html-plan/
│   │   ├── agents/
│   │   └── SKILL.md
│   ├── html-prototype/
│   │   ├── agents/
│   │   └── SKILL.md
│   └── html-wireframe/
│       ├── agents/
│       └── SKILL.md
├── endpoint-inspect/
│   ├── references/
│   │   ├── karpathy-examples.md
│   │   ├── karpathy-guidelines.md
│   │   └── karpathy-readme.md
│   └── SKILL.md
├── evidence-reports/
│   ├── references/
│   │   ├── components.md
│   │   ├── data-sources.md
│   │   ├── page-anatomy.md
│   │   └── queries.md
│   └── SKILL.md
├── find-skills/
│   └── SKILL.md
├── formbricks-mgr/
│   └── SKILL.md
├── godaddy-cli/
│   ├── internal/
│   │   ├── config/
│   │   ├── domains/
│   │   ├── records/
│   │   └── util/
│   ├── .gitignore
│   ├── go.mod
│   ├── go.sum
│   ├── godaddy.go
│   ├── LICENSE
│   ├── Makefile
│   └── README.md
├── hallmark/
│   ├── references/
│   │   ├── components/
│   │   ├── genres/
│   │   ├── macrostructures/
│   │   ├── themes/
│   │   ├── verbs/
│   │   ├── anti-patterns.md
│   │   ├── assets.md
│   │   ├── color.md
│   │   ├── component-cookbook.md
│   │   ├── contract.md
│   │   ├── copy.md
│   │   ├── custom-craft.md
│   │   ├── custom-theme.md
│   │   ├── design-md.md
│   │   ├── export-formats.md
│   │   ├── floating-nav.md
│   │   ├── hero-enrichment.md
│   │   ├── imagery-kit.md
│   │   ├── interaction-and-states.md
│   │   ├── layout-and-space.md
│   │   ├── macrostructures.md
│   │   ├── microinteractions.md
│   │   ├── motion.md
│   │   ├── preview-examples.md
│   │   ├── responsive.md
│   │   ├── slop-test.md
│   │   ├── structure.md
│   │   ├── study.md
│   │   └── typography.md
│   └── SKILL.md
├── html-docs/
│   ├── assets/
│   │   ├── diagrams/
│   │   └── templates/
│   ├── references/
│   │   ├── CATEGORIES.md
│   │   ├── NEW_TEMPLATE_GUIDE.md
│   │   └── NOMNOML.md
│   ├── scripts/
│   └── SKILL.md
├── hyperframes-cli/
│   └── SKILL.md
├── identify-models/
│   ├── references/
│   │   ├── examples.md
│   │   └── schema.md
│   └── SKILL.md
├── identify-models - 0.1/
│   └── SKILL.md
├── img2threejs/
│   ├── .cache/
│   │   └── spec-search/
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   ├── workflows/
│   │   ├── FUNDING.yml
│   │   ├── pull_request_template.md
│   │   └── release.yml
│   ├── assets/
│   │   ├── sponsors/
│   │   └── logo.svg
│   ├── docs/
│   │   ├── cs2/
│   │   ├── cs2-anatomy/
│   │   ├── integrations/
│   │   ├── materials/
│   │   ├── raw/
│   │   ├── specs/
│   │   ├── ARCHITECTURE.md
│   │   ├── issue-triage.md
│   │   ├── RESEARCH_TRELLIS2_TO_IMG2THREEJS.md
│   │   ├── TOKEN_COST.md
│   │   └── UPGRADE_PLAN.md
│   ├── forge/
│   │   ├── _shared/
│   │   ├── materials/
│   │   ├── stage1_intake/
│   │   ├── stage2_spec/
│   │   ├── stage3_build/
│   │   ├── stage4_review/
│   │   ├── stage5_rig/
│   │   ├── tests/
│   │   ├── next.py
│   │   ├── report.py
│   │   ├── requirements.txt
│   │   └── state.py
│   ├── grimoire/
│   │   ├── build/
│   │   ├── character/
│   │   ├── feedback/
│   │   ├── glossary/
│   │   ├── intake/
│   │   ├── readiness/
│   │   ├── review/
│   │   └── scripts.md
│   ├── integrations/
│   │   ├── mesh3d/
│   │   └── vision/
│   ├── scripts/
│   │   ├── capture_threejs_playwright.py
│   │   ├── character_audit.sh
│   │   ├── issue_triage.py
│   │   └── release_metadata.py
│   ├── skills/
│   │   ├── cs2-knife.md
│   │   ├── cs2-pistol.md
│   │   ├── cs2_technical_analysis.md
│   │   └── generic-extract-skill.md
│   ├── .gitignore
│   ├── CHANGELOG.md
│   ├── CLAUDE.md
│   ├── CONTRIBUTING.md
│   ├── LICENSE
│   ├── README.md
│   ├── ROADMAP.md
│   └── SKILL.md
├── interview-me/
│   └── SKILL.md
├── karpathy/
│   └── SKILL.md
├── llm-docs/
│   ├── assets/
│   ├── references/
│   │   ├── analysis-patterns.md
│   │   └── endpoint-patterns.md
│   ├── scripts/
│   └── SKILL.md
├── mastering-typescript/
│   ├── assets/
│   │   ├── eslint-template.js
│   │   └── tsconfig-template.json
│   ├── references/
│   │   ├── enterprise-patterns.md
│   │   ├── generics.md
│   │   ├── nestjs-integration.md
│   │   ├── react-integration.md
│   │   ├── toolchain.md
│   │   └── type-system.md
│   ├── scripts/
│   │   └── validate-setup.sh
│   └── SKILL.md
├── matt-pocock/
│   ├── .claude-plugin/
│   │   └── plugin.json
│   ├── .out-of-scope/
│   │   ├── mainstream-issue-trackers-only.md
│   │   ├── question-limits.md
│   │   └── setup-skill-verify-mode.md
│   ├── docs/
│   │   └── adr/
│   ├── scripts/
│   │   ├── link-skills.sh
│   │   └── list-skills.sh
│   ├── skills/
│   │   ├── deprecated/
│   │   ├── engineering/
│   │   ├── in-progress/
│   │   ├── misc/
│   │   ├── personal/
│   │   └── productivity/
│   ├── CLAUDE.md
│   ├── CONTEXT.md
│   ├── LICENSE
│   └── README.md
├── matt-pocock-skills/
│   ├── .agents/
│   │   ├── adr/
│   │   ├── install-block.md
│   │   ├── invocation.md
│   │   └── writing-docs.md
│   ├── .changeset/
│   │   ├── add-implement-spec-skill.md
│   │   ├── config.json
│   │   ├── domain-modeling-trigger-context-adr.md
│   │   ├── fix-yaml-frontmatter-colons.md
│   │   ├── grilling-add-hr-between-questions.md
│   │   ├── grilling-remove-em-dashes.md
│   │   ├── README.md
│   │   ├── remove-em-dashes-repo-wide.md
│   │   ├── skill-tool-invocation-terminology.md
│   │   ├── user-invoked-skill-invocation.md
│   │   └── wait-what-context-map.md
│   ├── .claude-plugin/
│   │   ├── marketplace.json
│   │   └── plugin.json
│   ├── .github/
│   │   └── workflows/
│   ├── .out-of-scope/
│   │   ├── mainstream-issue-trackers-only.md
│   │   ├── question-limits.md
│   │   └── setup-skill-verify-mode.md
│   ├── docs/
│   │   ├── engineering/
│   │   └── productivity/
│   ├── scripts/
│   │   ├── link-skills.sh
│   │   ├── list-skills.sh
│   │   └── sync-plugin-version.mjs
│   ├── skills/
│   │   ├── deprecated/
│   │   ├── engineering/
│   │   ├── in-progress/
│   │   ├── misc/
│   │   └── productivity/
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CHANGELOG.md
│   ├── CLAUDE.md
│   ├── CONTEXT.md
│   ├── LICENSE
│   ├── package-lock.json
│   ├── package.json
│   └── README.md
├── modern-frontend-design/
│   ├── evals/
│   │   └── evals.json
│   ├── references/
│   │   └── design-systems.md
│   └── SKILL.md
├── neo/
│   ├── logs/
│   │   └── README.md
│   ├── EXAMPLES.md
│   ├── LOG_TEMPLATE.md
│   └── SKILL.md
├── new-prd-interview/
│   ├── references/
│   │   ├── interview-questions.md
│   │   └── prd-template.md
│   └── SKILL.md
├── okf-open-knowledge-format/
│   ├── references/
│   │   ├── conversion.md
│   │   ├── examples.md
│   │   └── spec-v01.md
│   ├── scripts/
│   │   └── validate.sh
│   └── SKILL.md
├── okf-wiki/
│   ├── scripts/
│   │   └── validate.sh
│   ├── EXAMPLES.md
│   ├── REFERENCE.md
│   └── SKILL.md
├── ontology/
│   ├── references/
│   │   ├── queries.md
│   │   └── schema.md
│   ├── scripts/
│   │   └── ontology.py
│   └── SKILL.md
├── opencode-go-integrator/
│   ├── references/
│   │   ├── integration-patterns.md
│   │   └── models-and-endpoints.md
│   └── SKILL.md
├── opencode-infinite-loop/
│   ├── assets/
│   ├── references/
│   │   ├── agents-md-template.md
│   │   ├── opencode-config-template.json
│   │   ├── run-loop-template.sh
│   │   └── spec-template.md
│   └── SKILL.md
├── pdf-extraction/
│   └── SKILL.md
├── pocketbase-best-practices/
│   ├── references/
│   │   ├── api-rules-security.md
│   │   ├── authentication.md
│   │   ├── collection-design.md
│   │   ├── file-handling.md
│   │   ├── production-deployment.md
│   │   ├── query-performance.md
│   │   ├── realtime.md
│   │   └── sdk-usage.md
│   ├── rules/
│   │   ├── _sections.md
│   │   ├── _template.md
│   │   ├── auth-impersonation.md
│   │   ├── auth-mfa.md
│   │   ├── auth-oauth2.md
│   │   ├── auth-password.md
│   │   ├── auth-token-management.md
│   │   ├── coll-auth-vs-base.md
│   │   ├── coll-field-types.md
│   │   ├── coll-geopoint.md
│   │   ├── coll-indexes.md
│   │   ├── coll-relations.md
│   │   ├── coll-view-collections.md
│   │   ├── deploy-backup.md
│   │   ├── deploy-configuration.md
│   │   ├── deploy-rate-limiting.md
│   │   ├── deploy-reverse-proxy.md
│   │   ├── deploy-sqlite-considerations.md
│   │   ├── file-serving.md
│   │   ├── file-upload.md
│   │   ├── file-validation.md
│   │   ├── query-back-relations.md
│   │   ├── query-batch-operations.md
│   │   ├── query-expand.md
│   │   ├── query-field-selection.md
│   │   ├── query-first-item.md
│   │   ├── query-n-plus-one.md
│   │   ├── query-pagination.md
│   │   ├── realtime-auth.md
│   │   ├── realtime-events.md
│   │   ├── realtime-reconnection.md
│   │   ├── realtime-subscribe.md
│   │   ├── rules-basics.md
│   │   ├── rules-cross-collection.md
│   │   ├── rules-filter-syntax.md
│   │   ├── rules-locked-vs-open.md
│   │   ├── rules-request-context.md
│   │   ├── sdk-auth-store.md
│   │   ├── sdk-auto-cancellation.md
│   │   ├── sdk-error-handling.md
│   │   ├── sdk-field-modifiers.md
│   │   ├── sdk-filter-binding.md
│   │   ├── sdk-initialization.md
│   │   └── sdk-send-hooks.md
│   ├── AGENTS.md
│   └── SKILL.md
├── pocketbase-e2e/
│   ├── skill/
│   │   ├── references/
│   │   └── SKILL.md
│   ├── QUICKSTART.md
│   ├── README.md
│   └── SCHEMA.md
├── productsear.ch/
│   └── SKILL.md
├── railway-docs/
│   ├── references/
│   │   ├── environment-config.md
│   │   ├── monorepo.md
│   │   ├── railpack.md
│   │   └── variables.md
│   └── SKILL.md
├── simple-docs/
│   ├── SKILL.md
│   └── template.html
├── skill-creator/
│   ├── references/
│   │   ├── output-patterns.md
│   │   ├── scripts.md
│   │   └── workflows.md
│   ├── scripts/
│   │   ├── init_skill.py
│   │   ├── package_skill.py
│   │   └── quick_validate.py
│   ├── .gitignore
│   ├── LICENSE
│   ├── opencode-go-integrator.skill
│   ├── README.md
│   └── SKILL.md
├── slideops/
│   ├── assets/
│   │   ├── template.html
│   │   └── template.md
│   ├── examples/
│   │   ├── skill-demo.html
│   │   └── skill-demo.md
│   ├── references/
│   │   ├── automation.md
│   │   ├── diagrams.md
│   │   ├── freshness.md
│   │   ├── markdown-pdf.md
│   │   ├── markdown.md
│   │   ├── style-guide.md
│   │   ├── themes.md
│   │   └── verification.md
│   ├── scripts/
│   │   ├── check.py
│   │   └── cite.py
│   └── SKILL.md
├── slides-to-pdf/
│   └── SKILL.md
├── smell/
│   ├── README.md
│   ├── SKILL.md
│   └── test-prompts.json
├── spec-writer/
│   ├── assets/
│   │   └── spec.md
│   ├── references/
│   │   └── spec-guide.md
│   └── SKILL.md
├── svelte5-best-practices/
│   ├── references/
│   │   ├── events.md
│   │   ├── migration.md
│   │   ├── performance.md
│   │   ├── runes.md
│   │   ├── snippets.md
│   │   ├── sveltekit.md
│   │   └── typescript.md
│   └── SKILL.md
├── sveltekit-svelte5-tailwind-skill/
│   ├── docs/
│   │   ├── adapters-reference.md
│   │   ├── advanced-routing.md
│   │   ├── advanced-ssr.md
│   │   ├── index.jsonl
│   │   ├── index.meta.json
│   │   ├── integration-patterns.md
│   │   ├── sections.jsonl
│   │   ├── svelte5-api-reference.md
│   │   ├── sveltekit-configuration.md
│   │   └── tailwind-configuration.md
│   ├── references/
│   │   ├── best-practices.md
│   │   ├── common-issues.md
│   │   ├── data-loading.md
│   │   ├── deployment-guide.md
│   │   ├── documentation-search-system.md
│   │   ├── forms-and-actions.md
│   │   ├── getting-started.md
│   │   ├── index.jsonl
│   │   ├── index.meta.json
│   │   ├── migration-svelte4-to-5.md
│   │   ├── performance-optimization.md
│   │   ├── project-setup.md
│   │   ├── routing-patterns.md
│   │   ├── sections.jsonl
│   │   ├── server-rendering.md
│   │   ├── styling-patterns.md
│   │   ├── styling-with-tailwind.md
│   │   ├── svelte5-runes.md
│   │   ├── tailwind-v4-migration.md
│   │   └── troubleshooting.md
│   ├── .gitignore
│   ├── provenance.jsonl
│   ├── README.md
│   ├── skill.manifest.json
│   └── SKILL.md
├── tailwindcss-layout/
│   ├── references/
│   │   ├── flexbox.md
│   │   ├── grid.md
│   │   └── position.md
│   └── SKILL.md
├── tasks/
│   └── todo.md
├── taste-skills/
│   ├── design-taste-frontend/
│   │   └── SKILL.md
│   ├── full-output-enforcement/
│   │   └── SKILL.md
│   ├── high-end-visual-design/
│   │   └── SKILL.md
│   ├── industrial-brutalist-ui/
│   │   └── SKILL.md
│   ├── minimalist-ui/
│   │   └── SKILL.md
│   ├── redesign-existing-projects/
│   │   └── SKILL.md
│   └── stitch-design-taste/
│       ├── DESIGN.md
│       └── SKILL.md
├── tdd-workflow/
│   └── SKILL.md
├── te9-research/
│   ├── assets/
│   │   └── report-template.html
│   ├── evals/
│   │   └── evals.json
│   ├── references/
│   │   ├── output-format.md
│   │   ├── prompts.md
│   │   ├── search-method.md
│   │   └── strategies.md
│   ├── scripts/
│   │   └── metrics.py
│   └── SKILL.md
├── te9-spec/
│   └── SKILL.md
├── te9-writing/
│   ├── evals/
│   │   ├── fixtures/
│   │   ├── cases.mjs
│   │   ├── evals.json
│   │   └── run.mjs
│   ├── references/
│   │   └── anti-slop.md
│   ├── scripts/
│   │   └── lint.mjs
│   ├── my-writing-style.md
│   └── SKILL.md
├── teach/
│   ├── GLOSSARY-FORMAT.md
│   ├── LEARNING-RECORD-FORMAT.md
│   ├── MISSION-FORMAT.md
│   ├── RESOURCES-FORMAT.md
│   └── SKILL.md
├── thermo-nuclear-code-review/
│   └── SKILL.md
├── three-js-advanced-1/
│   ├── assets/
│   │   ├── evidence/
│   │   └── stone-giant/
│   ├── references/
│   │   ├── geometry.md
│   │   ├── materials-viewer.md
│   │   ├── stone-giant-case-study.md
│   │   ├── validation-delivery.md
│   │   └── workflow.md
│   ├── scripts/
│   │   └── inline_vite.py
│   └── SKILL.md
├── three-js-advanced-1-session/
│   ├── attachments/
│   │   ├── 083242fd1678a45cf3d96246a3c2fe6c5d34093413a1a599ca0b3a7b7546d32a.jpg
│   │   ├── 2a55ec275aac4727aa9f8bb7548c9a7f00171403e86900480e508f6a2b286d91.jpg
│   │   ├── 33ae0af42c4989fd7de0c538f3b246e0a6c41e06513905a915a74702387d4cf0.jpg
│   │   ├── 48aff828d4dd21b901da280a32fc6f386fbce096693d28c39f4f92ee57c8de20.jpg
│   │   ├── 50c51f6574518168b7c632d2e3112cc6e3e146035f3de9133aca2bc42d6468d1.jpg
│   │   ├── 53b47ac8604fe1b993fde63b66d8b124aa2c4b8d26a2e4bc1c40916a473a9786.png
│   │   ├── 66f85fd96d57220179e6fafcea58603024709d39aad06af3b47b0bbef43cbb9e.jpg
│   │   ├── b52d36900661fa58debe4844b85877c1d672e649a8135c7bdbca0d3102b07cce.jpg
│   │   ├── b6cc319772976ecba239c8f89733a9273d0f4d723bc213c500f49a07be24de62.jpg
│   │   ├── beb8ddb1150f4e6fa8f4510b4740ea497d848299b082754a07878cfd271bb830.jpg
│   │   ├── e7341eef11aabe3c6ac85f04d6f551261ee99ae3550505004d2b94671a3865a6.png
│   │   └── fda67d5b6e7ad337231f9f4b85b114f62605ca8eab6c214708bd241ecae0fbe4.png
│   ├── subagents/
│   │   ├── 01-scout.jsonl
│   │   ├── 01-scout.md
│   │   ├── 02-planner.jsonl
│   │   ├── 02-planner.md
│   │   ├── 03-scout.jsonl
│   │   ├── 03-scout.md
│   │   ├── 04-worker.jsonl
│   │   ├── 04-worker.md
│   │   ├── 05-worker.jsonl
│   │   ├── 05-worker.md
│   │   ├── 06-reviewer.jsonl
│   │   └── 06-reviewer.md
│   ├── verification/
│   │   └── stone-giant-rebundled.html
│   ├── export-visible-session.py
│   ├── image-index.json
│   ├── manifest.json
│   ├── SUMMARY.md
│   ├── transcript.jsonl
│   └── transcript.md
├── three-js-extracted/
│   ├── references/
│   │   ├── materials-viewer.md
│   │   ├── sculpting.md
│   │   ├── surface-detail.md
│   │   └── verification-delivery.md
│   ├── scripts/
│   │   └── inline_vite.py
│   └── SKILL.md
├── tinyfish/
│   ├── scripts/
│   │   └── tinyfish-client.py
│   ├── .tinyfish-key
│   ├── REFERENCE.md
│   ├── SKILL.md
│   ├── sveltekit-article.md
│   └── tinyfish-search-results.md
├── toepy-writing/
│   ├── REFERENCE.md
│   ├── SAMPLE-email.md
│   ├── SAMPLE.md
│   └── SKILL.md
├── unslop/
│   ├── .github/
│   │   ├── ISSUE_TEMPLATE/
│   │   ├── workflows/
│   │   └── PULL_REQUEST_TEMPLATE.md
│   ├── assets/
│   │   └── examples/
│   ├── docs/
│   │   ├── DECISIONS.md
│   │   └── PRODUCT.md
│   ├── evals/
│   │   ├── fixtures/
│   │   ├── golden/
│   │   ├── _check_support.py
│   │   ├── _contract_batch.py
│   │   ├── adversarial-evals.json
│   │   ├── ADVERSARIAL-WRITING-ANALYSIS.md
│   │   ├── BEHAVIORAL-EVALS.md
│   │   ├── build_shared_benchmark.py
│   │   ├── cache_judge.py
│   │   ├── check.py
│   │   ├── check_climb.py
│   │   ├── check_commands.py
│   │   ├── check_complexity_budget.py
│   │   ├── check_contrib.py
│   │   ├── check_core_benchmark.py
│   │   ├── check_core_benchmark_v2.py
│   │   ├── check_evals_schema.py
│   │   ├── check_gates_doc.py
│   │   ├── check_maintenance_contract.py
│   │   ├── check_mimic.py
│   │   ├── check_packs.py
│   │   ├── check_pairs.py
│   │   ├── check_pattern_coverage.py
│   │   ├── check_preservation_contract.py
│   │   ├── check_scanner_contract.py
│   │   ├── check_seeded_docs.py
│   │   ├── check_silhouette.py
│   │   ├── check_skill_examples.py
│   │   ├── check_taboo_parity.py
│   │   ├── check_voice.py
│   │   ├── CHECKS.md
│   │   ├── core-benchmark-v2.json
│   │   ├── core-benchmark.json
│   │   ├── CORE-BENCHMARK.md
│   │   ├── core-holdback-metadata-v2.json
│   │   ├── core-holdback-metadata.json
│   │   ├── core-holdout-v9.json
│   │   ├── CORE-RESULTS.md
│   │   ├── core-source-pool-v2.json
│   │   ├── core-thresholds-v2.json
│   │   ├── core-thresholds.json
│   │   ├── core_acceptance.py
│   │   ├── core_metrics.py
│   │   ├── core_runner.py
│   │   ├── CRITIQUE.md
│   │   ├── eval_groups.py
│   │   ├── evals.json
│   │   ├── kata_add_pattern.py
│   │   ├── LIVE-MIMIC-PROTOCOL.md
│   │   ├── mimic_stats.py
│   │   ├── model_generate.py
│   │   ├── run_adversarial.py
│   │   ├── run_behavioral.sh
│   │   ├── run_local.py
│   │   ├── run_mimic_refine.py
│   │   ├── run_model_parity.py
│   │   ├── run_structure_climb.py
│   │   ├── shared-benchmark.json
│   │   └── TUNE-RESULTS.md
│   ├── plans/
│   │   ├── scratch/
│   │   ├── 001-python-floor.md
│   │   ├── 002-input-encoding-robustness.md
│   │   ├── 003-contribute-slug-and-redos.md
│   │   ├── 004-eval-suite-self-validation.md
│   │   ├── 005-scan-offsets-and-containment.md
│   │   ├── 006-silhouette-english-decline.md
│   │   ├── 007-wiki-sync-fixtures.md
│   │   ├── 008-shared-prose-view.md
│   │   ├── 009-import-seam-convention.md
│   │   ├── 010-dx-polish.md
│   │   ├── 011-inprocess-eval-runner.md
│   │   ├── 012-mimic-live-fidelity-eval.md
│   │   ├── 013-adversarial-refresh-procedure.md
│   │   ├── 014-contributor-onramp.md
│   │   ├── 015-per-author-silhouette-spike.md
│   │   ├── 015-report-silhouette-stability.md
│   │   └── README.md
│   ├── presets/
│   │   ├── crisp-human.md
│   │   ├── expert-human.md
│   │   ├── story-lean.md
│   │   └── warm-human.md
│   ├── references/
│   │   ├── commands/
│   │   ├── packs/
│   │   ├── calibrate.md
│   │   ├── contribute.md
│   │   ├── core-contract.md
│   │   ├── edit-library.md
│   │   ├── fact-preservation.md
│   │   ├── harvest.md
│   │   ├── maintenance.md
│   │   ├── mimic.md
│   │   ├── personality-guide.md
│   │   ├── pipeline.md
│   │   ├── refresh.md
│   │   ├── rewrite-examples.md
│   │   ├── rubric.md
│   │   └── taboo-phrases.md
│   ├── scripts/
│   │   ├── _lang.py
│   │   ├── banned_phrase_scan.py
│   │   ├── calibrate_pairs.py
│   │   ├── calibrate_score.py
│   │   ├── check_packs.py
│   │   ├── check_suggestions.py
│   │   ├── contribute.py
│   │   ├── diff_check.py
│   │   ├── extract_constraints.py
│   │   ├── harvest_classify.py
│   │   ├── harvest_samples.py
│   │   ├── readability_metrics.py
│   │   ├── refresh_status.py
│   │   ├── silhouette_scan.py
│   │   ├── structure_scan.py
│   │   ├── suggest.py
│   │   ├── validate_preservation.py
│   │   ├── voice_card.py
│   │   ├── voice_profile.py
│   │   ├── voice_score.py
│   │   └── wiki_sync.py
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── CONTRIBUTING.md
│   ├── README.md
│   ├── ruff.toml
│   └── SKILL.md
├── user-guide-writing/
│   ├── evals/
│   │   └── evals.json
│   ├── references/
│   │   ├── document-modes-and-boundaries.md
│   │   ├── maintenance-signals.md
│   │   ├── mode-structures.md
│   │   └── workflow-checklist.md
│   ├── SKILL.md
│   └── SKILL.toon
├── variate/
│   ├── agents/
│   │   └── openai.yaml
│   ├── client/
│   │   ├── inter/
│   │   └── card.js
│   ├── dev/
│   │   ├── fixture.mjs
│   │   ├── smoke-card.sh
│   │   ├── smoke-cli.sh
│   │   └── smoke-http.sh
│   ├── docs/
│   │   ├── img/
│   │   └── index.html
│   ├── evals/
│   │   ├── files/
│   │   └── evals.json
│   ├── fixtures/
│   │   └── static/
│   ├── references/
│   │   ├── craft.md
│   │   ├── frameworks.md
│   │   └── harnesses.md
│   ├── scripts/
│   │   ├── await.mjs
│   │   └── install.mjs
│   ├── src/
│   │   ├── attach.mjs
│   │   ├── check.mjs
│   │   ├── core.mjs
│   │   ├── queue.mjs
│   │   └── sidecar.mjs
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── LICENSE
│   ├── README.md
│   ├── SECURITY.md
│   ├── SKILL.md
│   ├── variate.mjs
│   └── vercel.json
├── web-research/
│   └── SKILL.md
├── write-a-skill/
│   └── SKILL.md
├── youtube-transcript/
│   ├── scripts/
│   │   └── get_transcript.py
│   └── SKILL.md
├── .gitignore
├── .wiki_ignore
├── evidence-reports.skill
├── html-docs.skill
├── README.md
├── skills-lock.json
├── tailwind-v4-integration.md
├── three-js-advanced-1.skill
└── three-js-advanced-gpt-6.zip
```
