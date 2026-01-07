'use client';

import React, { useState } from 'react';
import { 
  Crown, Shield, Activity, AlertTriangle, CheckCircle, XCircle,
  Phone, DollarSign, Users, TrendingUp, Settings, Power, Eye
} from 'lucide-react';

export default function OwnerOversightPanel() {
  const [systemStatus, setSystemStatus] = useState('operational');

  const systemMetrics = [
    { label: 'API Uptime', value: '99.98%', status: 'healthy', icon: Activity },
    { label: 'Active Agents', value: '12/12', status: 'healthy', icon: Users },
    { label: 'Avg Response Time', value: '1.2s', status: 'healthy', icon: Activity },
    { label: 'Error Rate', value: '0.02%', status: 'healthy', icon: CheckCircle }
  ];

  const recentAlerts = [
    {
      type: 'success',
      message: 'Growth tier agent "Maria Rodriguez" achieved 68% conversion rate (target: 40%)',
      time: '2 hours ago'
    },
    {
      type: 'warning',
      message: 'Basic tier customer "Acme Corp" approaching call limit (92/100 calls used)',
      time: '4 hours ago'
    },
    {
      type: 'info',
      message: 'New customer "Tech Startup Inc." signed up for Professional tier',
      time: '6 hours ago'
    }
  ];

  const liveActiveCalls = [
    { agent: 'Maria Rodriguez', customer: '+1 (555) 123-4567', duration: '2:34', status: 'active' },
    { agent: 'Alex Chen', customer: '+1 (555) 987-6543', duration: '1:12', status: 'active' },
    { agent: 'Sarah Williams', customer: '+1 (555) 456-7890', duration: '4:56', status: 'active' }
  ];

  const revenueBreakdown = [
    { source: 'Basic Tier', amount: 2388, percentage: 15 },
    { source: 'Professional Tier', amount: 7182, percentage: 45 },
    { source: 'Growth Tier', amount: 3995, percentage: 25 },
    { source: 'Elite Tier', amount: 2998, percentage: 15 }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Owner Badge */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Owner Command Center</h1>
            <p className="text-slate-400 text-sm mt-1">Juan Gonzalez • Supreme Owner • Unrestricted Access</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            systemStatus === 'operational' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <Activity className="w-4 h-4" />
            <span className="font-semibold">All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* System Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-sm">{metric.label}</span>
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <CheckCircle className="w-3 h-3" />
                <span>Healthy</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Active Calls */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-cyan-400" />
            Live Active Calls
          </h2>
          <span className="text-sm text-slate-400">{liveActiveCalls.length} calls in progress</span>
        </div>
        
        <div className="space-y-3">
          {liveActiveCalls.map((call, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <div>
                  <div className="font-semibold text-white">{call.agent}</div>
                  <div className="text-sm text-slate-400">{call.customer}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Duration</div>
                  <div className="font-semibold text-white">{call.duration}</div>
                </div>
                
                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Alerts */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Recent Alerts
            </h2>
          </div>
          
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                alert.type === 'success' ? 'bg-green-500/10 border-green-500/30' :
                alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-cyan-500/10 border-cyan-500/30'
              }`}>
                <div className="flex items-start gap-3">
                  {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />}
                  {alert.type === 'info' && <Activity className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />}
                  
                  <div className="flex-1">
                    <p className="text-sm text-white">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Revenue Breakdown
            </h2>
            <span className="text-sm text-slate-400">Last 30 days</span>
          </div>
          
          <div className="space-y-4">
            {revenueBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{item.source}</span>
                  <span className="text-green-400 font-semibold">${item.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Total Revenue</span>
              <span className="text-3xl font-bold text-white">
                ${revenueBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Controls */}
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Owner Controls</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <div className="font-semibold text-white">System Settings</div>
              <div className="text-xs text-slate-400">Configure platform</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors">
            <Users className="w-5 h-5 text-purple-400" />
            <div className="text-left">
              <div className="font-semibold text-white">Manage Agents</div>
              <div className="text-xs text-slate-400">Control AI workforce</div>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors">
            <Power className="w-5 h-5 text-red-400" />
            <div className="text-left">
              <div className="font-semibold text-white">Emergency Stop</div>
              <div className="text-xs text-slate-400">Halt all operations</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
