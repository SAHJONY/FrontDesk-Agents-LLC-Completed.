"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Image from "next/image";

// Using the specific asset path from your GitHub screenshots
const LOGIN_HERO_SRC = "/assets/premium/login-portal.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Use the unified login function from AuthContext
      await login(email, password);
      // Redirection is handled within the login function in AuthContext
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        
        {/* Integrated GitHub Asset: login-portal.png */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded-xl border border-white/10 shadow-inner">
          <Image 
            src={LOGIN_HERO_SRC} 
            alt="FrontDesk Login Portal" 
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
        </div>
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-black italic tracking-tighter text-white">FRONTDESK</h1>
          <p className="text-sm text-slate-400 font-medium">Initialize Secure Session</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Operator Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all placeholder:text-slate-700"
              placeholder="operator@frontdesk.ai"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all placeholder:text-slate-700"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 animate-pulse">
              <p className="text-xs text-red-400 text-center font-medium">{error}</p>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
            >
              {loading ? "Verifying..." : "Initialize Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
