// Quick test script to verify website states
// Copy and paste this into the browser console

function testWebsiteStates() {
    console.clear();
    console.log('%c=== GERDSEN AI WEBSITE STATE TEST ===', 'color: #0f0; font-size: 16px; font-weight: bold');
    
    // Get elements
    const video = document.querySelector('.background-video');
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero-section');
    
    if (!video || !heroContent || !heroSection) {
        console.error('❌ Required elements not found!');
        return;
    }
    
    // Test initial state
    console.log('\n%c📍 INITIAL STATE (scroll = 0):', 'color: #fff; font-weight: bold');
    window.scrollTo(0, 0);
    
    setTimeout(() => {
        const videoStyles = window.getComputedStyle(video);
        const heroStyles = window.getComputedStyle(heroContent);
        
        console.log('Video opacity:', videoStyles.opacity, videoStyles.opacity === '1' ? '✅' : '❌ (should be 1)');
        console.log('Video filter:', videoStyles.filter, videoStyles.filter === 'brightness(1)' ? '✅' : '❌ (should be brightness(1))');
        console.log('Video object-fit:', videoStyles.objectFit, videoStyles.objectFit === 'cover' ? '✅' : '❌ (should be cover)');
        console.log('Content opacity:', heroStyles.opacity, heroStyles.opacity === '0' ? '✅' : '❌ (should be 0)');
        console.log('Content visibility:', heroStyles.visibility, heroStyles.visibility === 'hidden' ? '✅' : '❌ (should be hidden)');
        console.log('Has scrolled class:', heroSection.classList.contains('scrolled'), !heroSection.classList.contains('scrolled') ? '✅' : '❌ (should be false)');
        
        // Test scrolled state
        console.log('\n%c📍 SCROLLED STATE (scroll = 20px):', 'color: #fff; font-weight: bold');
        window.scrollTo(0, 20);
        
        setTimeout(() => {
            const scrolledVideoStyles = window.getComputedStyle(video);
            const scrolledHeroStyles = window.getComputedStyle(heroContent);
            
            console.log('Video opacity:', scrolledVideoStyles.opacity, scrolledVideoStyles.opacity === '0.3' ? '✅' : '❌ (should be 0.3)');
            console.log('Video filter:', scrolledVideoStyles.filter, scrolledVideoStyles.filter.includes('blur') ? '✅' : '❌ (should include blur)');
            console.log('Content opacity:', scrolledHeroStyles.opacity, scrolledHeroStyles.opacity === '1' ? '✅' : '❌ (should be 1)');
            console.log('Content visibility:', scrolledHeroStyles.visibility, scrolledHeroStyles.visibility === 'visible' ? '✅' : '❌ (should be visible)');
            console.log('Has scrolled class:', heroSection.classList.contains('scrolled'), heroSection.classList.contains('scrolled') ? '✅' : '❌ (should be true)');
            
            // Summary
            console.log('\n%c📊 SUMMARY:', 'color: #ff0; font-size: 14px; font-weight: bold');
            console.log('Initial state: Video should be bright and content hidden');
            console.log('Scrolled state: Video should be dimmed/blurred and content visible');
            
            // Reset
            window.scrollTo(0, 0);
            console.log('\n%c✨ Test complete! Scroll position reset.', 'color: #0f0');
        }, 1000);
    }, 100);
}

// Run the test
testWebsiteStates();