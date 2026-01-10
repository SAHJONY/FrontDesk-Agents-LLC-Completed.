'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardData {
  agents: {
    total: number;
    active: number;
  };
  calls: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  analytics: {
    successRate: number;
    avgDuration: number;
    conversionRate: number;
  };
  subscription: {
    status: string;
    plan: string;
    nextBilling: string;
  };
}

export default function CustomerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual customer ID from session
      const customerId = 'customer-id-placeholder';

      const [agentsRes, callsRes, analyticsRes, subscriptionRes] = await Promise.all([
        fetch(`/api/agents?customer_id=${customerId}`),
        fetch(`/api/calls?customer_id=${customerId}&limit=1000`),
        fetch(`/api/calls/analytics?customer_id=${customerId}&days=30`),
        fetch(`/api/subscriptions?customer_id=${customerId}`),
      ]);

      const agents = await agentsRes.json();
      const calls = await callsRes.json();
      const analytics = await analyticsRes.json();
      const subscriptions = await subscriptionRes.json();

      setData({
        agents: {
          total: agents.agents?.length || 0,
          active: agents.agents?.filter((a: any) => a.status === 'active').length || 0,
        },
        calls: {
          today: calls.calls?.filter((c: any) => {
            const callDate = new Date(c.started_at);
            const today = new Date();
            return callDate.toDateString() === today.toDateString();
          }).length || 0,
          thisWeek: calls.calls?.filter((c: any) => {
            const callDate = new Date(c.started_at);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return callDate >= weekAgo;
          }).length || 0,
          thisMonth: calls.calls?.filter((c: any) => {
            const callDate = new Date(c.started_at);
            const monthAgo = new Date();
            monthAgo.setDate(monthAgo.getDate() - 30);
            return callDate >= monthAgo;
          }).length || 0,
        },
        analytics: {
          successRate: analytics.summary?.successRate || 0,
          avgDuration: analytics.summary?.avgDuration || 0,
          conversionRate: analytics.summary?.conversionRate || 0,
        },
        subscription: {
          status: subscriptions.subscriptions?.[0]?.status || 'inactive',
          plan: subscriptions.subscriptions?.[0]?.plan_id || 'none',
          nextBilling: subscriptions.subscriptions?.[0]?.current_period_end || 'N/A',
        },
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Dashboard</h1>
        <p className="text-gray-600">Monitor your AI agents and call performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Active Agents</div>
          <div className="text-3xl font-bold">{data?.agents.active || 0}</div>
          <div className="text-xs text-gray-500 mt-1">of {data?.agents.total || 0} total</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Calls Today</div>
          <div className="text-3xl font-bold">{data?.calls.today || 0}</div>
          <div className="text-xs text-gray-500 mt-1">{data?.calls.thisWeek || 0} this week</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Success Rate</div>
          <div className="text-3xl font-bold">{data?.analytics.successRate || 0}%</div>
          <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Conversion Rate</div>
          <div className="text-3xl font-bold">{data?.analytics.conversionRate || 0}%</div>
          <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => router.push('/dashboard/agents')}
          className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-lg text-left transition-colors"
        >
          <div className="text-lg font-semibold mb-2">Manage Agents</div>
          <div className="text-sm opacity-90">Create and configure your AI agents</div>
        </button>

        <button
          onClick={() => router.push('/dashboard/calls')}
          className="bg-green-600 hover:bg-green-700 text-white p-6 rounded-lg text-left transition-colors"
        >
          <div className="text-lg font-semibold mb-2">View Calls</div>
          <div className="text-sm opacity-90">Review call history and recordings</div>
        </button>

        <button
          onClick={() => router.push('/dashboard/settings')}
          className="bg-purple-600 hover:bg-purple-700 text-white p-6 rounded-lg text-left transition-colors"
        >
          <div className="text-lg font-semibold mb-2">Settings</div>
          <div className="text-sm opacity-90">Manage account and billing</div>
        </button>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Current Plan</div>
            <div className="text-lg font-medium capitalize">{data?.subscription.plan || 'No active plan'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Status</div>
            <div className={`text-lg font-medium capitalize ${
              data?.subscription.status === 'active' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {data?.subscription.status || 'Inactive'}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Next Billing</div>
            <div className="text-lg font-medium">
              {data?.subscription.nextBilling !== 'N/A' 
                ? new Date(data?.subscription.nextBilling).toLocaleDateString()
                : 'N/A'}
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
            Manage Subscription
          </button>
        </div>
      </div>
    </div>
  );
}
