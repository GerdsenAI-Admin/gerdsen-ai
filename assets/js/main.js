// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Add mesh gradient background
    const meshGradient = document.createElement('div');
    meshGradient.className = 'mesh-gradient';
    document.body.prepend(meshGradient);
    
    // Add light leak effect
    const lightLeak = document.createElement('div');
    lightLeak.className = 'light-leak';
    document.body.appendChild(lightLeak);
    
    // Initialize scroll effects
    initScrollEffects();
    initAppleScrollAnimations();
    
    // Initialize magnetic elements
    initMagneticEffect();
    
    // Initialize cursor trail
    initCursorTrail();
    
    // Initialize parallax for data-scroll="parallax" elements
    initParallaxElements();
});

// Apple-style Scroll Animations
function initAppleScrollAnimations() {
    // Add data attributes for scroll animations
    const heroSection = document.querySelector('.min-h-screen');
    if (heroSection) {
        const heroLogo = heroSection.querySelector('.hero-logo');
        const heroTitle = heroSection.querySelector('h1');
        const heroText = heroSection.querySelector('p');
        const heroButtons = heroSection.querySelector('.flex');
        
        if (heroLogo) heroLogo.setAttribute('data-scroll', 'zoom-out');
        if (heroTitle) heroTitle.setAttribute('data-scroll', 'fade-up');
        if (heroText) heroText.setAttribute('data-scroll', 'fade-up-delay');
        if (heroButtons) heroButtons.setAttribute('data-scroll', 'fade-up-delay-2');
    }
    
    // Add scroll attributes to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.setAttribute('data-scroll', 'scale-in');
        card.setAttribute('data-scroll-delay', index * 100);
    });
    
    // Add to bento items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item, index) => {
        item.setAttribute('data-scroll', 'slide-up');
        item.setAttribute('data-scroll-delay', index * 50);
    });
}

// Parallax Elements
function initParallaxElements() {
    const parallaxElements = document.querySelectorAll('[data-scroll="parallax"]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Advanced Scroll Effects
function initScrollEffects() {
    let ticking = false;
    let lastScrollY = 0;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax effect for hero section
        const hero = document.querySelector('.min-h-screen');
        if (hero) {
            const heroLogo = hero.querySelector('.hero-logo');
            const heroContent = hero.querySelector('.text-center');
            
            if (heroLogo) {
                // Scale and fade logo on scroll
                const scale = Math.max(0.5, 1 - scrollY * 0.001);
                const opacity = Math.max(0, 1 - scrollY * 0.002);
                heroLogo.style.transform = `scale(${scale})`;
                heroLogo.style.opacity = opacity;
            }
            
            if (heroContent) {
                // Parallax for content
                const translateY = scrollY * 0.3;
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }
        
        // Handle scroll-triggered animations
        const scrollElements = document.querySelectorAll('[data-scroll]');
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const delay = element.getAttribute('data-scroll-delay') || 0;
            
            // Check if element is in viewport
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
                setTimeout(() => {
                    element.classList.add('scroll-animated');
                    
                    // Apply specific animation based on data-scroll value
                    const animation = element.getAttribute('data-scroll');
                    switch(animation) {
                        case 'zoom-out':
                            element.style.animation = 'zoomOut 1.5s ease-out forwards';
                            break;
                        case 'fade-up':
                            element.style.animation = 'fadeUp 1s ease-out forwards';
                            break;
                        case 'fade-up-delay':
                            element.style.animation = 'fadeUp 1s ease-out 0.2s forwards';
                            break;
                        case 'fade-up-delay-2':
                            element.style.animation = 'fadeUp 1s ease-out 0.4s forwards';
                            break;
                        case 'scale-in':
                            element.style.animation = 'scaleIn 0.8s ease-out forwards';
                            break;
                        case 'slide-up':
                            element.style.animation = 'slideUp 0.8s ease-out forwards';
                            break;
                        case 'rotate':
                            const rotateSpeed = element.dataset.speed || 1;
                            element.style.animation = `rotate ${60 / rotateSpeed}s linear infinite`;
                            break;
                    }
                }, delay);
            }
        });
        
        // Update mesh gradient position based on scroll
        const meshGradient = document.querySelector('.mesh-gradient');
        if (meshGradient) {
            const scrollProgress = scrollY / (document.body.scrollHeight - windowHeight);
            meshGradient.style.transform = `translateY(${scrollProgress * 100}px)`;
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', requestTick);
    
    // Initial call
    updateScrollEffects();
}

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navigation Blur Effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('nav-blur');
    } else {
        nav.classList.remove('nav-blur');
    }
    
    lastScroll = currentScroll;
});

