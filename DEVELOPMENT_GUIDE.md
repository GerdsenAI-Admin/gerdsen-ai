# 🛠️ Development Guide

This guide covers local development setup, workflow, and best practices for the GERDSEN AI website.

## 📁 Project Structure

```
gerdsen-ai/
├── 📄 Core Files
│   ├── index.html                    # Main website
│   ├── index-with-gradient.html      # Version with gradient animation
│   └── CNAME                         # GitHub Pages domain config
│
├── 📁 assets/
│   ├── css/
│   │   ├── main.css                  # Primary styles (2000+ lines)
│   │   ├── gradient-animation-fix.css # Gradient animation (50 lines)
│   │   └── main-with-gradient.css    # Combined version
│   ├── js/
│   │   └── main.js                   # Site functionality
│   └── images/
│       ├── Neural_G_5.mp4            # Hero background video
│       └── gerdsen-ai-logo.png       # Site logo
│
├── 🧪 Testing Tools/
│   ├── gradient-responsive-tester.html    # Advanced gradient tester
│   ├── responsive-tester.html             # General responsive tester
│   ├── gradient-test-results.html         # Automated test results
│   ├── gradient-comparison.html           # Old vs new comparison
│   ├── gradient-fix-demo.html             # Visual demonstration
│   └── test-states.html                   # UI state testing
│
├── 📚 Documentation/
│   ├── README.md                          # Project overview
│   ├── TESTING_GUIDE.md                   # Comprehensive testing guide
│   ├── GRADIENT_FIX_IMPLEMENTATION.md     # Gradient implementation
│   ├── GRADIENT_TEST_RESULTS.md           # Test results summary
│   └── DEPLOYMENT_GUIDE.md                # GitHub Pages deployment
│
├── 🔧 Scripts/
│   ├── start-server.sh                    # Local dev server
│   └── serve-local.sh                     # Alternative server script
│
└── 📁 docs-archive/                       # Deprecated documentation
```

## 🚀 Local Development Setup

### Prerequisites
- Python 3.x (for local server)
- Modern web browser (Chrome recommended for DevTools)
- Text editor (VS Code, Sublime, etc.)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/GerdsenAI-Admin/gerdsen-ai.git
   cd gerdsen-ai
   ```

2. **Start the development server**
   ```bash
   ./start-server.sh
   ```
   
   Or manually:
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   - Main site: http://localhost:8000
   - Testing tools: http://localhost:8000/gradient-responsive-tester.html

## 💻 Development Workflow

### Making Changes

1. **CSS Modifications**
   - Main styles: Edit `assets/css/main.css`
   - Gradient only: Edit `assets/css/gradient-animation-fix.css`
   - Use CSS variables for consistency

2. **HTML Updates**
   - Edit `index.html` for main site
   - Keep `index-with-gradient.html` in sync
   - Update meta tags for SEO

3. **JavaScript Changes**
   - All functionality in `assets/js/main.js`
   - Use ES6+ features
   - Keep animations at 60fps

### Testing Your Changes

1. **Responsive Testing**
   ```bash
   # Open the responsive tester
   http://localhost:8000/gradient-responsive-tester.html
   ```
   - Test all viewport sizes
   - Check for overflow issues
   - Verify animations perform well

2. **Cross-Browser Testing**
   - Chrome: Primary development browser
   - Firefox: Check for compatibility
   - Safari: Test blur effects and animations
   - Mobile: Use device emulation

3. **Performance Testing**
   - Open Chrome DevTools
   - Run Performance profiler
   - Check for 60fps animations
   - Monitor memory usage

## 🎨 Design System

### Colors
```css
--bg-primary: #0a0a1a;        /* Dark background */
--bg-dark: #000000;           /* Pure black */
--text-primary: #ffffff;      /* White text */
--blue-accent: #007AFF;       /* Apple blue */
--gradient-start: #00ff88;    /* Green */
--gradient-mid: #ff8800;      /* Orange */
--gradient-end: #8800ff;      /* Purple */
```

### Typography
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
font-family: 'SF Mono', monospace; /* For code/tech elements */
```

