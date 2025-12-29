import React from 'react';
import { Mic, Shield, Radio } from 'lucide-react';

export default function AIAgentFleet() {
  const agents = [
    { name: 'Elite-Sovereign-01', status: 'Live', type: 'Sales Outbound' },
    { name: 'Global-Reception-04', status: 'Idle', type: 'Inbound' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto relative z-10">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black italic">FLEET DEPLOYMENT</h1>
          <p className="text-brand-cyan text-xs font-mono uppercase tracking-[0.3em]">Agent Capacity: Unlimited (Elite)</p>
        </div>
        <button className="bg-brand-cyan text-black px-6 py-2 rounded-lg font-bold uppercase text-xs">Deploy Agent</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent, i) => (
          <div key={i} className="titan-card flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-cyan/10 rounded-full">
                <Mic className="text-brand-cyan w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{agent.name}</h3>
                <p className="text-slate-500 text-xs">{agent.type}</p>
              </div>
            </div>
            <span className="text-green-400 font-mono text-[10px] uppercase font-bold animate-pulse">{agent.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
