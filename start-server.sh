#!/bin/bash

# Simple Python HTTP Server for testing
echo "Starting local server for GerdsenAI website..."
echo "Opening http://localhost:8000"
echo "Press Ctrl+C to stop the server"

cd /Volumes/gerdsenai/Documents/GerdsenAI_Website/gerdsen-ai

# Try Python 3 first, fall back to Python 2
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
else
    echo "Python is not installed. Please install Python to run the server."
    exit 1
fi