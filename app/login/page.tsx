"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; 
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const hero = getPageHero("login");

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
      // This prevents "Load Failed" by ensuring the user exists in your Supabase DB
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw new Error("Profile not found. Please contact support.");

      // 3. Logic-based redirection
      // If logging into Owner portal, check for 'owner' or 'admin' role
      if (requestedRole === 'admin') {
        if (profile.role === 'owner' || profile.role === 'admin') {
          router.push("/admin/console");
        } else {
          throw new Error("Unauthorized: This account does not have Owner privileges.");
        }
      } else {
        // Standard client dashboard login
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      // Optional: Sign out if the role check failed to clear the session
      await supabase.auth.signOut();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-950/60 p-6 shadow-2xl">
      {hero && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-slate-800">
          <Image 
            src={hero.src} 
            alt={hero.alt} 
            width={1600} 
            height={900} 
            className="w-full h-auto object-cover" 
            priority 
          />
        </div>
      )}
      
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-slate-50">Welcome Back</h1>
        <p className="text-sm text-slate-400">Enter your credentials to access your console.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all"
            placeholder="owner@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="rounded border border-red-900/50 bg-red-900/20 p-2.5">
            <p className="text-xs text-red-400 text-center">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={(e) => handleLogin(e, 'admin')}
            disabled={loading}
            className="rounded-md bg-sky-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-400 disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "Owner Login"}
          </button>
          <button
            type="button"
            onClick={(e) => handleLogin(e, 'dashboard')}
            disabled={loading}
            className="rounded-md border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm font-bold text-slate-100 hover:border-sky-500 hover:text-sky-400 disabled:opacity-50 transition-all"
          >
            {loading ? "..." : "Client Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
