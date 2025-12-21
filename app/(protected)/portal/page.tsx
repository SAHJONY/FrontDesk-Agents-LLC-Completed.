'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  TrendingUp, Users, Activity, Headset, Search, 
  Play, X, Volume2, Zap, ShieldCheck, FileText, 
  MessageSquare, ChevronRight, Headphones
} from 'lucide-react';

export default function ClientPortal() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  // --- STATE FOR DETAIL VIEW ---
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchClientData();
    const channel = supabase
      .channel('client-sync')
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
    l.full_name.toLowerCase().includes(filter.toLowerCase()) ||
    l.phone_number.includes(filter)
  );

  const openDetail = (lead: any) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <Headset className="w-10 h-10 text-cyan-500 animate-pulse" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative pb-20">
      
      {/* Header & Stats (Standardized with Cyan Theme) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
          Intelligence <span className="text-cyan-500">Portal</span>
        </h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text" placeholder="Search entity..." value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-4 pl-12 text-xs outline-none focus:border-cyan-500/30"
          />
        </div>
      </div>

      {/* Main Table View */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Prospect</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">AI Summary</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredLeads.map((lead) => (
              <tr 
                key={lead.id} 
                onClick={() => openDetail(lead)}
                className="hover:bg-cyan-500/5 transition-all cursor-pointer group"
              >
                <td className="px-10 py-8">
                  <div className="font-black text-white uppercase italic group-hover:text-cyan-400">{lead.full_name}</div>
                  <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase font-mono">{lead.phone_number}</div>
                </td>
                <td className="px-10 py-8">
                  <p className="text-[11px] text-slate-400 italic line-clamp-1">{lead.call_results?.[0]?.summary || "No data stream."}</p>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-3">
                    {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' && <Zap className="w-4 h-4 text-emerald-500 fill-current" />}
                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-cyan-500" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- SLIDE-OVER DETAIL PANEL --- */}
      {isDetailOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)} />
          
          {/* Panel */}
          <div className="relative w-full max-w-2xl bg-[#000814] border-l border-cyan-500/20 h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            
            {/* Panel Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#000d1a]">
              <div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{selectedLead.full_name}</h2>
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{selectedLead.phone_number}</p>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {/* Audio Section */}
              <div className="bg-black/40 border border-white/5 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Call Transmission Recording</span>
                </div>
                {selectedLead.call_results?.[0]?.recording_url ? (
                  <audio controls className="w-full accent-cyan-500" src={selectedLead.call_results[0].recording_url} />
                ) : (
                  <div className="py-4 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest border border-dashed border-white/5 rounded-xl">Audio Uplink Unavailable</div>
                )}
              </div>

              {/* Summary Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Intelligence Summary</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-400 bg-white/5 p-6 rounded-3xl border border-white/5 italic">
                  {selectedLead.call_results?.[0]?.summary || "No summary available."}
                </p>
              </div>

              {/* Full Transcript Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Full Neural Transcript</span>
                </div>
                <div className="bg-black/60 rounded-3xl p-6 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-300 h-96 overflow-y-auto">
                   {selectedLead.call_results?.[0]?.transcript ? (
                     selectedLead.call_results[0].transcript.split('\n').map((line: string, i: number) => (
                       <p key={i} className={`mb-4 ${line.toLowerCase().startsWith('ai') ? 'text-cyan-400' : 'text-slate-400'}`}>
                         {line}
                       </p>
                     ))
                   ) : (
                     <div className="text-slate-700 italic">No transcript data found.</div>
                   )}
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="p-8 border-t border-white/5 bg-[#000d1a] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${selectedLead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Status: {selectedLead.call_results?.[0]?.sentiment_score || 'Neutral'}
                </span>
              </div>
              <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-white transition-all">
                Download PDF Report
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
