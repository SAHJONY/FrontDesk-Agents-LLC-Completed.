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
  AlertCircle 
} from 'lucide-react';

export default function LoginPage() {
  const { locale } = useParams();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic for authentication goes here
  };

  return (
    <div className="min-h-screen bg-[#010204] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Neural Flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Login Container */}
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link href={`/${locale}`} className="inline-flex items-center gap-4 mb-8 group">
            <div className="w-12 h-12 bg-cyan-500 flex items-center justify-center rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-transform group-hover:rotate-180">
              <Command className="w-7 h-7 text-black" />
            </div>
          </Link>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            NODE <span className="text-cyan-500">AUTHENTICATION</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-3">
            Secure Terminal • {locale?.toString().toUpperCase()} Market
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/10 rounded-[40px] p-10 backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Administrator ID</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="admin@sovereign-node.com"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-cyan-500 focus:outline-none transition-all"
                />
                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">Security Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 pl-12 text-white focus:border-cyan-500 focus:outline-none transition-all"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl hover:bg-cyan-500 hover:text-white transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Authorizing...' : 'Establish Connection'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3 text-cyan-500" />
                Aegis Protection v2.5 Active
             </div>
             <Link href="#" className="text-[9px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-colors">
                Recover Lost Credentials
             </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
           <AlertCircle className="w-4 h-4 text-red-500" />
           <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest leading-relaxed">
             Unauthorized access attempts are logged and geo-traced.
           </p>
        </div>
      </div>
    </div>
  );
}
