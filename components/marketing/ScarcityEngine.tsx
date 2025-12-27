'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';

export const ScarcityEngine = () => {
  const { locale } = useParams();
  const [nodesLeft, setNodesLeft] = useState(3);
  const [location, setLocation] = useState({ city: 'Global', country: 'US' });

  useEffect(() => {
    // 1. Pull Geographic Data from Middleware Cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const city = getCookie('NEXT_LOCALE_CITY');
    const country = getCookie('NEXT_LOCALE_COUNTRY');
    
    if (city) setLocation({ 
      city: decodeURIComponent(city), 
      country: country || 'US' 
    });

    // 2. Logic to simulate local market pressure
    const timer = setTimeout(() => setNodesLeft(2), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 md:p-12 transition-all hover:border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        
        {/* Rapid Pulse Background Decor */}
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <ShieldAlert className="w-48 h-48 text-red-500 animate-pulse" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                Critical Market Capacity
              </span>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter leading-[0.9] mb-4">
              Limited Node <br /><span className="text-red-500 text-5xl md:text-7xl">Sovereignty</span>
            </h3>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] max-w-sm leading-relaxed">
              Provisioning restricted to ensure low-latency bandwidth for the <span className="text-white font-black">{location.city} ({locale?.toString().toUpperCase()})</span> corridor.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 bg-black/60 rounded-3xl border border-white/5 backdrop-blur-md min-w-[280px] shadow-2xl">
            <div className="text-7xl font-black italic text-white mb-1 tracking-tighter tabular-nums">
              0{nodesLeft}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 mb-8">
              Nodes Available
            </div>
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              Secure Local Node
            </button>
          </div>
        </div>

        {/* Live Ticker Infrastructure */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center md:justify-start gap-8 opacity-40">
          <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
            <MapPin className="w-3 h-3 text-red-500" /> Market: {location.city} // {location.country}
          </div>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
            <Zap className="w-3 h-3 text-red-500" /> Node Latency: 14.2ms
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[9px] font-black uppercase text-slate-400 tracking-widest">
            <ShieldAlert className="w-3 h-3 text-red-500" /> Protocol: Aegis-V3
          </div>
        </div>
      </div>
    </div>
  );
};
