// assets/js/particles-config.js
// tsParticles configuration to replace legacy particles.js

(function () {
  function initTsParticles() {
    if (typeof tsParticles === "undefined") {
      console.warn("tsParticles not found. Particle background disabled.");
      return;
    }

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const baseSpeed = prefersReduced ? 0.1 : 0.5;
    const baseLinksOpacity = prefersReduced ? 0.2 : 0.4;
    const baseOpacity = prefersReduced ? 0.4 : 0.6;

    tsParticles
      .load("particles-js", {
        fullScreen: {
          enable: false
        },
        detectRetina: true,
        background: {
          color: "transparent"
        },
        particles: {
          number: {
            value: window.innerWidth < 768 ? 30 : window.innerWidth < 1920 ? 50 : 80,
            density: {
              enable: true,
              area: 800
            }
          },
          color: {
            value: ["#007AFF", "#5856D6", "#AF52DE", "#FF2D92", "#FF9500"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: baseOpacity,
            random: {
              enable: true,
              minimumValue: 0.2
            },
            animation: {
              enable: !prefersReduced,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: {
              enable: true,
              minimumValue: 0.5
            },
            animation: {
              enable: !prefersReduced,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#007AFF",
            opacity: baseLinksOpacity,
            width: 1
          },
          move: {
            enable: true,
            speed: baseSpeed,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out"
            },
            attract: {
              enable: true,
              rotate: {
                x: 600,
                y: 1200
              }
            }
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: !prefersReduced,
              mode: "grab"
            },
            onClick: {
              enable: !prefersReduced,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.8
              }
            },
            push: {
              quantity: 4
            }
          }
        }
      })
      .then(() => console.log("✅ tsParticles initialized"))
      .catch((e) => console.warn("tsParticles init failed:", e));
  }

  document.addEventListener("DOMContentLoaded", initTsParticles);
  window.addEventListener("resize", () => {
    // optional: could dynamically adjust density/number by reloading if needed
  });
})();
