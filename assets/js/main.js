// Apple-style Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    // Fix Jekyll template issues with video sources
    fixVideoSources();
    
    // Initialize animation systems
    initScrollBasedAnimations();
    initAdvancedParallax();
    initNavigation();
    
    // Initialize Apple-inspired effects
    initMagneticElements();
    initProductRotation();
    initExpandableSections();
    initImageGallery();
    initDynamicColorTransitions();
    
    // Initial animation trigger
    triggerInitialAnimations();
});

// Fix video sources for GitHub Pages deployment and ensure proper loading
function fixVideoSources() {
    const videoElements = document.querySelectorAll('video');
    const basePath = window.location.hostname === 'gerdsen.ai' ? '' : '/gerdsen-ai';
    
    // First pass - fix sources
    videoElements.forEach(video => {
        const sources = video.querySelectorAll('source');
        
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
        
        // Add error handling for debugging
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
        });
        
        // Force video reload
        video.load();
        
        // Attempt to play the video
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Video autoplay issue:', error);
                // Add user interaction detection for autoplay issues
                document.addEventListener('click', () => {
                    video.play().catch(e => console.log('Still cannot play video:', e));
                }, { once: true });
            });
        }
    });
}

// Advanced Scroll-Based Animations - Apple Style
function initScrollBasedAnimations() {
    // Track all animatable elements
    const animElements = document.querySelectorAll('[data-scroll-fade], .service-card, .bento-item, .feature-item');
    
    // Create a throttled scroll handler
    const scrollHandler = throttle(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Process each element
        animElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementVisible = 150; // Trigger point
            
            // Calculate scroll progress (0 to 1)
            const distanceFromTop = window.scrollY + windowHeight - elementTop;
            const scrollProgress = Math.min(Math.max(distanceFromTop / (windowHeight + rect.height), 0), 1);
            
            // Apply different effects based on element type
            if (scrollProgress > 0) {
                // Set the element as in view
                element.classList.add('in-view');
                
                // Apply scroll-linked animations - transform based on scroll progress
                const yTransform = (1 - scrollProgress) * 30; // Start at 30px up, end at 0
                const opacityValue = Math.min(scrollProgress * 1.3, 1); // Opacity from 0 to 1
                
                // Apply transforms with slight variations based on element position
                const xOffset = element.dataset.scrollDirection === 'left' ? -20 * (1-scrollProgress) : 
                               (element.dataset.scrollDirection === 'right' ? 20 * (1-scrollProgress) : 0);
                
                // Apply 3D transform for depth effect
                element.style.transform = `translate3d(${xOffset}px, ${yTransform}px, 0)`;
                element.style.opacity = opacityValue;
            }
        });
    }, 15); // Throttle to ~60fps
    
    // Assign varied directional movement to elements for more dynamic effect
    const directions = ['left', 'right', ''];
    const delayValues = [0, 100, 200, 300, 400];
    
    animElements.forEach((el, index) => {
        // Assign random direction for varied movement
        const direction = directions[index % directions.length];
        if (direction) {
            el.dataset.scrollDirection = direction;
        }
        
        // Assign staggered delay
        const delayIndex = index % delayValues.length;
        el.style.transitionDelay = `${delayValues[delayIndex]}ms`;
    });
    
    // Add scroll event
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', scrollHandler);
    
    // Initial call
    scrollHandler();
}

