"""Pydantic shapes for qualitative extraction output."""

from __future__ import annotations

from pydantic import BaseModel, Field


class KeyQuote(BaseModel):
    speaker: str
    quote: str
    framework_code: str = Field(description="Code from your research framework")


class InsightReport(BaseModel):
    themes: list[str] = Field(default_factory=list)
    key_quotes: list[KeyQuote] = Field(default_factory=list)
    behavioural_summary: str = ""
    limitations: str = ""
