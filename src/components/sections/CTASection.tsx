import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createScrollReveal } from "@/lib/gsap";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = createScrollReveal(sectionRef.current);
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-48 overflow-hidden bg-bg-deep flex items-center justify-center">
      {/* Immersive Glowing Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-bg-deep to-bg-deep opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-emerald/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Abstract Floating Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full blur-[2px] opacity-20" />
      <div className="absolute bottom-20 right-20 w-64 h-64 border border-gold/10 rounded-full blur-[4px] opacity-30" />

      <div className="container-wide relative z-10 text-center">
        <div data-reveal className="max-w-4xl mx-auto flex flex-col items-center">
          <p className="font-mono text-[0.8rem] font-medium tracking-[0.3em] text-gold uppercase mb-6 drop-shadow-[0_0_10px_rgba(212,175,106,0.3)]">
            Ready to join Cresco Prime?
          </p>
          
          <h2 className="mb-10 font-display text-[clamp(3rem,6vw,5rem)] leading-[1.05] font-semibold text-text-primary text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            Scale your strategy with institutional capital.
          </h2>
          
          <p className="mb-14 text-[1.2rem] leading-relaxed text-text-secondary max-w-2xl">
            Pass our evaluation and gain immediate access to proprietary technology, deep liquidity, and up to $1,000,000 in trading capital.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <SpotlightButton as={Link} to="/careers" className="!px-10 !h-16 !text-[1.1rem]">
              Apply Now
            </SpotlightButton>
            <Link 
              to="/services" 
              className="text-[1.05rem] font-medium text-text-primary hover:text-gold transition-colors flex items-center gap-2"
            >
              Explore Services
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
