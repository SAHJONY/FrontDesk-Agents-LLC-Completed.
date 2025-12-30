'use client';

// FrontDesk Agents: Global Revenue Workforce
// Dashboard Statistics Component

import React from 'react';
// Note: Ensure StatsCard exists in the same folder
import StatsCard from './StatsCard'; 
import { Phone, Users, TrendingUp, DollarSign } from 'lucide-react';

interface DashboardStatsProps {
  // Making this optional with '?' so the dashboard build doesn't crash
  stats?: {
    totalCalls: number;
    qualifiedLeads: number;
    activeNodes: number;
    revenue: number;
  };
  tenantId?: string;
}

export default function DashboardStats({ stats, tenantId }: DashboardStatsProps) {
  // Provide fallback values if stats aren't loaded yet
  const displayStats = stats || {
    totalCalls: 0,
    qualifiedLeads: 0,
    activeNodes: 0,
    revenue: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Calls"
        value={displayStats.totalCalls}
        change={12}
        trend="up"
        icon={Phone}
        iconColor="text-blue-600"
      />
      <StatsCard
        title="Qualified Leads"
        value={displayStats.qualifiedLeads}
        change={8}
        trend="up"
        icon={Users}
        iconColor="text-green-600"
      />
      <StatsCard
        title="Active Nodes"
        value={displayStats.activeNodes}
        icon={TrendingUp}
        iconColor="text-purple-600"
      />
      <StatsCard
        title="Revenue"
        value={`$${displayStats.revenue.toLocaleString()}`}
        change={15}
        trend="up"
        icon={DollarSign}
        iconColor="text-yellow-600"
      />
    </div>
  );
}
