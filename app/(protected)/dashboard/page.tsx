'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Adjust path based on your project
// ... icons import ...

export default function DashboardPage() {
  const supabase = createClient();
  const [metrics, setMetrics] = useState({
    appointmentsBooked: 0,
    conversionRate: 0,
    callsProcessed: 0,
    totalDurationHours: 0,
    minutesUsed: 0,
    totalMinutes: 1000,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

      // 1. Fetch Call Results summary
      const { data: calls } = await supabase
        .from('call_results')
        .select('call_duration_seconds, was_completed')
        .eq('user_id', userId);

      // 2. Fetch Consumption
      const { data: logs } = await supabase
        .from('consumption_log')
        .select('minutes_used')
        .eq('user_id', userId);

      if (calls && logs) {
        const totalSecs = calls.reduce((acc, call) => acc + call.call_duration_seconds, 0);
        const totalMinsUsed = logs.reduce((acc, log) => acc + log.minutes_used, 0);
        const completedCalls = calls.filter(c => c.was_completed).length;

        setMetrics(prev => ({
          ...prev,
          callsProcessed: calls.length,
          totalDurationHours: parseFloat((totalSecs / 3600).toFixed(1)),
          minutesUsed: Math.round(totalMinsUsed),
          conversionRate: calls.length > 0 ? Math.round((completedCalls / calls.length) * 100) : 0
        }));
      }
    }

    fetchDashboardData();
  }, []);

  // ... rest of your UI code ...
