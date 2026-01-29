"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Flame, Target, Info } from 'lucide-react';

export function TrainingModeToggle() {
  const [isTrainingMode, setIsTrainingMode] = useState(false);
  const [explorationRate, setExplorationRate] = useState(0.2);

  const toggleMode = async () => {
    const newMode = !isTrainingMode;
    setIsTrainingMode(newMode);
    
    // In production, you would update the RL system via API
    // await fetch('/api/workforce/config', { 
    //   method: 'POST', 
    //   body: JSON.stringify({ explorationRate: newMode ? 0.5 : 0.05 }) 
    // });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isTrainingMode ? 'bg-amber-500/10 text-amber-400' : 'bg-sky-500/10 text-sky-400'}`}>
            <Brain size={18} />
          </div>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Neural Calibration</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase">Reinforcement Strategy</p>
          </div>
        </div>
        
        <button 
          onClick={toggleMode}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isTrainingMode ? 'bg-amber-500' : 'bg-slate-700'}`}
        >
          <motion.div 
            animate={{ x: isTrainingMode ? 26 : 4 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
          />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-1">
                <Target size={8} /> Exploitation
              </span>
              <span className={`text-[10px] font-black italic ${!isTrainingMode ? 'text-sky-400' : 'text-slate-600'}`}>
                Optimal Path
              </span>
            </div>
            <div className="flex flex-col border-l border-slate-800 pl-4">
              <span className="text-[8px] font-black text-slate-500 uppercase flex items-center gap-1">
                <Flame size={8} /> Exploration
              </span>
              <span className={`text-[10px] font-black italic ${isTrainingMode ? 'text-amber-400' : 'text-slate-600'}`}>
                Discovery
              </span>
            </div>
          </div>
          <span className="text-xl font-black italic text-white leading-none">
            {isTrainingMode ? 'HYPER' : 'STABLE'}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/5 flex gap-3">
          <Info size={14} className="text-slate-400 shrink-0" />
          <p className="text-[9px] text-slate-400 leading-relaxed font-medium">
            {isTrainingMode 
              ? "HYPER MODE: Agents will prioritize trying new decision paths to optimize long-term ROI. Accuracy may fluctuate."
              : "STABLE MODE: Agents will stick to the highest-confidence routes validated by previous training episodes."}
          </p>
        </div>
      </div>
    </div>
  );
}
