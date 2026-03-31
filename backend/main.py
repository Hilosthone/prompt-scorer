from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scorer import score_prompt

app = FastAPI(title="Prompt Quality Scorer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ScoreRequest(BaseModel):
    prompt: str


@app.post("/score")
def score(req: ScoreRequest):
    if not req.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty.")
    if len(req.prompt) > 5000:
        raise HTTPException(status_code=400, detail="Prompt too long. Max 5000 characters.")

    result = score_prompt(req.prompt)
    return result