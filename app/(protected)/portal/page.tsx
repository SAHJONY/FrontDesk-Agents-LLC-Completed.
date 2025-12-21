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
  ShieldCheck
} from 'lucide-react';

export default function ClientPortal() {
  const supabase = createClient();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [activeRecording, setActiveRecording] = useState<string | null>(null);

  useEffect(() => {
    fetchClientData();
    
    // Real-time listener: Updates the portal if an AI finishes a call while client is watching
    const channel = supabase
      .channel('client-view-sync')
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

  const hotLeadsCount = leads.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-10 h-10 text-cyan-500 animate-pulse" />
        <div className="text-[10px] font-black tracking-[0.4em] text-cyan-500 uppercase">Opening Secure Portal...</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 relative">
      
      {/* --- PORTAL HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Lead <span className="text-cyan-500">Intelligence Portal</span>
          </h1>
          <div className="flex items-center gap-2 mt-1">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">End-to-End Encrypted Client Access</p>
          </div>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <input 
            type="text"
            placeholder="Search prospect name or phone..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-[11px] font-medium text-white placeholder:text-slate-700 focus:border-cyan-500/30 transition-all outline-none"
          />
        </div>
      </div>

      {/* --- ROI METRICS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px] group hover:border-white/10 transition-all">
          <Users className="w-5 h-5 text-cyan-500 mb-6" />
          <p className="text-3xl font-black text-white italic tracking-tighter">{leads.length}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Total Entities Scanned</h3>
        </div>
        <div className="bg-[#000d1a] border border-emerald-500/10 p-8 rounded-[32px] shadow-[0_0_40px_rgba(16,185,129,0.03)] relative overflow-hidden">
          <TrendingUp className="w-5 h-5 text-emerald-500 mb-6" />
          <p className="text-3xl font-black text-emerald-500 italic tracking-tighter">{hotLeadsCount}</p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Hot Conversions</h3>
          <div className="absolute top-0 right-0 p-4">
            <Zap className="w-4 h-4 text-emerald-500/20 animate-pulse" />
          </div>
        </div>
        <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[32px]">
          <Activity className="w-5 h-5 text-purple-500 mb-6" />
          <p className="text-3xl font-black text-white italic tracking-tighter">
            {leads.length > 0 ? Math.round((hotLeadsCount / leads.length) * 100) : 0}%
          </p>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Intelligence Accuracy</h3>
        </div>
      </div>

      {/* --- RESULTS STREAM --- */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 bg-white/[0.01]">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Global Result Stream</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Prospect Entity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">AI Intelligence Summary</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Playback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.map((lead) => {
                const result = lead.call_results?.[0];
                return (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-all group">
                    <td className="px-10 py-8">
                      <div className="font-black text-white uppercase italic group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                      <div className="text-[9px] text-slate-600 font-bold mt-1 uppercase tracking-widest font-mono">{lead.phone_number}</div>
                    </td>
                    <td className="px-10 py-8 max-w-md">
                      <p className="text-[11px] text-slate-400 italic leading-relaxed">
                        {result?.summary || "Analyzing interaction data..."}
                      </p>
                      {result?.sentiment_score === 'Hot 🔥' && (
                        <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter rounded-full border border-emerald-500/20">
                          <Zap className="w-2.5 h-2.5 fill-current" /> High Conversion Intent
                        </div>
                      )}
                    </td>
                    <td className="px-10 py-8 text-right">
                      {result?.recording_url ? (
                        <button 
                          onClick={() => setActiveRecording(result.recording_url)}
                          className="p-4 bg-cyan-500/10 text-cyan-500 rounded-2xl hover:bg-cyan-500 hover:text-[#000814] transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-90"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                      ) : (
                        <span className="text-[8px] text-slate-800 font-black uppercase tracking-widest italic opacity-50">Pending Uplink</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- FLOATING TERMINAL AUDIO PLAYER --- */}
      {activeRecording && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[100] animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="bg-[#000d1a]/90 border border-cyan-500/30 rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Volume2 className="w-4 h-4 text-cyan-500" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic leading-none">Neural Audio Feed</h4>
                  <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mt-1 block">Live Playback Active</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveRecording(null)} 
                className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative group bg-black/50 p-6 rounded-2xl border border-white/5">
              <audio 
                autoPlay 
                controls 
                src={activeRecording} 
                className="w-full h-10 accent-cyan-500"
              />
              {/* Fake waveform visual effect */}
              <div className="flex items-center justify-center gap-1 mt-4 h-4 opacity-30">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-1 bg-cyan-500 animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 px-2">
               <p className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.2em]">Quality: Lossless Matrix</p>
               <p className="text-[8px] text-cyan-500/50 uppercase font-black tracking-[0.2em]">Secure Node: #42C9</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
