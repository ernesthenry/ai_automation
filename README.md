# AI automation labs (runnable projects)

Local training repo: **real** DSPy + OpenAI classification and extraction, BM25 RAG over CSV plus playbooks, MCP demo server, and an in-memory loan lifecycle API. Set **`OPENAI_API_KEY`** for any module that calls the LLM (classifier, transcript pipeline, rapid brief). See **[docs/CODEBASE.md](docs/CODEBASE.md)** for a file-by-file map.

**Preparation guides:** start at **[docs/PREPARATION.md](docs/PREPARATION.md)** (hub linking Tunga/Pair, STAR, labs, and canvases).

**Interview and learning content (GitHub-friendly Markdown):** **[CANVASES.md](CANVASES.md)**. Raw `.canvas.tsx` mirrors live under [`canvases/`](canvases/).

## Setup

```bash
cd /Users/Zhuanz/ai_automation
python3 -m venv .venv
source .venv/bin/activate
pip install -e .
export PYTHONPATH="$(pwd)/projects"
export DSPY_CACHE_DIR="$(pwd)/.dspy_cache"
mkdir -p .dspy_cache
```

## Smoke test

```bash
export PYTHONPATH="$(pwd)/projects"
export DSPY_CACHE_DIR="$(pwd)/.dspy_cache"
python scripts/smoke_test.py
```

Runs **BM25 RAG + loan API** without keys. If `OPENAI_API_KEY` is set, also runs **live OpenAI** checks (needs network).

## Projects

| Directory | What it is | Run |
|-----------|------------|-----|
| `projects/dspy_ticket_classifier` | DSPy ticket to category, priority, summary | `python -m dspy_ticket_classifier` |
| `projects/rag_operational_domain` | BM25 RAG: ERP-like CSV plus agronomy playbooks | `python -m rag_operational_domain` then `curl` (see below) |
| `projects/mcp_runbook_lite` | MCP tools with synthetic log/trace samples (no AWS) | `python -m mcp_runbook_lite` (stdio; attach from Cursor MCP config) |
| `projects/transcript_insight_pipeline` | Qualitative transcript to structured JSON | `python -m transcript_insight_pipeline` |
| `projects/loan_workflow_mock` | Loan states plus immutable audit log | `python -m loan_workflow_mock` |
| `projects/rapid_brief` | Form to executive brief via DSPy + OpenAI | `python -m rapid_brief` |

### RAG API quick curl

After `python -m rag_operational_domain`:

```bash
curl -s -X POST localhost:8010/query \
  -H 'content-type: application/json' \
  -d '{"question":"When should I irrigate after applying nitrogen to maize?","top_k":3}' | python3 -m json.tool
```

### MCP in Cursor

Add an MCP server entry pointing to:

- Command: `/path/to/ai_automation/.venv/bin/python`
- Args: `-m`, `mcp_runbook_lite`
- Cwd: `/path/to/ai_automation` with `PYTHONPATH=projects` in env (or set cwd to `projects` and use `python -m mcp_runbook_lite` from repo root in args).

## OpenAI + DSPy

```bash
export OPENAI_API_KEY=sk-...
export PYTHONPATH="$(pwd)/projects"
python -m dspy_ticket_classifier
```

Default model id is `openai/gpt-4o-mini` (see `projects/labs_common/openai_env.py`).

## Docker (AWS-ready packaging)

The RAG service can ship as a small container for ECS, App Runner, or Lambda (with an adapter). From the repo root:

```bash
docker build -f deploy/Dockerfile.rag -t rag-operational-domain .
docker run --rm -p 8010:8010 rag-operational-domain
```

## n8n / Zapier

HTTP contracts for automation tools live on the FastAPI apps (`/query`, `/applications`, `/brief`). Import into n8n or call from Zapier Webhooks. See `integrations/README.md`.
