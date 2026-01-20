"use client";

import Image from "next/image";
import Link from "next/link";
import { getPageHero } from "@/lib/siteImages";
import { PhoneCall, CalendarCheck, TrendingUp, Loader2, Zap, Activity } from "lucide-react";

// Updated components to reflect clean utility branding
import { UsageStatus } from "@/components/dashboard/UsageStatus"; 
import { useAccountMetrics } from "@/hooks/useAccountMetrics";

export default function DashboardPage() {
  const hero = getPageHero("dashboard");
  const { metrics, isLoading } = useAccountMetrics();

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`h-1.5 w-1.5 rounded-full ${isLoading ? 'bg-slate-600' : 'bg-sky-400 animate-pulse'}`} />
            <p className="text-xs font-semibold tracking-[0.3em] text-sky-400 uppercase">
              {isLoading ? 'Updating Account...' : 'Client Dashboard'}
            </p>
          </div>
          {hero && (
            <>
              <h1 className="text-2xl font-bold text-slate-50 sm:text-3xl">
                {hero.title}
              </h1>
              <p className="max-w-xl text-sm text-slate-300">
                {hero.description}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/dashboard/outbound"
            className="group flex items-center gap-2 rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-sky-400 hover:text-sky-300 transition-all"
          >
            <Zap className="w-3 h-3 text-slate-500 group-hover:text-sky-400" />
            Outbound campaigns
          </Link>
          <Link
            href="/dashboard/retention"
            className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:border-sky-400 hover:text-sky-300 transition-all"
          >
            Retention & reactivation
          </Link>
        </div>
      </header>

      {/* Usage & Infrastructure Row */}
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <UsageStatus 
            tier={metrics.tier} 
            usedMins={metrics.usedMins} 
            maxMins={metrics.maxMins} 
            status={isLoading ? "LOADING" : "ACTIVE"} 
          />
        </div>
        <div className="lg:col-span-8 relative rounded-xl border border-slate-800 overflow-hidden group">
          {hero && (
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={900}
              className="h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 border border-white/5">
            <Activity className="w-3 h-3 text-sky-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {/* Answered Today */}
        <div className="group rounded-xl border border-slate-800 bg-slate-950/70 p-6 transition-all hover:border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tight">Answered today</p>
            <PhoneCall className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-slate-50">
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-slate-700" /> : metrics.answeredToday}
            </p>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
            Connected calls handled by <span className="text-slate-300">AI agents</span>.
          </p>
        </div>

        {/* Booked Appointments */}
        <div className="group rounded-xl border border-slate-800 bg-slate-950/70 p-6 transition-all hover:border-slate-600">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-tight">Booked appointments</p>
            <CalendarCheck className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <p className="text-3xl font-black text-slate-50">
            {isLoading ? "..." : metrics.appointmentsBooked}
          </p>
          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
            Synced directly to your <span className="text-slate-300">connected calendar</span>.
          </p>
        </div>

        {/* Estimated Revenue */}
        <div className="group rounded-xl border border-sky-500/20 bg-sky-500/[0.03] p-6 transition-all hover:border-sky-500/50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-sky-400 uppercase font-bold tracking-tight">Estimated Revenue</p>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-black text-sky-300 italic">
            ${isLoading ? "0" : metrics.estimatedPipeline.toLocaleString()}
          </p>
          <p className="mt-2 text-[11px] text-sky-700 font-medium leading-relaxed uppercase">
            Calculated ROI from active campaigns.
          </p>
        </div>
      </section>
    </div>
  );
}
