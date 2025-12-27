'use client';

import React from 'react';
import { Activity, Globe, PhoneIncoming, Shield, BarChart3 } from 'lucide-react';
import { LineChart, Card, Title, Text, Metric, Flex, Badge } from '@tremor/react';

// Define the interface for our Sovereign Stats
interface SovereignStats {
  callVolume: { time: string; calls: number }[];
  industry: string;
  language: string;
  mrr: number;
}

/**
 * COMMAND CENTER VIEW
 * Extracted from the page level to solve the Next.js 'invalid default export' error.
 * This component handles the high-fidelity UI rendering.
 */
export default function CommandCenterView({ 
  stats = { 
    callVolume: [], 
    industry: 'Medical', 
    language: 'English',
    mrr: 0 
  },
  locale = 'en'
}: { 
  stats?: SovereignStats;
  locale?: string;
}) {
  
  return (
    <div className="min-h-screen bg-[#010204] p-8 space-y-8 selection:bg-cyan-500/30">
      
      {/* --- TOP STATUS BAR: INFRASTRUCTURE HEALTH --- */}
      <div className="flex flex-wrap items-center justify-between gap-6 bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Globe className="w-12 h-12 text-cyan-500 animate-pulse" />
            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
              Global Node: <span className="text-cyan-500">ACTIVE</span>
            </h1>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Jurisdiction: {locale.toUpperCase()} // Node_ID: SYST-882
            </p>
          </div>
        </div>
        
        <div className="flex gap-12">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Operational Uptime</p>
            <p className="font-mono text-white text-lg font-bold">99.998%</p>
          </div>
          <div className="text-right border-s border-white/10 ps-12">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Encryption Protocol</p>
            <p className="font-mono text-cyan-500 text-lg italic font-bold tracking-tighter">AEGIS-LEVEL-6</p>
          </div>
        </div>
      </div>

      {/* --- CORE ANALYTICS GRID --- */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Call Volume Card */}
        <Card className="bg-white/[0.02] border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <Flex alignItems="start">
            <div className="space-y-1">
              <Text className="uppercase text-[10px] font-black tracking-[0.2em] text-slate-400">Total Global Intake</Text>
              <Metric className="text-white font-black italic text-4xl tabular-nums">14,208</Metric>
            </div>
            <Badge icon={PhoneIncoming} className="bg-cyan-500/10 text-cyan-500 border-cyan-500/20 px-3 py-1 uppercase text-[10px] font-black">
              LIVE STREAM
            </Badge>
          </Flex>
          <LineChart
            className="mt-10 h-40"
            data={stats.callVolume.length > 0 ? stats.callVolume : [
              { time: "00:00", calls: 45 }, { time: "04:00", calls: 32 },
              { time: "08:00", calls: 89 }, { time: "12:00", calls: 124 },
              { time: "16:00", calls: 98 }, { time: "20:00", calls: 67 }
            ]}
            index="time"
            categories={["calls"]}
            colors={["cyan"]}
            showXAxis={false}
            showYAxis={false}
            showLegend={false}
            showGridLines={false}
          />
        </Card>

        {/* Industry Intelligence */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-500">
           <div className="space-y-6">
             <div className="flex items-center gap-3">
               <Shield className="w-6 h-6 text-cyan-500" />
               <Title className="text-xs font-black uppercase tracking-[0.2em] text-white">Sovereign Logic Guardrails</Title>
             </div>
             <p className="text-sm text-slate-400 leading-relaxed italic font-medium">
               "Deployment assigned to <span className="text-white font-bold">{stats.industry}</span> vertical. Agent is currently synthesized in <span className="text-white font-bold">{stats.language}</span> utilizing the Global Sovereign Persona."
             </p>
           </div>
           <button className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-lg group-hover:shadow-cyan-500/10">
             Tweak Neural Identity
           </button>
        </div>

        {/* Regional Routing Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          <div className="relative z-10 h-full flex flex-col justify-between">
             <div>
               <BarChart3 className="w-10 h-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-500" />
               <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">Regional Routing</h3>
               <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-3 leading-loose">
                 Cluster: Alpha-7<br/>
                 Nodes: 14 Active<br/>
                 Latency: 12ms
               </p>
             </div>
             <div className="flex items-center gap-2 mt-4 text-[9px] font-black text-cyan-500 uppercase tracking-widest">
               <Activity className="w-3 h-3" />
               System Nominal
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
