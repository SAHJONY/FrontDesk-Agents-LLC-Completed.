'use client';

import React, { useState } from 'react';
import { Brain, Zap, ShieldAlert, Check } from 'lucide-react';

const PERSONALITY_MODES = [
  { id: 'support', name: 'Concierge', desc: 'Warm, empathetic, and patient.', icon: Brain },
  { id: 'professional', name: 'Executive', desc: 'Direct, efficient, and corporate.', icon: ShieldAlert },
  { id: 'aggressive', name: 'Closer', desc: 'Persistent, sales-driven, and high-energy.', icon: Zap },
];

export const NeuralTweakModal = ({ isOpen, onClose, onSave }: any) => {
  const [selected, setSelected] = useState('support');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#080a0f] border border-white/10 p-8 rounded-sm shadow-2xl">
        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-6">
          Tweak <span className="text-cyan-500">Neural Identity</span>
        </h3>
        
        <div className="space-y-3 mb-8">
          {PERSONALITY_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelected(mode.id)}
              className={`w-full p-4 flex items-center justify-between border transition-all ${
                selected === mode.id ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <mode.icon className={`w-5 h-5 ${selected === mode.id ? 'text-cyan-500' : 'text-slate-500'}`} />
                <div>
                  <p className="text-[10px] font-black uppercase text-white tracking-widest">{mode.name}</p>
                  <p className="text-[9px] text-slate-500 uppercase">{mode.desc}</p>
                </div>
              </div>
              {selected === mode.id && <Check className="w-4 h-4 text-cyan-500" />}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
            Abort
          </button>
          <button 
            onClick={() => onSave(selected)}
            className="flex-1 py-3 bg-cyan-500 text-black text-[9px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all"
          >
            Deploy Personality
          </button>
        </div>
      </div>
    </div>
  );
};
