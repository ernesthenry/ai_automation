"""BM25 index over CSV rows and markdown playbooks (lexical retrieval, no embedding API)."""

from __future__ import annotations

import re
from pathlib import Path

import pandas as pd
from rank_bm25 import BM25Okapi


def tokenize(text: str) -> list[str]:
    """Lowercase alphanumeric tokens; keeps underscores for column-like tokens."""
    return re.findall(r"[A-Za-z0-9_]+", text.lower())


class OperationalCorpus:
    """Loads ``data/orders.csv`` and ``data/playbooks/*.md``, builds ``BM25Okapi``."""

    def __init__(self, root: Path) -> None:
        self._docs: list[str] = []
        self._meta: list[dict] = []
        data = root / "data"

        orders = pd.read_csv(data / "orders.csv")
        for idx, row in orders.iterrows():
            parts = [f"{col}={row[col]}" for col in orders.columns]
            self._docs.append(" ".join(parts))
            self._meta.append(
                {"source": "orders_csv", "row_id": int(idx), "order_id": int(row["order_id"])},
            )

        for path in sorted((data / "playbooks").glob("*.md")):
            body = path.read_text(encoding="utf-8")
            title = path.stem.replace("_", " ")
            self._docs.append(f"playbook_title={title}\n{body}")
            self._meta.append({"source": "playbook_md", "path": str(path.name)})

        self._bm25 = BM25Okapi([tokenize(d) for d in self._docs])

    def search(self, question: str, top_k: int = 5) -> dict:
        scores = self._bm25.get_scores(tokenize(question))
        ranked = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)[:top_k]
        hits = [
            {
                "score": float(score),
                "meta": self._meta[doc_idx],
                "excerpt": self._docs[doc_idx][:400],
            }
            for doc_idx, score in ranked
        ]
        return {"question": question, "hits": hits}
