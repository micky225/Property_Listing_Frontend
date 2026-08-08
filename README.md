# Property Finds

Monorepo with separately deployable **frontend** and **backend**.

```
property-listing-website/
├── frontend/     # Next.js → deploy this folder alone
└── backend/      # Django → deploy this folder alone
    ├── manage.py
    ├── requirements.txt
    ├── media/
    ├── db.sqlite3
    └── backend/  # Django project package (settings, urls, app)
```

## Local development

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 0.0.0.0:8000
```

- API: http://127.0.0.1:8000/api/
- Admin: http://127.0.0.1:8000/admin/

You can also reuse the repo-root `.env` venv if you already created one:
`source ../.env/bin/activate` from `backend/`.

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

- Site: http://localhost:3000
- `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api`

## Deploy separately

### Frontend (e.g. Vercel)

1. Root Directory: `frontend`
2. Env: `NEXT_PUBLIC_API_URL=https://YOUR-API-HOST/api`

### Backend (e.g. Render / Railway / VPS)

1. Root Directory: `backend`
2. Install: `pip install -r requirements.txt`
3. Start: `gunicorn backend.wsgi:application`
4. Env: `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOW_ALL_ORIGINS=false`, `CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-HOST`
