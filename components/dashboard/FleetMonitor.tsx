'use client';

import React, { useEffect, useState } from 'react';
import { Activity, Zap, Target } from 'lucide-react';

interface FleetEvent {
  agentId: string;
  conversion: number;
  latency: number;
  timestamp: number;
}

export default function FleetMonitor() {
  const [events, setEvents] = useState<FleetEvent[]>([]);

  // In a production environment, this would connect to a 
  // /api/telemetry/stream endpoint using Server-Sent Events (SSE)
  // which reads from our Redis 'fleet-updates' channel.
  
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className="text-emerald-400 animate-pulse" size={20} />
          Global Fleet Telemetry
        </h3>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
          Live: 15 Agents Online
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Avg. Latency" value="184ms" icon={<Zap size={16}/>} color="blue" />
        <MetricCard label="Conv. Rate" value="32.4%" icon={<Target size={16}/>} color="emerald" />
        <MetricCard label="Active Nodes" value="PDX, IAD, AMS" icon={<Activity size={16}/>} color="purple" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Activity</p>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-sm text-slate-300 font-mono">Agent_Node_0{i}</span>
            <span className="text-xs text-emerald-400 font-medium">+1 Appointment Scheduled</span>
            <span className="text-xs text-slate-500">2s ago</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon, color }: any) {
  return (
    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
      <div className="flex items-center gap-2 text-slate-400 mb-1">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold text-white">{value}</div>
    </div>
  );
}
