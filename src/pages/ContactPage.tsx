import { SpotlightButton } from "@/components/ui/SpotlightButton";

export function ContactPage() {
  return (
    <div className="pt-32 lg:pt-40 pb-20 overflow-hidden relative">
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          
          {/* Left Side: Contact Info */}
          <div className="flex flex-col">
            <h1 className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-[1.1] font-semibold text-text-primary mb-12">
              Get in Touch
            </h1>

            <div className="space-y-10 flex-1">
              {/* Email */}
              <div className="flex gap-5">
                <div className="mt-1 text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase mb-2">Email</p>
                  <a href="mailto:hr@crescoprime.com" className="text-[1.1rem] text-text-primary hover:text-gold transition-colors">
                    hr@crescoprime.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex gap-5">
                <div className="mt-1 text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase mb-2">LinkedIn</p>
                  <a href="#" className="text-[1.1rem] text-text-primary hover:text-gold transition-colors">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-5">
                <div className="mt-1 text-gold">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-mono text-[0.7rem] font-medium tracking-[0.2em] text-text-muted uppercase mb-2">Location</p>
                  <address className="text-[1.1rem] text-text-primary not-italic leading-relaxed">
                    NK Avenue, Safari Nagar, Kondapur<br />
                    Hyderabad, Telangana 500084
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-16 border-l-2 border-gold pl-6 py-2">
              <p className="text-text-secondary text-[0.95rem] leading-relaxed">
                For trading inquiries, partnerships, or general questions — we typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            <div className="rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 p-8 md:p-12 backdrop-blur-sm">
              <form 
                className="flex flex-col gap-8" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get("name");
                  const email = formData.get("email");
                  const subject = formData.get("subject");
                  const message = formData.get("message");
                  
                  const mailtoLink = `mailto:hr@crescoprime.com?subject=${encodeURIComponent(
                    `Contact Inquiry: ${subject}`
                  )}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                  )}`;
                  
                  window.location.href = mailtoLink;
                }}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Name</label>
                  <input type="text" id="name" name="name" required minLength={2} className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Email</label>
                  <input type="email" id="email" name="email" required className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Subject</label>
                  <input type="text" id="subject" name="subject" required minLength={3} className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-mono text-[0.65rem] font-medium tracking-[0.2em] text-text-muted uppercase">Message</label>
                  <textarea id="message" name="message" required minLength={10} rows={5} className="w-full resize-none rounded-lg border border-white/10 bg-black/20 p-4 text-text-primary placeholder:text-text-muted/50 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all"></textarea>
                </div>

                <SpotlightButton as="button" className="w-full !h-14 !text-[1.05rem] text-bg-deep border-none !bg-gold hover:opacity-90 mt-2">
                  Send Message
                </SpotlightButton>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
