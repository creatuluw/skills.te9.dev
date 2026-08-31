# Research Findings: MiMo & MiniMax Model Benchmarks

> **Date**: July 2025 (latest available data)
> **Models**: MiMo-V2.5, MiMo-V2.5-Pro, MiniMax M2.7, MiniMax M2.5

---

## Executive Summary

| Model | Developer | Architecture | Total Params | Active Params | Context Window | License |
|-------|-----------|-------------|-------------|--------------|----------------|---------|
| **MiMo-V2.5** | Xiaomi | MoE + Hybrid Attention (SWA/GA) | 310B | 15B | Up to 1M tokens (base: 256K) | MIT |
| **MiMo-V2.5-Pro** | Xiaomi | MoE + Hybrid Attention (SWA/GA) + MTP | 1.02T | 42B | Up to 1M tokens | MIT |
| **MiniMax M2.5** | MiniMax | MoE (minimax_m2) | 229B | ~45B (est.) | Up to 1M tokens | Modified MIT |
| **MiniMax M2.7** | MiniMax | MoE (minimax_m2) | 229B | ~45B (est.) | Up to 1M tokens | Other |

---

## 1. General Purpose

### Benchmark Scores

| Benchmark | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **MMLU** (5-shot) | 86.3 | 89.4 | N/A* | N/A* |
| **MMLU-Pro** (5-shot) | 65.8 | 68.5 | N/A* | N/A* |
| **MMLU-Redux** (5-shot) | 89.8 | 92.8 | N/A* | N/A* |
| **GPQA-Diamond** (5-shot) | 58.1 | 66.7 | 85.2 | N/A* |
| **BBH** (3-shot) | 87.2 | 88.4 | N/A* | N/A* |
| **DROP** (3-shot) | 83.7 | 86.3 | N/A* | N/A* |
| **WinoGrande** (5-shot) | 84.7 | 85.6 | N/A* | N/A* |
| **TriviaQA** (5-shot) | 80.7 | 81.3 | N/A* | N/A* |
| **C-Eval** (5-shot) | 88.6 | 91.5 | N/A* | N/A* |
| **CMMLU** (5-shot) | 88.2 | 90.2 | N/A* | N/A* |
| **GlobalMMLU** (5-shot) | 77.4 | 83.6 | N/A* | N/A* |
| **AIME 2025** | N/A | N/A | 86.3 | N/A* |
| **IFBench** | N/A | N/A | 70.0 | N/A* |

*\*MiniMax models report on different benchmark suites focused on agentic/coding tasks rather than classic NLU benchmarks.*

### Observations

- **MiMo-V2.5-Pro** leads in general-purpose benchmarks among the MiMo family, with a 3.1-point MMLU improvement over the base MiMo-V2.5 and an 8.6-point GPQA-Diamond improvement (66.7 vs 58.1).
- **MiniMax M2.5** reports a very strong **GPQA-Diamond of 85.2**, significantly higher than MiMo-V2.5-Pro (66.7), though evaluation settings may differ. M2.5 also scores 86.3 on AIME 2025.
- **MiniMax M2.7** does not publish traditional NLU benchmark scores; its focus is on agentic and professional work benchmarks (see sections below).
- Both model families have strong Chinese language support (C-Eval, CMMLU scores for MiMo; MiniMax is a Chinese company).

---

## 2. Tool Use / Function Calling

### Benchmark Scores

| Benchmark | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **BFCL** (Berkeley Function Calling) | Not reported | Not reported | Not reported | Not reported |
| **Claw-Eval General** | 62.1 | 64.0 | N/A | 49.7 |
| **Claw-Eval Multi-Turn** | 63.2 | 63.2 | N/A | 44.7 |
| **Toolathon** | N/A | N/A | N/A | 46.3% |
| **MM Claw** (skill compliance, 40+ skills) | N/A | N/A | N/A | 97% |
| **MM Claw** (end-to-end) | N/A | N/A | N/A | 62.7% |

### Capabilities Notes

