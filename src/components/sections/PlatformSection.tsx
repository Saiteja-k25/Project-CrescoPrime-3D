import { useEffect, useRef, useState } from "react";
import { createScrollReveal } from "@/lib/gsap";
import { Monitor, TrendingUp, BookOpen } from "lucide-react";

export function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = createScrollReveal(sectionRef.current);
    return () => ctx?.revert();
  }, []);

  const features = [
    {
      icon: Monitor,
      title: "Professional Terminals",
      description:
        "Access institutional-grade trading terminals with real-time data, advanced charting, and direct market execution.",
    },
    {
      icon: TrendingUp,
      title: "Portfolio Analytics",
      description:
        "Track every position, measure risk-adjusted returns, and get a clear picture of your trading performance.",
    },
    {
      icon: BookOpen,
      title: "Structured Education",
      description:
        "Learn proven strategies, market structure analysis, and risk management from experienced traders.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="platform"
      className="section-padding relative overflow-hidden bg-bg-deep"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[1px] w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald/20 to-transparent" />

      <div className="container-wide">
        <div className="max-w-3xl">
          <p
            data-reveal
            className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-gold uppercase"
          >
            The Platform
          </p>
          <h2
            data-reveal
            className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.1] font-semibold text-text-primary"
          >
            Everything you need to trade professionally
          </h2>
        </div>

        {/* Interactive List Reveal Layout */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24 items-center">
          {/* Left Side: List */}
          <div className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <button
                key={idx}
                data-reveal="left"
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className={`group flex items-center justify-between border-b border-white/[0.04] pb-6 text-left transition-all duration-300 ${
                  activeIdx === idx ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <h3 className={`font-display text-[clamp(1.5rem,3vw,2rem)] transition-colors duration-300 ${activeIdx === idx ? 'text-gold' : 'text-text-primary'}`}>
                  {feature.title}
                </h3>
                <span className={`text-gold transition-all duration-300 ${activeIdx === idx ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>
                  →
                </span>
              </button>
            ))}
          </div>

          {/* Right Side: Visuals & Description */}
          <div data-reveal="right" className="relative h-full min-h-[350px] w-full rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 backdrop-blur-sm flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-50" />
            
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 p-10 lg:p-16 flex flex-col justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeIdx === idx
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <feature.icon className="mb-8 h-14 w-14 text-gold drop-shadow-[0_0_15px_rgba(212,175,106,0.3)]" strokeWidth={1.5} />
                <h4 className="font-display text-2xl text-text-primary mb-4">{feature.title}</h4>
                <p className="text-[1.05rem] leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
