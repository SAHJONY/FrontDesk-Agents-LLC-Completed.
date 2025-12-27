'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Search, 
  ChevronRight, 
  Terminal, 
  ShieldCheck,
  MessageSquare,
  Scale
} from 'lucide-react';

export const ReasoningTrace = () => {
  const [testQuery, setTestQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Example Logic Path for a Medical/Legal inquiry
  const logicSteps = [
    { 
      id: 'L1', 
      label: 'Intent Extraction', 
      desc: 'Identifying high-level objective: Appointment Scheduling.',
      icon: <Search className="w-4 h-4 text-cyan-500" />
    },
    { 
      id: 'L2', 
      label: 'SOP Alignment', 
      desc: 'Cross-referencing knowledge base for "New Patient" protocols.',
      icon: <Scale className="w-4 h-4 text-purple-500" />
    },
    { 
      id: 'L3', 
      label: 'Aegis Guardrail Check', 
      desc: 'Ensuring no medical advice is given. Compliance: 100%.',
      icon: <ShieldCheck className="w-4 h-4 text-green-500" />
    },
    { 
      id: 'L4', 
      label: 'Synthesis', 
      desc: 'Drafting response with empathetic equilibrium.',
      icon: <BrainCircuit className="w-4 h-4 text-cyan-500" />
    }
  ];

  return (
    <div className="bg-[#020305] border border-white/10 p-8 rounded-sm font-sans selection:bg-cyan-500/30 shadow-2xl">
      
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2 italic underline underline-offset-8 decoration-cyan-500/30">
          Forensic Testing
        </h2>
        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          Neural <span className="text-slate-700">Reasoning Path</span>
        </h3>
        <p className="text-[10px] font-medium text-slate-500 mt-4 uppercase tracking-widest leading-relaxed max-w-xl">
          Input a scenario to observe the forensic logic steps taken by your Sovereign Workforce.
        </p>
      </div>

      {/* INPUT AREA */}
      <div className="flex gap-4 mb-10">
        <div className="relative flex-1">
          <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
          <input 
            type="text"
            placeholder="e.g. 'I want to book an appointment but I don't have insurance.'"
            className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-xl text-sm text-white focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700 font-medium"
            onChange={(e) => setTestQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { setIsAnalyzing(true); setTimeout(() => setIsAnalyzing(false), 2000); }}
          className="bg-cyan-500 px-8 rounded-xl text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all"
        >
          {isAnalyzing ? "Processing..." : "Analyze Logic"}
        </button>
      </div>

      {/* REASONING STEPS GRID */}
      <div className="space-y-3 relative">
        {/* Vertical Line Connector */}
        <div className="absolute left-7 top-4 bottom-4 w-[1px] bg-gradient-to-b from-cyan-500/50 via-white/5 to-transparent" />

        {logicSteps.map((step, idx) => (
          <div 
            key={step.id} 
            className={`flex gap-6 p-4 rounded-xl border transition-all duration-700 ${
              isAnalyzing ? 'opacity-30 blur-sm translate-y-4' : 'opacity-100 blur-0 translate-y-0'
            } border-white/5 bg-white/[0.02] hover:bg-white/[0.05]`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center relative z-10 border border-white/10 shrink-0">
              {step.icon}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{step.id}</span>
                <p className="text-xs font-black text-white uppercase tracking-tighter italic">{step.label}</p>
              </div>
              <p className="text-[11px] font-medium text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
            <ChevronRight className="ml-auto w-4 h-4 text-slate-800 self-center" />
          </div>
        ))}
      </div>

      {/* FINAL OUTPUT CONSOLE */}
      <div className="mt-8 bg-black border border-white/10 p-4 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-20"><Terminal className="w-12 h-12 text-cyan-500" /></div>
        <p className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-2 italic">Synthesized Response Node</p>
        <p className="text-xs font-medium text-slate-300 italic leading-relaxed relative z-10">
          "I understand you're looking for an appointment. While we don't require insurance to see our specialists, we do offer a transparent cash-pay rate of $149 for initial consultations. Would you like to see our availability for this week?"
        </p>
      </div>

    </div>
  );
};
