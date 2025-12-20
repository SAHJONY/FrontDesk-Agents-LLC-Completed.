import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export default function CallFeed() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    // Fetch initial calls
    const fetchCalls = async () => {
      const { data } = await supabase
        .from('call_results')
        .select('*')
        .order('created_at', { ascending: false });
      setCalls(data || []);
    };

    fetchCalls();

    // Subscribe to NEW calls in real-time
    const channel = supabase
      .channel('realtime_calls')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'call_results' }, 
      (payload) => {
        setCalls((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Live Conversation Intelligence (Cat 4.1)</h2>
      {calls.map((call) => (
        <div key={call.id} className="border-b border-gray-700 py-3">
          <p className="text-green-400 font-mono">Status: {call.was_completed ? '✅ Completed' : '📞 In Progress'}</p>
          <p className="italic text-gray-300">"{call.summary}"</p>
          <details className="mt-2 text-sm text-gray-500">
            <summary>View Transcript</summary>
            <p className="mt-2 bg-black p-2 rounded">{call.transcript}</p>
          </details>
        </div>
      ))}
    </div>
  );
}
