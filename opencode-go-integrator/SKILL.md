---
name: opencode-go-integrator
description: >-
  Integrate OpenCode Zen Go LLM endpoints, capabilities, and logic into web and desktop applications. Use when the user wants to add AI chat, completions, streaming, or other LLM-powered features to their app using OpenCode Go models (GLM-5, Kimi K2, DeepSeek V4, Qwen, MiniMax, MiMo). Covers API setup, model selection, SDK integration, usage quota tracking, and error handling. Triggers include integrate LLM, add AI to my app, opencode go, llm endpoint, chat completion, streaming AI, AI features.
---

# OpenCode Go Integrator

Integrate OpenCode Zen Go LLM endpoints into web and desktop applications.

## Quick Reference

- **Base URL**: `https://opencode.ai/zen/go`
- **Auth**: Bearer token (API key from OpenCode Zen console)
- **Models**: 12 open coding models across 3 SDK compatibility groups
- **Quotas**: $12/5h, $30/week, $60/month

## Interview Process

Before writing any code, conduct this interview with the user **one question at a time**. Wait for the user's answer before asking the next question. Each question is numbered; sub-options are lettered for quick reference.

After collecting all answers, proceed to the Integration Workflow section.

---

### Question 1: Application Type

**What type of application are you integrating LLM capabilities into?**

- a) Web application (browser-based)
- b) Desktop application (Electron, Tauri, etc.)
- c) Both web and desktop
- d) Backend service / API only
- e) Something else (describe)

*Wait for answer before proceeding.*

---

### Question 2: Tech Stack

**What framework, language, or tech stack are you using?**

- a) Next.js / React
- b) Vue / Nuxt
- c) Svelte / SvelteKit
- d) Angular
- e) Vanilla JavaScript / TypeScript
- f) Python (FastAPI, Flask, Django, etc.)
- g) Electron (JavaScript/TypeScript desktop)
- h) Tauri (Rust + web frontend)
- i) Other (describe)

*Wait for answer before proceeding.*

---

### Question 3: Target Models

**Which models do you want to use?** (Select one or more by letter)

**Tier 1 — Elite (best capability, lower volume):**
- a) Kimi K2.6 — #1 general purpose, #1 analysis, #2 coding, #2 RAG (~1,150 req/5h)
- b) MiMo-V2.5-Pro — #1 coding, #1 RAG, strong reasoning (~1,290 req/5h)
- c) GLM-5.1 — #2 tool use, strong general purpose, rich FC infrastructure (~880 req/5h)

**Tier 2 — Strong Specialists:**
- d) MiniMax M2.7 — #1 tool use, #1 data creation, elite agentic (~3,400 req/5h)
- e) MiniMax M2.5 — #1 web search, #2 analysis, elite coding (~6,300 req/5h)
- f) DeepSeek V4 Pro — top-tier reasoning, dual OpenAI+Anthropic API (~3,450 req/5h)

**Tier 3 — Balanced / Mid-Tier:**
- g) Qwen3.6 Plus — 119 languages, MCP support, balanced (~3,300 req/5h)
- h) Kimi K2.5 — good all-around, 256K context, budget K2.6 alternative (~1,850 req/5h)

**Tier 4 — Value / Efficiency (highest volume):**
- i) DeepSeek V4 Flash — highest volume by far, fast (~31,650 req/5h)
- j) MiMo-V2.5 — multimodal (text+image+video+audio), 1M context (~2,150 req/5h)
- k) GLM-5 — coding-branded, cheaper than 5.1 (~1,150 req/5h)
- l) Qwen3.5 Plus — high volume, general-purpose (~10,200 req/5h)

- m) Not sure — recommend based on my use case
- n) Multiple models with fallback chain (will specify primary + fallback)

**Quota reminder**: You have $12/5h, $30/week, $60/month. Cheaper tiers allow more requests.

*Wait for answer before proceeding. If the user answered (m), ask a follow-up:*
> "What is the primary task? (chat, coding, analysis, tool use, web search, RAG, data creation)"
> Then recommend the top-ranked model for that task from [references/models-and-endpoints.md](references/models-and-endpoints.md) "Use Case Selection Matrix".

---

### Question 4: LLM Capabilities

**What LLM features do you need?** (Select one or more by letter)

- a) Chat / conversation (multi-turn dialogue)
- b) Single-shot text completion
- c) Streaming responses (real-time token output)
- d) System prompts (custom assistant behavior)
- e) Structured output (JSON responses, parsing)
- f) Function calling / tool use
- g) Code generation or analysis
- h) Summarization or content generation
- i) Other (describe)

*Wait for answer before proceeding.*

---

### Question 5: Architecture

**How will the LLM calls be made from your application?**

- a) Server-side proxy (API key stays on the server — recommended for web apps)
- b) Direct client-side calls (API key exposed — only for local/desktop apps or prototyping)
- c) Hybrid (server proxy + client-side fallback)
- d) Need recommendation based on my setup

*Wait for answer before proceeding.*

---

### Question 6: API Key Management

**How should the API key be managed?**

- a) Environment variable (`OPENCODE_GO_API_KEY`)
- b) Runtime configuration file (`.env`, `config.json`, etc.)
- c) User input (stored in app settings/localStorage)
- d) Secrets manager (Vault, AWS Secrets, etc.)
- e) Platform-specific secure storage (Keychain, Credential Manager, etc.)
- f) Need recommendation

*Wait for answer before proceeding.*

---

### Question 7: Quota Awareness

**Do you need quota tracking and usage management in your app?**

- a) Yes — show users their remaining quota and warn when low
- b) Yes — automatic fallback to cheaper models when approaching limits
- c) Yes — both display and automatic fallback
- d) No — just handle errors when quota is exceeded
- e) Not sure — what do you recommend?

