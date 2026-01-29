import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Use the central client
import type { AIAgent } from '@/lib/supabase';

export function useRealtimeWorkforce() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [metrics, setMetrics] = useState({
    activeAgents: 0,
    autonomyLevel: 0,
    learningVelocity: 0.85, // Performance constant
    totalCallsToday: 0
  });
  const [latestCall, setLatestCall] = useState<any>(null);

  useEffect(() => {
    // 1. Initial State Sync
    const syncInfrastructure = async () => {
      // Fetch Agents
      const { data: agentData } = await supabase
        .from('ai_agents')
        .select('*')
        .order('last_active', { ascending: false });
      
      // Fetch Call Count for Metrics
      const { count } = await supabase
        .from('calls')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date().toISOString().split('T')[0]);

      if (agentData) setAgents(agentData);
      
      const activeCount = agentData?.filter(a => a.status === 'busy' || a.status === 'ready').length || 0;
      setMetrics(prev => ({
        ...prev,
        activeAgents: activeCount,
        totalCallsToday: count || 0,
        autonomyLevel: activeCount > 0 ? 94 : 0
      }));
    };

    syncInfrastructure();

    // 2. Realtime Pipeline: Listen for Call Inserts (The Live Feed)
    const callChannel = supabase
      .channel('live-telephony')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'calls' }, 
        (payload) => {
          setLatestCall(payload.new);
          syncInfrastructure(); // Refresh counts
        }
      )
      .subscribe();

    // 3. Realtime Pipeline: Listen for Agent Status Changes (The Pulse)
    const agentChannel = supabase
      .channel('neural-status')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'ai_agents' }, 
        () => syncInfrastructure()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(callChannel);
      supabase.removeChannel(agentChannel);
    };
  }, []);

  return { agents, metrics, latestCall };
}
