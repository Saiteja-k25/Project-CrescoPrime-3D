import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { trainingFeatures } from "@/config/site";

export function TrainingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Text side reveals
      gsap.from("[data-train-text]", {
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Feature cards stagger from right
      gsap.from("[data-train-feature]", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-train-features]",
          start: "top 80%",
        },
      });

      // Scroll-driven text change: as user scrolls, text content scrolls within fixed container
      const textBlocks = sectionRef.current!.querySelectorAll("[data-train-text-block]");
      if (textBlocks.length > 0 && window.innerWidth >= 1024) {
        textBlocks.forEach((block) => {
          gsap.from(block, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="training"
      className="section-padding relative overflow-hidden bg-bg-deep"
    >
      {/* Divider */}
      <div className="divider-glow absolute top-0 inset-x-0" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald/5 blur-[120px]" />

      <div className="container-wide grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Left: Text content */}
        <div className="lg:sticky lg:top-32">
          <p
            data-train-text
            className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-emerald uppercase"
          >
            Trader Development
          </p>
          <h2
            data-train-text
            className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-bold tracking-[-0.02em] text-text-primary"
          >
            Train for disciplined,{" "}
            <span className="text-gradient-emerald">data-backed</span>{" "}
            performance.
          </h2>
          <p
            data-train-text
            className="mt-6 text-[1.05rem] leading-[1.75] text-text-secondary"
          >
            Structured pathways for aspiring and advanced traders — built around
            institutional risk frameworks, live market context, and repeatable
            execution habits.
          </p>

          {/* CTA */}
          <a
            data-train-text
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 text-[0.9rem] font-medium text-emerald transition-all duration-300 hover:gap-3"
          >
            Start your journey
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-300"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Right: Feature cards */}
        <div data-train-features className="space-y-4">
          {trainingFeatures.map((feature, i) => (
            <div
              key={feature.title}
              data-train-feature
              data-train-text-block
              className="group rounded-2xl border border-white/[0.04] bg-white/[0.02] p-7 transition-all duration-400 hover:border-emerald/15 hover:bg-white/[0.04]"
            >
              <div className="flex items-start gap-5">
                {/* Number */}
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] font-mono text-[0.7rem] font-medium text-text-muted transition-all duration-300 group-hover:border-emerald/20 group-hover:text-emerald">
                  0{i + 1}
                </span>

                <div>
                  <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-300 group-hover:text-emerald-light">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
