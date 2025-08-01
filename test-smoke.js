// Test the smoke effect visibility
console.log('Testing smoke effect...');

// Check if smoke background exists
const smokeBg = document.getElementById('particles-bg');
const smokeLayers = document.querySelectorAll('.smoke-layer');

console.log('Smoke background found:', !!smokeBg);
console.log('Smoke layers found:', smokeLayers.length);

// Test scroll to trigger smoke
console.log('\nScrolling to trigger smoke effect...');
window.scrollTo(0, 20);

setTimeout(() => {
    console.log('Smoke background has "show" class:', smokeBg.classList.contains('show'));
    console.log('Smoke background computed opacity:', window.getComputedStyle(smokeBg).opacity);
    
    // Test smoke layer visibility
    smokeLayers.forEach((layer, index) => {
        const styles = window.getComputedStyle(layer);
        console.log(`Smoke layer ${index + 1} - opacity:`, styles.opacity, 'transform:', styles.transform);
    });
    
    // Reset scroll
    window.scrollTo(0, 0);
    console.log('\nScroll reset. Smoke effect should disappear after scrolling down.');
}, 2000);