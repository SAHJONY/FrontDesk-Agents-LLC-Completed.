'use client';

import { useEffect, useState } from 'react';
import { Globe, Shield, Activity, Radio } from 'lucide-react';

export function GlobalNodeMap() {
  const [interceptions, setInterceptions] = useState(12840);

  useEffect(() => {
    const interval = setInterval(() => {
      setInterceptions(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#010204] border-y border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT: LIVE METRICS */}
          <div className="lg:w-1/3 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              <span className="text-green-500 text-[9px] font-black uppercase tracking-widest">Global Network Online</span>
            </div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              Live Neural <br /> <span className="text-cyan-500">Interception</span>
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border-l-2 border-cyan-500 rounded-r-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Spam Threats Intercepted</p>
                <p className="text-4xl font-black italic tracking-tighter text-white">{interceptions.toLocaleString()}</p>
              </div>
              <div className="p-6 bg-white/5 border-l-2 border-slate-700 rounded-r-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Active AI Workforce</p>
                <p className="text-4xl font-black italic tracking-tighter text-white">4,209 Agents</p>
              </div>
            </div>
          </div>

          {/* RIGHT: THE MAP IMAGE (Titan Build) */}
          <div className="lg:w-2/3 relative group">
            <div className="absolute inset-0 bg-cyan-500/10 blur-[120px] rounded-full group-hover:bg-cyan-500/20 transition-all duration-1000" />
            <div className="relative rounded-[48px] border border-white/10 overflow-hidden bg-black shadow-2xl">
              <img 
                src="/images/global-neural-mesh.png" 
                alt="Global Node Network" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10000ms]"
              />
              
              {/* LIVE PINGS (Houston Node Focus) */}
              <div className="absolute top-1/2 left-1/4 group">
                 <div className="w-4 h-4 bg-cyan-500 rounded-full animate-ping opacity-75" />
                 <div className="absolute top-6 left-0 bg-black/80 backdrop-blur-md p-2 rounded border border-white/10 text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
                   Houston Node: <span className="text-cyan-500">Emergency Lead Captured</span>
                 </div>
              </div>

              <div className="absolute bottom-10 left-10 flex gap-4">
                 <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5">
                    <Radio className="w-3 h-3 text-cyan-500" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">pdx1-portland: Active</span>
                 </div>
                 <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5">
                    <Activity className="w-3 h-3 text-red-500" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">htx-surge-protocol: Engaging</span>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
  
