# Office Assistant AI (Prototype)

A modern, offline-first demo web application for training organizations.

## Features
- Sidebar with pages: Dashboard, Documents, Feedback Analysis, AI Assistant, Reports, Settings
- Clean white + green professional UI (`#2E7D32` accents)
- Fake data for documents, batches, trainers, and feedback records
- Mock AI responses for document and feedback questions
- Modular architecture ready for future OCR, vector DB, and local LLM/RAG integration

## Project Structure
- `dashboard/`
- `documents/`
- `feedback/`
- `chatbot/`
- `reports/`
- `settings/`
- `components/`
- `services/`
- `utils/`
- `data/`

## Run Locally
Because this app uses ES modules, run with any static server from repository root.

Example:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Notes
This prototype intentionally uses mock services and sample data only.
