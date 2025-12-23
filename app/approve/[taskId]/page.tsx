'use client';

import { useEffect, useState } from 'react';
// DEPRECATED REMOVED: import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/utils/supabase/client'; // NEW: SSR Standard
import { ShieldAlert, Terminal, Lock, Unlock } from 'lucide-react';

export default function ApprovalPage({ params }: { params: { taskId: string } }) {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const supabase = createClient(); // UPDATED: Using the new SSR Client

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await supabase
        .from('agent_intelligence')
        .select('*')
        .eq('id', params.taskId)
        .single();
      setTask(data);
      setLoading(false);
    };
    fetchTask();
  }, [params.taskId, supabase]);

  const handleDecision = async (approved: boolean) => {
    setProcessing(true);
    const { error } = await supabase
      .from('agent_intelligence')
      .update({ 
        status: approved ? 'approved' : 'rejected',
        human_override: true 
      })
      .eq('id', params.taskId);
    
    if (!error) {
      setTask({ ...task, status: approved ? 'approved' : 'rejected' });
      alert(approved ? "Neural Action Authorized" : "Neural Action Blocked");
    }
    setProcessing(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500"></div>
      <p className="text-amber-500 font-mono text-xs uppercase tracking-[0.3em]">Decrypting Task Trace...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto border border-white/5 rounded-[40px] p-12 bg-zinc-950 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px]" />
        
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <h1 className="text-xl font-black italic uppercase tracking-tighter">Oversight Required</h1>
            </div>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sovereign OS • Human-in-the-loop Protocol</p>
          </div>
          <span className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-mono text-zinc-400">
            SIG: {params.taskId.slice(0, 8)}...
          </span>
        </div>

        <div className="mb-10 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
          <label className="text-amber-500/50 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 mb-4">
            <Terminal className="w-3 h-3" /> Agent Logic Trace
          </label>
          <p className="text-lg text-gray-200 leading-relaxed font-medium">
            {task?.description || "Awaiting neural context packet..."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Confidence Score</p>
            <p className="text-3xl font-black italic text-red-500">72%</p>
          </div>
          <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Security Status</p>
            <p className="text-3xl font-black italic text-emerald-500">ENFORCED</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            disabled={processing || task?.status === 'approved'}
            onClick={() => handleDecision(true)}
            className="group flex-1 py-5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/20 disabled:text-emerald-900 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3"
          >
            <Unlock className="w-4 h-4" />
            {task?.status === 'approved' ? 'Action Authorized' : 'Authorize Action'}
          </button>
          <button 
            disabled={processing || task?.status === 'rejected'}
            onClick={() => handleDecision(false)}
            className="flex-1 py-5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-20 rounded-[24px] font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 border border-white/5"
          >
            <Lock className="w-4 h-4" />
            Block & Log
          </button>
        </div>
      </div>
    </div>
  );
      }
