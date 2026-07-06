import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { CanvasErrorBoundary } from "@/components/three/CanvasErrorBoundary";
import { StarBorder } from "@/components/ui/StarBorder";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const handleReady = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(
            "[data-hero-heading] .word",
            {
              y: 30,
              opacity: 0,
              duration: 2,
              stagger: 0.1,
              ease: "power2.out",
            }
          )
          .from(
            "[data-hero-sub]",
            {
              y: 20,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1.5"
          )
          .from(
            "[data-hero-buttons]",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4"
          )
          .from(
            "[data-hero-scroll]",
            {
              opacity: 0,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.2"
          );
      }, sectionRef);
    };

    // If app-ready already fired (navigating back to home), trigger immediately
    if (sessionStorage.getItem("app-ready-fired") === "true") {
      handleReady();
    } else {
      window.addEventListener("app-ready", handleReady);
    }

    return () => {
      window.removeEventListener("app-ready", handleReady);
      if (ctx) ctx.revert();
    };
  }, []);

  const headingWords = siteConfig.tagline.split(" ");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-bg-deep"
    >
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="ambient-glow ambient-glow--emerald absolute -top-[10%] -right-[5%] h-[500px] w-[500px]" />
        <div className="ambient-glow ambient-glow--gold absolute top-[40%] -left-[10%] h-[400px] w-[400px]" />
        <div className="ambient-glow ambient-glow--emerald absolute bottom-[5%] right-[20%] h-[300px] w-[300px] opacity-50" />
      </div>

      {/* 3D Canvas */}
      <CanvasErrorBoundary>
        <HeroCanvas />
      </CanvasErrorBoundary>

      {/* Content */}
      <div className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-center pb-20 pt-28 lg:pt-32">
        <div className="max-w-3xl pointer-events-none">
          {/* Heading - split into words */}
          <h1
            data-hero-heading
            className="font-display text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-text-primary"
          >
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="word inline-block"
                style={{ marginRight: "0.3em" }}
              >
                {word}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            data-hero-sub
            className="mt-7 max-w-xl text-[1.05rem] leading-[1.75] text-text-secondary md:text-lg"
          >
            Cresco Prime gives serious traders access to institutional capital,
            professional terminals, and the education to become consistently profitable.
          </p>
        </div>

        {/* CTA Buttons */}
        <div data-hero-buttons className="mt-12 lg:mt-auto flex flex-col sm:flex-row gap-6 max-w-md lg:max-w-none relative z-20">
          <StarBorder as={Link} to="/careers" color="#2a9d8f" className="star-border-large !rounded-xl text-text-primary font-semibold cursor-pointer">
            Start Trading
          </StarBorder>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-hero-scroll
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[0.65rem] font-medium tracking-[0.3em] text-text-muted uppercase">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden">
            <div
              className="h-full w-full bg-gradient-to-b from-emerald to-transparent"
              style={{ animation: "scroll-indicator 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
