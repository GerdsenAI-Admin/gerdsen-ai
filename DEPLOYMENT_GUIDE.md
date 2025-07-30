# GERDSEN AI Website Deployment Commands

## First, make sure your logo.png is saved in the website folder!

## Then run these commands in your terminal:

```bash
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
```

## If you get an error about existing content, try:

```bash
# Force push (only if you're sure!)
git push -u origin main --force
```

## Or if you want to push to a different branch:

```bash
# Create and push to gh-pages branch
git checkout -b gh-pages
git push -u origin gh-pages
```

## After pushing, configure GitHub Pages:

1. Go to: https://github.com/GerdsenAI-Admin/gerdsen-ai/settings/pages
2. Source: Deploy from a branch
3. Branch: main (or gh-pages if you used that)
4. Folder: / (root)
5. Add custom domain: gerdsen.ai

## Configure DNS at your domain registrar:

Add these A records for gerdsen.ai:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

## Check deployment status:

Your site will be available at:
- https://gerdsenai-admin.github.io/gerdsen-ai/ (immediately)
- https://gerdsen.ai (after DNS propagation, 24-48 hours)