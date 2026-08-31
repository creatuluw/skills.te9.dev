# OpenCode Go Models, Endpoints & Quotas

## Table of Contents
- [Available Models](#available-models)
- [SDK Package Mapping](#sdk-package-mapping)
- [Endpoint Reference](#endpoint-reference)
- [Usage Limits](#usage-limits)
- [Estimated Request Counts](#estimated-request-counts)
- [Model Properties](#model-properties)
- [Capability Rankings (1-12)](#capability-rankings-112)
- [Use Case Selection Matrix](#use-case-selection-matrix)

## Available Models

| Model | Model ID | Endpoint Path | AI SDK Package |
|---|---|---|---|
| GLM-5.1 | `glm-5.1` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| GLM-5 | `glm-5` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.5 | `kimi-k2.5` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| Kimi K2.6 | `kimi-k2.6` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4 Pro | `deepseek-v4-pro` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| DeepSeek V4 Flash | `deepseek-v4-flash` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.5 | `mimo-v2.5` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiMo-V2.5-Pro | `mimo-v2.5-pro` | `/v1/chat/completions` | `@ai-sdk/openai-compatible` |
| MiniMax M2.7 | `minimax-m2.7` | `/v1/messages` | `@ai-sdk/anthropic` |
| MiniMax M2.5 | `minimax-m2.5` | `/v1/messages` | `@ai-sdk/anthropic` |
| Qwen3.6 Plus | `qwen3.6-plus` | `/v1/chat/completions` | `@ai-sdk/alibaba` |
| Qwen3.5 Plus | `qwen3.5-plus` | `/v1/chat/completions` | `@ai-sdk/alibaba` |

Base URL for all endpoints: `https://opencode.ai/zen/go`

Full model ID format for config: `opencode-go/<model-id>` (e.g., `opencode-go/kimi-k2.6`)

Model list API: `https://opencode.ai/zen/go/v1/models`

## SDK Package Mapping

### Group 1: OpenAI-Compatible (most models)
- **Package**: `@ai-sdk/openai-compatible`
- **Endpoint**: `/v1/chat/completions`
- **Models**: GLM-5, GLM-5.1, Kimi K2.5, Kimi K2.6, DeepSeek V4 Pro, DeepSeek V4 Flash, MiMo-V2.5, MiMo-V2.5-Pro
- **Use when**: Building chat/completion interfaces with these models

### Group 2: Anthropic-Compatible
- **Package**: `@ai-sdk/anthropic`
- **Endpoint**: `/v1/messages`
- **Models**: MiniMax M2.7, MiniMax M2.5
- **Use when**: Using MiniMax models with the Anthropic messages format

### Group 3: Alibaba-Compatible
- **Package**: `@ai-sdk/alibaba`
- **Endpoint**: `/v1/chat/completions`
- **Models**: Qwen3.6 Plus, Qwen3.5 Plus
- **Use when**: Using Qwen models

## Endpoint Reference

### Chat Completions (OpenAI-compatible)
```
POST https://opencode.ai/zen/go/v1/chat/completions
```
Headers:
```
Authorization: Bearer <YOUR_API_KEY>
Content-Type: application/json
```
Body:
```json
{
  "model": "<model-id>",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "stream": false
}
```

### Messages (Anthropic-compatible)
```
POST https://opencode.ai/zen/go/v1/messages
```
Headers:
```
x-api-key: <YOUR_API_KEY>
anthropic-version: 2023-06-01
Content-Type: application/json
```
Body:
```json
{
  "model": "<model-id>",
  "max_tokens": 4096,
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

### Streaming
Both endpoints support streaming. Set `"stream": true` in the request body and handle Server-Sent Events (SSE) in the response.

## Usage Limits

OpenCode Go enforces rolling usage quotas:

| Period | Limit | Notes |
|---|---|---|
| **5 hours** | $12 of usage | Rolling window |
| **Weekly** | $30 of usage | Rolling window |
| **Monthly** | $60 of usage | Rolling window |

Limits are defined in dollar value, not request count. Actual request count depends on model pricing and token usage.

When limits are reached, requests are blocked until the window resets. If "Use balance" is enabled in the OpenCode console, requests fall back to the user's Zen balance after Go limits are exhausted.

**Recommendation for app developers**: Build quota-aware UX that:
1. Tracks estimated usage client-side
2. Shows remaining quota to users
3. Gracefully degrades when limits are hit (e.g., switch to a cheaper model, queue requests, show a friendly message)

## Estimated Request Counts

Based on average token usage patterns:

| Model | Per 5 hours | Per week | Per month |
|---|---|---|---|
| GLM-5.1 | 880 | 2,150 | 4,300 |
| GLM-5 | 1,150 | 2,880 | 5,750 |
| Kimi K2.5 | 1,850 | 4,630 | 9,250 |
| Kimi K2.6 | 1,150 | 2,880 | 5,750 |
| MiMo-V2.5 | 2,150 | 5,450 | 10,900 |
| MiMo-V2.5-Pro | 1,290 | 3,225 | 6,450 |
| MiniMax M2.7 | 3,400 | 8,500 | 17,000 |
| MiniMax M2.5 | 6,300 | 15,900 | 31,800 |
| Qwen3.6 Plus | 3,300 | 8,200 | 16,300 |
| Qwen3.5 Plus | 10,200 | 25,200 | 50,500 |
| DeepSeek V4 Pro | 3,450 | 8,550 | 17,150 |
| DeepSeek V4 Flash | 31,650 | 79,050 | 158,150 |

Average token patterns per request:
- GLM-5/5.1: 700 input, 52,000 cached, 150 output
- Kimi K2.5/K2.6: 870 input, 55,000 cached, 200 output
- DeepSeek V4 Pro: 750 input, 82,000 cached, 290 output
- DeepSeek V4 Flash: 790 input, 68,000 cached, 280 output
- MiniMax M2.7/M2.5: 300 input, 55,000 cached, 125 output
- MiMo-V2.5: 1,000 input, 60,000 cached, 140 output
- MiMo-V2.5-Pro: 350 input, 41,000 cached, 250 output
- Qwen3.5 Plus: 410 input, 47,000 cached, 140 output
- Qwen3.6 Plus: 500 input, 57,000 cached, 190 output

## Model Properties

### Architecture & Context

| Model | Developer | Total Params | Active Params | Architecture | Context Window | SDK Group |
|---|---|---|---|---|---|---|
| GLM-5.1 | Zhipu AI | 744B | 40B | MoE, extended thinking | 200K | OpenAI-compatible |
| GLM-5 | Zhipu AI | ~744B | ~40B | MoE | 200K | OpenAI-compatible |
| Kimi K2.6 | Moonshot AI | 1000B | 32B | MoE, extended thinking | 256K | OpenAI-compatible |
| Kimi K2.5 | Moonshot AI | 1000B | 32B | MoE, extended thinking | 256K | OpenAI-compatible |
| MiMo-V2.5-Pro | Xiaomi | 1020B | 42B | MoE, hybrid attention | 256K–1M | OpenAI-compatible |
| MiMo-V2.5 | Xiaomi | 310B | 15B | MoE, hybrid attention, multimodal | 256K–1M | OpenAI-compatible |
| MiniMax M2.7 | MiniMax | 229B | ~45B | MoE, full attention | 1M+ | Anthropic-compatible |
| MiniMax M2.5 | MiniMax | 229B | ~45B | MoE, full attention | 1M+ | Anthropic-compatible |
| Qwen3.6 Plus | Alibaba | — | — | MoE (cloud API) | 128K | Alibaba-compatible |
| Qwen3.5 Plus | Alibaba | — | — | Cloud API | — | Alibaba-compatible |
| DeepSeek V4 Pro | DeepSeek | — | — | MoE, thinking + non-thinking | 128K+ | OpenAI-compatible |
| DeepSeek V4 Flash | DeepSeek | — | — | MoE, fast variant | 128K+ | OpenAI-compatible |

### Standout Capabilities

| Model | Standout Feature |
|---|---|
| **Kimi K2.6** | #1 open-weight model overall (AA Intelligence Index: 54), elite reasoning + analysis |
| **MiMo-V2.5-Pro** | #1 coding (SWE-Bench Verified 78.9), #1 RAG (GraphWalks to 1M tokens) |
| **GLM-5.1** | Richest function calling infrastructure (AllTools, streaming tools, structured output) |
| **MiniMax M2.7** | #1 tool use (97% skill compliance), #1 data creation (Office, finance, PPT), Agent Teams |
| **MiniMax M2.5** | #1 web search (BrowseComp 76.3%), elite coding (SWE-Verified up to 80.2) |
| **DeepSeek V4 Pro** | Dual API format (OpenAI + Anthropic), elite reasoning lineage (AIME 87.5) |
| **DeepSeek V4 Flash** | Highest volume by far (~31,650 req/5h), best cost efficiency |
| **MiMo-V2.5** | Only multimodal model (text + image + video + audio), lightweight (15B active) |
| **Qwen3.6 Plus** | 119 languages, MCP support, best for multilingual apps |
| **Kimi K2.5** | Budget alternative to K2.6, still strong all-around |
| **GLM-5** | Coding-branded, cheaper GLM-5.1 alternative |
| **Qwen3.5 Plus** | High volume general-purpose (note: model existence unconfirmed) |

## Capability Rankings (1–12)

Based on independent benchmarks (AA Intelligence Index, SWE-Bench, BrowseComp, MMLU, GPQA, GraphWalks, etc.).

| Rank | General Purpose | Tool Use | Web Search | Analysis | Data Creation | Coding | RAG |
|---|---|---|---|---|---|---|---|
| 1 | Kimi K2.6 | MiniMax M2.7 | MiniMax M2.5 | Kimi K2.6 | MiniMax M2.7 | MiMo-V2.5-Pro | MiMo-V2.5-Pro |
| 2 | GLM-5.1 | GLM-5.1 | MiniMax M2.7 | MiniMax M2.5 | Kimi K2.6 | Kimi K2.6 | Kimi K2.6 |
| 3 | MiMo-V2.5-Pro | MiniMax M2.5 | GLM-5.1 | GLM-5.1 | MiniMax M2.5 | MiniMax M2.7 | MiniMax M2.5 |
| 4 | DeepSeek V4 Pro | Kimi K2.6 | Kimi K2.6 | DeepSeek V4 Pro | GLM-5.1 | GLM-5.1 | GLM-5.1 |
| 5 | MiniMax M2.5 | DeepSeek V4 Pro | DeepSeek V4 Pro | MiMo-V2.5-Pro | MiMo-V2.5 | MiniMax M2.5 | MiMo-V2.5 |
| 6 | MiniMax M2.7 | Qwen3.6 Plus | GLM-5 | MiniMax M2.7 | DeepSeek V4 Pro | DeepSeek V4 Pro | DeepSeek V4 Pro |
| 7 | Qwen3.6 Plus | MiMo-V2.5-Pro | Qwen3.6 Plus | Qwen3.6 Plus | Qwen3.6 Plus | Qwen3.6 Plus | MiniMax M2.7 |
| 8 | Kimi K2.5 | Kimi K2.5 | Kimi K2.5 | Kimi K2.5 | Kimi K2.5 | MiMo-V2.5 | Qwen3.6 Plus |
| 9 | MiMo-V2.5 | MiMo-V2.5 | DeepSeek V4 Flash | MiMo-V2.5 | MiMo-V2.5-Pro | Kimi K2.5 | Kimi K2.5 |
| 10 | DeepSeek V4 Flash | DeepSeek V4 Flash | MiMo-V2.5-Pro | DeepSeek V4 Flash | DeepSeek V4 Flash | DeepSeek V4 Flash | DeepSeek V4 Flash |
| 11 | GLM-5 | GLM-5 | MiMo-V2.5 | GLM-5 | GLM-5 | GLM-5 | GLM-5 |
| 12 | Qwen3.5 Plus | Qwen3.5 Plus | Qwen3.5 Plus | Qwen3.5 Plus | Qwen3.5 Plus | Qwen3.5 Plus | Qwen3.5 Plus |

### Key Benchmark Scores

| Model | MMLU | GPQA-Diamond | AIME 2025 | SWE-Bench Verified | BrowseComp | Context |
|---|---|---|---|---|---|---|
| Kimi K2.6 | — | — | — | — | — | 256K |
| MiMo-V2.5-Pro | 89.4 | 66.7 | — | 78.9 | — | 1M |
| GLM-5.1 | — | — | — | — | — | 200K |
| MiniMax M2.7 | — | — | — | 56.2 (Pro) | — | 1M+ |
| MiniMax M2.5 | — | 85.2 | 86.3 | up to 80.2 | 76.3% | 1M+ |
| DeepSeek V4 Pro | — (V3.1: 81.2 Pro) | — (R1: 81.0) | — (R1: 87.5) | — (V3.1: 66.0) | — | 128K+ |
| DeepSeek V4 Flash | — | — | — | — | — | 128K+ |
| MiMo-V2.5 | 86.3 | 58.1 | — | 30.8 (AgentLess) | — | 1M |
| Qwen3.6 Plus | — | — | — | — | — | 128K |
| Kimi K2.5 | — | — | — | — | — | 256K |
| GLM-5 | — | — | — | — | — | 200K |

Dash (—) = score not published by the developer.

## Use Case Selection Matrix

### Primary Use Cases

| Use Case | Best Model | Why | Runner-up | Budget Pick |
|---|---|---|---|---|
| **Chat / assistant** | Kimi K2.6 | #1 general + analysis | GLM-5.1 | DeepSeek V4 Flash |
| **Coding / SWE** | MiMo-V2.5-Pro | SWE-Verified 78.9, Terminal-Bench 68.4 | MiniMax M2.5 | GLM-5 |
| **Tool use / agents** | MiniMax M2.7 | 97% skill compliance, Agent Teams | GLM-5.1 | Qwen3.6 Plus |
| **Web search** | MiniMax M2.5 | BrowseComp 76.3%, RISE leader | MiniMax M2.7 | Kimi K2.6 |
| **Analysis / reasoning** | Kimi K2.6 | AA Index 54, elite reasoning | MiniMax M2.5 | Qwen3.6 Plus |
| **Data creation** | MiniMax M2.7 | Office/PPT/Excel, finance modeling | Kimi K2.6 | Qwen3.6 Plus |
| **RAG / doc Q&A** | MiMo-V2.5-Pro | GraphWalks to 1M, hybrid attention | Kimi K2.6 | MiniMax M2.5 |
| **High-volume / cheap** | DeepSeek V4 Flash | ~31,650 req/5h | Qwen3.5 Plus | — |
| **Multilingual** | Qwen3.6 Plus | 119 languages, MCP | DeepSeek V4 Flash | — |
| **Multimodal** | MiMo-V2.5 | text + image + video + audio | — | — |

### Specialized Scenarios

| Scenario | Recommended Model(s) | Reason |
|---|---|---|
| **Agentic workflows (multi-tool)** | MiniMax M2.7 > GLM-5.1 | Agent Teams, dynamic tool search |
| **Long document processing (>100K)** | MiMo-V2.5-Pro > MiniMax M2.5 | 1M context with benchmarked retrieval |
| **Real-time streaming features** | DeepSeek V4 Flash > MiMo-V2.5 | Fast + high volume |
| **Structured data extraction** | GLM-5.1 > MiniMax M2.7 | JSON mode, schema enforcement |
| **Content with Office deliverables** | MiniMax M2.7 > MiniMax M2.5 | Native Word/Excel/PPT generation |
| **Multi-language support** | Qwen3.6 Plus > DeepSeek V4 Flash | 119 languages trained |
| **Function calling chains** | GLM-5.1 > MiniMax M2.7 | Streaming FC, AllTools mode |
| **Budget fallback chain** | DeepSeek V4 Flash > Qwen3.5 Plus | Cheapest with decent quality |

### Fallback Chain Recommendations

Configure primary -> fallback -> budget for quota-aware apps:

| Primary Use | Primary | Fallback | Budget Safety Net |
|---|---|---|---|
| Chat | Kimi K2.6 | Kimi K2.5 | DeepSeek V4 Flash |
| Coding | MiMo-V2.5-Pro | MiniMax M2.5 | GLM-5 |
| Agents | MiniMax M2.7 | GLM-5.1 | Qwen3.6 Plus |
| Analysis | Kimi K2.6 | MiniMax M2.5 | DeepSeek V4 Flash |
| RAG | MiMo-V2.5-Pro | Kimi K2.6 | MiniMax M2.5 |
