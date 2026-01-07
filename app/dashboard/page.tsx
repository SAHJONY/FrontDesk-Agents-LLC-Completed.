'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Phone, 
  Users, 
  TrendingUp, 
  Activity,
  ArrowRight,
  Bot,
  MessageSquare,
  DollarSign
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
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

    fetchData();
  }, []);

  const quickActions = [
    {
      title: 'AI Agents',
      description: 'Manage your AI workforce',
      icon: Bot,
      href: '/dashboard/agents',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Active Calls',
      description: 'Monitor live conversations',
      icon: Phone,
      href: '/dashboard/calls',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Analytics',
      description: 'View performance metrics',
      icon: TrendingUp,
      href: '/dashboard/analytics',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Settings',
      description: 'Configure your platform',
      icon: Activity,
      href: '/dashboard/settings',
      color: 'from-orange-500 to-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your platform overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-sm text-gray-400">Today</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {dashboardData?.metrics?.totalCalls || 0}
            </div>
            <div className="text-sm text-gray-400">Total Calls</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Active</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {dashboardData?.workforce?.activeAgents || 0}
            </div>
            <div className="text-sm text-gray-400">AI Agents</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-sm text-gray-400">This Month</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {dashboardData?.metrics?.conversionRate || '0'}%
            </div>
            <div className="text-sm text-gray-400">Conversion Rate</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-sm text-gray-400">MRR</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${dashboardData?.revenue?.mrr?.toLocaleString() || '0'}
            </div>
            <div className="text-sm text-gray-400">Monthly Revenue</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group bg-gray-800 border border-gray-700 hover:border-cyan-500/50 rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
                  {action.title}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <Link href="/dashboard/analytics" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recentActivity.slice(0, 5).map((activity: any, index: number) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No recent activity</p>
              <p className="text-sm text-gray-500 mt-2">Your activity will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
