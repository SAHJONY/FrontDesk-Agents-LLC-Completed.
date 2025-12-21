'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  PhoneIncoming, 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight,
  PlayCircle,
  FileText,
  Activity
} from 'lucide-react';

export default function CallHistoryPage() {
  const supabase = createClient();
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCalls();
  }, []);

  async function fetchCalls() {
    const { data } = await supabase
      .from('call_results')
      .select('*, leads(full_name, phone_number)')
      .order('created_at', { ascending: false });
    
    if (data) setCalls(data);
    setLoading(false);
  }

  const filteredCalls = calls.filter(call => 
    call.leads?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Area */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <Activity className="w-5 h-5 text-cyan-500" />
              </div>
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Transmission Logs</h1>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Historical Intelligence Archive</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input 
              type="text" 
              placeholder="Search transcripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#000d1a] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium focus:border-cyan-500/30 outline-none transition-all"
            />
          </div>
        </div>

        {/* Call List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center animate-pulse text-[10px] font-black uppercase tracking-widest text-cyan-500/40">Accessing Archives...</div>
          ) : filteredCalls.map((call) => (
            <div key={call.id} className="group bg-[#000d1a] border border-white/5 hover:border-cyan-500/20 rounded-[32px] p-6 transition-all duration-300">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                
                {/* Lead Info */}
                <div className="flex items-start gap-4 lg:w-1/4">
                  <div className={`p-4 rounded-2xl ${call.sentiment_score === 'Hot 🔥' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-900 text-slate-500'}`}>
                    <PhoneIncoming className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-white uppercase italic tracking-tighter group-hover:text-cyan-400 transition-colors">
                      {call.leads?.full_name || 'Unknown Entity'}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                      <Calendar className="w-3 h-3" /> {new Date(call.created_at).toLocaleDateString()}
                      <Clock className="w-3 h-3 ml-2" /> {Math.round(call.call_duration_seconds / 60)}m {call.call_duration_seconds % 60}s
                    </div>
                  </div>
                </div>

                {/* AI Summary Section */}
                <div className="flex-1 bg-black/40 rounded-[24px] p-5 border border-white/5 relative">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-3 h-3 text-cyan-500" />
                    <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">AI Intelligence Summary</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-400 italic">
                    {call.summary || "No summary available for this transmission."}
                  </p>
                  
                  {call.sentiment_score === 'Hot 🔥' && (
                    <div className="absolute top-4 right-4 h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                  )}
                </div>

                {/* Action Button */}
                <div className="flex items-center lg:justify-end">
                   <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-all">
                      View Transcript
                      <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}

          {!loading && filteredCalls.length === 0 && (
            <div className="py-20 text-center border border-dashed border-white/5 rounded-[40px]">
               <p className="text-xs font-bold text-slate-600 uppercase tracking-widest italic">No data found in this sector</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
