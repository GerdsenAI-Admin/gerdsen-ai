// Firefly Particle System
function createFireflies() {
    const fireflyContainer = document.getElementById('firefly-container');
    if (!fireflyContainer) return;

    // Create 60 fireflies for better coverage without overwhelming
    for (let i = 0; i < 60; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';

        // Random starting positions across the entire viewport
        firefly.style.left = Math.random() * 100 + '%';
        firefly.style.top = (Math.random() * 200 - 50) + '%'; // Start some off-screen

        // Random animation delay and duration (slower)
        firefly.style.animationDelay = Math.random() * 40 + 's';
        firefly.style.animationDuration = (40 + Math.random() * 20) + 's';

        // Random size variation
        const size = 2 + Math.random() * 4;
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';

        fireflyContainer.appendChild(firefly);
    }
}

// Full Page Animated Smoke Background with Enhanced Parallax
function initParallaxParticlesBackground() {
    const particlesBg = document.getElementById('particles-bg');
    const fireflyContainer = document.getElementById('firefly-container');
    const heroSection = document.querySelector('.hero-section');
    const steamLayer = document.getElementById('steam-layer');
    const cloudLayer = document.getElementById('cloud-layer');
    const smokeLayers = document.querySelectorAll('.smoke-layer');

    if (!particlesBg || !heroSection) return;

    // Track neural G video blur state
    let neuralGBlurred = false;
    let particlesShown = false;
    let firefliesShown = false;

    // IMMEDIATE blur on scroll start
    let scrollTimeout;
    let isScrolling = false;

    // Initialize proper state on page load
    function initializeHeroState() {
        // Ensure hero starts without scrolled class
        heroSection.classList.remove('scrolled');

        // Check if we're on mobile
        const isMobile = window.innerWidth <= 768;

        // Make hero content visible immediately
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');

        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.visibility = 'visible';
            heroContent.style.transform = 'translateY(0)';
        }
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
        if (heroButtons) {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }

        // On mobile, ensure consistent starting state (hidden logic handled by CSS/init)
        if (isMobile) {
            // No longer forcing visible immediately - allowing scroll effect
        }

        // SHOW PARTICLES AND FIREFLIES IMMEDIATELY ON PAGE LOAD
        if (particlesBg && !particlesShown) {
            particlesBg.classList.add('show');
            particlesShown = true;
        }
        if (fireflyContainer && !firefliesShown) {
            fireflyContainer.classList.add('show');
            firefliesShown = true;
            createFireflies();
        }

        // Scroll to top to ensure consistent starting position
        window.scrollTo(0, 0);
    }

    // Enhanced scroll handler for immediate blur
    function handleImmediateScroll() {
        const scrollY = window.pageYOffset;
        const isMobile = window.innerWidth <= 768;
        const isUltrawide = window.innerWidth >= 2560;

        // Different scroll thresholds for different devices
        const scrollThreshold = isMobile ? 50 : isUltrawide ? 150 : 100;

        // IMMEDIATE blur and dim on ANY scroll (but start from top of hero)
        if (scrollY > scrollThreshold && !heroSection.classList.contains('scrolled')) {
            heroSection.classList.add('scrolled');
            neuralGBlurred = true;

            // Show smoke effect after a short delay
            if (!particlesShown) {
                setTimeout(() => {
                    particlesBg.classList.add('show');
                    particlesShown = true;

                    // Show fireflies
                    if (fireflyContainer && !firefliesShown) {
                        fireflyContainer.classList.add('show');
                        firefliesShown = true;
                        createFireflies();
                    }
                }, 300);
            }
        } else if (scrollY <= scrollThreshold && heroSection.classList.contains('scrolled')) {
            heroSection.classList.remove('scrolled');
        }

        // Track scrolling state
        isScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    }

    // Initialize proper state
    initializeHeroState();

    // Use non-throttled handler for immediate response
    window.addEventListener('scroll', handleImmediateScroll, { passive: true });

    // Mouse move parallax with enhanced depth
    let mouseX = 0.5;
    let mouseY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    // Smooth animation loop for all parallax effects
    let scrollY = 0;
    let targetScrollY = 0;
    let frame = 0;

    function animateAll() {
        frame++;
        targetScrollY = window.pageYOffset;

        // Smooth scroll interpolation
        scrollY += (targetScrollY - scrollY) * 0.1;

        // Smooth mouse interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // Calculate multi-layer parallax
        const mouseOffsetX = (currentX - 0.5) * 2;
        const mouseOffsetY = (currentY - 0.5) * 2;

        // Animate smoke layers with parallax
        if (particlesBg && particlesShown) {
            // Overall smoke container parallax
            const smokeParallaxY = -(scrollY * 0.3);
            particlesBg.style.transform = `translateY(${smokeParallaxY}px)`;

            // Individual smoke layers parallax
            smokeLayers.forEach((layer, index) => {
                const speed = 0.1 + (index * 0.05);
                const offsetX = mouseOffsetX * (10 + index * 5);
                const offsetY = mouseOffsetY * (10 + index * 5) + (scrollY * speed);
                layer.style.transform = `translate(${offsetX}px, ${-offsetY}px)`;
            });

            // Apply blur when scrolled
            if (scrollY > 600 && !particlesBg.classList.contains('blurred')) {
                particlesBg.classList.add('blurred');
            } else if (scrollY <= 600 && particlesBg.classList.contains('blurred')) {
                particlesBg.classList.remove('blurred');
            }
        }

        // Steam layer parallax
        if (steamLayer) {
            const steamParallaxY = -(scrollY * 0.3);
            const steamRotation = Math.sin(frame * 0.001) * 2;
            steamLayer.style.transform = `
                translateY(${steamParallaxY}px) 
                translateX(${mouseOffsetX * 5}px)
                rotate(${steamRotation}deg)
            `;
        }

        // Cloud layer parallax
        if (cloudLayer) {
            const cloudParallaxY = -(scrollY * 0.4);
            const cloudDrift = Math.sin(frame * 0.0005) * 10;
            cloudLayer.style.transform = `
                translateY(${cloudParallaxY}px) 
                translateX(${cloudDrift + mouseOffsetX * 8}px)
            `;
        }

        // Firefly container parallax
        if (fireflyContainer && firefliesShown) {
            const fireflyParallaxY = -(scrollY * 0.2);
            fireflyContainer.style.transform = `
                translateY(${fireflyParallaxY}px)
                translateX(${mouseOffsetX * 3}px)
            `;
        }

        requestAnimationFrame(animateAll);
    }
    animateAll();

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        mouseX = 0.5;
        mouseY = 0.5;
    });

    console.log('Enhanced smoke effect initialized');
}

