// Scaling Verification Test Script for GERDSEN AI Website
// This script can be run in browser console to test mobile and ultrawide scaling

console.log('🚀 GERDSEN AI - Scaling Verification Test');
console.log('=====================================');

// Device Detection
const isMobile = window.innerWidth <= 768;
const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
const isUltrawide = window.innerWidth >= 2560;
const deviceType = isMobile ? 'Mobile' : isTablet ? 'Tablet' : isUltrawide ? 'Ultrawide' : 'Desktop';

console.log(`📱 Device Type: ${deviceType}`);
console.log(`📐 Viewport: ${window.innerWidth} x ${window.innerHeight}`);
console.log(`🔄 Orientation: ${window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape'}`);

// Test Functions
function testVideoScaling() {
    console.log('\n🎥 Testing Video Scaling...');
    
    const video = document.querySelector('.background-video');
    if (!video) {
        console.error('❌ Background video not found!');
        return false;
    }
    
    const computedStyle = window.getComputedStyle(video);
    const transform = computedStyle.transform;
    const width = computedStyle.width;
    const height = computedStyle.height;
    const objectFit = computedStyle.objectFit;
    const position = computedStyle.position;
    
    console.log(`   Width: ${width}`);
    console.log(`   Height: ${height}`);
    console.log(`   Object-fit: ${objectFit}`);
    console.log(`   Position: ${position}`);
    console.log(`   Transform: ${transform}`);
    
    // Mobile-specific tests
    if (isMobile) {
        const isCorrectTransform = transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)';
        const isCorrectSize = width.includes('100vw') || width.includes('100%');
        
        if (isCorrectTransform && isCorrectSize) {
            console.log('✅ Mobile video scaling: PASS');
            return true;
        } else {
            console.log('❌ Mobile video scaling: FAIL');
            console.log(`   Expected: transform=none, width=100vw`);
            console.log(`   Actual: transform=${transform}, width=${width}`);
            return false;
        }
    }
    
    // Ultrawide-specific tests
    if (isUltrawide) {
        const isCorrectTransform = transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)';
        const isCorrectSize = width.includes('100vw') || width.includes('100%');
        
        if (isCorrectTransform && isCorrectSize) {
            console.log('✅ Ultrawide video scaling: PASS');
            return true;
        } else {
            console.log('❌ Ultrawide video scaling: FAIL');
            return false;
        }
    }
    
    console.log('✅ Desktop video scaling: PASS');
    return true;
}

function testHeroContentVisibility() {
    console.log('\n👀 Testing Hero Content Visibility...');
    
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (!heroContent || !heroTitle || !heroDescription || !heroButtons) {
        console.error('❌ Hero content elements not found!');
        return false;
    }
    
    const contentStyle = window.getComputedStyle(heroContent);
    const titleStyle = window.getComputedStyle(heroTitle);
    const descStyle = window.getComputedStyle(heroDescription);
    const buttonsStyle = window.getComputedStyle(heroButtons);
    
    console.log(`   Hero Content Opacity: ${contentStyle.opacity}`);
    console.log(`   Hero Content Visibility: ${contentStyle.visibility}`);
    console.log(`   Hero Title Opacity: ${titleStyle.opacity}`);
    console.log(`   Hero Description Opacity: ${descStyle.opacity}`);
    console.log(`   Hero Buttons Opacity: ${buttonsStyle.opacity}`);
    
    // Mobile should have content always visible
    if (isMobile) {
        const isVisible = contentStyle.opacity === '1' && contentStyle.visibility === 'visible';
        const elementsVisible = titleStyle.opacity === '1' && descStyle.opacity === '1' && buttonsStyle.opacity === '1';
        
        if (isVisible && elementsVisible) {
            console.log('✅ Mobile hero content visibility: PASS');
            return true;
        } else {
            console.log('❌ Mobile hero content visibility: FAIL');
            console.log('   On mobile, all hero content should be immediately visible');
            return false;
        }
    }
    
    console.log('✅ Desktop hero content visibility: PASS (scroll-based)');
    return true;
}

function testResponsiveClasses() {
    console.log('\n🎯 Testing Responsive Body Classes...');
    
    const body = document.body;
    const classes = body.classList;
    
    console.log(`   Body classes: ${Array.from(classes).join(', ')}`);
    
    if (isMobile) {
        if (classes.contains('mobile-device')) {
            console.log('✅ Mobile body class: PASS');
            return true;
        } else {
            console.log('❌ Mobile body class: FAIL');
            console.log('   Expected: body should have "mobile-device" class');
            return false;
        }
    }
    
    if (isUltrawide) {
        if (classes.contains('ultrawide-device')) {
            console.log('✅ Ultrawide body class: PASS');
            return true;
        } else {
            console.log('❌ Ultrawide body class: FAIL');
            console.log('   Expected: body should have "ultrawide-device" class');
            return false;
        }
    }
    
    console.log('✅ Desktop body classes: PASS');
    return true;
}

function testViewportConfiguration() {
    console.log('\n📱 Testing Viewport Configuration...');
    
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        console.error('❌ Viewport meta tag not found!');
        return false;
    }
    
    const content = viewportMeta.content;
    console.log(`   Viewport content: ${content}`);
    
    const hasCorrectSettings = content.includes('width=device-width') && 
                              content.includes('initial-scale=1') &&
                              content.includes('maximum-scale=1') &&
                              content.includes('user-scalable=no');
    
    if (hasCorrectSettings) {
        console.log('✅ Viewport configuration: PASS');
        return true;
    } else {
        console.log('❌ Viewport configuration: FAIL');
        console.log('   Expected: width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        return false;
    }
}

function runAllTests() {
    console.log('\n🧪 Running All Scaling Tests...\n');
    
    const results = {
        video: testVideoScaling(),
        content: testHeroContentVisibility(),
        classes: testResponsiveClasses(),
        viewport: testViewportConfiguration()
    };
    
    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    console.log('\n📊 Test Results Summary:');
    console.log('========================');
    console.log(`Device Type: ${deviceType}`);
    console.log(`Passed: ${passed}/${total} tests`);
    
    if (passed === total) {
        console.log('🎉 ALL TESTS PASSED! Scaling is working correctly.');
    } else {
        console.log('⚠️  Some tests failed. Check the details above.');
        
        // Provide quick fixes
        console.log('\n🔧 Quick Fixes:');
        if (!results.video && isMobile) {
            console.log('   - Video scaling issue on mobile detected');
            console.log('   - Try refreshing the page or check CSS overrides');
        }
        if (!results.content && isMobile) {
            console.log('   - Hero content visibility issue on mobile detected');
            console.log('   - Check if mobile-device class is applied to body');
        }
        if (!results.classes) {
            console.log('   - Responsive classes missing');
            console.log('   - JavaScript initialization may have failed');
        }
        if (!results.viewport) {
            console.log('   - Viewport meta tag configuration needs fixing');
        }
    }
    
    return results;
}

// Auto-run tests
setTimeout(() => {
    runAllTests();
}, 1000);

// Export for manual testing
window.gerdsenScalingTest = {
    runAllTests,
    testVideoScaling,
    testHeroContentVisibility,
    testResponsiveClasses,
    testViewportConfiguration,
    deviceInfo: {
        type: deviceType,
        isMobile,
        isTablet,
        isUltrawide,
        viewport: { width: window.innerWidth, height: window.innerHeight }
    }
};

console.log('\n💡 Available commands:');
console.log('   gerdsenScalingTest.runAllTests() - Run all tests');
console.log('   gerdsenScalingTest.deviceInfo - View device information');