// Advanced Parallax System with Apple-style Animation Sequence
function initAdvancedParallax() {
    const parallaxItems = document.querySelectorAll('[data-video-parallax], .section-title, .hero-title, .hero-description');
    let lastScrollY = 0;
    const heroVideoTransitionPoint = window.innerHeight * 0.15; // Lower transition point to show effect sooner
    
    // Create a scroll handler for smooth parallax with enhanced sequence
    const parallaxHandler = throttle(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // Add/remove scrolled class for hero section based on scroll position
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            if (scrollY > heroVideoTransitionPoint / 2) {
                heroSection.classList.add('scrolled');
            } else {
                heroSection.classList.remove('scrolled');
            }
        }
        
        // Process hero video backgrounds - enhanced sequence animation
        document.querySelectorAll('.hero-section [data-video-parallax]').forEach((video) => {
            const section = video.closest('[data-video-section]');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const scrollProgress = Math.min(Math.abs(rect.top) / (windowHeight * 0.5), 1);
            
            // Animation Phases:
            // 1. Initial state - full scale prominent video (large, clear)
            // 2. As scroll begins - video starts to blur and recede while text becomes visible
            // 3. At transition point - video continues to blur and move back in z-space
            // 4. After transition - particles/smoke effects visible with video as background
            
            if (scrollY < heroVideoTransitionPoint) {
                // Phase 1-2: Initial to scroll begins - start with large clear video
                const yPos = -(rect.top * 0.2); // Slight parallax effect
                const initialScale = 1.15 - (scrollY / heroVideoTransitionPoint) * 0.05; // Start larger, slightly reduce
                const initialBlur = (scrollY / heroVideoTransitionPoint) * 2; // Start adding slight blur
                const zPos = -(scrollY / heroVideoTransitionPoint) * 10; // Start moving back slightly
                
                video.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), ${zPos}px) scale(${initialScale})`;
                video.style.filter = `blur(${initialBlur}px)`;
                video.style.opacity = 1 - (scrollY / heroVideoTransitionPoint) * 0.3; // Start with full opacity
            } else {
                // Phase 3-4: More pronounced transition effect
                const progressBeyondTransition = Math.min((scrollY - heroVideoTransitionPoint) / (windowHeight * 0.3), 1);
                const scaleValue = 1.1 - progressBeyondTransition * 0.15; // Reduce from 1.1 to 0.95
                const blurValue = 2 + progressBeyondTransition * 6; // Increase blur from 2px to 8px
                const zOffset = -10 - progressBeyondTransition * 40; // Move further back in z-space
                const yOffset = progressBeyondTransition * -20; // Slight move up as it recedes
                const opacityValue = 0.7 - progressBeyondTransition * 0.2; // More pronounced fade
                
                video.style.transform = `translate3d(-50%, calc(-50% + ${yOffset}px), ${zOffset}px) scale(${scaleValue})`;
                video.style.filter = `blur(${blurValue}px)`;
                video.style.opacity = opacityValue;
                
                // Add smoke/particle effect when sufficiently scrolled
                if (progressBeyondTransition > 0.3 && !section.classList.contains('show-particles')) {
                    section.classList.add('show-particles');
                } else if (progressBeyondTransition <= 0.2 && section.classList.contains('show-particles')) {
                    section.classList.remove('show-particles');
                }
            }
        });
        
        // Process other video backgrounds normally
        document.querySelectorAll(':not(.hero-section) [data-video-parallax]').forEach((video) => {
            const section = video.closest('[data-video-section]');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            
            // Standard parallax for non-hero videos
            const speed = 0.5;
            const yPos = -(rect.top * speed);
            const scale = 1.1 + (Math.abs(rect.top) / windowHeight) * 0.15;
            const depthOffset = Math.abs(rect.top) / windowHeight * 30;
            
            video.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), ${-depthOffset}px) scale(${Math.min(scale, 1.4)})`;
            video.style.opacity = Math.max(0.3, Math.min(0.65, 0.65 - (Math.abs(rect.top) / windowHeight) * 0.35));
        });
        
        // Process text elements for enhanced floating effect
        parallaxItems.forEach(item => {
            if (item.hasAttribute('data-video-parallax')) return; // Skip videos
            
            const section = item.closest('section');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            
            // Different speeds and effects for different elements
            if (item.classList.contains('hero-title') || item.classList.contains('hero-description') || 
                item.classList.contains('hero-buttons')) {
                // Special animation for hero text elements - initially hidden, then appear on scroll
                const scrollProgress = Math.min(Math.abs(rect.top) / (windowHeight * 0.6), 1);
                
                if (scrollY < heroVideoTransitionPoint * 0.5) {
                    // Phase 1: Text hidden initially
                    const initialProgress = Math.min(scrollY / (heroVideoTransitionPoint * 0.5), 1);
                    const yOffset = 30 * (1 - initialProgress);
                    const opacityValue = Math.min(initialProgress * 2, 0.3); // Start appearing but faintly
                    const zOffset = -20 + initialProgress * 10; // Move from back to front
                    
                    item.style.transform = `translate3d(0, ${yOffset}px, ${zOffset}px)`;
                    item.style.opacity = opacityValue;
                } else if (scrollY < heroVideoTransitionPoint * 3) {
                    // Phase 2-3: Text becomes fully visible as video blurs
                    const visibleProgress = Math.min((scrollY - heroVideoTransitionPoint * 0.5) / (heroVideoTransitionPoint * 1.5), 1);
                    const zOffset = -10 + visibleProgress * 30; // Continue moving forward in z-space
                    const opacityValue = 0.3 + visibleProgress * 0.7; // Increase opacity to full
                    
                    item.style.transform = `translate3d(0, 0, ${zOffset}px)`;
                    item.style.opacity = opacityValue;
                } else {
                    // Phase 4: Text stays visible but starts subtle fade as user scrolls far down
                    const exitProgress = Math.min((scrollY - heroVideoTransitionPoint * 3) / (windowHeight * 0.5), 1);
                    const yOffset = -20 * exitProgress;
                    const opacityValue = 1 - exitProgress * 0.3;
                    
                    item.style.transform = `translate3d(0, ${yOffset}px, 20px)`;
                    item.style.opacity = opacityValue;
                }
            } else {
                // Standard parallax for other text elements
                const speed = item.classList.contains('section-title') ? 0.15 : 0.1;
                
                // Only apply if in view with some margin
                if (rect.top < windowHeight + 100 && rect.bottom > -100) {
                    const yPos = -(rect.top * speed);
                    item.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            }
        });
        
        lastScrollY = scrollY;
    }, 10);
    
    window.addEventListener('scroll', parallaxHandler);
    window.addEventListener('resize', parallaxHandler);
    
    // Initial call
    parallaxHandler();
}

