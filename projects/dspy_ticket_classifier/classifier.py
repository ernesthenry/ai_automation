from __future__ import annotations

import os


def use_mock() -> bool:
    if os.environ.get("USE_MOCK_AI", "1").lower() in ("1", "true", "yes"):
        return True
    return not os.environ.get("OPENAI_API_KEY", "").strip()


def mock_classify(ticket_text: str) -> dict[str, str]:
    t = ticket_text.lower()
    if any(w in t for w in ("down", "crash", "error", "urgent", "cannot")):
        category = "bug"
        priority = "high"
    elif any(w in t for w in ("invoice", "tax", "pay", "billing")):
        category = "billing"
        priority = "medium"
    elif any(w in t for w in ("add", "export", "feature", "could you", "wish")):
        category = "feature"
        priority = "low"
    else:
        category = "account"
        priority = "medium"
    summary = ticket_text.strip().replace("\n", " ")
    if len(summary) > 140:
        summary = summary[:137] + "..."
    return {"category": category, "priority": priority, "summary": summary}


def dspy_classify(ticket_text: str) -> dict[str, str]:
    import dspy
    from dspy import InputField, OutputField, Predict, Signature

    class TicketSig(Signature):
        """Classify a customer support ticket."""

        ticket_text: str = InputField()
        category: str = OutputField(
            desc="Exactly one of: billing, bug, feature, account",
        )
        priority: str = OutputField(desc="Exactly one of: low, medium, high")
        summary: str = OutputField(desc="One-line factual summary")

    lm = dspy.LM("openai/gpt-4o-mini", api_key=os.environ["OPENAI_API_KEY"])
    dspy.configure(lm=lm)
    pred = Predict(TicketSig)
    result = pred(ticket_text=ticket_text)
    return {
        "category": result.category.strip(),
        "priority": result.priority.strip(),
        "summary": result.summary.strip(),
    }


def classify(ticket_text: str) -> dict[str, str]:
    if use_mock():
        return mock_classify(ticket_text)
    return dspy_classify(ticket_text)
