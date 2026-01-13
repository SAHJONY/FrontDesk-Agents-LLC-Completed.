import React from 'react';
import { LifeBuoy, MessageSquare, Zap, Globe } from 'lucide-react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE 
 * SUPPORT HUB - MASTER CONTROLLER [cite: 2025-12-28]
 */
export default function SupportHub() {
  return (
    <div className="p-8 max-w-6xl mx-auto relative z-10">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Workforce Support</h1>
        <p className="text-brand-cyan font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Global Node Synchronization: Active [cite: 2025-12-24]
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Node Optimization */}
        <div className="titan-card flex flex-col items-center text-center group hover:border-brand-cyan/40 transition-all">
          <Zap className="w-10 h-10 text-brand-cyan mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Node Optimization</h3>
          <p className="text-slate-500 text-sm">Force resync your revenue fleet across all global market nodes [cite: 2025-12-24].</p>
        </div>
        
        {/* Elite Tier Priority */}
        <div className="titan-card flex flex-col items-center text-center border-brand-cyan/20 bg-brand-cyan/[0.02]">
          <MessageSquare className="w-10 h-10 text-brand-cyan mb-4" />
          <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Priority Assistance</h3>
          <p className="text-slate-500 text-sm">Dedicated 24/7 technical support for Elite Tier ($1,499) partners [cite: 2025-12-28].</p>
        </div>
        
        {/* Knowledge Base */}
        <div className="titan-card flex flex-col items-center text-center group hover:border-brand-cyan/40 transition-all">
          <LifeBuoy className="w-10 h-10 text-brand-cyan mb-4 group-hover:rotate-12 transition-transform" />
          <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-widest">Fleet Protocols</h3>
          <p className="text-slate-500 text-sm">Access the full API architecture for institutional workforce scaling [cite: 2025-12-28].</p>
        </div>
      </div>

      {/* Local Platform Equity Note */}
      <div className="mt-12 p-6 border border-white/5 rounded-2xl bg-white/[0.01] flex items-center gap-4">
        <Globe className="w-5 h-5 text-brand-slate" />
        <p className="text-xs text-brand-slate font-medium italic">
          Supporting the Global Revenue Workforce in any market as a local operations platform [cite: 2025-12-24].
        </p>
      </div>
    </div>
  );
}
