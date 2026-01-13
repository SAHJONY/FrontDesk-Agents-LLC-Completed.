'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, Mail, MessageSquare, Target, Brain, TrendingUp, 
  Users, BarChart2, Plus, RefreshCw, Settings
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'draft';
  industry: string;
  region: string;
  leadsGenerated: number;
  contacted: number;
  responses: number;
  conversions: number;
  createdAt: string;
}

export default function OutreachDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeLeads: 0,
    totalResponses: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch campaigns from global-sales API
      const response = await fetch('/api/global-sales?action=list_campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
        
        // Calculate stats
        const totalLeads = data.campaigns?.reduce((sum: number, c: Campaign) => sum + c.leadsGenerated, 0) || 0;
        const totalResponses = data.campaigns?.reduce((sum: number, c: Campaign) => sum + c.responses, 0) || 0;
        const totalConversions = data.campaigns?.reduce((sum: number, c: Campaign) => sum + c.conversions, 0) || 0;
        
        setStats({
          totalCampaigns: data.campaigns?.length || 0,
          activeLeads: totalLeads,
          totalResponses: totalResponses,
          conversionRate: totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0,
        });
      }
    } catch (error) {
      console.error('Error fetching outreach data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCampaign = () => {
    window.location.href = '/owner/outreach/create';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400 font-mono uppercase tracking-widest text-sm">
            Loading Outreach System...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
              Autonomous Outreach
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Global Sales Workforce • AI-Powered Lead Generation
            </p>
          </div>
          <button
            onClick={handleCreateCampaign}
            className="px-6 py-3 bg-cyan-500 text-black font-black uppercase tracking-tight text-sm rounded-xl hover:bg-cyan-400 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            Create Campaign
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-cyan-500" />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Campaigns
              </p>
            </div>
            <p className="text-3xl font-black">{stats.totalCampaigns}</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-green-500" />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Active Leads
              </p>
            </div>
            <p className="text-3xl font-black">{stats.activeLeads.toLocaleString()}</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Responses
              </p>
            </div>
            <p className="text-3xl font-black">{stats.totalResponses.toLocaleString()}</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Conversion Rate
              </p>
            </div>
            <p className="text-3xl font-black">{stats.conversionRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black uppercase tracking-tight">
              Active Campaigns
            </h2>
            <button
              onClick={fetchData}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest mb-6">
                No campaigns yet
              </p>
              <button
                onClick={handleCreateCampaign}
                className="px-6 py-3 bg-zinc-800 text-white font-black uppercase tracking-tight text-sm rounded-xl hover:bg-zinc-700 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Your First Campaign
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-black mb-1">{campaign.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                        {campaign.industry} • {campaign.region}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        campaign.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : campaign.status === 'paused'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-zinc-700/50 text-zinc-400'
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                        Leads
                      </p>
                      <p className="text-xl font-black">{campaign.leadsGenerated.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                        Contacted
                      </p>
                      <p className="text-xl font-black">{campaign.contacted.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                        Responses
                      </p>
                      <p className="text-xl font-black">{campaign.responses.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                        Conversions
                      </p>
                      <p className="text-xl font-black text-cyan-400">{campaign.conversions.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all text-left group">
            <Mail className="w-8 h-8 text-cyan-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-black uppercase tracking-tight mb-2">Email Campaigns</h3>
            <p className="text-xs text-zinc-500">Launch targeted email outreach</p>
          </button>

          <button className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-green-500/50 transition-all text-left group">
            <MessageSquare className="w-8 h-8 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-black uppercase tracking-tight mb-2">SMS Outreach</h3>
            <p className="text-xs text-zinc-500">Direct SMS to qualified leads</p>
          </button>

          <button className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all text-left group">
            <BarChart2 className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-black uppercase tracking-tight mb-2">Analytics</h3>
            <p className="text-xs text-zinc-500">View detailed performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
}
