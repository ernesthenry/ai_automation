from __future__ import annotations

import json
import os
import re

from .schema import InsightReport, KeyQuote


def use_mock() -> bool:
    if os.environ.get("USE_MOCK_AI", "1").lower() in ("1", "true", "yes"):
        return True
    return not os.environ.get("OPENAI_API_KEY", "").strip()


def mock_extract(transcript: str) -> InsightReport:
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", transcript) if s.strip()]
    quotes: list[KeyQuote] = []
    for i, s in enumerate(sentences[:3]):
        quotes.append(
            KeyQuote(
                speaker="P1" if i % 2 == 0 else "P2",
                quote=s[:220],
                framework_code="HABIT-LOOP" if "always" in s.lower() else "FRICTION",
            )
        )
    themes = []
    low = transcript.lower()
    if "wait" in low or "slow" in low:
        themes.append("Process friction")
    if "trust" in low or "worried" in low:
        themes.append("Trust and risk")
    if not themes:
        themes.append("General motivation")
    return InsightReport(
        themes=themes,
        key_quotes=quotes,
        behavioural_summary="Mock extraction: prioritize validating quotes against the audio or source transcript.",
        limitations="Heuristic mock; no speaker diarization or audio.",
    )


def dspy_extract(transcript: str) -> InsightReport:
    import dspy
    from dspy import InputField, OutputField, Predict, Signature

    class ExtractSig(Signature):
        """Extract structured behavioural research notes from an interview transcript."""

        transcript: str = InputField()
        structured_json: str = OutputField(
            desc='Valid JSON matching keys: themes (string[]), key_quotes (array of {speaker, quote, framework_code}), behavioural_summary (string), limitations (string)',
        )

    lm = dspy.LM("openai/gpt-4o-mini", api_key=os.environ["OPENAI_API_KEY"])
    dspy.configure(lm=lm)
    pred = Predict(ExtractSig)
    raw = pred(transcript=transcript).structured_json
    data = json.loads(raw)
    return InsightReport.model_validate(data)


def extract(transcript: str) -> InsightReport:
    if use_mock():
        return mock_extract(transcript)
    return dspy_extract(transcript)
