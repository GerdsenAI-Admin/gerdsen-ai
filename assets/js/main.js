// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Parallax for orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = 0.1 * (index + 1);
        const yPos = scrolled * speed;
        const xPos = Math.sin(scrolled * 0.001) * 50;
        orb.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

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
        if (logo) {
            logo.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
}

// Add Floating Elements
function createFloatingElement() {
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#007AFF', '#5856D6', '#AF52DE'];
    
    const element = document.createElement('div');
    element.classList.add('floating-element');
    
    const size = Math.random() * 100 + 50;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.background = color;
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.opacity = '0.1';
    element.style.filter = 'blur(50px)';
    
    if (shape === 'circle') {
        element.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
        element.style.width = '0';
        element.style.height = '0';
        element.style.borderLeft = `${size/2}px solid transparent`;
        element.style.borderRight = `${size/2}px solid transparent`;
        element.style.borderBottom = `${size}px solid ${color}`;
        element.style.background = 'transparent';
    }
    
    document.body.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        element.remove();
    }, 20000);
}

// Create floating elements periodically
setInterval(createFloatingElement, 5000);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Add orbs to body
    const orbsHTML = `
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    `;
    document.body.insertAdjacentHTML('afterbegin', orbsHTML);
    
    // Add reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.classList.add('reveal');
        }
    });
});