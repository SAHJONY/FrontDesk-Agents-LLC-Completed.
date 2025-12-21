'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Headset, 
  Search, 
  Play, 
  X, 
  Volume2, 
  Zap, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  Headphones,
  Sparkles,
  Download
} from 'lucide-react';

export default function ClientPortal() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  
  // Detail View State
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
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-10 h-10 text-cyan-500 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Decrypting Portal...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 relative pb-32">
      
      {/* --- BRANDED HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] border border-white/20">
              <Sparkles className="w-8 h-8 text-[#000814]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#000814]" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">
                FrontDesk <span className="text-cyan-500 text-lg not-italic opacity-80">/ Intelligence</span>
              </h1>
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[7px] font-black text-slate-500 uppercase tracking-[0.2em]">Partner Access</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <ShieldCheck className="w-3 h-3 text-cyan-500/50" /> Secure Agency Uplink Active
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
          <input 
            type="text" placeholder="Search Intelligence Database..." value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-white placeholder:text-slate-700 focus:border-cyan-500/30 transition-all outline-none"
          />
        </div>
      </div>

      {/* --- ROI STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Prospects', val: leads.length, icon: Users, color: 'text-cyan-500' },
          { label: 'Qualified Leads', val: leads.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length, icon: Zap, color: 'text-emerald-500' },
          { label: 'System Accuracy', val: '98.4%', icon: Activity, color: 'text-purple-500' }
        ].map((stat) => (
          <div key={stat.label} className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px] hover:border-white/10 transition-all">
            <stat.icon className={`w-5 h-5 ${stat.color} mb-6`} />
            <p className="text-3xl font-black text-white italic tracking-tighter">{stat.val}</p>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</h3>
          </div>
        ))}
      </div>

      {/* --- RESULTS TABLE --- */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Entity Signature</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">AI Intelligence Summary</th>
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
                  <div className="font-black text-white uppercase italic group-hover:text-cyan-400 transition-colors">{lead.full_name}</div>
                  <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase font-mono tracking-widest">{lead.phone_number}</div>
                </td>
                <td className="px-10 py-8 max-w-md">
                  <p className="text-[11px] text-slate-400 italic line-clamp-1 leading-relaxed">
                    {lead.call_results?.[0]?.summary || "Analyzing interaction data stream..."}
                  </p>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex items-center justify-end gap-4">
                    {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' && (
                      <div className="px-2 py-1 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <Zap className="w-3 h-3 text-emerald-500 fill-current" />
                      </div>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-cyan-500 transition-colors" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- DETAIL SLIDE-OVER --- */}
      {isDetailOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsDetailOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#000814] border-l border-cyan-500/20 h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
            
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#000d1a]">
              <div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{selectedLead.full_name}</h2>
                <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest">{selectedLead.phone_number}</p>
              </div>
              <button onClick={() => setIsDetailOpen(false)} className="p-3 bg-white/5 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Audio Playback */}
              <div className="bg-black/60 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-6">
                  <Headphones className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Audio Uplink</span>
                </div>
                {selectedLead.call_results?.[0]?.recording_url ? (
                  <audio controls className="w-full accent-cyan-500 h-10" src={selectedLead.call_results[0].recording_url} />
                ) : (
                  <div className="py-6 text-center text-[10px] text-slate-700 font-black uppercase tracking-[0.3em] border-2 border-dashed border-white/5 rounded-2xl">Audio Sync Pending</div>
                )}
              </div>

              {/* AI Transcript */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Full Conversation Transcript</span>
                </div>
                <div className="bg-[#000d1a] rounded-[32px] p-8 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-400 h-96 overflow-y-auto space-y-6">
                   {selectedLead.call_results?.[0]?.transcript ? (
                     selectedLead.call_results[0].transcript.split('\n').map((line: string, i: number) => (
                       <div key={i} className={`flex gap-4 ${line.toLowerCase().startsWith('ai') ? 'text-cyan-400' : 'text-slate-500'}`}>
                         <span className="opacity-20 shrink-0">[{i.toString().padStart(2, '0')}]</span>
                         <p>{line}</p>
                       </div>
                     ))
                   ) : (
                     <div className="text-slate-800 italic">No transcript packets found for this session.</div>
                   )}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 bg-[#000d1a] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${selectedLead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`} />
                <span className="text-[10px] font-black text-white uppercase tracking-widest italic">Signal: {selectedLead.call_results?.[0]?.sentiment_score || 'Neutral'}</span>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-[#000814] rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                <Download className="w-4 h-4" /> Export Intel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-50">
        <div className="flex items-center gap-4">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-600">Secure Node Architecture</p>
          <div className="h-px w-8 bg-slate-800" />
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-500/50">FrontDesk Agents v4.2</span>
        </div>
      </footer>
    </div>
  );
}
