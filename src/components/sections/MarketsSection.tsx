import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { marketPills } from "@/config/site";

export function MarketsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from("[data-markets-heading]", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Horizontal scroll for market cards
      const track = trackRef.current!;
      const cards = track.querySelectorAll("[data-market-card]");

      gsap.from(cards, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: track,
          start: "top 85%",
        },
      });

      // Horizontal scroll effect on larger screens
      if (window.innerWidth >= 1024) {
        const scrollWidth = track.scrollWidth - track.clientWidth;
        if (scrollWidth > 0) {
          gsap.to(track, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 20%",
              end: () => `+=${scrollWidth}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="markets"
      className="relative overflow-hidden bg-bg-primary py-24 lg:py-0 lg:min-h-screen"
    >
      {/* Divider glow at top */}
      <div className="divider-glow absolute top-0 inset-x-0" />

      <div className="container-wide lg:flex lg:flex-col lg:justify-center lg:min-h-screen">
        <div className="mb-12 max-w-2xl lg:mb-16">
          <p
            data-markets-heading
            className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-emerald uppercase"
          >
            Multi-Asset Coverage
          </p>
          <h2
            data-markets-heading
            className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-bold tracking-[-0.02em] text-text-primary"
          >
            Five asset classes.{" "}
            <span className="text-text-secondary">One unified platform.</span>
          </h2>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-4 lg:overflow-visible scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {marketPills.map((market, i) => (
            <div
              key={market.name}
              data-market-card
              className="group relative min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] p-8 transition-all duration-500 hover:border-emerald/20 hover:bg-white/[0.04] lg:min-w-[260px] lg:flex-1"
            >
              {/* Card number */}
              <span className="font-mono text-[0.65rem] text-text-muted">
                0{i + 1}
              </span>

              {/* Market name */}
              <h3 className="mt-6 font-display text-2xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-emerald-light">
                {market.name}
              </h3>

              {/* Description */}
              <p className="mt-3 text-[0.9rem] leading-relaxed text-text-muted">
                {market.description}
              </p>

              {/* Hover glow */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald/5 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100" />

              {/* Arrow icon */}
              <div className="mt-8 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] text-text-muted transition-all duration-300 group-hover:border-emerald/30 group-hover:text-emerald">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 13L13 1M13 1H5M13 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
