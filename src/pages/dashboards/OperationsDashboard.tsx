import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/ui/Logo";
import { 
  LogOut, 
  Settings,
  LayoutDashboard
} from "lucide-react";

export function OperationsDashboard() {
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      {/* Premium Dashboard Header Bar */}
      <header className="border-b border-white/[0.04] bg-[#0A0F1C]/70 backdrop-blur-2xl w-full">
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
              <Settings className="h-3.5 w-3.5" />
              Operations Center
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

      {/* Coming Soon Center Content */}
      <div className="flex-1 flex items-center justify-center container-wide relative z-10 py-16">
        <div className="w-full max-w-xl text-center flex flex-col items-center">
          {/* Central Desk Card with Icon */}
          <div className="mb-8 p-6 rounded-3xl bg-bg-elevated/40 border border-white/[0.04] backdrop-blur-xl shadow-2xl relative">
            <div className="absolute inset-0 rounded-3xl bg-emerald/5 blur-[20px] pointer-events-none" />
            <div className="p-5 rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald shadow-[0_0_20px_rgba(42,157,143,0.2)]">
              <Settings className="h-12 w-12" />
            </div>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-wide">
            Operations Dashboard
          </h2>
          
          <p className="text-text-muted text-[0.95rem] leading-relaxed mb-6 max-w-md">
            The trading performance dashboard for the Operations department will be available once the monthly report is uploaded. Please contact your administrator.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.04] bg-white/[0.02] text-xs text-text-muted uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            More information coming soon. Contact admin panel.
          </div>
        </div>
      </div>
    </div>
  );
}
