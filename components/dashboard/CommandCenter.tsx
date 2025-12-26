'use client';

import React from 'react';
import { Activity, Globe, PhoneIncoming, Shield, BarChart3, Clock } from 'lucide-react';
import { LineChart, Card, Title, Text, Metric, Flex, Badge } from '@tremor/react';

export default function CommandCenter({ stats }: { stats: any }) {
  return (
    <div className="min-h-screen bg-[#010204] p-8 space-y-8">
      {/* --- TOP STATUS BAR --- */}
      <div className="flex flex-wrap items-center justify-between gap-6 titan-card p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Globe className="w-10 h-10 text-cyan-500 animate-pulse-slow" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase italic tracking-tighter">Global Node: <span className="text-cyan-500">ACTIVE</span></h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Deployment: Sovereign Production Layer</p>
          </div>
        </div>
        
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase">Uptime</p>
            <p className="font-mono text-white text-sm">99.99%</p>
          </div>
          <div className="text-right border-s border-white/10 ps-8">
            <p className="text-[10px] font-black text-slate-500 uppercase">Encryption</p>
            <p className="font-mono text-cyan-500 text-sm italic">AEGIS-LEVEL</p>
          </div>
        </div>
      </div>

      {/* --- CORE ANALYTICS GRID --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Call Volume Card */}
        <Card className="bg-black/50 border-white/5 rounded-3xl">
          <Flex alignItems="start">
            <div className="space-y-1">
              <Text className="uppercase text-[10px] font-black tracking-widest text-slate-400">Total Global Intake</Text>
              <Metric className="text-white font-black italic">14,208</Metric>
            </div>
            <Badge icon={PhoneIncoming} color="cyan">Active</Badge>
          </Flex>
          <LineChart
            className="mt-6 h-32"
            data={stats.callVolume}
            index="time"
            categories={["calls"]}
            colors={["cyan"]}
            showXAxis={false}
            showYAxis={false}
            showLegend={false}
          />
        </Card>

        {/* Industry Intelligence */}
        <div className="titan-card flex flex-col justify-between">
           <div className="flex items-center gap-3 mb-4">
             <Shield className="w-5 h-5 text-cyan-500" />
             <Title className="text-sm font-black uppercase tracking-widest text-white">Sovereign Logic</Title>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed italic">
             "Your {stats.industry} node is currently processing calls in {stats.language} using the Global Sovereign Persona."
           </p>
           <button className="mt-6 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
             Tweak Neural Identity
           </button>
        </div>

        {/* Global Node Map Placeholder */}
        <div className="titan-card relative overflow-hidden group">
          <div className="neural-grid absolute inset-0 opacity-20" />
          <div className="relative z-10">
             <BarChart3 className="w-8 h-8 text-cyan-500 mb-4" />
             <h3 className="text-lg font-black uppercase italic">Regional Routing</h3>
             <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2">Multiple High-Availability Clusters Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
