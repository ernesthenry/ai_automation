"""CLI: classify each row in ``samples.json`` (requires ``OPENAI_API_KEY``)."""

from __future__ import annotations

import json
import os
from pathlib import Path

from .classifier import classify

SAMPLES = Path(__file__).resolve().parent / "samples.json"


def main() -> None:
    os.environ.setdefault("DSPY_CACHE_DIR", str(Path.cwd() / ".dspy_cache"))
    data = json.loads(SAMPLES.read_text(encoding="utf-8"))
    for row in data:
        out = classify(row["text"])
        print(json.dumps({"id": row["id"], **out}, indent=2))


if __name__ == "__main__":
    main()
