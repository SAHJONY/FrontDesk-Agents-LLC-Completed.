'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Target, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Cpu, 
  Plus, 
  Activity,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

const AGENT_TYPES = [
  {
    id: 'closer',
    name: 'Sovereign Closer',
    specialization: 'High-Ticket Negotiation',
    description: 'Utilizes Game Theory RL to maximize deal size and closing velocity. Optimized for revenue conversion.',
    metrics: { conversion: '+24%', efficiency: '99.8%' },
    icon: Target,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/5',
    border: 'border-cyan-500/20'
  },
  {
    id: 'qualifier',
    name: 'Neural Qualifier',
    specialization: 'Lead Triage & Intent Analysis',
    description: 'Separates window shoppers from high-intent buyers using predictive behavioral modeling.',
    metrics: { accuracy: '96.4%', latency: '0.8s' },
    icon: BrainCircuit,
    color: 'text-purple-500',
    bg: 'bg-purple-500/5',
    border: 'border-purple-500/20'
  },
  {
    id: 'guardian',
    name: 'Retention Guardian',
    specialization: 'Churn Mitigation',
    description: 'Monitors sentiment oscillations to detect dissatisfaction and deploy preemptive retention protocols.',
    metrics: { retention: '+18%', ltv_boost: '1.5x' },
    icon: ShieldAlert,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20'
  }
];

export default function HiringHall() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#020305] text-[#e2e8f0] p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 text-cyan-500 mb-4">
              <Cpu className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Neural Workforce Management</span>
            </div>
            <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
              Agentic <span className="text-slate-500">Hiring Hall</span>
            </h1>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest max-w-sm lg:text-right border-r-2 border-cyan-500/30 pr-6">
            Provision specialized RL-Agents to maximize your institutional profit yield.
          </p>
        </div>

        {/* --- ACTIVE WORKFORCE STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-[#080a0f] border border-white/5 rounded-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Yield Boost</p>
              <h3 className="text-3xl font-black text-white italic">+31.4%</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-cyan-500 opacity-50" />
          </div>
          <div className="p-8 bg-[#080a0f] border border-white/5 rounded-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Active Synthesis Nodes</p>
              <h3 className="text-3xl font-black text-white italic">14</h3>
            </div>
            <Activity className="w-8 h-8 text-purple-500 opacity-50" />
          </div>
          <div className="p-8 bg-[#080a0f] border border-white/5 rounded-sm flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Average Close Rate</p>
              <h3 className="text-3xl font-black text-white italic">82.1%</h3>
            </div>
            <Zap className="w-8 h-8 text-emerald-500 opacity-50" />
          </div>
        </div>

        {/* --- AGENT SELECTION --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          {AGENT_TYPES.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`relative cursor-pointer group transition-all duration-500 p-10 rounded-sm border ${
                selectedAgent === agent.id 
                ? `${agent.border} ${agent.bg} scale-[1.02]` 
                : 'border-white/5 bg-[#080a0f] hover:border-white/20'
              }`}
            >
              <agent.icon className={`w-12 h-12 ${agent.color} mb-8 transition-transform group-hover:rotate-12`} />
              
              <h2 className="text-2xl font-black uppercase italic text-white tracking-tighter mb-2">
                {agent.name}
              </h2>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-6">
                {agent.specialization}
              </p>
              
              <p className="text-[11px] leading-relaxed text-slate-400 font-medium mb-10 tracking-wide">
                {agent.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10 pt-6 border-t border-white/5">
                {Object.entries(agent.metrics).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{key}</p>
                    <p className={`text-sm font-black italic ${agent.color}`}>{val}</p>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all ${
                selectedAgent === agent.id 
                ? 'bg-white text-black' 
                : 'bg-white/5 text-white hover:bg-white hover:text-black'
              }`}>
                Deploy Node <Plus className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* --- DEPLOYMENT FOOTER --- */}
        {selectedAgent && (
          <div className="mt-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="p-12 border border-cyan-500/20 bg-cyan-500/[0.02] flex flex-col lg:flex-row items-center justify-between gap-8 rounded-sm">
              <div className="max-w-xl">
                <h4 className="text-xl font-black uppercase italic text-white mb-2">Initialize Deployment?</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  You are about to provision an <span className="text-cyan-500">RL-Agent</span> onto your market node. This agent will immediately begin knowledge ingestion and sales synthesis.
                </p>
              </div>
              <div className="flex gap-4 w-full lg:w-auto">
                <button className="flex-1 lg:px-12 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-cyan-500 transition-all">
                  Confirm Provisioning
                </button>
                <button className="flex-1 lg:px-12 py-5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 transition-all">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
      }
