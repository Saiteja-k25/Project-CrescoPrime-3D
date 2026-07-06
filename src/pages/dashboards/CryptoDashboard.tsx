import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/ui/Logo";
import { 
  LogOut, 
  Bitcoin,
  LayoutDashboard
} from "lucide-react";

export function CryptoDashboard() {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const [hasReport, setHasReport] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Quick head request to check if crypto.html has been placed in the public/reports folder
    fetch("/reports/crypto.html", { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHasReport(true);
        } else {
          setHasReport(false);
        }
      })
      .catch(() => setHasReport(false))
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col relative overflow-hidden h-screen">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      {/* Premium Dashboard Header Bar */}
      <header className="border-b border-white/[0.04] bg-[#0A0F1C]/70 backdrop-blur-2xl w-full shrink-0">
        <div className="container-wide flex h-[4.5rem] items-center justify-between lg:h-[5rem]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="group flex items-center gap-3">
              <Logo className="h-10 w-10 text-emerald drop-shadow-[0_0_15px_rgba(42,157,143,0.8)] transition-all duration-300" />
              <div className="flex flex-col">
                <span className="font-display text-[0.8rem] font-semibold tracking-[0.2em] text-text-primary uppercase">
                  Cresco
                </span>
                <span className="font-display text-[0.58rem] font-medium tracking-[0.35em] text-text-secondary uppercase">
                  Prime
                </span>
              </div>
            </Link>
            
            {/* Department Indicator Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-xs font-semibold uppercase tracking-wider ml-4">
              <Bitcoin className="h-3.5 w-3.5" />
              Crypto Desk
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-5">
            <span className="text-xs text-text-muted hidden md:inline">
              Console: <span className="text-text-secondary font-medium">{userEmail}</span>
            </span>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 py-2 px-4 rounded-lg border border-white/10 bg-white/5 text-text-secondary text-sm font-medium hover:bg-white/10 hover:text-text-primary transition-all cursor-pointer"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-2 px-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500 hover:text-bg-deep transition-all cursor-pointer uppercase tracking-wider"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {checking ? (
        <div className="flex-1 flex items-center justify-center container-wide relative z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-r-2 border-emerald" />
            <span className="font-display text-xs font-semibold tracking-wider text-text-muted uppercase">
              Loading Terminal Data
            </span>
          </div>
        </div>
      ) : hasReport ? (
        /* Full-screen embedded report */
        <div className="flex-1 p-6 md:p-8 bg-[#070b13]/50 flex flex-col h-full overflow-hidden relative z-10">
          <div className="flex-1 flex flex-col h-full rounded-2xl border border-white/[0.04] overflow-hidden bg-bg-deep relative">
            <iframe
              src="/reports/crypto.html"
              className="w-full h-full border-none bg-white"
              title="Crypto Report"
            />
          </div>
        </div>
      ) : (
        /* Coming Soon Center Content */
        <div className="flex-1 flex items-center justify-center container-wide relative z-10 py-16">
          <div className="w-full max-w-xl text-center flex flex-col items-center">
            {/* Central Desk Card with Icon */}
            <div className="mb-8 p-6 rounded-3xl bg-bg-elevated/40 border border-white/[0.04] backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 rounded-3xl bg-emerald/5 blur-[20px] pointer-events-none" />
              <div className="p-5 rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald shadow-[0_0_20px_rgba(42,157,143,0.2)]">
                <Bitcoin className="h-12 w-12" />
              </div>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-wide">
              Crypto Dashboard
            </h2>
            
            <p className="text-text-muted text-[0.95rem] leading-relaxed mb-6 max-w-md">
              The trading performance dashboard for the Crypto department will be available once the monthly report is uploaded. Please contact your administrator.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.04] bg-white/[0.02] text-xs text-text-muted uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              More information coming soon. Contact admin panel.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
