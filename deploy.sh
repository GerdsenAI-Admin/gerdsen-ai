#!/bin/bash
# Script to push website folder to GitHub

# Navigate to the website directory
cd "/Users/gerdsenai/Documents/__Gerdsen AI LLC/gerdsen-ai-website"

# Initialize git in this folder
git init

# Add all files
git add .

# Commit the website
git commit -m "Add GERDSEN AI website with professional design and logo"

# Add your GitHub repository as remote
git remote add origin https://github.com/GerdsenAI-Admin/gerdsen-ai.git

# Push to main branch
git push -u origin main

echo "Website pushed successfully!"
echo "Next steps:"
echo "1. Go to https://github.com/GerdsenAI-Admin/gerdsen-ai/settings/pages"
echo "2. Enable GitHub Pages from main branch"
echo "3. Add custom domain: gerdsen.ai"