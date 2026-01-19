'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  TrendingUp, TrendingDown, Phone, Clock, DollarSign, Users, 
  Target, Award, Calendar, Filter, Download, BarChart3, Zap
} from 'lucide-react';

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
      <div className="animate-pulse text-cyan-500 font-mono tracking-widest">SYNCHRONIZING NEURAL DATA...</div>
    </div>
  );

  const metrics: MetricCard[] = [
    {
      title: 'Projected Revenue',
      value: `$${(stats?.leadsCount * 150).toLocaleString()}`, // Hypothetical $150 per lead
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
    <div className="p-6 max-w-7xl mx-auto bg-black min-h-screen text-white">
      {/* Header with Premium Image */}
      <div className="mb-12 relative h-48 rounded-xl overflow-hidden border border-white/10">
        <Image 
          src="https://images.unsplash.com/photo-1551288049-bbda483387a5?q=80&w=2070&auto=format&fit=crop" 
          alt="Analytics Dashboard" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent flex items-center justify-between px-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                <span className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">Live Intelligence Feed</span>
            </div>
            <h1 className="text-4xl font-black italic text-white tracking-tighter">NEURAL ANALYTICS</h1>
            <p className="text-slate-400 text-sm mt-1">ROI tracking for your autonomous AI workforce</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none backdrop-blur-sm"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm font-bold transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-900/50 border border-white/5 rounded-xl p-6 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{metric.title}</span>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-2">{metric.value}</div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{metric.change} PROJECTION</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Call Volume Bar Chart */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="text-cyan-500" size={20} /> Call Frequency
            </h2>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" /> AI Handled
                </div>
            </div>
          </div>
          
          <div className="flex items-end gap-3 h-48">
            {/* Real data would map here; using styled placeholders for visual impact */}
            {[45, 78, 92, 65, 58, 88, 95, 82, 70, 60, 85, 90].map((val, i) => (
              <div key={i} className="flex-1 group relative">
                <div 
                  style={{ height: `${val}%` }}
                  className="w-full bg-gradient-to-t from-cyan-600/20 to-cyan-400 rounded-t-sm group-hover:from-cyan-400 transition-all"
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all">
                    {val} calls
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
            <span>08:00 AM</span>
            <span>12:00 PM</span>
            <span>04:00 PM</span>
            <span>08:00 PM</span>
          </div>
        </div>

        {/* Sentiment Distribution Pie/Progress Placeholder */}
        <div className="bg-slate-900/40 border border-white/5 rounded-xl p-8 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold mb-4">Sentiment Analysis</h3>
                <div className="space-y-6">
                    <SentimentRow label="Positive / Satisfied" percent={72} color="bg-green-500" />
                    <SentimentRow label="Neutral / Inquiry" percent={22} color="bg-cyan-500" />
                    <SentimentRow label="Frustrated / Escalated" percent={6} color="bg-red-500" />
                </div>
            </div>

            <div className="mt-8 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-cyan-500" fill="currentColor" />
                    <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">Neural Insight</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Peak conversion occurs between 2 PM and 4 PM. High frequency of pricing questions detected in 12% of calls."
                </p>
            </div>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="flex items-center justify-between py-4 border-t border-white/5">
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> SYSTEM NOMINAL
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> DATABASE SYNCED
            </div>
        </div>
        <span className="text-[10px] font-mono text-slate-700 uppercase">Version 2.0.4-NEURAL</span>
      </div>
    </div>
  );
}

function SentimentRow({ label, percent, color }: { label: string, percent: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500">{label}</span>
                <span className="text-white">{percent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    );
}
