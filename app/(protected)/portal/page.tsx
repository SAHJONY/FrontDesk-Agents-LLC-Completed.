'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  TrendingUp, 
  Users, 
  Activity,
  Headset,
  Download,
  Search,
  ExternalLink,
  Play
} from 'lucide-react';

export default function ClientPortal() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchClientData();
    // Real-time listener so clients see "Hot Leads" pop up live
    const channel = supabase
      .channel('client-view')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_results' }, () => fetchClientData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchClientData() {
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

  const hotLeadsCount = leads.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <Headset className="w-10 h-10 text-cyan-500 animate-pulse" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Client Header */}
      <div className="flex flex-col md:row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Lead <span className="text-cyan-500">Intelligence Portal</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1">Real-time Performance Monitoring</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text"
            placeholder="Search leads..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs focus:border-cyan-500/30 outline-none"
          />
        </div>
      </div>

      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px]">
          <Users className="w-5 h-5 text-cyan-500 mb-4" />
          <p className="text-3xl font-black text-white italic">{leads.length}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Prospects</h3>
        </div>
        <div className="bg-[#000d1a] border border-emerald-500/10 p-8 rounded-[32px] shadow-[0_0_30px_rgba(16,185,129,0.05)]">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-4" />
          <p className="text-3xl font-black text-emerald-500 italic">{hotLeadsCount}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Qualified Conversions</h3>
        </div>
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px]">
          <Activity className="w-5 h-5 text-purple-500 mb-4" />
          <p className="text-3xl font-black text-white italic">{Math.round((hotLeadsCount/leads.length)*100 || 0)}%</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Success Rate</h3>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Contact</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">AI Summary</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.01] transition-all group">
                  <td className="px-10 py-8">
                    <div className="font-black text-white uppercase italic group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                    <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase tracking-widest">{lead.phone_number}</div>
                  </td>
                  <td className="px-10 py-8 max-w-md">
                    <p className="text-[11px] text-slate-400 italic line-clamp-2">
                      {lead.call_results?.[0]?.summary || "Analysis pending..."}
                    </p>
                    {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' && (
                      <span className="inline-block mt-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter rounded-full border border-emerald-500/20">
                        High Intent
                      </span>
                    )}
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 bg-white/5 rounded-xl hover:bg-cyan-500 hover:text-[#000814] transition-all">
                      <Play className="w-4 h-4" />
                    </button>
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
