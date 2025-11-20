#!/bin/bash

# Export environment variables from .env
set -a
source .env
set +a

# Function to kill background processes on exit
cleanup() {
    echo "Stopping services..."
    kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

echo "Starting BolsaV3 locally..."

# Check if postgres is running (optional, assumes local postgres or docker db)
# echo "Ensure your database is running!"

# Start Backend
echo "Starting Backend..."
cd backend
# Check if venv exists, if not warn
if [ ! -d "venv" ] && [ ! -d ".venv" ]; then
    echo "WARNING: No virtual environment found in backend/. You might need to create one and install requirements."
fi
# Run migrations
echo "Running migrations..."
export POSTGRES_SERVER=localhost
export REDIS_SERVER=localhost
alembic upgrade head
# Start API
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Services started. Press Ctrl+C to stop."
wait $BACKEND_PID $FRONTEND_PID
