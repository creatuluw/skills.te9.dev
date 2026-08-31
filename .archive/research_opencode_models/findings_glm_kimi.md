# Research Findings: GLM-5, GLM-5.1, Kimi K2.5, Kimi K2.6

**Date**: July 2026  
**Research Scope**: Benchmark performance across 7 dimensions for 4 Chinese-developed AI models

---

## Executive Summary

| Model | Creator | AA Intelligence Index | Rank (Open Weights) | Params (Total/Active) | Context Window | Release Date |
|-------|---------|-----------------------|---------------------|-----------------------|----------------|--------------|
| **Kimi K2.6** | Kimi (Moonshot AI) | **54** | **#1** | 1000B / 32B (MoE) | 256k | April 2026 |
| **GLM-5.1 (Reasoning)** | Z AI (Zhipu AI / Tsinghua) | **51** | **#4** | 744B / 40B (MoE) | 200k | April 2026 |
| **Kimi K2.5 (Reasoning)** | Kimi (Moonshot AI) | **47** | **#9** | 1000B / 32B (MoE) | 256k | January 2026 |
| **GLM-5** | Z AI (Zhipu AI / Tsinghua) | *Not separately listed* | — | ~744B / ~40B (MoE) | 200k | ~Q1 2026 |

> **Note**: The Artificial Analysis Intelligence Index v4.0 is a composite score (0–100) incorporating 10 evaluations: GDPval-AA, τ²-Bench Telecom, Terminal-Bench Hard, SciCode, AA-LCR, AA-Omniscience, IFBench, Humanity's Last Exam, GPQA Diamond, and CritPt.

---

## 1. General Purpose Performance

### MMLU / MMLU-Pro / GPQA

Specific MMLU and GPQA scores are not directly available from the pages fetched. However, these benchmarks are reflected in the composite AA Intelligence Index. The AA Intelligence Index incorporates **GPQA Diamond** (scientific reasoning) directly, and the AA-Omniscience evaluation covers broad knowledge.

| Model | AA Intelligence Index | GPQA Diamond (component) | AA-Omniscience (Knowledge) |
|-------|----------------------|--------------------------|----------------------------|
| **Kimi K2.6** | 54 | Part of composite | Part of composite |
| **GLM-5.1** | 51 | Part of composite | Part of composite |
| **Kimi K2.5** | 47 | Part of composite | Part of composite |

### Context from the AI Lab Claims (not independently verified)

Both Zhipu AI and Kimi have made public benchmark claims. Based on the THUDM HuggingFace page, GLM-5's paper is titled **"GLM-5: from Vibe Coding to Agentic Engineering"** (published ~April 2025 in its initial form, with GLM-5.1 following as an iteration).

**Data Gap**: Specific MMLU, MMLU-Pro, and ARC/HellaSwag scores for each model were not available from the fetched sources. These would need to be obtained from official technical reports directly.

### Key Takeaway
- **Kimi K2.6** leads all open-weight models on the AA Intelligence Index (54), surpassing GLM-5.1 by 3 points.
- **GLM-5.1** ranks #4 among open-weight models with a score of 51.
- **Kimi K2.5** scores 47, which was strong at launch but has been surpassed by K2.6.

---

## 2. Tool Use / Function Calling

### BFCL (Berkeley Function Calling Leaderboard)

The BFCL V4 leaderboard evaluates tool calling ability across multiple categories including multi-turn interactions and agentic evaluation. The leaderboard (last updated 2026-04-12) includes AST-based evaluation metrics.

| Model | BFCL Score | BFCL Rank | Notes |
|-------|-----------|-----------|-------|
| **GLM-5.1** | *Not explicitly available* | — | Zhipu AI docs confirm native function/tool calling support |
| **Kimi K2.6** | *Not explicitly available* | — | Supports tool calling via API |
| **Kimi K2.5** | *Not explicitly available* | — | Supports tool calling via API |

### Agentic Tool Use (τ²-Bench Telecom)

The τ²-Bench Telecom evaluation (part of the AA Intelligence Index) specifically tests agentic tool use capabilities.

### From Zhipu AI Platform Documentation
GLM models support:
- **Native function/tool calling** (FC mode)
- **Tool streaming output**
- **Context caching** for tool-based interactions
- **Structured output** for reliable JSON function call responses

### Data Gap
- Specific BFCL scores for all four models were not available from the fetched pages. The BFCL leaderboard is rendered dynamically and individual model scores require direct interaction with the interactive chart.
- No multi-step tool orchestration benchmarks were found in the fetched data.

