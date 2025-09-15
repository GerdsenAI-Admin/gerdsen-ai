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

      // Hero overlay effect - show overlay text on first scroll hint
      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // On first hint of scroll (even 5% progress), show the overlay
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
          } else {
            heroSection.classList.remove("scrolled");
          }
        }
      });
    }

    // --- HORIZONTAL SCROLLING SECTION ---
    const projectSections = gsap.utils.toArray(".projects-container .project-section");
    if (projectSections.length > 0 && projectsContainer) {
      
      // Create horizontal scrolling animation
      const horizontalTween = gsap.to(projectSections, {
        xPercent: -100 * (projectSections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".projects-container",
          pin: true,
          scrub: 1,
          snap: prefersReducedMotion ? false : {
            snapTo: 1 / (projectSections.length - 1),
            duration: 0.3,
            delay: 0.1,
          },
          end: () => "+=" + (projectsContainer.offsetWidth * (projectSections.length - 1)),
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (projectSections.length - 1));
            updateProjectNavigation(activeIndex);
          },
        },
      });

      // Per-section parallax and modal effects
      projectSections.forEach((section, i) => {
        
        // Parallax for elements with [data-parallax]
        if (!prefersReducedMotion) {
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
        }

        // Auto-opening modals for specific sections
        const modalId = section.getAttribute("data-modal-id");
        if (modalId && section.getAttribute("data-auto-open-modal") === "true") {
          ScrollTrigger.create({
            trigger: section,
            containerAnimation: horizontalTween,
            start: "center center",
            onEnter: () => {
              if (isDesktop() && typeof window.openModalById === "function") {
                window.openModalById(modalId);
              }
            },
            onLeave: () => {
              if (isDesktop() && typeof window.closeModalById === "function") {
                window.closeModalById(modalId);
              }
            },
            onEnterBack: () => {
              if (isDesktop() && typeof window.openModalById === "function") {
                window.openModalById(modalId);
              }
            },
            onLeaveBack: () => {
              if (isDesktop() && typeof window.closeModalById === "function") {
                window.closeModalById(modalId);
              }
            },
          });
        }

        // Modal triggers on scroll for clickable service cards
        const modalTriggers = section.querySelectorAll('.modal-trigger');
        modalTriggers.forEach(trigger => {
          ScrollTrigger.create({
            trigger: trigger,
            containerAnimation: horizontalTween,
            start: "center center",
            end: "center center",
            onToggle: (self) => {
              if (self.isActive && isDesktop()) {
                // Add a visual hint that the modal can be opened
                gsap.to(trigger, { scale: 1.05, boxShadow: "0 10px 30px rgba(0, 122, 255, 0.3)", duration: 0.3 });
              } else {
                gsap.to(trigger, { scale: 1, boxShadow: "none", duration: 0.3 });
              }
            }
          });
        });
      });
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
