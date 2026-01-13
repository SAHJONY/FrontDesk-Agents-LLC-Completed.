import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, DollarSign, Users, Target, Calendar, 
  BarChart3, PieChart, Activity, Award, Clock 
} from 'lucide-react';

interface SalesMetrics {
  // Revenue Metrics
  totalRevenue: number;
  monthlyRevenue: number;
  quarterlyRevenue: number;
  yearlyRevenue: number;
  revenueGrowth: number;
  
  // Customer Metrics
  totalCustomers: number;
  newCustomers: number;
  churnRate: number;
  activeSubscriptions: number;
  lifetimeValue: number;
  
  // Sales Performance
  conversionRate: number;
  averageDealSize: number;
  salesCycleLength: number;
  winRate: number;
  
  // Pipeline
  pipelineValue: number;
  dealsInProgress: number;
  closedDeals: number;
  lostDeals: number;
}

interface SalesActivity {
  id: string;
  type: 'new_customer' | 'upgrade' | 'renewal' | 'churn';
  customerName: string;
  amount: number;
  plan: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TopCustomer {
  id: string;
  name: string;
  email: string;
  plan: string;
  mrr: number;
  ltv: number;
  signupDate: string;
  status: 'active' | 'at_risk' | 'churned';
}

export const SalesDashboard = () => {
  const [metrics, setMetrics] = useState<SalesMetrics>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    quarterlyRevenue: 0,
    yearlyRevenue: 0,
    revenueGrowth: 0,
    totalCustomers: 0,
    newCustomers: 0,
    churnRate: 0,
    activeSubscriptions: 0,
    lifetimeValue: 0,
    conversionRate: 0,
    averageDealSize: 0,
    salesCycleLength: 0,
    winRate: 0,
    pipelineValue: 0,
    dealsInProgress: 0,
    closedDeals: 0,
    lostDeals: 0,
  });

  const [activities, setActivities] = useState<SalesActivity[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, [timeRange]);

  const fetchSalesData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Fetch sales metrics
      const metricsRes = await fetch(`/api/owner/sales/metrics?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const metricsData = await metricsRes.json();
      setMetrics(metricsData);

      // Fetch recent activities
      const activitiesRes = await fetch(`/api/owner/sales/activities?limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const activitiesData = await activitiesRes.json();
      setActivities(activitiesData.activities || []);

      // Fetch top customers
      const customersRes = await fetch(`/api/owner/sales/top-customers?limit=5`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const customersData = await customersRes.json();
      setTopCustomers(customersData.customers || []);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getActivityIcon = (type: SalesActivity['type']) => {
    switch (type) {
      case 'new_customer': return '🎉';
      case 'upgrade': return '⬆️';
      case 'renewal': return '🔄';
      case 'churn': return '⚠️';
    }
  };

  const getActivityColor = (type: SalesActivity['type']) => {
    switch (type) {
      case 'new_customer': return 'text-green-400';
      case 'upgrade': return 'text-blue-400';
      case 'renewal': return 'text-amber-400';
      case 'churn': return 'text-red-400';
    }
  };

  const getStatusBadge = (status: TopCustomer['status']) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/50',
      at_risk: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      churned: 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return colors[status];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Sales Dashboard</h2>
          <p className="text-slate-400">Comprehensive sales analytics and performance metrics</p>
        </div>
        <div className="flex gap-2">
          {(['day', 'week', 'month', 'quarter', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className={`text-sm font-bold ${metrics.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatPercent(metrics.revenueGrowth)}
            </span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Total Revenue</p>
          <p className="text-3xl font-black text-white">{formatCurrency(metrics.totalRevenue)}</p>
          <p className="text-xs text-slate-500 mt-2">Monthly: {formatCurrency(metrics.monthlyRevenue)}</p>
        </div>

        {/* Active Customers */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-bold text-blue-400">+{metrics.newCustomers}</span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Active Customers</p>
          <p className="text-3xl font-black text-white">{metrics.totalCustomers.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-2">Churn Rate: {metrics.churnRate.toFixed(1)}%</p>
        </div>

        {/* Pipeline Value */}
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">{metrics.dealsInProgress} deals</span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Pipeline Value</p>
          <p className="text-3xl font-black text-white">{formatCurrency(metrics.pipelineValue)}</p>
          <p className="text-xs text-slate-500 mt-2">Win Rate: {metrics.winRate.toFixed(1)}%</p>
        </div>

        {/* Average Deal Size */}
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-bold text-purple-400">{metrics.closedDeals} closed</span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Avg Deal Size</p>
          <p className="text-3xl font-black text-white">{formatCurrency(metrics.averageDealSize)}</p>
          <p className="text-xs text-slate-500 mt-2">LTV: {formatCurrency(metrics.lifetimeValue)}</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold text-white">Conversion Rate</h3>
          </div>
          <p className="text-4xl font-black text-green-400 mb-2">{metrics.conversionRate.toFixed(1)}%</p>
          <p className="text-sm text-slate-400">Visitor to customer conversion</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-bold text-white">Sales Cycle</h3>
          </div>
          <p className="text-4xl font-black text-blue-400 mb-2">{metrics.salesCycleLength} days</p>
          <p className="text-sm text-slate-400">Average time to close</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Active Subscriptions</h3>
          </div>
          <p className="text-4xl font-black text-amber-400 mb-2">{metrics.activeSubscriptions}</p>
          <p className="text-sm text-slate-400">Recurring revenue streams</p>
        </div>
      </div>

      {/* Recent Sales Activities & Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Activities</h3>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No recent activities</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-white truncate">{activity.customerName}</p>
                      <span className={`text-sm font-bold ${getActivityColor(activity.type)}`}>
                        {formatCurrency(activity.amount)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{activity.plan}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Top Customers</h3>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {topCustomers.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No customer data available</p>
            ) : (
              topCustomers.map((customer, index) => (
                <div key={customer.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-white truncate">{customer.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(customer.status)}`}>
                        {customer.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{customer.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-slate-500">MRR: <span className="text-green-400 font-bold">{formatCurrency(customer.mrr)}</span></span>
                      <span className="text-xs text-slate-500">LTV: <span className="text-blue-400 font-bold">{formatCurrency(customer.ltv)}</span></span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <BarChart3 className="w-6 h-6 text-amber-400 mb-2" />
            <p className="text-sm font-medium text-white">Sales Report</p>
            <p className="text-xs text-slate-400 mt-1">Generate detailed report</p>
          </button>
          <button className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <Users className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-sm font-medium text-white">Customer List</p>
            <p className="text-xs text-slate-400 mt-1">View all customers</p>
          </button>
          <button className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <Target className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-sm font-medium text-white">Pipeline View</p>
            <p className="text-xs text-slate-400 mt-1">Manage deals</p>
          </button>
          <button className="p-4 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-left">
            <Calendar className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-sm font-medium text-white">Forecast</p>
            <p className="text-xs text-slate-400 mt-1">Revenue projections</p>
          </button>
        </div>
      </div>
    </div>
  );
};
