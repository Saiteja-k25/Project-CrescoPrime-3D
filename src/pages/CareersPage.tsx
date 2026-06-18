import { useState } from "react";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

const positions = [
  { title: "Futures Trader", type: "Full-time", location: "Hyderabad" },
  { title: "Stocks Trader", type: "Full-time", location: "Hyderabad" },
  { title: "Options Trader", type: "Full-time", location: "Hyderabad" },
];

export function CareersPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState("Futures Trader");

  const handleApplyClick = (title: string) => {
    setSelectedPosition(title);
    const formEl = document.getElementById("application-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pt-32 lg:pt-40 pb-20">
      <div className="container-wide">
        
        {/* Header */}
        <div className="max-w-3xl text-center mx-auto mb-24">
          <h1 className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] font-semibold text-text-primary mb-6">
            Join Cresco Prime
          </h1>
          <p className="text-[1.2rem] text-text-secondary leading-relaxed">
            We're building a team of disciplined, high-performance traders. If markets are your domain, we want to hear from you.
          </p>
        </div>

        {/* Open Positions Accordion */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="space-y-4">
            {positions.map((pos, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="rounded-2xl border border-white/[0.04] bg-bg-elevated/20 overflow-hidden transition-colors hover:border-gold/30">
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div>
                      <span className="inline-block px-3 py-1 rounded bg-gold/10 text-gold font-mono text-[0.65rem] tracking-wider uppercase mb-3">
                        Open Position
                      </span>
                      <h3 className="font-display text-2xl text-text-primary mb-1">{pos.title}</h3>
                      <p className="text-text-muted text-[0.95rem]">{pos.type} · {pos.location}</p>
                    </div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-gold/10 border-gold/30 text-gold' : 'text-text-muted'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="p-6 pt-0 border-t border-white/[0.04]">
                        <p className="text-text-secondary leading-relaxed mb-6 mt-4">
                          We are seeking an experienced {pos.title} to manage institutional capital and execute high-probability quantitative strategies. You will have access to our proprietary risk models, deep liquidity pools, and advanced trading infrastructure.
                        </p>
                        <button 
                          onClick={() => handleApplyClick(pos.title)}
                          className="text-gold font-medium hover:text-gold-light transition-colors flex items-center gap-2"
                        >
                          Apply for this role
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form */}
        <div id="application-form" className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-text-primary mb-4">Apply Now</h2>
            <p className="text-text-secondary">Fill in the details below and attach your resume. We'll get back to you within 5 business days.</p>
          </div>

          <div className="rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 p-8 md:p-12">
            <form 
              className="flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const fullName = formData.get("fullName");
                const email = formData.get("email");
                const phone = formData.get("phone");
                const position = formData.get("position");
                const experience = formData.get("experience");
                const intro = formData.get("intro");
                
                const mailtoLink = `mailto:kalyan@crescoprime.com?subject=${encodeURIComponent(
                  `Application: ${position} - ${fullName}`
                )}&body=${encodeURIComponent(
                  `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nExperience: ${experience}\n\nIntroduction:\n${intro}`
                )}`;
                
                window.location.href = mailtoLink;
              }}
            >
              
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Full Name *</label>
                <input type="text" id="fullName" name="fullName" required minLength={2} placeholder="John Doe" className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Phone Number</label>
                <input type="tel" id="phone" name="phone" placeholder="+91 XXXXX XXXXX" className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="position" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Position Applied For</label>
                  <select 
                    id="position" 
                    name="position"
                    value={selectedPosition}
                    onChange={(e) => setSelectedPosition(e.target.value)}
                    className="h-12 w-full rounded-lg border border-white/10 bg-[#0f1115] px-4 text-text-primary focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 appearance-none"
                  >
                    <option value="Futures Trader">Futures Trader</option>
                    <option value="Stocks Trader">Stocks Trader</option>
                    <option value="Options Trader">Options Trader</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="experience" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Years of Experience</label>
                  <select id="experience" name="experience" className="h-12 w-full rounded-lg border border-white/10 bg-[#0f1115] px-4 text-text-primary focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 appearance-none">
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="intro" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Brief Introduction</label>
                <textarea id="intro" name="intro" required minLength={20} rows={4} placeholder="Tell us about your trading background, strategies you use, and why you want to join Cresco Prime..." className="w-full resize-none rounded-lg border border-white/10 bg-black/20 p-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50"></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Upload Resume</label>
                <div className="flex items-center h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4">
                  <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="text-[0.9rem] text-text-muted file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-[0.85rem] file:font-medium file:bg-white/10 file:text-text-primary hover:file:bg-white/20 transition-colors" />
                </div>
                <p className="text-[0.75rem] text-text-muted italic mt-1">Please attach your resume in the email that opens after you click Submit.</p>
              </div>

              <SpotlightButton as="button" className="w-full !h-14 !text-[1.05rem] text-bg-deep border-none !bg-gold hover:opacity-90 mt-4">
                Submit Application
              </SpotlightButton>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
