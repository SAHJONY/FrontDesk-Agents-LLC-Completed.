import { NeuralHero } from "@/components/dashboard/NeuralHero";
import { AgentGrid } from "@/components/agents/AgentGrid"; 

// This ensures the page reflects "Agent Smith's" status changes in real-time
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="flex flex-col gap-10 p-6 max-w-7xl mx-auto">
        
        {/* 8K Premium Hero Section */}
        <section className="animate-in fade-in slide-in-from-top-4 duration-1000">
          <NeuralHero />
        </section>

        {/* The Workforce Grid Section */}
        <section className="animate-in fade-in duration-700 delay-300">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Active Neural Workforce</h2>
              <p className="text-gray-400 mt-1">Real-time status of your autonomous agents across all jurisdictions.</p>
            </div>
            
            {/* Status Indicator for Supabase Realtime */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Live Sync</span>
            </div>
          </div>

          {/* AgentGrid renders Agent Smith and the other 14 agents */}
          <AgentGrid />
        </section>
      </div>
    </main>
  );
}