### Key Takeaway
- Both GLM-5/5.1 and Kimi K2.5/K2.6 support native function calling.
- GLM models have more documented tool calling infrastructure (streaming tool output, AllTools mode).
- The τ²-Bench Telecom scores (agentic tool use) contribute to the AA Intelligence Index but individual breakdowns were not available.

---

## 3. Web Search

### Information Retrieval Capability

| Model | Web Search Support | Notes |
|-------|-------------------|-------|
| **GLM-5 / 5.1** | ✅ Built-in web search tool | Zhipu AI docs list "联网搜索" (web search) as a native model tool |
| **Kimi K2.5 / K2.6** | ✅ Web search capable | Kimi platform historically strong in web-augmented QA |

### From Zhipu AI Documentation
- GLM models include a dedicated **联网搜索** (web search) tool integrated at the platform level
- The search tool can be invoked via API with streaming results
- File parsing service available for document processing

### Data Gap
- No standardized web search benchmark (e.g., FreshQA, CRAG) scores were found for any model.
- Query formulation and search result synthesis quality has not been independently benchmarked in a standardized way.

### Key Takeaway
- Both platforms offer native web search integration.
- GLM-5/5.1 has explicit documentation of web search as a first-class tool.
- Kimi has historically been strong in web-augmented conversations (its consumer product is known for search-augmented chat).

---

## 4. Analysis & Reasoning

### Reasoning Benchmarks

The AA Intelligence Index incorporates several reasoning-heavy evaluations:

| Evaluation | What it Tests | Relevance |
|-----------|---------------|-----------|
| **Humanity's Last Exam** | Reasoning & knowledge | General reasoning |
| **GPQA Diamond** | Scientific reasoning | Analytical depth |
| **CritPt** | Physics reasoning | Domain-specific reasoning |
| **AA-Omniscience** | Knowledge accuracy & hallucination rate | Reliability |
| **GDPval-AA** | Agentic real-world work tasks | Practical reasoning |

### Composite Scores

| Model | AA Intelligence Index | Reasoning Model? |
|-------|----------------------|------------------|
| **Kimi K2.6** | 54 | Yes (extended thinking) |
| **GLM-5.1** | 51 | Yes (extended thinking) |
| **Kimi K2.5** | 47 | Yes (extended thinking) |

All four models are **reasoning models** that use extended thinking / chain-of-thought reasoning before providing answers. This contributes to their higher verbosity:

| Model | Output Tokens (Intelligence Index) | Verbosity Assessment |
|-------|-----------------------------------|---------------------|
| **Kimi K2.6** | 170M | Very verbose (median: 42M) |
| **GLM-5.1** | 110M | Very verbose |
| **Kimi K2.5** | 89M | Very verbose |

### Data Gap
- Specific ARC-Challenge and HellaSwag scores were not available from the fetched sources.
- Individual breakdowns of reasoning sub-benchmarks (HLE, GPQA Diamond, CritPt) were not extractable.

### Key Takeaway
- All models are strong reasoners, with Kimi K2.6 leading at 54 on the AA Intelligence Index.
- The high verbosity (reasoning tokens) suggests significant chain-of-thought computation.
- **Kimi K2.6** is the #1 open-weight model for intelligence as of the evaluation date.

---

## 5. Data Creation / Content Generation

### Content Generation Quality

No standardized content generation benchmarks (e.g., AlpacaEval, MT-Bench) were available from the fetched sources. However, several indicators inform quality:

| Model | Instruction Following (IFBench) | Structured Output | Notes |
|-------|-------------------------------|-------------------|-------|
| **GLM-5.1** | Part of AA Index (51) | ✅ Native structured output support | Platform docs confirm JSON mode, schema enforcement |
| **Kimi K2.6** | Part of AA Index (54) | ✅ Supports structured output | — |
| **Kimi K2.5** | Part of AA Index (47) | ✅ Supports structured output | — |

### From Zhipu AI Platform
GLM models offer:
- **结构化输出** (structured output) as a documented capability
- **Content generation** as a listed intelligent agent use case
- **Information extraction** agents

### Data Gap
- No creative writing, summarization, or content quality benchmarks were available.
- No human evaluation scores for content generation were found.

### Key Takeaway
- All models support structured output for reliable data creation.
- GLM-5.1 has more explicit documentation around content generation tooling.
- Higher AA Intelligence Index scores generally correlate with better instruction following, which benefits content generation.

---

## 6. Coding

### Coding Benchmarks

