// Apple-style Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    // Fix Jekyll template issues with video sources
    fixVideoSources();
    
    // Initialize single consolidated scroll system
    initConsolidatedScrollSystem();
    
    // Initialize Apple-inspired effects
    initMagneticElements();
    initProductRotation();
    initExpandableSections();
    initImageGallery();
    
    // Initial animation trigger
    triggerInitialAnimations();
});

// Fix video sources for GitHub Pages deployment and ensure proper loading with improved error handling
function fixVideoSources() {
    const videoElements = document.querySelectorAll('video');
    const basePath = window.location.hostname === 'gerdsen.ai' ? '' : '/gerdsen-ai';
    
    // First pass - fix sources
    videoElements.forEach(video => {
        const sources = video.querySelectorAll('source');
        const videoContainer = video.closest('.video-container');
        
        sources.forEach(source => {
            let src = source.getAttribute('src');
            if (!src) return;
            
            // Fix paths for GitHub Pages
            if (src.startsWith('/') && !src.startsWith(basePath)) {
                src = basePath + src;
                source.setAttribute('src', src);
            }
        });
        
        // Add load event listener to mark videos as loaded
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
            
            // If it's a hero video, mark the hero section as video-loaded
            if (video.closest('.hero-section')) {
                const heroSection = video.closest('.hero-section');
                heroSection.classList.add('video-loaded');
                console.log('Hero video loaded successfully');
            }
        });
        
        // Enhanced error handling
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            
            // Add fallback background if video fails to load
            if (videoContainer) {
                videoContainer.classList.add('video-error');
                
                // Apply a gradient background as fallback
                videoContainer.style.background = 'linear-gradient(135deg, #000 0%, #222 50%, #000 100%)';
                
                // Show error message only in development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'video-error-message';
                    errorMsg.textContent = 'Video could not be loaded. Please check the console for details.';
                    errorMsg.style.position = 'absolute';
                    errorMsg.style.bottom = '10px';
                    errorMsg.style.left = '10px';
                    errorMsg.style.color = 'rgba(255,255,255,0.7)';
                    errorMsg.style.fontSize = '12px';
                    errorMsg.style.padding = '5px';
                    errorMsg.style.zIndex = '10';
                    videoContainer.appendChild(errorMsg);
                }
            }
        });
        
        // Add accessibility controls for videos
        addVideoControls(video, videoContainer);
        
        // Force video reload
        video.load();
        
        // Attempt to play the video with improved mobile handling
        playVideoWithFallbacks(video);
    });
}

