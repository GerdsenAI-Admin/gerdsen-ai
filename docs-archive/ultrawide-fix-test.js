// ULTRAWIDE FIX TEST
// This will diagnose the issue and apply a temporary fix
// Run this in the console to test

console.clear();
console.log('%c🔧 ULTRAWIDE FIX TEST', 'color: #0ff; font-size: 20px; font-weight: bold');

// Get elements
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');
const videoContainer = document.querySelector('.video-container');

// Check current state
console.log('\n📊 Current State:');
console.log('Hero section height:', window.getComputedStyle(heroSection).height);
console.log('Hero section overflow:', window.getComputedStyle(heroSection).overflow);
console.log('Hero content opacity:', window.getComputedStyle(heroContent).opacity);
console.log('Hero content visibility:', window.getComputedStyle(heroContent).visibility);

// Apply temporary fix
console.log('\n🔨 Applying temporary fix...');

// Fix 1: Make hero content visible
heroContent.style.cssText += `
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
`;

// Fix 2: Allow hero section to expand
heroSection.style.cssText += `
    height: auto !important;
    min-height: 100vh !important;
    overflow: visible !important;
`;

// Fix 3: Ensure video doesn't interfere
videoContainer.style.cssText += `
    overflow: hidden !important;
`;

// Check if content is now visible
setTimeout(() => {
    const contentRect = heroContent.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const isVisible = contentRect.bottom <= viewportHeight;
    
    console.log('\n✅ Fix Applied!');
    console.log('Content bottom:', contentRect.bottom);
    console.log('Viewport height:', viewportHeight);
    console.log('Is content fully visible?', isVisible ? '✅ YES' : '❌ NO');
    
    if (!isVisible) {
        console.log('\n🔄 Trying alternative fix...');
        
        // Alternative: Remove centering
        heroSection.style.cssText += `
            display: block !important;
            padding-top: 100px !important;
            padding-bottom: 50px !important;
        `;
        
        heroContent.style.cssText += `
            position: static !important;
            margin: 0 auto !important;
        `;
        
        console.log('Alternative fix applied - check now!');
    }
    
    // Add visual indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: ${isVisible ? '#0f0' : '#f00'};
        color: white;
        padding: 10px 20px;
        font-family: monospace;
        font-weight: bold;
        z-index: 99999;
        border-radius: 4px;
    `;
    indicator.textContent = isVisible ? '✅ Content Visible!' : '❌ Still Cut Off';
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.remove(), 5000);
}, 100);

console.log('\n💡 If this works, refresh the page to see the CSS fix take effect.');