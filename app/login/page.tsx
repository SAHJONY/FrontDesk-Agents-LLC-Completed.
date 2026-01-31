"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import Image from "next/image";

// Using the specific asset path from your GitHub screenshots
const LOGIN_HERO_SRC = "/assets/premium/login-portal.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent, requestedRole: 'admin' | 'dashboard') => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Fetch user profile to verify role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw new Error("Profile not found. Please contact support.");

      // 3. Logic-based redirection
      if (requestedRole === 'admin') {
        if (profile.role === 'owner' || profile.role === 'admin') {
          router.push("/admin/console");
        } else {
          throw new Error("Unauthorized: This account does not have Owner privileges.");
        }
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      await supabase.auth.signOut();
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

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              type="button"
              onClick={(e) => handleLogin(e, 'admin')}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-4 py-3 text-xs font-black uppercase tracking-widest text-black hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
            >
              {loading ? "..." : "Owner Portal"}
            </button>
            <button
              type="button"
              onClick={(e) => handleLogin(e, 'dashboard')}
              disabled={loading}
              className="rounded-xl border border-slate-700 bg-slate-800/30 px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-100 hover:border-cyan-500/50 hover:text-cyan-400 disabled:opacity-50 transition-all active:scale-95"
            >
              {loading ? "..." : "Client Fleet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
