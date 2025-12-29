'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';
import { CallFeed } from '@/components/dashboard/CallFeed';
import { NodeStatus } from '@/components/dashboard/NodeStatus';
import { Globe, TrendingUp, Zap, DollarSign } from 'lucide-react';

/**
 * FRONTDESK AGENTS: AUTONOMOUS COMMAND CENTER
 * * Built for the Western Corridor Primary Operational Zone (pdx1).
 * * Integrates Regional Multipliers and Tier-based RL metrics.
 */

export default function DashboardPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFleetData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('tenants')
          .select('*')
          .single();
        setTenant(data);
      }
      setLoading(false);
    }
    getFleetData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter">FRONTDESK AGENTS</h1>
          <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">
            Autonomous Revenue Workforce // v2.2.0
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
            <span className="text-zinc-500 text-[10px] block uppercase">Regional Equity</span>
            <span className="text-white font-bold">{tenant?.regional_multiplier}x Multiplier</span>
          </div>
        </div>
      </header>

      {/* Top Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <NodeStatus tier={tenant?.tier || 'basic'} />
        
        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <Globe className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold">Market Zone</span>
          </div>
          <p className="text-2xl font-bold">{tenant?.country_code || 'US'}</p>
        </div>

        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold">RL Efficiency</span>
          </div>
          <p className="text-2xl font-bold text-green-400">98.4%</p>
        </div>

        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] uppercase font-bold">Base Tier Price</span>
          </div>
          <p className="text-2xl font-bold">${tenant?.tier === 'elite' ? '1,499' : '199'}</p>
        </div>
      </div>

      {/* Main Agentic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CallFeed />
        </div>
        
        <div className="space-y-8">
          {/* Revenue Recovery Logic [cite: 2025-12-28] */}
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-zinc-800">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-blue-500" />
              Performance Yield
            </h3>
            {tenant?.tier === 'elite' ? (
              <div>
                <p className="text-3xl font-black text-blue-500">15.0%</p>
                <p className="text-xs text-zinc-500 mt-2">
                  Elite recovery agents are currently optimizing your yield across all active nodes.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-zinc-500 text-sm italic">Upgrade to Elite to activate Performance Recovery Yield.</p>
                <button className="mt-4 w-full py-2 bg-white text-black text-xs font-bold rounded-lg">
                  Upgrade to $1,499
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
                  }
