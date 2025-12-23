'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
// REMOVED: import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/utils/supabase/client'; // NEW: SSR Standard
import { UsageTracker } from '@/components/dashboard/UsageTracker';

export default function PaymentSuccessPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const supabase = createClient(); // UPDATED

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserName(user.email?.split('@')[0] || 'Strategic Partner');
    }
    getProfile();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#000d1a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-xl w-full bg-zinc-950 rounded-[45px] shadow-2xl p-12 text-center border border-white/5 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="p-5 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
            <CheckCircle className="w-12 h-12 text-emerald-500 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl font-black text-white mb-4 italic tracking-tighter uppercase">
          Recharge Complete
        </h1>
        <p className="text-slate-400 mb-10 text-lg leading-relaxed">
          Welcome back, <span className="text-white font-bold">{userName}</span>. Your neural infrastructure has been refueled and all agent nodes are online.
        </p>

        {/* Global Infrastructure Status Card */}
        <div className="bg-white/[0.02] rounded-[30px] p-8 mb-10 border border-white/5 relative group">
          <div className="absolute top-4 right-4">
            <Sparkles className="w-4 h-4 text-cyan-500 opacity-30 group-hover:opacity-100 transition-opacity" />
          </div>
          <h2 className="text-[10px] font-black text-slate-500 uppercase mb-6 tracking-[0.2em]">
            Current Resource Allocation
          </h2>
          <UsageTracker />
        </div>

        <div className="space-y-6">
          <Link 
            href="/dashboard"
            className="flex items-center justify-center w-full py-5 px-8 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-xl group"
          >
            Enter Command Center
            <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <CreditCard className="w-3 h-3" />
            <p className="text-[9px] font-bold uppercase tracking-widest">
              Receipt transmitted to encrypted email on file
            </p>
          </div>
        </div>
      </div>
      
      {/* Visual connection to the OS branding */}
      <p className="mt-8 text-[10px] text-slate-700 font-black uppercase tracking-[0.5em]">
        FrontDesk Agents LLC • Global Neural Grid
      </p>
    </div>
  );
}
