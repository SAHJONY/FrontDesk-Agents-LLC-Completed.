"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin, Users, Zap, TrendingUp } from 'lucide-react';

export function GlobalAnalyticsOverlay({ data }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="rounded-[3rem] border border-slate-800 bg-slate-900/10 backdrop-blur-3xl p-10 overflow-hidden relative"
    >
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:40px_40px]" />

      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        {/* Left: Global Stats */}
        <div className="lg:w-1/3 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-500/10 rounded-2xl">
              <Globe className="text-sky-400 w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Global Node Reach</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Cross-Continent Infrastructure</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatsMiniCard label="Active Regions" value="12" icon={MapPin} color="sky" />
            <StatsMiniCard label="Total Reach" value="4.2M" icon={Users} color="indigo" />
            <StatsMiniCard label="Avg Latency" value="28ms" icon={Zap} color="yellow" />
            <StatsMiniCard label="Growth" value="+14%" icon={TrendingUp} color="emerald" />
          </div>

          <div className="p-6 rounded-3xl bg-black/40 border border-white/5">
            <h4 className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Top Density Nodes</h4>
            <div className="space-y-4">
              <RegionProgress label="North America" progress={85} />
              <RegionProgress label="European Union" progress={62} />
              <RegionProgress label="LATAM / Brazil" progress={44} />
            </div>
          </div>
        </div>

        {/* Right: The Interactive "Map" Visualizer */}
        <div className="lg:w-2/3 h-[400px] bg-slate-950/50 rounded-[2.5rem] border border-white/5 relative flex items-center justify-center overflow-hidden">
           {/* This is where a Mapbox component or a custom SVG Map would live */}
           <div className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full" />
                <Globe size={120} className="text-slate-800 relative z-10" />
              </div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
                Initializing Vector Map Layer...
              </p>
           </div>
           
           {/* Floating Node Alerts */}
           <motion.div 
             animate={{ y: [0, -10, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="absolute top-10 left-20 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-3"
           >
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="text-[9px] font-black text-white uppercase italic">Node_01: Active</span>
           </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsMiniCard({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    sky: "text-sky-400 bg-sky-400/10",
    indigo: "text-indigo-400 bg-indigo-400/10",
    yellow: "text-yellow-400 bg-yellow-400/10",
    emerald: "text-emerald-400 bg-emerald-400/10"
  };
  return (
    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
      <Icon className={`w-4 h-4 mb-2 ${colors[color].split(' ')[0]}`} />
      <div className="text-lg font-black text-white italic">{value}</div>
      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function RegionProgress({ label, progress }: { label: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[9px] font-black uppercase">
        <span className="text-slate-300">{label}</span>
        <span className="text-sky-400">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"
        />
      </div>
    </div>
  );
}
