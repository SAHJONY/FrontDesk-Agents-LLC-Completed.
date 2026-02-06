'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Activity, Zap, Target } from 'lucide-react';

interface FleetEvent {
  agentId: string;
  conversion: number;
  latency: number;
  timestamp: number;
}

export default function FleetMonitor() {
  const [events, setEvents] = useState<FleetEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Establish connection to the enterprise telemetry stream
    const eventSource = new EventSource('/api/telemetry/stream');

    eventSource.onopen = () => setIsConnected(true);

    eventSource.onmessage = (event) => {
      try {
        const rawData = JSON.parse(event.data);
        // Ensure data follows our FleetEvent interface
        const newEvent: FleetEvent = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        
        setEvents((prev) => [newEvent, ...prev].slice(0, 10)); // Maintain rolling window of 10 events
      } catch (err) {
        console.error('Telemetry Parse Error:', err);
      }
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  // Performance calculations derived from the live stream
  const stats = useMemo(() => {
    if (events.length === 0) return { avgLatency: '---', avgConv: '---' };
    
    const avgLatency = events.reduce((acc, curr) => acc + curr.latency, 0) / events.length;
    const avgConv = events.reduce((acc, curr) => acc + curr.conversion, 0) / events.length;
    
    return {
      avgLatency: `${Math.round(avgLatency)}ms`,
      avgConv: `${(avgConv * 100).toFixed(1)}%`
    };
  }, [events]);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Activity className={`${isConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} size={20} />
          Global Fleet Telemetry
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
          isConnected 
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {isConnected ? 'Live: 15 Agents Online' : 'Telemetry Disconnected'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Avg. Latency" value={stats.avgLatency} icon={<Zap size={16}/>} />
        <MetricCard label="Conv. Rate" value={stats.avgConv} icon={<Target size={16}/>} />
        <MetricCard label="Active Nodes" value="PDX, IAD, AMS" icon={<Activity size={16}/>} />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Recent Activity</p>
        {events.length > 0 ? (
          events.map((event, idx) => (
            <div key={`${event.agentId}-${idx}`} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800 animate-in fade-in slide-in-from-top-1">
              <span className="text-sm text-slate-300 font-mono">{event.agentId}</span>
              <span className="text-xs text-emerald-400 font-medium">Efficiency: {Math.round(event.conversion * 100)}%</span>
              <span className="text-xs text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-slate-600 text-sm italic">
            Waiting for inbound agent data...
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
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
