# EARCRAFT — Developer Setup & Architecture Manual

## Technology Stack Overview
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Redux Toolkit, TanStack Query, React Router v6, Lucide React, Recharts.
- **Backend**: Django 5, DRF, SimpleJWT, Celery, Redis, PostgreSQL 16.
- **Infrastructure**: Docker, Nginx, Gunicorn.

## Local Frontend Development
```bash
cd frontend
npm install
npm run dev
# Frontend dev server starts at http://localhost:3000
```

## Local Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```