// Scroll-based Animations with Immediate Response
function initScrollAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollElements = document.querySelectorAll('[data-scroll-fade]');

    // Set initial states
    if (heroTitle) heroTitle.style.opacity = '0';
    if (heroDescription) heroDescription.style.opacity = '0';
    if (heroButtons) heroButtons.style.opacity = '0';

    let contentShown = false;

    function handleScroll() {
        const scrollY = window.scrollY;
        const isMobile = window.innerWidth <= 768;
        const isUltrawide = window.innerWidth >= 2560;

        // Different scroll thresholds for different devices
        const scrollThreshold = isMobile ? 50 : isUltrawide ? 150 : 100;

        // Consistent behavior for mobile and desktop (fade in on scroll)
        if (isMobile) {
            // Allow fallthrough to standard scroll logic
        }

        // Show hero content immediately when scrolled (desktop/ultrawide)
        if (scrollY > scrollThreshold && !contentShown) {
            contentShown = true;

            // Content appears as video dims
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }

            setTimeout(() => {
                if (heroDescription) {
                    heroDescription.style.opacity = '1';
                    heroDescription.style.transform = 'translateY(0)';
                }
            }, 200);

            setTimeout(() => {
                if (heroButtons) {
                    heroButtons.style.opacity = '1';
                    heroButtons.style.transform = 'translateY(0)';
                }
            }, 400);
        } else if (scrollY <= 5 && contentShown) {
            contentShown = false;

            // Hide hero content when back at top (for both desktop and mobile now)
            if (true) {
                if (heroTitle) {
                    heroTitle.style.opacity = '0';
                    heroTitle.style.transform = 'translateY(20px)';
                }
                if (heroDescription) {
                    heroDescription.style.opacity = '0';
                    heroDescription.style.transform = 'translateY(20px)';
                }
                if (heroButtons) {
                    heroButtons.style.opacity = '0';
                    heroButtons.style.transform = 'translateY(20px)';
                }
            }
        }

        // Animate other scroll elements
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                element.classList.add('in-view');
            }
        });

        // Animate service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight * 0.8) {
                setTimeout(() => {
                    card.classList.add('in-view');
                }, index * 100);
            }
        });

        // Animate feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight * 0.8) {
                setTimeout(() => {
                    item.classList.add('in-view');
                }, index * 100);
            }
        });
    }

    // Use non-throttled for immediate response on scroll start
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();
}

