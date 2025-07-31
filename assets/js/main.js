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

// Fix video sources for GitHub Pages deployment
function fixVideoSources() {
    const videoElements = document.querySelectorAll('video source');
    const basePath = window.location.hostname === 'gerdsen.ai' ? '' : '/gerdsen-ai';
    
    videoElements.forEach(source => {
        let src = source.getAttribute('src');
        if (!src) return;
        
        // Fix paths for GitHub Pages
        if (src.startsWith('/') && !src.startsWith(basePath)) {
            // Add the GitHub Pages base path if needed
            src = basePath + src;
            source.setAttribute('src', src);
        }
        
        // Force video reload regardless of path changes
        const video = source.parentElement;
        video.load();
        video.play().catch(e => console.log('Video autoplay issue:', e));
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
    const heroVideoTransitionPoint = window.innerHeight * 0.3; // Transition point for hero video effect
    
    // Create a scroll handler for smooth parallax with enhanced sequence
    const parallaxHandler = throttle(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
        
        // Process hero video backgrounds - enhanced sequence animation
        document.querySelectorAll('.hero-section [data-video-parallax]').forEach((video) => {
            const section = video.closest('[data-video-section]');
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const scrollProgress = Math.min(Math.abs(rect.top) / (windowHeight * 0.7), 1);
            
            // Animation Phases:
            // 1. Initial state - full scale video
            // 2. As scroll begins - video stays in place while text animates
            // 3. At transition point - video zooms out/exits
            // 4. After transition - particle/smoke effects visible
            
            if (scrollY < heroVideoTransitionPoint) {
                // Phase 1-2: Initial to scroll begins - static with minor parallax
                const yPos = -(rect.top * 0.2); // Slight parallax effect
                const initialScale = 1.1;
                video.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), 0) scale(${initialScale})`;
                video.style.opacity = 0.8;
            } else {
                // Phase 3-4: Transition to zoomed out
                const zoomOutProgress = Math.min((scrollY - heroVideoTransitionPoint) / (windowHeight * 0.4), 1);
                const scaleValue = 1.1 * (1 - zoomOutProgress) + 0.7 * zoomOutProgress; // Zoom out from 1.1 to 0.7
                const yOffset = zoomOutProgress * -100; // Move up as it zooms out
                const zOffset = zoomOutProgress * 100; // Move back in z-space
                const opacityValue = 0.8 * (1 - zoomOutProgress) + 0.4 * zoomOutProgress; // Fade as it zooms out
                
                video.style.transform = `translate3d(-50%, calc(-50% + ${yOffset}px), ${zOffset}px) scale(${scaleValue})`;
                video.style.opacity = opacityValue;
                
                // Add smoke effect class once we reach a certain threshold
                if (zoomOutProgress > 0.5 && !section.classList.contains('show-particles')) {
                    section.classList.add('show-particles');
                } else if (zoomOutProgress <= 0.3 && section.classList.contains('show-particles')) {
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
            if (item.classList.contains('hero-title') || item.classList.contains('hero-description')) {
                // Special animation for hero text elements - stay visible longer
                const scrollProgress = Math.min(Math.abs(rect.top) / (windowHeight * 0.8), 1);
                
                // Make text elements enter and stay until the video starts to zoom out
                if (scrollY < heroVideoTransitionPoint) {
                    // Phase 1-2: Text appears and stays
                    const entryProgress = Math.min(scrollY / (heroVideoTransitionPoint * 0.5), 1);
                    const yOffset = 50 * (1 - entryProgress);
                    const opacityValue = Math.min(entryProgress * 1.5, 1);
                    
                    item.style.transform = `translate3d(0, ${yOffset}px, 0)`;
                    item.style.opacity = opacityValue;
                } else {
                    // Phase 3-4: Text fades out as video zooms out
                    const exitProgress = Math.min((scrollY - heroVideoTransitionPoint) / (windowHeight * 0.3), 1);
                    const yOffset = -50 * exitProgress;
                    const opacityValue = 1 - exitProgress;
                    
                    item.style.transform = `translate3d(0, ${yOffset}px, 0)`;
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
    
    // Staggered animation for hero elements with enhanced timing
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-section [data-scroll-fade]');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('in-view');
                el.style.opacity = 1;
                el.style.transform = 'translate3d(0, 0, 0)';
            }, index * 200); // Stagger effect
        });
    }, 500); // Delayed start to ensure video is loaded
    
    // Add animation classes to all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-ready');
    });
    
    // Initialize all video backgrounds with priority loading for hero
    const heroVideo = document.querySelector('.hero-section .background-video');
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
