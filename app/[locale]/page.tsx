import React from 'react';
import Link from 'next/link';
import { BoltIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default async function SovereignLanding({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8">
        <GlobeAltIcon className="w-4 h-4" />
        Sovereign Node: {locale.toUpperCase()}
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
        FrontDesk <span className="text-cyan-500">Agents</span>
      </h1>
      
      <p className="max-w-2xl text-slate-400 text-lg mb-10">
        Deploying human-like AI receptionists for local businesses. Multi-market intelligence, zero-latency response.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={`/${locale}/automations`} className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20">
          Open Command Center
        </Link>
        <Link href={`/${locale}/dashboard`} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all">
          View Telemetry
        </Link>
      </div>
    </div>
  );
}
