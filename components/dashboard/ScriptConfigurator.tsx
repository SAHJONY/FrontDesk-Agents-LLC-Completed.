'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Settings2, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2,
  RefreshCcw
} from 'lucide-react';

const INDUSTRY_PRESETS = [
  { id: 'med-spa', label: 'Medical Aesthetic', icon: '✨', prompt: 'You are SARA, a medical receptionist specializing in aesthetic treatments. Focus on booking consultations and discussing benefits of neurotoxins.' },
  { id: 'legal', label: 'Legal Intake', icon: '⚖️', prompt: 'You are SARA, a legal intake specialist. Your goal is to screen potential leads for personal injury or corporate litigation.' },
  { id: 'real-estate', label: 'Real Estate', icon: '🏠', prompt: 'You are SARA, a real estate assistant. Focus on qualifying buyers by asking about their budget and preferred neighborhoods.' },
  { id: 'hvac', label: 'Technical Trades', icon: '🔧', prompt: 'You are SARA, a dispatch coordinator for HVAC services. Prioritize emergency repair calls and service scheduling.' }
];

export const ScriptConfigurator = ({ node }: { node: string }) => {
  const [selected, setSelected] = useState(INDUSTRY_PRESETS[0]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    setHasSynced(false);
    
    // Simulate a call to blandAiService.configureAgent
    setTimeout(() => {
      setIsSyncing(false);
      setHasSynced(true);
    }, 1500);
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-[32px] overflow-hidden">
      <div className="p-8 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Settings2 className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-black uppercase tracking-widest text-white">Logic Configurator</h3>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
           <Cpu className="w-3 h-3 text-slate-500" />
           <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Active Node: {node}</span>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* PRESET SELECTOR */}
        <div className="grid grid-cols-2 gap-4">
          {INDUSTRY_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => { setSelected(preset); setHasSynced(false); }}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                selected.id === preset.id 
                  ? 'bg-cyan-500/10 border-cyan-500' 
                  : 'bg-black/40 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-xl">{preset.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  selected.id === preset.id ? 'text-white' : 'text-slate-500'
                }`}>
                  {preset.label}
                </span>
              </div>
              {selected.id === preset.id && (
                <Sparkles className="absolute top-2 right-2 w-3 h-3 text-cyan-500 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* SYSTEM PROMPT VIEW */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <BrainCircuit className="w-3 h-3" /> System Neural Prompt
            </span>
          </div>
          <div className="p-5 bg-black rounded-2xl border border-white/5 font-mono text-[11px] leading-relaxed text-slate-400 italic">
            "{selected.prompt}"
          </div>
        </div>

        {/* SYNC ACTION */}
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${
            hasSynced 
              ? 'bg-green-500/20 border border-green-500/40 text-green-500' 
              : 'bg-white text-black hover:bg-cyan-500'
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCcw className="w-4 h-4 animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Rewiring Node...</span>
            </>
          ) : hasSynced ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Neural Link Updated</span>
            </>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-widest text-center w-full">Apply Global Logic</span>
          )}
        </button>
      </div>
    </div>
  );
};
            
