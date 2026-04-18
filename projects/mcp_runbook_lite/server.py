from __future__ import annotations

import json
from datetime import UTC, datetime, timedelta

from mcp.server.fastmcp import FastMCP

mcp = FastMCP(
    "runbook-lite",
    instructions="Read-only mock tools. Safe for demos; no real cloud access.",
)


@mcp.tool()
def list_recent_errors(service: str, limit: int = 5) -> str:
    """List synthetic recent errors for a logical service name."""
    now = datetime.now(tz=UTC)
    lines = []
    for i in range(min(limit, 5)):
        ts = (now - timedelta(minutes=15 * (i + 1))).isoformat()
        lines.append(
            f"{ts} [{service}] ERROR code=50{i} timeout contacting dependency checkout-db",
        )
    return "\n".join(lines)


@mcp.tool()
def get_trace_id(trace_id: str) -> str:
    """Return a canned trace summary for a trace id string."""
    payload = {
        "trace_id": trace_id,
        "spans": [
            {"name": "http ingress", "ms": 3},
            {"name": "auth.validate", "ms": 12},
            {"name": "db.query", "ms": 240},
        ],
        "note": "Synthetic trace for MCP demo.",
    }
    return json.dumps(payload, indent=2)


@mcp.tool()
def link_to_dashboard(service: str) -> str:
    """Return a placeholder dashboard URL for a service."""
    safe = service.replace("/", "-")
    return f"https://example.invalid/dashboards/{safe}"


def main() -> None:
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
