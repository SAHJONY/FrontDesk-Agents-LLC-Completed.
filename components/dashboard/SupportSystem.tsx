'use client';

import React, { useState } from 'react';
import { LifeBuoy, Send, FileText, BrainCircuit, ShieldCheck } from 'lucide-react';

export default function SupportSystem({ tier }: { tier: string }) {
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  const submitTicket = async () => {
    setStatus('SUBMITTING');
    // Logic to push to Supabase 'tickets' table or send to your email
    setTimeout(() => setStatus('SUCCESS'), 1500);
  };

  return (
    <div className="bg-[#080a0f] border border-white/10 p-8 rounded-sm">
      <div className="flex items-center gap-3 mb-6">
        <LifeBuoy className="w-5 h-5 text-cyan-500" />
        <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Neural Support Protocol</h3>
      </div>

      {status === 'SUCCESS' ? (
        <div className="py-12 text-center animate-in fade-in zoom-in">
          <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
            Request Logged. Priority Response Initiated.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all gap-2 group">
              <FileText className="w-4 h-4 text-slate-500 group-hover:text-cyan-500" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Update Knowledge Base</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all gap-2 group">
              <BrainCircuit className="w-4 h-4 text-slate-500 group-hover:text-cyan-500" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Adjust Personality</span>
            </button>
          </div>

          <textarea 
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder="Describe the neural refinement or data ingest required..."
            className="w-full h-32 bg-black/40 border border-white/10 p-4 text-xs font-mono text-slate-300 outline-none focus:border-cyan-500 transition-all resize-none"
          />

          <button 
            onClick={submitTicket}
            disabled={status === 'SUBMITTING'}
            className="w-full py-4 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
          >
            {status === 'SUBMITTING' ? 'TRANSMITTING...' : 'Dispatch Request'}
            <Send className="w-3 h-3" />
          </button>

          {tier === 'ELITE' && (
            <p className="text-[8px] text-cyan-500/60 font-bold uppercase tracking-widest text-center">
              * Elite Tier: Guaranteed &lt; 2-Hour Response Time
            </p>
          )}
        </div>
      )}
    </div>
  );
}