**Quota limits to keep in mind:**
| Window | Limit |
|---|---|
| 5 hours | $12 |
| Weekly | $30 |
| Monthly | $60 |

*Wait for answer before proceeding.*

---

### Question 8: Additional Requirements

**Anything else you need for this integration?** (Select any that apply, or say "none")

- a) Rate limiting on the client side
- b) Retry logic with exponential backoff
- c) Request/response logging
- d) Multiple API keys (load balancing)
- e) Custom headers or middleware
- f) TypeScript types and interfaces
- g) Testing utilities (mock responses)
- h) None — ready to build

*Wait for answer before proceeding.*

---

## Integration Workflow

After collecting all interview answers, proceed with integration in this order:

### Step 1: Match Models to Use Case

Based on the selected models (Question 3) and capabilities needed (Question 4), verify the best model for the job. Read the "Use Case Selection Matrix" in [references/models-and-endpoints.md](references/models-and-endpoints.md) if unsure.

Quick matching guide:
- **Chat/assistant** -> Kimi K2.6 (fallback: Kimi K2.5, DeepSeek V4 Flash)
- **Coding** -> MiMo-V2.5-Pro (fallback: MiniMax M2.5, GLM-5)
- **Tool use / agents** -> MiniMax M2.7 (fallback: GLM-5.1, Qwen3.6 Plus)
- **Web search** -> MiniMax M2.5 (fallback: MiniMax M2.7, Kimi K2.6)
- **Analysis / reasoning** -> Kimi K2.6 (fallback: MiniMax M2.5, DeepSeek V4 Pro)
- **Data creation** -> MiniMax M2.7 (fallback: Kimi K2.6, Qwen3.6 Plus)
- **RAG / doc Q&A** -> MiMo-V2.5-Pro (fallback: Kimi K2.6, MiniMax M2.5)
- **High-volume / cheap** -> DeepSeek V4 Flash
- **Multilingual** -> Qwen3.6 Plus
- **Multimodal (vision/audio)** -> MiMo-V2.5

### Step 2: Determine SDK Approach

Based on the selected models (Step 1), determine the required SDK package:

| SDK Group | Models | Package | Endpoint |
|---|---|---|---|
| OpenAI-compatible | GLM, Kimi, DeepSeek, MiMo | `@ai-sdk/openai-compatible` | `/v1/chat/completions` |
| Anthropic-compatible | MiniMax M2.7, M2.5 | `@ai-sdk/anthropic` | `/v1/messages` |
| Alibaba-compatible | Qwen 3.5/3.6 Plus | `@ai-sdk/alibaba` | `/v1/chat/completions` |

For Python: use `openai` SDK (OpenAI-compatible models) or `anthropic` SDK (MiniMax models).

Read [references/models-and-endpoints.md](references/models-and-endpoints.md) for full endpoint details, capability rankings, and the use case selection matrix.

### Step 3: Set Up Project

1. Install dependencies based on the tech stack (Question 2) and SDK group (Step 1)
2. Configure API key based on management strategy (Question 6)
3. Create the provider client with base URL `https://opencode.ai/zen/go/v1`

### Step 4: Implement Core Features

Based on the capabilities needed (Question 4), implement from the relevant patterns in [references/integration-patterns.md](references/integration-patterns.md):

- **Chat/conversation**: See "AI SDK Integration" or "Direct REST API Calls" sections
- **Streaming**: See "Streaming Patterns" section
- **Server proxy**: See "Server-Side Proxy Pattern" section
- **Desktop apps**: See "Desktop App Patterns (Electron/Tauri)" section
- **Python**: See "Python Integration" section

### Step 5: Add Quota Management

Based on the quota strategy (Question 7):

- **Display quota**: Implement the `UsageTracker` class from the "Usage Tracking" section in [references/integration-patterns.md](references/integration-patterns.md)
- **Automatic fallback**: Implement `callWithFallback` from the "Error Handling & Quota Management" section
- **Error handling**: Implement retry with exponential backoff for transient errors

### Step 6: Handle Errors

Always implement error handling for:
- **429 (Rate Limited)**: Quota exceeded or too many requests — retry with backoff or fallback to another model
- **401 (Unauthorized)**: Invalid API key
- **500 (Server Error)**: Transient provider issue — retry
- **Network errors**: Connection timeout — retry with backoff

See "Error Handling & Quota Management" in [references/integration-patterns.md](references/integration-patterns.md) for complete patterns.

### Step 7: Test Integration

Verify the integration works:
1. Test a simple completion request
2. Test streaming if selected
3. Test error handling (use an invalid key, expect 401)
4. Test quota tracking shows correct values
5. Verify API key is not exposed in client-side code (for web apps)

## Key Reminders

- **Never expose API keys in client-side JavaScript** in production web apps — always proxy through a server route
- **Desktop apps** (Electron/Tauri) can store keys in the main/native process
- **Models have different SDK compatibility** — MiniMax uses Anthropic format, Qwen uses Alibaba format, others use OpenAI format
- **Quotas are rolling** — a spike in usage consumes the 5h window, but it recovers
- **DeepSeek V4 Flash** is the best default for high-volume use cases (31,650 req/5h)
- **Kimi K2.6** is the best all-around model (#1 general purpose, #1 analysis)
- **MiMo-V2.5-Pro** is the best for coding (#1 SWE-Bench Verified: 78.9) and RAG (#1 at 1M context)
- **MiniMax M2.7** is the best for tool use (#1, 97% skill compliance) and data creation
- **MiniMax M2.5** is the best for web search (BrowseComp 76.3%) and a strong coding/analysis pick
- **Fallback chains** are recommended: primary model -> cheaper fallback -> budget safety net
- **Qwen3.5 Plus** may not be a distinct text model — treat as high-volume general purpose
