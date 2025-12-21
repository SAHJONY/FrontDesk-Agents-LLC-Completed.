'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  PhoneCall, 
  TrendingUp, 
  Users, 
  Clock, 
  ArrowUpTray, 
  Zap, 
  ShieldCheck, 
  Activity,
  Headset,
  Download,
  Bell,
  Trash2,
  Terminal,
  Cpu,
  Radio
} from 'lucide-react';

const BRAND_NAME = "FrontDesk Agents"; 
const SYSTEM_VERSION = "v4.2.0-PRO";

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notifications, setNotifications] = useState<{id: string, msg: string}[]>([]);
  const [liveLogs, setLiveLogs] = useState<{id: string, text: string, type: 'ai' | 'sys'}[]>([
    { id: '1', text: "System Initialized. Awaiting Uplink...", type: 'sys' }
  ]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    conversions: 0,
    creditsRemaining: 1000,
    avgPerformance: 0
  });

  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

  // --- NOTIFICATION & ALERT ENGINE ---
  const triggerAlert = (leadName: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const message = `High-Interest: ${leadName} detected!`;
    
    // Toast Notification
    setNotifications(prev => [{id, msg: message}, ...prev]);
    
    // System Sound/Browser Alert if permitted
    if (Notification.permission === "granted") {
      new Notification(`🔥 ${BRAND_NAME} Alert`, { body: message });
    }
  };

  const clearNotifications = () => setNotifications([]);

  useEffect(() => {
    fetchOperationalData();
    if (Notification.permission !== "granted") Notification.requestPermission();

    const channel = supabase
      .channel('frontdesk-sync')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'call_results' }, (payload) => {
        const newCall = payload.new as any;
        
        // Update Live Transcript Stream
        const logId = Math.random().toString(36).substr(2, 9);
        setLiveLogs(prev => [
          { id: logId, text: `AI: Protocol finished. Summary: ${newCall.summary?.substring(0, 60)}...`, type: 'ai' },
          ...prev.slice(0, 5)
        ]);

        if (newCall.sentiment_score === 'Hot 🔥') {
          triggerAlert("A New Prospect");
        }
        fetchOperationalData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchOperationalData())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchOperationalData() {
    const { data: leadsData } = await supabase
      .from('leads')
      .select('*, call_results(*)')
      .order('created_at', { ascending: false });
    
    const { data: logs } = await supabase.from('consumption_log').select('minutes_used');

    if (leadsData) {
      setLeads(leadsData);
      const conversionCount = leadsData.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length;
      const totalUsed = logs?.reduce((acc, l) => acc + (l.minutes_used || 0), 0) || 0;
      
      setMetrics({
        totalLeads: leadsData.length,
        conversions: conversionCount,
        creditsRemaining: 1000 - Math.round(totalUsed),
        avgPerformance: leadsData.length > 0 ? Math.round(totalUsed / leadsData.length) : 0
      });
    }
    setLoading(false);
  }

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').slice(1);
      const leadsToInsert = rows.map(row => {
        const [full_name, phone_number] = row.split(',');
        return { full_name: full_name?.trim(), phone_number: phone_number?.trim(), user_id: userId };
      }).filter(l => l.full_name && l.phone_number);
      await supabase.from('leads').insert(leadsToInsert);
      fetchOperationalData();
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-12 h-12 text-cyan-500 animate-pulse" />
        <div className="text-[10px] font-black tracking-[0.5em] text-cyan-500 uppercase">Initializing {BRAND_NAME}...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans relative">
      
      {/* --- HEADER --- */}
      <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3 uppercase italic">
            FrontDesk <span className="text-cyan-500">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Core OS {SYSTEM_VERSION} • Secure Link Active</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* NOTIFICATION BELL */}
          <div className="relative group">
            <button className="p-3 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all relative">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-cyan-500" />
              {notifications.length > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 bg-cyan-500 rounded-full animate-ping" />
              )}
            </button>
            
            {notifications.length > 0 && (
              <div className="absolute right-0 mt-4 w-72 bg-[#000d1a] border border-cyan-500/20 rounded-[24px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
                <div className="p-4 border-b border-white/5 bg-cyan-500/5 flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Live Agent Alerts</p>
                  <button onClick={clearNotifications} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
                    <Trash2 className="w-3 h-3 text-slate-500 hover:text-red-500" />
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-4 border-b border-white/5 text-[11px] font-medium text-slate-300">
                      {n.msg}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Download className="w-4 h-4" /> Export ROI Report
          </button>
        </div>
      </div>

      {/* --- NEURAL TRANSCRIPT & SWARM STATUS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-black border border-cyan-500/20 rounded-[40px] p-8 shadow-2xl relative overflow-hidden h-[300px]">
          <div className="absolute top-0 right-0 p-6"><Radio className="w-4 h-4 text-cyan-500 animate-pulse" /></div>
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Transcript Stream</h2>
          </div>
          <div className="space-y-3 font-mono">
            {liveLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-left-4">
                <span className={`text-[8px] mt-1 px-2 py-0.5 rounded font-bold ${log.type === 'ai' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-white/5 text-slate-600'}`}>
                  {log.type === 'ai' ? 'USR_AI' : 'SYS_LOG'}
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed truncate">
                  <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log.text}
                </p>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none border-t border-cyan-500/10 h-1/2 w-full animate-pulse opacity-20" />
        </div>

        <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-8 flex flex-col justify-between">
          <div>
            <div className="p-3 bg-cyan-500/10 rounded-2xl w-fit mb-6"><Cpu className="w-6 h-6 text-cyan-500" /></div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Active Swarm</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">AI Node Distribution</p>
          </div>
          <button className="w-full py-5 bg-cyan-500 text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all">
            Deploy Node Swarm
          </button>
        </div>
      </div>

      {/* --- KPI MONITORING --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Managed Entities', val: metrics.totalLeads, icon: Users, color: 'text-cyan-500' },
          { label: 'Hot Conversions', val: metrics.conversions, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'System Credits', val: metrics.creditsRemaining, icon: Clock, color: 'text-purple-500' },
          { label: 'Avg Session', val: `${metrics.avgPerformance}m`, icon: PhoneCall, color: 'text-orange-500' }
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#000d1a] border border-white/5 p-7 rounded-[32px] group hover:border-cyan-500/30 transition-all">
            <kpi.icon className={`w-5 h-5 ${kpi.color} mb-6 transition-transform group-hover:scale-110`} />
            <p className="text-3xl font-black text-white italic">{kpi.val}</p>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{kpi.label}</h3>
          </div>
        ))}
      </div>

      {/* --- OPERATIONS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[40px] flex flex-col min-h-[300px]">
          <div className="flex items-center gap-2 mb-8">
            <Activity className="w-4 h-4 text-cyan-500" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Data Ingestion</h2>
          </div>
          <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[32px] cursor-pointer hover:bg-cyan-500/5 hover:border-cyan-500/40 transition-all group">
            <ArrowUpTray className={`w-10 h-10 ${isProcessing ? 'animate-bounce text-cyan-500' : 'text-slate-700 group-hover:text-cyan-500'}`} />
            <p className="text-[11px] font-black text-white uppercase tracking-widest mt-4">{isProcessing ? 'Processing Matrix...' : 'Import Lead List'}</p>
            <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" disabled={isProcessing} />
          </label>
        </div>

        <div className="lg:col-span-2 bg-gradient-to-br from-cyan-900/10 to-[#000d1a] border border-white/5 p-10 rounded-[40px] relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-cyan-500 mb-3 italic">Autonomous Protocol</h2>
            <p className="text-xs text-slate-500 mb-10 max-w-lg leading-relaxed font-medium uppercase tracking-tighter">Initialize agent swarm dispatch. Systems will navigate scripts, determine lead sentiment, and execute scheduling protocols.</p>
            <button className="flex items-center justify-center gap-4 w-full sm:w-auto px-12 py-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-[24px] font-black text-[13px] uppercase tracking-[0.3em] text-white transition-all">
              <Zap className="w-5 h-5 text-cyan-500" /> System Initialization
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full" />
        </div>
      </div>

      {/* --- LIVE NETWORK TABLE --- */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Live Network Stream</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Entity Signature</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-center">Protocol Status</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-10 py-8">
                    <div className="font-black text-white uppercase italic group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                    <div className="text-[10px] text-slate-600 font-mono mt-1 tracking-widest">{lead.phone_number}</div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest border inline-block ${
                      lead.call_results?.[0]?.status === 'In Call 📞' 
                      ? 'bg-amber-500/5 text-amber-500 border-amber-500/20 animate-pulse' 
                      : 'bg-white/5 text-slate-500 border-white/5'
                    }`}>
                      {lead.call_results?.[0]?.status || 'IDLE_INIT'}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                     {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? (
                       <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest italic shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                          Conversion Detected
                       </div>
                     ) : (
                       <span className="text-slate-800 text-[10px] font-black tracking-widest italic opacity-40 uppercase">Scanning Uplink...</span>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
