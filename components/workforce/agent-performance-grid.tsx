"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRealtimeWorkforce } from '@/hooks/use-realtime-workforce';
import { Zap, Activity, Shield, Brain } from 'lucide-react';

export function AgentPerformanceGrid() {
  const { metrics } = useRealtimeWorkforce();
  // In a real setup, we'd fetch the individual agent array from /api/workforce?action=agents
  const agents = metrics?.agents || [];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {agents.map((agent: any, i: number) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group relative rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-sky-500/50 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2 rounded-xl bg-opacity-10 ${getTypeStyles(agent.type)}`}>
              <CpuIcon type={agent.type} />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency</span>
              <span className="text-xs font-black text-sky-400 italic">
                {(agent.success_rate * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-[11px] font-black text-white uppercase italic tracking-tighter truncate">
                {agent.name}
              </h4>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Node ID: {agent.id.slice(0, 8)}
              </p>
            </div>

            {/* Micro Progress Bar for Learning */}
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-black uppercase text-slate-600">
                <span>Learning Progress</span>
                <span>{(agent.learning_progress * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.learning_progress * 100}%` }}
                  className="h-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-slate-800/50">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase">Tasks</span>
                <span className="text-[10px] font-bold text-slate-300">{agent.tasks_completed}</span>
              </div>
              <div className="flex flex-col border-l border-slate-800 pl-4">
                <span className="text-[8px] font-black text-slate-600 uppercase">Status</span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-pulse">
                  {agent.status}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Helpers for visual identity
function getTypeStyles(type: string) {
  switch (type) {
    case 'voice': return 'bg-sky-500 text-sky-400';
    case 'orchestrator': return 'bg-purple-500 text-purple-400';
    case 'email': return 'bg-emerald-500 text-emerald-400';
    default: return 'bg-slate-500 text-slate-400';
  }
}

function CpuIcon({ type }: { type: string }) {
  if (type === 'orchestrator') return <Shield size={14} />;
  if (type === 'voice') return <Zap size={14} />;
  return <Activity size={14} />;
}