The **SciCode** evaluation (part of the AA Intelligence Index) specifically tests coding ability. Additionally, **Terminal-Bench Hard** tests agentic coding and terminal use.

### Coding Index

Artificial Analysis provides a separate **Coding Index** derived from coding-specific evaluations:

| Model | AA Intelligence Index | SciCode (component) | Terminal-Bench Hard |
|-------|----------------------|---------------------|---------------------|
| **Kimi K2.6** | 54 | Part of composite | Part of composite |
| **GLM-5.1** | 51 | Part of composite | Part of composite |
| **Kimi K2.5** | 47 | Part of composite | Part of composite |

### GLM-5 Specific Context
The GLM-5 paper is titled **"GLM-5: from Vibe Coding to Agentic Engineering"**, indicating a strong focus on coding and engineering tasks. The paper was authored by researchers at Tsinghua University's KEG group.

### Data Gap
- Specific HumanEval, HumanEval+, MBPP, SWE-Bench, and LiveCodeBench scores were not available from the fetched sources.
- Multi-language code generation benchmarks were not found.

### Key Takeaway
- Both model families are competitive on coding tasks.
- GLM-5/5.1 is explicitly branded around coding/engineering capabilities.
- Kimi K2.6 leads on the composite AA Intelligence Index which includes coding components.

---

## 7. RAG (Retrieval-Augmented Generation)

### Context Window & Long Context

| Model | Context Window | Total Params | Active Params | Architecture |
|-------|---------------|-------------|---------------|-------------|
| **Kimi K2.6** | **256k tokens** | 1000B | 32B | MoE |
| **Kimi K2.5** | **256k tokens** | 1000B | 32B | MoE |
| **GLM-5.1** | **200k tokens** | 744B | 40B | MoE |
| **GLM-5** | **200k tokens** | ~744B | ~40B | MoE |

### Long Context Reasoning

The **AA-LCR** (Long Context Reasoning) evaluation is part of the AA Intelligence Index and directly tests RAG-relevant capabilities.

### Context Caching

| Model | Cache Hit Price | Discount |
|-------|----------------|----------|
| **Kimi K2.6** | $0.16 / 1M tokens | -83% from input |
| **Kimi K2.5** | $0.35 / 1M tokens | -35% from input |
| **GLM-5.1** | $0.26 / 1M tokens | -81% from input |

Context caching is particularly relevant for RAG workflows where repeated document chunks are processed.

### From Zhipu AI Platform
GLM models offer:
- **上下文缓存** (context caching) as a documented capability
- **上下文增强技术报告** (context enhancement technical report) available
- **文件解析** (file parsing) and **OCR** services
- Full **知识库服务** (knowledge base service) for document Q&A

### Data Gap
- Specific document Q&A benchmark scores (e.g., QA with long context, needle-in-a-haystack) were not available.
- Retrieval accuracy metrics were not found.

### Key Takeaway
- Kimi models have a larger context window (256k vs 200k), beneficial for large document processing.
- GLM-5.1 has more active parameters (40B vs 32B), potentially benefiting complex reasoning over retrieved content.
- GLM platform offers a more complete RAG toolchain (knowledge base service, file parsing, OCR).
- All models support context caching, which is essential for cost-effective RAG deployments.

---

## Speed & Pricing Comparison

| Metric | Kimi K2.6 | GLM-5.1 (Reasoning) | Kimi K2.5 (Reasoning) |
|--------|-----------|---------------------|----------------------|
| **Output Speed** | 37.3 tok/s | 48.2 tok/s | 50.9 tok/s |
| **TTFT** | 2.93s | 1.74s | 3.03s |
| **Input Price** | $0.95 / 1M | $1.40 / 1M | $0.54 / 1M |
| **Output Price** | $4.00 / 1M | $4.40 / 1M | $2.925 / 1M |
| **Blended Price** | $1.71 / 1M | $2.15 / 1M | $1.14 / 1M |

### Key Observations:
- **GLM-5.1** is the fastest (48.2 tok/s) and has the best TTFT (1.74s), but is the most expensive.
- **Kimi K2.5** is the best value (cheapest at $1.14/M blended) but has the lowest intelligence score.
- **Kimi K2.6** offers the best intelligence but is slow (37.3 tok/s) and expensive ($1.71/M blended).
- All models are verbose reasoning models with high token usage during inference.

---

## Architecture Comparison

