#!/bin/bash

cd "$(dirname "$0")"

echo "Starting Frontend..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start dev server
npm run dev