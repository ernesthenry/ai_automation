from __future__ import annotations

from pydantic import BaseModel, Field


class KeyQuote(BaseModel):
    speaker: str = Field(description="Speaker label such as P1 or Facilitator")
    quote: str
    framework_code: str = Field(
        description="Short code aligning to your framework, e.g. TRUST-BARRIER",
    )


class InsightReport(BaseModel):
    themes: list[str] = Field(default_factory=list)
    key_quotes: list[KeyQuote] = Field(default_factory=list)
    behavioural_summary: str = ""
    limitations: str = Field(
        default="",
        description="What the model cannot infer from text alone",
    )
