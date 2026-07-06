import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DEPARTMENTS } from "@/config/departments";
import { StarBorder } from "@/components/ui/StarBorder";
import { 
  Bitcoin, 
  TrendingUp, 
  Settings, 
  Wallet, 
  Users, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from "lucide-react";

function getDeptIcon(iconName: string, className = "h-5 w-5") {
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

export function LoginPage() {
  const { user, department, login } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDept, setSelectedDept] = useState("crypto");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && department) {
      navigate(`/dashboard/${department}`);
    }
  }, [user, department, navigate]);

  // Set email whenever selected department changes
  const activeDept = DEPARTMENTS[selectedDept];
  const email = activeDept ? activeDept.email : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, selectedDept);
      navigate(`/dashboard/${selectedDept}`);
    } catch (err: any) {
      console.error("Login failed:", err);
      // Map standard Firebase errors to human-readable strings
      switch (err.code) {
        case "auth/user-not-found":
          setError("No staff account found for this department.");
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid password for this department desk. Please check and try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;
        default:
          setError("Authentication failed. Please verify credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-20 relative overflow-hidden bg-bg-deep">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10 flex justify-center w-full">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div className="rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-light via-emerald to-emerald-dim" />

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl font-bold text-text-primary mb-2 tracking-wide">
                Department Portal
              </h1>
              <p className="text-text-muted text-[0.95rem]">
                Select a department to enter your credentials
              </p>
            </div>

            {/* Department Selector Dock */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-8 p-1.5 rounded-2xl bg-black/35 border border-white/[0.04]">
              {Object.values(DEPARTMENTS).map((dept) => {
                const isSelected = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => {
                      setSelectedDept(dept.id);
                      setPassword("");
                      setError(null);
                    }}
                    className={`flex flex-col items-center justify-center py-3.5 px-2 rounded-xl transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-emerald/10 border border-emerald/30 text-emerald shadow-[0_0_15px_rgba(42,157,143,0.15)]"
                        : "border border-transparent text-text-muted hover:text-text-secondary hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className={`mb-2 transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
                      {getDeptIcon(dept.iconName, "h-5 w-5")}
                    </div>
                    <span className="text-[0.72rem] font-semibold tracking-wider uppercase">
                      {dept.name === "HR Department" ? "HR" : dept.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <form className="max-w-md mx-auto flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="text-center mb-1">
                <span className="text-[0.8rem] font-medium text-text-muted uppercase tracking-widest">
                  Accessing <span className="text-emerald font-semibold">{activeDept?.name}</span> Trading Desk
                </span>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="h-12 w-full rounded-lg border border-white/10 bg-black/30 pl-11 pr-4 text-[0.95rem] text-text-muted select-none cursor-not-allowed focus:outline-none"
                    tabIndex={-1}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-semibold text-text-muted uppercase tracking-wider">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 h-4 w-4 text-text-muted pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-11 text-text-primary placeholder:text-text-muted/40 focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-text-muted hover:text-text-secondary transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-3.5 rounded-lg border border-red-500/10 bg-red-500/5 text-red-400 text-sm animate-pulse">
                  <span className="flex-1 text-[0.85rem]">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <StarBorder
                as="button"
                type="submit"
                disabled={isLoading}
                color="#2a9d8f"
                className="w-full mt-2 disabled:opacity-50 cursor-pointer text-text-primary font-semibold"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-r-2 border-emerald" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </StarBorder>
            </form>

            {/* Footer Note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[0.72rem] text-text-muted/60 uppercase tracking-widest border-t border-white/[0.03] pt-6">
              <ShieldCheck className="h-4 w-4 text-emerald" />
              Secured with Firebase Authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
