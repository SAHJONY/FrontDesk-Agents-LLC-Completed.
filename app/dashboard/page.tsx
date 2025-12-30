'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Global Command Center: Revenue, Telephony, & Legal Telemetry
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import NodeStatus from '@/components/dashboard/NodeStatus';
import RevenueChart from '@/components/dashboard/RevenueChart';
import CallActivityFeed from '@/components/dashboard/CallActivityFeed';
import StatsCard from '@/components/dashboard/StatsCard';
import { Phone, Users, Zap, DollarSign, Gavel, ArrowUpRight } from 'lucide-react';
import { LegalComplianceBadge } from '@/components/legal/LegalComplianceBadge';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalCalls: 0,
    qualifiedLeads: 0,
    activeNodes: 0,
    revenue: 0,
    legalRecovery: 0,
    conversionRate: "0"
  });

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchDashboardStats();
  }, [user]);

  async function fetchDashboardStats() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/stats?tenant_id=${user?.tenant.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('[CRITICAL] Dashboard Sync Error:', error);
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Zap className="w-12 h-12 text-blue-500 animate-pulse mb-4" />
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.5em]">Synchronizing PDX1 Node...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header: Workforce Identity */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-zinc-900 pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <LegalComplianceBadge />
               <span className="text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Live Workforce Status</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none">
              Control <span className="text-zinc-500">Node</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-3 uppercase font-bold tracking-[0.2em]">
              {user.tenant.companyName} // {user.tenant.tier} tier // {user.tenant.currencyCode} market
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800">
             <div className="px-6 py-2">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Efficiency</p>
                <p className="text-xl font-black italic">{stats.conversionRate}%</p>
             </div>
             <div className="w-px h-8 bg-zinc-800" />
             <div className="px-6 py-2">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Legal Recovered</p>
                <p className="text-xl font-black italic text-blue-500">${stats.legalRecovery.toLocaleString()}</p>
             </div>
          </div>
        </div>

        {/* Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard
            title="Telephony Volume"
            value={stats.totalCalls}
            icon={Phone}
            variant="blue"
          />
          <StatsCard
            title="Revenue Conversions"
            value={stats.qualifiedLeads}
            icon={Users}
            variant="green"
          />
          <StatsCard
            title="Agentic Fleet"
            value={stats.activeNodes}
            icon={Zap}
            variant="purple"
          />
          <StatsCard
            title="Gross Revenue"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={DollarSign}
            variant="gold"
            trend={stats.revenue > 0 ? "+15%" : "0%"}
          />
        </div>

        {/* Operational Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-8">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Revenue Recovery Stream</h3>
                  <button className="text-[10px] font-black uppercase text-blue-500 flex items-center gap-2">View Audit <ArrowUpRight className="w-3 h-3"/></button>
               </div>
               <RevenueChart tenantId={user.tenant.id} tier={user.tenant.tier} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <CallActivityFeed tenantId={user.tenant.id} />
               <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-6 flex items-center gap-2"><Gavel className="w-4 h-4 text-blue-500" /> Recent Legal Merits</h3>
                  {/* Miniature view of the Legal Risk Ledger */}
                  <div className="space-y-4 opacity-50 italic text-[11px] text-zinc-400">
                     <p>{">"} Awaiting next high-stakes lead for merits-first analysis...</p>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="xl:col-span-1">
            <NodeStatus tenantId={user.tenant.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
