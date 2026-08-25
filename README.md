# Movie Review App

Login, search movies via OMDb, and set your own score per movie.

Stack: Vue 3, Node/Express, PostgreSQL, Docker Compose.

## Run

Needs Docker + Docker Compose, nothing else.

```bash
git clone https://github.com/StevenLeo7/movie-review-app.git
cd movie-review-app
cp backend/.env.example backend/.env
```

Fill in `backend/.env`:
- `JWT_SECRET` — any random string
- `OMDB_API_KEY` — get one free at omdbapi.com
- `DATABASE_URL` — leave as-is for local Docker

Then:

```bash
docker compose up --build
```

Frontend: http://localhost:8080
Backend: http://localhost:3000

`docker compose down` to stop.

## Login

DB is seeded on first start.

| Username | Password |
|---|---|
| demo | mutiaraIndahAnugrah |

## Structure

```
movie-review-app/
├── docker-compose.yml
├── backend/     # Express API, JWT auth, OMDb proxy, Postgres
└── frontend/    # Vue 3 app
```