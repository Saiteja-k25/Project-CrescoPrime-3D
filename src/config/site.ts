export const siteConfig = {
  name: "Cresco Prime",
  tagline: "Where Quant Precision Meets Multi-Asset Alpha.",
  description:
    "We deploy capital across crypto, commodities, equities, futures, and options with a pure prop-trading mindset — powered by quantitative models, real-time market intelligence, and institutional-grade risk controls.",
  shortDescription:
    "Momentum. Arbitrage. Breakouts. Hedged derivatives. Every trade is precision-driven. Every risk is measured.",
  url: "https://crescoprime.com",
  linkedin: "https://www.linkedin.com/company/cresco-prime/",
  email: "hello@crescoprime.com",
  whatsapp: "https://wa.me/message/YOUR_WHATSAPP_LINK",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
] as const;

export const footerLinks = {
  platform: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "Team", href: "/about#team" },
  ],
  company: [
    { label: "Services", href: "/services" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
} as const;

export const heroStats = [
  { value: "5+", suffix: "", label: "Asset Classes" },
  { value: "24", suffix: "/7", label: "Market Coverage" },
  { value: "100", suffix: "%", label: "Risk Measured" },
] as const;

export const marketPills = [
  { name: "Crypto", description: "BTC/USD, ETH/USD & Liquid Majors" },
  { name: "Commodities", description: "XAU/USD, XAG/USD, WTI" },
  { name: "Equities", description: "Global Indices & Mega-caps" },
  { name: "Futures", description: "ES, NQ & Treasury Futures" },
  { name: "Options", description: "Hedged Derivatives & Volatility" },
] as const;

export const trainingFeatures = [
  {
    title: "Quantitative Model Literacy",
    description: "Master the mathematical frameworks that drive institutional trading decisions.",
  },
  {
    title: "Multi-Asset Strategy Modules",
    description: "Learn to operate across crypto, commodities, equities, futures, and options.",
  },
  {
    title: "Live Terminal Simulations",
    description: "Practice with real market data in our institutional-grade simulation environment.",
  },
  {
    title: "Risk-First Execution Drills",
    description: "Build the discipline of measuring risk before every single trade entry.",
  },
] as const;
