"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useRealtimeWorkforce } from '@/hooks/use-realtime-workforce';

export function RevenueTicker({ initialValue = 0 }) {
  const { latestCall } = useRealtimeWorkforce();
  const [count, setCount] = useState(initialValue);
  
  // Spring physics for that "8K" smooth animation
  const springValue = useSpring(count, { stiffness: 20, damping: 15 });
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })
  );

  useEffect(() => {
    // Logic: If a task is resolved, assume a base lead value (e.g., $150)
    // In production, you'd pull actual deal value from your 'customers' table
    if (latestCall?.status === 'resolved') {
      const leadValue = latestCall.sentiment === 'positive' ? 250 : 50;
      setCount(prev => prev + leadValue);
    }
  }, [latestCall]);

  return (
    <div className="relative group overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.03] p-6 transition-all hover:border-emerald-500/50">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 italic flex items-center gap-2">
          <TrendingUp className="w-3 h-3" /> Revenue Protected (Real-time)
        </p>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <motion.span className="text-5xl font-black tracking-tighter text-slate-50 italic">
          {displayValue}
        </motion.span>
      </div>

      <p className="mt-2 text-[10px] text-slate-500 font-medium uppercase italic">
        Neural attribution active • Node: pdx1-supabase
      </p>
    </div>
  );
}
