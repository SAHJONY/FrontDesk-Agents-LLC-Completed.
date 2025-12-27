'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';

export const ScarcityEngine = () => {
  const { locale } = useParams();
  const [nodesLeft, setNodesLeft] = useState(3);
  const [locationName, setLocationName] = useState('Your Region');

  useEffect(() => {
    // Logic to simulate local market pressure
    const timer = setTimeout(() => setNodesLeft(2), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 md:p-12 transition-all hover:border-red-500/40">
        
        {/* Rapid Pulse Background */}
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShieldAlert className="w-32 h-32 text-red-500 animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                Critical Market Capacity
              </span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-black uppercase italic text-white tracking-tighter leading-none mb-2">
              Limited Node <br /><span className="text-red-500 text-5xl md:text-6xl">Sovereignty</span>
            </h3>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] max-w-sm">
              We restrict deployment to ensure low-latency bandwidth for the {locale?.toString().toUpperCase()} market.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-white/5 backdrop-blur-sm min-w-[240px]">
            <div className="text-6xl font-black italic text-white mb-1 tracking-tighter">
              0{nodesLeft}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-6">
              Nodes Available
            </div>
            <button className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-105">
              Secure Local Node
            </button>
          </div>
        </div>

        {/* Live Ticker */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-center md:justify-start gap-6 opacity-40">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400">
            <MapPin className="w-3 h-3" /> Market: Active
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400">
            <Zap className="w-3 h-3" /> Latency: 14ms
          </div>
        </div>
      </div>
    </div>
  );
};
