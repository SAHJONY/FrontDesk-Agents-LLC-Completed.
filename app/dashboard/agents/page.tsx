import React from 'react';
// Only import what you are actually going to use in the return() block below
import { Mic, Radio } from 'lucide-react'; 

export default function AIAgentFleet() {
  const agents = [
    { id: 1, name: 'Lead Generator', status: 'active' },
    { id: 2, name: 'Support Specialist', status: 'idle' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Radio className="w-5 h-5 text-green-500 animate-pulse" />
        <h1 className="text-2xl font-bold">AIAgent Fleet</h1>
      </div>
      
      <div className="grid gap-4">
        {agents.map(agent => (
          <div key={agent.id} className="p-4 border border-white/10 rounded-lg flex justify-between items-center">
            <span>{agent.name}</span>
            <Mic className="w-4 h-4 text-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
