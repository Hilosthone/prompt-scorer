def build_scoring_prompt(user_prompt: str) -> str:
    return f"""You are an expert prompt engineer. Evaluate the following AI prompt and return a JSON object only — no extra text, no markdown, no backticks.

Prompt to evaluate:
\"\"\"{user_prompt}\"\"\"

Score it on these 3 categories (0-100 each):
- clarity: Is the prompt clear and easy to understand?
- specificity: Does it provide enough detail and context?
- structure: Is it well-organized and logically formatted?

Also provide:
- overall_score: weighted average of the 3 scores
- improved_prompt: a rewritten version of the prompt that scores higher

Return ONLY this JSON structure:
{{
  "overall_score": 0,
  "categories": {{
    "clarity": {{ "score": 0, "explanation": "" }},
    "specificity": {{ "score": 0, "explanation": "" }},
    "structure": {{ "score": 0, "explanation": "" }}
  }},
  "improved_prompt": ""
}}"""