// Add accessibility controls to videos
function addVideoControls(video, container) {
    // Skip if container doesn't exist
    if (!container) return;
    
    // Create control button
    const controlBtn = document.createElement('button');
    controlBtn.className = 'video-controls';
    controlBtn.setAttribute('aria-label', 'Toggle video playback');
    controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
    
    // Add button to container
    container.appendChild(controlBtn);
    
    // Toggle play/pause on button click
    controlBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            controlBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    // Update button state when video state changes
    video.addEventListener('play', () => {
        controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    video.addEventListener('pause', () => {
        controlBtn.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    // Hide controls initially
    controlBtn.style.opacity = '0';
    
    // Show controls on hover
    container.addEventListener('mouseenter', () => {
        controlBtn.style.opacity = '0.7';
    });
    
    container.addEventListener('mouseleave', () => {
        controlBtn.style.opacity = '0';
    });
}

// Play video with improved fallbacks and mobile handling
function playVideoWithFallbacks(video) {
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Different handling based on device type
    if (isMobile) {
        // On mobile, only attempt to play hero videos automatically
        if (video.closest('.hero-section')) {
            attemptPlayback(video);
        } else {
            // For non-hero videos on mobile, wait until they're in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        attemptPlayback(video);
                        observer.unobserve(video);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(video);
        }
    } else {
        // On desktop, attempt to play all videos
        attemptPlayback(video);
    }
}

// Helper function to attempt video playback
function attemptPlayback(video) {
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Video autoplay issue:', error);
            
            // Mark video as having autoplay issues
            video.setAttribute('data-autoplay-failed', 'true');
            
            // Add user interaction detection for autoplay issues
            document.addEventListener('click', () => {
                if (video.getAttribute('data-autoplay-failed') === 'true') {
                    video.play().then(() => {
                        video.removeAttribute('data-autoplay-failed');
                    }).catch(e => console.log('Still cannot play video:', e));
                }
            }, { once: true });
        });
    }
}

// Consolidated Scroll System - Single handler for all scroll effects
function initConsolidatedScrollSystem() {
    // Cache DOM elements
    const heroSection = document.querySelector('.hero-section');
    const heroVideo = document.querySelector('.hero-section .background-video');
    const heroContent = document.querySelector('.hero-section .hero-content');
    const nav = document.querySelector('nav');
    const animElements = document.querySelectorAll('[data-scroll-fade], .service-card, .bento-item, .feature-item');
    const parallaxItems = document.querySelectorAll('[data-video-parallax], .section-title, .hero-title, .hero-description');
    const colorSections = document.querySelectorAll('.color-transition');
    
    let lastScrollY = 0;
    const heroVideoTransitionPoint = window.innerHeight * 0.01; // First mm of scroll triggers blur
    
    // Single consolidated scroll handler
    const masterScrollHandler = throttle(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // 1. HERO SECTION MANAGEMENT
        if (heroSection) {
            if (scrollY > heroVideoTransitionPoint / 2) {
                heroSection.classList.add('scrolled');
            } else {
                heroSection.classList.remove('scrolled');
            }
        }
        
        // 2. NAVIGATION EFFECTS - Keep stationary
        if (nav) {
            if (scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            // Navigation stays fixed - no movement
        }
        
        // 3. ELEMENT ANIMATIONS (fade in on scroll)
        animElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            
            const distanceFromTop = scrollY + windowHeight - elementTop;
            const scrollProgress = Math.min(Math.max(distanceFromTop / (windowHeight + rect.height), 0), 1);
            
            if (scrollProgress > 0) {
                element.classList.add('in-view');
                const yTransform = (1 - scrollProgress) * 30;
                const opacityValue = Math.min(scrollProgress * 1.3, 1);
                
                element.style.transform = `translate3d(0, ${yTransform}px, 0)`;
                element.style.opacity = opacityValue;
            }
        });
        
        // 4. VIDEO PARALLAX EFFECTS - Immediate blur/scale/dim on first scroll
        if (heroVideo && heroSection) {
            const rect = heroSection.getBoundingClientRect();
            
            if (scrollY < heroVideoTransitionPoint) {
                const yPos = -(rect.top * 0.2);
                const initialScale = 1.15 - (scrollY / heroVideoTransitionPoint) * 0.35; // Even faster scale reduction
                const initialBlur = (scrollY / heroVideoTransitionPoint) * 12; // More aggressive blur
                
                heroVideo.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), 0) scale(${initialScale})`;
                heroVideo.style.filter = `blur(${initialBlur}px)`;
                heroVideo.style.opacity = 1 - (scrollY / heroVideoTransitionPoint) * 0.75; // More dimming
            } else {
                const progressBeyondTransition = Math.min((scrollY - heroVideoTransitionPoint) / (windowHeight * 0.3), 1);
                const scaleValue = 0.8 - progressBeyondTransition * 0.2; // Even smaller final scale
                const blurValue = 12 + progressBeyondTransition * 15; // Heavier blur
                const opacityValue = 0.25 - progressBeyondTransition * 0.15; // Much more dimmed
                
                heroVideo.style.transform = `translate3d(-50%, -50%, 0) scale(${scaleValue})`;
                heroVideo.style.filter = `blur(${blurValue}px)`;
                heroVideo.style.opacity = opacityValue;
            }
        }
        
        // 5. HERO TEXT VISIBILITY - Synced with video blur timing
        if (heroContent) {
            if (scrollY > heroVideoTransitionPoint * 0.5) {
                // Text becomes visible as video blurs - CSS handles centering
                heroContent.style.opacity = '1';
            } else {
                // Text starts invisible - phases in with video blur
                const progress = scrollY / (heroVideoTransitionPoint * 0.5);
                const opacityValue = Math.min(progress * 2, 1); // Faster fade-in
                heroContent.style.opacity = opacityValue;
            }
        }
        
        // 6. COLOR TRANSITIONS
        colorSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const visiblePercentage = Math.min(
                Math.max(0, (windowHeight - rect.top) / windowHeight),
                1
            );
            
            if (visiblePercentage > 0.5) {
                section.classList.add('light');
            } else {
                section.classList.remove('light');
            }
        });
        
        lastScrollY = scrollY;
    }, 10); // 10ms throttle for smooth 60fps performance
    
    // Attach single scroll listener
    window.addEventListener('scroll', masterScrollHandler);
    window.addEventListener('resize', masterScrollHandler);
    
    // Initial call
    masterScrollHandler();
}

// Legacy function kept for compatibility - now empty
function initScrollBasedAnimations() {
    // This function is now handled by initConsolidatedScrollSystem()
}

// Advanced Parallax System - Legacy function, now handled by consolidated system
function initAdvancedParallax() {
    // This function is now handled by initConsolidatedScrollSystem()
}

// Enhanced Navigation Effects - Legacy function, now handled by consolidated system  
function initNavigation() {
    // This function is now handled by initConsolidatedScrollSystem()
}

// Dynamic Color Transitions - Legacy function, now handled by consolidated system
function initDynamicColorTransitions() {
    // This function is now handled by initConsolidatedScrollSystem()
}



// Enhanced Initial Animations with Apple-style Sequence
function triggerInitialAnimations() {
    // Create particles for hero section
    createParticleEffect();
    
    // Initial state: video prominently displayed, text initially hidden
    const heroSection = document.querySelector('.hero-section');
    const heroVideo = document.querySelector('.hero-section .background-video');
    const heroContent = document.querySelector('.hero-section .hero-content');
    
    // Ensure hero content is hidden initially
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translate3d(0, 30px, -20px)';
    }
    
    if (heroVideo) {
        // Set initial video state - large, clear, and prominent
        heroVideo.style.opacity = '1'; // Fully visible initially
        heroVideo.style.transform = 'translate(-50%, -50%) scale(1.15)';
        heroVideo.style.filter = 'blur(0px)';
    }
    
    // Staggered animation for hero elements only after scroll
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section [data-scroll-fade]');
        heroElements.forEach((el, index) => {
            // Initially make sure these are invisible until scroll
            el.style.opacity = '0';
            el.style.transform = 'translate3d(0, 30px, -20px)';
            
            // We'll trigger their visibility on scroll instead of immediately
            setTimeout(() => {
                el.classList.add('in-view');
            }, index * 200); // Stagger effect
        });
    }, 500); // Delayed start to ensure video is loaded
    
    // Add animation classes to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-ready');
    });
    
    // Initialize all video backgrounds with priority loading for hero
    // We already have a heroVideo variable, so no need to redeclare it
    // Load and play the hero video if it exists
    if (heroVideo) {
        heroVideo.load();
        heroVideo.play()
            .then(() => {
                heroVideo.classList.add('loaded');
                document.querySelector('.hero-section').classList.add('video-loaded');
            })
            .catch(e => console.log('Hero video autoplay issue:', e));
    }
    
    // Load other videos with lower priority
    setTimeout(() => {
        document.querySelectorAll(':not(.hero-section) .background-video').forEach(video => {
            video.load();
            video.play().catch(e => console.log('Video autoplay issue:', e));
            
            // Add loaded class after video starts playing
            video.addEventListener('playing', () => {
                video.classList.add('loaded');
            });
        });
    }, 1000);
    
    // Reveal any dynamic content that should be shown immediately
    setTimeout(() => {
        document.querySelectorAll('.reveal-content').forEach(el => {
            el.classList.add('active');
        });
    }, 800);
}

// Create particle effect for hero section smoke/particles
function createParticleEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Create particle container if it doesn't exist
    if (!document.querySelector('.particles-container')) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        heroSection.appendChild(particlesContainer);
        
        // Create multiple particle elements
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomize initial position and animation properties
            const size = Math.random() * 60 + 40; // 40-100px
            const posX = Math.random() * 120 - 10; // -10% to 110%
            const posY = Math.random() * 120 - 10; // -10% to 110%
            const delay = Math.random() * 5; // 0-5s delay
            const duration = Math.random() * 15 + 10; // 10-25s animation
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
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

// Performance Optimization - Enhanced Throttle
function throttle(func, wait = 16) {
    let timeout = null;
    let previous = 0;
    
    return function(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// Enhanced Video Loading Optimization
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.background-video');
    
    // Detect connection speed
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection && connection.saveData;
    const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    
    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    videos.forEach(video => {
        // Check for slow connection or save-data mode
        if (isSaveData || isSlowConnection) {
            // Show a message about data saving mode if needed
            const container = video.closest('.video-container');
            if (container) {
                container.classList.add('video-data-saving');
                container.style.background = 'linear-gradient(135deg, #000 0%, #111 50%, #000 100%)';
                
                // Create static image fallback
                const staticImage = document.createElement('div');
                staticImage.className = 'static-fallback';
                staticImage.style.position = 'absolute';
                staticImage.style.top = '0';
                staticImage.style.left = '0';
                staticImage.style.width = '100%';
                staticImage.style.height = '100%';
                staticImage.style.background = 'radial-gradient(ellipse at center, rgba(0,122,255,0.1) 0%, rgba(0,0,0,0) 70%)';
                container.appendChild(staticImage);
            }
            
            // Prevent video loading
            video.setAttribute('preload', 'none');
            video.pause();
            
            console.log('Video loading disabled due to data saving mode or slow connection');
            return;
        }
        
        // Mobile optimization - lower quality for mobile
        if (isMobile) {
            // Add data-mobile attribute to mark for potential quality switching
            video.setAttribute('data-mobile', 'true');
            
            // Mobile-specific optimizations can be added here
            // For example, we could switch to a lower quality video source for mobile
        }
        
        // Optimize video loading with visibility detection
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Only load when in viewport
                    entry.target.classList.add('loaded');
                    
                    // Attempt to play only when visible
                    entry.target.play().catch(e => {
                        console.log('Video autoplay failed:', e);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video);
        
        // Handle loadeddata event
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

// Apple-style Magnetic Elements (like buttons on Apple.com)
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic, .button-primary.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate distance from center (0-1)
            const distance = Math.sqrt(x*x + y*y);
            const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
            const normalizedDistance = Math.min(distance / maxDistance, 1);
            
            // Calculate rotation and movement amounts (stronger when closer to center)
            const strength = 15; // Max movement in pixels
            const rotateStrength = 2; // Max rotation in degrees
            const moveX = x * (strength * (1 - normalizedDistance*0.5)) / rect.width;
            const moveY = y * (strength * (1 - normalizedDistance*0.5)) / rect.height;
            const rotateX = -moveY * rotateStrength;
            const rotateY = moveX * rotateStrength;
            
            // Apply transforms with cubic-bezier easing (Apple-style)
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) translateX(${moveX}px) translateY(${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            // Reset transforms with smooth transition back
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) translateX(0) translateY(0)';
        });
    });
}

// Apple-style Product Rotation (like Mac Studio 360 view)
function initProductRotation() {
    const productElements = document.querySelectorAll('.product-rotate');
    
    productElements.forEach(element => {
        let isRotating = false;
        let startX = 0;
        let currentRotation = 0;
        
        // For mouse drag rotation
        element.addEventListener('mousedown', (e) => {
            isRotating = true;
            startX = e.clientX;
            element.style.transition = 'none'; // Disable transition for smooth dragging
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isRotating) return;
            
            const deltaX = e.clientX - startX;
            const rotationAmount = deltaX * 0.5; // Adjust rotation sensitivity
            
            element.style.transform = `rotateY(${currentRotation + rotationAmount}deg)`;
        });
        
        document.addEventListener('mouseup', (e) => {
            if (!isRotating) return;
            
            isRotating = false;
            currentRotation = currentRotation + ((e.clientX - startX) * 0.5);
            startX = 0;
            element.style.transition = 'transform 0.5s cubic-bezier(0.42, 0, 0.58, 1)';
        });
        
        // Product rotation on scroll removed to prevent conflicts with consolidated scroll system
    });
}

// Apple-style Expandable Sections (like tech specs on product pages)
function initExpandableSections() {
    const expandableSections = document.querySelectorAll('.expandable-section');
    
    expandableSections.forEach(section => {
        const header = section.querySelector('.expandable-header');
        const content = section.querySelector('.expandable-content');
        
        header.addEventListener('click', () => {
            // Toggle the open class
            const isOpen = section.classList.toggle('open');
            
            // Set maximum height for animation
            if (isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Apple-style Image Gallery (like product galleries)
function initImageGallery() {
    const galleries = document.querySelectorAll('.image-gallery');
    
    galleries.forEach(gallery => {
        const container = gallery.querySelector('.gallery-container');
        const items = gallery.querySelectorAll('.gallery-item');
        const dots = gallery.querySelectorAll('.gallery-dot');
        
        // Skip if no items
        if (items.length === 0) return;
        
        // Set up click events for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active dot
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Slide to the selected image
                container.style.transform = `translateX(-${index * 100}%)`;
            });
        });
        
        // Set first dot as active initially
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
        
        // Touch/swipe support
        let startX = 0;
        let currentIndex = 0;
        
        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        gallery.addEventListener('touchend', (e) => {
            const diffX = startX - e.changedTouches[0].clientX;
            
            // Detect if it was a significant swipe
            if (Math.abs(diffX) > 50) {
                if (diffX > 0 && currentIndex < items.length - 1) {
                    // Swipe left, go to next
                    currentIndex++;
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe right, go to previous
                    currentIndex--;
                }
                
                // Update the gallery
                container.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update dots
                dots.forEach(d => d.classList.remove('active'));
                if (dots[currentIndex]) {
                    dots[currentIndex].classList.add('active');
                }
            }
        }, { passive: true });
    });
}

// Apple-style Dynamic Color Transitions