// Magnetic Effect for Interactive Elements
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.button-primary, .button-secondary, .service-card');
    
    magneticElements.forEach(element => {
        element.classList.add('magnetic');
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = Math.max(rect.width, rect.height);
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                element.style.transform = `translate(${x * strength * 0.2}px, ${y * strength * 0.2}px)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Cursor Trail Effect
function initCursorTrail() {
    const trailCount = 5;
    const trails = [];
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / trailCount) * 0.5;
        trail.style.transform = 'scale(' + (1 - i / trailCount) + ')';
        document.body.appendChild(trail);
        trails.push(trail);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = Array(trailCount).fill(0);
    let trailY = Array(trailCount).fill(0);
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        trailX[0] += (mouseX - trailX[0]) * 0.3;
        trailY[0] += (mouseY - trailY[0]) * 0.3;
        
        trails[0].style.left = trailX[0] + 'px';
        trails[0].style.top = trailY[0] + 'px';
        
        for (let i = 1; i < trailCount; i++) {
            trailX[i] += (trailX[i - 1] - trailX[i]) * 0.3;
            trailY[i] += (trailY[i - 1] - trailY[i]) * 0.3;
            
            trails[i].style.left = trailX[i] + 'px';
            trails[i].style.top = trailY[i] + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on backdrop click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        const modals = document.querySelectorAll('.modal-backdrop');
        modals.forEach(modal => modal.classList.remove('active'));
        document.body.style.overflow = '';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mouse Parallax for Hero Section
const heroSection = document.querySelector('.min-h-screen');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        const logo = heroSection.querySelector('img');
        if (logo && !logo.classList.contains('scroll-animated')) {
            logo.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px) scale(1.05)`;
        }
        
        // Move mesh gradient based on mouse
        const meshGradient = document.querySelector('.mesh-gradient');
        if (meshGradient) {
            meshGradient.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;
        }
    });
}

// Dynamic Blur Based on Scroll Speed
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        document.body.classList.add('scrolling');
        isScrolling = true;
    }
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
        isScrolling = false;
    }, 150);
});

// Add visual interest with random floating shapes
function createFloatingShape() {
    const shapes = ['circle', 'hexagon', 'triangle'];
    const colors = ['rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.9)', 'rgba(255, 255, 255, 0.6)', 'rgba(0, 0, 0, 0.7)'];
    
    const shape = document.createElement('div');
    shape.className = 'floating-shape';
    
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 200 + 100;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    
    shape.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        left: ${startX}px;
        bottom: -${size}px;
        background: ${color};
        opacity: 0.1;
        filter: blur(40px);
        animation: floatUp ${duration}s linear;
        pointer-events: none;
        z-index: 0;
    `;
    
    if (shapeType === 'circle') {
        shape.style.borderRadius = '50%';
    } else if (shapeType === 'hexagon') {
        shape.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
    } else if (shapeType === 'triangle') {
        shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
    }
    
    document.body.appendChild(shape);
    
    shape.addEventListener('animationend', () => {
        shape.remove();
    });
}

// Create floating shapes periodically
setInterval(createFloatingShape, 3000);

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .scrolling * {
        transition: filter 0.3s ease;
    }
    
    .scrolling .service-card,
    .scrolling .bento-item {
        filter: blur(1px);
    }
`;
document.head.appendChild(style);