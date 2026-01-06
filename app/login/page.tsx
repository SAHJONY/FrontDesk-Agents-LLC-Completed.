"use client";

import React, { useState } from 'react';

// Force dynamic rendering to prevent prerendering issues with useAuth
export const dynamic = 'force-dynamic';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Side: Premium Visual Asset */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900">
        <Image 
          src="/assets/premium/login-portal.png" 
          alt="Secure Access Portal" 
          fill
          className="object-cover object-center grayscale opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 max-w-md">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Secure Command Access</h2>
          <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest leading-relaxed">
            Authorized personnel only. All terminal sessions are monitored and recorded for compliance.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-24 relative">
        <div className="absolute top-12 left-12 lg:hidden">
           <h1 className="text-xl font-black tracking-tighter">FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE</h1>
        </div>

        <div className="max-w-[400px] w-full">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">Terminal Login</h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em]">Node: pdx1 // Global Revenue Workforce</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Identity</label>
              <input 
                type="email" 
                placeholder="email@frontdeskagents.com" 
                className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Access Key</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-white text-black font-black p-4 rounded-2xl hover:bg-zinc-200 active:scale-[0.98] transition-all uppercase tracking-tighter text-lg shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Access Command Center
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col gap-4">
            <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors">
              ← Return to Public Portal
            </Link>
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest leading-relaxed">
              By accessing this terminal, you agree to the Sovereign Financial Hub Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
