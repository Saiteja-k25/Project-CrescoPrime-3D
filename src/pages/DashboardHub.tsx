import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DEPARTMENTS } from "@/config/departments";
import { Logo } from "@/components/ui/Logo";
import { 
  LogOut, 
  Shield, 
  ArrowRight,
  Bitcoin, 
  TrendingUp, 
  Settings, 
  Wallet, 
  Users 
} from "lucide-react";

function getDeptIcon(iconName: string, className = "h-6 w-6") {
  switch (iconName) {
    case "Bitcoin":
      return <Bitcoin className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Settings":
      return <Settings className={className} />;
    case "Wallet":
      return <Wallet className={className} />;
    case "Users":
      return <Users className={className} />;
    default:
      return <Settings className={className} />;
  }
}

export function DashboardHub() {
  const { userEmail, department, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (department) {
      navigate(`/dashboard/${department}`, { replace: true });
    }
  }, [department, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (department) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-deep pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-emerald/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />

      {/* Premium Dashboard Header Bar */}
      <header className="border-b border-white/[0.04] bg-[#0A0F1C]/70 backdrop-blur-2xl sticky top-0 z-40 w-full mb-12">
        <div className="container-wide flex h-[4.5rem] items-center justify-between lg:h-[5rem]">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
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

          {/* Right actions */}
          <div className="flex items-center gap-6">
            <span className="text-xs text-text-muted hidden sm:inline">
              Welcome back, <span className="text-text-secondary font-medium">{userEmail}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-2 px-4 rounded-lg border border-white/10 bg-white/5 text-text-secondary text-sm font-medium hover:bg-white/10 hover:text-text-primary transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container-wide relative z-10">
        {/* Info Box */}
        <div className="rounded-2xl border border-white/[0.04] bg-bg-elevated/20 p-5 mb-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald/5 border border-emerald/10 text-emerald shrink-0 w-fit">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-0.5">Secure Route Guards Active</h3>
            <p className="text-xs text-text-muted">
              You are authenticated to access your department trading desk. Keep session credentials private.
            </p>
          </div>
        </div>

        {/* Grid of Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(DEPARTMENTS).map((dept) => {
            const isAssigned = department === dept.id;
            return (
              <div
                key={dept.id}
                onClick={() => navigate(dept.dashboardPath)}
                className={`group rounded-2xl border p-6 backdrop-blur-xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-[220px] relative overflow-hidden ${
                  isAssigned
                    ? "bg-bg-elevated/50 border-emerald/30 shadow-[0_0_30px_rgba(42,157,143,0.1)] hover:border-emerald/50"
                    : "bg-bg-elevated/30 border-white/[0.04] hover:bg-bg-elevated/40 hover:border-white/10"
                }`}
              >
                {/* Visual badge for current logged-in department */}
                {isAssigned && (
                  <div className="absolute top-0 right-0 bg-emerald/10 border-b border-l border-emerald/20 text-emerald text-[0.62rem] font-bold tracking-widest px-3.5 py-1.5 rounded-bl-xl uppercase">
                    Active Desk
                  </div>
                )}

                <div>
                  <div className={`p-3.5 rounded-xl w-fit mb-5 border transition-all duration-300 ${
                    isAssigned
                      ? "bg-emerald/10 border-emerald/20 text-emerald group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(42,157,143,0.3)]"
                      : "bg-white/5 border-white/[0.02] text-text-secondary group-hover:text-text-primary"
                  }`}>
                    {getDeptIcon(dept.iconName, "h-6 w-6")}
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-text-primary tracking-wide mb-1.5">
                    {dept.name}
                  </h3>
                  <p className="text-text-muted text-[0.85rem] line-clamp-2">
                    {dept.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald tracking-wider uppercase mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  Enter Terminal
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
