import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useRealtimeWorkforce() {
  const [metrics, setMetrics] = useState<any>(null);
  const [latestTask, setLatestTask] = useState<any>(null);

  useEffect(() => {
    // 1. Fetch initial state
    const fetchInitial = async () => {
      const res = await fetch('/api/workforce?action=metrics');
      const data = await res.json();
      setMetrics(data.data);
    };
    fetchInitial();

    // 2. Subscribe to Task Inserts (Live Feed)
    const taskChannel = supabase
      .channel('live-tasks')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'communication_tasks' }, 
      (payload) => {
        setLatestTask(payload.new);
        // Refresh metrics when a new task is finished
        fetchInitial();
      })
      .subscribe();

    // 3. Subscribe to Agent Updates (Status Lights)
    const agentChannel = supabase
      .channel('agent-status')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'workforce_agents' }, 
      () => fetchInitial())
      .subscribe();

    return () => {
      supabase.removeChannel(taskChannel);
      supabase.removeChannel(agentChannel);
    };
  }, []);

  return { metrics, latestTask };
}
