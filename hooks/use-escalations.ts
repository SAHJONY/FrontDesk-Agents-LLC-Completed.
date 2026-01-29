"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useEscalations() {
  const [escalations, setEscalations] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // 1. Initial Fetch
    const fetchEscalations = async () => {
      const { data } = await supabase
        .from('workforce_tasks')
        .select(`
          *,
          customers (full_name, lead_score)
        `)
        .eq('status', 'pending')
        .eq('type', 'transfer')
        .order('created_at', { ascending: false });
      
      if (data) setEscalations(data);
    };

    fetchEscalations();

    // 2. Realtime Subscription
    const channel = supabase
      .channel('escalation-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'workforce_tasks', filter: 'type=eq.transfer' }, 
        (payload) => {
          fetchEscalations(); // Refresh list on change
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { escalations };
}
