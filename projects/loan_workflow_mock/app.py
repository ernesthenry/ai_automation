"""Loan application API: state machine + append-only audit. Data is in-memory only (package name ``loan_workflow_mock``)."""

from __future__ import annotations

import uuid
from datetime import UTC, datetime

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .models import ALLOWED, LoanState

app = FastAPI(title="Loan workflow (in-memory)", version="0.1.0")

_ERR_UNKNOWN_APP = "Unknown application"

_STORE: dict[str, dict] = {}
_AUDIT: list[dict] = []


def _audit(application_id: str, event: str, detail: dict) -> None:
    _AUDIT.append(
        {
            "id": str(uuid.uuid4()),
            "ts": datetime.now(tz=UTC).isoformat(),
            "application_id": application_id,
            "event": event,
            "detail": detail,
        },
    )


class CreateApplication(BaseModel):
    borrower_name: str = Field(min_length=1, max_length=120)
    amount_usd: int = Field(ge=100, le=500_000)


class TransitionBody(BaseModel):
    to: LoanState


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/applications")
def create_application(body: CreateApplication) -> dict:
    app_id = str(uuid.uuid4())
    _STORE[app_id] = {
        "id": app_id,
        "borrower_name": body.borrower_name,
        "amount_usd": body.amount_usd,
        "state": LoanState.DRAFT,
    }
    _audit(app_id, "CREATED", {"borrower_name": body.borrower_name, "amount_usd": body.amount_usd})
    return _STORE[app_id]


@app.post("/applications/{application_id}/transition")
def transition(application_id: str, body: TransitionBody) -> dict:
    if application_id not in _STORE:
        raise HTTPException(status_code=404, detail=_ERR_UNKNOWN_APP)
    current = LoanState(_STORE[application_id]["state"])
    target = body.to
    if target not in ALLOWED[current]:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot move from {current} to {target}. Allowed: {ALLOWED[current]}",
        )
    _STORE[application_id]["state"] = target
    _audit(application_id, "TRANSITION", {"from": current, "to": target})
    return _STORE[application_id]


@app.get("/applications/{application_id}")
def get_application(application_id: str) -> dict:
    if application_id not in _STORE:
        raise HTTPException(status_code=404, detail=_ERR_UNKNOWN_APP)
    return _STORE[application_id]


@app.get("/applications/{application_id}/audit")
def get_audit(application_id: str) -> dict:
    if application_id not in _STORE:
        raise HTTPException(status_code=404, detail=_ERR_UNKNOWN_APP)
    rows = [r for r in _AUDIT if r["application_id"] == application_id]
    return {"application_id": application_id, "events": rows}
