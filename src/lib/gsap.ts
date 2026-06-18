import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  
  // Prevent jumping on mobile resize (address bar show/hide)
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Refresh ScrollTrigger after fonts/images load
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  // Refresh on resize with debounce
  let timeoutId: ReturnType<typeof setTimeout>;
  window.addEventListener("resize", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  registered = true;
}

if (typeof window !== "undefined") {
  registerGsapPlugins();
}

/**
 * Creates a scroll-triggered reveal animation for elements with [data-reveal].
 * Call inside a useEffect with a ref scope and return ctx.revert()
 */
export function createScrollReveal(
  scope: HTMLElement,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
    delay?: number;
  }
) {
  return gsap.context(() => {
    const elements = scope.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    elements.forEach((el) => {
      const direction = (el as HTMLElement).dataset.reveal || "up";

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: prefersReducedMotion ? 0 : (options?.duration ?? 1),
        ease: "power3.out",
        delay: options?.delay ?? 0,
      };

      if (direction === "left") {
        fromVars.x = -60;
      } else if (direction === "right") {
        fromVars.x = 60;
      } else if (direction === "scale") {
        fromVars.scale = 0.92;
      } else {
        fromVars.y = options?.y ?? 40;
      }

      // Initialize element to opacity 0 instantly before trigger to prevent flash
      gsap.set(el, { opacity: 0 });

      gsap.fromTo(el, 
        { ...fromVars, opacity: 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0 : (options?.duration ?? 1),
          ease: "power3.out",
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 95%", // Increased from 88% to ensure it fires even if slightly loaded early
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, scope);
}

/**
 * Staggered reveal for a group of children.
 */
export function createStaggerReveal(
  container: HTMLElement,
  childSelector: string,
  options?: { stagger?: number; duration?: number; y?: number }
) {
  return gsap.context(() => {
    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.set(children, { opacity: 0 });

    gsap.fromTo(children, 
      {
        y: options?.y ?? 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0 : (options?.duration ?? 0.9),
        stagger: options?.stagger ?? 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, container);
}

/**
 * Parallax effect for depth layers.
 */
export function createParallax(
  element: HTMLElement,
  speed: number = 0.3
) {
  gsap.to(element, {
    y: () => -ScrollTrigger.maxScroll(window) * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
}

export { gsap, ScrollTrigger };
