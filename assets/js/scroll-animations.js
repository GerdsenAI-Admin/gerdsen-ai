// assets/js/scroll-animations.js
// Enhanced scroll logic with proper hero overlay and horizontal scrolling

(function() {
  "use strict";

  let lenis;

  /**
   * Initializes Lenis for smooth scrolling.
   */
  function initLenis() {
    if (typeof Lenis === "undefined") {
      console.warn("Lenis not found. Using fallback smooth scroll.");
      return;
    }

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothTouch: false,
      infinite: false,
    });

    // Expose lenis globally for other scripts
    window.lenis = lenis;

    // Integrate GSAP ScrollTrigger with Lenis if available
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    console.log("✅ Lenis smooth scroll initialized.");
  }

  /**
   * Main function to set up all scroll animations.
   */
  function initScrollAnimations() {
    if (typeof gsap === "undefined") {
      console.warn("GSAP not found. Using fallback scroll behavior.");
      initFallbackScrollBehavior();
      return;
    }

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = () => window.innerWidth > 768;

    // --- HERO SECTION ANIMATIONS ---
    const heroSection = document.querySelector(".hero-section");
    const heroContent = document.querySelector(".hero-content");
    const projectsContainer = document.querySelector(".projects-container");

    if (heroSection && heroContent) {
      // Initially ensure hero content is hidden
      gsap.set(heroContent, { opacity: 0, y: 50 });
      gsap.set(".hero-title, .hero-description, .hero-buttons, .trust-signals", { 
        opacity: 0, 
        y: 32, 
        filter: "blur(4px)" 
      });

      // Simple scroll listener for hero overlay (not using pin)
      let heroScrollHandler = () => {
        const scrollY = window.pageYOffset;
        const progress = Math.min(scrollY / 100, 1); // Normalize to 0-1 over 100px
        
        if (progress > 0.05) {
          heroSection.classList.add("scrolled");
          gsap.to(heroContent, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
          gsap.to(".hero-title, .hero-description, .hero-buttons, .trust-signals", { 
            opacity: 1, 
            y: 0, 
            filter: "none",
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.1
          });
          // Remove the listener once triggered
          window.removeEventListener('scroll', heroScrollHandler);
        }
      };
      
      window.addEventListener('scroll', heroScrollHandler, { passive: true });
    }

    // --- HORIZONTAL SCROLLING SECTION ---
    const projectSections = gsap.utils.toArray(".projects-container .project-section");
    if (projectSections.length > 0 && projectsContainer) {
      
      console.log(`Found ${projectSections.length} project sections`);
      
      // Create horizontal scrolling animation without delay
      const horizontalTween = gsap.to(projectSections, {
        xPercent: -100 * (projectSections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-container",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (window.innerWidth * (projectSections.length - 1)),
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (projectSections.length - 1));
            updateProjectNavigation(activeIndex);
            console.log(`Horizontal scroll progress: ${self.progress}, active section: ${activeIndex}`);
          },
          onToggle: (self) => {
            console.log("Horizontal scroll toggle:", self.isActive);
          }
        },
      });

      // Per-section parallax effects
      if (!prefersReducedMotion) {
        projectSections.forEach((section, i) => {
          const parallaxEls = section.querySelectorAll("[data-parallax]");
          parallaxEls.forEach((el) => {
            const speed = parseFloat(el.getAttribute("data-parallax")) || 0;
            gsap.fromTo(el,
              { x: () => -200 * speed },
              {
                x: () => 200 * speed,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              }
            );
          });
        });
      }
    }

    console.log("✅ GSAP scroll animations initialized.");
  }

  /**
   * Fallback scroll behavior when GSAP is not available
   */
  function initFallbackScrollBehavior() {
    const heroSection = document.querySelector(".hero-section");
    const heroContent = document.querySelector(".hero-content");
    
    // Initially hide hero content
    if (heroContent) {
      heroContent.style.opacity = "0";
      heroContent.style.transform = "translateY(50px)";
    }
    
    let scrollTimeout;
    
    function handleScroll() {
      const scrollY = window.pageYOffset;
      const scrollThreshold = 50; // Very low threshold for "first hint of scroll"
      
      if (heroSection && heroContent) {
        if (scrollY > scrollThreshold) {
          heroContent.style.opacity = "1";
          heroContent.style.transform = "translateY(0)";
          heroSection.classList.add("scrolled");
        } else {
          heroContent.style.opacity = "0";
          heroContent.style.transform = "translateY(50px)";
          heroSection.classList.remove("scrolled");
        }
      }
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Update navigation dots based on scroll position
        const projectSections = document.querySelectorAll('.project-section');
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        projectSections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            updateProjectNavigation(index);
          }
        });
      }, 100);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    console.log("✅ Fallback scroll behavior initialized.");
  }

  /**
   * Updates the active state of the horizontal navigation dots.
   */
  function updateProjectNavigation(activeIndex) {
    const navDots = document.querySelectorAll(".project-nav-dot");
    navDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  }

  /**
   * Initializes click handlers for the navigation dots.
   */
  function initProjectNavigation() {
    const navDots = document.querySelectorAll(".project-nav-dot");
    const projectSections = document.querySelectorAll(".project-section");

    if (!navDots.length || !projectSections.length) return;

    navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        const targetSection = projectSections[index];
        if (targetSection) {
          if (lenis) {
            lenis.scrollTo(targetSection, { duration: 1.5 });
          } else {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  /**
   * Main initialization function
   */
  function initialize() {
    // Ensure hero content is hidden on load (video should be visible first)
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.opacity = "0";
      heroContent.style.transform = "translateY(50px)";
    }
    
    initLenis();
    
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      initScrollAnimations();
      initProjectNavigation();
    }, 100);
  }

  // Initialize on DOM load
  document.addEventListener("DOMContentLoaded", initialize);

  // Refresh on resize
  window.addEventListener("resize", () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });

})();
