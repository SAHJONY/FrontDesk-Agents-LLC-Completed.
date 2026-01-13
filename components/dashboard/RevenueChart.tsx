"use client";

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Zap } from 'lucide-react';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Component: Revenue Analytics
 * Infrastructure: Node PDX1
 * Logic: 1.0 Global Parity
 */

const data = [
  { name: 'Node A', revenue: 4000 },
  { name: 'Node B', revenue: 7500 },
  { name: 'Node C', revenue: 6000 },
  { name: 'Node D', revenue: 9000 },
  { name: 'Node E', revenue: 11000 },
  { name: 'Node F', revenue: 14200 },
];

export const RevenueChart = () => {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white">
              Revenue Velocity
            </h3>
          </div>
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            Global Market Parity 1.0
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-black text-white">$14,200</p>
          <div className="flex items-center gap-1 justify-end text-green-500">
            <TrendingUp className="w-3 h-3" />
            <span className="text-[10px] font-black">+12.5%</span>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
              itemStyle={{ color: '#00F0FF', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#00F0FF" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRev)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
