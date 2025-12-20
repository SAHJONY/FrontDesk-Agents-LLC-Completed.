'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function UsageTracker() {
  const [usage, setUsage] = useState({ used: 0, limit: 100, plan: 'essential' });
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUsage() {
      const { data, error } = await supabase
        .from('BusinessConfig')
        .select('minutesUsed, minuteLimit, planType')
        .single();

      if (data && !error) {
        setUsage({
          used: data.minutesUsed,
          limit: data.minuteLimit,
          plan: data.planType,
        });
      }
      setLoading(false);
    }
    getUsage();
  }, [supabase]);

  if (loading) return <div className="animate-pulse h-20 bg-gray-100 rounded-lg"></div>;

  const percentage = Math.min(Math.round((usage.used / usage.limit) * 100), 100);
  const isOverLimit = usage.used >= usage.limit;

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          AI Agent Minutes
        </h3>
        <span className="px-2 py-1 text-xs font-bold rounded bg-blue-100 text-blue-700 uppercase">
          {usage.plan}
        </span>
      </div>

      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between text-sm">
          <span className="font-medium text-gray-600">
            {usage.used} / {usage.limit} mins
          </span>
          <span className={`font-bold ${isOverLimit ? 'text-red-500' : 'text-blue-600'}`}>
            {percentage}%
          </span>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: `${percentage}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
              isOverLimit ? 'bg-red-500' : 'bg-blue-600'
            }`}
          ></div>
        </div>
      </div>

      {isOverLimit && (
        <p className="text-xs text-red-500 font-medium">
          Limit reached! Upgrade your plan to keep your agents online.
        </p>
      )}
    </div>
  );
}
