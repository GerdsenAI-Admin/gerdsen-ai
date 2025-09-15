/**
 * GERDSEN AI - Enhanced Website with Particles.js, Horizontal Scrolling, and Advanced Animations
 * Integrates: particles.js, GSAP ScrollTrigger, horizontal side scrolling, lazy loading
 */

// =============================================================================
// PARTICLE SYSTEM INITIALIZATION (particles.js)
// =============================================================================

function initParticleSystem() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": window.innerWidth < 768 ? 30 : window.innerWidth < 1920 ? 50 : 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#007AFF", "#5856D6", "#AF52DE", "#FF2D92", "#FF9500"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#007AFF",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
        console.log('✅ Particles.js initialized successfully');
    }
}

// =============================================================================
// GSAP SCROLLTRIGGER INITIALIZATION
// =============================================================================

function initScrollTrigger() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero content reveal animation
        gsap.fromTo(".hero-title", 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".hero-title",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Service cards staggered animation
        gsap.fromTo(".service-card", 
            {
                opacity: 0,
                y: 60,
                rotationX: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Feature items reveal
        gsap.fromTo(".feature-item", 
            {
                opacity: 0,
                x: -40,
                rotationY: 15
            },
            {
                opacity: 1,
                x: 0,
                rotationY: 0,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".features-grid",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Section titles with advanced effects
        gsap.fromTo(".section-title", 
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".section-title",
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        console.log('✅ GSAP ScrollTrigger initialized successfully');
    }
}

// =============================================================================
// HORIZONTAL SIDE SCROLLING SYSTEM
// =============================================================================

let currentSection = 0;
const sections = ['home', 'services', 'about', 'contact'];
let isScrolling = false;

function initHorizontalScrolling() {
    // Only enable on desktop/tablet, not mobile
    if (window.innerWidth <= 768) return;

    let touchStartX = 0;
    let touchStartY = 0;

    // Mouse wheel horizontal scrolling
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        // Detect horizontal scroll intent
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
            e.preventDefault();
            
            if (e.deltaX > 30 || (e.deltaY > 30 && e.shiftKey)) {
                navigateToSection(currentSection + 1);
            } else if (e.deltaX < -30 || (e.deltaY < -30 && e.shiftKey)) {
                navigateToSection(currentSection - 1);
            }
        }
    }, { passive: false });

    // Touch gestures for tablets
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        if (isScrolling) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Horizontal swipe detection
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            e.preventDefault();
            
            if (deltaX > 0) {
                navigateToSection(currentSection - 1);
            } else {
                navigateToSection(currentSection + 1);
            }
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                navigateToSection(currentSection - 1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                navigateToSection(currentSection + 1);
                break;
        }
    });

    console.log('✅ Horizontal scrolling initialized');
}

function navigateToSection(sectionIndex) {
    if (isScrolling) return;
    
    // Clamp section index
    sectionIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex));
    
    if (sectionIndex === currentSection) return;
    
    isScrolling = true;
    currentSection = sectionIndex;
    
    const targetSection = document.getElementById(sections[sectionIndex]);
    if (targetSection) {
        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update navigation state
        updateNavigationState();
        
        // Reset scrolling flag
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }
}

