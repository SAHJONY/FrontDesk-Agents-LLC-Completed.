import React, { useEffect, useState } from 'react';
import { 
  Zap, Mail, MessageSquare, Phone, Target, Brain,
  Play, Pause, Settings, TrendingUp, Users, Clock,
  CheckCircle, XCircle, AlertCircle, BarChart2
} from 'lucide-react';

interface OutreachCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  type: 'email' | 'sms' | 'multi-channel';
  leadsTargeted: number;
  leadsContacted: number;
  responses: number;
  conversions: number;
  responseRate: number;
  conversionRate: number;
  createdAt: string;
  lastActivity: string;
}

interface LeadScore {
  id: string;
  name: string;
  email: string;
  phone?: string;
  score: number;
  status: 'new' | 'contacted' | 'responded' | 'converted' | 'cold';
  source: string;
  lastContact?: string;
  nextAction?: string;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  executionCount: number;
}

export const AutonomousOutreach = () => {
  const [campaigns, setCampaigns] = useState<OutreachCampaign[]>([]);
  const [leads, setLeads] = useState<LeadScore[]>([]);
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    activeOutreach: 0,
    avgResponseTime: 0,
    totalResponses: 0,
    totalConversions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showNewCampaign, setShowNewCampaign] = useState(false);

  useEffect(() => {
    fetchOutreachData();
  }, []);

  const fetchOutreachData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Fetch campaigns
      const campaignsRes = await fetch('/api/owner/outreach/campaigns', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const campaignsData = await campaignsRes.json();
      setCampaigns(campaignsData.campaigns || []);

      // Fetch leads with scores
      const leadsRes = await fetch('/api/owner/outreach/leads', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const leadsData = await leadsRes.json();
      setLeads(leadsData.leads || []);

      // Fetch automation rules
      const rulesRes = await fetch('/api/owner/outreach/rules', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const rulesData = await rulesRes.json();
      setRules(rulesData.rules || []);

      // Fetch stats
      const statsRes = await fetch('/api/owner/outreach/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching outreach data:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/owner/outreach/campaigns/${campaignId}/trigger`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchOutreachData();
    } catch (error) {
      console.error('Error triggering campaign:', error);
    }
  };

  const pauseCampaign = async (campaignId: string) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/owner/outreach/campaigns/${campaignId}/pause`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      fetchOutreachData();
    } catch (error) {
      console.error('Error pausing campaign:', error);
    }
  };

  const toggleRule = async (ruleId: string, enabled: boolean) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/owner/outreach/rules/${ruleId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled })
      });
      fetchOutreachData();
    } catch (error) {
      console.error('Error toggling rule:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-blue-400 bg-blue-500/20';
    if (score >= 40) return 'text-amber-400 bg-amber-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getStatusBadge = (status: LeadScore['status']) => {
    const badges = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      contacted: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
      responded: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      converted: 'bg-green-500/20 text-green-400 border-green-500/50',
      cold: 'bg-slate-500/20 text-slate-400 border-slate-500/50',
    };
    return badges[status];
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
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-white">Autonomous Outreach</h2>
          </div>
          <p className="text-slate-400">AI-powered lead qualification and automated multi-channel campaigns</p>
        </div>
        <button
          onClick={() => setShowNewCampaign(true)}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Play className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-sm font-bold text-blue-400">
              {stats.qualifiedLeads} qualified
            </span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Total Leads</p>
          <p className="text-3xl font-black text-white">{stats.totalLeads.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-amber-400" />
            <span className="text-sm font-bold text-amber-400">
              {campaigns.filter(c => c.status === 'active').length} active
            </span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Active Outreach</p>
          <p className="text-3xl font-black text-white">{stats.activeOutreach.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-sm font-bold text-green-400">
              {stats.totalResponses > 0 ? ((stats.totalResponses / stats.activeOutreach) * 100).toFixed(1) : 0}% rate
            </span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Responses</p>
          <p className="text-3xl font-black text-white">{stats.totalResponses.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-sm font-bold text-purple-400">
              {stats.totalResponses > 0 ? ((stats.totalConversions / stats.totalResponses) * 100).toFixed(1) : 0}% rate
            </span>
          </div>
          <p className="text-slate-400 text-xs uppercase font-bold mb-1">Conversions</p>
          <p className="text-3xl font-black text-white">{stats.totalConversions.toLocaleString()}</p>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Active Campaigns</h3>
          <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 mb-4">No campaigns yet. Create your first autonomous outreach campaign!</p>
              <button
                onClick={() => setShowNewCampaign(true)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg transition-colors"
              >
                Create Campaign
              </button>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-slate-800/50 rounded-lg p-6 hover:bg-slate-800 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-white">{campaign.name}</h4>
                      <span className={`text-xs px-3 py-1 rounded-full border ${
                        campaign.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/50' :
                        campaign.status === 'paused' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' :
                        'bg-slate-500/20 text-slate-400 border-slate-500/50'
                      }`}>
                        {campaign.status}
                      </span>
                      {campaign.type === 'email' && <Mail className="w-4 h-4 text-slate-400" />}
                      {campaign.type === 'sms' && <MessageSquare className="w-4 h-4 text-slate-400" />}
                      {campaign.type === 'multi-channel' && <Target className="w-4 h-4 text-slate-400" />}
                    </div>
                    <p className="text-sm text-slate-400">
                      Last activity: {new Date(campaign.lastActivity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {campaign.status === 'active' ? (
                      <button
                        onClick={() => pauseCampaign(campaign.id)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Pause campaign"
                      >
                        <Pause className="w-5 h-5 text-amber-400" />
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerCampaign(campaign.id)}
                        className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        title="Start campaign"
                      >
                        <Play className="w-5 h-5 text-green-400" />
                      </button>
                    )}
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Settings className="w-5 h-5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Campaign Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Targeted</p>
                    <p className="text-lg font-bold text-white">{campaign.leadsTargeted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Contacted</p>
                    <p className="text-lg font-bold text-blue-400">{campaign.leadsContacted}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Responses</p>
                    <p className="text-lg font-bold text-green-400">{campaign.responses}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Response Rate</p>
                    <p className="text-lg font-bold text-amber-400">{campaign.responseRate.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Conversions</p>
                    <p className="text-lg font-bold text-purple-400">{campaign.conversions}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lead Scoring & Automation Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scored Leads */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Top Scored Leads</h3>
            </div>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold ${getScoreColor(lead.score)}`}>
                  {lead.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-white truncate">{lead.name}</p>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{lead.email}</p>
                  {lead.nextAction && (
                    <p className="text-xs text-amber-400 mt-1">→ {lead.nextAction}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Rules */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Automation Rules</h3>
            </div>
            <button className="text-sm text-amber-400 hover:text-amber-300 font-medium">
              Add Rule →
            </button>
          </div>
          <div className="space-y-3">
            {rules.map((rule) => (
              <div key={rule.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                <button
                  onClick={() => toggleRule(rule.id, !rule.enabled)}
                  className={`flex-shrink-0 w-12 h-6 rounded-full transition-colors ${
                    rule.enabled ? 'bg-green-500' : 'bg-slate-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    rule.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white mb-1">{rule.name}</p>
                  <p className="text-xs text-slate-400">
                    When <span className="text-amber-400">{rule.trigger}</span> → <span className="text-green-400">{rule.action}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Executed {rule.executionCount} times</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
