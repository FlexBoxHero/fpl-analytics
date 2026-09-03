#!/usr/bin/env bash
# Start the full stack via Docker Compose.
# Usage: ./scripts/start.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Missing .env — copy .env.example to .env first."
  exit 1
fi

docker compose up --build -d
echo "Stack started. Frontend: http://localhost:${FRONTEND_PORT:-4200}  Backend: http://localhost:${BACKEND_PORT:-8000}"
