'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: Outbound Campaigns (Growth $799+ Access Only)
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Plus, Play, Pause, TrendingUp, Users, Phone, CheckCircle, Zap, BarChart3 } from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  callsMade: number;
  callsSuccessful: number;
  leadsQualified: number;
  targetCount: number;
  createdAt: string;
}

export default function CampaignsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // Enforce Permanent Tier Access
    if (!['growth', 'elite'].includes(user.tier)) {
      router.push('/dashboard');
      return;
    }
    fetchCampaigns();
  }, [user, router]);

  async function fetchCampaigns() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/campaigns/list?tenant_id=${user?.tenant_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active': return 'border-green-500/20 text-green-400 bg-green-500/5';
      case 'paused': return 'border-yellow-500/20 text-yellow-400 bg-yellow-500/5';
      case 'completed': return 'border-blue-500/20 text-blue-400 bg-blue-500/5';
      default: return 'border-zinc-800 text-zinc-500 bg-zinc-900/50';
    }
  };

  if (!user || !['growth', 'elite'].includes(user.tier)) return null;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Outbound Matrix</h1>
            <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mt-1">
              Automated Revenue Generation Engine
            </p>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            <Plus className="w-4 h-4" />
            <span>Launch Campaign</span>
          </button>
        </div>

        {/* Global Analytics Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Active Ops', val: campaigns.filter(c => c.status === 'active').length, icon: <Zap />, color: 'text-blue-400' },
            { label: 'Fleet Output', val: campaigns.reduce((sum, c) => sum + c.callsMade, 0), icon: <Phone />, color: 'text-white' },
            { label: 'Connect Rate', val: `${campaigns.length > 0 ? Math.round((campaigns.reduce((sum, c) => sum + c.callsSuccessful, 0) / Math.max(1, campaigns.reduce((sum, c) => sum + c.callsMade, 0))) * 100) : 0}%`, icon: <CheckCircle />, color: 'text-green-500' },
            { label: 'Revenue Leads', val: campaigns.reduce((sum, c) => sum + c.leadsQualified, 0), icon: <Users />, color: 'text-purple-500' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">{stat.icon}</div>
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
               <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Campaign Nodes */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-40 bg-zinc-900/50 rounded-3xl animate-pulse" />)}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-zinc-800 p-20 text-center bg-zinc-950/50">
            <BarChart3 className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2">System Idle</h3>
            <p className="text-zinc-500 text-sm mb-8">No outbound campaigns currently active. Initialize leads to begin.</p>
            <button className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors">
              Initialize First Operation
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="glass-panel group rounded-3xl border border-zinc-800 bg-zinc-950/50 hover:border-blue-500/50 transition-all p-8">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-black tracking-tight">{campaign.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Dials</p>
                        <p className="text-lg font-black">{campaign.callsMade.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Successful</p>
                        <p className="text-lg font-black text-green-500">{campaign.callsSuccessful.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Qualified</p>
                        <p className="text-lg font-black text-purple-500">{campaign.leadsQualified.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Conversion</p>
                        <p className="text-lg font-black text-blue-500">
                          {campaign.callsMade > 0 ? Math.round((campaign.leadsQualified / campaign.callsMade) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-64 flex flex-col justify-center">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Saturation</p>
                      <p className="text-xs font-mono font-bold text-blue-400">
                        {Math.round((campaign.callsMade / campaign.targetCount) * 100)}%
                      </p>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(campaign.callsMade / campaign.targetCount) * 100}%` }}
                      />
                    </div>
                    <div className="flex gap-2 mt-6">
                      <button className="flex-1 bg-zinc-900 border border-zinc-800 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800">
                        Settings
                      </button>
                      <button className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-blue-500">
                        {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
        }
