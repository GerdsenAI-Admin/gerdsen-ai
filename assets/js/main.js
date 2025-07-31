// Continuous Particle Animation
function startParticleAnimation() {
    let animationFrameId;
    
    function animateParticles() {
        const particles = document.querySelectorAll('.particle');
        const currentTime = Date.now();
        const scrollY = window.scrollY;
        
        particles.forEach((particle, index) => {
            // Autonomous floating movement
            const autonomousX = Math.sin(currentTime * 0.001 + index * 0.5) * 15;
            const autonomousY = Math.cos(currentTime * 0.0008 + index * 0.3) * 10;
            
            // Scroll-based movement (only if scrolled)
            let scrollX = 0;
            let scrollY_offset = 0;
            
            if (scrollY > 1) {
                const baseSpeed = 0.8 + (index % 5) * 0.3;
                scrollY_offset = scrollY * baseSpeed;
                scrollX = Math.sin(scrollY * 0.01 + index) * 20;
            }
            
            // Combine movements
            const totalX = autonomousX + scrollX;
            const totalY = -scrollY_offset + autonomousY;
            
            // Apply transform
            particle.style.transform = `translate(${totalX}px, ${totalY}px)`;
        });
        
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Start the animation loop
    animateParticles();
    
    // Stop animation when page is hidden (performance optimization)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animateParticles();
        }
    });
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            project: formData.get('project') || 'Not specified',
            message: formData.get('message')
        };
        
        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        try {
            // Using Formspree for form handling (replace with your endpoint)
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    company: data.company,
                    project: data.project,
                    message: data.message,
                    _replyto: data.email,
                    _subject: `New inquiry from ${data.name} - ${data.project}`,
                    _autoconfirm: 'Thank you for contacting GERDSEN AI! We have received your message and will get back to you within 24 hours.'
                })
            });
            
            if (response.ok) {
                // Success
                statusDiv.className = 'form-status success';
                statusDiv.textContent = 'Message sent successfully! You will receive a confirmation email shortly.';
                statusDiv.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Send confirmation email to user (using EmailJS)
                await sendConfirmationEmail(data);
                
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Error handling
            statusDiv.className = 'form-status error';
            statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly at contact@gerdsen.ai';
            statusDiv.style.display = 'block';
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide status after 10 seconds
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 10000);
        }
    });
}

// Send confirmation email to user
async function sendConfirmationEmail(data) {
    try {
        // This would use EmailJS or similar service for confirmation emails
        // For now, we'll just log it (replace with actual email service)
        console.log('Would send confirmation email to:', data.email);
        
        // Example using EmailJS (you'd need to set up EmailJS account and template)
        /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_email: data.email,
            from_name: 'GERDSEN AI',
            to_name: data.name,
            message: 'Thank you for contacting us! We will get back to you within 24 hours.'
        });
        */
        
    } catch (error) {
        console.error('Confirmation email error:', error);
        // Don't show this error to user as main form submission was successful
    }
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('mobile-menu-hidden');
            mobileMenu.classList.add('mobile-menu-visible');
            hamburger.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close menu when clicking on mobile nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            isMenuOpen = false;
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Apple-style Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    // Fix Jekyll template issues with video sources
    fixVideoSources();
    
    // Initialize single consolidated scroll system
    initConsolidatedScrollSystem();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize Apple-inspired effects
    initMagneticElements();
    initProductRotation();
    initExpandableSections();
    initImageGallery();
    
    // Initial animation trigger
    triggerInitialAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Start continuous particle animation
    startParticleAnimation();
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
        
        // 3. ELEMENT ANIMATIONS (fade in on scroll) - FIXED: Make elements 100% visible
        animElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            
            const distanceFromTop = scrollY + windowHeight - elementTop;
            const scrollProgress = Math.min(Math.max(distanceFromTop / (windowHeight * 0.3), 0), 1);
            
            if (scrollProgress > 0.1) {
                element.classList.add('in-view');
                // Make elements 100% visible when in view
                element.style.transform = `translate3d(0, 0, 0)`;
                element.style.opacity = '1';
            }
        });
        
        // 4. VIDEO PARALLAX EFFECTS - Immediate blur/scale/dim on first scroll
        if (heroVideo && heroSection) {
            const rect = heroSection.getBoundingClientRect();
            
            if (scrollY < heroVideoTransitionPoint) {
                const yPos = -(rect.top * 0.2);
                const initialScale = 1.15 - (scrollY / heroVideoTransitionPoint) * 0.45; // Even more aggressive scale reduction
                const initialBlur = (scrollY / heroVideoTransitionPoint) * 18; // Much more aggressive blur
                
                heroVideo.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), 0) scale(${initialScale})`;
                heroVideo.style.filter = `blur(${initialBlur}px)`;
                heroVideo.style.opacity = 1 - (scrollY / heroVideoTransitionPoint) * 0.85; // Much more dimming
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
        
        // 5. HERO TEXT VISIBILITY & PARTICLE EFFECTS - 100% opacity and scroll-responsive particles
        if (heroContent) {
            if (scrollY > 1) {
                // Text becomes 100% visible immediately on any scroll - CSS handles centering
                heroContent.style.opacity = '1';
                
                // Trigger particle effects on first scroll with scroll-responsive intensity
                const particlesContainer = document.querySelector('.particles-container');
                if (particlesContainer) {
                    // Make particles more visible and responsive to scroll
                    const scrollIntensity = Math.min(scrollY / (windowHeight * 0.5), 1);
                    const baseOpacity = 0.7; // Higher base visibility
                    const scrollOpacity = baseOpacity + (scrollIntensity * 0.3);
                    
                    particlesContainer.style.opacity = Math.min(scrollOpacity, 1);
                    heroSection.classList.add('show-particles');
                    
                    // Particle movement is now handled by startParticleAnimation()
                }
            } else {
                // Text starts invisible - becomes visible on scroll
                const particlesContainer = document.querySelector('.particles-container');
                if (particlesContainer) {
                    particlesContainer.style.opacity = '0'; // Hide particles initially
                    heroSection.classList.remove('show-particles');
                }
                heroContent.style.opacity = '0';
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
    
    // Ensure hero content is hidden initially - CSS handles centering
    if (heroContent) {
        heroContent.style.opacity = '0';
        // REMOVED: heroContent.style.transform - this was breaking CSS centering
        // CSS transform: translate(-50%, -50%) handles positioning
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
            // REMOVED: el.style.transform - was causing positioning conflicts
            // CSS handles all positioning, JavaScript only handles opacity
            
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
        
        // Create many tiny spark-like particles
        for (let i = 0; i < 80; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Tiny spark/snow-like particles
            const size = Math.random() * 3 + 1; // 1-4px tiny sparks
            const posX = Math.random() * 120 - 10; // -10% to 110%
            const posY = Math.random() * 120 - 10; // -10% to 110%
            const delay = Math.random() * 8; // 0-8s delay
            const duration = Math.random() * 20 + 15; // 15-35s slow drift
            
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
