'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // NEW: SSR Standard
import { Activity, AlertTriangle, Zap } from 'lucide-react';

export const UsageTracker = () => { // Named export to match your PaymentSuccess import
  const [usage, setUsage] = useState({ used: 0, limit: 100, plan: 'Initializing...' });
  const [loading, setLoading] = useState(true);
  const supabase = createClient(); // UPDATED

  useEffect(() => {
    async function getUsage() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('BusinessConfig')
        .select('minutesUsed, minuteLimit, planType')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setUsage({
          used: data.minutesUsed || 0,
          limit: data.minuteLimit || 1000,
          plan: data.planType || 'Standard',
        });
      }
      setLoading(false);
    }
    getUsage();
  }, [supabase]);

  if (loading) return (
    <div className="w-full h-24 bg-white/5 rounded-3xl animate-pulse border border-white/5" />
  );

  const percentage = Math.min(Math.round((usage.used / usage.limit) * 100), 100);
  const isOverLimit = usage.used >= usage.limit;

  return (
    <div className="w-full group">
      <div className="flex justify-between items-end mb-6">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <Activity className={`w-3 h-3 ${isOverLimit ? 'text-red-500' : 'text-cyan-500'}`} />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Neural Bandwidth
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white italic tracking-tighter">
              {usage.used.toLocaleString()}
            </span>
            <span className="text-slate-600 text-xs font-bold uppercase">
              / {usage.limit.toLocaleString()} Min
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`text-xs font-black italic uppercase ${isOverLimit ? 'text-red-500' : 'text-cyan-500'}`}>
            {percentage}% Capacity
          </span>
          <div className="flex items-center gap-1 justify-end mt-1">
            <Zap className="w-3 h-3 text-amber-500" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">
              Plan: {usage.plan}
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        {/* Animated Progress Bar */}
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full transition-all duration-1000 ease-out relative ${
            isOverLimit ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-600 to-blue-500'
          }`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {isOverLimit && (
        <div className="mt-4 flex items-center gap-2 text-red-500">
          <AlertTriangle className="w-3 h-3" />
          <p className="text-[9px] font-black uppercase tracking-widest">
            Bandwidth Exhausted. Agents in standby mode.
          </p>
        </div>
      )}
    </div>
  );
};