| Feature | GLM-5 / 5.1 | Kimi K2.5 / K2.6 |
|---------|-------------|-------------------|
| **Architecture** | MoE (Mixture of Experts) | MoE (Mixture of Experts) |
| **Total Parameters** | 744B | 1000B |
| **Active Parameters** | 40B | 32B |
| **Reasoning** | Yes (extended thinking) | Yes (extended thinking) |
| **License** | MIT | Modified MIT |
| **Multimodal Input** | Text only (GLM-5.1) | Text, Image, Video |
| **Context Window** | 200k | 256k |
| **Open Weights** | Yes (HuggingFace) | Yes (HuggingFace) |

### Key Differences:
- **GLM-5.1** uses more active parameters per token (40B vs 32B), potentially giving it more capacity per inference step.
- **Kimi models** are multimodal (text + image + video), while GLM-5.1 is text-only.
- **GLM models** use the MIT license (more permissive), while Kimi uses Modified MIT.
- **Kimi's** larger total parameter count (1T vs 744B) means more specialized experts available.

---

## Summary Rankings by Dimension

| Dimension | Best Model | Runner-up | Notes |
|-----------|-----------|-----------|-------|
| **General Purpose** | Kimi K2.6 (54) | GLM-5.1 (51) | K2.6 is #1 open-weight model overall |
| **Tool Use / FC** | GLM-5.1 | Kimi K2.6 | GLM has richer documented tool infrastructure |
| **Web Search** | Tie | — | Both platforms offer native web search |
| **Analysis / Reasoning** | Kimi K2.6 (54) | GLM-5.1 (51) | K2.6 leads on composite reasoning |
| **Data Creation** | Kimi K2.6 (54) | GLM-5.1 (51) | Higher intelligence → better instruction following |
| **Coding** | Kimi K2.6 | GLM-5.1 | GLM-5 branded for coding; K2.6 leads on benchmarks |
| **RAG** | Kimi K2.6 (256k) | GLM-5.1 (200k) | Kimi has larger context; GLM has better RAG toolchain |

---

## Data Gaps & Limitations

The following specific benchmark scores could **not** be obtained from the fetched sources and would require consulting official technical reports or running evaluations directly:

1. **MMLU / MMLU-Pro**: Not listed on AA Intelligence Index breakdowns
2. **ARC-Challenge / HellaSwag**: Not covered by the fetched sources
3. **HumanEval / HumanEval+ / MBPP**: Not available in extracted data
4. **SWE-Bench / LiveCodeBench**: Not available in extracted data
5. **BFCL scores**: Leaderboard is interactive/dynamic; individual model scores not extractable
6. **FreshQA / CRAG (Web Search)**: No standardized web search benchmarks found
7. **AlpacaEval / MT-Bench (Content)**: No content generation benchmarks found
8. **Needle-in-a-Haystack / Doc QA**: No specific RAG accuracy benchmarks found
9. **GLM-5 specific scores**: GLM-5 (original, not 5.1) is not separately listed on Artificial Analysis

---

## Sources

| Source | URL | Data Obtained |
|--------|-----|---------------|
| Zhipu AI Platform Docs | https://bigmodel.cn/dev/howuse/glm-5 | GLM-5 tool capabilities, platform features |
| THUDM on HuggingFace | https://huggingface.co/THUDM | GLM-5 paper title, research group info |
| BFCL Leaderboard | https://gorilla.cs.berkeley.edu/leaderboard.html | BFCL v4 methodology, evaluation framework |
| Artificial Analysis (Main) | https://artificialanalysis.ai/models | Overall leaderboard context, top model rankings |
| Artificial Analysis (Kimi K2.6) | https://artificialanalysis.ai/models/kimi-k2-6 | Detailed specs, pricing, speed, intelligence |
| Artificial Analysis (GLM-5.1) | https://artificialanalysis.ai/models/glm-5-1 | Detailed specs, pricing, speed, intelligence |
| Artificial Analysis (Kimi K2.5) | https://artificialanalysis.ai/models/kimi-k2-5 | Detailed specs, pricing, speed, intelligence |

---

## Recommendations for Further Research

1. **Fetch the GLM-5 technical report** directly from Zhipu AI or arxiv for specific MMLU, HumanEval, and SWE-Bench scores.
2. **Consult the Kimi K2.5/K2.6 technical reports** from Moonshot AI for detailed benchmark tables.
3. **Query the BFCL leaderboard API** for specific function calling scores for these models.
4. **Run independent evaluations** on FreshQA or CRAG for web search benchmarking.
5. **Check HuggingFace Open LLM Leaderboard** for standardized benchmark scores (MMLU, ARC, HellaSwag, etc.).
