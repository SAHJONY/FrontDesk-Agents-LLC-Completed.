"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPageHero } from "@/lib/siteImages";
import { 
  PhoneCall, TrendingUp, Zap, Activity,
  ArrowUpRight, ListFilter, ShieldCheck,
  Cpu, Globe, LayoutDashboard, BarChart3
} from "lucide-react";

// Enterprise Core Components
import { UsageStatus } from "@/components/dashboard/UsageStatus"; 
import { CallLogTable } from "@/components/dashboard/CallLogTable";
import { useAccountMetrics } from "@/hooks/useAccountMetrics";
import { LiveActivityFeed } from "@/components/workforce/live-activity-feed";
import { useRealtimeWorkforce } from "@/hooks/use-realtime-workforce";

// Resource Management Components
import { AgentPerformanceGrid } from "@/components/workforce/agent-performance-grid";
import { CampaignSimulator } from "@/components/workforce/campaign-simulator";
import { EscalationHub } from "@/components/workforce/escalation-hub";
import { useEscalations } from "@/hooks/use-escalations";
import { GlobalAnalyticsOverlay } from "@/components/dashboard/global-analytics";
import { LiveSessionPanel } from "@/components/workforce/live-session-panel";
import { ResolutionModal } from "@/components/workforce/resolution-modal";
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
    <div className="space-y-8 pb-12 animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      {/* 1. EXECUTIVE HEADER */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between px-2">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-slate-400' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]'}`} />
            <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              {isLoading ? 'Synchronizing Systems...' : 'System Operational • High-Bandwidth Realtime'}
            </p>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Operational Overview
          </h1>
          <p className="max-w-xl text-sm text-slate-600 font-medium">
            Centralized management of virtual agents, communication protocols, and revenue performance.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/outbound" className="group flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Zap className="w-3.5 h-3.5 text-blue-600" /> Outbound Management
          </Link>
          <button className="group flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-md">
            Deploy New Instance <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. CRITICAL ALERT LAYER */}
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

      {/* 3. CORE ANALYTICS GRID */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Resource Allocation */}
        <div className="lg:col-span-4 space-y-6">
          <UsageStatus 
            tier={metrics?.tier || 'ENTERPRISE'} 
            usedMins={metrics?.usedMins || 0} 
            maxMins={metrics?.maxMins || 7000} 
            status={isLoading ? "SYNCHRONIZING" : "STABLE"} 
          />
          <TranscriptTerminal />
        </div>

        {/* Center/Right Column: Strategic Visualization */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative h-[400px] rounded-2xl border border-slate-200 bg-white overflow-hidden group shadow-sm">
             {hero && <Image src={hero.src} alt={hero.alt} fill priority className="object-cover opacity-10 transition-opacity duration-1000" />}
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
             
             {/* Performance Overlay */}
             <div className="absolute top-8 left-8 space-y-4">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-xl w-fit shadow-sm">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Active Instances: {realtimeMetrics?.activeAgents || 15}</span>
                </div>
                <h2 className="text-5xl font-extrabold text-slate-900 tracking-tighter leading-tight">
                  Global<br/><span className="text-blue-600">Performance</span>
                </h2>
             </div>

             <div className="absolute bottom-8 right-8">
                <MetricCard 
                  title="Pipeline Revenue" 
                  value={`$${(realtimeMetrics?.totalRevenue || metrics?.estimatedPipeline || 0).toLocaleString()}`} 
                  icon={TrendingUp} 
                  subtitle="Verified Database Sync" 
                  highlight 
                />
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-blue-500" /> Operational Feed
              </h3>
              <LiveActivityFeed />
            </div>
            <div className="space-y-4">
              <SystemHealthBadge icon={ShieldCheck} label="Operational Stability" value="98.2%" />
              <SystemHealthBadge icon={Cpu} label="System Latency" value="42ms" />
              <SystemHealthBadge icon={Globe} label="Primary Region" value="US-WEST-1" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. PERFORMANCE & REPORTING */}
      <section className="pt-8 space-y-8">
        <GlobalAnalyticsOverlay />
        <AgentPerformanceGrid />
      </section>

      {/* 5. SIMULATION & REGISTRY */}
      <div className="grid lg:grid-cols-2 gap-8">
        <CampaignSimulator />
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <ListFilter className="w-4 h-4 text-slate-400" />
            <h2 className="text-sm font-bold uppercase tracking-tight text-slate-700">Communication Logs</h2>
          </div>
          <CallLogTable calls={metrics?.recentCalls || []} onViewTranscript={(call) => setSelectedCall(call)} />
        </div>
      </div>

      {/* Support Modals */}
      <AnimatePresence>
        {activeSession && <LiveSessionPanel activeSession={activeSession} onClose={() => setShowResolution(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showResolution && <ResolutionModal session={activeSession} onComplete={() => { setShowResolution(false); setActiveSession(null); }} />}
      </AnimatePresence>
    </div>
  );
}

function SystemHealthBadge({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-blue-500" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-xs font-bold text-slate-900">{value}</span>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, subtitle, loading, highlight }: any) {
  return (
    <div className={`rounded-2xl border p-6 min-w-[240px] shadow-lg transition-transform hover:scale-[1.02] ${
      highlight 
        ? 'bg-blue-600 border-blue-500 text-white' 
        : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <p className={`text-[9px] uppercase font-bold tracking-widest ${highlight ? 'opacity-80' : 'text-slate-500'}`}>{title}</p>
        <Icon className={`w-4 h-4 ${highlight ? 'opacity-80' : 'text-blue-500'}`} />
      </div>
      <div className="text-3xl font-extrabold tracking-tight">{loading ? '---' : value}</div>
      <p className={`mt-1 text-[9px] font-medium uppercase ${highlight ? 'opacity-70' : 'text-slate-400'}`}>{subtitle}</p>
    </div>
  );
}
