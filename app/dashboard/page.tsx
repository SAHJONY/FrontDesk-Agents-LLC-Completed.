'use client';

import Image from "next/image";
import Link from "next/link";
import { getPageHero } from "@/lib/siteImages";
import { 
  PhoneCall, 
  CalendarCheck2, 
  TrendingUp, 
  ChevronRight, 
  Zap,
  Activity
} from "lucide-react";

// Components for high-margin visualization
import { NodeStatus } from "@/components/dashboard/NodeStatus";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");

  // These would eventually come from your Supabase / Bland AI hooks
  const metrics = {
    answeredToday: 42,
    appointmentsBooked: 12,
    estimatedPipeline: 14500,
    tier: "Professional",
    usedMins: 842,
    maxMins: 1200
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      {/* 1. Header & Quick Actions */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/50 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <p className="text-[10px] font-black tracking-[0.3em] text-sky-400 uppercase">
              Sovereign Node Dashboard
            </p>
          </div>
          {hero && (
            <>
              <h1 className="text-3xl font-black text-slate-50 italic uppercase tracking-tighter sm:text-4xl">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-400 font-medium mt-1">
                {hero.description}
              </p>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/outbound"
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-5 py-2.5 text-xs font-bold text-slate-100 hover:border-sky-400 hover:text-sky-300 transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            Outbound Campaigns
          </Link>
          <Link
            href="/dashboard/retention"
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-black text-slate-950 uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg shadow-sky-500/20"
          >
            Reactivation
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* 2. Infrastructure Status & Primary Hero */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <NodeStatus 
            tier={metrics.tier} 
            usedMins={metrics.usedMins} 
            maxMins={metrics.maxMins} 
            status="ACTIVE"
          />
        </div>
        
        <div className="lg:col-span-8 relative group overflow-hidden rounded-2xl border border-slate-800">
          {hero && (
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-full w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-3 rounded-xl flex items-center gap-3">
              <Activity className="text-sky-400 w-4 h-4" />
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Global Node Latency: 42ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Revenue Metrics */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Metric Card: Answered */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Traffic</p>
            <PhoneCall className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-4xl font-black text-slate-50 italic">
            {metrics.answeredToday}
          </p>
          <p className="mt-2 text-[11px] font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
            Calls provisioned by <span className="text-sky-400">Node Fleet</span>.
          </p>
        </div>

        {/* Metric Card: Appointments */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/40 p-6 backdrop-blur-sm hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Conversions</p>
            <CalendarCheck2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-4xl font-black text-slate-50 italic">
            {metrics.appointmentsBooked}
          </p>
          <p className="mt-2 text-[11px] font-medium text-slate-400 leading-relaxed uppercase tracking-tighter">
            Syncing directly to your <span className="text-emerald-400">CRM/Calendar</span>.
          </p>
        </div>

        {/* Metric Card: Pipeline */}
        <div className="relative overflow-hidden rounded-2xl border border-sky-500/30 bg-sky-500/[0.03] p-6 backdrop-blur-sm hover:border-sky-500/50 transition-all">
          <div className="flex justify-between items-start mb-4">
            <p className="text-[10px] font-black text-sky-500/70 uppercase tracking-[0.2em]">Recaptured Yield</p>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-4xl font-black text-sky-300 italic">
            ${metrics.estimatedPipeline.toLocaleString()}
          </p>
          <p className="mt-2 text-[11px] font-medium text-sky-500/70 leading-relaxed uppercase tracking-tighter font-mono">
            *Est. ROI based on active campaigns
          </p>
        </div>
      </section>
    </div>
  );
}
