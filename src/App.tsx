import { useEffect } from "react";
import { registerGsapPlugins } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { HeroSection } from "@/components/sections/HeroSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CTASection } from "@/components/sections/CTASection";

import { AboutPage } from "@/pages/AboutPage";
import { ServicesPage } from "@/pages/ServicesPage";
import { ContactPage } from "@/pages/ContactPage";
import { CareersPage } from "@/pages/CareersPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "@/pages/TermsOfUsePage";
// ... rest of the file ...
import { LoginPage } from "@/pages/LoginPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function App() {
  useLenis();

  useEffect(() => {
    // If the page was explicitly refreshed by the user, force them back to the home page
    // Using modern Navigation API or fallback to performance.navigation
    const isRefresh =
      (window.performance && window.performance.getEntriesByType("navigation")[0] && (window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") ||
      (window.performance && window.performance.navigation && window.performance.navigation.type === 1);
      
    if (isRefresh && window.location.pathname !== "/") {
      window.location.href = "/";
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    registerGsapPlugins();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="noise-overlay">
        <Preloader />
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <HeroSection />
                  <PlatformSection />
                  <HowItWorksSection />
                  <CTASection />
                </main>
              }
            />
            <Route path="/about" element={<main><AboutPage /></main>} />
            <Route path="/services" element={<main><ServicesPage /></main>} />
            <Route path="/contact" element={<main><ContactPage /></main>} />
            <Route path="/careers" element={<main><CareersPage /></main>} />
            <Route path="/login" element={<main><LoginPage /></main>} />
            <Route path="/privacy-policy" element={<main><PrivacyPolicyPage /></main>} />
            <Route path="/terms-of-use" element={<main><TermsOfUsePage /></main>} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
