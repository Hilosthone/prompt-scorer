# Prompt Quality Scorer

> Built by [BuilON](https://builon.com) for [JustXend](https://justxend.com)

Paste any AI prompt and get an instant quality score with detailed feedback and an improved version — so you always get the best out of your AI tools.

---

## Live Demo

| Service | URL |
|---|---|
| Backend API | _Coming soon_ |
| Frontend | _Coming soon_ |

---

## What It Does

- Paste any prompt and get scored on 3 categories: Clarity, Specificity, and Structure
- Each category returns a 0–100 score with a clear explanation
- Get an overall score and an AI-rewritten improved version of your prompt instantly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI |
| AI | OpenAI GPT-4o |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Hosting | Render (backend), Vercel (frontend) |

---

## Project Structure
```
prompt-scorer/
├── backend/
│   ├── main.py              # API routes
│   ├── scorer.py            # Calls GPT-4o to evaluate the prompt
│   ├── prompt_builder.py    # Builds the scoring instruction prompt
│   └── config.py            # Environment config
├── frontend/                # Next.js app
├── render.yaml              # Render deployment config
├── requirements.txt
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/score` | Score a prompt and return feedback + improved version |

### Example Request
```json
POST /score
{
  "prompt": "Write something about marketing"
}
```

### Example Response
```json
{
  "overall_score": 42,
  "categories": {
    "clarity": { "score": 50, "explanation": "The request is vague with no defined output format." },
    "specificity": { "score": 30, "explanation": "No target audience, platform, or tone specified." },
    "structure": { "score": 45, "explanation": "Single sentence with no context or constraints." }
  },
  "improved_prompt": "Write a 300-word LinkedIn post targeting small business owners about how content marketing builds trust. Use a professional yet approachable tone with a call to action at the end."
}
```

---

## Running Locally
```bash
# Clone the repo
git clone https://github.com/PerceptronCipher/prompt-scorer.git
cd prompt-scorer

# Set up backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Run backend (OPENAI_API_KEY must be set in your shell)
cd backend
uvicorn main:app --reload

# Run frontend
cd frontend
npm install
npm run dev
```

---

## Scoring Categories

| Category | What it measures |
|---|---|
| Clarity | Is the prompt clear and easy to understand? |
| Specificity | Does it provide enough detail and context? |
| Structure | Is it well-organized and logically formatted? |

---

## License

MIT © 2025 BuilON