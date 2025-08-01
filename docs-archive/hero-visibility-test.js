// Quick fix to force hero content visibility
// Run this in console to test

// Force hero content to be visible
const heroContent = document.querySelector('.hero-content');
const heroSection = document.querySelector('.hero-section');

if (heroContent) {
    // Remove the hidden state
    heroContent.style.opacity = '1';
    heroContent.style.visibility = 'visible';
    heroContent.style.transform = 'none';
    
    // Check current state
    console.log('Hero content styles:', {
        opacity: window.getComputedStyle(heroContent).opacity,
        visibility: window.getComputedStyle(heroContent).visibility,
        transform: window.getComputedStyle(heroContent).transform
    });
}

// Also check if hero section has scrolled class
if (heroSection) {
    console.log('Hero section classes:', heroSection.className);
    console.log('Has scrolled class?', heroSection.classList.contains('scrolled'));
    
    // Try adding scrolled class
    heroSection.classList.add('scrolled');
    console.log('Added scrolled class - check if content appears now');
}

// Check scroll position
console.log('Current scroll position:', window.pageYOffset);

// Create a visual indicator
const indicator = document.createElement('div');
indicator.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 0, 0, 0.8);
    color: white;
    padding: 20px;
    font-family: monospace;
    z-index: 99999;
    border-radius: 8px;
`;
indicator.innerHTML = `
    <h3>Hero Visibility Fix Test</h3>
    <p>Content should now be visible.</p>
    <p>If not, the issue is deeper than CSS.</p>
    <button onclick="this.parentElement.remove()">Close</button>
`;
document.body.appendChild(indicator);