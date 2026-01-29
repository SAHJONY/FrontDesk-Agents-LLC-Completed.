"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getPageHero } from "@/lib/siteImages";
import { 
  PhoneCall, 
  CalendarCheck, 
  TrendingUp, 
  Loader2, 
  Zap, 
  Activity,
  ArrowUpRight,
  ListFilter,
  X,
  User,
  MessageSquare,
  ShieldCheck,
  Cpu,
  FlaskConical,
  ShieldAlert,
  Globe
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

export default function DashboardPage() {
  const hero = getPageHero("dashboard");
  const { metrics, isLoading } = useAccountMetrics();
  const { metrics: realtimeMetrics } = useRealtimeWorkforce();
  const { escalations } = useEscalations();
  
  // Human-in-the-Loop States
  const [activeSession, setActiveSession] = useState<any>(null);
  const [showResolution, setShowResolution] = useState(false);
  const [selectedCall, setSelectedCall] = useState<any>(null);

  const handleIntercept = (session: any) => {
    setActiveSession(session);
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 1. COMMAND HEADER */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-2 w-2 rounded-full ${isLoading ? 'bg-slate-600' : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)] animate-pulse'}`} />
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
              {isLoading ? 'Sincronizando Nodo Supabase...' : 'Infraestructura Activa • Live Monitoring'}
            </p>
          </div>
          {hero && (
            <>
              <h1 className="text-3xl font-black text-slate-50 tracking-tighter italic uppercase">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-400 italic font-medium">
                {hero.description}
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/outbound" className="group flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-100 hover:border-sky-500 hover:bg-sky-500/5 transition-all">
            <Zap className="w-3 h-3 text-sky-400" /> Campañas Outbound
          </Link>
          <button className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-sky-400 transition-all">
            Configurar Agente <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </header>

      {/* 2. CRITICAL ESCALATION LAYER */}
      <AnimatePresence>
        {escalations.length > 0 && !activeSession && (
          <motion.section 
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 32 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <EscalationHub escalations={escalations} onTakeOver={handleIntercept} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. INFRASTRUCTURE & VISUAL ROW */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          <UsageStatus tier={metrics?.tier || 'FREE'} usedMins={metrics?.usedMins || 0} maxMins={metrics?.maxMins || 100} status={isLoading ? "LOADING" : "ACTIVE"} />
          <div className="rounded-3xl border border-slate-800 bg-slate-900/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Activity className="w-3 h-3 text-sky-400" /> Realtime Stream
              </h3>
              <span className="text-[8px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full font-bold">LIVE</span>
            </div>
            <LiveActivityFeed />
          </div>
        </div>

        <div className="lg:col-span-7 xl:col-span-8 relative rounded-3xl border border-slate-800 overflow-hidden group min-h-[300px]">
          {hero && <Image src={hero.src} alt={hero.alt} fill priority className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <SystemHealthBadge icon={ShieldCheck} label="Autonomy" value={`${realtimeMetrics?.autonomyLevel?.toFixed(0) || 0}%`} />
            <SystemHealthBadge icon={Cpu} label="Learning" value={`${(realtimeMetrics?.learningVelocity * 100)?.toFixed(1) || 0}%`} />
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-black/60 backdrop-blur-xl px-4 py-2 border border-white/10">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">
              Data Cloud: Supabase • Latencia: 42ms • Agents: {realtimeMetrics?.activeAgents || 0}
            </span>
          </div>
        </div>
      </div>

      {/* 4. IMPACT METRIC GRID */}
      <section className="grid gap-6 md:grid-cols-3">
        <MetricCard title="Atención Hoy" value={metrics?.answeredToday || 0} icon={PhoneCall} subtitle="Llamadas gestionadas" loading={isLoading} />
        <MetricCard title="Conversión" value={metrics?.appointmentsBooked || 0} icon={CalendarCheck} subtitle="Citas en calendario" loading={isLoading} />
        <MetricCard title="Revenue Pipeline" value={`$${(metrics?.estimatedPipeline || 0).toLocaleString()}`} icon={TrendingUp} subtitle="ROI Estimado (PostgreSQL)" loading={isLoading} highlight />
      </section>

      {/* 5. GLOBAL INTELLIGENCE OVERLAY */}
      <section className="animate-in slide-in-from-bottom-4 duration-1000 delay-75">
        <GlobalAnalyticsOverlay />
      </section>

      {/* 6. WORKFORCE NEURAL MANAGEMENT LAYER */}
      <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000 delay-100">
        <div className="flex items-center gap-3 px-2">
          <Cpu className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black italic uppercase tracking-tighter text-slate-200">
            Workforce Neural Management
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgentPerformanceGrid />
          </div>
          <div className="space-y-6">
            <TrainingModeToggle />
            <div className="rounded-3xl border border-slate-800 bg-black/20 p-6">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Infrastructure Note</span>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed font-medium uppercase italic">
                All agent nodes are currently syncing with <strong>PostgreSQL</strong> via Supabase. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. NEURAL LAB & SIMULATION */}
      <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
        <div className="flex items-center gap-3 px-2">
          <FlaskConical className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-black italic uppercase tracking-tighter text-slate-200">
            Neural Lab & Stress Test
          </h2>
        </div>
        <CampaignSimulator />
      </section>

      {/* 8. CALL LOG REGISTRY */}
      <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-1000 delay-500">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <ListFilter className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-black italic uppercase tracking-tighter text-slate-200">
              Últimas Interacciones de Nodo
            </h2>
          </div>
        </div>
        {!isLoading && (
          <CallLogTable calls={metrics?.recentCalls || []} onViewTranscript={(call) => setSelectedCall(call)} />
        )}
      </section>

      {/* GHOST BRIDGE (Human Interception) */}
      <AnimatePresence>
        {activeSession && (
          <LiveSessionPanel 
            activeSession={activeSession} 
            onClose={() => setShowResolution(true)} 
          />
        )}
      </AnimatePresence>

      {/* RESOLUTION WORKFLOW */}
      <AnimatePresence>
        {showResolution && (
          <ResolutionModal 
            session={activeSession} 
            onComplete={() => {
              setShowResolution(false);
              setActiveSession(null);
            }} 
          />
        )}
      </AnimatePresence>

      {/* TRANSCRIPTION MODAL */}
      <AnimatePresence>
        {selectedCall && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500">Protocolo de Transcripción</h3>
                    <p className="text-lg font-black text-white italic uppercase tracking-tighter">
                      {selectedCall.from} <span className="text-slate-600 text-xs ml-2">— {selectedCall.duration}</span>
                    </p>
                  </div>
                </div>
                <button onClick={() => setSelectedCall(null)} className="p-3 hover:bg-white/5 rounded-full text-slate-500 transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 h-[450px] overflow-y-auto space-y-8 bg-slate-950/20">
                {selectedCall.transcript?.map((msg: any, i: number) => (
                  <div key={i} className={`flex gap-4 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${msg.role === 'assistant' ? 'bg-sky-500/10 border-sky-500/20 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                      {msg.role === 'assistant' ? <Zap size={16} /> : <User size={16} />}
                    </div>
                    <div className={`max-w-[75%] p-5 rounded-3xl text-[13px] leading-relaxed font-medium ${msg.role === 'assistant' ? 'bg-slate-800 text-slate-100 rounded-tl-none border border-white/5' : 'bg-sky-500/10 text-sky-100 border border-sky-500/20 rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SystemHealthBadge({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-2xl">
      <Icon className="w-3 h-3 text-sky-400" />
      <div className="flex flex-col">
        <span className="text-[8px] font-black text-slate-500 uppercase leading-none mb-1">{label}</span>
        <span className="text-xs font-black text-white italic leading-none">{value}</span>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, subtitle, loading, highlight }: any) {
  return (
    <motion.div whileHover={{ y: -4 }} className={`group rounded-3xl border p-8 transition-all ${highlight ? 'border-sky-500/30 bg-sky-500/[0.03] hover:border-sky-500/50' : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'}`}>
      <div className="flex items-center justify-between mb-4">
        <p className={`text-[10px] uppercase font-black tracking-widest ${highlight ? 'text-sky-400 italic' : 'text-slate-50'}`}>{title}</p>
        <Icon className={`w-5 h-5 ${highlight ? 'text-sky-400' : 'text-slate-700 group-hover:text-sky-400'} transition-colors`} />
      </div>
      <div className={`text-4xl font-black tracking-tighter ${highlight ? 'text-sky-300 italic' : 'text-slate-50'}`}>
        {loading ? <Loader2 className="w-8 h-8 animate-spin opacity-20" /> : value}
      </div>
      <p className="mt-3 text-[11px] text-slate-500 font-medium leading-relaxed uppercase italic">{subtitle}</p>
    </motion.div>
  );
}
