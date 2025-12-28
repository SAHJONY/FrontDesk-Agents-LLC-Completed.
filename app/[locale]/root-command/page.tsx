'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Activity, Users, Zap, Globe, ShieldAlert } from 'lucide-react';

export default function RootCommand() {
  const [stats, setStats] = useState({ activeNodes: 0, totalMinutes: 0, revenue: 0 });
  const [isAuthorized, setIsAuthorized] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === 'sahjonyllc@outlook.com') {
        setIsAuthorized(true);
        fetchStats();
      } else {
        window.location.href = '/';
      }
    }
    checkAuth();
  }, []);

  async function fetchStats() {
    const { data: profiles } = await supabase.from('profiles').select('tier, neural_minutes');
    if (profiles) {
      const totalMin = profiles.reduce((acc, curr) => acc + (curr.neural_minutes || 0), 0);
      const active = profiles.filter(p => p.neural_minutes > 0).length;
      setStats({ activeNodes: active, totalMinutes: totalMin, revenue: active * 399 }); // Base calc
    }
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#020305] text-white p-12 font-mono">
      <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Root Command</h1>
          <p className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2">Empire Surveillance // AEGIS v2.1.0</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-[9px] uppercase tracking-widest">System Status</p>
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-xs font-black">ALL NODES OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users />} label="Active Nodes" value={stats.activeNodes} />
        <StatCard icon={<Zap />} label="Neural Load (Min)" value={stats.totalMinutes} />
        <StatCard icon={<Globe />} label="Projected MRR" value={`$${stats.revenue}`} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-8">
      <div className="text-slate-500 mb-4">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-black italic">{value}</p>
    </div>
  );
}
