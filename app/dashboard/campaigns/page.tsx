'use client';

import React, { useState } from 'react';
import { 
  Megaphone, Plus, Play, Pause, BarChart3, 
  Mail, MessageSquare, Phone, TrendingUp, Users
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'voice' | 'multi-channel';
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  targetAudience: number;
  reached: number;
  responses: number;
  conversions: number;
  budget: number;
  spent: number;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: 'camp_001',
      name: 'New Customer Acquisition',
      type: 'multi-channel',
      status: 'active',
      startDate: '2026-01-01',
      targetAudience: 1000,
      reached: 750,
      responses: 45,
      conversions: 12,
      budget: 5000,
      spent: 3200,
    },
    {
      id: 'camp_002',
      name: 'Renewal Reminder Campaign',
      type: 'email',
      status: 'active',
      startDate: '2026-01-05',
      targetAudience: 500,
      reached: 480,
      responses: 120,
      conversions: 85,
      budget: 1000,
      spent: 800,
    },
    {
      id: 'camp_003',
      name: 'Upgrade Promotion',
      type: 'sms',
      status: 'paused',
      startDate: '2025-12-15',
      endDate: '2026-01-10',
      targetAudience: 300,
      reached: 280,
      responses: 35,
      conversions: 18,
      budget: 2000,
      spent: 1850,
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      case 'voice': return <Phone className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'completed': return 'bg-zinc-700/50 text-zinc-400 border-zinc-600';
      default: return 'bg-zinc-700/50 text-zinc-400 border-zinc-600';
    }
  };

  const totalStats = {
    activeCampaigns: campaigns.filter(c => c.status === 'active').length,
    totalReached: campaigns.reduce((sum, c) => sum + c.reached, 0),
    totalResponses: campaigns.reduce((sum, c) => sum + c.responses, 0),
    totalConversions: campaigns.reduce((sum, c) => sum + c.conversions, 0),
    totalBudget: campaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: campaigns.reduce((sum, c) => sum + c.spent, 0),
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
            Marketing Campaigns
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Multi-Channel Campaigns • AI-Powered Targeting • Performance Analytics
          </p>
        </div>
        <button className="px-6 py-3 bg-cyan-500 text-black font-black uppercase tracking-tight text-sm rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="w-5 h-5 text-cyan-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Active Campaigns
            </p>
          </div>
          <p className="text-3xl font-black">{totalStats.activeCampaigns}</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Total Reached
            </p>
          </div>
          <p className="text-3xl font-black">{totalStats.totalReached.toLocaleString()}</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Conversions
            </p>
          </div>
          <p className="text-3xl font-black">{totalStats.totalConversions}</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-purple-500" />
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
              Budget Used
            </p>
          </div>
          <p className="text-3xl font-black">
            {Math.round((totalStats.totalSpent / totalStats.totalBudget) * 100)}%
          </p>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-black uppercase tracking-tight mb-6">All Campaigns</h2>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    {getTypeIcon(campaign.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black mb-1">{campaign.name}</h3>
                    <p className="text-xs text-zinc-500">
                      Started {new Date(campaign.startDate).toLocaleDateString()}
                      {campaign.endDate && ` • Ends ${new Date(campaign.endDate).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  {campaign.status === 'active' ? (
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <Pause className="w-4 h-4 text-zinc-400" />
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                      <Play className="w-4 h-4 text-zinc-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Reached</p>
                  <p className="text-lg font-black">
                    {campaign.reached}/{campaign.targetAudience}
                  </p>
                  <div className="w-full bg-zinc-800 rounded-full h-1 mt-2">
                    <div
                      className="bg-cyan-500 h-1 rounded-full"
                      style={{ width: `${(campaign.reached / campaign.targetAudience) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Responses</p>
                  <p className="text-lg font-black">{campaign.responses}</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    {((campaign.responses / campaign.reached) * 100).toFixed(1)}% rate
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Conversions</p>
                  <p className="text-lg font-black text-green-400">{campaign.conversions}</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    {((campaign.conversions / campaign.reached) * 100).toFixed(1)}% rate
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Budget</p>
                  <p className="text-lg font-black">${campaign.budget.toLocaleString()}</p>
                  <p className="text-xs text-zinc-600 mt-1">
                    ${campaign.spent.toLocaleString()} spent
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">ROI</p>
                  <p className="text-lg font-black text-purple-400">
                    {((campaign.conversions * 3000 - campaign.spent) / campaign.spent * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-zinc-600 mt-1">Estimated</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