function updateNavigationState() {
    // Update active navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${sections[currentSection]}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// =============================================================================
// INTERSECTION OBSERVER FOR LAZY LOADING
// =============================================================================

function initLazyLoading() {
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add reveal class
                element.classList.add('revealed');
                
                // Lazy load images
                const lazyImages = element.querySelectorAll('img[data-src]');
                lazyImages.forEach(img => {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                });
                
                // Stop observing this element
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe elements with data-reveal attribute
    document.querySelectorAll('[data-scroll-fade], .service-card, .feature-item').forEach(el => {
        observer.observe(el);
    });

    console.log('✅ Lazy loading initialized');
}

// =============================================================================
// ENHANCED EMAIL FORM WITH VALIDATION
// =============================================================================

function initEnhancedContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company') || 'Not specified',
            project: formData.get('project') || 'Not specified',
            message: formData.get('message')
        };
        
        // Disable submit button with loading state
        setSubmitState('loading');
        
        try {
            const response = await fetch('https://formspree.io/f/xeozyrwa', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showFormStatus('success', 'Message sent successfully! We\'ll get back to you within 24 hours.');
                form.reset();
                
                // Success animation
                if (typeof gsap !== 'undefined') {
                    gsap.from(statusDiv, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    });
                }
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or email us directly at info@gerdsen.ai');
        } finally {
            setSubmitState('normal');
        }
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        clearFieldError(field);
        
        switch(field.type) {
            case 'email':
                if (value && !isValidEmail(value)) {
                    showFieldError(field, 'Please enter a valid email address');
                }
                break;
            case 'text':
            case 'textarea':
                if (field.required && !value) {
                    showFieldError(field, 'This field is required');
                }
                break;
        }
    }

    function clearFieldError(field) {
        if (typeof field === 'object') field = field.target;
        const errorEl = field.parentElement.querySelector('.field-error');
        if (errorEl) errorEl.remove();
        field.classList.remove('error');
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        field.classList.add('error');
        
        const errorEl = document.createElement('span');
        errorEl.className = 'field-error text-red-400 text-sm mt-1 block';
        errorEl.textContent = message;
        field.parentElement.appendChild(errorEl);
    }

    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.required && !input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            }
        });
        
        const email = form.querySelector('#email');
        if (email.value && !isValidEmail(email.value)) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setSubmitState(state) {
        switch(state) {
            case 'loading':
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                `;
                break;
            case 'normal':
            default:
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                break;
        }
    }

    function showFormStatus(type, message) {
        statusDiv.className = `form-status ${type}`;
        statusDiv.textContent = message;
        statusDiv.style.display = 'block';
        
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 10000);
    }

    console.log('✅ Enhanced contact form initialized');
}

// =============================================================================
// RESPONSIVE OPTIMIZATION (Mobile to Ultrawide)
// =============================================================================

function initResponsiveOptimization() {
    let resizeTimeout;
    
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const width = window.innerWidth;
            
            // Update particle count based on screen size
            if (typeof pJSDom !== 'undefined' && pJSDom[0] && pJSDom[0].pJS) {
                const particleCount = width < 768 ? 30 : width < 1920 ? 50 : 80;
                pJSDom[0].pJS.particles.number.value = particleCount;
                pJSDom[0].pJS.fn.particlesRefresh();
            }
            
            // Update GSAP ScrollTrigger
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
            
            // Reinitialize horizontal scrolling for desktop
            if (width > 768) {
                initHorizontalScrolling();
            }
            
            // Mobile-specific optimizations
            if (width <= 768) {
                document.body.classList.add('mobile-device');
                
                // Ensure hero content is always visible on mobile
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.opacity = '1';
                    heroContent.style.visibility = 'visible';
                    heroContent.style.transform = 'translateY(0)';
                }
            } else {
                document.body.classList.remove('mobile-device');
            }
            
            // Ultrawide optimizations
            if (width >= 2560) {
                document.body.classList.add('ultrawide-device');
            } else {
                document.body.classList.remove('ultrawide-device');
            }
            
        }, 250);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    console.log('✅ Responsive optimization initialized');
}

// =============================================================================
// ENHANCED VIDEO BACKGROUND WITH SCROLL EFFECTS
// =============================================================================

function initEnhancedVideoEffects() {
    const heroSection = document.querySelector('.hero-section');
    const videoElement = document.querySelector('.background-video');
    
    if (!heroSection || !videoElement) return;
    
    let scrollTimeout;
    
    function handleVideoScroll() {
        const scrollY = window.pageYOffset;
        const isMobile = window.innerWidth <= 768;
        const scrollThreshold = isMobile ? 50 : 100;
        
        // Video blur and dim effect
        if (scrollY > scrollThreshold) {
            heroSection.classList.add('scrolled');
            videoElement.style.filter = 'blur(8px) brightness(0.3)';
        } else {
            heroSection.classList.remove('scrolled');
            videoElement.style.filter = 'brightness(1)';
        }
        
        // Parallax effect for video (desktop only)
        if (!isMobile) {
            const parallaxValue = scrollY * 0.5;
            videoElement.style.transform = `translateY(${parallaxValue}px)`;
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Additional scroll end effects can go here
        }, 150);
    }
    
    window.addEventListener('scroll', handleVideoScroll, { passive: true });
    console.log('✅ Enhanced video effects initialized');
}

// =============================================================================
// MODAL SYSTEM WITH ENHANCED ANIMATIONS
// =============================================================================

function initEnhancedModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            if (modal) closeModal(modal);
        });
    });
    
    // Close on outside click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) closeModal(openModal);
        }
    });
    
    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // GSAP animation
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(modal, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            
            gsap.fromTo(modal.querySelector('.modal-content'),
                { scale: 0.8, y: 50 },
                { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }
    
    function closeModal(modal) {
        if (typeof gsap !== 'undefined') {
            gsap.to(modal, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    console.log('✅ Enhanced modals initialized');
}

// =============================================================================
// MOBILE NAVIGATION WITH ENHANCED ANIMATIONS
// =============================================================================

function initEnhancedMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMobileMenu();
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMobileMenu();
        });
    });
    
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('mobile-menu-hidden');
            mobileMenu.classList.add('mobile-menu-visible');
            hamburger.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            
            // GSAP animation for menu items
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.mobile-nav-link',
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" }
                );
            }
        } else {
            mobileMenu.classList.remove('mobile-menu-visible');
            mobileMenu.classList.add('mobile-menu-hidden');
            hamburger.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }
    
    console.log('✅ Enhanced mobile navigation initialized');
}

// =============================================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// =============================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                currentSection = 0;
                return;
            }
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update current section for horizontal scrolling
                const sectionIndex = sections.indexOf(targetId.substring(1));
                if (sectionIndex !== -1) {
                    currentSection = sectionIndex;
                }
            }
        });
    });
    
    console.log('✅ Smooth scroll initialized');
}

// =============================================================================
// MAIN INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing GERDSEN AI Enhanced Website...');
    
    // Initialize all systems in order
    setTimeout(() => initParticleSystem(), 100);
    setTimeout(() => initScrollTrigger(), 200);
    setTimeout(() => initLazyLoading(), 300);
    setTimeout(() => initEnhancedContactForm(), 400);
    setTimeout(() => initResponsiveOptimization(), 500);
    setTimeout(() => initEnhancedVideoEffects(), 600);
    setTimeout(() => initEnhancedModals(), 700);
    setTimeout(() => initEnhancedMobileNavigation(), 800);
    setTimeout(() => initSmoothScroll(), 900);
    setTimeout(() => initHorizontalScrolling(), 1000);
    
    console.log('✅ All systems initialized successfully!');
});

// Ensure proper cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.killAll();
    }
});
