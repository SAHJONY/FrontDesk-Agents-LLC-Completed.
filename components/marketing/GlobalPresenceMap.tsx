'use client';

import { Globe } from 'lucide-react';

export function GlobalPresenceMap() {
  return (
    <div className="relative h-[600px] w-full bg-black rounded-[48px] border border-white/5 overflow-hidden group">
      {/* Interactive Map Overlay */}
      <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
        <img src="/images/global-neural-mesh.png" className="w-full h-full object-cover scale-110" />
      </div>
      
      {/* Pulse Points for Active Installations */}
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-500 rounded-full animate-ping shadow-[0_0_15px_#06b6d4]" />
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyan-500 rounded-full animate-ping shadow-[0_0_15px_#06b6d4]" />
      <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-cyan-500 rounded-full animate-ping shadow-[0_0_15px_#06b6d4]" />

      <div className="absolute bottom-10 left-10 p-8 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl">
        <h4 className="text-xl font-black italic uppercase tracking-tighter mb-2">Planetary Coverage</h4>
        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
          Your infrastructure is currently active across <span className="text-white">3 Hemispheres</span>
        </p>
      </div>
    </div>
  );
}
