import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { navLinks, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header
      id="navbar"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
        scrolled || menuOpen
          ? "border-b border-white/[0.04] bg-[#0A0F1C]/70 backdrop-blur-2xl"
          : "bg-transparent"
      } ${hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container-wide flex h-[4.5rem] items-center justify-between lg:h-[5rem]">
        {/* Logo */}
        <Link
          to="/"
          className="group relative z-50 flex items-center gap-3"
          aria-label={siteConfig.name}
          onClick={(e) => {
            setMenuOpen(false);
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo className="h-10 w-10 text-emerald drop-shadow-[0_0_15px_rgba(42,157,143,0.8)] transition-all duration-300 hover:drop-shadow-[0_0_25px_rgba(42,157,143,1)]" />
          <div className="hidden flex-col sm:flex">
            <span className="font-display text-[0.8rem] font-semibold tracking-[0.2em] text-text-primary uppercase">
              Cresco
            </span>
            <span className="font-display text-[0.58rem] font-medium tracking-[0.35em] text-text-secondary uppercase">
              Prime
            </span>
          </div>
        </Link>

        {/* Desktop Center */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-[0.85rem] font-medium text-text-secondary transition-colors hover:text-emerald"
              style={{
                color: window.location.pathname === link.href ? "var(--color-emerald)" : undefined
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden items-center gap-5 lg:flex">
          <SpotlightButton as={Link} to="/login" className="!h-10 !px-6 !text-[0.85rem] !bg-emerald border-none text-bg-deep hover:bg-emerald-light">
            Login / Sign up
          </SpotlightButton>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          type="button"
          className="relative z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl lg:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-text-primary transition-all duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-bg-deep transition-all duration-500 lg:hidden ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-[20%] left-[20%] h-[300px] w-[300px] rounded-full bg-emerald/10 blur-[100px] pointer-events-none" />

      {/* Top spacing to avoid overlap with header logo/hamburger */}
      <div className="h-[4.5rem] w-full shrink-0" />

      <nav
        className="relative z-10 flex flex-1 flex-col justify-start gap-8 px-10 pt-6 pb-20 overflow-y-auto"
        aria-label="Mobile"
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            to={link.href}
            className={`font-display text-4xl font-semibold transition-all duration-500 hover:text-emerald ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? `${100 + i * 50}ms` : "0ms",
              color: window.location.pathname === link.href ? "var(--color-emerald)" : "var(--color-text-primary)"
            }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        
        <div
          className={`mt-10 transition-all duration-500 ${
            menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: menuOpen ? `${100 + navLinks.length * 50}ms` : "0ms",
          }}
        >
          <SpotlightButton as={Link} to="/login" onClick={() => setMenuOpen(false)} className="w-full !h-14 !text-lg !bg-emerald border-none text-bg-deep">
            Login / Sign up
          </SpotlightButton>
        </div>
      </nav>
    </div>
    </>
  );
}
