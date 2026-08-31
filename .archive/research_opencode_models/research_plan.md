# Research Plan: OpenCode Go Model Benchmarking

## Main Research Question
Rank 12 OpenCode Go models on 7 capability dimensions: general purpose, tool use, web search, analysis, data creation, coding, and RAG.

## Models to Research
1. GLM-5.1, GLM-5, Kimi K2.5, Kimi K2.6
2. DeepSeek V4 Pro, DeepSeek V4 Flash, Qwen3.5 Plus, Qwen3.6 Plus
3. MiMo-V2.5 (256K), MiMo-V2.5-Pro, MiniMax M2.7, MiniMax M2.5

## Capability Dimensions
- **General purpose**: Overall performance across diverse tasks (MMLU, GPQA, etc.)
- **Tool use**: Function calling, tool orchestration, multi-step tool usage
- **Web search**: Information retrieval, query formulation, search result synthesis
- **Analysis**: Reasoning, data interpretation, complex problem solving
- **Data creation**: Content generation, structured data output, creative tasks
- **Coding**: Code generation, debugging, multi-language support (HumanEval, SWE-Bench, etc.)
- **RAG**: Retrieval-augmented generation, context understanding, document Q&A

## Subtopics (3 parallel research subagents)

### Subtopic 1: GLM & Kimi Family
Models: GLM-5, GLM-5.1, Kimi K2.5, Kimi K2.6
- Find benchmarks (MMLU, HumanEval, SWE-Bench, GPQA, BFCL for tool use)
- Find RAG and retrieval benchmarks
- Find analysis and reasoning scores
- Find general capability comparisons

### Subtopic 2: DeepSeek V4 & Qwen Family
Models: DeepSeek V4 Pro, DeepSeek V4 Flash, Qwen3.5 Plus, Qwen3.6 Plus
- Find benchmarks (MMLU, HumanEval, SWE-Bench, GPQA, BFCL for tool use)
- Find RAG and retrieval benchmarks
- Find analysis and reasoning scores
- Find general capability comparisons

### Subtopic 3: MiMo & MiniMax Family
Models: MiMo-V2.5, MiMo-V2.5-Pro, MiniMax M2.7, MiniMax M2.5
- Find benchmarks (MMLU, HumanEval, SWE-Bench, GPQA, BFCL for tool use)
- Find RAG and retrieval benchmarks
- Find analysis and reasoning scores
- Find general capability comparisons

## Synthesis Plan
After gathering findings:
1. Build a comparison matrix with all 12 models x 7 dimensions
2. Rank models 1-12 on each dimension
3. Identify top-3 and bottom-3 on each dimension
4. Note any gaps where benchmark data is unavailable
5. Produce actionable recommendations for the opencode-go-integrator skill enhancement
