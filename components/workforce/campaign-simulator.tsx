"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShieldAlert, CheckCircle2, FlaskConical, Terminal, Zap } from 'lucide-react';

export function CampaignSimulator() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [scenario, setScenario] = useState('high_intent');

  const runSimulation = async () => {
    setIsSimulating(true);
    setLogs(["Initializing Simulation Environment...", "Loading Agent Weights...", "Injecting Synthetic Traffic..."]);

    // Simulated Steps
    const steps = [
      "Task #402: Inbound Call - User questioning legal terms.",
      "Logic Check: Rule 'Legal Issue Detection' triggered.",
      "Decision: Escalating to [Specialist] - Confidence: 0.98",
      "Task #403: SMS - High sentiment customer asking for discount.",
      "RL Brain: Path 'Offer_Retention_A' selected.",
      "Decision: Proceeding Autonomously - Confidence: 0.84",
      "Simulation Complete. Recording outcomes to Q-Table."
    ];

    for (const step of steps) {
      await new Promise(r => setTimeout(r, 800));
      setLogs(prev => [...prev, step]);
    }
    setIsSimulating(false);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-6 overflow-hidden relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <FlaskConical size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase italic tracking-tighter">Stress Test Sandbox</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Synthetic Scenario Injection</p>
          </div>
        </div>
        
        <button 
          onClick={runSimulation}
          disabled={isSimulating}
          className={`group flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
            isSimulating ? 'bg-slate-800 text-slate-500' : 'bg-white text-black hover:bg-sky-400'
          }`}
        >
          {isSimulating ? <Zap className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
          {isSimulating ? 'Simulando...' : 'Ejecutar Simulación'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Escenario de Prueba</label>
          <select 
            className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 outline-none focus:border-sky-500 transition-colors"
            onChange={(e) => setScenario(e.target.value)}
          >
            <option value="high_intent">Tráfico de Intención Alta</option>
            <option value="legal_risk">Detección de Riesgo Legal</option>
            <option value="churn_threat">Amenaza de Abandono (Churn)</option>
          </select>
        </div>
        <div className="bg-black/60 rounded-2xl border border-slate-800 p-4 font-mono text-[10px] text-emerald-500/80 overflow-y-auto h-32 scrollbar-hide">
          <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase font-black tracking-widest">
            <Terminal size={10} /> Live Console
          </div>
          {logs.map((log, i) => (
            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} key={i} className="mb-1">
              {`> ${log}`}
            </motion.div>
          ))}
          {isSimulating && <div className="animate-pulse">_</div>}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/50 flex justify-between">
        <SimulationMetric icon={ShieldCheck} label="Escalation Accuracy" value="99.2%" />
        <SimulationMetric icon={Brain} label="RL Convergence" value="0.84" />
        <SimulationMetric icon={CheckCircle2} label="Risk Shield" value="Active" />
      </div>
    </div>
  );
}

function SimulationMetric({ icon: Icon, label, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1">
        <Icon size={10} /> {label}
      </span>
      <span className="text-[11px] font-black text-slate-200 uppercase italic">{value}</span>
    </div>
  );
}
