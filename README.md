# GERDSEN AI Website Deployment Guide

## Quick Setup for GitHub Pages

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Name it: `gerdsen-ai` or `gerdsen-ai-website`
3. Make it PUBLIC (required for free GitHub Pages)
4. Don't initialize with README

### 2. Push Website to GitHub
```bash
cd "/Users/gerdsenai/Documents/__Gerdsen AI LLC/gerdsen-ai-website"
git init
git add .
git commit -m "Initial website for GERDSEN AI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gerdsen-ai.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repo → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Click Save

### 4. Configure Custom Domain (gerdsen.ai)
1. In GitHub Pages settings, add custom domain: `gerdsen.ai`
2. Check "Enforce HTTPS"

### 5. Configure DNS (at your domain registrar)
Add these DNS records:

**Option A - Using APEX domain (gerdsen.ai):**
```
Type: A
Name: @
Value: 185.199.108.153
---
Type: A
Name: @
Value: 185.199.109.153
---
Type: A
Name: @
Value: 185.199.110.153
---
Type: A
Name: @
Value: 185.199.111.153
```

**Option B - Using www subdomain:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
```

### 6. Add CNAME file to repo
Create a file named `CNAME` (no extension) with:
```
gerdsen.ai
```

### 7. Wait for DNS Propagation
- DNS changes can take 24-48 hours
- GitHub will show a green checkmark when ready
- Your site will be live at https://gerdsen.ai

## Website Features
- ✅ Professional design with Tailwind CSS
- ✅ Mobile responsive
- ✅ Clear value proposition
- ✅ Services showcase
- ✅ Contact information
- ✅ Louisiana business credentials
- ✅ Privacy-focused messaging

## For GitHub for Startups Application
Once live, you can use `https://gerdsen.ai` as your company website!

## Need Changes?
Edit `index.html` and push to GitHub - changes deploy automatically.