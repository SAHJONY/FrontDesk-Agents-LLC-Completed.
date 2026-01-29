import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Using your verified central client
import type { AIAgent } from '@/lib/supabase';

export function useRealtimeWorkforce() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [metrics, setMetrics] = useState({
    activeAgents: 0,
    autonomyLevel: 0,
    learningVelocity: 0.85, 
    totalCallsToday: 0
  });
  const [latestCall, setLatestCall] = useState<any>(null);

  useEffect(() => {
    // 1. Initial State Sync (The "Cold Start")
    const syncInfrastructure = async () => {
      // Fetch Agents from Postgres
      const { data: agentData } = await supabase
        .from('ai_agents')
        .select('*')
        .order('last_active', { ascending: false });
      
      // Fetch Today's Call Count
      const today = new Date().toISOString().split('T')[0];
      const { count } = await supabase
        .from('calls')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

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

    // 2. Realtime Pipeline: Listen for Live Telephony
    const callChannel = supabase
      .channel('live-telephony')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'calls' }, 
        (payload) => {
          setLatestCall(payload.new);
          syncInfrastructure(); // Refresh metrics automatically on new calls
        }
      )
      .subscribe();

    // 3. Realtime Pipeline: Listen for Agent Pulse Updates
    const agentChannel = supabase
      .channel('neural-status')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'ai_agents' }, 
        () => syncInfrastructure() // Re-sync entire workforce on any status change
      )
      .subscribe();

    return () => {
      supabase.removeChannel(callChannel);
      supabase.removeChannel(agentChannel);
    };
  }, []);

  return { agents, metrics, latestCall };
}
