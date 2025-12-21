'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  TrendingUp, Users, Activity, Headset, 
  Search, Play, Zap, ShieldCheck, 
  BarChart3, Calendar, Clock
} from 'lucide-react';

export default function ClientDashboard() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchClientData();
    // Real-time sync: The client sees "Hot Leads" pop up live as your AI closes them
    const channel = supabase
      .channel('client-live-view')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_results' }, () => fetchClientData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchClientData() {
    // In production, you would filter this by the specific Client ID associated with the Magic Link
    const { data } = await supabase
      .from('leads')
      .select('*, call_results(*)')
      .order('created_at', { ascending: false });
    
    if (data) setLeads(data);
    setLoading(false);
  }

  const filteredLeads = leads.filter(l => 
    l.full_name.toLowerCase().includes(filter.toLowerCase())
  );

  const hotLeads = leads.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥');

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-10 h-10 text-cyan-500 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 italic">Establishing Secure Uplink...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      
      {/* --- CLIENT BRANDING HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Intelligence <span className="text-cyan-500">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em]">Verified Secure Data Stream</p>
          </div>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text"
            placeholder="Search Intelligence Database..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-white placeholder:text-slate-700 focus:border-cyan-500/30 transition-all outline-none"
          />
        </div>
      </div>

      {/* --- ROI PERFORMANCE CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px] group hover:border-cyan-500/20 transition-all">
          <Users className="w-5 h-5 text-cyan-500 mb-6" />
          <p className="text-3xl font-black text-white italic tracking-tighter">{leads.length}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Prospects</h3>
        </div>
        
        <div className="bg-[#000d1a] border border-emerald-500/10 p-8 rounded-[32px] shadow-[0_0_40px_rgba(16,185,129,0.03)] relative overflow-hidden">
          <Zap className="w-5 h-5 text-emerald-500 mb-6" />
          <p className="text-3xl font-black text-emerald-500 italic tracking-tighter">{hotLeads.length}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Qualified Conversions</h3>
          <div className="absolute top-0 right-0 p-4"><div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" /></div>
        </div>

        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px]">
          <BarChart3 className="w-5 h-5 text-purple-500 mb-6" />
          <p className="text-3xl font-black text-white italic tracking-tighter">{Math.round((hotLeads.length / leads.length) * 100 || 0)}%</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Conversion Rate</h3>
        </div>

        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px]">
          <Calendar className="w-5 h-5 text-orange-500 mb-6" />
          <p className="text-3xl font-black text-white italic tracking-tighter">Active</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Neural Campaign</h3>
        </div>
      </div>

      {/* --- LIVE RESULTS FEED --- */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Global Signal Stream</h2>
           <div className="flex items-center gap-2">
             <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full animate-ping" />
             <span className="text-[8px] font-black text-cyan-500 uppercase tracking-widest">Live Monitoring</span>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Prospect Entity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">AI Result Summary</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Intel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.01] transition-all group cursor-pointer">
                  <td className="px-10 py-8">
                    <div className="font-black text-white uppercase italic group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                    <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase font-mono tracking-widest">{lead.phone_number}</div>
                  </td>
                  <td className="px-10 py-8 max-w-md">
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      {lead.call_results?.[0]?.summary || "Analyzing node interaction..."}
                    </p>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                       {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' && <Zap className="w-4 h-4 text-emerald-500 fill-current" />}
                       <Play className="w-4 h-4 text-slate-800 group-hover:text-cyan-500 transition-colors" />
                    </div>
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
