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
import { LoginPage } from "@/pages/LoginPage";
import { DashboardHub } from "@/pages/DashboardHub";
import { CryptoDashboard } from "@/pages/dashboards/CryptoDashboard";
import { CommoditiesDashboard } from "@/pages/dashboards/CommoditiesDashboard";
import { OperationsDashboard } from "@/pages/dashboards/OperationsDashboard";
import { AccountsDashboard } from "@/pages/dashboards/AccountsDashboard";
import { HRDashboard } from "@/pages/dashboards/HRDashboard";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="noise-overlay">
      <Preloader />
      {!isDashboard && <Navbar />}
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
          <Route path="/dashboard" element={<ProtectedRoute><main><DashboardHub /></main></ProtectedRoute>} />
          <Route path="/dashboard/crypto" element={<ProtectedRoute><main><CryptoDashboard /></main></ProtectedRoute>} />
          <Route path="/dashboard/commodities" element={<ProtectedRoute><main><CommoditiesDashboard /></main></ProtectedRoute>} />
          <Route path="/dashboard/operations" element={<ProtectedRoute><main><OperationsDashboard /></main></ProtectedRoute>} />
          <Route path="/dashboard/accounts" element={<ProtectedRoute><main><AccountsDashboard /></main></ProtectedRoute>} />
          <Route path="/dashboard/hr" element={<ProtectedRoute><main><HRDashboard /></main></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<main><PrivacyPolicyPage /></main>} />
          <Route path="/terms-of-use" element={<main><TermsOfUsePage /></main>} />
        </Routes>
      </ErrorBoundary>
      {!isDashboard && <Footer />}
    </div>
  );
}

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
      <AuthProvider>
        <ScrollToTop />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
