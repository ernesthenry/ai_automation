from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI
from pydantic import BaseModel, Field

from .rag_core import OperationalCorpus

ROOT = Path(__file__).resolve().parent
corpus = OperationalCorpus(ROOT)

app = FastAPI(title="Operational + domain RAG (BM25)", version="0.1.0")


class QueryBody(BaseModel):
    question: str = Field(min_length=3)
    top_k: int = Field(default=5, ge=1, le=20)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/query")
def query(body: QueryBody) -> dict:
    return corpus.search(body.question, body.top_k)
