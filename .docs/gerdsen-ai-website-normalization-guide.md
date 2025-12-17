# Gerdsen.AI Website Normalization - Complete Implementation Guide

> **Purpose**: This document is a comprehensive prompt/guide for implementing website fixes. It can be used directly in VS Code with AI assistants (Cursor, Copilot, Claude) or followed manually.
>
> **Repository**: `/Volumes/M2 Raid0/GerdsenAI_Repositories/GerdsenAI_Website`  
> **Branch**: `side-scroll`  
> **Live URL**: https://gerdsen.ai

---

## Context for AI Assistant

You are helping normalize and fix the gerdsen.ai website. The site is a Jekyll-based single-page site for an AI/robotics consulting company in Louisiana. The main issues to fix are:

1. **Icons not rendering** - Font Awesome icons are broken
2. **Typography inconsistency** - Need fonts matching the logo (SF Pro Display / SF Mono)
3. **Responsive design gaps** - Issues on mobile and ultrawide screens
4. **SEO enhancement** - Add industry-specific content for Oil & Gas, Construction, Defense, Non-profits

The site uses:
- Jekyll static site generator
- Tailwind CSS (CDN)
- Font Awesome (CDN - currently broken)
- Custom CSS in `assets/css/main.css`
- Custom JS in `assets/js/main.js`

---

## TASK 1: Self-Host Font Awesome Icons

### Step 1.1: Download Font Awesome

```bash
# Navigate to repository
cd "/Volumes/M2 Raid0/GerdsenAI_Repositories/GerdsenAI_Website"

# Create directory structure
mkdir -p assets/vendor/fontawesome/css
mkdir -p assets/vendor/fontawesome/webfonts

# Option A: Download via npm (recommended)
npm install --save @fortawesome/fontawesome-free

# Copy required files
cp node_modules/@fortawesome/fontawesome-free/css/all.min.css assets/vendor/fontawesome/css/
cp -r node_modules/@fortawesome/fontawesome-free/webfonts/* assets/vendor/fontawesome/webfonts/
```

### Step 1.2: Fix Font Paths in CSS

The downloaded CSS references fonts with `../webfonts/` paths. Since we're placing both in the same vendor folder, this should work. Verify the paths:

```bash
# Check the font paths in the CSS
head -50 assets/vendor/fontawesome/css/all.min.css | grep -o "url([^)]*)"
```

The paths should be `../webfonts/fa-solid-900.woff2` etc. If they differ, adjust the folder structure accordingly.

### Step 1.3: Update index.html

Find this line in `index.html`:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer">
```

Replace with:

```html
<!-- Font Awesome - Self-hosted for reliability -->
<link rel="stylesheet" href="assets/vendor/fontawesome/css/all.min.css">
```

### Step 1.4: Verify Icons Work

The site uses these Font Awesome icons (verify all render):

| Location | Icon Class | Purpose |
|----------|-----------|---------|
| Nav - Services | `fas fa-cog` | Gear icon |
| Nav - About | `fas fa-info-circle` | Info icon |
| Nav - Contact | `fas fa-envelope` | Email icon |
| Nav - GitHub | `fab fa-github` | GitHub logo |
| Service Cards | `fas fa-brain` | AI Strategy |
| Service Cards | `fas fa-code` | Development |
| Service Cards | `fas fa-rocket` | Deployment |
| Service Cards | `fas fa-graduation-cap` | Training |
| Service Cards | `fas fa-cloud` | Cloud |
| Service Cards | `fas fa-shield-alt` | Security |
| Modals | Various `fas fa-*` | Multiple |
| Contact | `fas fa-envelope`, `fas fa-map-pin`, `fas fa-phone`, `fas fa-clock` | Contact info |

### Step 1.5: Add Icon Loading Verification (Optional Debug)

Add to `assets/js/main.js` (remove after confirming icons work):

```javascript
// Icon loading verification - remove after confirming icons work
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const testIcon = document.querySelector('.fas, .fab');
        if (testIcon) {
            const computedStyle = window.getComputedStyle(testIcon, ':before');
            const fontFamily = computedStyle.getPropertyValue('font-family');
            if (fontFamily.toLowerCase().includes('font awesome') || fontFamily.toLowerCase().includes('fontawesome')) {
                console.log('✅ Font Awesome loaded successfully');
            } else {
                console.warn('⚠️ Font Awesome may not be loaded. Font family:', fontFamily);
            }
        } else {
            console.warn('⚠️ No Font Awesome icons found on page');
        }
    }, 1000);
});
```

---

## TASK 2: Typography - Match Logo Font

### Step 2.1: Identify Font Requirements

The logo uses **SF Pro Display** (Apple's system font). The site should use:
- **SF Pro Display** - Headings, nav, hero text
- **SF Mono** - Code elements, technical text
- **System fallbacks** - For non-Apple devices

### Step 2.2: Set Up Self-Hosted Fonts

**If you have SF fonts in `__GerdsenAI_Branding` folder:**

```bash
# Create fonts directory
mkdir -p assets/fonts/sf-pro-display
mkdir -p assets/fonts/sf-mono

