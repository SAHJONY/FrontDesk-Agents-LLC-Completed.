'use client';

import React, { useState, useEffect } from 'react';
import {
  Crown,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Power,
  Eye,
  RefreshCw,
} from 'lucide-react';

export default function OwnerOversightPanel() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch live dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard/live');
      const result = await response.json();

      if (result.success) {
        setDashboardData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Execute owner command
  const executeCommand = async (command: string, params?: any) => {
    try {
      const response = await fetch('/api/owner/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command, params }),
      });

      const result = await response.json();

      if (result.success) {
        alert(`Command executed successfully: ${command}`);
        fetchDashboardData(); // Refresh data
      } else {
        alert(`Command failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error executing command:', error);
      alert('Failed to execute command');
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading Owner Command Center...</p>
        </div>
      </div>
    );
  }

  const { systemHealth, metrics, workforce, activeCalls, agents, revenue, recentActivity } =
    dashboardData;

  const systemMetrics = [
    { label: 'API Uptime', value: systemHealth.apiUptime, status: 'healthy', icon: Activity },
    {
      label: 'Active Agents',
      value: `${workforce.activeAgents}/${workforce.totalAgents}`,
      status: 'healthy',
      icon: Users,
    },
    {
      label: 'Avg Response Time',
      value: `${metrics.avgDuration}s`,
      status: 'healthy',
      icon: Activity,
    },
    { label: 'Error Rate', value: systemHealth.errorRate, status: 'healthy', icon: CheckCircle },
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
            <p className="text-slate-400 text-sm mt-1">
              Juan Gonzalez • Supreme Owner • Unrestricted Access
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              autoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            <span className="text-sm">Auto-refresh</span>
          </button>

          <div
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              systemHealth.status === 'operational'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}
          >
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
          <span className="text-sm text-slate-400">{activeCalls.length} calls in progress</span>
        </div>

        {activeCalls.length > 0 ? (
          <div className="space-y-3">
            {activeCalls.map((call: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700"
              >
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
                    <div className="font-semibold text-white">
                      {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                    </div>
                  </div>

                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-400">No active calls at the moment</div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Alerts */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Recent Activity
            </h2>
          </div>

          <div className="space-y-3">
            {recentActivity.map((activity: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  activity.type === 'success'
                    ? 'bg-green-500/10 border-green-500/30'
                    : activity.type === 'warning'
                    ? 'bg-yellow-500/10 border-yellow-500/30'
                    : 'bg-cyan-500/10 border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  {activity.type === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  )}
                  {activity.type === 'warning' && (
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  )}
                  {activity.type === 'info' && (
                    <Activity className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {activity.agent} • {activity.time}
                    </p>
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
            <span className="text-sm text-slate-400">Monthly Recurring</span>
          </div>

          <div className="space-y-4">
            {revenue.breakdown.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">
                    {item.tier} ({item.customers} customers)
                  </span>
                  <span className="text-green-400 font-semibold">
                    ${item.revenue.toLocaleString()}
                  </span>
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
              <span className="text-slate-400 font-medium">Total MRR</span>
              <span className="text-3xl font-bold text-white">
                ${revenue.mrr.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-slate-400 text-sm">Annual Run Rate</span>
              <span className="text-lg font-semibold text-green-400">
                ${revenue.arr.toLocaleString()}
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
          <button
            onClick={() => executeCommand('status')}
            className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5 text-cyan-400" />
            <div className="text-left">
              <div className="font-semibold text-white">System Status</div>
              <div className="text-xs text-slate-400">Get complete status</div>
            </div>
          </button>

          <button
            onClick={() => executeCommand('view_financials')}
            className="flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-colors"
          >
            <DollarSign className="w-5 h-5 text-green-400" />
            <div className="text-left">
              <div className="font-semibold text-white">View Financials</div>
              <div className="text-xs text-slate-400">Complete financial data</div>
            </div>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to initiate emergency shutdown?')) {
                executeCommand('shutdown', { reason: 'Owner initiated shutdown' });
              }
            }}
            className="flex items-center gap-3 p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-colors"
          >
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
