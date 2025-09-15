// assets/js/scroll-animations.js
// Consolidated, corrected, and enhanced scroll logic for the entire site.

(function() {
  "use strict";

  let lenis;

  /**
   * Initializes Lenis for smooth scrolling.
   * Lenis normalizes scroll events, providing a consistent base for animations.
   */
  function initLenis() {
    if (typeof Lenis === "undefined") {
      console.warn("Lenis not found. Smooth scroll disabled.");
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

    // Expose lenis globally for other scripts (e.g., nav clicks)
    window.lenis = lenis;

    // Integrate GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    console.log("✅ Lenis smooth scroll initialized.");
  }

  /**
   * Main function to set up all GSAP-based scroll animations.
   */
  function initScrollAnimations() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP or ScrollTrigger not found. Animations disabled.");
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = () => window.innerWidth > 768;

    // --- MASTER TIMELINE ---
    // This timeline orchestrates the entire page scroll sequence:
    // 1. Hero content fades in.
    // 2. Horizontal section pins and scrolls.
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // --- 1. HERO SECTION ANIMATION ---
    const heroSection = document.querySelector(".hero-section");
    const heroContent = document.querySelector(".hero-content");
    const projectsContainer = document.querySelector(".projects-container");

    if (heroSection && heroContent && projectsContainer) {
      // Initially, hide the hero content.
      gsap.set(heroContent, { opacity: 0, y: 50 });

      // Create a dedicated timeline for the hero reveal.
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top", // Pin the hero for its full height
          pin: true,
          scrub: true,
          pinSpacing: true, // Ensures space is maintained after pin
          onLeave: () => {
            // Ensure the horizontal section starts exactly where the hero ends
            ScrollTrigger.refresh();
          },
        },
      });

      // Animate the hero content to fade in as the user starts to scroll.
      heroTimeline.to(heroContent, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
      }, 0); // The '0' places this animation at the start of the timeline.
    }

    // --- 2. HORIZONTAL SCROLLING SECTION ---
    const projectSections = gsap.utils.toArray(".projects-container .project-section");
    if (projectSections.length > 0) {
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
          end: () => "+=" + (projectsContainer.offsetWidth - window.innerWidth),
          onUpdate: (self) => {
            const activeIndex = Math.round(self.progress * (projectSections.length - 1));
            updateProjectNavigation(activeIndex);
          },
        },
      });

      // Per-section parallax and reveal effects
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

        // Auto-opening modals (if configured)
        const modalId = section.getAttribute("data-modal-id");
        if (modalId && section.getAttribute("data-auto-open-modal") === "true") {
          ScrollTrigger.create({
            trigger: section,
            containerAnimation: horizontalTween,
            start: "center center",
            onEnter: () => isDesktop() && typeof window.openModalById === "function" && window.openModalById(modalId),
            onLeave: () => isDesktop() && typeof window.closeModalById === "function" && window.closeModalById(modalId),
            onEnterBack: () => isDesktop() && typeof window.openModalById === "function" && window.openModalById(modalId),
            onLeaveBack: () => isDesktop() && typeof window.closeModalById === "function" && window.closeModalById(modalId),
          });
        }
      });
    }
    console.log("✅ All scroll animations initialized.");
  }

  /**
   * Updates the active state of the horizontal navigation dots.
   * @param {number} activeIndex - The index of the currently active section.
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
    const container = document.querySelector(".projects-container");

    if (!navDots.length || !container) return;

    navDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        if (lenis) {
          // Calculate the scroll position that corresponds to the start of the clicked section
          const scrollTriggerInstance = ScrollTrigger.getById("horizontal-scroll"); // We need to add an ID
          if (scrollTriggerInstance) {
            const sectionWidth = container.offsetWidth / navDots.length;
            const targetScroll = scrollTriggerInstance.start + (index * sectionWidth);
            lenis.scrollTo(targetScroll, { duration: 1.5 });
          }
        }
      });
    });
  }

  /**
   * Main initialization function, called after the DOM is loaded.
   */
  function initialize() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    initLenis();
    // Use a small timeout to ensure all elements are rendered before calculating positions
    setTimeout(() => {
      initScrollAnimations();
      initProjectNavigation();
    }, 100);
  }

  // --- Event Listeners ---
  document.addEventListener("DOMContentLoaded", initialize);

  window.addEventListener("resize", () => {
    // Refresh ScrollTrigger on resize to recalculate positions
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });

})();
