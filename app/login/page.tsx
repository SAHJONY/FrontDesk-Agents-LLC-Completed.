"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct
import Image from "next/image";
import { getPageHero } from "@/lib/siteImages";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const hero = getPageHero("login");

  const handleLogin = async (e: React.FormEvent, role: 'admin' | 'dashboard') => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Redirect based on the button clicked
    router.push(role === 'admin' ? "/admin" : "/dashboard");
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
      {hero && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl border border-slate-800">
          <Image src={hero.src} alt={hero.alt} width={1600} height={900} className="w-full h-auto object-cover" priority />
        </div>
      )}
      
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-50">Welcome Back</h1>
        <p className="text-sm text-slate-300">Enter your credentials to access your console.</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:outline-none"
            placeholder="owner@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-sky-400 focus:outline-none"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => handleLogin(e, 'admin')}
            disabled={loading}
            className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-50"
          >
            {loading ? "..." : "Owner Login"}
          </button>
          <button
            onClick={(e) => handleLogin(e, 'dashboard')}
            disabled={loading}
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300 disabled:opacity-50"
          >
            {loading ? "..." : "Client Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
