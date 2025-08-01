// Ultrawide diagnostic script
// Run this in the console to diagnose the cutoff issue

console.clear();
console.log('%c🖥️ ULTRAWIDE DIAGNOSTIC', 'color: #0ff; font-size: 20px; font-weight: bold');

// Get key elements
const heroSection = document.querySelector('.hero-section');
const heroContent = document.querySelector('.hero-content');
const video = document.querySelector('.background-video');
const lastTextElement = document.querySelector('.hero-content > *:last-child');

// Get measurements
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const aspectRatio = viewportWidth / viewportHeight;

console.log('\n📐 SCREEN INFO:');
console.log(`Viewport: ${viewportWidth}x${viewportHeight}`);
console.log(`Aspect Ratio: ${aspectRatio.toFixed(2)} (${aspectRatio > 2.33 ? '21:9 Ultra-wide' : aspectRatio > 1.77 ? '16:9 Wide' : 'Standard'})`);

if (heroSection) {
    const heroRect = heroSection.getBoundingClientRect();
    const heroStyles = window.getComputedStyle(heroSection);
    
    console.log('\n🎯 HERO SECTION:');
    console.log(`Height: ${Math.round(heroRect.height)}px`);
    console.log(`Padding Bottom: ${heroStyles.paddingBottom}`);
    console.log(`Min-height: ${heroStyles.minHeight}`);
    console.log(`Display: ${heroStyles.display}`);
    console.log(`Align Items: ${heroStyles.alignItems}`);
}

if (heroContent) {
    const contentRect = heroContent.getBoundingClientRect();
    const contentStyles = window.getComputedStyle(heroContent);
    const bottomPosition = contentRect.bottom;
    const isVisible = bottomPosition <= viewportHeight;
    
    console.log('\n📝 HERO CONTENT:');
    console.log(`Position: top=${Math.round(contentRect.top)}px, bottom=${Math.round(bottomPosition)}px`);
    console.log(`Height: ${Math.round(contentRect.height)}px`);
    console.log(`Margin Bottom: ${contentStyles.marginBottom}`);
    console.log(`Bottom of content: ${Math.round(bottomPosition)}px`);
    console.log(`Viewport height: ${viewportHeight}px`);
    
    if (!isVisible) {
        const overflow = bottomPosition - viewportHeight;
        console.log(`%c❌ CONTENT CUT OFF BY ${overflow}px!`, 'color: #f00; font-weight: bold');
    } else {
        console.log('%c✅ Content fully visible', 'color: #0f0; font-weight: bold');
    }
}

if (video) {
    const videoRect = video.getBoundingClientRect();
    console.log('\n🎥 VIDEO:');
    console.log(`Size: ${Math.round(videoRect.width)}x${Math.round(videoRect.height)}`);
    console.log(`Coverage: ${(videoRect.width/viewportWidth*100).toFixed(0)}% x ${(videoRect.height/viewportHeight*100).toFixed(0)}%`);
}

// Check if specific text is visible
const gerdsenText = Array.from(document.querySelectorAll('*')).find(el => 
    el.textContent.includes('GerdsenAI') && 
    window.getComputedStyle(el).fontSize.includes('rem')
);

if (gerdsenText) {
    const textRect = gerdsenText.getBoundingClientRect();
    console.log('\n📄 "GerdsenAI" TEXT:');
    console.log(`Position: ${Math.round(textRect.top)}px from top`);
    console.log(`Bottom: ${Math.round(textRect.bottom)}px`);
    console.log(`Visible: ${textRect.bottom <= viewportHeight ? '✅ Yes' : '❌ No'}`);
}

// Visual indicator
const indicator = document.createElement('div');
indicator.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 255, 255, 0.8);
    color: black;
    padding: 10px 20px;
    font-family: monospace;
    font-weight: bold;
    z-index: 99999;
    border-radius: 4px 4px 0 0;
`;
indicator.textContent = `${viewportWidth}x${viewportHeight} | AR: ${aspectRatio.toFixed(2)}`;
document.body.appendChild(indicator);

setTimeout(() => indicator.remove(), 5000);

console.log('\n💡 SUGGESTED FIX:');
console.log('The hero section needs more bottom padding on ultrawide displays.');
console.log('Try refreshing the page - the CSS has been updated with better ultrawide support.');