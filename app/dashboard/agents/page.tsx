'use client';

import React, { useState } from 'react';
import { Radio, Mic, Plus, Settings, Phone, BarChart3, Zap, Users, TrendingUp } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: 'inbound_receptionist' | 'outbound_qualifier' | 'customer_support' | 'sales_closer';
  status: 'active' | 'idle' | 'training';
  language: 'en' | 'es' | 'multi';
  phoneNumber?: string;
  callsHandled: number;
  conversionRate: number;
  revenue: number;
}

const AGENT_ROLES = [
  {
    id: 'inbound_receptionist',
    name: 'Inbound Receptionist',
    description: 'Handles incoming calls, qualifies leads, books appointments',
    icon: Phone,
    color: 'cyan'
  },
  {
    id: 'outbound_qualifier',
    name: 'Outbound Lead Qualifier',
    description: 'Proactively reaches out to leads, qualifies and nurtures',
    icon: TrendingUp,
    color: 'purple'
  },
  {
    id: 'customer_support',
    name: 'Customer Support Specialist',
    description: 'Handles customer inquiries, resolves issues, provides information',
    icon: Users,
    color: 'green'
  },
  {
    id: 'sales_closer',
    name: 'Sales Closer',
    description: 'Closes deals, handles objections, maximizes revenue',
    icon: Zap,
    color: 'orange'
  }
];

export default function AIAgentFleet() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Maria Rodriguez',
      role: 'inbound_receptionist',
      status: 'active',
      language: 'multi',
      phoneNumber: '+1 (555) 123-4567',
      callsHandled: 247,
      conversionRate: 68,
      revenue: 12450
    },
    {
      id: '2',
      name: 'Alex Chen',
      role: 'outbound_qualifier',
      status: 'active',
      language: 'en',
      phoneNumber: '+1 (555) 987-6543',
      callsHandled: 189,
      conversionRate: 42,
      revenue: 8920
    }
  ]);

  const [newAgent, setNewAgent] = useState({
    name: '',
    role: 'inbound_receptionist' as const,
    language: 'en' as const
  });

  const handleCreateAgent = () => {
    const agent: Agent = {
      id: Date.now().toString(),
      name: newAgent.name,
      role: newAgent.role,
      status: 'training',
      language: newAgent.language,
      callsHandled: 0,
      conversionRate: 0,
      revenue: 0
    };
    
    setAgents([...agents, agent]);
    setShowCreateModal(false);
    setNewAgent({ name: '', role: 'inbound_receptionist', language: 'en' });
  };

  const totalCalls = agents.reduce((sum, agent) => sum + agent.callsHandled, 0);
  const totalRevenue = agents.reduce((sum, agent) => sum + agent.revenue, 0);
  const avgConversion = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.conversionRate, 0) / agents.length 
    : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Radio className="w-6 h-6 text-green-500 animate-pulse" />
          <div>
            <h1 className="text-3xl font-bold text-white">AI Agent Workforce</h1>
            <p className="text-slate-400 text-sm mt-1">Manage your autonomous revenue team</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create New Agent
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Active Agents</span>
            <Users className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-white">{agents.filter(a => a.status === 'active').length}</div>
          <div className="text-xs text-slate-500 mt-1">of {agents.length} total</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Calls</span>
            <Phone className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{totalCalls.toLocaleString()}</div>
          <div className="text-xs text-green-500 mt-1">+24% this week</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Avg Conversion</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{avgConversion.toFixed(1)}%</div>
          <div className="text-xs text-green-500 mt-1">+5.2% vs last month</div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Revenue Generated</span>
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-3xl font-bold text-white">${(totalRevenue / 1000).toFixed(1)}k</div>
          <div className="text-xs text-green-500 mt-1">+18% this month</div>
        </div>
      </div>

      {/* Agent List */}
      <div className="grid gap-4">
        {agents.map(agent => {
          const roleInfo = AGENT_ROLES.find(r => r.id === agent.role);
          const RoleIcon = roleInfo?.icon || Mic;
          
          return (
            <div key={agent.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg bg-${roleInfo?.color}-500/20 flex items-center justify-center`}>
                    <RoleIcon className={`w-6 h-6 text-${roleInfo?.color}-400`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{agent.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        agent.status === 'training' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">
                        {agent.language === 'multi' ? 'Multilingual' : agent.language.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm mb-3">{roleInfo?.description}</p>
                    
                    {agent.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Phone className="w-4 h-4" />
                        {agent.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>

                <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Agent Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
                <div>
                  <div className="text-2xl font-bold text-white">{agent.callsHandled}</div>
                  <div className="text-xs text-slate-500">Calls Handled</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{agent.conversionRate}%</div>
                  <div className="text-xs text-slate-500">Conversion Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">${agent.revenue.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Revenue Generated</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Agent Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-2xl font-bold text-white">Create New AI Agent</h2>
              <p className="text-slate-400 text-sm mt-1">Configure your new autonomous revenue team member</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g., Maria Rodriguez, Alex Chen"
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500 mt-1">Give your agent a human-like identity for better customer rapport</p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Agent Role
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {AGENT_ROLES.map(role => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => setNewAgent({ ...newAgent, role: role.id as any })}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          newAgent.role === role.id
                            ? `border-${role.color}-500 bg-${role.color}-500/10`
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Icon className={`w-5 h-5 text-${role.color}-400 mt-0.5`} />
                          <div>
                            <div className="font-semibold text-white">{role.name}</div>
                            <div className="text-sm text-slate-400 mt-1">{role.description}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Primary Language
                </label>
                <select
                  value={newAgent.language}
                  onChange={(e) => setNewAgent({ ...newAgent, language: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="multi">Multilingual (50+ languages)</option>
                </select>
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAgent}
                disabled={!newAgent.name}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold rounded-lg transition-colors"
              >
                Create Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
