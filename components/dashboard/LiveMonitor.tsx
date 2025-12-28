'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Phone, MessageSquare, Shield, Zap } from 'lucide-react';

const MOCK_LOGS = [
  "INITIALIZING SECURE HANDSHAKE...",
  "INBOUND CALL: +1 (555) 012-9982",
  "AGENT ALPHA: Greeting client via Neural Ingest v2",
  "CLIENT: 'I need to book a haircut for Tuesday at 4pm'",
  "AGENT ALPHA: Checking Google Calendar API...",
  "SLOT SECURED: Tuesday @ 16:00. SMS confirmation sent.",
  "CALL TERMINATED: Success Score 98%"
];

export default function LiveMonitor() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)]].slice(-8));
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-[#05070a] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
      {/* HEADER */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Live Stream // Node_01</span>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[9px] text-cyan-500 font-bold uppercase tracking-widest">Live Feed</span>
          </div>
        </div>
      </div>

      {/* TERMINAL FEED */}
      <div className="p-6 font-mono text-[10px] space-y-2 min-h-[240px]">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-500">
            <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
            <span className={log.includes('Success') ? 'text-emerald-500 font-bold' : 'text-slate-400'}>
              {log}
            </span>
          </div>
        ))}
      </div>

      {/* METRIC FOOTER */}
      <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.02]">
        <div className="p-4 border-r border-white/10 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Active Nodes</p>
          <p className="text-sm font-bold text-white tracking-widest">04</p>
        </div>
        <div className="p-4 border-r border-white/10 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Weekly ROI</p>
          <p className="text-sm font-bold text-emerald-500 tracking-widest">+312%</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-[8px] text-slate-500 uppercase font-black mb-1">Protocol</p>
          <p className="text-sm font-bold text-cyan-500 tracking-widest italic">AEGIS</p>
        </div>
      </div>
    </div>
  );
}
