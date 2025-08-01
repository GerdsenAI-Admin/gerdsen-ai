// Quick test script to check if hero content is cut off
// Run this in the browser console on your website

console.clear();
console.log('%c🔍 HERO CUTOFF CHECK', 'color: #0f0; font-size: 20px; font-weight: bold');

// Get elements
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');
const video = document.querySelector('.background-video');

if (!heroSection || !heroContent) {
    console.error('❌ Hero elements not found!');
} else {
    // Get measurements
    const heroRect = heroSection.getBoundingClientRect();
    const contentRect = heroContent.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const videoRect = video ? video.getBoundingClientRect() : null;
    
    // Check if content is cut off
    const contentBottom = contentRect.bottom;
    const isContentVisible = contentBottom <= viewportHeight;
    const cutoffAmount = Math.max(0, contentBottom - viewportHeight);
    
    // Report findings
    console.log('\n📏 MEASUREMENTS:');
    console.log(`Viewport height: ${viewportHeight}px`);
    console.log(`Hero section height: ${Math.round(heroRect.height)}px`);
    console.log(`Hero content height: ${Math.round(contentRect.height)}px`);
    console.log(`Content bottom position: ${Math.round(contentBottom)}px`);
    
    if (videoRect) {
        console.log(`\n🎥 VIDEO COVERAGE:`);
        console.log(`Video size: ${Math.round(videoRect.width)}x${Math.round(videoRect.height)}`);
        console.log(`Covers viewport: ${videoRect.width >= window.innerWidth && videoRect.height >= viewportHeight ? '✅ Yes' : '❌ No'}`);
    }
    
    console.log('\n📊 RESULTS:');
    if (isContentVisible) {
        console.log('%c✅ Hero content is fully visible!', 'color: #0f0; font-weight: bold');
    } else {
        console.log(`%c❌ Hero content is cut off by ${cutoffAmount}px!`, 'color: #f00; font-weight: bold');
        console.log('%c💡 FIX: Add min-height: 100dvh and padding-bottom to .hero-section', 'color: #ff0');
    }
    
    // Visual indicator
    if (!isContentVisible) {
        // Add temporary visual indicator
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: ${cutoffAmount}px;
            background: rgba(255, 0, 0, 0.3);
            border-top: 2px solid red;
            pointer-events: none;
            z-index: 99999;
        `;
        document.body.appendChild(indicator);
        
        const label = document.createElement('div');
        label.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: red;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-family: monospace;
            z-index: 99999;
        `;
        label.textContent = `${cutoffAmount}px cut off`;
        document.body.appendChild(label);
        
        console.log('%c🔴 Red overlay shows cut-off area', 'color: #f00');
        
        // Remove after 5 seconds
        setTimeout(() => {
            indicator.remove();
            label.remove();
        }, 5000);
    }
    
    // Device info
    console.log('\n📱 DEVICE INFO:');
    console.log(`Screen: ${window.screen.width}x${window.screen.height}`);
    console.log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`Device pixel ratio: ${window.devicePixelRatio}`);
    console.log(`User agent: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`);
}