# Copy fonts (adjust paths based on your branding folder structure)
# You need WOFF2 format for web. If you only have OTF, convert them:
# Use tools like: https://cloudconvert.com/otf-to-woff2

# Expected structure:
# assets/fonts/sf-pro-display/
#   SF-Pro-Display-Regular.woff2
#   SF-Pro-Display-Medium.woff2
#   SF-Pro-Display-Semibold.woff2
#   SF-Pro-Display-Bold.woff2
#
# assets/fonts/sf-mono/
#   SF-Mono-Regular.woff2
#   SF-Mono-Medium.woff2
#   SF-Mono-Semibold.woff2
#   SF-Mono-Bold.woff2
```

### Step 2.3: Update CSS - Font Face Declarations

Replace the broken `@font-face` declarations at the top of `assets/css/main.css` with:

```css
/* ============================================
   FONT FACE DECLARATIONS
   ============================================ */

/* SF Pro Display - Primary display font */
@font-face {
    font-family: 'SF Pro Display';
    src: url('../fonts/sf-pro-display/SF-Pro-Display-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Pro Display';
    src: url('../fonts/sf-pro-display/SF-Pro-Display-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Pro Display';
    src: url('../fonts/sf-pro-display/SF-Pro-Display-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Pro Display';
    src: url('../fonts/sf-pro-display/SF-Pro-Display-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

/* SF Mono - Monospace font for technical elements */
@font-face {
    font-family: 'SF Mono';
    src: url('../fonts/sf-mono/SF-Mono-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Mono';
    src: url('../fonts/sf-mono/SF-Mono-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Mono';
    src: url('../fonts/sf-mono/SF-Mono-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'SF Mono';
    src: url('../fonts/sf-mono/SF-Mono-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
}

/* ============================================
   CSS CUSTOM PROPERTIES - TYPOGRAPHY
   ============================================ */
:root {
    /* Font Stacks */
    --font-display: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --font-mono: 'SF Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'Liberation Mono', monospace;
    
    /* Font Sizes - Fluid Typography */
    --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
    --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
    --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
    --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
    --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
    --text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem);
    --text-3xl: clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem);
    --text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3rem);
    --text-5xl: clamp(3rem, 2rem + 5vw, 5rem);
    --text-hero: clamp(2.5rem, 2rem + 5vw, 5.5rem);
}
```

### Step 2.4: Update Body and Global Typography

Find and replace the body font-family rules. Look for:

```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    /* ... */
}
```

Replace with:

```css
body {
    font-family: var(--font-display);
    background: #000;
    color: #fff;
    overflow-x: hidden;
    line-height: 1.6;
    position: relative;
    min-height: 100vh;
    z-index: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
}
```

### Step 2.5: Remove Aggressive !important Overrides

Find and remove or modify this section near the bottom of `main.css`:

```css
/* REMOVE OR MODIFY THIS SECTION */
/* Global SF Pro Font Override - Clean Apple Style */
*, *::before, *::after {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
    /* ... */
}
```

Replace with a cleaner approach:

```css
/* ============================================
   TYPOGRAPHY ASSIGNMENTS
   ============================================ */

/* Headings */
h1, h2, h3, h4, h5, h6,
.hero-title,
.section-title,
.nav-logo {
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.2;
}

/* Body text */
p, span, div, li, a, button, label {
    font-family: var(--font-display);
}

/* Monospace elements */
code, pre, kbd, samp,
.mono,
.service-card h3 {
    font-family: var(--font-mono);
}

/* Form elements */
input, textarea, select {
    font-family: var(--font-display);
}
```

### Step 2.6: Update Specific Element Styles

Update the `.nav-logo` class:

```css
.nav-logo {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.5vw + 0.75rem, 1.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.95);
    text-decoration: none;
}
```

Update `.hero-title`:

```css
.hero-title {
    font-family: var(--font-display);
    font-size: var(--text-hero);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 30px;
    color: #fff;
    text-shadow: 0 4px 30px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8);
}
```

Update `.section-title`:

```css
.section-title {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    font-weight: 700;
    text-align: center;
    margin-bottom: 60px;
    letter-spacing: -0.02em;
}
```

Update `.mono` class (used on service card headings):

```css
.mono {
    font-family: var(--font-mono);
    font-weight: 600;
    letter-spacing: -0.01em;
}
```

---

## TASK 3: Responsive Design Fixes

### Step 3.1: Add Enhanced Breakpoint System

Add this CSS to `main.css` (place after the base styles, before media queries):

```css
/* ============================================
   RESPONSIVE BREAKPOINT SYSTEM
   ============================================ */

/* 
   Breakpoint Reference:
   - xs: < 375px (small phones)
   - sm: 375-480px (standard phones)
   - md: 481-767px (large phones, small tablets)
   - lg: 768-1023px (tablets)
   - xl: 1024-1439px (small desktops)
   - 2xl: 1440-1919px (standard desktops)
   - 3xl: 1920-2559px (large desktops)
   - 4xl: 2560px+ (ultrawide)
*/

/* Extra Small Phones (< 375px) - iPhone SE, older devices */
@media (max-width: 374px) {
    :root {
        --text-hero: clamp(1.75rem, 8vw, 2.5rem);
    }
    
    .hero-section {
        padding: 70px 0.75rem 1.5rem;
    }
    
    .hero-content {
        padding: 0 0.5rem;
    }
    
    .hero-title {
        font-size: var(--text-hero);
        margin-bottom: 1rem;
    }
    
    .hero-description {
        font-size: var(--text-sm);
        margin-bottom: 1.5rem;
        padding: 0 0.25rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
        padding: 0 0.5rem;
    }
    
    .button-primary,
    .button-secondary {
        width: 100%;
        padding: 14px 20px;
        font-size: var(--text-sm);
        text-align: center;
    }
    
    nav {
        padding: 12px 12px !important;
        height: auto;
        min-height: 60px;
    }
    
    .nav-logo {
        font-size: 1rem;
    }
    
    .section-content {
        padding: 0 1rem;
    }
    
    .services-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .service-card {
        padding: 1.25rem;
    }
    
    .service-card h3 {
        font-size: var(--text-lg);
    }
    
    .service-card .text-4xl {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .glass-effect {
        padding: 1.25rem;
    }
    
    .contact-form {
        padding: 1.25rem;
    }
    
    .modal-content {
        width: 98%;
        margin: 5% auto;
        max-height: 90vh;
    }
    
    .modal-header {
        padding: 1rem;
    }
    
    .modal-body {
        padding: 1rem;
    }
}

/* Standard Phones (375-480px) */
@media (min-width: 375px) and (max-width: 480px) {
    .hero-section {
        min-height: 100dvh;
        padding: 80px 1rem 2rem;
    }
    
    .hero-content {
        padding: 0 0.5rem;
    }
    
    .hero-buttons {
        flex-direction: column;
        gap: 0.875rem;
        max-width: 280px;
        margin: 0 auto;
    }
    
    .button-primary,
    .button-secondary {
        width: 100%;
        padding: 16px 24px;
    }
    
    .services-grid,
    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
    
    .section-content {
        padding: 0 1.25rem;
    }
}

/* Large Phones / Small Tablets (481-767px) */
@media (min-width: 481px) and (max-width: 767px) {
    .hero-content {
        max-width: 500px;
        margin: 0 auto;
    }
    
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .service-card {
        padding: 1.5rem;
    }
    
    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
}

/* Tablets (768-1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
    nav {
        padding: 16px 24px !important;
        height: 70px;
    }
    
    .nav-link {
        font-size: var(--text-sm);
        padding: 6px 0;
    }
    
    .hero-content {
        max-width: 600px;
        margin: 0 auto;
    }
    
    .services-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
    
    .section-content {
        padding: 0 2rem;
    }
}

/* Small Desktops (1024-1439px) */
@media (min-width: 1024px) and (max-width: 1439px) {
    .hero-content {
        max-width: 800px;
    }
    
    .services-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }
    
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Standard Desktops (1440-1919px) */
@media (min-width: 1440px) and (max-width: 1919px) {
    .hero-content {
        max-width: 900px;
    }
    
    .section-content {
        max-width: 1200px;
    }
}

/* Large Desktops (1920-2559px) */
@media (min-width: 1920px) and (max-width: 2559px) {
    body {
        font-size: 17px;
    }
    
    nav {
        padding: 20px 48px !important;
        height: 85px;
    }
    
    .hero-content {
        max-width: 1000px;
    }
    
    .section-content {
        max-width: 1400px;
    }
    
    .services-grid {
        gap: 2rem;
    }
}

/* Ultrawide (2560px+) */
@media (min-width: 2560px) {
    body {
        font-size: 18px;
    }
    
    nav {
        padding: 24px 60px !important;
        height: 90px;
    }
    
    nav .container {
        max-width: 1800px;
        margin: 0 auto;
    }
    
    .hero-section {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .hero-content {
        max-width: 1100px;
        transform: none !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    .section-content {
        max-width: 1600px;
        margin: 0 auto;
    }
    
    .services-grid {
        grid-template-columns: repeat(3, 1fr);
        max-width: 1500px;
        margin-left: auto;
        margin-right: auto;
        gap: 2.5rem;
    }
    
    .features-grid {
        max-width: 1400px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .contact-form {
        max-width: 700px;
    }
}

/* Super Ultrawide (3440px+) */
@media (min-width: 3440px) {
    body {
        font-size: 20px;
    }
    
    .hero-content {
        max-width: 1200px;
    }
    
    .section-content {
        max-width: 1800px;
    }
    
    .services-grid {
        max-width: 1700px;
    }
}

/* Landscape Mobile Fix */
@media (max-height: 500px) and (orientation: landscape) {
    .hero-section {
        min-height: auto;
        padding: 70px 2rem 1.5rem;
    }
    
    .hero-content {
        transform: scale(0.85);
    }
    
    .hero-title {
        font-size: clamp(1.5rem, 4vh + 0.5rem, 2.5rem);
        margin-bottom: 0.75rem;
    }
    
    .hero-description {
        font-size: clamp(0.875rem, 2vh + 0.25rem, 1rem);
        margin-bottom: 1rem;
    }
    
    .hero-buttons {
        gap: 0.75rem;
    }
    
    .button-primary,
    .button-secondary {
        padding: 10px 20px;
        font-size: 0.875rem;
    }
}

/* Safe Area Insets for Notched Devices */
@supports (padding: max(0px)) {
    .hero-section {
        padding-left: max(1rem, env(safe-area-inset-left));
        padding-right: max(1rem, env(safe-area-inset-right));
        padding-bottom: max(2rem, env(safe-area-inset-bottom));
    }
    
    nav {
        padding-left: max(20px, env(safe-area-inset-left)) !important;
        padding-right: max(20px, env(safe-area-inset-right)) !important;
        padding-top: max(20px, env(safe-area-inset-top)) !important;
    }
    
    footer {
        padding-bottom: max(12px, env(safe-area-inset-bottom));
        padding-left: max(24px, env(safe-area-inset-left));
        padding-right: max(24px, env(safe-area-inset-right));
    }
}

/* High DPI Screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
}

/* Reduced Motion Preference */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .background-video {
        display: none;
    }
    
    .hero-section {
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    }
    
    .firefly-container,
    .particles-background,
    .steam-layer,
    .cloud-layer {
        display: none;
    }
}

/* Print Styles */
@media print {
    .background-video,
    .particles-background,
    .firefly-container,
    .steam-layer,
    .cloud-layer,
    nav,
    .hero-buttons,
    .modal {
        display: none !important;
    }
    
    body {
        background: white;
        color: black;
    }
    
    .hero-section {
        background: white;
        min-height: auto;
        padding: 2rem;
    }
    
    .hero-content {
        opacity: 1 !important;
        visibility: visible !important;
        transform: none !important;
    }
    
    .hero-title,
    .section-title {
        color: black;
        text-shadow: none;
    }
    
    .service-card,
    .glass-effect {
        background: #f5f5f5;
        border: 1px solid #ddd;
        color: black;
    }
    
    a {
        color: black;
        text-decoration: underline;
    }
    
    a::after {
        content: " (" attr(href) ")";
        font-size: 0.8em;
        color: #666;
    }
}
```

### Step 3.2: Add Device Detection JavaScript

Add to `assets/js/main.js` (at the beginning of the file):

```javascript
// ============================================
// DEVICE DETECTION & RESPONSIVE UTILITIES
// ============================================

(function() {
    'use strict';
    
    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Device class detection
    function updateDeviceClass() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const aspectRatio = width / height;
        const body = document.body;
        const html = document.documentElement;
        
        // Remove all device classes
        const deviceClasses = [
            'device-xs',
            'device-sm', 
            'device-md',
            'device-lg',
            'device-xl',
            'device-2xl',
            'device-3xl',
            'device-ultrawide',
            'device-landscape-mobile',
            'device-portrait',
            'device-landscape'
        ];
        
        body.classList.remove(...deviceClasses);
        
        // Add size class
        if (width < 375) {
            body.classList.add('device-xs');
        } else if (width < 481) {
            body.classList.add('device-sm');
        } else if (width < 768) {
            body.classList.add('device-md');
        } else if (width < 1024) {
            body.classList.add('device-lg');
        } else if (width < 1440) {
            body.classList.add('device-xl');
        } else if (width < 1920) {
            body.classList.add('device-2xl');
        } else if (width < 2560) {
            body.classList.add('device-3xl');
        } else {
            body.classList.add('device-ultrawide');
        }
        
        // Add orientation class
        if (aspectRatio > 1) {
            body.classList.add('device-landscape');
            if (height < 500 && width < 900) {
                body.classList.add('device-landscape-mobile');
            }
        } else {
            body.classList.add('device-portrait');
        }
        
        // Set CSS custom properties
        html.style.setProperty('--viewport-width', width + 'px');
        html.style.setProperty('--viewport-height', height + 'px');
        html.style.setProperty('--viewport-aspect-ratio', aspectRatio.toFixed(3));
        
        // Dispatch custom event for other scripts
        window.dispatchEvent(new CustomEvent('deviceClassUpdate', {
            detail: { width, height, aspectRatio }
        }));
    }
    
    // Run on load
    updateDeviceClass();
    
    // Run on resize with debounce
    window.addEventListener('resize', debounce(updateDeviceClass, 150));
    
    // Run on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(updateDeviceClass, 100);
    });
    
    // Expose utility globally if needed
    window.GerdsenAI = window.GerdsenAI || {};
    window.GerdsenAI.updateDeviceClass = updateDeviceClass;
})();
```

---

## TASK 4: SEO Enhancement - Industry Sections

### Step 4.1: Update Meta Tags in index.html

Find the existing meta description and keywords. Replace with:

```html
<meta name="description" content="AI development, autonomous robotics, and industrial automation for Louisiana businesses. Specializing in NVIDIA Jetson systems, ROS2 integration, computer vision, and secure local AI deployment. Serving oil & gas, construction, defense, and non-profit sectors from Lafayette, LA.">

<meta name="keywords" content="AI consultant Lafayette LA, Louisiana AI development, NVIDIA Jetson development, ROS2 systems integration, autonomous robots Louisiana, industrial inspection automation, oil and gas AI solutions, construction site monitoring, defense technology Louisiana, non-profit AI consulting, edge AI deployment, computer vision solutions, sensor fusion systems, CMMC compliant AI, local LLM deployment, industrial automation Louisiana">
```

### Step 4.2: Update Schema.org Structured Data

Replace the existing Schema.org JSON-LD in `index.html` with:

```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "TechnologyCompany"],
    "name": "GERDSEN AI LLC",
    "alternateName": "GERDSEN AI",
    "description": "AI development, autonomous robotics, and industrial automation for Louisiana businesses. Specializing in NVIDIA Jetson systems, ROS2 integration, and secure local AI deployment for oil & gas, construction, defense, and non-profit sectors.",
    "url": "https://gerdsen.ai",
    "logo": "https://gerdsen.ai/assets/images/gerdsen-ai-logo.png",
    "image": "https://gerdsen.ai/assets/images/og-share-image.jpg",
    "telephone": "",
    "email": "info@gerdsen.ai",
    "foundingDate": "2025",
    "legalName": "GERDSEN AI LLC",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lafayette",
        "addressRegion": "Louisiana",
        "addressCountry": "US",
        "postalCode": "70508"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.2241",
        "longitude": "-92.0198"
    },
    "areaServed": [
        {
            "@type": "State",
            "name": "Louisiana"
        },
        {
            "@type": "City",
            "name": "Lafayette"
        },
        {
            "@type": "City",
            "name": "Baton Rouge"
        },
        {
            "@type": "City",
            "name": "New Orleans"
        },
        {
            "@type": "City",
            "name": "Lake Charles"
        },
        {
            "@type": "City",
            "name": "Houma"
        }
    ],
    "serviceType": [
        "AI Consulting",
        "Machine Learning Development",
        "Autonomous Robotics Development",
        "ROS2 Systems Integration",
        "Computer Vision Solutions",
        "NVIDIA Jetson Development",
        "Industrial Inspection Automation",
        "Oil and Gas AI Solutions",
        "Construction Technology",
        "Defense Technology Integration",
        "Edge AI Deployment",
        "Sensor Fusion Systems",
        "Fleet Management Software",
        "CMMC Compliance Consulting",
        "Non-Profit Technology Services"
    ],
    "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Autonomous Mobile Robots",
        "ROS2 Robotics Framework",
        "NVIDIA Jetson Orin",
        "Computer Vision",
        "LiDAR Integration",
        "Thermal Imaging Systems",
        "Multi-Sensor Fusion",
        "Oil and Gas Automation",
        "Pipeline Inspection",
        "Offshore Platform Monitoring",
        "Construction Site Monitoring",
        "Engineering Automation",
        "Structural Inspection",
        "Industrial Inspection",
        "Perimeter Security Robots",
        "Defense Technology",
        "Command and Control Systems",
        "Edge AI Computing",
        "Local LLM Deployment",
        "CMMC Compliance",
        "Data Sovereignty",
        "Non-Profit Technology",
        "Grant Technology Consulting"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Check", "Invoice", "Credit Card"],
    "currenciesAccepted": "USD",
    "openingHours": "Mo-Fr 08:00-17:00",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI & Robotics Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "AI Strategy & Consulting",
                "description": "Define your AI roadmap with expert guidance on implementation and compliance"
            },
            {
                "@type": "Offer",
                "name": "Custom AI Development",
                "description": "Build bespoke AI solutions tailored to your specific use cases"
            },
            {
                "@type": "Offer",
                "name": "Autonomous Robotics",
                "description": "ROS2-based autonomous mobile robots for inspection, monitoring, and security"
            },
            {
                "@type": "Offer",
                "name": "Industrial Automation",
                "description": "AI-powered automation for oil & gas, construction, and manufacturing"
            },
            {
                "@type": "Offer",
                "name": "Secure AI Deployment",
                "description": "CMMC compliant, on-premise AI deployment with data sovereignty"
            },
            {
                "@type": "Offer",
                "name": "Non-Profit AI Services",
                "description": "Affordable AI consulting and development for non-profit organizations"
            }
        ]
    },
    "sameAs": [
        "https://github.com/orgs/GerdsenAI/repositories",
        "https://linkedin.com/company/gerdsen-ai"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "info@gerdsen.ai",
        "availableLanguage": "English",
        "areaServed": "Louisiana"
    },
    "slogan": "AI Solutions for Louisiana Industries",
    "keywords": "AI consultant Lafayette LA, autonomous robots Louisiana, NVIDIA Jetson development, oil and gas AI, construction AI, defense technology, non-profit AI consulting"
}
</script>
```

### Step 4.3: Add Industries Section to HTML

Add this section after the Services section and before the About section in `index.html`:

```html
<!-- Industries Section -->
<section id="industries" class="content-section">
    <div class="section-content">
        <h2 class="section-title" data-scroll-fade>Industries We Serve</h2>
        
        <div class="industries-grid" data-scroll-fade data-delay="200">
            <!-- Oil & Gas -->
            <div class="industry-card" data-industry="oil-gas">
                <div class="industry-icon">
                    <i class="fas fa-oil-well"></i>
                </div>
                <h3>Oil & Gas</h3>
                <p>AI-powered solutions for pipeline inspection, offshore platform monitoring, predictive maintenance, and safety compliance. Designed for the demanding conditions of Louisiana's energy sector.</p>
                <ul class="industry-features">
                    <li><i class="fas fa-check"></i> Pipeline anomaly detection</li>
                    <li><i class="fas fa-check"></i> Autonomous inspection robots</li>
                    <li><i class="fas fa-check"></i> Predictive equipment maintenance</li>
                    <li><i class="fas fa-check"></i> Safety & compliance monitoring</li>
                </ul>
            </div>
            
            <!-- Construction & Engineering -->
            <div class="industry-card" data-industry="construction">
                <div class="industry-icon">
                    <i class="fas fa-hard-hat"></i>
                </div>
                <h3>Construction & Engineering</h3>
                <p>Autonomous site monitoring, progress documentation, structural analysis, and safety oversight. Supporting civil, mechanical, and electrical engineering projects across Acadiana.</p>
                <ul class="industry-features">
                    <li><i class="fas fa-check"></i> Autonomous site monitoring</li>
                    <li><i class="fas fa-check"></i> Progress documentation AI</li>
                    <li><i class="fas fa-check"></i> Structural inspection systems</li>
                    <li><i class="fas fa-check"></i> Safety compliance automation</li>
                </ul>
            </div>
            
            <!-- Defense & Security -->
            <div class="industry-card" data-industry="defense">
                <div class="industry-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>Defense & Security</h3>
                <p>CMMC-compliant AI systems for autonomous surveillance, perimeter security, and command & control integration. Air-gapped deployments with complete data sovereignty.</p>
                <ul class="industry-features">
                    <li><i class="fas fa-check"></i> CMMC compliant systems</li>
                    <li><i class="fas fa-check"></i> Autonomous perimeter security</li>
                    <li><i class="fas fa-check"></i> Multi-sensor threat detection</li>
                    <li><i class="fas fa-check"></i> Air-gapped AI deployment</li>
                </ul>
            </div>
            
            <!-- Non-Profits -->
            <div class="industry-card" data-industry="nonprofit">
                <div class="industry-icon">
                    <i class="fas fa-hands-helping"></i>
                </div>
                <h3>Non-Profits</h3>
                <p>Affordable AI solutions to amplify your mission. From donor analytics to program optimization, we help Louisiana non-profits leverage technology within budget constraints.</p>
                <ul class="industry-features">
                    <li><i class="fas fa-check"></i> Grant-friendly pricing</li>
                    <li><i class="fas fa-check"></i> Donor analytics & insights</li>
                    <li><i class="fas fa-check"></i> Program impact measurement</li>
                    <li><i class="fas fa-check"></i> Volunteer coordination AI</li>
                </ul>
            </div>
        </div>
        
        <div class="text-center mt-12">
            <a href="#contact" class="button-primary magnetic">Discuss Your Industry Needs</a>
        </div>
    </div>
