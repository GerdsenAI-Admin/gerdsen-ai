# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the GERDSEN AI company website - a Jekyll-based static site with advanced Apple-inspired animations and video backgrounds. The site serves as the primary web presence for GERDSEN AI LLC (AI consulting company, founded 2025).

## Development Commands

### Local Development
```bash
# Start local development server (Python HTTP server on port 4000)
./serve-local.sh

# Alternative manual command
python3 -m http.server 4000
```

### Deployment
```bash
# Deploy to GitHub Pages (automated script)
./deploy.sh
```

**Note:** This is a static Jekyll site with no build process - it deploys directly to GitHub Pages from the main branch.

## Architecture & Key Technical Concepts

### Jekyll Structure
- **Layout System**: Single layout in `_layouts/default.html` with Jekyll templating
- **Includes**: Modular components in `_includes/` (navigation.html, footer.html)  
- **Configuration**: Jekyll config in `_config.yml` with SEO plugins
- **Content**: Main page content in `index.html` with Jekyll front matter

### Video-Heavy Design System
This site is built around **video backgrounds with advanced scroll animations**:

- **Hero Video Sequence**: Multi-phase animation system where video starts prominent and clear, then blurs and recedes as user scrolls while text appears
- **Video Sources**: Multiple video files in `assets/images/` with fallback system (Neural_G_5.mp4, hero-video.mp4, etc.)
- **Performance Optimization**: Mobile detection, connection speed detection, intersection observers for lazy loading
- **Accessibility**: Video controls, reduced motion respect, screen reader support

### Advanced Animation System
The site uses sophisticated scroll-based animations implemented in `assets/js/main.js`:

- **Parallax System**: Multi-layer parallax with different speeds and depths
- **Scroll Phases**: Hero animations have distinct phases (initial → scroll begin → transition → background)  
- **3D Transforms**: Extensive use of `translate3d()`, `perspective()`, and `rotateX/Y()` for Apple-style effects
- **Throttled Performance**: All scroll handlers use throttling for 60fps performance

### Apple-Inspired UI Patterns
- **Magnetic Elements**: Buttons that follow cursor movement with 3D rotation
- **Product Rotation**: 360-degree product views with mouse drag interaction
- **Expandable Sections**: Smooth height animations for technical specifications
- **Dynamic Color Transitions**: Sections that change theme based on scroll position

## File Structure

```
/
├── _config.yml              # Jekyll configuration
├── _layouts/default.html    # Main page layout with external CSS/JS
├── _includes/               # Reusable components
│   ├── navigation.html      # Fixed navigation with smooth scroll links
│   └── footer.html          # Company footer with business info
├── index.html               # Main page content (Jekyll front matter + HTML)
├── assets/
│   ├── css/main.css         # Custom Apple-style animations and effects
│   ├── js/main.js           # Advanced scroll animations and video handling
│   └── images/              # Video files and logos
├── serve-local.sh           # Local development server script
└── deploy.sh                # GitHub Pages deployment script
```

## Key Development Guidelines

### Working with Videos
- **Video Paths**: Use Jekyll `relative_url` filter for proper GitHub Pages paths
- **Fallback System**: Always provide multiple video sources with fallback images
- **Mobile Handling**: Different video loading strategy for mobile devices
- **Performance**: Use `IntersectionObserver` for viewport-based loading

### Animation Development
- **Scroll Effects**: All scroll animations use `translate3d()` for hardware acceleration
- **Timing**: Use `cubic-bezier(0.19, 1, 0.22, 1)` for Apple-style easing
- **Throttling**: Scroll handlers must be throttled (10-16ms) for performance
- **Progressive Enhancement**: Effects should degrade gracefully on slower devices

### Content Updates
- **Business Info**: Company details are in `_config.yml` under `company:` section
- **Services**: Service cards are in `index.html` - look for `services-grid` class
- **Technical Specs**: Expandable sections use `expandable-section` class structure

## Testing & Development

### Local Testing
The site runs on a simple Python HTTP server - no Jekyll build required for basic testing. For full Jekyll features (includes, variables), use Jekyll serve locally.

### Video Testing
- Test video loading on different connection speeds
- Verify fallback images work when videos fail
- Check mobile video behavior (autoplay restrictions)
- Test scroll animation performance on various devices

## Deployment Notes

- **GitHub Pages**: Automatic deployment from main branch
- **Custom Domain**: Uses `CNAME` file for gerdsen.ai domain
- **CDN Assets**: Tailwind CSS and Font Awesome loaded from CDN
- **SEO**: Jekyll SEO plugin generates meta tags automatically

## Business Context

GERDSEN AI focuses on full-stack AI solutions, emphasizing local/on-premise deployments for privacy-conscious businesses. The website reflects this with sophisticated technical demonstrations.