**MiMo Models**:
- Both MiMo-V2.5 and MiMo-V2.5-Pro have native tool call parsers (`--tool-call-parser mimo` in SGLang/vLLM).
- Post-training includes "large-scale agentic RL" and Multi-Teacher On-Policy Distillation (MOPD) for tool use.
- MiMo-V2.5 is also a multimodal model (text, image, video, audio), enabling tool use in multimodal contexts.

**MiniMax Models**:
- M2.5 and M2.7 have native tool calling support with dedicated Tool Calling Guides.
- M2.7 introduced **Agent Teams** for multi-agent collaboration with stable role identity and autonomous decision-making.
- M2.7 supports dynamic tool search and complex skill orchestration.
- M2.5 trained with "hundreds of thousands of complex real-world environments" for RL.
- M2.5 demonstrates parallel tool calling and 20% fewer search rounds than M2.1, indicating more efficient tool orchestration.

### Data Gap

- **BFCL scores** are not publicly reported for any of these four models. This is a significant gap. The BFCL leaderboard (V4) does not appear to include MiMo or MiniMax entries in the data available.

---

## 3. Web Search

### Benchmark Scores

| Benchmark | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **BrowseComp** | N/A | N/A | 76.3% (with context mgmt) | N/A* |
| **Wide Search** | N/A | N/A | Not reported (qualitative improvement noted) | N/A* |
| **RISE** (Realistic Interactive Search Eval) | N/A | N/A | Not reported (industry-leading claimed) | N/A* |

### Capabilities Notes

**MiniMax M2.5** is the standout model for web search:
- **BrowseComp: 76.3%** with context management — this is described as industry-leading.
- Built **RISE** (Realistic Interactive Search Evaluation) benchmark to measure multi-step information retrieval with complex web interactions using Playwright-based browser tools.
- M2.5 uses approximately **20% fewer search rounds** than M2.1 while achieving better results, indicating more precise query formulation and synthesis.
- Trained for deep exploration across information-dense webpages, not just search engine usage.

**MiMo Models**:
- No specific web search benchmarks are reported for MiMo-V2.5 or MiMo-V2.5-Pro.
- The agentic RL training presumably includes web interaction capabilities, but no quantitative data is available.

### Data Gap

- MiMo models: **no web search benchmark data available**.
- MiniMax M2.7: specific BrowseComp/Wide Search/RISE scores not reported on the model card, though it inherits M2.5's architecture and improvements.

---

## 4. Analysis / Reasoning

### Benchmark Scores

| Benchmark | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **ARC-Challenge** (25-shot) | 96.5 | 97.2 | N/A | N/A |
| **HellaSwag** (10-shot) | 88.6 | 89.8 | N/A | N/A |
| **GSM8K** (8-shot) | 83.3 | 99.6 | N/A | N/A |
| **MATH** (4-shot) | 67.7 | 86.2 | N/A | N/A |
| **AIME 24&25** (2-shot) | 36.9 | 37.3 | N/A | N/A |
| **HLE** (w/o tools) | N/A | N/A | 19.4 | N/A |
| **SciCode** | N/A | N/A | 44.4 | N/A |
| **AA-LCR** | N/A | N/A | 69.5 | N/A |
| **GDPval-AA** (ELO) | N/A | N/A | N/A | 1495 (highest open-weight) |

### Observations

- **MiMo-V2.5-Pro** excels in mathematical reasoning: GSM8K 99.6%, MATH 86.2%. It significantly outperforms the base MiMo-V2.5 on these benchmarks (+16.3 on GSM8K, +18.5 on MATH).
- **MiMo-V2.5** is notably weaker on math (GSM8K 83.3, MATH 67.7) compared to the Pro variant, but still competitive for its size class.
- **MiniMax M2.5** reports AIME 2025 at 86.3, which is excellent, and GPQA-Diamond at 85.2 for graduate-level reasoning.
- **MiniMax M2.7** claims **GDPval-AA ELO 1495**, highest among open-weight models, surpassing GPT-5.3 for professional analysis tasks.

### Data Gap

- Direct comparison between MiMo and MiniMax on the same reasoning benchmarks is difficult since they report on different evaluation sets.
- MiniMax M2.7 lacks published scores for standard reasoning benchmarks (ARC, HellaSwag, MATH, etc.).

