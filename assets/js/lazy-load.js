// assets/js/lazy-load.js
// Initialize Vanilla LazyLoad for images/videos with class="lazy"
(function () {
  function initLazy() {
    if (typeof LazyLoad === "undefined") {
      console.warn("Vanilla LazyLoad not found. Skipping lazy loader init.");
      return;
    }

    // Default configuration: targets elements with .lazy and uses data-src / data-srcset
    // See https://www.andreaverlicchi.eu/vanilla-lazyload/
    // Example usage:
    // <img class="lazy" data-src="image.jpg" alt="..." />
    // <source class="lazy" data-srcset="video-720.mp4" type="video/mp4" />
    // <video class="lazy" data-poster="poster.jpg">...</video>
    new LazyLoad({
      elements_selector: ".lazy",
      threshold: 300,
      data_src: "src",
      data_srcset: "srcset",
      data_sizes: "sizes",
      use_native: false
    });

    console.log("✅ Vanilla LazyLoad initialized");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLazy);
  } else {
    initLazy();
  }
})();
