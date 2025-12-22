'use client';

import React from 'react';
import { Globe, Zap } from 'lucide-react';

const NODES = [
  { id: 1, city: 'Portland (Core)', coords: 'top-[25%] left-[15%]', status: 'active' },
  { id: 2, city: 'London', coords: 'top-[20%] left-[45%]', status: 'active' },
  { id: 3, city: 'Sao Paulo', coords: 'top-[70%] left-[30%]', status: 'standby' },
  { id: 4, city: 'Singapore', coords: 'top-[55%] left-[80%]', status: 'active' },
];

export const NeuralMap = () => {
  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] p-8 relative overflow-hidden h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-cyan-500" />
          <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Global Neural Grid</h2>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
          <Zap className="w-3 h-3" /> LATENCY: 24ms
        </div>
      </div>

      {/* Map Background Placeholder - Represents the World Grid */}
      <div className="relative w-full h-full opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {NODES.map((node) => (
          <div key={node.id} className={`absolute ${node.coords} group`}>
            <div className={`w-3 h-3 rounded-full ${node.status === 'active' ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse' : 'bg-slate-700'}`} />
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-2 py-1 rounded text-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {node.city}
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-8">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Active Swarm Nodes: 04</p>
      </div>
    </div>
  );
};
