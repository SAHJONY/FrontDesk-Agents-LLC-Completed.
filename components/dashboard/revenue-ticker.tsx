"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function RevenueTicker() {
  const [count, setCount] = useState(0);
  
  // High-fidelity spring physics: stiffness for speed, damping for that "8K" smoothness
  const springValue = useSpring(0, { 
    stiffness: 40, 
    damping: 20,
    restDelta: 0.001 
  });
  
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })
  );

  useEffect(() => {
    // 1. Initial hydration from the completed_calls table
    const fetchTotal = async () => {
      const { data, error } = await supabase
        .from('completed_calls')
        .select('revenue_generated');
      
      if (data) {
        const total = data.reduce((acc, curr) => acc + Number(curr.revenue_generated), 0);
        setCount(total);
        springValue.set(total);
      }
    };

    fetchTotal();

    // 2. Real-time subscription for live increments
    const channel = supabase
      .channel('revenue-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'completed_calls' }, 
        (payload) => {
          const newAmount = Number(payload.new.revenue_generated);
          setCount(prev => {
            const next = prev + newAmount;
            springValue.set(next);
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [springValue]);

  return (
    <div className="relative group overflow-hidden rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.03] p-6 transition-all hover:border-emerald-500/50">
      {/* Background Glow Effect */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all" />
      
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 italic flex items-center gap-2">
          <TrendingUp className="w-3 h-3 animate-bounce" /> 
          Global Revenue Stream (Live)
        </p>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" 
              style={{ animationDelay: `${i * 0.2}s` }} 
            />
          ))}
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 relative z-10">
        <motion.span className="text-5xl font-black tracking-tighter text-slate-50 italic">
          {displayValue}
        </motion.span>
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-[10px] text-slate-500 font-medium uppercase italic">
          Neural attribution active • Node: pdx1-supabase
        </p>
        <div className="text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/20 text-emerald-500 font-bold bg-emerald-500/5">
          LIVE SYNC
        </div>
      </div>
    </div>
  );
}
