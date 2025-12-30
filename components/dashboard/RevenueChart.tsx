'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Revenue Analytics: Subscription Yield & Legal Success Fees
 */

import React, { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  defs,
  linearGradient
} from 'recharts';
import { TrendingUp, DollarSign, Zap, Gavel } from 'lucide-react';

export default function RevenueChart({ tenantId, tier }: { tenantId: string; tier: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, [tenantId]);

  async function fetchRevenueData() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/revenue?tenant_id=${tenantId}&days=30`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      }
    } catch (error) {
      console.error('[FINANCE] Sync failure:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden h-full">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Financial Yield</h3>
          <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-widest">Revenue Recovery Stream</p>
        </div>
        
        {tier === 'elite' && (
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <Gavel className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
              Success Fee Ledger Active (15%)
            </span>
          </div>
        )}
      </div>

      

      {/* Chart Terminal */}
      <div className="h-[300px] w-full">
        {loading ? (
          <div className="h-full w-full flex items-center justify-center bg-zinc-900/20 rounded-3xl animate-pulse">
            <Zap className="w-8 h-8 text-zinc-800 animate-bounce" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFee" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#3f3f46" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(str) => new Date(str).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#3f3f46" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                itemStyle={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                labelStyle={{ color: '#71717a', fontSize: '9px', marginBottom: '4px' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
              {tier === 'elite' && (
                <Area
                  type="monotone"
                  dataKey="successFees"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="8 8"
                  fillOpacity={1}
                  fill="url(#colorFee)"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-zinc-900 pt-6">
        <div className="flex gap-6">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Base Recovery</span>
           </div>
           {tier === 'elite' && (
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Merit Success Fees</span>
             </div>
           )}
        </div>
        <button className="text-[10px] font-black uppercase text-zinc-400 hover:text-white transition-colors">
          Download CSV Audit
        </button>
      </div>
    </div>
  );
}
