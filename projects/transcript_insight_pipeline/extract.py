"""Transcript → structured InsightReport via DSPy; strips markdown code fences if the model adds them."""

from __future__ import annotations

import json

import dspy
from dspy import InputField, OutputField, Predict, Signature

from labs_common.openai_env import OPENAI_DSPY_MODEL, require_openai_api_key

from .schema import InsightReport


class ExtractSig(Signature):
    """Model returns JSON as a string; we parse and validate with Pydantic."""

    transcript: str = InputField()
    structured_json: str = OutputField(
        desc=(
            "Valid JSON only, no markdown fences, matching keys: themes (string[]), "
            "key_quotes (array of objects with speaker, quote, framework_code), "
            "behavioural_summary (string), limitations (string)"
        ),
    )


def _parse_llm_json(raw: str) -> dict:
    """Strip optional markdown fences (models often add them) then ``json.loads``."""
    text = raw.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        if lines:
            lines = lines[1:]
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()
    return json.loads(text)


def extract(transcript: str) -> InsightReport:
    """LLM extraction + schema validation. Raises on bad JSON or validation errors."""
    api_key = require_openai_api_key()
    lm = dspy.LM(OPENAI_DSPY_MODEL, api_key=api_key)
    dspy.configure(lm=lm)
    pred = Predict(ExtractSig)
    raw = pred(transcript=transcript).structured_json
    data = _parse_llm_json(raw)
    return InsightReport.model_validate(data)
