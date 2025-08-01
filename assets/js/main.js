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

// Full Page Particles Background with Parallax
function initParallaxParticlesBackground() {
    const particlesBg = document.getElementById('particles-bg');
    const fireflyContainer = document.getElementById('firefly-container');
    if (!particlesBg) return;
    
    // Track neural G video blur state
    let neuralGBlurred = false;
    let particlesShown = false;
    let firefliesShown = false;
    
    // Watch for neural G blur before showing particles
    const heroSection = document.querySelector('.hero-section');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (heroSection.classList.contains('scrolled') && !neuralGBlurred) {
                    neuralGBlurred = true;
                    
                    // Show fireflies first (faster)
                    setTimeout(() => {
                        if (fireflyContainer && !firefliesShown) {
                            fireflyContainer.classList.add('show');
                            firefliesShown = true;
                            createFireflies();
                            console.log('Fireflies activated');
                        }
                    }, 500); // 500ms after blur
                    
                    // Show particles background later (slower)
                    setTimeout(() => {
                        particlesBg.classList.add('show');
                        particlesShown = true;
                        console.log('Particles background revealed after neural G blur');
                    }, 1500); // 1.5s after blur
                }
            }
        });
    });
    
    observer.observe(heroSection, { attributes: true });
    
    console.log('Particles background initialized, waiting for neural G blur...')
    
    // Mouse move parallax/tilt-shift effect
    let mouseX = 0.5;
    let mouseY = 0.5;
    let currentX = 0.5;
    let currentY = 0.5;
    
    document.addEventListener('mousemove', (e) => {
        if (!particlesShown) return;
        
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    // Smooth animation loop for parallax
    function animateParallax() {
        if (!particlesShown) {
            requestAnimationFrame(animateParallax);
            return;
        }
        
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        // Calculate tilt-shift effect
        const tiltX = (currentX - 0.5) * 15;
        const tiltY = (currentY - 0.5) * 15;
        const rotateX = (currentY - 0.5) * 5;
        const rotateY = (currentX - 0.5) * -5;
        
        // Apply transforms with rotation
        particlesBg.style.transform = `
            translate(${tiltX}px, ${tiltY}px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            rotate(15deg)
            scale(1.2)
        `;
        
        requestAnimationFrame(animateParallax);
    }
    animateParallax();
    
    // Scroll-based effects with enhanced parallax
    let scrollY = 0;
    let targetScrollY = 0;
    let lastScrollTime = Date.now();
    
    // Update scroll handler
    function updateScroll() {
        targetScrollY = window.pageYOffset;
        
        // Check if we should blur the neural G
        if (targetScrollY > 50 && !heroSection.classList.contains('scrolled')) {
            heroSection.classList.add('scrolled');
        } else if (targetScrollY <= 50 && heroSection.classList.contains('scrolled')) {
            heroSection.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateScroll, { passive: true });
    
    // Smooth scroll animation with parallax
    function animateScroll() {
        const currentTime = Date.now();
        const deltaTime = Math.min((currentTime - lastScrollTime) / 1000, 0.1);
        lastScrollTime = currentTime;
        
        // Smooth interpolation
        scrollY += (targetScrollY - scrollY) * 0.1;
        
        // Apply parallax scrolling to particles background
        if (particlesShown) {
            const parallaxSpeed = 0.5;
            const yPos = -(scrollY * parallaxSpeed);
            particlesBg.style.setProperty('--parallax-y', `${yPos}px`);
        }
        
        // Progressive blur effect
        const blurAmount = Math.min(scrollY * 0.002, 2);
        
        // Apply blur class when scrolled enough
        if (scrollY > 600 && !particlesBg.classList.contains('blurred')) {
            particlesBg.classList.add('blurred');
        } else if (scrollY <= 600 && particlesBg.classList.contains('blurred')) {
            particlesBg.classList.remove('blurred');
        }
        
        requestAnimationFrame(animateScroll);
    }
    animateScroll();
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        mouseX = 0.5;
        mouseY = 0.5;
    });
}

// Scroll-based Animations
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
    
    let hasScrolled = false;
    
    function handleScroll() {
        const scrollY = window.scrollY;
        
        // Show hero content when scrolled
        if (scrollY > 50 && !hasScrolled) {
            hasScrolled = true;
            
            // Add scrolled class to hero section
            if (heroSection) heroSection.classList.add('scrolled');
            
            // Animate hero content in sequence
            setTimeout(() => {
                if (heroContent) heroContent.style.opacity = '1';
                if (heroTitle) {
                    heroTitle.style.opacity = '1';
                    heroTitle.style.transform = 'translateY(0)';
                }
            }, 300);
            
            setTimeout(() => {
                if (heroDescription) {
                    heroDescription.style.opacity = '1';
                    heroDescription.style.transform = 'translateY(0)';
                }
            }, 600);
            
            setTimeout(() => {
                if (heroButtons) {
                    heroButtons.style.opacity = '1';
                    heroButtons.style.transform = 'translateY(0)';
                }
            }, 900);
        } else if (scrollY <= 50 && hasScrolled) {
            hasScrolled = false;
            if (heroSection) heroSection.classList.remove('scrolled');
            
            // Hide hero content
            if (heroContent) heroContent.style.opacity = '0';
            if (heroTitle) heroTitle.style.opacity = '0';
            if (heroDescription) heroDescription.style.opacity = '0';
            if (heroButtons) heroButtons.style.opacity = '0';
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
    
    // Use throttled scroll handler
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
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
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            statusDiv.className = 'form-status success';
            statusDiv.textContent = 'Message sent successfully! We\'ll get back to you within 24 hours.';
            statusDiv.style.display = 'block';
            
            // Reset form
            form.reset();
            
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

// Main Initialization - DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Gerdsen AI website...');
    
    // Initialize parallax particles background FIRST
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