from __future__ import annotations

import os

from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

app = FastAPI(title="Rapid brief", version="0.1.0")


def use_mock() -> bool:
    if os.environ.get("USE_MOCK_AI", "1").lower() in ("1", "true", "yes"):
        return True
    return not os.environ.get("OPENAI_API_KEY", "").strip()


def mock_brief(goal: str, constraints: str, success: str) -> str:
    return (
        f"Goal: {goal.strip()}\n"
        f"Constraints: {constraints.strip() or 'None stated.'}\n"
        f"Success signals: {success.strip() or 'TBD metrics.'}\n\n"
        "Mock brief: validate with stakeholders, define one-week vertical slice, "
        "and attach a single leading metric before expanding scope."
    )


def dspy_brief(goal: str, constraints: str, success: str) -> str:
    import dspy
    from dspy import InputField, OutputField, Predict, Signature

    class BriefSig(Signature):
        """Write a tight internal executive brief."""

        goal: str = InputField()
        constraints: str = InputField()
        success: str = InputField()
        brief: str = OutputField(desc="Max 180 words, bullet structure")

    lm = dspy.LM("openai/gpt-4o-mini", api_key=os.environ["OPENAI_API_KEY"])
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
    text = mock_brief(goal, constraints, success) if use_mock() else dspy_brief(goal, constraints, success)
    return JSONResponse({"brief": text, "mock": use_mock()})


@app.post("/brief/json")
def brief_json(body: BriefJson) -> dict:
    text = (
        mock_brief(body.goal, body.constraints, body.success_metrics)
        if use_mock()
        else dspy_brief(body.goal, body.constraints, body.success_metrics)
    )
    return {"brief": text, "mock": use_mock()}
