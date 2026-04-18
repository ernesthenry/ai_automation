#!/usr/bin/env python3
"""Run offline checks against mock AI and in-process FastAPI apps."""

from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = ROOT / "projects"
sys.path.insert(0, str(PROJECTS))

os.environ.setdefault("DSPY_CACHE_DIR", str(ROOT / ".dspy_cache"))
os.environ["USE_MOCK_AI"] = "1"


def main() -> None:
    from dspy_ticket_classifier.classifier import classify

    c1 = classify("Production checkout is down since morning.")
    assert c1["category"] == "bug" and c1["priority"] == "high", c1

    from rag_operational_domain.rag_core import OperationalCorpus

    corpus = OperationalCorpus(PROJECTS / "rag_operational_domain")
    rq = corpus.search("irrigation after nitrogen application", top_k=2)
    assert rq["hits"], rq

    from transcript_insight_pipeline.extract import extract

    rep = extract("P1: we waited weeks for IT. P2: I always verify totals twice.")
    assert rep.themes and rep.key_quotes, rep

    from fastapi.testclient import TestClient
    from loan_workflow_mock.app import app as loan_app
    from loan_workflow_mock.models import LoanState

    client = TestClient(loan_app)
    r = client.post("/applications", json={"borrower_name": "Test User", "amount_usd": 5000})
    assert r.status_code == 200, r.text
    aid = r.json()["id"]
    assert client.post(
        f"/applications/{aid}/transition", json={"to": LoanState.SUBMITTED.value}
    ).status_code == 200
    audit = client.get(f"/applications/{aid}/audit")
    assert audit.status_code == 200 and len(audit.json()["events"]) >= 2

    from rapid_brief.app import app as brief_app

    bc = TestClient(brief_app)
    br = bc.post(
        "/brief/json",
        json={"goal": "Ship pilot RAG", "constraints": "Two weeks", "success_metrics": "Five verified answers"},
    )
    assert br.status_code == 200 and "brief" in br.json(), br.text

    print("smoke_test: all checks passed")


if __name__ == "__main__":
    main()