### Spacing
- Use `rem` units for consistency
- Base: 1rem = 16px
- Common spacings: 0.5rem, 1rem, 2rem, 4rem

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 768px) { }   /* Tablet */
@media (min-width: 1024px) { }  /* Desktop */
@media (min-width: 1920px) { }  /* Large screens */
@media (min-width: 2560px) { }  /* Ultrawide */
```

## 🔧 Common Development Tasks

### Adding a New Section

1. Add HTML structure in `index.html`:
   ```html
   <section id="new-section" class="content-section">
       <div class="section-content">
           <h2 class="section-title">New Section</h2>
           <!-- Content here -->
       </div>
   </section>
   ```

2. Style in `main.css`:
   ```css
   #new-section {
       /* Section-specific styles */
   }
   ```

3. Add scroll animations if needed:
   ```javascript
   // In main.js
   observeElement('#new-section .section-title');
   ```

### Modifying the Gradient Animation

Edit `assets/css/gradient-animation-fix.css`:

```css
/* Change size */
.animation-container {
    width: 70vmin;  /* Smaller */
}

/* Change colors */
.gradient-shape {
    background: conic-gradient(
        from 0deg,
        #yourcolor1,
        #yourcolor2,
        #yourcolor3,
        #yourcolor1
    );
}

/* Change speed */
.gradient-shape {
    animation: rotate 30s linear infinite; /* Slower */
}
```

### Optimizing Performance

1. **Images**
   - Use WebP format when possible
   - Lazy load below-fold images
   - Optimize with online tools

2. **Videos**
   - Keep under 10MB
   - Use MP4 with H.264 codec
   - Consider poster image for loading

3. **CSS**
   - Minimize use of `blur()` filters
   - Use `will-change` sparingly
   - Avoid animating layout properties

4. **JavaScript**
   - Debounce scroll events
   - Use Intersection Observer
   - Minimize DOM manipulation

## 🐛 Debugging Tips

### Console Commands

```javascript
// Check gradient animation dimensions
document.querySelector('.animation-container').getBoundingClientRect()

// Monitor FPS
chrome.devtools.fps.start()

// Check for layout shifts
new PerformanceObserver((list) => {
    console.log(list.getEntries());
}).observe({entryTypes: ['layout-shift']});
```

### Common Issues

1. **Gradient Overflow**
   - Add `overflow: hidden` to parent
   - Check max-width constraints

2. **Poor Mobile Performance**
   - Reduce blur effects
   - Simplify animations
   - Check video file size

3. **Layout Shifts**
   - Set explicit dimensions
   - Use aspect-ratio CSS
   - Preload critical resources

## 📝 Code Style Guidelines

### HTML
- Use semantic elements
- Include ARIA labels
- Keep nesting minimal
- Comment major sections

### CSS
- Use CSS variables for repeated values
- Follow mobile-first approach
- Group related properties
- Comment complex calculations

### JavaScript
- Use const/let, not var
- Prefer arrow functions
- Handle errors gracefully
- Comment complex logic

## 🚀 Pre-Deployment Checklist

Before pushing changes:

- [ ] Test all viewport sizes in responsive tester
- [ ] Run Lighthouse audit (scores > 90)
- [ ] Check for console errors
- [ ] Verify animations run at 60fps
- [ ] Test on actual mobile device
- [ ] Update documentation if needed
- [ ] Commit with descriptive message

## 📚 Additional Resources

### Internal Documentation
- [Testing Guide](TESTING_GUIDE.md) - Comprehensive testing procedures
- [Gradient Implementation](GRADIENT_FIX_IMPLEMENTATION.md) - Gradient animation details
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - GitHub Pages deployment

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [CSS Tricks](https://css-tricks.com/) - CSS techniques
- [Web.dev](https://web.dev/) - Performance best practices

---

Happy coding! 🎉 Remember to test early and often using our comprehensive testing tools.