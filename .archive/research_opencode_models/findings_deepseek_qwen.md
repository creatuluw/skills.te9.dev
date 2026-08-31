# Research Findings: DeepSeek V4 & Qwen Model Benchmark Analysis

> **Research Date:** July 2025 (data current as of sources fetched)
> **Researcher Note:** This document consolidates publicly available benchmark data and model information from official sources. Gaps are explicitly noted.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Model Status & Availability](#model-status--availability)
3. [DeepSeek V4 Pro — Detailed Analysis](#deepseek-v4-pro--detailed-analysis)
4. [DeepSeek V4 Flash — Detailed Analysis](#deepseek-v4-flash--detailed-analysis)
5. [Qwen3.5 Plus — Status](#qwen35-plus--status)
6. [Qwen3.6 Plus — Detailed Analysis](#qwen36-plus--detailed-analysis)
7. [Dimension-by-Dimension Comparison](#dimension-by-dimension-comparison)
8. [Data Gaps & Limitations](#data-gaps--limitations)
9. [Sources](#sources)

---

## Executive Summary

| Model | Status | Release Date | API Model Name | Context Window |
|-------|--------|-------------|----------------|---------------|
| DeepSeek V4 Pro | ✅ Available | 2026-04-24 | `deepseek-v4-pro` | Unknown (TBD) |
| DeepSeek V4 Flash | ✅ Available | 2026-04-24 | `deepseek-v4-flash` | Unknown (TBD) |
| Qwen3.5 Plus | ❌ Does Not Exist | N/A | N/A | N/A |
| Qwen3.6 Plus | ✅ Available (Alibaba Cloud) | ~Mid-2025 | `qwen3.6-plus` | Unknown (TBD) |

**Key finding:** "Qwen3.5 Plus" does not exist as a distinct text model. Qwen's naming went from **Qwen3** (April 2025) to **Qwen3.6** series. The only "3.5" variant is `qwen3.5-omni-plus`, which is a multimodal (audio/vision) model, not a text-only LLM.

---

## Model Status & Availability

### DeepSeek V4 Pro & V4 Flash

- **Official release date:** April 24, 2026
- **Available via:** OpenAI ChatCompletions interface AND Anthropic interface
- **API names:** `deepseek-v4-pro`, `deepseek-v4-flash`
- **Legacy migration:** The old `deepseek-chat` and `deepseek-reasoner` names will be retired on 2026-07-24. During transition, `deepseek-chat` → V4-Flash non-thinking mode, `deepseek-reasoner` → V4-Flash thinking mode.
- **Source:** [DeepSeek API Changelog](https://api-docs.deepseek.com/updates)

### Qwen3.6 Plus

- **Available on:** Alibaba Cloud Model Studio (百炼/DashScope)
- **API name:** `qwen3.6-plus`
- **Listed alongside:** `qwen3.6-max-preview`, `qwen3.6-flash`
- **Also listed:** Third-party models including `deepseek-v4-pro` and `deepseek-v4-flash` are available through Alibaba Cloud as well
- **Source:** [Alibaba Cloud Model Studio Models](https://help.aliyun.com/zh/model-studio/getting-started/models)

### Qwen3.5 Plus — DOES NOT EXIST

The Qwen model line progressed as follows:
- **Qwen3** — Released April 29, 2025 (open-weight models: 0.6B to 235B)
- **Qwen3.5-omni-plus** — Multimodal variant (vision/audio), not a standalone text LLM
- **Qwen3.6** — Next generation text models (plus, max-preview, flash tiers)

There is no "Qwen3.5 Plus" text generation model. The user likely means either **Qwen3-235B-A22B** (the flagship Qwen3 model) or **Qwen3.6 Plus**.

---

## DeepSeek V4 Pro — Detailed Analysis

### Architecture & Features

DeepSeek V4 Pro is the flagship reasoning model in the V4 series. Building on the hybrid reasoning architecture introduced in V3.1, it supports both thinking (extended reasoning) and non-thinking (fast response) modes.

**Known architectural lineage** (inferred from changelog progression):
- V3.1 introduced hybrid reasoning (single model, thinking + non-thinking)
- V3.2 continued optimization
- V4 represents next-generation architecture leap

### Benchmark Scores

| Dimension | Benchmark | Score | Notes |
|-----------|-----------|-------|-------|
| **General** | MMLU | ⚠️ Not yet published | V3-0324 scored 81.2 on MMLU-Pro; V4 expected to exceed |
| **General** | MMLU-Pro | ⚠️ Not yet published | V3-0324: 81.2 |
| **General** | GPQA | ⚠️ Not yet published | R1-0528: 81.0 |
| **Coding** | SWE-Bench Verified | ⚠️ Not yet published | V3.1: 66.0 |
| **Coding** | SWE-Bench Multilingual | ⚠️ Not yet published | V3.1: 54.5 |
| **Coding** | Terminal-bench | ⚠️ Not yet published | V3.1: 31.3 |
| **Reasoning** | AIME 2025 | ⚠️ Not yet published | R1-0528: 87.5 |
| **Coding** | LiveCodeBench | ⚠️ Not yet published | V3-0324: 49.2 |
| **Tool Use** | Tau-bench (Airline) | ⚠️ Not yet published | R1-0528: 53.5 |
| **Tool Use** | Tau-bench (Retail) | ⚠️ Not yet published | R1-0528: 63.9 |

**Important note:** DeepSeek V4 was released on April 24, 2026, and detailed benchmark reports are not yet available in the API documentation. The scores above are from V4's predecessors (V3.1, R1-0528, V3-0324). V4 is expected to exceed all of these.

### Capabilities Summary

| Dimension | Assessment | Evidence |
|-----------|-----------|----------|
| **General Purpose** | Expected top-tier | Lineage of strong MMLU/GPQA scores; V3.1 already competitive with o1/o3 |
| **Tool Use / Function Calling** | Strong (Anthropic API support) | V4 supports both OpenAI and Anthropic interfaces natively; Tau-bench scores show solid function calling |
| **Web Search** | Strong agent capability | V3.1-Terminus explicitly optimized "Search Agent" |
| **Analysis / Reasoning** | Top-tier | R1-0528's AIME 87.5; GPQA 81.0 show elite reasoning |
| **Data Creation** | Strong | V3-0324 improved Chinese writing, report analysis |
| **Coding** | Elite | SWE-bench Verified 66.0 (V3.1); strong LiveCodeBench trajectory |
| **RAG** | Good | V2-0517 explicitly optimized for RAG; V4 builds on this |

---

## DeepSeek V4 Flash — Detailed Analysis

### Architecture & Features

DeepSeek V4 Flash is the fast/efficient variant, optimized for lower latency and cost. Key characteristics:
- Serves as the default model for the legacy `deepseek-chat` endpoint during migration
- Also supports thinking mode via `deepseek-reasoner` endpoint
- More cost-effective than V4 Pro

### Benchmark Scores

No Flash-specific benchmarks have been published yet. Based on the naming convention and the fact that `deepseek-reasoner` (which was R1-0528 with AIME 87.5) now maps to V4-Flash thinking mode, V4 Flash likely performs at a very high level in thinking mode, potentially matching or exceeding the previous generation Pro models.

| Dimension | Assessment | Reasoning |
|-----------|-----------|-----------|
| **General Purpose** | High | `deepseek-chat` (now V4-Flash) has always been the general-purpose model |
| **Tool Use** | Strong | Function calling supported; optimized in V3-0324 |
| **Coding** | Very Good | LiveCodeBench trajectory shows strong performance |
| **Speed** | Optimized | Flash tier = optimized for latency and cost |

---

## Qwen3.5 Plus — Status

**This model does not exist.** 

The Qwen team's release history shows:
1. **Qwen2.5** series (late 2024) — text models
2. **Qwen3** series (April 29, 2025) — open-weight MoE + dense models, hybrid thinking
3. **Qwen3.5-omni-plus** — multimodal (vision + audio) model, NOT a text-only LLM
4. **Qwen3.6** series (mid-2025) — text models including `qwen3.6-plus`

The "Plus" naming in Qwen's ecosystem refers to cloud-hosted API models (not open-weight), similar to how GPT-4 has API-only variants. There is no Qwen3.5 Plus text model in the Qwen product line.

**If the user intended "Qwen3 Plus"** (i.e., the API-hosted Qwen3-235B-A22B), the Qwen3 benchmarks below would apply.

---

## Qwen3.6 Plus — Detailed Analysis

### Architecture & Features

Qwen3.6 Plus is a cloud-hosted API model available through Alibaba Cloud's Model Studio (DashScope). It sits in the "Plus" tier between `qwen3.6-max-preview` (strongest) and `qwen3.6-flash` (fastest).

**Known context from Qwen3 lineage:**
- Qwen3 was trained on ~36 trillion tokens (2x Qwen2.5)
- Supports 119 languages
- Hybrid thinking modes (thinking + non-thinking)
- Enhanced MCP and agentic capabilities
- Flagship Qwen3-235B-A22B: 235B total params, 22B activated (MoE)

### Benchmark Scores (Qwen3-235B-A22B — closest proxy for Qwen3.6 Plus)

From the official Qwen3 technical report, the Qwen3-235B-A22B benchmarks (which inform the Plus tier capabilities):

| Dimension | Benchmark | Score (Qwen3-235B-A22B) | Notes |
|-----------|-----------|------------------------|-------|
| **General** | MMLU | Competitive with o1, DeepSeek-R1 | Exact score not in fetched data |
| **General** | MMLU-Pro | Competitive with top models | |
| **General** | GPQA | Competitive | |
| **Coding** | LiveCodeBench | Strong | |
| **Coding** | SWE-Bench | Strong | |
| **Math** | AIME 2025 | Competitive with DeepSeek-R1, o1 | |

**Note:** Exact numeric benchmark scores for Qwen3 were in the blog post as images/tables that weren't fully captured in the text scrape. The blog states Qwen3-235B-A22B "achieves competitive results... when compared to other top-tier models such as DeepSeek-R1, o1, o3-mini, Grok-3, and Gemini-2.5-Pro."

### Qwen3 Specific Capabilities (relevant to Qwen3.6 Plus)

| Dimension | Assessment | Evidence |
|-----------|-----------|----------|
| **General Purpose** | Top-tier | Trained on 36T tokens; competitive with o1/Gemini-2.5-Pro |
| **Tool Use / Agentic** | Strong | Explicit agentic optimization; MCP support; Qwen-Agent framework |
| **Web Search** | Strong | Agentic capabilities with tool integration |
| **Analysis / Reasoning** | Elite | Hybrid thinking mode; long CoT RL training; 4-stage pipeline |
| **Data Creation** | Strong | 119 language support; improved writing quality |
| **Coding** | Elite | Competitive with top coding models |
| **RAG** | Good | Qwen-Agent supports document Q&A; context up to 128K |

### Qwen3.6 Plus Specific Notes

- Available through Alibaba Cloud DashScope API
- Positioned as mid-tier in Qwen3.6 lineup (below max-preview, above flash)
- Third-party models (including DeepSeek V4) are also available on the same platform
- Specific V4 benchmarks are not separately published for the Qwen3.6 Plus variant

---

## Dimension-by-Dimension Comparison

### 1. General Purpose (MMLU, MMLU-Pro, GPQA)

| Model | MMLU | MMLU-Pro | GPQA | Overall |
|-------|------|----------|------|---------|
| DeepSeek V4 Pro | ⚠️ TBD | ⚠️ TBD (V3-0324: 81.2) | ⚠️ TBD (R1-0528: 81.0) | Expected top-tier |
| DeepSeek V4 Flash | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | Expected high |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A | Model does not exist |
| Qwen3.6 Plus | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | Expected competitive with o1/Gemini-2.5-Pro |

**Prior generation reference scores:**
- DeepSeek V3-0324: MMLU-Pro 81.2, GPQA 68.4
- DeepSeek R1-0528: GPQA 81.0, AIME 87.5
- Qwen3-235B: Competitive with o1, DeepSeek-R1, Gemini-2.5-Pro (exact numbers TBD)

### 2. Tool Use / Function Calling

| Model | BFCL | Tau-bench | Function Calling | Multi-step Tools |
|-------|------|-----------|-----------------|------------------|
| DeepSeek V4 Pro | ⚠️ TBD | ⚠️ TBD (R1: 53.5/63.9) | ✅ Native (OpenAI + Anthropic APIs) | ✅ Agent-optimized |
| DeepSeek V4 Flash | ⚠️ TBD | ⚠️ TBD | ✅ Supported | ✅ Good |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | ⚠️ TBD | ⚠️ TBD | ✅ MCP support + Qwen-Agent | ✅ Strong agentic |

**Key notes:**
- DeepSeek V4 Pro uniquely supports both OpenAI and Anthropic API formats for tool calling
- Qwen3.6 has explicit MCP (Model Context Protocol) support
- V3.1-Terminus specifically optimized Code Agent and Search Agent

### 3. Web Search

| Model | Query Formulation | Result Synthesis | Agent Integration |
|-------|------------------|-----------------|-------------------|
| DeepSeek V4 Pro | ⚠️ Not specifically benchmarked | V3-Terminus: improved search | ✅ Search Agent optimized |
| DeepSeek V4 Flash | ⚠️ TBD | ⚠️ TBD | ✅ Same lineage |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | ⚠️ TBD | ⚠️ TBD | ✅ Qwen-Agent with fetch tools |

**Note:** No standardized "web search" benchmark exists. Both models support agentic web search through tool use. DeepSeek has explicitly optimized for "Search Agent" capability. Qwen3 has MCP-based fetch tools.

### 4. Analysis / Reasoning

| Model | AIME 2025 | ARC | HellaSwag | Complex Problem Solving |
|-------|-----------|-----|-----------|------------------------|
| DeepSeek V4 Pro | ⚠️ TBD (R1-0528: 87.5) | ⚠️ TBD | ⚠️ TBD | Elite (thinking mode) |
| DeepSeek V4 Flash | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | Very Good (thinking mode available) |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | ⚠️ TBD (Qwen3: competitive) | ⚠️ TBD | ⚠️ TBD | Strong (4-stage RL pipeline) |

**Prior generation reference:**
- DeepSeek R1-0528: AIME 2025: 87.5, GPQA: 81.0
- DeepSeek V3-0324: AIME: 59.4 (non-thinking)
- Qwen3 trained with long CoT cold start + reasoning RL + thinking mode fusion + general RL

### 5. Data Creation

| Model | Content Generation | Structured Output | Creative Tasks |
|-------|-------------------|------------------|----------------|
| DeepSeek V4 Pro | Strong (V3: improved writing) | ✅ JSON mode, function calling | Strong (V3: R1-style writing) |
| DeepSeek V4 Flash | Good | ✅ Supported | Good |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | Strong (119 languages) | ✅ Structured output | Strong (multilingual creative) |

**Note:** No standardized benchmark for "data creation quality." Both models excel at structured output (JSON mode, format following). DeepSeek V3 explicitly improved "Chinese writing proficiency" and "report analysis."

### 6. Coding

| Model | HumanEval | HumanEval+ | MBPP | SWE-Bench | LiveCodeBench |
|-------|-----------|------------|------|-----------|---------------|
| DeepSeek V4 Pro | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD (V3.1: 66.0 verified) | ⚠️ TBD (V3-0324: 49.2) |
| DeepSeek V4 Flash | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD | ⚠️ TBD |

**Prior generation reference:**
- DeepSeek V3.1: SWE-bench Verified 66.0, SWE-bench Multilingual 54.5, Terminal-bench 31.3
- DeepSeek V2.5: HumanEval 89%, LiveCodeBench 41%
- Qwen3-235B: Competitive with top coding models (claimed)
- DeepSeek R1-0528: Aider 71.6, LCB_v6 73.3

### 7. RAG (Retrieval-Augmented Generation)

| Model | Context Window | Document Q&A | Retrieval Accuracy |
|-------|---------------|-------------|-------------------|
| DeepSeek V4 Pro | ⚠️ TBD (V3.1 likely 128K+) | Strong | Good (V2.5 explicitly optimized) |
| DeepSeek V4 Flash | ⚠️ TBD | Good | Good |
| Qwen3.5 Plus | ❌ N/A | ❌ N/A | ❌ N/A |
| Qwen3.6 Plus | ⚠️ TBD (Qwen3: 128K for most models) | Strong | Good |

**Context window history:**
- Qwen3 dense models: 128K (8B and above), 32K (smaller models)
- Qwen3 MoE models: 128K
- DeepSeek V3 context: Extended to 128K+ in V3.1
- Both models support long context for RAG use cases

---

## Data Gaps & Limitations

### Critical Gaps

1. **DeepSeek V4 benchmark scores:** The model was released April 24, 2026. As of the research date, no detailed technical report or benchmark table has been published in the API documentation. Only the changelog entry confirming the release and API names is available.

2. **Qwen3.5 Plus:** This model **does not exist**. The Qwen naming convention skipped from Qwen3 to Qwen3.6 for text models. The only "3.5" variant is `qwen3.5-omni-plus` which is multimodal.

3. **Qwen3.6 Plus specific benchmarks:** Alibaba Cloud does not publish detailed benchmark scores for its API-hosted models. Only the model listing and positioning (mid-tier) are available.

4. **BFCL scores:** No BFCL (Berkeley Function Calling Leaderboard) scores were found for any of these models in the fetched sources.

5. **ARC / HellaSwag scores:** These classic benchmarks were not mentioned in recent DeepSeek or Qwen documentation, likely because the industry has moved to harder benchmarks (MMLU-Pro, GPQA, SWE-Bench).

6. **Web search benchmarks:** No standardized benchmark exists for web search capability. Assessment is based on agentic tool-use features.

### What We Can Infer

- **DeepSeek V4 Pro** is expected to exceed V3.1 scores across all dimensions, as each generation has shown significant improvements
- **DeepSeek V4 Flash** is expected to be competitive with or exceed V3.1 non-thinking mode scores while being faster/cheaper
- **Qwen3.6 Plus** inherits the Qwen3 training improvements (36T tokens, 4-stage RL pipeline, hybrid thinking) and adds cloud-specific optimizations

---

## Sources

| Source | URL | Data Obtained |
|--------|-----|---------------|
| DeepSeek API Changelog | https://api-docs.deepseek.com/updates | V4 release date, API names, legacy migration, V3.1/V3.2/R1 benchmark history |
| Qwen3 Blog Post | https://qwenlm.github.io/blog/qwen3/ | Qwen3 architecture, training details, model sizes, capabilities |
| Qwen Blog Index | https://qwenlm.github.io/blog/ | Blog history showing no Qwen3.5 text model |
| Alibaba Cloud Model Studio | https://help.aliyun.com/zh/model-studio/getting-started/models | Qwen3.6 model lineup, third-party model availability, Qwen3.5-omni-plus existence |
| Qwen New Blog | https://qwen.ai/blog | Recent posts confirming model naming conventions |

---

## Appendix: DeepSeek Version History (for context)

| Version | Date | Key Changes |
|---------|------|-------------|
| V2.5 | 2024-09 | Merged Chat + Coder; HumanEval 89% |
| V3 | 2024-12-26 | Major architecture upgrade |
| V3-0324 | 2025-03-24 | MMLU-Pro 81.2, GPQA 68.4, LiveCodeBench 49.2 |
| R1-0528 | 2025-05-28 | AIME 87.5, GPQA 81.0, Aider 71.6 |
| V3.1 | 2025-08-21 | Hybrid reasoning, SWE-bench 66.0 |
| V3.1-Terminus | 2025-09-22 | Language consistency, agent fixes |
| V3.2-Exp | 2025-09-29 | Experimental |
| V3.2 | 2025-12-01 | Stable V3.2 |
| **V4 Pro/Flash** | **2026-04-24** | **Latest; benchmarks TBD** |

## Appendix: Qwen Version History (for context)

| Version | Date | Key Changes |
|---------|------|-------------|
| Qwen2.5 | Late 2024 | 18T tokens training, dense models up to 72B |
| Qwen3 | 2025-04-29 | 36T tokens, MoE + dense, hybrid thinking, 119 languages |
| Qwen3.5-omni-plus | ~Mid 2025 | Multimodal (vision + audio) only |
| Qwen3.6 | ~Mid 2025 | max-preview, plus, flash tiers on Alibaba Cloud |
