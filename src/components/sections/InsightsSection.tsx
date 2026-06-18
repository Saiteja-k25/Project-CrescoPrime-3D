import { useEffect, useRef } from "react";
import { createScrollReveal, createStaggerReveal } from "@/lib/gsap";
import { siteConfig } from "@/config/site";

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    createScrollReveal(sectionRef.current);
    createStaggerReveal(sectionRef.current, "[data-insight-card]", {
      stagger: 0.15,
      y: 40,
    });
  }, []);

  const insights = [
    {
      category: "Gold Analysis",
      title: "XAU/USD Weekly Outlook",
      excerpt:
        "Long-term bullish structure intact with key support developing around the 3,200–3,400 zone. Institutional accumulation patterns visible on higher timeframes.",
      date: "Latest",
    },
    {
      category: "Crypto",
      title: "Bitcoin Market Structure",
      excerpt:
        "Major support holding near $95,000–$98,000 as markets navigate consolidation phase. On-chain metrics suggest continued institutional inflows.",
      date: "Latest",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="section-padding relative overflow-hidden bg-bg-primary"
    >
      <div className="divider-glow absolute top-0 inset-x-0" />

      <div className="container-wide">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              data-reveal
              className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-emerald uppercase"
            >
              Market Intelligence
            </p>
            <h2
              data-reveal
              className="mt-5 font-display text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] font-bold tracking-[-0.02em] text-text-primary"
            >
              Insights that{" "}
              <span className="text-gradient-gold">compound</span> over time.
            </h2>
          </div>
          <a
            data-reveal
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-[0.85rem] font-medium text-text-secondary transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04] hover:text-text-primary"
          >
            View on LinkedIn
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1 11L11 1M11 1H5M11 1V7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {insights.map((post) => (
            <article
              key={post.title}
              data-insight-card
              className="group relative overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] p-8 transition-all duration-500 hover:border-white/[0.08] hover:bg-white/[0.04] md:p-10"
            >
              {/* Top row */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] text-emerald uppercase">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald/60" />
                  <span className="font-mono text-[0.6rem] text-text-muted">
                    {post.date}
                  </span>
                </span>
              </div>

              {/* Content */}
              <h3 className="mt-6 font-display text-xl font-semibold text-text-primary transition-colors duration-300 group-hover:text-gold-soft md:text-2xl">
                {post.title}
              </h3>
              <p className="mt-4 text-[0.95rem] leading-[1.7] text-text-muted">
                {post.excerpt}
              </p>

              {/* Read more */}
              <div className="mt-6 flex items-center gap-2 text-[0.8rem] font-medium text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-emerald">
                Read analysis
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Hover glow */}
              <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-gold/5 opacity-0 blur-[50px] transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
