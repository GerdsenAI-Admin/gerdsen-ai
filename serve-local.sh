#!/bin/bash

# Local development server script for GERDSEN AI website
# This script serves the standalone HTML file for local development

echo "Starting GERDSEN AI local development server..."
echo ""
echo "Using standalone HTML file (no Jekyll required)"
echo ""

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    exit 1
fi

# Kill any existing process on port 4000
if lsof -i :4000 &> /dev/null; then
    echo "Port 4000 is in use. Stopping existing server..."
    kill $(lsof -t -i:4000) 2>/dev/null || true
    sleep 1
fi

echo "Starting server on http://localhost:4000"
echo ""
echo "Serving files from: $(pwd)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
source .venv/bin/activate && python3 -m http.server 4000
