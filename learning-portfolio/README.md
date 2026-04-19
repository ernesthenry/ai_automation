# Learning portfolio (automation lab ideas)

Use this folder as a home for repos or notes while you work through the projects.

## Preparation guides (interview + client)

| Doc | Link |
|-----|------|
| **Hub (start here)** | [docs/PREPARATION.md](../docs/PREPARATION.md) |
| Full Markdown (Tunga thread, Pair brief, STAR, labs) | [CANVASES.md](../CANVASES.md) |

**Runnable code** lives in the repo root: `projects/` (DSPy classifier, BM25 RAG API, MCP server, transcript extraction, loan workflow API, rapid brief). Run `python scripts/smoke_test.py` after `pip install -e .`.

**Cursor canvases** (open in IDE beside chat): `canvases/*.canvas.tsx` in this repo, or under `~/.cursor/projects/Users-Zhuanz-ai-automation/canvases/` — see the hub doc for which file is which.

## Quick reference links

- [DSPy](https://dspy.ai/) and [tutorials](https://dspy.ai/tutorials/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [n8n AWS Lambda](https://n8n.io/integrations/aws-lambda/) and [S3](https://n8n.io/integrations/s3/)
- [Zapier on AWS Marketplace](https://zapier.com/blog/zapier-aws-marketplace/)
- [AWS Architecture: Zapier and Lambda at scale](https://aws.amazon.com/blogs/architecture/how-zapier-runs-isolated-tasks-on-aws-lambda-and-upgrades-functions-at-scale/)

## Suggested build order (before interviews)

1. **GitHub Actions OIDC to AWS** plus one Lambda deploy (platform credibility).
2. **DSPy ticket classifier** or **small RAG eval harness** (AI systems credibility).
3. **MCP read-only ops server** or **n8n S3 to Slack** (automation and glue credibility).

Track one metric per project and one thing you would not automate without human approval.
