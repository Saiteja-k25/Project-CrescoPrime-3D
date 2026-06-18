

export function AboutPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-20">
      <div className="container-wide">
        
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-[0.7rem] font-medium tracking-[0.3em] text-gold uppercase mb-6">
            About Cresco Prime
          </p>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] font-semibold text-text-primary mb-8">
            Where Quant Precision Meets Multi-Asset Alpha.
          </h1>
          <p className="text-[1.15rem] leading-relaxed text-text-secondary mb-12">
            At Cresco Prime, we deploy capital across crypto, commodities, equities, futures, and options with a pure prop-trading mindset. Powered by quantitative models, real-time market intelligence, and institutional-grade risk controls, we target high-probability opportunities in all market conditions.
          </p>
          <p className="text-[1.15rem] leading-relaxed text-text-primary font-medium">
            Momentum. Arbitrage. Breakouts. Hedged derivatives. Every trade is precision-driven. Every risk is measured.
          </p>
        </div>

        {/* Mission Banner */}
        <div className="mt-24 max-w-5xl mx-auto rounded-[2rem] border border-gold/10 bg-gradient-to-br from-bg-elevated/80 to-bg-deep/80 p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-[80px]" />
          <h2 className="relative z-10 font-display text-3xl text-gold mb-4">Our Mission</h2>
          <p className="relative z-10 text-[1.2rem] leading-relaxed text-text-primary">
            To democratize institutional trading by providing serious traders with the capital, tools, and knowledge to compete at the highest level.
          </p>
        </div>

        {/* Founder Quote */}
        <div className="mt-24 max-w-4xl mx-auto">
          <blockquote className="border-l-2 border-emerald pl-8 py-4">
            <p className="text-[1.3rem] leading-relaxed text-text-secondary italic mb-6">
              "Cresco Prime represents a shift in mindset — from dependency to financial independence, from uncertainty to strategy, and from chasing opportunities to building sustainable wealth. Our vision is to help individuals break free from traditional limitations, take ownership of their financial journey, and move confidently toward a future defined by true financial freedom."
            </p>
            <footer className="text-[1rem] font-medium text-text-primary">
              — Kalyan Boddula, <span className="text-gold">Founder</span>
            </footer>
          </blockquote>
        </div>

        {/* Team Section */}
        <div id="team" className="mt-32 max-w-5xl mx-auto pt-20">
          <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-medium text-text-primary mb-4">
            Our Team
          </h2>
          <p className="text-center text-text-secondary mb-16">
            The people behind the strategy.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Team Member 1 */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.04] bg-bg-elevated/20 p-10 text-center transition-all duration-500 hover:border-gold/30 hover:bg-bg-elevated/40">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark shadow-[0_0_30px_rgba(212,175,106,0.2)]">
                  <span className="font-display text-2xl font-bold text-bg-deep">KB</span>
                </div>
                <h3 className="font-display text-2xl text-text-primary mb-2">Kalyan Boddula</h3>
                <p className="font-medium text-gold mb-6">Director & Founder</p>
                <div className="text-[0.85rem] text-text-muted space-y-1">
                  <p>Matrix Missions & Cresco Prime</p>
                  <p>Hyderabad, Telangana</p>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.04] bg-bg-elevated/20 p-10 text-center transition-all duration-500 hover:border-gold/30 hover:bg-bg-elevated/40">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark opacity-80 shadow-[0_0_30px_rgba(212,175,106,0.15)]">
                  <span className="font-display text-2xl font-bold text-bg-deep">VC</span>
                </div>
                <h3 className="font-display text-2xl text-text-primary mb-2">Varun Carter</h3>
                <p className="font-medium text-gold mb-6">Director of Operations</p>
                <div className="text-[0.85rem] text-text-muted space-y-1">
                  <p>Cresco Prime & Matrix Missions</p>
                  <p>Hyderabad, Telangana</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
