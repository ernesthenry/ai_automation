# Codebase map

LLM features need **`OPENAI_API_KEY`** and network access. BM25 RAG and the loan API do not call OpenAI.

| Path | Role |
|------|------|
| `projects/labs_common/openai_env.py` | Key guard + default model id |
| `projects/dspy_ticket_classifier/classifier.py` | Ticket → labels (DSPy) |
| `projects/transcript_insight_pipeline/` | Transcript → `InsightReport` |
| `projects/rapid_brief/app.py` | Brief form/API (DSPy) |
| `projects/rag_operational_domain/` | BM25 + FastAPI |
| `projects/loan_workflow_mock/` | In-memory workflow + audit |
| `projects/mcp_runbook_lite/server.py` | MCP demo tools |
| `scripts/smoke_test.py` | RAG + loan always; LLM checks if key set |

**Commenting:** one module docstring per file, short docstrings only where contracts or failure modes matter, no narration on obvious lines.

```bash
export OPENAI_API_KEY=sk-...
export PYTHONPATH="$(pwd)/projects"
export DSPY_CACHE_DIR="$(pwd)/.dspy_cache"
```
