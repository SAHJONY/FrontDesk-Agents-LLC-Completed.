import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useRevenueTicker() {
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    // 1. Fetch initial total
    const fetchInitialRevenue = async () => {
      const { data } = await supabase
        .from('completed_calls')
        .select('revenue_generated');
      
      const sum = data?.reduce((acc, curr) => acc + Number(curr.revenue_generated), 0) || 0;
      setTotalRevenue(sum);
    };

    fetchInitialRevenue();

    // 2. Subscribe to new sales in real-time
    const channel = supabase
      .channel('live-revenue')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'completed_calls' }, 
        (payload) => {
          const newAmount = Number(payload.new.revenue_generated);
          setTotalRevenue((prev) => prev + newAmount);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return totalRevenue;
}