</section>
```

### Step 4.4: Add Industries CSS

Add to `main.css`:

```css
/* ============================================
   INDUSTRIES SECTION
   ============================================ */

.industries-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.industry-card {
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    position: relative;
    overflow: hidden;
}

.industry-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--industry-color, #007AFF), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.industry-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.industry-card:hover::before {
    opacity: 1;
}

/* Industry-specific accent colors */
.industry-card[data-industry="oil-gas"] {
    --industry-color: #FF9500;
}

.industry-card[data-industry="construction"] {
    --industry-color: #FFD60A;
}

.industry-card[data-industry="defense"] {
    --industry-color: #30D158;
}

.industry-card[data-industry="nonprofit"] {
    --industry-color: #BF5AF2;
}

.industry-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    color: var(--industry-color, #007AFF);
    transition: all 0.3s ease;
}

.industry-card:hover .industry-icon {
    background: var(--industry-color, #007AFF);
    color: white;
    transform: scale(1.1);
}

.industry-card h3 {
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
}

.industry-card > p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    font-size: var(--text-base);
}

.industry-features {
    list-style: none;
    padding: 0;
    margin: 0;
}

.industry-features li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
    font-size: var(--text-sm);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.industry-features li:last-child {
    border-bottom: none;
}

.industry-features li i {
    color: var(--industry-color, #007AFF);
    font-size: 0.75rem;
}

/* Responsive adjustments */
@media (max-width: 767px) {
    .industries-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .industry-card {
        padding: 1.5rem;
    }
    
    .industry-icon {
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .industries-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 2560px) {
    .industries-grid {
        max-width: 1600px;
        margin-left: auto;
        margin-right: auto;
    }
}
```

### Step 4.5: Update Navigation

Add Industries link to the navigation in `index.html`. Find the nav section and add:

**Desktop Nav:**
```html
<div class="hidden md:flex items-center space-x-8">
    <a href="#services" class="nav-link">
        <i class="fas fa-cog mr-2"></i>Services
    </a>
    <a href="#industries" class="nav-link">
        <i class="fas fa-industry mr-2"></i>Industries
    </a>
    <a href="#about" class="nav-link">
        <i class="fas fa-info-circle mr-2"></i>About
    </a>
    <!-- ... rest of nav -->
</div>
```

**Mobile Nav:**
```html
<div id="mobile-menu" class="md:hidden mobile-menu-hidden ...">
    <div class="px-2 pt-2 pb-3 space-y-1 ...">
        <a href="#services" class="mobile-nav-link ...">
            <i class="fas fa-cog mr-2"></i>Services
        </a>
        <a href="#industries" class="mobile-nav-link ...">
            <i class="fas fa-industry mr-2"></i>Industries
        </a>
        <!-- ... rest of mobile nav -->
    </div>
</div>
```

---

## TASK 5: Performance Optimizations

### Step 5.1: Add Preload/Preconnect Hints

Add these to the `<head>` section in `index.html`, before other stylesheets:

```html
<!-- Preconnect for external resources -->
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

<!-- Preload critical resources -->
<link rel="preload" href="assets/css/main.css" as="style">
<link rel="preload" href="assets/vendor/fontawesome/css/all.min.css" as="style">
<link rel="preload" href="assets/images/Neural_G_5.mp4" as="video" type="video/mp4">

<!-- Preload fonts (adjust paths based on your setup) -->
<link rel="preload" href="assets/fonts/sf-pro-display/SF-Pro-Display-Semibold.woff2" as="font" type="font/woff2" crossorigin>
```

### Step 5.2: Add Additional Meta Tags

```html
<!-- Additional SEO meta tags -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="GERDSEN AI LLC">
<meta name="geo.region" content="US-LA">
<meta name="geo.placename" content="Lafayette">
<meta name="geo.position" content="30.2241;-92.0198">
<meta name="ICBM" content="30.2241, -92.0198">

<!-- Additional OpenGraph -->
<meta property="og:locale:alternate" content="en_US">
<meta property="article:publisher" content="https://github.com/orgs/GerdsenAI">
```

---

## Verification Checklist

After implementing all changes, verify:

### Icons
- [ ] Navigation icons visible (cog, info-circle, envelope, github, industry)
- [ ] Service card icons visible (brain, code, rocket, graduation-cap, cloud, shield-alt)
- [ ] Industry icons visible (oil-well, hard-hat, shield-alt, hands-helping)
- [ ] Modal icons visible
- [ ] Contact section icons visible
- [ ] Icons render correctly on mobile and desktop

### Typography
- [ ] Nav logo uses correct font
- [ ] Hero title uses correct font
- [ ] Section titles use correct font
- [ ] Service card headings use mono font
- [ ] Body text is readable and consistent
- [ ] Font renders correctly on Windows (fallback works)
- [ ] Font renders correctly on macOS
- [ ] Font renders correctly on mobile

### Responsive Design
- [ ] Test on iPhone SE (375px width)
- [ ] Test on iPhone 14 Pro Max (430px width)
- [ ] Test on iPad (768px width)
- [ ] Test on iPad landscape (1024px width)
- [ ] Test on MacBook (1440px width)
- [ ] Test on 4K monitor (2560px width)
- [ ] Test on ultrawide (3440px width)
- [ ] Test landscape mobile
- [ ] No content cutoff on any device
- [ ] Navigation works on all sizes

### SEO
- [ ] Meta description updated
- [ ] Keywords updated
- [ ] Schema.org JSON-LD valid (test at schema.org/validator)
- [ ] Industries section renders correctly
- [ ] Industries nav link works
- [ ] All internal links work

### Performance
- [ ] Lighthouse score > 80
- [ ] No console errors
- [ ] Video loads and plays
- [ ] Page loads in < 3 seconds

---

## Git Commands for Deployment

```bash
# Navigate to repo
cd "/Volumes/M2 Raid0/GerdsenAI_Repositories/GerdsenAI_Website"

# Check current branch
git branch

# Create feature branch for changes
git checkout -b feature/website-normalization

# Stage all changes
git add .

# Commit with descriptive message
git commit -m "feat: website normalization - icons, typography, responsive, SEO

- Self-host Font Awesome for reliable icon rendering
- Implement SF Pro Display/Mono typography system
- Add comprehensive responsive breakpoints (xs to ultrawide)
- Add Industries section (Oil & Gas, Construction, Defense, Non-Profits)
- Update Schema.org structured data for industry focus
- Add safe area insets for notched devices
- Add reduced motion and print styles"

# Push to remote
git push -u origin feature/website-normalization

# After testing, merge to side-scroll
git checkout side-scroll
git merge feature/website-normalization
git push
```

---

## Troubleshooting

### Icons Not Showing

1. Check browser console for 404 errors on font files
2. Verify `assets/vendor/fontawesome/webfonts/` contains `.woff2` files
3. Check CSS paths in `all.min.css` match folder structure
4. Clear browser cache and hard refresh (Cmd+Shift+R)

### Fonts Not Loading

1. Check browser console for font loading errors
2. Verify `.woff2` files exist in `assets/fonts/`
3. Check `@font-face` src paths are correct
4. Ensure `font-display: swap` is set for graceful fallback

### Responsive Issues

1. Check for `!important` overrides conflicting with media queries
2. Verify viewport meta tag is correct
3. Use browser DevTools responsive mode to test
4. Check for fixed pixel values that should be relative

### Video Not Playing on Mobile

1. Ensure `playsinline` attribute is present
2. Check video file size (may need compression)
3. Some browsers block autoplay - provide play button fallback

---

*End of Implementation Guide*