---

## 5. Data Creation

### Capabilities Notes

**MiniMax M2.5 & M2.7** have the strongest data creation story:

- **Office Work**: M2.5 trained to produce "truly deliverable outputs" — Word, PowerPoint, Excel with high-fidelity multi-round editing. M2.7 handles Word, Excel, PPT with 97% skill compliance across 40+ complex skills.
- **GDPval-MM** (internal benchmark): M2.5 achieves 59.0% average win rate against mainstream models on deliverable quality.
- **MEWC** (Microsoft Excel World Championship): Evaluated on 179 problems from Excel esports competitions 2021–2026.
- **Finance Modeling**: Internal benchmark with expert-designed rubrics for financial modeling tasks.
- **Content Generation**: M2.7 features strengthened character consistency and emotional intelligence for entertainment content. OpenRoom demo for interactive AI content.

**MiMo-V2.5** is a **multimodal model** (text, image, video, audio):
- Supports content generation across text, visual, and audio modalities.
- MiMo-V2.5-ASR variant handles automatic speech recognition.
- Native image/video/audio understanding enables rich content creation.

**MiMo-V2.5-Pro** is **text-only** but optimized for complex long-horizon tasks.

### Data Gap

- No standardized benchmark scores (e.g., MT-Bench, AlpacaEval) are reported for content generation quality for any of these models.
- Qualitative assessment only for most data creation capabilities.

---

## 6. Coding

### Benchmark Scores

| Benchmark | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **HumanEval+** (1-shot) | 71.3 | 75.6 | N/A | N/A |
| **MBPP+** (3-shot) | 70.9 | 74.1 | N/A | N/A |
| **LiveCodeBench v6** (1-shot) | 35.5 | 39.6 | N/A | N/A |
| **SWE-Bench (AgentLess)** (3-shot) | 30.8 | 35.7 | N/A | N/A |
| **SWE-Bench Verified** | N/A | 78.9 | 75.8–80.2 | N/A |
| **SWE-Bench Pro** | 56.1 | 57.2 | 55.4 | 56.2 |
| **SWE Multilingual** | N/A | N/A | N/A | 76.5 |
| **Multi-SWE-Bench** | N/A | N/A | 51.3 | 52.7 |
| **Terminal Bench 2** | 65.8 | 68.4 | N/A | 57.0 |
| **VIBE-Pro** | N/A | N/A | ~Opus 4.5 level | 55.6% |
| **MLE Bench Lite** (22 ML competitions) | N/A | N/A | N/A | 66.6% medal rate |
| **NL2Repo** | N/A | N/A | N/A | 39.8% |
| **SciCode** | N/A | N/A | 44.4 | N/A |

### Observations

**MiMo-V2.5-Pro** is the strongest MiMo coding model:
- SWE-Bench Verified: **78.9%** — competitive with top-tier models.
- SWE-Bench Pro: **57.2%**.
- Terminal Bench 2: **68.4%** — highest among all four models.
- HumanEval+: 75.6%, LiveCodeBench v6: 39.6%.

