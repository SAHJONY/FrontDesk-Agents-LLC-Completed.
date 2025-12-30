'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Node Status: Real-time Workforce Deployment Ledger
 */

import React, { useEffect, useState } from 'react';
import { 
  Cpu, 
  Activity, 
  Gavel, 
  ShieldAlert, 
  Zap,
  Radio,
  PowerOff
} from 'lucide-react';

interface NodeData {
  type: 'receptionist' | 'qualification' | 'legal_agent' | 'priority';
  status: 'active' | 'idle' | 'offline';
  phoneNumber: string;
  currentCalls: number;
  todayCalls: number;
  qualifiedLeads: number;
}

export default function NodeStatus({ tenantId }: { tenantId: string }) {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNodeStatus();
    const interval = setInterval(fetchNodeStatus, 10000); // 10s High-frequency polling
    return () => clearInterval(interval);
  }, [tenantId]);

  async function fetchNodeStatus() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/dashboard/nodes?tenant_id=${tenantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setNodes(data.nodes);
      }
    } catch (error) {
      console.error('[NODES] Telemetry sync failed:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active': return { color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      case 'idle': return { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
      default: return { color: 'text-zinc-500', bg: 'bg-zinc-900', border: 'border-zinc-800' };
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'legal_agent': return <Gavel className="w-4 h-4" />;
      case 'priority': return <ShieldAlert className="w-4 h-4" />;
      case 'qualification': return <Cpu className="w-4 h-4" />;
      default: return <Radio className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-zinc-900 rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-zinc-900/50 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Agentic Fleet</h3>
          <p className="text-[10px] text-blue-500 font-mono font-bold uppercase tracking-widest">Global Workforce Status</p>
        </div>
        <Zap className="w-4 h-4 text-blue-500 fill-blue-500/10" />
      </div>
      
      {nodes.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-[2rem]">
          <PowerOff className="w-10 h-10 mx-auto mb-4 text-zinc-800" />
          <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Zero Active Nodes</p>
          <button className="mt-4 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">
            + Provision Number
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {nodes.map((node, index) => {
            const config = getStatusConfig(node.status);
            return (
              <div
                key={index}
                className="group bg-zinc-900/30 border border-zinc-900 rounded-3xl p-5 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${config.bg} ${config.color}`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-tight text-white italic">
                        {node.type.replace('_', ' ')} node
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500 mt-0.5">{node.phoneNumber}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${config.border} ${config.bg}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text', 'bg')} animate-pulse`} />
                    <span className={`text-[8px] font-black uppercase tracking-widest ${config.color}`}>
                      {node.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-zinc-900/50 pt-5">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter mb-1">Live</p>
                    <p className="text-sm font-black text-white">{node.currentCalls}</p>
                  </div>
                  <div className="text-center border-x border-zinc-900/50">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter mb-1">Today</p>
                    <p className="text-sm font-black text-white">{node.todayCalls}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-tighter mb-1">Qualified</p>
                    <p className="text-sm font-black text-green-500">{node.qualifiedLeads}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
