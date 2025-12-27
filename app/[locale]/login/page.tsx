'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Lock, 
  Command, 
  ShieldCheck, 
  Fingerprint, 
  ArrowRight, 
  AlertCircle,
  ShieldAlert
} from 'lucide-react';

/**
 * SOVEREIGN ACCESS GATEWAY
 * Fixed: Explicit typing for useParams to resolve Next.js 15 build failure.
 */
export default function LoginPage() {
  // 1. Explicit Type Casting for Next.js 15 Strict Linting
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Institutional Auth Logic
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020305] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Neural Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Login Container */}
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-12">
          <Link href={`/${locale}`} className="inline-flex items-center gap-4 mb-10 group">
            <div className="w-14 h-14 bg-white flex items-center justify-center rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all group-hover:bg-cyan-500">
              <Command className="w-8 h-8 text-black" />
            </div>
          </Link>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            Node <span className="text-slate-500">Authorization</span>
          </h1>
          <p className="text-cyan-500 text-[9px] font-black uppercase tracking-[0.5em] mt-4 opacity-70">
            Secure Terminal // {locale.toUpperCase()} Market Node
          </p>
        </div>

        <div className="bg-[#080a0f] border border-white/10 rounded-sm p-10 shadow-2xl relative">
          {/* Top Security Bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          
          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 ml-1">Administrator ID</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="admin@sovereign-node.com"
                  className="w-full bg-black border border-white/10 rounded-sm p-5 pl-14 text-white font-mono text-xs focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
                />
                <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3 ml-1">Security Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-black border border-white/10 rounded-sm p-5 pl-14 text-white font-mono text-xs focus:border-cyan-500 outline-none transition-all placeholder:text-slate-800"
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-6 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-4 disabled:opacity-20"
            >
              {loading ? 'Authorizing Node...' : 'Establish Connection'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 flex flex-col items-center gap-5">
             <div className="flex items-center gap-3 text-[8px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <ShieldCheck className="w-3 h-3 text-cyan-500" />
                Aegis Shield Protocol v2.5
             </div>
             <Link href="#" className="text-[8px] font-black text-slate-700 hover:text-white uppercase tracking-[0.3em] transition-colors border-b border-transparent hover:border-white/20 pb-1">
                Recover Lost Credentials
             </Link>
          </div>
        </div>

        {/* Forensic Warning */}
        <div className="mt-10 flex items-center gap-5 p-6 bg-red-500/[0.03] border border-red-500/10 rounded-sm">
           <ShieldAlert className="w-5 h-5 text-red-900" />
           <p className="text-[8px] font-bold text-red-900 uppercase tracking-[0.2em] leading-relaxed italic">
             Warning: All unauthorized access attempts are forensic-logged and geolocated via Global Node Sovereignty.
           </p>
        </div>
      </div>
    </div>
  );
}
