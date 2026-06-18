import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const location = useLocation();

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <footer className="relative mt-20 border-t border-white/[0.02] bg-bg-deep pb-12 pt-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 h-[1px] w-[500px] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 left-1/2 h-[100px] w-[300px] -translate-x-1/2 bg-gold/5 blur-[50px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-4">
              <Logo className="h-10 w-10 text-emerald drop-shadow-[0_0_15px_rgba(42,157,143,0.8)]" />
              <div>
                <span className="block font-display text-xl font-bold tracking-widest text-text-primary">
                  {siteConfig.name}
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[0.95rem] leading-[1.8] text-text-muted">
              Institutional-grade capital and proprietary technology for serious traders.
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-4">
              <a href="https://www.instagram.com/crescoprime/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-gold/30 hover:text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/cresco-prime/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-text-muted transition-colors hover:border-gold/30 hover:text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="mb-6 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-text-primary uppercase">
                Platform
              </h4>
              <ul className="flex flex-col gap-4 text-[0.95rem] text-text-muted">
                <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
                <li><Link to="/about#team" className="hover:text-gold transition-colors">Our Team</Link></li>
                <li><Link to="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-mono text-[0.7rem] font-semibold tracking-[0.2em] text-text-primary uppercase">
                Legal
              </h4>
              <ul className="flex flex-col gap-4 text-[0.95rem] text-text-muted">
                <li><Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use" className="hover:text-gold transition-colors">Terms of Use</Link></li>
                <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 md:flex-row text-[0.85rem] text-text-muted">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
