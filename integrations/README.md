# n8n, Zapier, and Make

These labs expose plain HTTP endpoints you can call from automation tools.

| Service | Port (default) | Endpoint | Method |
|---------|----------------|----------|--------|
| RAG | 8010 | `/query` | POST JSON `{"question":"...","top_k":5}` |
| Loan workflow | 8011 | `/applications` | POST JSON `{"borrower_name":"...","amount_usd":5000}` |
| Loan workflow | 8011 | `/applications/{id}/transition` | POST JSON `{"to":"SUBMITTED"}` |
| Rapid brief | 8012 | `/brief/json` | POST JSON `{"goal":"...","constraints":"","success_metrics":""}` |

## n8n

1. Start the API from repo root: `PYTHONPATH=projects python -m rag_operational_domain` (or loan / rapid_brief).
2. In n8n, add an **HTTP Request** node pointing at `http://host.docker.internal:8010/query` (Docker Desktop on Mac/Win) or your LAN IP from a remote n8n install.
3. Chain **Set** nodes to map JSON fields into Slack, email, or **AWS Lambda** nodes using the official n8n integrations.

## Zapier

Use **Webhooks by Zapier** (catch hook) or **POST** action to `http://.../brief/json` with a raw JSON body. For anything that needs secrets or multi-step AWS writes, forward to **API Gateway + Lambda** instead of growing the Zap.

## Security

Do not expose these dev servers to the public internet without authentication, rate limits, and HTTPS termination.
