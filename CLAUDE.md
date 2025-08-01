# CLAUDE.md

This file provides context to Claude (claude.ai) when working with code in this repository.

## Project Overview

This is the GERDSEN AI company website - a modern, high-performance static site featuring advanced animations and visual effects. The site serves as the primary web presence for GERDSEN AI LLC, a Louisiana-based AI consulting company (EIN: 39-3468580, founded 2025).

## Key Features

- **Neural Network Video Background** - Immersive AI-themed hero section
- **Responsive Gradient Animation** - Performant conic gradient using vmin units
- **Glass Morphism Design** - Modern frosted glass UI elements
- **Comprehensive Testing Suite** - Multiple tools for responsive and performance testing
- **60fps Animations** - Optimized for smooth performance across all devices

## Development Commands

### Local Development
```bash
# Start local development server (Python 3)
./start-server.sh

# Alternative manual command
python3 -m http.server 8000

# Server runs at: http://localhost:8000
```

## Architecture & Technical Implementation

### Core Technologies
- **HTML5** with semantic markup
- **CSS3** with modern features (Grid, Custom Properties, clamp())
- **Vanilla JavaScript** - No framework dependencies
- **MP4 Video** - Hardware-accelerated background
- **Static Hosting** - GitHub Pages compatible

### Responsive Gradient Solution
The site features an innovative gradient animation that scales perfectly using vmin units:

```css
.animation-container {
    width: 80vmin;
    height: 80vmin;
    max-width: 600px;
    max-height: 600px;
    display: grid;
    place-items: center;
}
```

This approach:
- Eliminates complex calculations
- Works on all viewports automatically
- Uses only 2 media queries (vs. 10+ in traditional approaches)
- Maintains 60fps performance

### Performance Optimizations
- `will-change: transform` for smooth animations
- Blur effects on pseudo-elements only
- Intersection Observer for lazy loading
- Throttled scroll handlers
- Respects `prefers-reduced-motion`

### Testing Tools Suite

The project includes comprehensive testing tools:

1. **gradient-responsive-tester.html** - Advanced gradient testing
2. **responsive-tester.html** - General responsive testing
3. **gradient-test-results.html** - Automated test report
4. **gradient-comparison.html** - Old vs new comparison
5. **gradient-fix-demo.html** - Visual demonstration

## File Structure

```
├── index.html                    # Main website
├── index-with-gradient.html      # Version with gradient
├── assets/
│   ├── css/
│   │   ├── main.css             # Core styles
│   │   └── gradient-animation-fix.css
│   ├── js/
│   │   └── main.js              # Site functionality
│   └── images/
│       └── Neural_G_5.mp4       # Background video
├── Testing Tools/               # All testing HTML files
└── Documentation/               # MD files for guides
```

## When Working on This Project

### CSS Guidelines
- Use CSS variables for consistency
- Follow mobile-first approach
- Maintain 60fps animations
- Test with the responsive tools

### JavaScript Guidelines
- Keep animations performant
- Use modern ES6+ features
- Handle errors gracefully
- Debounce/throttle expensive operations

### Testing Requirements
- Test all viewports using gradient-responsive-tester.html
- Ensure no overflow issues
- Verify 60fps performance
- Check cross-browser compatibility

### Common Tasks

**Adding new sections**: Use existing `content-section` class structure

**Modifying gradient**: Edit `gradient-animation-fix.css`

**Testing changes**: Always use the testing tools before committing

**Performance checks**: Use Chrome DevTools Performance tab

## Important Context

- The gradient animation uses `vmin` units for natural scaling
- The site is optimized for modern browsers (no IE support)
- All animations should maintain 60fps
- The testing tools are essential for QA
- Documentation is comprehensive - refer to TESTING_GUIDE.md

## Quick Links

- Local site: http://localhost:8000
- Gradient tester: http://localhost:8000/gradient-responsive-tester.html
- Documentation: See README.md, TESTING_GUIDE.md, DEVELOPMENT_GUIDE.md

When in doubt, use the testing tools to verify any changes!