# FPL Analytics

A monorepo for Fantasy Premier League analytics — Angular frontend, FastAPI backend, and PostgreSQL database.

## Project structure

```
fpl-analytics/
├── frontend/          # Angular 18+ standalone app (Phase 03)
├── backend/           # FastAPI Python app (Phase 04)
├── data/              # ETL pipelines and raw training data
│   ├── pipelines/
│   └── raw/
├── postgres/          # Database migrations and seed data
│   ├── migrations/
│   └── seeds/
├── docker/            # Dockerfiles per service
├── scripts/           # Dev helper scripts (start, stop, seed)
├── docker-compose.yml # Full stack orchestration (Phase 05)
├── .env.example       # Environment variable template
└── README.md
```

## Prerequisites

- Node.js 20 LTS
- Python 3.12+
- Docker Desktop
- Angular CLI 18+

See `Instructions/phase-00-install-everything.md` for full setup.

## Getting started

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Follow the phase guides in order:
   - Phase 03 — scaffold the Angular frontend
   - Phase 04 — scaffold the FastAPI backend
   - Phase 05 — run the full stack with Docker Compose

## Environment variables

All configuration lives in `.env` (never committed). See `.env.example` for required variables:

| Variable | Description |
|---|---|
| `POSTGRES_*` | PostgreSQL connection settings |
| `BACKEND_PORT` | FastAPI server port (default 8000) |
| `SECRET_KEY` | Backend signing key |
| `FRONTEND_PORT` | Angular dev server port (default 4200) |
| `FPL_API_BASE_URL` | Official FPL API base URL |

## Development

```bash
# Start all services (after Phase 05)
./scripts/start.sh

# Stop all services
./scripts/stop.sh

# Seed the database (after schema is in place)
./scripts/seed.sh
```

## License

Private — not for public distribution.
