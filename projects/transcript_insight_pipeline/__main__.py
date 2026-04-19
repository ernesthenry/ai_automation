"""CLI: run extraction on ``samples/sample.txt``."""

from __future__ import annotations

import os
from pathlib import Path

from .extract import extract

SAMPLE = Path(__file__).resolve().parent / "samples" / "sample.txt"


def main() -> None:
    os.environ.setdefault("DSPY_CACHE_DIR", str(Path.cwd() / ".dspy_cache"))
    text = SAMPLE.read_text(encoding="utf-8")
    print(extract(text).model_dump_json(indent=2))


if __name__ == "__main__":
    main()
