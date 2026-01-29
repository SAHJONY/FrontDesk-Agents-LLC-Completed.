import Image from 'next/image';
import { Activity, Shield, Zap } from 'lucide-react';

interface AgentProps {
  agent: {
    name: string;
    status: 'ready' | 'busy' | 'offline';
    specialty: string;
    efficiency_score: number;
    portrait_url: string; // Add this to your Supabase table
  };
}

export function AgentCard({ agent }: AgentProps) {
  const statusColors = {
    ready: "text-green-400 bg-green-400/10 border-green-400/20",
    busy: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    offline: "text-gray-500 bg-gray-500/10 border-gray-500/20"
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#121212] p-4 transition-all hover:border-blue-500/50 hover:bg-[#161616]">
      {/* 8K Agent Portrait */}
      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
        <Image 
          src={agent.portrait_url || 'https://images.unsplash.com/photo-1675557009875-436f595b18b4?q=80&w=1000&auto=format&fit=crop'} 
          alt={agent.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
        
        {/* Realtime Status Badge */}
        <div className={`absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${statusColors[agent.status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${agent.status === 'ready' ? 'animate-pulse bg-green-400' : 'bg-current'}`} />
          {agent.status}
        </div>
      </div>

      {/* Agent Intel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold tracking-tight text-white">{agent.name}</h3>
          <div className="flex items-center gap-1 text-blue-400">
            <Zap size={14} />
            <span className="text-xs font-mono">{(agent.efficiency_score * 100).toFixed(0)}%</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 line-clamp-1">{agent.specialty}</p>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Activity size={12} />
            <span>NEURAL SYNC</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Shield size={12} />
            <span>ENCRYPTED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
