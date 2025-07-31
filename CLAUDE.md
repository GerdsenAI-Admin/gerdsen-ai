# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based static website for GERDSEN AI, a Louisiana-based AI consultancy. The site is deployed via GitHub Pages at http://gerdsen.ai and uses Jekyll for static site generation with custom HTML, CSS, and JavaScript for advanced animations and effects.

## Architecture

### Jekyll Structure
- **_config.yml**: Jekyll configuration with site metadata, plugins (jekyll-seo-tag, jekyll-sitemap), and company information
- **_layouts/default.html**: Base template using Tailwind CSS from CDN, Font Awesome icons, and custom CSS/JS
- **_includes/**: Reusable components (navigation, footer, service cards, feature cards)
- **index.html**: Main page with Jekyll front matter and complex video background sections

### Key Technologies
- **Jekyll**: Static site generator with Liquid templating
- **Tailwind CSS**: Utility-first CSS framework (loaded from CDN)
- **Custom CSS**: Apple-inspired animations and glass effects in `/assets/css/main.css`
- **Custom JavaScript**: Advanced scroll effects, video management, and animations in `/assets/js/main.js`
- **Video Backgrounds**: Multiple MP4 files for different sections with fallback handling

### Video System
The site uses an advanced video background system with:
- **Hero video**: Neural_G_5.mp4 with scale and blur effects on scroll
- **Section videos**: Different videos per section (hero-video.mp4, hero-promo.mp4)
- **Fallback handling**: Multiple video sources with static backgrounds for errors
- **Mobile optimization**: Different handling for mobile devices and slow connections
- **Accessibility**: Video controls and screen reader support

## Development Commands

### Local Development
```bash
# Install Jekyll and dependencies
gem install bundler jekyll

# Serve the site locally (if Gemfile exists)
bundle exec jekyll serve

# Or serve directly with Jekyll
jekyll serve

# Access at http://localhost:4000
```

### Deployment
```bash
# Deploy to GitHub Pages using included script
./deploy.sh

# Or manually push to main branch (auto-deploys via GitHub Pages)
git add .
git commit -m "Update website"
git push origin main
```

## File Structure

### Assets
- **CSS**: `/assets/css/main.css` - Custom styles with CSS variables and Apple-inspired effects
- **JavaScript**: `/assets/js/main.js` - Complex scroll animations, video management, and interactive features
- **Images**: `/assets/images/` - Contains MP4 videos, PNG logo, and unused assets folder
- **Videos**: Multiple MP4 files with specific naming for different sections

### Configuration Files
- **_config.yml**: Jekyll configuration with SEO settings and company metadata
- **CNAME**: Domain configuration for gerdsen.ai (site is live at http://gerdsen.ai)
- **deploy.sh**: Deployment script for GitHub Pages setup

### Content Structure
- Single-page application layout with sections: hero, services, tech-stack, about, contact
- Uses Jekyll's Liquid templating for dynamic content insertion
- Heavy use of custom CSS classes and data attributes for animations

## Key Features

### Animation System
- **Scroll-based animations**: Elements fade in and transform based on scroll position
- **Video parallax**: Background videos with scale, blur, and position effects
- **Apple-style effects**: Magnetic buttons, expandable sections, product rotation
- **Performance optimized**: Throttled scroll handlers and intersection observers

### Video Management
- **Multiple fallbacks**: Each video element has multiple source options
- **Error handling**: Graceful degradation with gradient backgrounds
- **Mobile optimization**: Different loading strategies for mobile devices
- **Accessibility**: Custom video controls and screen reader support

### Responsive Design
- Mobile-first approach with Tailwind CSS utilities
- Custom breakpoints and mobile-specific optimizations
- Touch gesture support for galleries and interactive elements

## Development Notes

### Working with Videos
- Videos are loaded and managed by JavaScript in `/assets/js/main.js`
- Path fixing for GitHub Pages deployment is handled automatically
- Video errors are caught and handled with fallback backgrounds
- All videos should have multiple format sources for browser compatibility

### Styling Conventions
- Uses CSS custom properties (variables) extensively
- Apple-inspired glass effects and blur backgrounds
- Consistent spacing using Tailwind's utility classes
- Custom animations with CSS transforms and transitions

### Performance Considerations
- Videos are lazy-loaded using Intersection Observer
- Scroll handlers are throttled for smooth performance
- Connection speed detection for data-saving modes
- Preload hints for critical resources

## Testing

No automated testing framework is configured. Test manually by:
1. Running Jekyll locally and checking all sections
2. Testing video loading and fallbacks
3. Verifying responsive design on mobile devices
4. Checking scroll animations and performance
5. Testing deployment via GitHub Pages at http://gerdsen.ai

## Common Issues

### Video Loading
- If videos don't load, check paths in `fixVideoSources()` function
- Ensure video files are properly committed to the repository
- Check browser console for loading errors

### Jekyll Build
- Ensure all Jekyll dependencies are installed
- Check `_config.yml` for syntax errors
- Verify all includes and layouts exist

### GitHub Pages Deployment
- Site is live at http://gerdsen.ai with DNS properly configured
- Repository must be public for free GitHub Pages
- CNAME file is configured for custom domain