'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  TrendingUp, TrendingDown, Phone, Clock, DollarSign, Users, 
  Target, Award, Calendar, Filter, Download, BarChart3
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Total Calls',
      value: '1,247',
      change: '+24%',
      trend: 'up',
      icon: Phone,
      color: 'text-cyan-400'
    },
    {
      title: 'Avg Call Duration',
      value: '4m 22s',
      change: '-12s',
      trend: 'down',
      icon: Clock,
      color: 'text-purple-400'
    },
    {
      title: 'Conversion Rate',
      value: '42.5%',
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-400'
    }
  ];

  const agentPerformance = [
    { name: 'Maria Rodriguez', calls: 89, conversions: 61, rate: 68.5, revenue: 4850 },
    { name: 'Alex Chen', calls: 72, conversions: 30, rate: 41.7, revenue: 3200 },
    { name: 'Sarah Williams', calls: 56, conversions: 28, rate: 50.0, revenue: 2400 },
    { name: 'David Johnson', calls: 45, conversions: 18, rate: 40.0, revenue: 1800 },
    { name: 'Emily Davis', calls: 38, conversions: 15, rate: 39.5, revenue: 1200 }
  ];

  const callsByHour = [
    { hour: '9 AM', calls: 45 },
    { hour: '10 AM', calls: 78 },
    { hour: '11 AM', calls: 92 },
    { hour: '12 PM', calls: 65 },
    { hour: '1 PM', calls: 58 },
    { hour: '2 PM', calls: 88 },
    { hour: '3 PM', calls: 95 },
    { hour: '4 PM', calls: 82 },
    { hour: '5 PM', calls: 70 }
  ];

  const tierDistribution = [
    { tier: 'Basic', customers: 12, revenue: 2388, percentage: 19 },
    { tier: 'Professional', customers: 18, revenue: 7182, percentage: 58 },
    { tier: 'Growth', customers: 5, revenue: 3995, percentage: 32 },
    { tier: 'Elite', customers: 2, revenue: 2998, percentage: 24 }
  ];

  const maxCalls = Math.max(...callsByHour.map(d => d.calls));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Premium Image */}
      <div className="mb-12 relative h-48 rounded-xl overflow-hidden">
        <Image 
          src="/images/premium/client-dashboard.jpg" 
          alt="Analytics Dashboard" 
          fill 
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent flex items-center justify-between px-8">
          <div>
            <h1 className="text-4xl font-black italic text-white">NEURAL ANALYTICS</h1>
            <p className="text-slate-400 text-sm mt-1">Track your AI workforce performance and revenue</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-slate-800/80 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none backdrop-blur-sm"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 hover:border-cyan-500 rounded-lg text-white text-sm transition-colors backdrop-blur-sm">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-400 text-sm font-medium">{metric.title}</span>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{metric.change} vs last period</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calls by Hour Chart */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Call Volume by Hour</h2>
          <span className="text-sm text-slate-400">Peak: 3 PM (95 calls)</span>
        </div>
        
        <div className="flex items-end gap-2 h-64">
          {callsByHour.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-full">
                <div
                  style={{ height: `${(data.calls / maxCalls) * 100}%` }}
                  className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg hover:from-cyan-400 hover:to-cyan-300 transition-all cursor-pointer relative group"
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.calls} calls
                  </div>
                </div>
              </div>
              <span className="text-xs text-slate-400">{data.hour}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Agent Performance */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Performing Agents</h2>
            <Award className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="space-y-4">
            {agentPerformance.map((agent, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white">{agent.name}</span>
                    <span className="text-sm text-green-400 font-semibold">${agent.revenue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{agent.calls} calls</span>
                    <span>•</span>
                    <span>{agent.conversions} conversions</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-semibold">{agent.rate}% rate</span>
                  </div>
                  
                  <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${agent.rate}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Distribution */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Revenue by Tier</h2>
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="space-y-4">
            {tierDistribution.map((tier, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-white">{tier.tier}</span>
                    <span className="text-sm text-slate-400 ml-2">({tier.customers} customers)</span>
                  </div>
                  <span className="text-sm font-semibold text-green-400">${tier.revenue.toLocaleString()}</span>
                </div>
                
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${tier.percentage}%` }}
                    className={`h-full ${
                      tier.tier === 'Basic' ? 'bg-blue-500' :
                      tier.tier === 'Professional' ? 'bg-cyan-500' :
                      tier.tier === 'Growth' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Total MRR</span>
              <span className="text-2xl font-bold text-white">${tierDistribution.reduce((sum, t) => sum + t.revenue, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage & Billing Summary */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Usage & Billing Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="text-sm text-slate-400 mb-1">Total Minutes</div>
            <div className="text-2xl font-bold text-white">5,438</div>
            <div className="text-xs text-green-400 mt-1">+12% this week</div>
          </div>
          
          <div>
            <div className="text-sm text-slate-400 mb-1">Avg Cost/Call</div>
            <div className="text-2xl font-bold text-white">$0.42</div>
            <div className="text-xs text-slate-400 mt-1">Within budget</div>
          </div>
          
          <div>
            <div className="text-sm text-slate-400 mb-1">Active Subscriptions</div>
            <div className="text-2xl font-bold text-white">37</div>
            <div className="text-xs text-green-400 mt-1">+5 this month</div>
          </div>
          
          <div>
            <div className="text-sm text-slate-400 mb-1">Projected Revenue</div>
            <div className="text-2xl font-bold text-white">$18,200</div>
            <div className="text-xs text-cyan-400 mt-1">Next 30 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}
