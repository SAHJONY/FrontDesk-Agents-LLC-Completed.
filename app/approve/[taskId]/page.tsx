'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ApprovalPage({ params }: { params: { taskId: string } }) {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

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
    await supabase
      .from('agent_intelligence')
      .update({ 
        status: approved ? 'approved' : 'rejected',
        human_override: true 
      })
      .eq('id', params.taskId);
    
    alert(approved ? "Action Authorized" : "Action Blocked");
  };

  if (loading) return <div className="p-20 text-white font-mono">Decrypting task data...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto border border-gray-800 rounded-2xl p-8 bg-zinc-950">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-amber-500">Oversight Required</h1>
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-xs font-mono">
            ID: {params.taskId}
          </span>
        </div>

        <div className="mb-8">
          <label className="text-gray-500 text-xs uppercase tracking-widest">Agent Logic Trace</label>
          <p className="mt-2 text-lg text-gray-200">{task?.description || "Awaiting agent context..."}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-xs text-gray-500">Confidence Score</p>
            <p className="text-2xl font-bold text-red-400">72%</p>
          </div>
          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
            <p className="text-xs text-gray-500">Security Check</p>
            <p className="text-2xl font-bold text-emerald-400">PASSED</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => handleDecision(true)}
            className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all"
          >
            Authorize Action
          </button>
          <button 
            onClick={() => handleDecision(false)}
            className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition-all"
          >
            Block & Log
          </button>
        </div>
      </div>
    </div>
  );
              }
