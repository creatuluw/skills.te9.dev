# OpenCode Go Model Rankings — Research Report

**Date**: July 2026
**Models**: 12 OpenCode Go models across 7 capability dimensions

---

## Important Findings

### Qwen3.5 Plus Does NOT Exist
**"Qwen3.5 Plus" does not exist as a text LLM.** Qwen's naming went from Qwen3 (April 2025) directly to Qwen3.6. The only "3.5" variant is `qwen3.5-omni-plus`, a multimodal (vision+audio) model. It is included in rankings below for completeness but marked as N/A — you should treat it as **Qwen3 Plus** (Qwen3-235B-A22B) for practical purposes.

### DeepSeek V4 Benchmarks Not Yet Published
DeepSeek V4 Pro and V4 Flash were released April 24, 2026. Detailed benchmark reports have not yet been published. Rankings for these models are based on predecessor (V3.1, R1-0528) scores and expected improvements.

---

## Composite Rankings (1–12) by Dimension

### 1. General Purpose

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **Kimi K2.6** | AA Intelligence Index: 54 (#1 open-weight), strong across all benchmarks |
| 2 | **GLM-5.1** | AA Intelligence Index: 51 (#4 open-weight), 744B/40B MoE |
| 3 | **MiMo-V2.5-Pro** | MMLU 89.4, MMLU-Redux 92.8, C-Eval 91.5, 1T/42B MoE |
| 4 | **DeepSeek V4 Pro** | Expected to exceed V3.1 (MMLU-Pro 81.2); supports dual OpenAI+Anthropic API |
| 5 | **MiniMax M2.5** | GPQA-Diamond 85.2, AIME 2025 86.3, coding/search specialist |
| 6 | **MiniMax M2.7** | GDPval-AA ELO 1495 (highest open-weight); lacks traditional NLU scores |
| 7 | **Qwen3.6 Plus** | Inherits Qwen3 training (36T tokens, 119 langs); competitive with o1/Gemini-2.5-Pro |
| 8 | **Kimi K2.5** | AA Intelligence Index: 47 (#9 open-weight); strong at launch, surpassed by K2.6 |
| 9 | **MiMo-V2.5** | MMLU 86.3, multimodal (text/image/video/audio); lighter at 310B/15B |
| 10 | **DeepSeek V4 Flash** | Fast/efficient variant; deepseek-chat legacy maps here; expected competitive |
| 11 | **GLM-5** | Not separately tracked on AA; predecessor to 5.1, weaker |
| 12 | **Qwen3.5 Plus** | Does not exist as text model; N/A |

### 2. Tool Use / Function Calling

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **MiniMax M2.7** | Agent Teams, 97% skill compliance (40+ skills), dynamic tool search, autonomous orchestration |
| 2 | **GLM-5.1** | Native FC mode, streaming tool output, AllTools mode, structured output, rich documented infrastructure |
| 3 | **MiniMax M2.5** | Parallel tool calling, 20% fewer search rounds than M2.1, hundreds of thousands of real-world RL environments |
| 4 | **Kimi K2.6** | Native tool calling via API; part of AA Intelligence Index (τ²-Bench Telecom) |
| 5 | **DeepSeek V4 Pro** | Dual API format (OpenAI+Anthropic); Tau-bench Airline 53.5, Retail 63.9 (R1-0528) |
| 6 | **Qwen3.6 Plus** | MCP support, Qwen-Agent framework, explicit agentic optimization |
| 7 | **MiMo-V2.5-Pro** | Claw-Eval General 64.0, Claw-Eval Multi-Turn 63.2; large-scale agentic RL |
| 8 | **Kimi K2.5** | Native tool calling; less capable than K2.6 |
| 9 | **MiMo-V2.5** | Claw-Eval General 62.1, Multi-Turn 63.2; multimodal tool use |
| 10 | **DeepSeek V4 Flash** | Function calling supported; V3-0324 optimization lineage |
| 11 | **GLM-5** | Predecessor to 5.1; weaker FC infrastructure |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

### 3. Web Search

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **MiniMax M2.5** | BrowseComp 76.3% (industry-leading), RISE benchmark creator, 20% fewer search rounds |
| 2 | **MiniMax M2.7** | Inherits M2.5 search architecture + Agent Teams for multi-agent search |
| 3 | **GLM-5.1** | Native "联网搜索" (web search) as first-class platform tool, streaming search results |
| 4 | **Kimi K2.6** | Kimi consumer product known for search-augmented chat; strong web integration |
| 5 | **DeepSeek V4 Pro** | V3.1-Terminus explicitly optimized "Search Agent" capability |
| 6 | **GLM-5** | Same web search tooling as 5.1, weaker model |
| 7 | **Qwen3.6 Plus** | Qwen-Agent with fetch tools, MCP-based web integration |
| 8 | **Kimi K2.5** | Good web search but weaker than K2.6 |
| 9 | **DeepSeek V4 Flash** | Same Search Agent lineage as V4 Pro |
| 10 | **MiMo-V2.5-Pro** | Agentic RL includes web interaction but no specific benchmarks |
| 11 | **MiMo-V2.5** | No web search benchmark data available |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

### 4. Analysis / Reasoning

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **Kimi K2.6** | AA Intelligence Index: 54; #1 open-weight for intelligence/reasoning |
| 2 | **MiniMax M2.5** | GPQA-Diamond 85.2, AIME 2025 86.3, SciCode 44.4, AA-LCR 69.5 |
| 3 | **GLM-5.1** | AA Intelligence Index: 51; 40B active params, extended thinking |
| 4 | **DeepSeek V4 Pro** | AIME 2025: 87.5 (R1-0528), GPQA 81.0; thinking + non-thinking modes |
| 5 | **MiMo-V2.5-Pro** | MATH 86.2, GSM8K 99.6, ARC 97.2, HellaSwag 89.8 |
| 6 | **MiniMax M2.7** | GDPval-AA ELO 1495 (highest open-weight); professional analysis |
| 7 | **Qwen3.6 Plus** | 4-stage RL pipeline, hybrid thinking, competitive with o1 |
| 8 | **Kimi K2.5** | AA Intelligence Index: 47; strong reasoning, surpassed by K2.6 |
| 9 | **MiMo-V2.5** | MATH 67.7, GSM8K 83.3, ARC 96.5; competitive for size class |
| 10 | **DeepSeek V4 Flash** | Thinking mode available; fast variant of V4 Pro |
| 11 | **GLM-5** | Predecessor to 5.1; weaker reasoning |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

### 5. Data Creation

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **MiniMax M2.7** | Office work (Word, Excel, PPT), 97% skill compliance, finance modeling, entertainment content with character consistency |
| 2 | **Kimi K2.6** | Highest intelligence index (54) = best instruction following; structured output |
| 3 | **MiniMax M2.5** | GDPval-MM 59.0% win rate, deliverable-quality outputs, Word/PPT/Excel |
| 4 | **GLM-5.1** | Structured output (JSON mode, schema enforcement), content generation agents |
| 5 | **MiMo-V2.5** | Multimodal content creation (text, image, video, audio) — unique breadth |
| 6 | **DeepSeek V4 Pro** | V3: improved Chinese writing, report analysis; dual API format |
| 7 | **Qwen3.6 Plus** | 119 languages, improved writing quality, structured output |
| 8 | **Kimi K2.5** | Good instruction following at AA Index 47 |
| 9 | **MiMo-V2.5-Pro** | Text-only; strong long-horizon task completion |
| 10 | **DeepSeek V4 Flash** | Same generation quality as V4 Pro, faster |
| 11 | **GLM-5** | Predecessor to 5.1 |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

### 6. Coding

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **MiMo-V2.5-Pro** | SWE-Bench Verified 78.9, Terminal Bench 2: 68.4, SWE-Pro 57.2, HumanEval+ 75.6 |
| 2 | **Kimi K2.6** | AA Intelligence Index: 54 (includes SciCode, Terminal-Bench Hard); #1 open-weight |
| 3 | **MiniMax M2.7** | SWE-Pro 56.2, MLE Bench 66.6% medal rate, NL2Repo 39.8%, self-evolving scaffold |
| 4 | **GLM-5.1** | Paper: "GLM-5: from Vibe Coding to Agentic Engineering"; AA Index 51 |
| 5 | **MiniMax M2.5** | SWE-Bench Verified up to 80.2 (with scaffolding), SWE-Pro 55.4, Multi-SWE 51.3 |
| 6 | **DeepSeek V4 Pro** | V3.1: SWE-bench Verified 66.0, Multilingual 54.5; V4 expected to exceed |
| 7 | **Qwen3.6 Plus** | Competitive with top coding models per Qwen3 report |
| 8 | **MiMo-V2.5** | SWE-Bench AgentLess 30.8, LiveCodeBench v6 35.5, HumanEval+ 71.3 |
| 9 | **Kimi K2.5** | AA Index 47; coding component weaker than K2.6 |
| 10 | **DeepSeek V4 Flash** | LiveCodeBench 49.2 (V3-0324); V4 expected improvement |
| 11 | **GLM-5** | Predecessor to 5.1; branded for coding but weaker |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

### 7. RAG (Retrieval-Augmented Generation)

| Rank | Model | Key Evidence |
|------|-------|-------------|
| 1 | **MiMo-V2.5-Pro** | GraphWalks benchmarked to 1M tokens (0.37 BFS @ 1M), 256K-1M context, hybrid attention |
| 2 | **Kimi K2.6** | 256K context window, AA-LCR component, context caching at $0.16/1M tokens |
| 3 | **MiniMax M2.5** | 1M+ context, AA-LCR 69.5, BrowseComp 76.3%, context management strategies |
| 4 | **GLM-5.1** | 200K context, full knowledge base service (file parsing, OCR), context caching |
| 5 | **MiMo-V2.5** | Up to 1M tokens, multimodal RAG (text+image+video+audio), KV-cache 6x reduction |
| 6 | **DeepSeek V4 Pro** | V3.1 128K+ context; V2.5 explicitly optimized for RAG |
| 7 | **MiniMax M2.7** | 1M+ context; inherits M2.5 architecture; less specific RAG data |
| 8 | **Qwen3.6 Plus** | 128K context (Qwen3), Qwen-Agent document Q&A support |
| 9 | **Kimi K2.5** | 256K context, context caching at $0.35/1M tokens; weaker than K2.6 |
| 10 | **DeepSeek V4 Flash** | Same context as V4 Pro; fast variant |
| 11 | **GLM-5** | 200K context, same RAG toolchain as 5.1 |
| 12 | **Qwen3.5 Plus** | Does not exist; N/A |

---

## Overall Tier Rankings

### Tier 1 — Elite (Top 3 All-Around)

| Model | Strengths | Best For |
|-------|-----------|----------|
| **Kimi K2.6** | #1 general purpose, #1 analysis, #1 RAG, #2 coding | Flagship reasoning & analysis tasks |
| **MiMo-V2.5-Pro** | #1 coding, #1 RAG, #3 general purpose | Software engineering, long-context RAG |
| **GLM-5.1** | #2 tool use, #3 general purpose, rich FC infrastructure | Tool-heavy applications, agentic workflows |

### Tier 2 — Strong Specialists

| Model | Strengths | Best For |
|-------|-----------|----------|
| **MiniMax M2.7** | #1 tool use, #1 data creation, elite agentic | Professional productivity, multi-agent systems |
| **MiniMax M2.5** | #1 web search, #2 analysis, elite coding specialist | Web search apps, SWE tasks, cost efficiency |
| **DeepSeek V4 Pro** | Top-tier reasoning (AIME 87.5 legacy), dual API format | Reasoning tasks, flexible API integration |

### Tier 3 — Strong Mid-Tier

| Model | Strengths | Best For |
|-------|-----------|----------|
| **Qwen3.6 Plus** | 119 languages, MCP support, balanced capabilities | Multilingual apps, balanced workloads |
| **Kimi K2.5** | Good all-around, 256K context, budget alternative to K2.6 | General tasks when K2.6 quota runs out |

### Tier 4 — Value / Efficiency

| Model | Strengths | Best For |
|-------|-----------|----------|
| **DeepSeek V4 Flash** | Highest request volume (~31,650/5h), fast | High-volume chat, real-time features, prototyping |
| **MiMo-V2.5** | Multimodal (text+image+video+audio), 1M context | Multimodal RAG, lightweight needs |
| **GLM-5** | Coding-branded, cheaper than 5.1 | Budget coding tasks |

### Tier 5 — N/A

| Model | Notes |
|-------|-------|
| **Qwen3.5 Plus** | Does not exist as a text model; the OpenCode Go listing likely refers to a Qwen3-235B variant or Qwen3.5-omni-plus (multimodal) |

---

## Quick Selection Matrix

| Use Case | Primary Pick | Budget Fallback |
|----------|-------------|-----------------|
| General chat / assistant | Kimi K2.6 | DeepSeek V4 Flash |
| Coding / SWE | MiMo-V2.5-Pro | MiniMax M2.5 |
| Tool use / agents | MiniMax M2.7 | GLM-5.1 |
| Web search | MiniMax M2.5 | Kimi K2.6 |
| Analysis / reasoning | Kimi K2.6 | MiniMax M2.5 |
| Data creation / content | MiniMax M2.7 | Kimi K2.6 |
| RAG / document Q&A | MiMo-V2.5-Pro | Kimi K2.6 |
| High-volume / cheap | DeepSeek V4 Flash | Qwen3.6 Plus |
| Multilingual | Qwen3.6 Plus | DeepSeek V4 Flash |
| Multimodal (vision/audio) | MiMo-V2.5 | — |

---

## Data Gaps & Caveats

1. **DeepSeek V4** — Benchmarks not yet published (released April 2026). Rankings based on V3.1/R1-0528 predecessor scores and expected improvements.
2. **Qwen3.5 Plus** — Does not exist. Rankings marked N/A. OpenCode Go may be serving a different model under this name.
3. **BFCL scores** — Not reported for any MiMo or MiniMax model. Tool use rankings based on qualitative documentation and Claw-Eval/Agent benchmarks.
4. **Web search** — No standardized benchmark exists. MiniMax M2.5 dominates due to BrowseComp 76.3% and custom RISE benchmark.
5. **Data creation** — No standardized benchmark (MT-Bench, AlpacaEval) scores available. Rankings based on qualitative capabilities and platform documentation.
6. **MiniMax M2.7** — Lacks traditional NLU benchmark scores (MMLU, ARC, etc.). Rankings partially estimated from agentic/professional benchmarks.
7. **GLM-5** — Not separately tracked on Artificial Analysis; treated as weaker than GLM-5.1.

## Sources

All findings sourced from:
- Artificial Analysis Intelligence Index (artificialanalysis.ai)
- Official model cards on HuggingFace (MiMo, MiniMax, THUDM)
- DeepSeek API Changelog (api-docs.deepseek.com/updates)
- Alibaba Cloud Model Studio (help.aliyun.com)
- Zhipu AI Platform Documentation (bigmodel.cn)
- Qwen Blog (qwenlm.github.io)
- BFCL Leaderboard (gorilla.cs.berkeley.edu)
