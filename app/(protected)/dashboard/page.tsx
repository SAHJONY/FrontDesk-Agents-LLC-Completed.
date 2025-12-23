'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  PhoneIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  PlayIcon,
  ArrowUpTrayIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  UsersIcon,
  ClockIcon,
  ServerIcon
} from '@heroicons/react/24/outline';

// Types for build stability
interface Lead {
  id: string;
  full_name: string;
  phone_number: string;
  created_at: string;
  call_results?: CallResult[];
}

interface CallResult {
  status: string;
  sentiment_score?: string;
  recording_url?: string;
  summary?: string;
  transcript?: string;
}

// Agent Registry Definition
const AGENT_REGISTRY = [
  { id: 'scanner', name: 'Database Scanner', role: '6:00 AM Sync', status: 'Active' },
  { id: 'coordinator', name: 'Scheduling Coordinator', role: 'Logic Engine', status: 'Active' },
  { id: 'voice', name: 'Voice Communication', role: 'Bland AI', status: 'Standby' },
  { id: 'text', name: 'Text Messaging', role: 'SMS Outreach', status: 'Active' },
  { id: 'tracker', name: 'Status Tracking', role: 'HIPAA Logs', status: 'Active' },
];

export default function DashboardPage() {
  const supabase = createClient();
  const [loadingLeadId, setLoadingLeadId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isBulkLoading, setIsBulkLoading] = useState(false); // Track background processing
  const [metrics, setMetrics] = useState({
    callsProcessed: 0,
    minutesUsed: 0,
    totalMinutes: 1000,
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);
      await fetchDashboardData();
    };

    initializeDashboard();

    // Real-time listener for both call results and lead updates from background agents
    const channel = supabase
      .channel('realtime-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_results' }, () => fetchDashboardData())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchDashboardData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchDashboardData() {
    const { data: leadsData } = await supabase
      .from('leads')
      .select('*, call_results(*)')
      .order('created_at', { ascending: false });

    const { data: logs } = await supabase.from('consumption_log').select('minutes_used');
    
    if (leadsData) setLeads(leadsData);
    if (logs) {
      const total = logs.reduce((acc, l) => acc + (l.minutes_used || 0), 0);
      setMetrics(prev => ({ 
        ...prev, 
        minutesUsed: Math.round(total), 
        callsProcessed: leadsData?.length || 0 
      }));
    }
  }

  const usagePercentage = useMemo(() => 
    Math.min((metrics.minutesUsed / metrics.totalMinutes) * 100, 100), 
  [metrics]);

  // ELITE CSV IMPORT LOGIC (Background Agent Trigger)
  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentUserId) return;

    setIsBulkLoading(true);
    
    try {
      // 1. Upload raw file to private storage bucket
      const fileName = `${currentUserId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('crm-imports')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Trigger the Deno Edge Function for background neural processing
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/process-crm-import`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ filePath: fileName, userId: currentUserId }),
      });

      if (response.ok) {
        // Notify user that the Status Tracking Agent has taken over
        alert("Import Handshake Successful: Background processing started.");
      }
    } catch (err) {
      console.error("Neural Import Failed:", err);
      alert("System Alert: Connection to background agent failed.");
    } finally {
      setIsBulkLoading(false);
      fetchDashboardData();
    }
  };

  const callLead = async (lead: Lead) => {
    if (!currentUserId) return;
    setLoadingLeadId(lead.id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/bland-call`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}` 
        },
        body: JSON.stringify({ 
          record: lead, 
          metadata: { 
            user_id: currentUserId, 
            lead_id: lead.id, 
            full_name: lead.full_name, 
            phone_number: lead.phone_number 
          } 
        }),
      });
    } catch (error) { console.error("Call failed:", error); } 
    finally { setLoadingLeadId(null); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 p-6 lg:p-10 space-y-10 font-sans selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent uppercase italic">
            Command Center
          </h1>
          <p className="text-slate-400 font-medium mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            System Operational • Global Node: Portland (pdx1)
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
           <label className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 px-6 py-4 rounded-2xl cursor-pointer transition-all active:scale-95 group">
              {isBulkLoading ? <ArrowPathIcon className="w-5 h-5 text-cyan-400 animate-spin" /> : <ArrowUpTrayIcon className="w-5 h-5 text-cyan-400 group-hover:-translate-y-1 transition-transform" />}
              <span className="text-[11px] font-bold uppercase tracking-widest">
                {isBulkLoading ? 'Processing' : 'Import CRM'}
              </span>
              <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} disabled={isBulkLoading} />
            </label>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-cyan-600 text-white px-8 py-4 rounded-2xl hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-900/20 active:scale-95">
              <RocketLaunchIcon className="w-5 h-5 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Auto-Pilot Run</span>
            </button>
        </div>
      </header>

      {/* AGENT MONITOR SECTION */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <ServerIcon className="w-4 h-4 text-slate-500" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Agent Cluster</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {AGENT_REGISTRY.map((agent) => (
            <div key={agent.id} className="bg-slate-900/40 border border-white/5 p-5 rounded-3xl hover:border-cyan-500/30 transition-all group">
              <div className="flex justify-between items-start mb-3">
                <div className={`h-1.5 w-1.5 rounded-full ${agent.status === 'Active' ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]' : 'bg-slate-600'}`} />
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-tighter">{agent.status}</span>
              </div>
              <p className="text-[11px] font-black text-white uppercase italic tracking-tight">{agent.name}</p>
              <p className="text-[9px] text-slate-500 mt-1 font-medium">{agent.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* METRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<UsersIcon />} label="Total Leads" value={metrics.callsProcessed} sub="Active in pipeline" />
        <MetricCard icon={<ClockIcon />} label="Time Used" value={`${metrics.minutesUsed}m`} sub={`of ${metrics.totalMinutes}m limit`} />
        <MetricCard icon={<ChartBarIcon />} label="Efficiency" value={`${(100 - usagePercentage).toFixed(1)}%`} sub="Available Resources" />
        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">System Health</p>
          <p className="text-2xl font-black italic text-cyan-400">99.9%</p>
          <div className="mt-4 flex gap-1 h-8 items-end">
            {[30, 60, 45, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-slate-900/40 border border-white/5 rounded-[40px] p-1 backdrop-blur-xl">
        <div className="bg-slate-950/50 rounded-[38px] overflow-hidden">
           <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Contact Identity</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Neural Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] text-right">Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} onCall={() => callLead(lead)} onSelect={() => setSelectedLead(lead)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: any) {
  return (
    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 hover:bg-slate-900 transition-colors group">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 mb-4 group-hover:text-cyan-400 transition-colors">
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black italic text-white">{value}</p>
      <p className="text-[10px] text-slate-600 mt-1">{sub}</p>
    </div>
  );
}

function LeadRow({ lead, onCall, onSelect }: any) {
  const result = lead.call_results?.[0];
  return (
    <tr className="group hover:bg-white/[0.02] transition-all cursor-pointer">
      <td className="px-8 py-6" onClick={onSelect}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center border border-white/10 text-xs font-bold text-slate-400 uppercase">
            {lead.full_name[0]}
          </div>
          <div>
            <p className="font-bold text-slate-200 uppercase italic tracking-tight group-hover:text-cyan-400 transition-colors">{lead.full_name}</p>
            <p className="text-[10px] font-mono text-slate-500">{lead.phone_number}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className={`px-3 py-1 rounded-lg border text-[9px] font-black uppercase italic ${
          result?.status === 'In Call 📞' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-slate-800/50 text-slate-500 border-slate-700/50'
        }`}>
          {result?.status || 'Standby'}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <button 
          onClick={(e) => { e.stopPropagation(); onCall(); }}
          className="p-3 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:bg-cyan-600 hover:text-white hover:border-cyan-500 transition-all"
        >
          <PhoneIcon className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
