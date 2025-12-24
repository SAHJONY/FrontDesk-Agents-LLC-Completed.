'use client';

import React from 'react';
import { Card, Title, AreaChart, Metric, Text, Flex, BadgeDelta, Grid, Icon } from '@tremor/react';
import { ShieldAlert, Zap, TrendingUp, Target, Activity } from 'lucide-react';

export default function AnalyticsView({ stats }: any) {
  // Use current stats or fall back to Houston-Surge simulation data
  const chartData = stats?.chartData || [
    { date: '08:00', Calls: 12, Bookings: 4 },
    { date: '12:00', Calls: 45, Bookings: 18 },
    { date: '16:00', Calls: 89, Bookings: 42 },
    { date: '20:00', Calls: 34, Bookings: 12 },
    { date: '00:00', Calls: 122, Bookings: 95 }, // Peak freeze surge
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* --- PHASE 1: TITAN METRIC TILES --- */}
      <Grid numItemsMd={2} numItemsLg={3} className="gap-8">
        
        {/* REVENUE PROTECTION CARD */}
        <Card className="bg-black/40 border-white/5 ring-0 backdrop-blur-xl rounded-[32px] p-8 group hover:border-green-500/30 transition-all duration-500">
          <Flex alignItems="start">
            <div className="space-y-1">
              <Text className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Revenue Protected</Text>
              <Metric className="text-4xl font-black italic text-white group-hover:text-green-400 transition-colors">
                ${stats?.estimatedRevenue?.toLocaleString() || '142,500'}
              </Metric>
            </div>
            <BadgeDelta deltaType="increase" className="bg-green-500/10 text-green-500 border-none rounded-full px-3 py-1 text-[10px] font-black italic">
              +18.4%
            </BadgeDelta>
          </Flex>
          <div className="mt-6 flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <Text className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Sovereign Capture Protocol Active</Text>
          </div>
        </Card>

        {/* NEURAL DISPATCH CARD */}
        <Card className="bg-black/40 border-white/5 ring-0 backdrop-blur-xl rounded-[32px] p-8 group hover:border-cyan-500/30 transition-all duration-500">
          <div className="space-y-1">
            <Text className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Interceptions</Text>
            <Metric className="text-4xl font-black italic text-white">{stats?.totalCalls || '1,842'}</Metric>
          </div>
          <Text className="mt-6 text-[9px] font-bold text-cyan-500 uppercase tracking-widest italic flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
            Zero Lost Signals Detected
          </Text>
        </Card>

        {/* AEGIS THREAT INTELLIGENCE */}
        <Card className="bg-red-500/5 border-red-500/10 ring-0 backdrop-blur-xl rounded-[32px] p-8 relative overflow-hidden group">
          <ShieldAlert className="absolute top-[-10px] right-[-10px] w-24 h-24 text-red-500 opacity-5 group-hover:opacity-20 transition-opacity" />
          <div className="space-y-1 relative z-10">
            <Text className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Threats Incinerated</Text>
            <Metric className="text-4xl font-black italic text-white">409</Metric>
          </div>
          <Text className="mt-6 text-[9px] font-bold text-red-500/50 uppercase tracking-widest italic font-mono">
            AEGIS_SHIELD: NOMINAL
          </Text>
        </Card>
      </Grid>

      {/* --- PHASE 2: HOLOGRAPHIC REVENUE FLOW --- */}
      <Card className="bg-black/40 border-white/5 ring-0 backdrop-blur-2xl rounded-[48px] p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <Title className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">
              Monetary <span className="text-cyan-500">Velocity</span>
            </Title>
            <Text className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Historical Capture Manifest</Text>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <Activity className="w-3 h-3 text-cyan-500" />
                <span className="text-[8px] font-black uppercase tracking-widest">HTX-Surge Enabled</span>
             </div>
          </div>
        </div>

        <AreaChart
          className="h-80 mt-4"
          data={chartData}
          index="date"
          categories={["Calls", "Bookings"]}
          colors={["blue", "cyan"]}
          showLegend={false}
          showGridLines={false}
          startEndOnly={true}
          customTooltip={CustomTooltip}
          valueFormatter={(number) => `${number} units`}
        />
      </Card>

      {/* --- PHASE 3: AI INSIGHTS --- */}
      <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[40px] flex items-start gap-8 group">
        <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center text-black shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
          <Target size={28} />
        </div>
        <div>
          <h4 className="text-sm font-black uppercase italic tracking-[0.2em] mb-3">Sovereign Insight: Resource Optimization</h4>
          <p className="text-xs text-slate-400 font-bold uppercase leading-loose tracking-wider">
            Detected <span className="text-white">340% surge</span> in high-intent calls during off-peak hours (00:00 - 04:00). 
            Deploying additional <span className="text-cyan-500">Houston Node</span> resources has successfully increased emergency booking capture by <span className="text-green-500">22%</span> compared to human dispatchers.
          </p>
        </div>
      </div>

    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 backdrop-blur-2xl border border-white/10 p-5 rounded-2xl shadow-2xl">
        <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-3 italic">{label} • Neural Sync</p>
        <div className="space-y-2">
          {payload.map((category: any, idx: number) => (
            <div key={idx} className="flex items-center gap-8 justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">{category.name}</span>
              <span className="text-lg font-black italic text-white">{category.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
          
