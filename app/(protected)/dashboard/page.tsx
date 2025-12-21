'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Phone, TrendingUp, Users, Clock } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Calls',
      value: '1,234',
      change: '+12%',
      icon: Phone,
      color: 'blue',
    },
    {
      name: 'Active Leads',
      value: '89',
      change: '+8%',
      icon: TrendingUp,
      color: 'green',
    },
    {
      name: 'Customers',
      value: '456',
      change: '+23%',
      icon: Users,
      color: 'purple',
    },
    {
      name: 'Avg Response Time',
      value: '2.3s',
      change: '-15%',
      icon: Clock,
      color: 'orange',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.email || 'User'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 rounded-lg`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.change.startsWith('+')
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Configure AI Agent
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Customize your AI receptionist
              </p>
            </button>
            <button className="p-4 border-2 border-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                View Leads
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check your sales pipeline
              </p>
            </button>
            <button className="p-4 border-2 border-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View detailed reports
              </p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[
              { type: 'call', name: 'John Smith', time: '5 minutes ago', status: 'answered' },
              { type: 'lead', name: 'Sarah Johnson', time: '1 hour ago', status: 'qualified' },
              { type: 'call', name: 'Mike Davis', time: '2 hours ago', status: 'missed' },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'answered'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : activity.status === 'qualified'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
