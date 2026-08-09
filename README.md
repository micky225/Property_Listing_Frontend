# Property Finds

Monorepo with separately deployable frontend and backend.

```
property-listing-website/
├── app/, components/, lib/, public/   # Next.js (Vercel) — repo root
└── poperty-backend/                   # Django (Render) — also its own git repo
```

## Frontend (local)

```bash
cp .env.example .env.local
npm install
npm run dev
```

Env: `NEXT_PUBLIC_API_URL=https://poperty-listing-backend.onrender.com/api`

### Vercel

1. **Root Directory:** leave **empty** (Next.js is at the repo root)
2. Env: `NEXT_PUBLIC_API_URL=https://poperty-listing-backend.onrender.com/api`

Deployed: https://property-listing-zeta-lime.vercel.app

## Backend (local)

```bash
cd poperty-backend
source .env/bin/activate   # or python3 -m venv .env && pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 0.0.0.0:8000
```

### Render

Deployed: https://poperty-listing-backend.onrender.com

1. Root Directory: repo root of the backend service (`poperty-backend`)
2. Build: `pip install -r requirements.txt`
3. Start: `bash start.sh`  (migrates, seeds if empty, then gunicorn)
4. Env (example in `poperty-backend/.env.example`):
   - `DJANGO_SECRET_KEY`
   - `DJANGO_DEBUG=false`
   - `DJANGO_ALLOWED_HOSTS=poperty-listing-backend.onrender.com`
   - `CORS_ALLOW_ALL_ORIGINS=false`
   - `CORS_ALLOWED_ORIGINS=https://property-listing-zeta-lime.vercel.app,http://localhost:3000`
   - `CSRF_TRUSTED_ORIGINS=https://property-listing-zeta-lime.vercel.app,https://poperty-listing-backend.onrender.com`

**Note:** If you set `CORS_ALLOWED_ORIGINS` on Render, it overrides the defaults in `settings.py` — keep the Vercel URL in that env value.
