'use client';

import React, { useState } from 'react';
import { ScrollText, Plus, Save, ShieldAlert, Cpu, Layers } from 'lucide-react';

/**
 * SOVEREIGN SCRIPT ENGINE v2.0
 * Allows for Multi-Division Logic Routing
 */

const INITIAL_DIVISIONS = [
  { id: 'div-1', name: 'Front Desk / Intake', status: 'Deployed', version: '1.0.4' },
  { id: 'div-2', name: 'Emergency Dispatch', status: 'Inactive', version: '0.9.8' },
];

export const ScriptManager = () => {
  const [activeDivision, setActiveDivision] = useState(INITIAL_DIVISIONS[0]);

  return (
    <div className="grid lg:grid-cols-12 gap-6 bg-black min-h-[600px]">
      {/* Sidebar: Divisions */}
      <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Fleet Divisions</h3>
          <button className="p-1 hover:bg-zinc-800 rounded transition-colors text-cyan-500">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {INITIAL_DIVISIONS.map((div) => (
          <button
            key={div.id}
            onClick={() => setActiveDivision(div)}
            className={`w-full p-4 rounded-2xl border text-left transition-all ${
              activeDivision.id === div.id 
                ? 'bg-zinc-900 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <Layers className={`w-4 h-4 ${activeDivision.id === div.id ? 'text-cyan-400' : 'text-zinc-600'}`} />
              <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                div.status === 'Deployed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {div.status}
              </span>
            </div>
            <p className="text-sm font-black text-white italic tracking-tight">{div.name}</p>
            <p className="text-[9px] text-zinc-500 font-mono mt-1">V.{div.version} // SOVEREIGN_CORE</p>
          </button>
        ))}
      </div>

      {/* Editor: Sovereign Instructions */}
      <div className="lg:col-span-8 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 flex flex-col backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">
              Instruction Set: {activeDivision.name}
            </h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-cyan-500 transition-all">
            <Save className="w-3 h-3" /> Commit to Node
          </button>
        </div>

        <div className="relative flex-grow">
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <ScrollText className="w-4 h-4 text-zinc-700" />
            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest italic">System Prompt Layer</span>
          </div>
          
          <textarea 
            className="w-full h-full min-h-[400px] bg-black/50 border border-zinc-800 rounded-2xl p-12 text-zinc-300 font-mono text-sm leading-relaxed focus:border-cyan-500/50 outline-none transition-all resize-none shadow-inner"
            defaultValue={`You are the Sovereign AI Node for ${activeDivision.name}.

OBJECTIVE:
- Authenticate inbound identity.
- Resolve user intent via Section 4 Protocol.
- Secure conversion or escalate to Level 2 Sovereignty.

STRICTURES:
- Never disclose AI latency parameters.
- Maintain high-concurrency persona at all times.`}
          />

          <div className="absolute bottom-4 right-4 p-4 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">
              Bland AI Safeguards: <span className="text-emerald-500">Active</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