// Enhanced Navigation Effects
function initNavigation() {
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    const navHandler = throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add glass effect when scrolled
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
            // Add subtle parallax to navigation
            nav.style.transform = `translate3d(0, ${currentScroll * 0.02}px, 0)`;
        } else {
            nav.classList.remove('scrolled');
            nav.style.transform = 'translate3d(0, 0, 0)';
        }
        
        // Hide/show based on scroll direction (like Apple)
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide nav
            nav.style.top = '-80px';
        } else {
            // Scrolling up - show nav
            nav.style.top = '0';
        }
        
        lastScroll = currentScroll;
    }, 10);
    
    window.addEventListener('scroll', navHandler);
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
        heroContent.style.zIndex = '1'; // Lower z-index initially
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
        
        // For automatic rotation on scroll
        window.addEventListener('scroll', () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Only rotate when element is in view
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollPosition = window.scrollY;
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                
                // Calculate rotation based on scroll position
                const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
                const rotationValue = scrollPercentage * 360; // Full 360-degree rotation
                
                element.style.transform = `rotateY(${rotationValue}deg)`;
            }
        });
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
function initDynamicColorTransitions() {
    const colorSections = document.querySelectorAll('.color-transition');
    
    window.addEventListener('scroll', throttle(() => {
        colorSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate how much of the section is in view (0-1)
            const visiblePercentage = Math.min(
                Math.max(0, (viewportHeight - rect.top) / viewportHeight),
                1
            );
            
            // Toggle light/dark class based on scroll position
            if (visiblePercentage > 0.5) {
                section.classList.add('light');
            } else {
                section.classList.remove('light');
            }
        });
    }, 100));
}
