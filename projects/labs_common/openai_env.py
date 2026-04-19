"""Shared OpenAI key check and default DSPy model id for all labs."""

from __future__ import annotations

import os

OPENAI_DSPY_MODEL = "openai/gpt-4o-mini"


def require_openai_api_key() -> str:
    """Return ``OPENAI_API_KEY`` or raise with setup instructions (fail before any API call)."""
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set or is empty. "
            "Export it (e.g. export OPENAI_API_KEY=sk-...) or inject via your secret manager."
        )
    return key