// Modal Functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        }
    });
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
            // Submit to Formspree (works with GitHub Pages)
            const response = await fetch('https://formspree.io/f/xeozyrwa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Success
                statusDiv.className = 'form-status success';
                statusDiv.textContent = 'Message sent successfully! We\'ll get back to you within 24 hours.';
                statusDiv.style.display = 'block';

                // Reset form
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);

            // Error handling
            statusDiv.className = 'form-status error';
            statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again or email us directly at info@gerdsen.ai';
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

// Performance Optimization - Enhanced Throttle
function throttle(func, wait = 16) {
    let timeout = null;
    let previous = 0;

    return function (...args) {
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

// Mobile Detection and Responsive Scaling
function initResponsiveScaling() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isUltrawide = window.innerWidth >= 2560;

    // Apply mobile-specific styles
    if (isMobile) {
        document.body.classList.add('mobile-device');
        // Removed forced visibility to allow scroll animation
    }

    if (isUltrawide) {
        document.body.classList.add('ultrawide-device');
    }

    // Handle orientation changes on mobile
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            // Force a reflow to handle viewport changes
            window.scrollTo(0, 0);

            // Reinitialize scaling if needed
            if (window.innerWidth <= 768) {
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = '1';
                    heroContent.style.visibility = 'visible';
                    heroContent.style.transform = 'translateY(0)';
                }
            }
        }, 100);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newIsMobile = window.innerWidth <= 768;
            const newIsUltrawide = window.innerWidth >= 2560;

            // Update body classes
            document.body.classList.toggle('mobile-device', newIsMobile);
            document.body.classList.toggle('ultrawide-device', newIsUltrawide);

            // Force video element to recalculate dimensions on resize
            const video = document.querySelector('.background-video');
            if (video) {
                const currentTime = video.currentTime;
                const wasPlaying = !video.paused;
                video.load();
                video.currentTime = currentTime;
                if (wasPlaying) {
                    video.play().catch(() => { }); // Ignore autoplay errors
                }
            }

            // Ensure mobile content remains visible
            if (newIsMobile) {
                // Removed forced visibility to allow scroll animation
            }
        }, 250);
    });
}

// Main Initialization - DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Gerdsen AI website...');

    // Initialize responsive scaling FIRST
    initResponsiveScaling();

    // Initialize parallax particles background
    initParallaxParticlesBackground();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize modals
    initModals();

    // Initialize mobile navigation
    initMobileNavigation();

    // Initialize contact form
    initContactForm();

    console.log('Website initialization complete!');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Special handling for home link
        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - 80, // Account for fixed nav
                behavior: 'smooth'
            });
        }
    });
});
