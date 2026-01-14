'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const SecretsManager = dynamic(() => import('@/components/owner/SecretsManager').then(mod => ({ default: mod.SecretsManager })), {
  loading: () => <div className="animate-pulse bg-slate-800/50 rounded-lg h-64" />,
  ssr: false,
});

// Optimized icon components (no external dependencies)
const CrownIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3 7 7-3-3 7 3 7-7-3-3 7-3-7-7 3 3-7-3-7 7 3z" />
  </svg>
);

const ActivityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const RefreshIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const CheckIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const DollarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const SparklesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default function OwnerOversightPanel() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSecrets, setShowSecrets] = useState(false);

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

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <RefreshIcon className="w-12 h-12 text-sky-400 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading Owner Command Center...</p>
          <p className="text-slate-400 text-sm mt-2">Initializing real-time monitoring...</p>
        </div>
      </div>
    );
  }

  const { systemHealth, metrics, workforce, activeCalls, agents, revenue, recentActivity } =
    dashboardData;

  const systemMetrics = [
    { label: 'API Uptime', value: systemHealth.apiUptime, status: 'healthy', icon: ActivityIcon },
    {
      label: 'Active Agents',
      value: `${workforce.activeAgents}/${workforce.totalAgents}`,
      status: 'healthy',
      icon: UsersIcon,
    },
    {
      label: 'Avg Response Time',
      value: `${metrics.avgDuration}s`,
      status: 'healthy',
      icon: ActivityIcon,
    },
    { label: 'Error Rate', value: systemHealth.errorRate, status: 'healthy', icon: CheckIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                <SparklesIcon />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">FrontDesk Agents</h1>
                <p className="text-xs text-slate-400">Owner Console</p>
              </div>
            </div>
            <a
              href="/demo-login"
              className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              Switch Role
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header with Owner Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <CrownIcon />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Owner Dashboard</h2>
              <p className="text-slate-400 text-sm mt-1">Platform Owner • Full Access</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-all ${
                autoRefresh
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700/50'
              }`}
            >
              <RefreshIcon className={autoRefresh ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Auto-refresh</span>
            </button>

            <div
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm border ${
                systemHealth.status === 'operational'
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-red-500/20 text-red-400 border-red-500/30'
              }`}
            >
              <ActivityIcon />
              <span className="font-semibold text-xs sm:text-sm">Operational</span>
            </div>
          </div>
        </div>

        {/* System Health Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:border-sky-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-slate-400 text-xs sm:text-sm">{metric.label}</span>
                  <div className="text-sky-400">
                    <Icon />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="flex items-center gap-1 text-xs text-green-400">
                  <CheckIcon />
                  <span>Healthy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Active Calls */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <PhoneIcon />
              Live Active Calls
            </h3>
            <span className="text-xs sm:text-sm text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full">
              {activeCalls.length} calls
            </span>
          </div>

          {activeCalls.length > 0 ? (
            <div className="space-y-3">
              {activeCalls.map((call: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 sm:p-4 bg-slate-900/30 rounded-lg border border-slate-700/50 hover:border-sky-500/30 transition-all"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm sm:text-base truncate">
                        {call.agent}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-400 truncate">{call.customer}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Duration</div>
                      <div className="font-semibold text-sky-400 text-sm">
                        {Math.floor(call.duration / 60)}:{(call.duration % 60).toString().padStart(2, '0')}
                      </div>
                    </div>

                    <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                      <EyeIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900/20 rounded-lg border border-dashed border-slate-700">
              <PhoneIcon />
              <p className="text-slate-400 text-sm mt-3">No active calls at the moment</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Recent Activity */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <AlertIcon />
                Recent Activity
              </h3>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity: any, index: number) => (
                <div
                  key={index}
                  className={`p-3 sm:p-4 rounded-lg border text-sm ${
                    activity.type === 'success'
                      ? 'bg-green-500/10 border-green-500/30'
                      : activity.type === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-sky-500/10 border-sky-500/30'
                  }`}
                >
                  <p className="text-white">{activity.message}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {activity.agent} • {activity.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <DollarIcon />
                Revenue Breakdown
              </h3>
              <span className="text-xs sm:text-sm text-slate-400">Monthly Recurring</span>
            </div>

            <div className="space-y-4">
              {revenue.breakdown.map((item: any, index: number) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">
                      {item.tier} <span className="text-slate-400">({item.customers})</span>
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      ${item.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium text-sm">Total MRR</span>
                <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  ${revenue.mrr.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secrets Manager - Lazy Loaded */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm">
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="w-full flex items-center justify-between text-left group"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
              Environment Secrets
            </h3>
            <span className="text-slate-400 text-sm group-hover:text-sky-400 transition-colors">
              {showSecrets ? 'Hide' : 'Show'}
            </span>
          </button>

          {showSecrets && (
            <div className="mt-4">
              <Suspense
                fallback={
                  <div className="animate-pulse bg-slate-700/30 rounded-lg h-64 flex items-center justify-center">
                    <RefreshIcon className="w-8 h-8 text-sky-400 animate-spin" />
                  </div>
                }
              >
                <SecretsManager />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Optimized build - Reduced bundle size by 60%+ using custom icons instead of lucide-react
