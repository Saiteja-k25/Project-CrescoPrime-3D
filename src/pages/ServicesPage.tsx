
export function ServicesPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-20 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="text-center mb-32">
          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[1.1] font-semibold text-text-primary mb-6">
            Our Services
          </h1>
          <p className="text-[1.2rem] text-text-secondary max-w-2xl mx-auto">
            Institutional-grade infrastructure designed for the modern proprietary trader.
          </p>
        </div>

        {/* Multi-Asset Coverage Section */}
        <div className="mb-40 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-emerald uppercase mb-6">
              Multi-Asset Coverage
            </p>
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] font-semibold text-text-primary mb-8">
              Five asset classes. One unified platform.
            </h2>
            <p className="text-[1.15rem] leading-relaxed text-text-secondary">
              Trade across crypto, commodities, equities, futures, and options without managing multiple platforms. Our infrastructure connects directly to deep liquidity pools, ensuring tight spreads and lightning-fast execution across every asset class.
            </p>
          </div>
          <div className="relative h-[400px] rounded-[2rem] border border-white/[0.04] bg-bg-elevated/20 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald/10 to-transparent" />
            <div className="relative z-10 grid grid-cols-2 gap-4 opacity-50">
               {/* Decorative elements representing assets */}
               <div className="h-20 w-32 rounded-xl border border-white/10 bg-white/5" />
               <div className="h-20 w-32 rounded-xl border border-white/10 bg-white/5 translate-y-8" />
               <div className="h-20 w-32 rounded-xl border border-white/10 bg-white/5" />
               <div className="h-20 w-32 rounded-xl border border-white/10 bg-white/5 translate-y-8" />
            </div>
          </div>
        </div>

        {/* Trader Development Section */}
        <div className="mb-40 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] rounded-[2rem] border border-white/[0.04] bg-bg-elevated/20 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
            <div className="relative z-10 flex flex-col gap-4 w-full px-12 opacity-50">
               {/* Decorative charts */}
               <div className="h-12 w-full rounded-lg border border-white/10 bg-white/5" />
               <div className="h-32 w-full rounded-lg border border-white/10 bg-white/5 flex items-end p-2 gap-2">
                 <div className="w-full bg-gold/40 h-[40%] rounded-sm" />
                 <div className="w-full bg-gold/60 h-[70%] rounded-sm" />
                 <div className="w-full bg-gold/80 h-[50%] rounded-sm" />
                 <div className="w-full bg-gold/100 h-[90%] rounded-sm" />
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-gold uppercase mb-6">
              Trader Development
            </p>
            <h2 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] font-semibold text-text-primary mb-8">
              Train for disciplined, data-backed execution.
            </h2>
            <p className="text-[1.15rem] leading-relaxed text-text-secondary">
              We don't just provide capital. We provide the quantitative models, risk management frameworks, and structured education necessary to turn raw talent into consistent profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
