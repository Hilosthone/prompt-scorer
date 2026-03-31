import json
from openai import OpenAI
from config import OPENAI_API_KEY, CHAT_MODEL
from prompt_builder import build_scoring_prompt

client = OpenAI(api_key=OPENAI_API_KEY)


def score_prompt(user_prompt: str) -> dict:
    prompt = build_scoring_prompt(user_prompt)

    response = client.chat.completions.create(
        model=CHAT_MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    raw = response.choices[0].message.content.strip()

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # Strip accidental markdown fences if present
        clean = raw.replace("```json", "").replace("```", "").strip()
        return json.loads(clean)