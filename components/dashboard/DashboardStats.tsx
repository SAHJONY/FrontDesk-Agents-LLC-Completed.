"use client";

import React from 'react';
import { 
  Users, 
  PhoneCall, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Component: Dashboard Stats
 * Logic: 1.0 Global Parity
 */

interface DashboardStatsProps {
  stats?: {
    totalCalls: number;
    activeAgents: number;
    revenue: number;
    growth: string;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  // Provide fallback values if stats aren't loaded yet
  const displayStats = stats || {
    totalCalls: 1284,
    activeAgents: 42,
    revenue: 14200,
    growth: "+12.5%"
  };

  const statCards = [
    { label: 'Total Volume', value: displayStats.totalCalls, icon: PhoneCall, color: 'text-blue-500' },
    { label: 'Active Workforce', value: displayStats.activeAgents, icon: Users, color: 'text-brand-cyan' },
    { label: 'Global Revenue', value: `$${displayStats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Market Growth', value: displayStats.growth, icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div key={index} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Live</span>
          </div>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mb-1">{stat.label}</p>
          <h4 className="text-2xl font-black text-white tracking-tight">{stat.value}</h4>
        </div>
      ))}
    </div>
  );
}
