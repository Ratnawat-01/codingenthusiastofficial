// about.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const initAbout = () => {
  // Check if current page is the about page or has about-hero section; exit if not
  const isAboutPage = document.querySelector(".page.about-page") || document.querySelector(".about-hero");
  if (!isAboutPage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstances = []; // Store ScrollTrigger instances for cleanup

  // Initialize animations
  const initAnimations = () => {
    // Clean up existing ScrollTrigger instances
    scrollTriggerInstances.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances = [];

    // Stats items animation (if stats elements exist)
    const statsElements = document.querySelectorAll(".stats-item-1, .stats-item-2, .stats-item-3");
    if (statsElements.length > 0) {
      // Set initial state for stats items
      gsap.set([".stats-item-1", ".stats-item-2", ".stats-item-3"], {
        scale: 0, // Start scaled down
      });

      // Animate stats items
      const statsAnimation = gsap.to(
        [".stats-item-1", ".stats-item-2", ".stats-item-3"],
        {
          scale: 1, // Scale to full size
          duration: 1, // Animation duration
          stagger: 0.1, // Stagger animations by 0.1s
          ease: "power4.out", // Smooth easing
          scrollTrigger: {
            trigger: ".stats", // Trigger element
            start: "top 50%", // Start when top of stats hits 50% of viewport
            toggleActions: "play none none none", // Play animation on enter
          },
        }
      );
      scrollTriggerInstances.push(statsAnimation.scrollTrigger); // Store instance
    }

    // Animations for larger screens (> 1000px)
    if (window.innerWidth > 1000) {
      // Portrait container animation (if element exists)
      const portraitContainer = document.querySelector(".about-hero-portrait-container");
      if (portraitContainer) {
        const portraitAnimation = gsap.to(".about-hero-portrait-container", {
          y: -200, // Move up by 200px
          rotation: -25, // Rotate -25 degrees
          scrollTrigger: {
            trigger: ".about-hero", // Trigger element
            start: "top top", // Start when top of hero hits top of viewport
            end: "bottom top", // End when bottom of hero hits top of viewport
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(portraitAnimation.scrollTrigger); // Store instance
      }

      // Tag animations (if elements exist)
      const tag1 = document.querySelector("#tag-1");
      if (tag1) {
        const tag1Animation = gsap.to("#tag-1", {
          y: -300, // Move up by 300px
          rotation: -45, // Rotate -45 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag1Animation.scrollTrigger); // Store instance
      }

      const tag2 = document.querySelector("#tag-2");
      if (tag2) {
        const tag2Animation = gsap.to("#tag-2", {
          y: -150, // Move up by 150px
          rotation: 70, // Rotate 70 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag2Animation.scrollTrigger); // Store instance
      }

      const tag3 = document.querySelector("#tag-3");
      if (tag3) {
        const tag3Animation = gsap.to("#tag-3", {
          y: -400, // Move up by 400px
          rotation: 120, // Rotate 120 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag3Animation.scrollTrigger); // Store instance
      }

      const tag4 = document.querySelector("#tag-4");
      if (tag4) {
        const tag4Animation = gsap.to("#tag-4", {
          y: -350, // Move up by 350px
          rotation: -60, // Rotate -60 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag4Animation.scrollTrigger); // Store instance
      }

      const tag5 = document.querySelector("#tag-5");
      if (tag5) {
        const tag5Animation = gsap.to("#tag-5", {
          y: -200, // Move up by 200px
          rotation: 100, // Rotate 100 degrees
          scrollTrigger: {
            trigger: ".about-copy", // Trigger element
            start: "top bottom", // Start when top of about-copy hits bottom of viewport
            end: "bottom+=100% top", // End after scrolling 100% beyond bottom
            scrub: 1, // Tie animation to scroll position
          },
        });
        scrollTriggerInstances.push(tag5Animation.scrollTrigger); // Store instance
      }
    }
  };

  // Tap/Hold & Drag functionality for portrait image
  const initPortraitDrag = () => {
    const portrait = document.querySelector(".about-hero-portrait");
    if (!portrait) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const getBaseRotation = () => (window.innerWidth <= 1000 ? 0 : 10);

    portrait.style.cursor = "grab";
    portrait.style.touchAction = "none";

    const getClientCoords = (e) => {
      if (e.touches && e.touches.length > 0) {
        return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
      }
      return { clientX: e.clientX, clientY: e.clientY };
    };

    const startDrag = (e) => {
      if (e.button !== undefined && e.button !== 0) return; // Only main click
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      isDragging = true;
      portrait.classList.add("dragging");

      // Temporarily pause Lenis scroll and lock body overflow
      if (window.__lenis) {
        try { window.__lenis.stop(); } catch (err) {}
      }
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const coords = getClientCoords(e);
      startX = coords.clientX - currentX;
      startY = coords.clientY - currentY;

      window.addEventListener("pointermove", moveDrag, { passive: false });
      window.addEventListener("pointerup", endDrag);
      window.addEventListener("pointercancel", endDrag);

      window.addEventListener("mousemove", moveDrag);
      window.addEventListener("mouseup", endDrag);

      window.addEventListener("touchmove", moveDrag, { passive: false });
      window.addEventListener("touchend", endDrag);
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();

      const coords = getClientCoords(e);
      currentX = coords.clientX - startX;
      currentY = coords.clientY - startY;

      const baseRotation = getBaseRotation();
      portrait.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${baseRotation - 5}deg) scale(1.05)`;
    };

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      portrait.classList.remove("dragging");

      // Restore body overflow and resume Lenis scroll
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.__lenis) {
        try { window.__lenis.start(); } catch (err) {}
      }

      const baseRotation = getBaseRotation();
      portrait.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${baseRotation}deg) scale(1)`;

      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);

      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", endDrag);

      window.removeEventListener("touchmove", moveDrag);
      window.removeEventListener("touchend", endDrag);
    };

    portrait.addEventListener("pointerdown", startDrag, { passive: false });
    portrait.addEventListener("mousedown", startDrag);
    portrait.addEventListener("touchstart", startDrag, { passive: false });
    portrait.addEventListener("dragstart", (e) => e.preventDefault());
  };

  // Run animations on page load
  initAnimations();
  initPortraitDrag();

  // Re-run animations on window resize to recalculate trigger points
  window.addEventListener("resize", () => {
    initAnimations();
  });
};

if (document.readyState === "complete" || document.readyState === "interactive") {
  initAbout();
} else {
  document.addEventListener("DOMContentLoaded", initAbout);
}