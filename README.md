# AI automation labs (runnable projects)

Local training repo: DSPy classification, BM25 RAG over CSV plus playbooks, MCP runbook server, transcript-to-schema extraction, and a loan lifecycle API. Every service runs **without API keys** using `USE_MOCK_AI=1` (default). Set `OPENAI_API_KEY` and `USE_MOCK_AI=0` to exercise real DSPy calls.

**Interview and learning canvases (GitHub-friendly):** open **[CANVASES.md](CANVASES.md)** for the same content as the Cursor canvases in rendered Markdown. Raw `.canvas.tsx` mirrors live under [`canvases/`](canvases/).

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

## Smoke test (no network)

```bash
export PYTHONPATH="$(pwd)/projects"
export DSPY_CACHE_DIR="$(pwd)/.dspy_cache"
python scripts/smoke_test.py
```

## Projects

| Directory | What it is | Run |
|-----------|------------|-----|
| `projects/dspy_ticket_classifier` | DSPy ticket to category, priority, summary | `python -m dspy_ticket_classifier` |
| `projects/rag_operational_domain` | BM25 RAG: ERP-like CSV plus agronomy playbooks | `python -m rag_operational_domain` then `curl` (see below) |
| `projects/mcp_runbook_lite` | MCP tools for mock errors and dashboards | `python -m mcp_runbook_lite` (stdio; attach from Cursor MCP config) |
| `projects/transcript_insight_pipeline` | Qualitative transcript to structured JSON | `python -m transcript_insight_pipeline` |
| `projects/loan_workflow_mock` | Loan states plus immutable audit log | `python -m loan_workflow_mock` |
| `projects/rapid_brief` | Form to executive brief (mock or LLM) | `python -m rapid_brief` |

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

## Real LLM mode

```bash
export OPENAI_API_KEY=sk-...
export USE_MOCK_AI=0
export PYTHONPATH="$(pwd)/projects"
python -m dspy_ticket_classifier
```

DSPy is configured with `dspy.LM("openai/gpt-4o-mini", ...)` in each module that calls the model.

## Docker (AWS-ready packaging)

The RAG service can ship as a small container for ECS, App Runner, or Lambda (with an adapter). From the repo root:

```bash
docker build -f deploy/Dockerfile.rag -t rag-operational-domain .
docker run --rm -p 8010:8010 rag-operational-domain
```

## n8n / Zapier

HTTP contracts for automation tools live on the FastAPI apps (`/query`, `/applications`, `/brief`). Import into n8n or call from Zapier Webhooks. See `integrations/README.md`.
