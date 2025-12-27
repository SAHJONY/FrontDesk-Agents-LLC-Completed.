'use client';

import React from 'react';
import { Activity, Globe, PhoneIncoming, Shield, BarChart3 } from 'lucide-react';
import { LineChart, Card, Title, Text, Metric, Flex, Badge } from '@tremor/react';

export default function CommandCenterView({ stats, locale }: { stats: any; locale: string }) {
  return (
    <div className="min-h-screen bg-[#010204] p-8 space-y-8">
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-white/[0.02] border border-white/10 rounded-[2rem] p-8">
        <div className="flex items-center gap-6">
          <Globe className="w-12 h-12 text-cyan-500 animate-pulse" />
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Node Status: <span className="text-cyan-500">ACTIVE</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Jurisdiction: {locale.toUpperCase()} // Protocol: AEGIS
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="bg-white/[0.02] border-white/10 rounded-[2rem] p-8">
          <Flex alignItems="start">
            <div className="space-y-1">
              <Text className="uppercase text-[10px] font-black tracking-widest text-slate-400">Total Intake</Text>
              <Metric className="text-white font-black italic">14,208</Metric>
            </div>
            <Badge icon={PhoneIncoming} color="cyan">LIVE</Badge>
          </Flex>
          <LineChart
            className="mt-6 h-32"
            data={stats.callVolume.length > 0 ? stats.callVolume : [{time: '00:00', calls: 10}, {time: '12:00', calls: 45}]}
            index="time"
            categories={["calls"]}
            colors={["cyan"]}
            showXAxis={false}
            showYAxis={false}
            showLegend={false}
          />
        </Card>

        {/* Neural Identity Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8">
           <div className="flex items-center gap-3 mb-4">
             <Shield className="w-5 h-5 text-cyan-500" />
             <Title className="text-xs font-black uppercase tracking-widest text-white">Neural Identity</Title>
           </div>
           <p className="text-xs text-slate-400 leading-relaxed italic">
             "Operating in {stats.industry} mode."
           </p>
        </div>
      </div>
    </div>
  );
}
