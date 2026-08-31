# Plan: OpenCode Go Integrator Skill

## Objective
Create a skill that guides web developers through integrating OpenCode Zen Go LLM endpoints into their web and desktop applications via an interactive, structured interview.

## Steps
- [x] 1. Research: Read SKILL.md template, fetch OpenCode Go docs
- [x] 2. Plan skill structure and contents
- [x] 3. Initialize skill with `init_skill.py`
- [x] 4. Write `references/models-and-endpoints.md` — model list, endpoints, SDK mappings, quota table
- [x] 5. Write `references/integration-patterns.md` — code patterns for web/desktop, streaming, streaming, usage tracking
- [x] 6. Write `SKILL.md` — interview workflow, core integration guidance, progressive disclosure
- [x] 7. Validate and package the skill
- [x] 8. Verify output

## Skill Structure
```
opencode-go-integrator/
├── SKILL.md                           # Interview workflow + core integration guide
└── references/
    ├── models-and-endpoints.md        # Full model catalog, endpoints, quotas
    └── integration-patterns.md        # Code patterns by framework/scenario
```

## Interview Design
Questions numbered (1, 2, 3…) with lettered sub-options (a, b, c…) asked one at a time.

1. Application type (web / desktop / both)
2. Framework / stack
3. Target models
4. LLM capabilities needed (chat, streaming, function calling, embeddings, etc.)
5. Architecture (direct client-side, server-side proxy, both)
6. API key management strategy
7. Quota / usage tracking needs
8. Additional requirements

## Key Considerations
- 5-hour ($12), weekly ($30), monthly ($60) quotas
- Three SDK patterns: `@ai-sdk/openai-compatible`, `@ai-sdk/anthropic`, `@ai-sdk/alibaba`
- Two endpoint paths: `/v1/chat/completions` and `/v1/messages`
