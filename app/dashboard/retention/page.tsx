'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, AlertTriangle, 
  CheckCircle, RefreshCw, Target, Heart, DollarSign
} from 'lucide-react';

interface RetentionMetrics {
  retentionRate: number;
  churnRate: number;
  atRiskCustomers: number;
  savedCustomers: number;
  expansionRevenue: number;
  netRetention: number;
}

interface AtRiskCustomer {
  id: string;
  name: string;
  riskScore: number;
  riskFactors: string[];
  mrr: number;
  daysUntilChurn: number;
  recommendedAction: string;
}

export default function RetentionPage() {
  const [metrics, setMetrics] = useState<RetentionMetrics>({
    retentionRate: 97.9,
    churnRate: 2.1,
    atRiskCustomers: 8,
    savedCustomers: 15,
    expansionRevenue: 5400,
    netRetention: 115.5,
  });

  const [atRiskCustomers, setAtRiskCustomers] = useState<AtRiskCustomer[]>([
    {
      id: 'cust_007',
      name: 'Green Valley Medical',
      riskScore: 78,
      riskFactors: ['Low usage', 'Support tickets', 'Payment delays'],
      mrr: 900,
      daysUntilChurn: 14,
      recommendedAction: 'Schedule check-in call',
    },
    {
      id: 'cust_015',
      name: 'Quick Stop Retail',
      riskScore: 85,
      riskFactors: ['No logins in 30 days', 'Budget concerns'],
      mrr: 500,
      daysUntilChurn: 7,
      recommendedAction: 'Offer discount or downgrade',
    },
    {
      id: 'cust_023',
      name: 'Sunset Dental',
      riskScore: 65,
      riskFactors: ['Decreased call volume', 'Competitor inquiry'],
      mrr: 750,
      daysUntilChurn: 21,
      recommendedAction: 'Share success stories',
    },
  ]);

  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-red-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 80) return 'bg-red-500/20 border-red-500/50';
    if (score >= 60) return 'bg-yellow-500/20 border-yellow-500/50';
    return 'bg-green-500/20 border-green-500/50';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
            Customer Retention
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Churn Prevention • Risk Analysis • Retention Campaigns
          </p>
        </div>
        <button
          onClick={refreshData}
          disabled={loading}
          className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-green-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Retention Rate
            </p>
          </div>
          <p className="text-3xl font-black mb-1">{metrics.retentionRate}%</p>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +2.3% from last month
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              At Risk
            </p>
          </div>
          <p className="text-3xl font-black mb-1">{metrics.atRiskCustomers}</p>
          <p className="text-xs text-zinc-600">
            ${atRiskCustomers.reduce((sum, c) => sum + c.mrr, 0)}/mo at risk
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-cyan-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Saved This Month
            </p>
          </div>
          <p className="text-3xl font-black mb-1">{metrics.savedCustomers}</p>
          <p className="text-xs text-cyan-500">
            AI retention campaigns active
          </p>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Churn Rate</p>
          <p className="text-2xl font-black mb-1">{metrics.churnRate}%</p>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            -0.8% improvement
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Net Retention</p>
          <p className="text-2xl font-black mb-1">{metrics.netRetention}%</p>
          <p className="text-xs text-zinc-600">Includes expansion revenue</p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Expansion Revenue</p>
          <p className="text-2xl font-black mb-1">${(metrics.expansionRevenue / 1000).toFixed(1)}K</p>
          <p className="text-xs text-zinc-600">From upgrades this month</p>
        </div>
      </div>

      {/* At-Risk Customers */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          At-Risk Customers
        </h2>

        <div className="space-y-4">
          {atRiskCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`p-6 rounded-xl border ${getRiskBgColor(customer.riskScore)} hover:scale-[1.01] transition-all`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black mb-1">{customer.name}</h3>
                  <p className="text-xs text-zinc-500">
                    ${customer.mrr}/mo • {customer.daysUntilChurn} days until potential churn
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-black ${getRiskColor(customer.riskScore)}`}>
                    {customer.riskScore}
                  </p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Risk Score</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Risk Factors</p>
                <div className="flex flex-wrap gap-2">
                  {customer.riskFactors.map((factor, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-full text-xs"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    Recommended Action
                  </p>
                  <p className="text-sm font-bold text-cyan-400">{customer.recommendedAction}</p>
                </div>
                <button className="px-4 py-2 bg-cyan-500 text-black font-black uppercase text-xs rounded-lg hover:bg-cyan-400 transition-all">
                  Take Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Strategies */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <Target className="w-8 h-8 text-cyan-500 mb-3" />
          <h3 className="font-black uppercase tracking-tight mb-2">Proactive Outreach</h3>
          <p className="text-xs text-zinc-500">
            AI agents automatically reach out to at-risk customers with personalized retention offers
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <Users className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-black uppercase tracking-tight mb-2">Usage Monitoring</h3>
          <p className="text-xs text-zinc-500">
            Track customer engagement and identify declining usage patterns early
          </p>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <DollarSign className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="font-black uppercase tracking-tight mb-2">Win-Back Campaigns</h3>
          <p className="text-xs text-zinc-500">
            Automated campaigns to re-engage churned customers with special offers
          </p>
        </div>
      </div>
    </div>
  );
}
