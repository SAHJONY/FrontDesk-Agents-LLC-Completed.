"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRealtimeWorkforce } from "@/hooks/use-realtime-workforce";
import { Zap, Activity, Shield } from "lucide-react";

type Agent = {
  id?: string;
  name?: string;
  type?: string;
  status?: string;
  success_rate?: number;
  learning_progress?: number;
  tasks_completed?: number;
};

export function AgentPerformanceGrid() {
  const result = useRealtimeWorkforce();
  const metrics = result?.metrics;

  const agentsRaw = (metrics?.agents ?? []) as unknown[];
  const agents: Agent[] = Array.isArray(agentsRaw) ? (agentsRaw as Agent[]) : [];

  const safeAgents = agents
    .map((a, idx) => ({
      id: typeof a.id === "string" && a.id.length > 0 ? a.id : `unknown-${idx}`,
      name: typeof a.name === "string" && a.name.length > 0 ? a.name : "Unnamed Agent",
      type: typeof a.type === "string" ? a.type : "unknown",
      status: typeof a.status === "string" ? a.status : "unknown",
      success_rate: typeof a.success_rate === "number" ? a.success_rate : 0,
      learning_progress: typeof a.learning_progress === "number" ? a.learning_progress : 0,
      tasks_completed: typeof a.tasks_completed === "number" ? a.tasks_completed : 0,
    }))
    .slice(0, 100);

  if (safeAgents.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <p className="text-sm text-slate-300 font-semibold">No agents available yet.</p>
        <p className="text-xs text-slate-500 mt-2">
          If this is unexpected, check your workforce API or realtime connection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {safeAgents.map((agent, i) => (
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
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Efficiency
              </span>
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

            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-black uppercase text-slate-600">
                <span>Learning Progress</span>
                <span>{(agent.learning_progress * 100).toFixed(0)}%</span>
              </div>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.max(0, Math.min(100, agent.learning_progress * 100))}%`,
                  }}
                  className="h-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.4)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-slate-800/50">
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-slate-600 uppercase">Tasks</span>
                <span className="text-[10px] font-bold text-slate-300">
                  {agent.tasks_completed}
                </span>
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

function getTypeStyles(type: string) {
  switch (type) {
    case "voice":
      return "bg-sky-500 text-sky-400";
    case "orchestrator":
      return "bg-purple-500 text-purple-400";
    case "email":
      return "bg-emerald-500 text-emerald-400";
    default:
      return "bg-slate-500 text-slate-400";
  }
}

function CpuIcon({ type }: { type: string }) {
  if (type === "orchestrator") return <Shield size={14} />;
  if (type === "voice") return <Zap size={14} />;
  return <Activity size={14} />;
}
