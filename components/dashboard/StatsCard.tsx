'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Intelligence Tile: High-Impact KPI Visualization
 */

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  icon: LucideIcon;
  variant?: 'blue' | 'green' | 'purple' | 'gold' | 'neutral';
  trend?: 'up' | 'down' | 'neutral';
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  variant = 'neutral',
  trend = 'neutral',
}: StatsCardProps) {
  
  // Mapping variants to the Hub's Elite color palette
  const variants = {
    blue: { bg: 'bg-blue-500/10', icon: 'text-blue-500', border: 'border-blue-500/20' },
    green: { bg: 'bg-green-500/10', icon: 'text-green-500', border: 'border-green-500/20' },
    purple: { bg: 'bg-purple-500/10', icon: 'text-purple-500', border: 'border-purple-500/20' },
    gold: { bg: 'bg-yellow-500/10', icon: 'text-yellow-500', border: 'border-yellow-500/20' },
    neutral: { bg: 'bg-zinc-900', icon: 'text-zinc-500', border: 'border-zinc-800' }
  };

  const current = variants[variant];

  return (
    <div className={`relative bg-zinc-950 border ${current.border} rounded-[2rem] p-8 shadow-2xl group hover:scale-[1.02] transition-all duration-300`}>
      {/* Visual Accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${current.bg} blur-[60px] opacity-20 rounded-full -translate-y-1/2 translate-x-1/2`} />

      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl ${current.bg} ${current.icon}`}>
            <Icon className="w-5 h-5" />
          </div>
          
          {change && (
            <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
              trend === 'up' ? 'bg-green-500/10 text-green-500' : 
              trend === 'down' ? 'bg-red-500/10 text-red-500' : 'bg-zinc-900 text-zinc-500'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              {change}
            </div>
          )}
        </div>

        <div>
          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-1">
            {title}
          </p>
          <p className="text-3xl font-black italic tracking-tighter text-white uppercase">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
