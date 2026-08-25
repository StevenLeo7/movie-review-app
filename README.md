# Movie Review App

A full-stack movie review app — login, search movies via OMDb, and set your own score per movie.

**Stack:** Vue 3 (frontend) · Node.js/Express (backend) · PostgreSQL (database) · Docker Compose

## Prerequisites

Only Docker and Docker Compose. No local Node.js or PostgreSQL needed.

## Run

```bash
git clone https://github.com/StevenLeo7/movie-review-app.git
cd movie-review-app
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend: http://localhost:3000

Stop with `docker compose down`.

## Login

The database is seeded automatically on first start.

| Username | Password |
|---|---|
| `demo` | `mutiaraIndahAnugrah` |

## Project Structure

```
movie-review-app/
├── docker-compose.yml
├── backend/     # Express API, JWT auth, OMDb proxy, Postgres access
└── frontend/    # Vue 3 app (Login, Movie List, Movie Detail)
```