**MiniMax M2.5** is a coding powerhouse:
- SWE-Bench Verified: **75.8%** (leaderboard), up to **80.2%** with optimal scaffolding.
- SWE-Bench Verified on Droid: **79.7** (surpassing Opus 4.6's 78.9).
- SWE-Bench Verified on OpenCode: **76.1**.
- Multi-SWE-Bench: **51.3%**.
- Trained on 10+ programming languages across 200,000+ real-world environments.
- Full development lifecycle support: system design → development → iteration → review/testing.
- Full-stack: Web, Android, iOS, Windows, server-side APIs, databases.

**MiniMax M2.7** pushes further:
- SWE-Pro: **56.22%** — matching GPT-5.3-Codex.
- SWE Multilingual: **76.5**, Multi-SWE-Bench: **52.7**.
- MLE Bench Lite: **66.6% medal rate** (second only to Opus-4.6 and GPT-5.4).
- Self-evolved: M2.7 autonomously optimized a programming scaffold over 100+ rounds, achieving 30% improvement.
- Native Agent Teams for multi-agent collaboration.

### Cross-Model Comparison (SWE-Bench Pro)

| Rank | Model | SWE-Bench Pro |
|------|-------|--------------|
| 1 | MiMo-V2.5-Pro | 57.2 |
| 2 | MiniMax M2.7 | 56.2 |
| 3 | MiniMax M2.5 | 55.4 |
| 4 | MiMo-V2.5 | 56.1 |

These four models are very close on SWE-Bench Pro, within ~2 points of each other.

---

## 7. RAG (Retrieval-Augmented Generation)

### Long Context Performance

| Capability | MiMo-V2.5 | MiMo-V2.5-Pro | MiniMax M2.5 | MiniMax M2.7 |
|-----------|-----------|---------------|-------------|-------------|
| **Max Context** | 1M tokens | 1M tokens | 1M+ tokens | 1M+ tokens |
| **Base Context** | 256K | 256K | 1M | 1M |
| **GraphWalks BFS @ 512K** | N/A | 0.56 | N/A | N/A |
| **GraphWalks Parents @ 512K** | N/A | 0.92 | N/A | N/A |
| **GraphWalks BFS @ 1M** | N/A | 0.37 | N/A | N/A |
| **GraphWalks Parents @ 1M** | N/A | 0.62 | N/A | N/A |
| **KV-Cache Reduction** | ~6x via SWA | ~7x via SWA | N/A | N/A |
| **AA-LCR** (long context reasoning) | N/A | N/A | 69.5 | N/A |

### Architecture Details for Long Context

**MiMo Models**:
- Hybrid attention with Sliding Window Attention (SWA) and Global Attention (GA).
  - MiMo-V2.5: 5:1 SWA:GA ratio, 128 sliding window
  - MiMo-V2.5-Pro: 6:1 SWA:GA ratio, 128 sliding window
- Learnable attention sink bias maintains long-context quality.
- Multi-Token Prediction (MTP) with 3 layers for faster inference.
- MiMo-V2.5-Pro: at 1M tokens, retains 0.37 BFS / 0.62 Parents on GraphWalks (vs. 0.00 for the previous MiMo-V2 Pro).

**MiniMax Models**:
- The M2 series uses full attention (not hybrid SWA/GA), as noted in their tech blog "Why Did MiniMax M2 End Up as a Full Attention Model?"
- MiniMax-01 (predecessor) used Lightning Attention for linear complexity; M2 series moved to full attention for quality.
- M2.5 trained with context management strategies (BrowseComp with context management at 76.3%).
- When token usage exceeds 30% of max context, history is discarded — a built-in RAG optimization.

### Observations

- **MiMo-V2.5-Pro** has the most detailed long-context benchmarking with GraphWalks across the full 32K–1M range, showing graceful degradation rather than collapse.
- **MiniMax M2.5** has a claimed advantage in RAG-like tasks via BrowseComp (76.3%) and RISE benchmarks, but specific needle-in-haystack or long-context retrieval scores are not published.
- All four models support contexts of at least 1M tokens, making them suitable for large-document RAG.

### Data Gap

- No standard RAG benchmarks (e.g., NQ, TREC, HotpotQA, needle-in-haystack) are reported for any of these models.
- MiniMax does not publish GraphWalks or equivalent long-context reasoning scores.
- MiMo does not report BrowseComp or web-based retrieval scores.

---

## Overall Rankings Summary

### By Dimension (Best → Worst)

| Dimension | #1 | #2 | #3 | #4 |
|-----------|----|----|----|----|
| **General Purpose** | MiMo-V2.5-Pro | MiniMax M2.5 | MiMo-V2.5 | MiniMax M2.7* |
| **Tool Use / Function Calling** | MiniMax M2.7 | MiniMax M2.5 | MiMo-V2.5-Pro | MiMo-V2.5 |
| **Web Search** | MiniMax M2.5 | MiniMax M2.7* | MiMo (no data) | MiMo (no data) |
| **Analysis / Reasoning** | MiniMax M2.5 | MiMo-V2.5-Pro | MiMo-V2.5 | MiniMax M2.7* |
| **Data Creation** | MiniMax M2.7 | MiniMax M2.5 | MiMo-V2.5 (multimodal) | MiMo-V2.5-Pro |
| **Coding** | MiniMax M2.7 | MiMo-V2.5-Pro | MiniMax M2.5 | MiMo-V2.5 |
| **RAG / Long Context** | MiMo-V2.5-Pro | MiniMax M2.5 | MiMo-V2.5 | MiniMax M2.7* |

*\*MiniMax M2.7 rankings marked with asterisk are estimated based on being an improvement over M2.5 but lacking specific benchmark scores.*

### Key Takeaways

1. **MiMo-V2.5-Pro** (1T params, 42B active) is the best overall model in the MiMo family — significantly stronger than MiMo-V2.5 on reasoning, math, and coding. Its long-context capabilities are well-documented with GraphWalks benchmarks up to 1M tokens.

2. **MiMo-V2.5** (310B params, 15B active) is unique as a **multimodal model** (text, image, video, audio) while the Pro variant is text-only. It's the lighter option with still-competitive performance.

3. **MiniMax M2.5** is a **coding and search specialist** — SOTA-level on SWE-Bench Verified (up to 80.2%), BrowseComp (76.3%), and strong on GPQA-Diamond (85.2). It also offers extreme cost efficiency at $0.3–$1/hour continuous operation.

4. **MiniMax M2.7** is the most capable agentic model, with self-evolution capabilities (optimized its own code scaffold), Agent Teams for multi-agent collaboration, and the highest open-weight GDPval-AA ELO (1495). It excels at professional software engineering tasks.

5. **Data gaps are significant**: None of these models report BFCL scores, and direct comparisons across families are difficult due to different benchmark suites. MiniMax focuses on agentic/professional benchmarks while MiMo reports more traditional NLU benchmarks.

---

## Sources

| Source | URL | Date Accessed |
|--------|-----|--------------|
| MiMo-V2.5 Model Card | https://huggingface.co/XiaomiMiMo/MiMo-V2.5 | July 2025 |
| MiMo-V2.5-Pro Model Card | https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro | July 2025 |
| Xiaomi MiMo HuggingFace Org | https://huggingface.co/XiaomiMiMo | July 2025 |
| MiniMax M2.5 Model Card | https://huggingface.co/MiniMaxAI/MiniMax-M2.5 | July 2025 |
| MiniMax M2.7 Model Card | https://huggingface.co/MiniMaxAI/MiniMax-M2.7 | July 2025 |
| MiniMax HuggingFace Org | https://huggingface.co/MiniMaxAI | July 2025 |
| BFCL Leaderboard | https://gorilla.cs.berkeley.edu/leaderboard.html | July 2025 |
| MiniMax Tech Blog (M2.5 - Forge RL Framework) | https://huggingface.co/blog/minimax-m2-5-forge | Referenced from org page |
| MiniMax Tech Blog (M2 - Full Attention) | https://huggingface.co/blog/minimax-m2-attention | Referenced from org page |

---

## Gaps & Recommendations for Further Research

1. **BFCL Scores**: None of these models report Berkeley Function Calling Leaderboard scores. Would need to run BFCL evaluation directly or contact the model developers.
2. **Standard RAG Benchmarks**: No needle-in-haystack, NQ, TREC, or HotpotQA scores reported for any model.
3. **Head-to-Head Comparisons**: No independent evaluation comparing MiMo and MiniMax models on the same benchmark suite was found.
4. **MiniMax M2.7 Detailed Benchmarks**: M2.7's model card focuses on qualitative improvements and professional benchmarks rather than comprehensive standard benchmark tables. Traditional NLU scores (MMLU, ARC, etc.) are not published.
5. **MiMo-V2.5 Non-Pro Coding Benchmarks**: The base MiMo-V2.5 model card references charts/images for coding benchmarks but specific SWE-Bench Verified scores for the non-Pro variant are not listed in text.
6. **Community Evaluations**: Limited independent community evaluations found. Most data comes from official model cards.
