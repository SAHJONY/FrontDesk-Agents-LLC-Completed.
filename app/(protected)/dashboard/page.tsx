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
  Headset
} from 'lucide-react';

// --- ENTERPRISE BRAND CONFIGURATION ---
const BRAND_NAME = "FrontDesk Agents"; 

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    conversions: 0,
    creditsRemaining: 1000,
    avgPerformance: 0
  });

  useEffect(() => {
    fetchOperationalData();

    // --- REAL-TIME DATA STREAM ---
    const channel = supabase
      .channel('frontdesk-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_results' }, () => fetchOperationalData())
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

  const kpis = [
    { name: 'Managed Entities', value: metrics.totalLeads, label: 'Database Size', icon: Users, color: 'text-blue-500' },
    { name: 'High-Value Leads', value: metrics.conversions, label: 'Hot Sentiment', icon: TrendingUp, color: 'text-emerald-500' },
    { name: 'System Credits', value: metrics.creditsRemaining, label: 'Minutes Available', icon: Clock, color: 'text-purple-500' },
    { name: 'Agent Efficiency', value: `${metrics.avgPerformance}m`, label: 'Avg Call Time', icon: PhoneCall, color: 'text-orange-500' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505]">
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-12 h-12 text-blue-600 animate-pulse" />
        <div className="text-[10px] font-black tracking-[0.5em] text-blue-600 uppercase transition-all">
          Booting {BRAND_NAME} Core...
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 p-4 lg:p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* --- BRANDED NAVIGATION / HEADER --- */}
        <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Headset className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
                {BRAND_NAME.split(' ')[0]} <span className="text-blue-600 italic">{BRAND_NAME.split(' ')[1]}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Enterprise AI Layer v4.1</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/5">
             <div className="px-6 py-2 text-center border-r border-white/10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Status</p>
                <div className="flex items-center gap-2 justify-center mt-1">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-xs font-bold text-white uppercase tracking-tighter">Active</p>
                </div>
             </div>
             <div className="px-6 py-2 text-center">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Provisioning</p>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-tighter mt-1 italic">Founder Plan</p>
             </div>
          </div>
        </div>

        {/* --- KPI MONITORING --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi) => (
            <div key={kpi.name} className="bg-[#0A0A0A] border border-white/5 hover:border-blue-500/30 transition-all rounded-[32px] p-7 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <kpi.icon className="w-16 h-16 text-white" />
              </div>
              <div className={`p-3 w-fit rounded-xl bg-slate-900 mb-6 group-hover:scale-110 transition-transform`}>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <p className="text-3xl font-black text-white italic mb-1">{kpi.value}</p>
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.name}</h3>
              <p className="text-[9px] font-medium text-slate-600 mt-2 uppercase">{kpi.label}</p>
            </div>
          ))}
        </div>

        {/* --- CORE OPS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           {/* CSV UPLOAD */}
           <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[40px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Lead Ingestion</h2>
                </div>
                <label className="flex flex-col items-center justify-center gap-4 py-12 border-2 border-dashed border-white/5 rounded-[32px] cursor-pointer hover:bg-blue-600/5 hover:border-blue-600/40 transition-all group">
                  <ArrowUpTray className="w-10 h-10 text-slate-700 group-hover:text-blue-500 group-hover:translate-y-[-4px] transition-all" />
                  <div className="text-center">
                     <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">Import Matrix</p>
                     <p className="text-[9px] text-slate-600 font-medium italic">Supports CSV Format</p>
                  </div>
                  <input type="file" accept=".csv" className="hidden" />
                </label>
              </div>
           </div>
           
           {/* EXECUTION ENGINE */}
           <div className="lg:col-span-2 bg-gradient-to-br from-blue-900/10 to-[#0A0A0A] border border-white/5 p-8 rounded-[40px] flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20" />
              <div className="relative z-10">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-500 mb-2 italic">Global Deployment</h2>
                <p className="text-xs text-slate-500 mb-10 max-w-md leading-relaxed font-medium">
                  Trigger autonomous AI dispatch across all verified leads. FrontDesk agents will initiate outreach, evaluate sentiment, and manage follow-ups automatically.
                </p>
                <button className="flex items-center justify-center gap-4 w-full py-6 bg-blue-600 hover:bg-blue-500 rounded-[24px] font-black text-[13px] uppercase tracking-[0.3em] text-white transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] hover:translate-y-[-2px]">
                  <Zap className="w-5 h-5 fill-current" />
                  Initialize Agent Protocol
                </button>
              </div>
           </div>
        </div>

        {/* --- LIVE STREAM TABLE --- */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Live Network Traffic</h2>
            <div className="px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20">
               <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Encrypted Stream</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Entity Signature</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Agent Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Sentiment Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-10 py-8">
                      <div className="font-black text-white uppercase italic tracking-tighter group-hover:text-blue-500 transition-colors">{lead.full_name}</div>
                      <div className="text-[10px] text-slate-600 font-mono mt-1 tracking-widest">{lead.phone_number}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-3">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase italic tracking-widest border ${
                          lead.call_results?.[0]?.status === 'In Call 📞' 
                          ? 'bg-amber-500/5 text-amber-500 border-amber-500/20 animate-pulse' 
                          : 'bg-white/5 text-slate-500 border-white/5'
                        }`}>
                          {lead.call_results?.[0]?.status || 'In-Queue'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-right">
                       {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? (
                         <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                            Conversion Detected
                         </div>
                       ) : (
                         <span className="text-slate-800 text-[10px] font-black tracking-widest italic">NEUTRAL_SIG</span>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
