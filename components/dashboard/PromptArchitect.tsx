'use client';

import React, { useState } from 'react';
import { Brain, MessageSquare, Zap, ShieldCheck, Sparkles } from 'lucide-react';

const PERSONALITIES = [
  {
    id: 'professional',
    label: 'Corporate Elite',
    icon: ShieldCheck,
    description: 'Formal, concise, and high-authority. Ideal for Legal and Medical.',
    prompt: 'You are an elite executive assistant. Maintain a formal tone. Do not use slang. Prioritize data security and precise scheduling.'
  },
  {
    id: 'empathetic',
    label: 'Soft Touch',
    icon: Brain,
    description: 'Warm and patient. Ideal for Healthcare and senior services.',
    prompt: 'You are a compassionate patient coordinator. Use a warm, soothing tone. Validate concerns before asking for data. Be highly patient.'
  },
  {
    id: 'aggressive',
    label: 'Growth Engine',
    icon: Zap,
    description: 'High energy, sales-focused. Ideal for Real Estate and Marketing.',
    prompt: 'You are a high-performance sales closer. Maintain high energy. Focus on the value proposition. Overcome objections quickly to secure the booking.'
  }
];

export const PromptArchitect = ({ onSelect }: { onSelect: (prompt: string) => void }) => {
  const [selected, setSelected] = useState(PERSONALITIES[0].id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PERSONALITIES.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelected(p.id);
                onSelect(p.prompt);
              }}
              className={`p-6 rounded-3xl border transition-all text-left group ${
                selected === p.id 
                ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                : 'bg-white/[0.02] border-white/5 hover:border-white/20'
              }`}
            >
              <Icon className={`w-8 h-8 mb-4 ${selected === p.id ? 'text-cyan-500' : 'text-slate-500'}`} />
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">{p.label}</h4>
              <p className="text-[9px] text-slate-400 font-bold uppercase leading-relaxed italic">
                {p.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* PROMPT PREVIEW BOX */}
      <div className="p-6 titan-card bg-black/40 border-dashed border-white/10">
        <div className="flex items-center gap-2 mb-4 text-cyan-500">
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Instruction Preview</span>
        </div>
        <div className="font-mono text-[11px] text-slate-500 leading-relaxed italic">
          "{PERSONALITIES.find(p => p.id === selected)?.prompt}"
        </div>
      </div>
    </div>
  );
};
