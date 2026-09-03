#!/usr/bin/env bash
# Stop the full stack.
# Usage: ./scripts/stop.sh

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

docker compose down
echo "Stack stopped."
