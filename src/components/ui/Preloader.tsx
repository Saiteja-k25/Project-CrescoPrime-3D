import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProgress } from "@react-three/drei";
import { gsap } from "@/lib/gsap";
import { Logo } from "@/components/ui/Logo";

export function Preloader() {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(location.pathname !== "/");

  // Re-evaluate when route changes
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsLoaded(true);
      if (containerRef.current) {
        gsap.set(containerRef.current, { display: "none" });
      }
      sessionStorage.setItem("app-ready-fired", "true");
      window.dispatchEvent(new Event("app-ready"));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isLoaded) return;

    // Smooth out the progress counter
    gsap.to(
      { val: displayProgress },
      {
        val: progress,
        duration: 0.5,
        onUpdate: function () {
          setDisplayProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    if (progress === 100) {
      // Start exit animation sequence
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          // Tell the rest of the app to start animating
          sessionStorage.setItem("app-ready-fired", "true");
          window.dispatchEvent(new Event("app-ready"));
        },
      });

      tl.to(logoRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "-=0.2"
        );
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-deep text-text-primary"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <div className="h-[400px] w-[400px] rounded-full bg-emerald/10 blur-[120px]" />
      </div>

      <div ref={logoRef} className="relative z-10 flex flex-col items-center">
        <Logo className="h-16 w-16 text-emerald drop-shadow-[0_0_20px_rgba(42,157,143,0.8)]" />
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="font-display text-4xl font-light tracking-tight md:text-6xl">
            {displayProgress}
            <span className="text-emerald">%</span>
          </div>
          
          <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10 md:w-64">
            <div
              className="h-full bg-emerald transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
          
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-text-muted">
            Initializing Models
          </p>
        </div>
      </div>
    </div>
  );
}
