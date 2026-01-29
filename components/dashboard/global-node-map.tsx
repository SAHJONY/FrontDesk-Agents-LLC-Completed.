"use client";

import React from 'react';
import { Globe, Shield } from 'lucide-react';

export function GlobalNodeMap() {
  return (
    <div className="relative rounded-3xl border border-slate-800 bg-slate-900/10 p-8 overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="flex justify-between items-start z-10">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-1 flex items-center gap-2">
            <Globe className="w-3 h-3 animate-spin-slow" /> Global Node Distribution
          </h3>
          <p className="text-xl font-black text-white italic uppercase tracking-tighter">
            Operational Presence
          </p>
        </div>
        <div className="bg-black/40 backdrop-blur-md border border-white/5 p-3 rounded-2xl flex items-center gap-3">
          <Shield className="w-4 h-4 text-emerald-500" />
          <div className="text-right">
            <p className="text-[8px] font-bold text-slate-500 uppercase leading-none mb-1">Status</p>
            <p className="text-xs font-black text-emerald-400 italic leading-none uppercase">Secure</p>
          </div>
        </div>
      </div>

      {/* Tactical Map Mockup - Using SVG for performance */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg viewBox="0 0 1000 500" className="w-full h-full p-10">
          <path d="M250,150 Q300,100 350,150 T450,150" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
          <circle cx="300" cy="180" r="4" fill="#38bdf8">
            <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="250" r="4" fill="#38bdf8" />
          <circle cx="500" cy="350" r="4" fill="#fbbf24" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-4 z-10">
        <NodeMetric label="North America" count="12 Agents" status="Active" />
        <NodeMetric label="Europe" count="4 Agents" status="Standby" />
        <NodeMetric label="LatAm" count="2 Agents" status="Syncing" />
      </div>
    </div>
  );
}

function NodeMetric({ label, count, status }: any) {
  return (
    <div className="border-l border-slate-800 pl-4 py-1">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-xs font-black text-slate-200 tracking-tight italic">{count}</p>
      <p className="text-[8px] font-bold text-sky-500 uppercase mt-1 tracking-tighter">{status}</p>
    </div>
  );
}
