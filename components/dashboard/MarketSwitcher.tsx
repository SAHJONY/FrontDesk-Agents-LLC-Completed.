'use client';

import { Globe, Navigation } from 'lucide-react';

export default function MarketSwitcher() {
  return (
    <div className="flex gap-2 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-xl">
      <button className="px-4 py-1.5 rounded-full bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
        <Navigation size={10} /> Active: London Cluster
      </button>
      <button className="px-4 py-1.5 rounded-full text-slate-400 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">
        Switch to Tokyo
      </button>
    </div>
  );
}
