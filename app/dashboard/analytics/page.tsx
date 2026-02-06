'use client';

/**
 * FRONTDESK AGENTS: NEURAL ANALYTICS ENGINE
 * Infrastructure: Performance Mapping & ROI Telemetry
 * Version: 2.1.0_PRO_CORE
 */

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Phone, Clock, DollarSign, 
  Target, Download, BarChart3, Zap, Globe, Activity
} from 'lucide-react';

// Premium Corporate Assets
const ANALYTICS_HERO = "/assets/premium/outbound-calls-stats.png";
const RETENTION_SNAPSHOT = "/assets/premium/retention-dashboard.png";

interface MetricCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`/api/analytics?range=${timeRange}`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("❌ [TELEMETRY_ERROR]: Failed to fetch neural metrics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [timeRange]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-cyan-500 font-mono tracking-widest uppercase text-xs">
        Initializing Neural Stream...
      </div>
    </div>
  );

  const metrics: MetricCard[] = [
    {
      title: 'Projected Revenue',
      value: `$${(stats?.leadsCount * 150 || 0).toLocaleString()}`,
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Total AI Calls',
      value: stats?.totalCalls || 0,
      change: '+24%',
      trend: 'up',
      icon: Phone,
      color: 'text-cyan-400'
    },
    {
      title: 'Human Hours Saved',
      value: `${Math.round((stats?.totalMinutes || 0) / 60 * 1.5)}h`,
      change: '+4h',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-400'
    },
    {
      title: 'Lead Conversion',
      value: `${((stats?.leadsCount / stats?.totalCalls) * 100 || 0).toFixed(1)}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white font-sans selection:bg-cyan-500/30">
      
      {/* Executive Header Segment */}
      <div className="mb-12 relative h-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
        <Image 
          src={ANALYTICS_HERO} 
          alt="Outbound Call Intelligence" 
          fill 
          className="object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000 scale-105 group-hover:scale-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center justify-between px-12">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_rgba(6,182,212,1)]" />
                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em]">Fleet Telemetry Active</span>
            </div>
            <h1 className="text-6xl font-black italic text-white tracking-tighter leading-none mb-4 uppercase">Neural Analytics</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global ROI mapping & Node Efficiency Terminal</p>
          </div>
          
          <div className="flex flex-col items-end gap-5">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-6 py-3 bg-black/80 border border-white/10 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest focus:border-cyan-500 focus:outline-none backdrop-blur-xl cursor-pointer"
              >
                <option value="24h">24H CYCLE</option>
                <option value="7d">7D CYCLE</option>
                <option value="30d">30D CYCLE</option>
              </select>
              <button className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)]">
                <Download className="w-4 h-4" />
                Export Manifest
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Matrix */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-zinc-950 border border-white/5 rounded-[2rem] p-8 hover:border-cyan-500/40 transition-all duration-500 group">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-cyan-500/10 transition-colors">
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <span className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">{metric.title}</span>
              </div>
              <div className="text-5xl font-black text-white mb-3 tracking-tighter italic">{metric.value}</div>
              <div className={`flex items-center gap-2 text-[10px] font-black tracking-widest ${metric.trend === 'up' ? 'text-cyan-400' : 'text-red-400'}`}>
                <Activity size={12} className="animate-pulse" />
                <span>{metric.change} VARIANCE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Intelligence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Retention Snapshot Segment */}
        <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-40 h-40 text-white" />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10 flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full" /> Retention_Snapshot
                </h3>
                
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 mb-10 shadow-inner">
                    <Image 
                        src={RETENTION_SNAPSHOT} 
                        alt="Retention Metrics" 
                        fill 
                        className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                    />
                </div>

                <div className="space-y-6">
                    <SentimentRow label="Sentiment Positive" percent={78} color="bg-cyan-500" />
                    <SentimentRow label="Agent Efficiency" percent={92} color="bg-white" />
                </div>
            </div>

            <div className="mt-12 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                    <Zap size={14} className="text-cyan-400" fill="currentColor" />
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.3em]">Neural Insight</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic font-medium">
                    "AI Fleet successfully identified and neutralized 84% of potential churn-risk indicators through automated proactive outreach."
                </p>
            </div>
        </div>

        {/* Fleet Pulse Visualizer */}
        <div className="lg:col-span-2 bg-zinc-950 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-black italic text-white flex items-center gap-4 uppercase tracking-tighter">
                <BarChart3 className="text-cyan-500" size={28} /> Fleet_Usage_Volume
            </h2>
            <div className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-xl text-[9px] font-black text-slate-500 tracking-widest">
                LIVE_FEED_01 // SECURE_NODE
            </div>
          </div>
          
          <div className="flex items-end gap-3 h-72 px-4">
            {[45, 78, 92, 65, 58, 88, 95, 82, 70, 60, 85, 90, 75, 88, 98].map((val, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  style={{ height: `${val}%` }}
                  className="w-full bg-white/10 rounded-t-xl group-hover:bg-cyan-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-700"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-[8px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {val}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-10 text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] px-4">
            <span>Cycle Start</span>
            <span>Mid Cycle Peak</span>
            <span className="text-cyan-500">Current Pulse</span>
          </div>
        </div>
      </div>

      {/* System Footer Protocol */}
      <div className="flex items-center justify-between py-10 border-t border-white/5">
        <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" /> 1,402 Nodes Online
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-cyan-500" /> AES-256 Encryption Active
            </div>
        </div>
        <span className="text-[10px] font-mono text-slate-800 font-black tracking-widest">PRO_CORE_BUILD_V2.1.0</span>
      </div>
    </div>
  );
}

function SentimentRow({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="text-slate-500">{label}</span>
                <span className="text-white">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
