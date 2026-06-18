import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const steps = [
  {
    title: "Account Setup & Evaluation",
    description: "Complete our rigorous onboarding process. We assess your trading history, risk management capabilities, and strategic approach before granting capital access.",
    highlights: ["KYC/AML verification", "Strategy review", "Risk parameter configuration"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m19 11 3 3-3 3" />
        <path d="M22 14h-6" />
      </svg>
    )
  },
  {
    title: "Capital Allocation",
    description: "Upon approval, receive instant access to institutional-grade capital. We provide the liquidity necessary to execute your strategies at scale without personal risk.",
    highlights: ["Up to $1M initial allocation", "Tiered scaling plan", "No personal liability"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="12" x="2" y="6" rx="2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M6 12h.01M18 12h.01" />
      </svg>
    )
  },
  {
    title: "Trade Execution",
    description: "Deploy capital using our ultra-low latency infrastructure. Our proprietary risk engine monitors all positions in real-time to ensure parameter compliance.",
    highlights: ["Direct market access", "Real-time risk monitoring", "Multi-asset support"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  },
  {
    title: "Profit Distribution",
    description: "Keep the lion's share of the alpha you generate. Our automated settlement system processes payouts swiftly, letting you focus entirely on the markets.",
    highlights: ["Up to 90% profit split", "Bi-weekly payouts", "Crypto & fiat support"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    // Use gsap.context to ensure complete cleanup of ScrollTrigger DOM mutations (pin-spacers)
    // This strictly prevents React "NotFoundError: Failed to execute 'removeChild'" crashes on unmount
    let ctx = gsap.context(() => {
      // Use a tiny delay inside the context to ensure fonts/images are loaded for correct scrollWidth
      const timer = setTimeout(() => {
        const track = trackRef.current!;
        const scrollAmount = track.scrollWidth - window.innerWidth;
        
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        pinTl.to(track, {
          x: () => -scrollAmount,
          ease: "none"
        });
      }, 50);

      // Store the timer so ctx.revert() can clear it if unmounted early
      return () => clearTimeout(timer);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-bg-deep overflow-hidden"
      // Added height to ensure pinning works beautifully
      style={{ height: '100vh' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-bg-deep to-bg-deep" />

      {/* Fixed Header */}
      <div className="absolute top-16 lg:top-24 left-0 w-full z-10 px-6 md:px-12 lg:px-24">
        <p className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-gold uppercase mb-4">
          The Process
        </p>
        <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] font-semibold text-text-primary">
          How Cresco Prime Works
        </h2>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="absolute top-1/2 -translate-y-1/2 flex items-center gap-8 px-6 md:px-12 lg:px-24 w-max"
      >
        {steps.map((step, index) => (
          <div 
            key={index}
            className="w-[85vw] max-w-[500px] h-[450px] shrink-0 rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 p-10 flex flex-col backdrop-blur-md relative overflow-hidden group"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="font-display text-6xl text-white/[0.03] font-bold">0{index + 1}</span>
                <div className="h-12 w-12 rounded-full border border-gold/20 bg-gold/10 flex items-center justify-center text-gold">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="font-display text-3xl text-text-primary mb-4">{step.title}</h3>
              <p className="text-[1.05rem] leading-relaxed text-text-secondary mb-8 flex-1">
                {step.description}
              </p>
              
              <ul className="space-y-3">
                {step.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-center gap-3 text-[0.95rem] text-text-muted">
                    <span className="text-gold">✦</span> {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        {/* Spacer for ending pad */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}
