"""Support ticket text → category, priority, summary via DSPy (OpenAI). Requires ``OPENAI_API_KEY``."""

from __future__ import annotations

import dspy
from dspy import InputField, OutputField, Predict, Signature

from labs_common.openai_env import OPENAI_DSPY_MODEL, require_openai_api_key


class TicketSig(Signature):
    """Ticket in; structured labels out (enforced via field ``desc`` in prompts)."""

    ticket_text: str = InputField()
    category: str = OutputField(
        desc="Exactly one of: billing, bug, feature, account",
    )
    priority: str = OutputField(desc="Exactly one of: low, medium, high")
    summary: str = OutputField(desc="One-line factual summary")


def classify(ticket_text: str) -> dict[str, str]:
    """Run one ``Predict`` call; strips string fields for stable downstream JSON.

    Raises:
        RuntimeError: Missing ``OPENAI_API_KEY``.
    """
    api_key = require_openai_api_key()
    lm = dspy.LM(OPENAI_DSPY_MODEL, api_key=api_key)
    dspy.configure(lm=lm)
    pred = Predict(TicketSig)
    result = pred(ticket_text=ticket_text)
    return {
        "category": result.category.strip(),
        "priority": result.priority.strip(),
        "summary": result.summary.strip(),
    }
