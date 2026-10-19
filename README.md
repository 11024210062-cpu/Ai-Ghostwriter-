 AI Ghostwriter for WhatsApp 👻
A web app that reads your WhatsApp chat history and generates reply suggestions that sound like you — built with React, FastAPI, and Google Gemini AI.

🔗 **Live Demo:** https://ai-ghostwriter-omega.vercel.app

What it does

Most of us have a distinct texting style — the words we use, how long our messages are, whether we use exclamation marks or not. This app picks up on those patterns and uses AI to suggest replies that feel natural and personal.

Upload a WhatsApp chat export, type in a message you received, and get a reply suggestion in your own style

Features

- Upload WhatsApp `.txt` chat exports
- Parses and analyzes your messages automatically
- Builds a style profile based on your vocabulary and tone
- Generates reply suggestions using Google Gemini AI
- Dashboard showing your chat stats
- Copy reply with one click
- Your data stays local — nothing is sent automatically

## Tech Stack

- **Frontend** — React.js, Tailwind CSS, React Router
- **Backend** — FastAPI, Python
- **Database** — PostgreSQL
- **AI** — Google Gemini API
- **Deployed on** — Vercel

Getting Started

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Environment Variables** — create a `.env` file in `/backend`:
