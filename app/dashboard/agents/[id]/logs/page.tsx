'use client';

/**
 * FRONTDESK AGENTS: TELEMETRY STREAM
 * Real-time Log Monitoring & Transcript Analysis
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Activity, 
  PhoneIncoming, 
  ShieldCheck, 
  Clock, 
  Search,
  Download,
  Wifi
} from 'lucide-react';
import Link from 'next/link';

interface LogEntry {
  id: string;
  timestamp: string;
  source: 'system' | 'agent' | 'user';
  message: string;
  type: 'thought' | 'action' | 'dialogue';
}

export default function AgentLogsPage({ params }: { params: { id: string } }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock data stream for initialization
  useEffect(() => {
    const initialLogs: LogEntry[] = [
      { id: '1', timestamp: '14:20:01', source: 'system', type: 'action', message: 'Inbound session initialized via SIP trunk' },
      { id: '2', timestamp: '14:20:03', source: 'agent', type: 'thought', message: 'Detecting intent: Prospect inquiring about Enterprise Node scalability.' },
      { id: '3', timestamp: '14:20:04', source: 'agent', type: 'dialogue', message: 'Welcome to FrontDesk Agents. I understand you are looking for information on our global scaling capabilities?' },
    ];
    setLogs(initialLogs);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Monitoring Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-2xl font-black uppercase italic tracking-tighter">Live Stream: {params.id}</h1>
            </div>
            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Active Monitoring // Protocol: Secure WebSocket</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-blue-500 transition-all">
              <Download size={14} /> Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-blue-500 shadow-lg transition-all">
              <Activity size={14} /> Full Diagnostic
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Telemetry Stats */}
          <div className="lg:col-span-1 space-y-4">
            <StatCard label="Session Duration" value="04m 12s" icon={<Clock size={16}/>} />
            <StatCard label="Tokens Processed" value="2,410" icon={<Activity size={16}/>} />
            <StatCard label="Confidence Index" value="98.2%" icon={<ShieldCheck size={16} className="text-emerald-500"/>} />
            <div className="p-6 bg-zinc-950 border border-zinc-900 rounded-3xl mt-6">
              <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">Connection Status</h4>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="flex items-center gap-2 text-zinc-400"><Wifi size={12} className="text-emerald-500"/> Operational</span>
                <span className="text-zinc-500">Node: US-EAST</span>
              </div>
            </div>
          </div>

          {/* Console Output */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] flex flex-col h-[600px] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-zinc-900 flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-blue-600" />
                  <span className="text-xs font-black uppercase tracking-widest">Unified Event Log</span>
                </div>
                <div className="flex items-center gap-4">
                   <Search size={14} className="text-zinc-700" />
                   <div className="h-4 w-[1px] bg-zinc-800" />
                   <div className="text-[10px] font-mono text-zinc-500 uppercase">Buffer: 1000 Lines</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-4 font-mono text-[11px]" ref={scrollRef}>
                {logs.map((log) => (
                  <div key={log.id} className="flex gap-6 group">
                    <span className="text-zinc-700 font-bold shrink-0">{log.timestamp}</span>
                    <div className="space-y-1">
                      <span className={`uppercase font-black tracking-tighter text-[9px] px-1.5 py-0.5 rounded ${
                        log.source === 'agent' ? 'bg-blue-600 text-white' : 
                        log.source === 'system' ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black'
                      }`}>
                        {log.source}
                      </span>
                      <p className={`leading-relaxed ${
                        log.type === 'thought' ? 'text-zinc-600 italic border-l border-zinc-800 pl-3' : 'text-zinc-300'
                      }`}>
                        {log.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl flex items-center justify-between">
      <div>
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black italic tracking-tighter text-white">{value}</p>
      </div>
      <div className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 border border-zinc-800">
        {icon}
      </div>
    </div>
  );
}
