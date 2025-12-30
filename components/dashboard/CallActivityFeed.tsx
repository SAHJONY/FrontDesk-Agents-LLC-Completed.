'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Activity Intelligence Feed: Telephony + Legal Merits Telemetry
 */

import React, { useEffect, useState } from 'react';
import { 
  PhoneIncoming, 
  PhoneOutgoing, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Gavel, 
  Activity,
  ChevronRight
} from 'lucide-react';

interface CallActivity {
  id: string;
  direction: 'inbound' | 'outbound';
  from: string;
  to: string;
  status: string;
  duration: number | null;
  qualified: boolean;
  timestamp: string;
  nodeType: 'receptionist' | 'qualification' | 'legal_agent' | 'priority';
}

export default function CallActivityFeed({ tenantId }: { tenantId: string }) {
  const [activities, setActivities] = useState<CallActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCallActivity();
    const interval = setInterval(fetchCallActivity, 10000); // 10s sync for Elite responsiveness
    return () => clearInterval(interval);
  }, [tenantId]);

  async function fetchCallActivity() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/calls?tenant_id=${tenantId}&limit=8`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data.calls);
      }
    } catch (error) {
      console.error('[FEED] Sync error:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (diff < 1) return 'JUST NOW';
    if (diff < 60) return `${diff}M AGO`;
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Intelligence Feed</h3>
          <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-widest">Active Workforce Monitoring</p>
        </div>
        <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-zinc-900/50 rounded-2xl animate-pulse border border-zinc-800" />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-[2rem]">
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Awaiting workforce data...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-center justify-between p-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`p-3 rounded-xl ${
                  activity.nodeType === 'legal_agent' 
                  ? 'bg-blue-500/10 text-blue-500' 
                  : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {activity.nodeType === 'legal_agent' ? (
                    <Gavel className="w-4 h-4" />
                  ) : activity.direction === 'inbound' ? (
                    <PhoneIncoming className="w-4 h-4" />
                  ) : (
                    <PhoneOutgoing className="w-4 h-4" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-tight text-white truncate">
                      {activity.direction === 'inbound' ? activity.from : activity.to}
                    </p>
                    {activity.qualified && <CheckCircle2
                                             
