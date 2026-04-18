const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");

function setCurrentYear() {
    const yearNode = document.querySelector("[data-year]");
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }
}

function initHeader() {
    const header = document.querySelector(".site-header");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("site-menu");

    if (!header || !toggle || !menu) {
        return;
    }

    const closeMenu = () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
    };

    const handleScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 10);
    };

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.classList.toggle("nav-open", isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
}

function initSmoothScroll() {
    const header = document.querySelector(".site-header");
    if (!header) {
        return;
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            const offset = header.offsetHeight + 12;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({
                top,
                behavior: REDUCED_MOTION_QUERY.matches ? "auto" : "smooth"
            });

            if (history.replaceState) {
                history.replaceState(null, "", targetId);
            }
        });
    });
}

function initRevealAnimations() {
    const revealNodes = document.querySelectorAll(".reveal");
    if (!revealNodes.length) {
        return;
    }

    if (REDUCED_MOTION_QUERY.matches || !("IntersectionObserver" in window)) {
        revealNodes.forEach((node) => node.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
    });

    revealNodes.forEach((node) => observer.observe(node));
}

function initHeroVideo() {
    const video = document.querySelector(".hero-video");
    if (!video) {
        return;
    }

    const syncMotionPreference = () => {
        if (REDUCED_MOTION_QUERY.matches) {
            video.pause();
            return;
        }

        video.play().catch(() => {
            /* Autoplay can fail silently depending on browser policy. */
        });
    };

    syncMotionPreference();

    if (typeof REDUCED_MOTION_QUERY.addEventListener === "function") {
        REDUCED_MOTION_QUERY.addEventListener("change", syncMotionPreference);
    } else if (typeof REDUCED_MOTION_QUERY.addListener === "function") {
        REDUCED_MOTION_QUERY.addListener(syncMotionPreference);
    }
}

function initContactForm() {
    const form = document.getElementById("contact-form");
    const submitButton = document.getElementById("submit-btn");
    const statusNode = document.getElementById("form-status");

    if (!form || !submitButton || !statusNode) {
        return;
    }

    const defaultButtonText = submitButton.textContent;
    let hideStatusTimer = null;

    const showStatus = (message, state) => {
        statusNode.textContent = message;
        statusNode.className = `form-status ${state} is-visible`;

        if (hideStatusTimer) {
            window.clearTimeout(hideStatusTimer);
        }

        hideStatusTimer = window.setTimeout(() => {
            statusNode.classList.remove("is-visible");
        }, 10000);
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            company: formData.get("company") || "Not specified",
            project: formData.get("project") || "Not specified",
            message: formData.get("message")
        };

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(form.action || "https://formspree.io/f/xeozyrwa", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            form.reset();
            showStatus("Message sent successfully. We will get back to you within 24 hours.", "is-success");
        } catch (error) {
            showStatus(
                "Sorry, there was an error sending your message. Please try again or email info@gerdsen.ai.",
                "is-error"
            );
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = defaultButtonText;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    initHeader();
    initSmoothScroll();
    initRevealAnimations();
    initHeroVideo();
    initContactForm();
});
