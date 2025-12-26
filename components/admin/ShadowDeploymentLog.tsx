'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Check, Activity } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  event: string;
  status: 'processing' | 'success' | 'ready';
  detail: string;
}

export default function ShadowDeploymentLog() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '21:04:12', event: 'CORE_INGESTION', status: 'success', detail: 'CSV Batch "Global_Medical_01" detected.' },
    { id: '2', timestamp: '21:04:15', event: 'SHADOW_PROVISION', status: 'processing', detail: 'Mapping clinical persona for Adey Law...' },
  ]);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden font-mono">
      <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-cyan-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Autonomous Deployment Feed</span>
        </div>
        <Activity className="w-3 h-3 text-cyan-500 animate-pulse" />
      </div>
      
      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 text-[11px] leading-relaxed">
            <span className="text-slate-600">[{log.timestamp}]</span>
            <span className="text-cyan-500 font-bold">[{log.event}]</span>
            <span className="text-slate-300">{log.detail}</span>
            {log.status === 'success' && <Check className="w-3 h-3 text-green-500 ml-auto" />}
          </div>
        ))}
      </div>
    </div>
  );
}
