// Apple-style Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    initVideoParallax();
    initNavigation();
    
    // Initial animation trigger
    triggerInitialAnimations();
});

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all fade elements
    document.querySelectorAll('[data-scroll-fade]').forEach(el => {
        observer.observe(el);
    });
}

// Video Parallax Effect
function initVideoParallax() {
    const videos = document.querySelectorAll('[data-video-parallax]');
    let ticking = false;
    
    function updateVideoParallax() {
        const scrolled = window.pageYOffset;
        
        videos.forEach((video, index) => {
            const section = video.closest('[data-video-section]');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const speed = 0.5;
            
            // Calculate parallax offset
            const yPos = -(rect.top * speed);
            
            // Apply transform with scale
            const scale = 1.1 + (Math.abs(rect.top) / window.innerHeight) * 0.1;
            video.style.transform = `translate(-50%, calc(-50% + ${yPos}px)) scale(${Math.min(scale, 1.3)})`;
            
            // Adjust opacity based on scroll position
            const opacity = 0.6 - (Math.abs(rect.top) / window.innerHeight) * 0.3;
            video.style.opacity = Math.max(0.3, Math.min(0.6, opacity));
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateVideoParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
    
    // Initial call
    updateVideoParallax();
}

// Navigation Effects
function initNavigation() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Trigger Initial Animations
function triggerInitialAnimations() {
    // Animate hero content on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section [data-scroll-fade]');
        heroElements.forEach(el => {
            el.classList.add('in-view');
        });
    }, 100);
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Performance Optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Video Loading Optimization
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.background-video');
    
    videos.forEach(video => {
        // Ensure videos start playing
        video.play().catch(e => {
            console.log('Video autoplay failed:', e);
        });
        
        // Optimize video loading
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
    });
});

// Disable right-click on videos (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'VIDEO') {
        e.preventDefault();
    }
});

// Handle Mobile Touch Events for Better Performance
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndY < touchStartY - 50) {
        // Swiped up
    }
    if (touchEndY > touchStartY + 50) {
        // Swiped down
    }
}