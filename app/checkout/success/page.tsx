'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// REMOVED: import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/utils/supabase/client'; // NEW: Sovereign SSR Standard
import { ShieldCheck, Cpu, Zap, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'active' | 'error'>('loading');
  const [dots, setDots] = useState('');
  const router = useRouter();
  const supabase = createClient(); // UPDATED

  // Visual flair for the "AI Provisioning" state
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const verifyActivation = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // If no user is found yet, redirect to login
      router.push('/login');
      return;
    }

    // Poll for Webhook completion (Stripe -> Supabase sync)
    const { data, error } = await supabase
      .from('BusinessConfig')
      .select('status, planType')
      .eq('user_id', user.id)
      .single();

    if (data?.status === 'active') {
      setStatus('active');
    } else {
      // Retry every 2.5 seconds to allow Stripe Webhook to process
      setTimeout(verifyActivation, 2500);
    }
  }, [supabase, router]);

  useEffect(() => {
    verifyActivation();
  }, [verifyActivation]);

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000d1a] text-white">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
          <Cpu className="w-16 h-16 text-blue-500 relative animate-bounce" />
        </div>
        <h2 className="text-xl font-black uppercase tracking-[0.3em] italic">
          Provisioning Swarm{dots}
        </h2>
        <p className="mt-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          AI CEO is synchronizing neural nodes and billing protocols
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-[#000d1a] border border-white/5 rounded-[50px] p-12 text-center relative overflow-hidden shadow-2xl">
        {/* Success Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-2xl mb-8">
          <ShieldCheck className="w-8 h-8 text-emerald-500" />
        </div>

        <h1 className="text-6xl font-black mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic tracking-tighter">
          System Activated.
        </h1>
        
        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Your AI workforce is now standing by. The <span className="text-blue-400 font-bold">Guardian</span> and <span className="text-emerald-400 font-bold">Medic</span> protocols have been established.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12 text-left">
          <div className="p-8 bg-white/[0.02] rounded-[30px] border border-white/5 group hover:border-blue-500/30 transition-all">
            <Zap className="w-5 h-5 text-blue-400 mb-4" />
            <h3 className="text-white font-black uppercase tracking-tighter mb-2 italic">Next Phase</h3>
            <p className="text-xs text-slate-500 leading-normal font-medium">Configure your Voice Identity and Training Lab to begin active operations.</p>
          </div>
          
          <div className="p-8 bg-white/[0.02] rounded-[30px] border border-white/5 group hover:border-emerald-500/30 transition-all">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-4" />
            <h3 className="text-white font-black uppercase tracking-tighter mb-2 italic">Security Tunnel</h3>
            <p className="text-xs text-slate-500 leading-normal font-medium">Encrypted uplink verified. All neural calls are now routed through the sovereign core.</p>
          </div>
        </div>

        <button 
          onClick={() => router.push('/dashboard')}
          className="group flex items-center gap-3 mx-auto px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
        >
          Enter Command Center
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
