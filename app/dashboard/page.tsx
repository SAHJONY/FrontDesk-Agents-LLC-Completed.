"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPageHero } from "@/lib/siteImages";
import { 
  PhoneCall, CalendarCheck, TrendingUp, Loader2, Zap, Activity,
  ArrowUpRight, ListFilter, X, User, MessageSquare, ShieldCheck,
  Cpu, FlaskConical, Globe, Terminal
} from "lucide-react";

// Protocol Components
import { UsageStatus } from "@/components/dashboard/UsageStatus"; 
import { CallLogTable } from "@/components/dashboard/CallLogTable";
import { useAccountMetrics } from "@/hooks/useAccountMetrics";
import { LiveActivityFeed } from "@/components/workforce/live-activity-feed";
import { useRealtimeWorkforce } from "@/hooks/use-realtime-workforce";

// Workforce & Escalation Components
import { AgentPerformanceGrid } from "@/components/workforce/agent-performance-grid";
import { TrainingModeToggle } from "@/components/workforce/training-mode-toggle";
import { CampaignSimulator } from "@/components/workforce/campaign-simulator";
import { EscalationHub } from "@/components/workforce/escalation-hub";
import { useEscalations } from "@/hooks/use-escalations";
import { GlobalAnalyticsOverlay } from "@/components/dashboard/global-analytics";
import { LiveSessionPanel } from "@/components/workforce/live-session-panel";
import { ResolutionModal } from "@/components/workforce/resolution-modal";

// New 8K Realtime Components
import { TranscriptTerminal } from "@/components/dashboard/transcript-terminal";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");
  const { metrics, isLoading } = useAccountMetrics();
  const { metrics: realtimeMetrics } = useRealtimeWorkforce();
  const { escalations } = useEscalations();
  
  const [activeSession, setActiveSession] = useState<any>(null);
  const [showResolution, setShowResolution] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const handleIntercept = (session: any) => setActiveSession(session);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 1. COMMAND HEADER */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-slate-600' : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse'}`} />
            <p className="text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase">
              {isLoading ? 'Sincronizando Nodo...' : 'Protocolo Realtime Activo • 8K Streaming'}
            </p>
          </div>
          {hero && (
            <>
              <h1 className="text-3xl font-black text-slate-50 tracking-tighter italic uppercase">
                Neural Command
              </h1>
              <p className="max-w-xl text-sm text-slate-400 italic font-medium">
                Supervisión global de agentes autónomos y flujo de ingresos en tiempo real.
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/outbound" className="group flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-100 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all">
            <Zap className="w-3 h-3 text-emerald-400" /> Outbound Node
          </Link>
          <button className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-emerald-400 transition-all">
            Deploy New Agent <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* 2. CRITICAL ESCALATION LAYER */}
      <AnimatePresence>
        {escalations.length > 0 && !activeSession && (
          <motion.section 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <EscalationHub escalations={escalations} onTakeOver={handleIntercept} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. THE MASTER 8K GRID (REALTIME FOCUS) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Metrics & Logs */}
        <div className="lg:col-span-4 space-y-6">
          <UsageStatus tier={metrics?.tier || 'PRO'} usedMins={metrics?.usedMins || 0} maxMins={metrics?.maxMins || 1000} status={isLoading ? "LOADING" : "ACTIVE"} />
          <TranscriptTerminal />
        </div>

        {/* Center/Right Column: Hero & Live Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative h-[400px] rounded-[2.5rem] border border-slate-800 overflow-hidden group">
             {hero && <Image src={hero.src} alt={hero.alt} fill priority className="object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000" />}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
             
             {/* Dynamic Status Overlay */}
             <div className="absolute top-8 left-8 space-y-4">
                <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/5 px-4 py-2 rounded-2xl w-fit">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Nodes: {realtimeMetrics?.activeAgents || 15}</span>
                </div>
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-[0.8]">
                  Global<br/><span className="text-emerald-500">Revenue</span>
                </h2>
             </div>

             <div className="absolute bottom-8 right-8">
                <MetricCard 
                  title="Live Revenue" 
                  value={`$${(realtimeMetrics?.totalRevenue || metrics?.estimatedPipeline || 0).toLocaleString()}`} 
                  icon={TrendingUp} 
                  subtitle="Syncing with PostgreSQL" 
                  highlight 
                />
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                <Activity className="w-3 h-3 text-emerald-400" /> Live Feed
              </h3>
              <LiveActivityFeed />
            </div>
            <div className="space-y-4">
              <SystemHealthBadge icon={ShieldCheck} label="Operational Autonomy" value="98.2%" />
              <SystemHealthBadge icon={Cpu} label="Neural Latency" value="42ms" />
              <SystemHealthBadge icon={Globe} label="Region" value="PDX-1 (West)" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. WORKFORCE & ANALYTICS */}
      <section className="pt-8 space-y-8">
        <GlobalAnalyticsOverlay />
        <AgentPerformanceGrid />
      </section>

      {/* 5. LABS & REGISTRY */}
      <div className="grid lg:grid-cols-2 gap-8">
        <CampaignSimulator />
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <ListFilter className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-black italic uppercase tracking-tighter text-slate-200">Historical Registry</h2>
          </div>
          <CallLogTable calls={metrics?.recentCalls || []} onViewTranscript={(call) => setSelectedCall(call)} />
        </div>
      </div>

      {/* Modals & Overlays (Unchanged) */}
      <AnimatePresence>
        {activeSession && <LiveSessionPanel activeSession={activeSession} onClose={() => setShowResolution(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showResolution && <ResolutionModal session={activeSession} onComplete={() => { setShowResolution(false); setActiveSession(null); }} />}
      </AnimatePresence>
      {/* ... Transcription Modal ... */}
    </div>
  );
}

// Sub-components kept internal for brevity, can be moved to separate files
function SystemHealthBadge({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/30 transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-emerald-400" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xs font-black text-white italic">{value}</span>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, subtitle, loading, highlight }: any) {
  return (
    <div className={`rounded-3xl border p-6 min-w-[240px] ${highlight ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_20px_50px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border-slate-800 text-white'}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] uppercase font-black tracking-widest opacity-70">{title}</p>
        <Icon className="w-4 h-4 opacity-70" />
      </div>
      <div className="text-3xl font-black tracking-tighter italic uppercase">{loading ? '---' : value}</div>
      <p className="mt-1 text-[9px] font-bold opacity-60 uppercase">{subtitle}</p>
    </div>
  );
}
