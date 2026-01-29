import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useTranscriptStream() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel('transcript-live')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'workforce_tasks' }, 
        (payload) => {
          if (payload.new.resolution_summary) {
            setLogs((prev) => [{
              id: payload.new.id,
              agent: payload.new.agent_id,
              text: payload.new.resolution_summary,
              timestamp: new Date().toLocaleTimeString()
            }, ...prev].slice(0, 10)); // Keep only last 10 logs
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { logs };
}
