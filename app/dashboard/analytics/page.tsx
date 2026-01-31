'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  TrendingUp, TrendingDown, Phone, Clock, DollarSign, 
  Target, Download, BarChart3, Zap, Globe, Activity
} from 'lucide-react';

// Using your specific GitHub assets
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
        console.error("Failed to fetch neural metrics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [timeRange]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="animate-pulse text-cyan-500 font-mono tracking-widest uppercase">Initializing Neural Stream...</div>
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
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white font-sans">
      
      {/* Header with outbond-calls-stats.png */}
      <div className="mb-12 relative h-56 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
        <Image 
          src={ANALYTICS_HERO} 
          alt="Outbound Call Intelligence" 
          fill 
          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex items-center justify-between px-10">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em]">Autonomous Workforce Telemetry</span>
            </div>
            <h1 className="text-5xl font-black italic text-white tracking-tighter leading-none mb-2">NEURAL_ANALYTICS</h1>
            <p className="text-slate-400 text-sm font-medium">Real-time ROI and fleet performance mapping.</p>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-slate-900/80 border border-white/10 rounded-xl text-white text-xs font-bold focus:border-cyan-500 focus:outline-none backdrop-blur-md"
              >
                <option value="24h">24H CYCLE</option>
                <option value="7d">7D CYCLE</option>
                <option value="30d">30D CYCLE</option>
              </select>
              <button className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-950 border border-white/5 rounded-2xl p-6 hover:border-cyan-500/40 transition-all shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="p-2 bg-white/5 rounded-lg">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">{metric.title}</span>
              </div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">{metric.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${metric.trend === 'up' ? 'text-cyan-400' : 'text-red-400'}`}>
                <Activity size={12} />
                <span>{metric.change} VARIANCE</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Retention / Sentiment using retention-dashboard.png */}
        <div className="bg-slate-950 border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-32 h-32 text-white" />
            </div>
            
            <div className="relative z-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> Retention_Snapshot
                </h3>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8">
                    <Image 
                        src={RETENTION_SNAPSHOT} 
                        alt="Retention Metrics" 
                        fill 
                        className="object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                </div>

                <div className="space-y-5">
                    <SentimentRow label="Positive Sentiment" percent={78} color="bg-cyan-500" />
                    <SentimentRow label="Agent Efficiency" percent={92} color="bg-white" />
                </div>
            </div>

            <div className="mt-10 p-5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-cyan-400" fill="currentColor" />
                    <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Neural Insight</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                    AI Fleet successfully resolved 84% of churn-risk indicators without human escalation.
                </p>
            </div>
        </div>

        {/* Volume Analysis */}
        <div className="lg:col-span-2 bg-slate-950 border border-white/5 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black italic text-white flex items-center gap-3">
                <BarChart3 className="text-cyan-500" size={24} /> FLEET_USAGE_VOLUME
            </h2>
            <div className="px-3 py-1 bg-slate-900 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400">
                LIVE_FEED_01
            </div>
          </div>
          
          <div className="flex items-end gap-3 h-64 px-4">
            {[45, 78, 92, 65, 58, 88, 95, 82, 70, 60, 85, 90, 75, 88, 98].map((val, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  style={{ height: `${val}%` }}
                  className="w-full bg-white/10 rounded-t-lg group-hover:bg-cyan-500 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-500"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] text-slate-600 font-black uppercase tracking-widest px-2">
            <span>Cycle Start</span>
            <span>Mid Cycle</span>
            <span>Current Pulse</span>
          </div>
        </div>
      </div>

      {/* System Footer */}
      <div className="flex items-center justify-between py-6 border-t border-white/5">
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_cyan]" /> Nodes Online
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Database Encrypted
            </div>
        </div>
        <span className="text-[9px] font-mono text-slate-800 font-bold">V_2.1.0_PRO_CORE</span>
      </div>
    </div>
  );
}

function SentimentRow({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                <span className="text-slate-500">{label}</span>
                <span className="text-white">{percent}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
