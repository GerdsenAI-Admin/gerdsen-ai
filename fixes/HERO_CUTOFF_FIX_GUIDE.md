# Hero Section Cutoff Fix Implementation

## The Problem
The hero section content (especially "GerdsenAI" text) is being cut off on:
1. **Mobile devices** - Due to browser UI taking up space
2. **Ultra-wide screens** - Possible scaling issues

## Root Causes
1. Hero section uses `height: 100vh` which doesn't account for mobile browser UI
2. Content is absolutely positioned without considering overflow
3. Video scaling might push content out of view

## Quick Fix (Apply to main.css)

### Option 1: Minimal Changes
```css
/* Replace the existing .hero-section height */
.hero-section {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh; /* Use dynamic viewport height */
    height: auto; /* Allow content to expand if needed */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 0;
    z-index: 15;
    background: #000;
}

/* Add padding for mobile */
@media (max-width: 768px) {
    .hero-section {
        padding-bottom: 2rem; /* Ensure bottom content visible */
    }
}
```

### Option 2: Complete Mobile Fix
Add this entire block to your main.css:

```css
/* Mobile Hero Fixes */
@media (max-width: 768px) {
    /* Use dynamic viewport height */
    .hero-section {
        min-height: 100vh;
        min-height: 100dvh;
        height: auto;
        padding-top: 60px; /* Account for nav */
        padding-bottom: 20px;
    }
    
    /* Adjust video for mobile */
    .background-video {
        width: 140vw; /* Wider to ensure coverage */
        height: 100vh;
        object-fit: cover;
        object-position: center;
        transform: translate(-50%, -50%);
    }
    
    /* Ensure hero content fits */
    .hero-content {
        position: relative;
        z-index: 20;
        padding: 20px;
        margin-top: 0;
    }
    
    /* Slightly smaller text on mobile */
    .hero-title {
        font-size: clamp(2rem, 6vw, 3.5rem);
        margin-bottom: 20px;
    }
    
    .hero-description {
        font-size: clamp(0.9rem, 3vw, 1.2rem);
        margin-bottom: 30px;
    }
}

/* Ultra-wide fixes */
@media (min-width: 2560px) {
    .hero-content {
        max-width: 1600px;
    }
    
    /* Ensure video covers ultra-wide */
    .background-video {
        width: 140vw;
        min-width: 100%;
    }
}
```

## Testing Instructions

1. Open `hero-cutoff-test.html` in your browser
2. Resize to mobile dimensions
3. Click "Toggle Fix" to see before/after
4. The debug overlay shows:
   - Red border = standard 100vh
   - Green border = 100dvh (accounts for browser UI)
   - Whether bottom content is visible

## Alternative Solutions

### Solution A: Flexbox Layout
```css
.hero-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 80px 20px 40px; /* top/bottom padding */
}
```

### Solution B: CSS Grid
```css
.hero-section {
    display: grid;
    place-items: center;
    min-height: 100vh;
    min-height: 100dvh;
    padding: 80px 20px 40px;
}
```

### Solution C: JavaScript Viewport Fix
```javascript
// Add to main.js
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// Then in CSS:
.hero-section {
    height: calc(var(--vh, 1vh) * 100);
}
```

## Recommended Approach
Use Option 2 (Complete Mobile Fix) as it:
- Handles mobile browser UI with `dvh` units
- Ensures video coverage without cutting off content
- Maintains the design intent while fixing usability
- Works across all devices

## Implementation Steps
1. Back up your current `main.css`
2. Add the fix code to the end of `main.css`
3. Test on actual mobile devices
4. Use the debug tool to verify the fix
5. Adjust padding/margins as needed for your specific content