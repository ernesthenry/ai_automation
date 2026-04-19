"""FastAPI: HTML or JSON in → executive brief via DSPy + OpenAI."""

from __future__ import annotations

import dspy
from dspy import InputField, OutputField, Predict, Signature
from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

from labs_common.openai_env import OPENAI_DSPY_MODEL, require_openai_api_key

app = FastAPI(title="Rapid brief", version="0.1.0")


class BriefSig(Signature):
    goal: str = InputField()
    constraints: str = InputField()
    success: str = InputField()
    brief: str = OutputField(desc="Max 180 words, bullet structure")


def _generate_brief(goal: str, constraints: str, success: str) -> str:
    """Single place that configures DSPy and runs the brief module (shared by both routes)."""
    api_key = require_openai_api_key()
    lm = dspy.LM(OPENAI_DSPY_MODEL, api_key=api_key)
    dspy.configure(lm=lm)
    pred = Predict(BriefSig)
    return pred(goal=goal, constraints=constraints, success=success).brief


class BriefJson(BaseModel):
    goal: str = Field(min_length=3)
    constraints: str = ""
    success_metrics: str = ""


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/", response_class=HTMLResponse)
def form() -> str:
    return """<!doctype html>
<html><head><meta charset="utf-8"><title>Rapid brief</title></head>
<body>
<h1>Rapid brief</h1>
<form method="post" action="/brief">
  <label>Goal<br><textarea name="goal" rows="4" cols="60" required></textarea></label><br><br>
  <label>Constraints<br><textarea name="constraints" rows="3" cols="60"></textarea></label><br><br>
  <label>Success metrics<br><textarea name="success" rows="3" cols="60"></textarea></label><br><br>
  <button type="submit">Generate</button>
</form>
</body></html>"""


@app.post("/brief")
def brief_form(
    goal: str = Form(...),
    constraints: str = Form(""),
    success: str = Form(""),
) -> JSONResponse:
    text = _generate_brief(goal, constraints, success)
    return JSONResponse({"brief": text, "model": OPENAI_DSPY_MODEL})


@app.post("/brief/json")
def brief_json(body: BriefJson) -> dict:
    text = _generate_brief(body.goal, body.constraints, body.success_metrics)
    return {"brief": text, "model": OPENAI_DSPY_MODEL}
