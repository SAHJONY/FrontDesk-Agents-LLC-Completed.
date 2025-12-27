import React from 'react';
import { ShieldCheck, Zap, Lock, Activity, Cpu, ChevronRight } from 'lucide-react';

const MODULES = [
  { id: 'closer', name: 'Sovereign Closer', cluster: 'Revenue', logic: 'Iterative Outcome Maximization' },
  { id: 'triage', name: 'Institutional Triage', cluster: 'Operations', logic: 'Deep-Mesh Indexing' },
  { id: 'guardian', name: 'Retention Guardian', cluster: 'Loyalty', logic: 'Sentiment Oscillation Analysis' }
];

export default function ProvisioningPage() {
  return (
    <div className="min-h-screen bg-[#020305] text-slate-300 p-8 font-sans">
      <header className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Cpu size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">FrontDesk Agents LLC</span>
          </div>
          <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">Workforce <span className="text-slate-600">Provisioning</span></h1>
        </div>
        <div className="text-right border-r border-cyan-500/30 pr-4">
          <p className="text-[10px] font-bold uppercase text-slate-500">Node Status: Active</p>
          <p className="text-[10px] font-bold uppercase text-cyan-500">Aegis Silo: Encrypted</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {MODULES.map((module) => (
          <div key={module.id} className="bg-[#080a0f] border border-white/5 p-8 hover:border-cyan-500/40 transition-all group">
            <h3 className="text-xl font-black italic text-white uppercase mb-1">{module.name}</h3>
            <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-6">{module.cluster} Cluster</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] uppercase font-bold text-slate-500">Primary Logic</span>
                <span className="text-[10px] text-white font-medium">{module.logic}</span>
              </div>
            </div>

            <button className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 group-hover:bg-cyan-500 transition-colors">
              Initialize Node <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
