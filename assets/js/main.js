const REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");
const MOBILE_NAV_QUERY = window.matchMedia("(max-width: 920px)");
const HERO_MOTION_QUERY = window.matchMedia("(min-width: 921px)");

function bindMediaQueryChange(query, callback) {
    if (typeof query.addEventListener === "function") {
        query.addEventListener("change", callback);
        return;
    }

    if (typeof query.addListener === "function") {
        query.addListener(callback);
    }
}

function setCurrentYear() {
    const yearNode = document.querySelector("[data-year]");
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }
}

function initPageReady() {
    window.requestAnimationFrame(() => {
        document.body.classList.add("is-ready");
    });
}

function initHeader() {
    const header = document.querySelector(".site-header");
    const navShell = header?.querySelector(".nav-shell");
    const toggle = document.getElementById("nav-toggle");
    const menu = document.getElementById("site-menu");

    if (!header || !navShell || !toggle || !menu) {
        return;
    }

    const setMenuState = (isOpen) => {
        menu.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("nav-open", isOpen && MOBILE_NAV_QUERY.matches);
    };

    const closeMenu = () => setMenuState(false);

    const handleScroll = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    toggle.addEventListener("click", () => {
        setMenuState(!menu.classList.contains("is-open"));
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (MOBILE_NAV_QUERY.matches) {
                closeMenu();
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!MOBILE_NAV_QUERY.matches || !menu.classList.contains("is-open")) {
            return;
        }

        if (navShell.contains(event.target)) {
            return;
        }

        closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    bindMediaQueryChange(MOBILE_NAV_QUERY, () => {
        if (!MOBILE_NAV_QUERY.matches) {
            closeMenu();
        }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    closeMenu();
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
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px"
    });

    revealNodes.forEach((node) => observer.observe(node));
}

function initHeroVideo() {
    const heroMedia = document.querySelector(".hero-media");
    const video = heroMedia?.querySelector(".hero-video");

    if (!heroMedia || !video) {
        return;
    }

    let sourcesLoaded = false;

    const loadSources = () => {
        if (sourcesLoaded) {
            return;
        }

        video.querySelectorAll("source[data-src]").forEach((source) => {
            const { src } = source.dataset;
            if (src) {
                source.src = src;
            }
        });

        video.load();
        sourcesLoaded = true;
    };

    const syncPlayback = () => {
        if (REDUCED_MOTION_QUERY.matches || !HERO_MOTION_QUERY.matches) {
            video.pause();
            heroMedia.classList.remove("is-video-ready");
            return;
        }

        loadSources();

        video.play()
            .then(() => {
                heroMedia.classList.add("is-video-ready");
            })
            .catch(() => {
                heroMedia.classList.remove("is-video-ready");
            });
    };

    video.addEventListener("canplay", () => {
        if (!REDUCED_MOTION_QUERY.matches && HERO_MOTION_QUERY.matches) {
            heroMedia.classList.add("is-video-ready");
        }
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            video.pause();
            return;
        }

        syncPlayback();
    });

    bindMediaQueryChange(REDUCED_MOTION_QUERY, syncPlayback);
    bindMediaQueryChange(HERO_MOTION_QUERY, syncPlayback);

    syncPlayback();
}

function initHeroParallax() {
    const hero = document.querySelector(".hero");
    const heroMedia = document.querySelector(".hero-media");

    if (!hero || !heroMedia || REDUCED_MOTION_QUERY.matches) {
        return;
    }

    let rafId = 0;

    const update = () => {
        rafId = 0;

        if (!HERO_MOTION_QUERY.matches) {
            heroMedia.style.setProperty("--hero-parallax", "0px");
            return;
        }

        const rect = hero.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        heroMedia.style.setProperty("--hero-parallax", `${progress * 18}px`);
    };

    const requestTick = () => {
        if (rafId) {
            return;
        }

        rafId = window.requestAnimationFrame(update);
    };

    bindMediaQueryChange(HERO_MOTION_QUERY, requestTick);
    window.addEventListener("resize", requestTick);
    window.addEventListener("scroll", requestTick, { passive: true });
    requestTick();
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
        submitButton.setAttribute("aria-busy", "true");
        submitButton.textContent = "Sending Message...";

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
            submitButton.removeAttribute("aria-busy");
            submitButton.textContent = defaultButtonText;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();
    initPageReady();
    initHeader();
    initSmoothScroll();
    initRevealAnimations();
    initHeroVideo();
    initHeroParallax();
    initContactForm();
});
