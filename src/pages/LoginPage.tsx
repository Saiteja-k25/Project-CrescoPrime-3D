import { useState } from "react";
import { Link } from "react-router-dom";
import { SpotlightButton } from "@/components/ui/SpotlightButton";

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/5 blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10 flex justify-center">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-[2rem] border border-white/[0.04] bg-bg-elevated/40 p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-light via-emerald to-emerald-dim" />

            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-text-primary mb-2">
                {isLogin ? "Welcome Back" : "Create an Account"}
              </h1>
              <p className="text-text-muted text-[0.95rem]">
                {isLogin 
                  ? "Access your institutional trading terminal." 
                  : "Join the most disciplined trading firm."}
              </p>
            </div>

            {/* Google Auth Button */}
            <button className="w-full h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center gap-3 text-text-primary hover:bg-white/10 transition-colors font-medium mb-6">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-full bg-white/10" />
              <span className="text-text-muted text-sm uppercase tracking-wider">or</span>
              <div className="h-px w-full bg-white/10" />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-medium text-text-muted uppercase tracking-wider">First Name</label>
                    <input type="text" required className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/50" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.75rem] font-medium text-text-muted uppercase tracking-wider">Last Name</label>
                    <input type="text" required className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/50" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.75rem] font-medium text-text-muted uppercase tracking-wider">Email Address</label>
                <input type="email" required placeholder="you@example.com" className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/50" />
              </div>

              <div className="flex flex-col gap-1.5 mb-2">
                <div className="flex justify-between items-center">
                  <label className="text-[0.75rem] font-medium text-text-muted uppercase tracking-wider">Password</label>
                  {isLogin && <a href="#" className="text-[0.75rem] text-emerald hover:text-emerald-light">Forgot password?</a>}
                </div>
                <input type="password" required placeholder="••••••••" className="h-12 w-full rounded-lg border border-white/10 bg-black/20 px-4 text-text-primary focus:border-emerald/50 focus:outline-none focus:ring-1 focus:ring-emerald/50" />
              </div>

              <SpotlightButton className="w-full !h-12 !bg-emerald border-none text-bg-deep hover:bg-emerald-light !rounded-lg mt-2">
                {isLogin ? "Sign In" : "Create Account"}
              </SpotlightButton>
            </form>

            <div className="mt-6 text-center text-[0.9rem] text-text-secondary">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-emerald font-medium hover:text-emerald-light transition-colors"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </div>
            
            <p className="mt-8 text-center text-[0.75rem] text-text-muted/60">
              By continuing, you agree to Cresco Prime's <br />
              <Link to="/terms-of-use" className="underline hover:text-text-muted">Terms of Service</Link> and <Link to="/privacy-policy" className="underline hover:text-text-muted">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
