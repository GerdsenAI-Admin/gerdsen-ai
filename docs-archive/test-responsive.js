// Comprehensive test for header dynamics and video coverage
console.clear();
console.log('%c=== GERDSEN AI RESPONSIVE TEST ===', 'color: #0f0; font-size: 18px; font-weight: bold');

// Test 1: Header Text Sizing
console.log('\n%c📏 HEADER TEXT SIZING TEST', 'color: #fff; font-size: 16px; font-weight: bold');

const navLogo = document.querySelector('.nav-logo');
const navLinks = document.querySelectorAll('.nav-link');

if (navLogo) {
    const logoStyles = window.getComputedStyle(navLogo);
    console.log('Logo font-size:', logoStyles.fontSize);
    console.log('Logo computed styles:', {
        fontSize: logoStyles.fontSize,
        fontFamily: logoStyles.fontFamily.split(',')[0],
        color: logoStyles.color
    });
}

if (navLinks.length > 0) {
    const linkStyles = window.getComputedStyle(navLinks[0]);
    console.log('\nNav link font-size:', linkStyles.fontSize);
}

// Test 2: Video Coverage
console.log('\n%c🎥 VIDEO COVERAGE TEST', 'color: #fff; font-size: 16px; font-weight: bold');

const video = document.querySelector('.background-video');
const videoContainer = document.querySelector('.video-container');
const heroSection = document.querySelector('.hero-section');

if (video) {
    const videoRect = video.getBoundingClientRect();
    const containerRect = videoContainer.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const aspectRatio = viewportWidth / viewportHeight;
    
    console.log('\nViewport:', {
        width: viewportWidth,
        height: viewportHeight,
        aspectRatio: aspectRatio.toFixed(2),
        aspectType: aspectRatio > 2.33 ? 'Ultra-wide (21:9+)' : aspectRatio > 1.77 ? 'Wide (16:9+)' : 'Standard'
    });
    
    console.log('\nVideo coverage:', {
        videoWidth: videoRect.width,
        videoHeight: videoRect.height,
        containerWidth: containerRect.width,
        containerHeight: containerRect.height,
        horizontalCoverage: ((videoRect.width / viewportWidth) * 100).toFixed(1) + '%',
        verticalCoverage: ((videoRect.height / viewportHeight) * 100).toFixed(1) + '%',
        transform: window.getComputedStyle(video).transform
    });
    
    // Check if video fully covers viewport
    const coversHorizontally = videoRect.width >= viewportWidth;
    const coversVertically = videoRect.height >= viewportHeight;
    
    console.log('\n✅ Coverage check:', {
        coversHorizontally: coversHorizontally ? '✅ YES' : '❌ NO',
        coversVertically: coversVertically ? '✅ YES' : '❌ NO',
        hasBlackBars: (!coversHorizontally || !coversVertically) ? '❌ BLACK BARS VISIBLE' : '✅ NO BLACK BARS'
    });
}

// Test 3: Dynamic Resizing
console.log('\n%c🔄 DYNAMIC RESIZE TEST', 'color: #fff; font-size: 16px; font-weight: bold');

function testAtWidth(width) {
    // Temporarily resize viewport
    const originalWidth = window.innerWidth;
    const scale = width / originalWidth;
    
    console.log(`\nSimulating ${width}px width:`);
    
    // Calculate what font sizes should be at this width
    const expectedLogoSize = Math.max(16, Math.min(28, 24 + (width * 0.015))); // Based on clamp formula
    const expectedLinkSize = Math.max(14, Math.min(18, 8 + (width * 0.01))); // Based on clamp formula
    
    console.log(`- Expected logo size: ~${expectedLogoSize.toFixed(0)}px`);
    console.log(`- Expected link size: ~${expectedLinkSize.toFixed(0)}px`);
}

testAtWidth(768);  // Tablet
testAtWidth(1024); // Desktop
testAtWidth(1920); // Large screen
testAtWidth(2560); // Ultra-wide

// Test 4: Live resize listener
console.log('\n%c👀 RESIZE THE WINDOW TO SEE LIVE UPDATES', 'color: #ff0; font-size: 14px');

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('\n--- Window Resized ---');
        console.log('New dimensions:', window.innerWidth + 'x' + window.innerHeight);
        if (navLogo) {
            console.log('Logo font-size:', window.getComputedStyle(navLogo).fontSize);
        }
        if (video) {
            const videoRect = video.getBoundingClientRect();
            console.log('Video coverage:', {
                width: videoRect.width,
                height: videoRect.height,
                coversViewport: (videoRect.width >= window.innerWidth && videoRect.height >= window.innerHeight) ? '✅' : '❌'
            });
        }
    }, 250);
});

console.log('\n%c✨ Test complete! Resize window to see dynamic changes.', 'color: #0f0; font-size: 14px');