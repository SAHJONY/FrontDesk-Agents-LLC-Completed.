'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, Users, Target, BarChart3, 
  Activity, Award, RefreshCw, Calendar, ArrowUp, ArrowDown
} from 'lucide-react';

interface SalesMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  totalCustomers: number;
  newCustomers: number;
  churnRate: number;
  conversionRate: number;
  averageDealSize: number;
  mrr: number;
  arr: number;
  ltv_cac_ratio: number;
}

interface SalesActivity {
  id: string;
  type: 'new_customer' | 'upgrade' | 'renewal' | 'churn';
  customerName: string;
  amount: number;
  plan: string;
  timestamp: string;
  status: string;
  details: string;
}

interface TopCustomer {
  id: string;
  name: string;
  plan: string;
  mrr: number;
  ltv: number;
  status: string;
  satisfaction: number;
  renewalProbability: number;
}

export default function SalesDashboard() {
  const [metrics, setMetrics] = useState<SalesMetrics | null>(null);
  const [activities, setActivities] = useState<SalesActivity[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, [timeRange]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      // Fetch metrics
      const metricsRes = await fetch(`/api/owner/sales/metrics?range=${timeRange}`);
      const metricsData = await metricsRes.json();
      setMetrics(metricsData);

      // Fetch activities
      const activitiesRes = await fetch('/api/owner/sales/activities?limit=10');
      const activitiesData = await activitiesRes.json();
      setActivities(activitiesData.activities || []);

      // Fetch top customers
      const customersRes = await fetch('/api/owner/sales/top-customers?limit=5');
      const customersData = await customersRes.json();
      setTopCustomers(customersData.customers || []);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 font-mono uppercase tracking-widest text-sm">
            Loading Sales Data...
          </p>
        </div>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'new_customer': return <Users className="w-4 h-4 text-green-500" />;
      case 'upgrade': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'renewal': return <RefreshCw className="w-4 h-4 text-purple-500" />;
      case 'churn': return <ArrowDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
              Sales Dashboard
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Revenue Analytics • Customer Insights • Performance Metrics
            </p>
          </div>
          <div className="flex gap-2">
            {['day', 'week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                  timeRange === range
                    ? 'bg-cyan-500 text-black'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className={`text-xs font-black flex items-center gap-1 ${
                metrics.revenueGrowth >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {metrics.revenueGrowth >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {Math.abs(metrics.revenueGrowth).toFixed(1)}%
              </span>
            </div>
            <p className="text-3xl font-black mb-1">${(metrics.monthlyRevenue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Monthly Revenue</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-black text-blue-500">+{metrics.newCustomers}</span>
            </div>
            <p className="text-3xl font-black mb-1">{metrics.totalCustomers}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Total Customers</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="text-xs font-black text-purple-500">{metrics.conversionRate}%</span>
            </div>
            <p className="text-3xl font-black mb-1">${(metrics.averageDealSize / 1000).toFixed(1)}K</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Avg Deal Size</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-xs font-black text-yellow-500">{metrics.ltv_cac_ratio.toFixed(1)}x</span>
            </div>
            <p className="text-3xl font-black mb-1">${(metrics.arr / 1000).toFixed(0)}K</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Annual Recurring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase tracking-tight">Recent Activities</h2>
              <button onClick={fetchSalesData} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <div className="mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-sm">{activity.customerName}</p>
                        <p className="text-xs text-zinc-500">{activity.details}</p>
                      </div>
                      <span className={`text-sm font-black ${
                        activity.amount >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {activity.amount >= 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-zinc-600 uppercase tracking-wider">{activity.plan}</span>
                      <span className="text-xs text-zinc-700">•</span>
                      <span className="text-xs text-zinc-600">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6">Top Customers</h2>

            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 font-black text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{customer.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500 uppercase tracking-wider">{customer.plan}</span>
                      <span className="text-xs text-zinc-700">•</span>
                      <span className="text-xs text-zinc-600">{customer.satisfaction}% satisfaction</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-green-400">${customer.mrr}/mo</p>
                    <p className="text-xs text-zinc-600">${(customer.ltv / 1000).toFixed(0)}K LTV</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">MRR</p>
            <p className="text-2xl font-black">${(metrics.mrr / 1000).toFixed(0)}K</p>
            <p className="text-xs text-zinc-600 mt-1">Monthly Recurring Revenue</p>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Churn Rate</p>
            <p className="text-2xl font-black">{metrics.churnRate}%</p>
            <p className="text-xs text-zinc-600 mt-1">Customer Churn Rate</p>
          </div>

          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">LTV/CAC</p>
            <p className="text-2xl font-black">{metrics.ltv_cac_ratio.toFixed(1)}x</p>
            <p className="text-xs text-zinc-600 mt-1">Lifetime Value / Acquisition Cost</p>
          </div>
        </div>
      </div>
    </div>
  );
}
