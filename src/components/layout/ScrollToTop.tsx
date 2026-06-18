import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // If there's a hash, scroll to it
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200); // Wait for page to render
    } else {
      // Scroll to top instantly on route change
      window.scrollTo(0, 0);
    }
    
    // Refresh all ScrollTriggers so they recalculate element positions for the new page
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, [pathname, hash]);

  return null;
}
