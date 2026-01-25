'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

export default function StatusDashboard() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data } = await supabase.from('daily_call_metrics').select('*');
      if (data) setMetrics(data);
    };
    fetchMetrics();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Activity className="text-blue-500" /> Platform Vital Signs
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Total Calls Today</p>
          <p className="text-2xl font-bold">{metrics[0]?.total_calls || 0}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Conversions</p>
          <p className="text-2xl font-bold">{metrics[0]?.successful_calls || 0}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-yellow-500">
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-2xl font-bold">
            {metrics[0] ? ((metrics[0].successful_calls / metrics[0].total_calls) * 100).toFixed(1) : 0}%
          </p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="h-64 w-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-sm font-semibold mb-4 uppercase text-gray-400">Call Volume (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="call_date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_calls" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
