"use client";

import { useState, useEffect } from "react";
import MarketplaceGrid from "@/components/dashboard/MarketplaceGrid";
import { 
  LayoutDashboard, 
  CreditCard, 
  MapPin, 
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

export default function DashboardPage() {
  const [userPlan, setUserPlan] = useState({
    name: "Professional", // This will eventually come from your Auth/Stripe metadata
    price: "$699/mo",
    limit: "2–5 Locations",
    activeAgents: 3
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Sidebar / Top Nav Placeholder */}
      <nav className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-sky-400 uppercase tracking-tighter">
            <LayoutDashboard size={20} /> Workforce Command
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Active Tier</p>
              <p className="text-sm font-bold text-white">{userPlan.name}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 border-2 border-slate-800" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-6">
        {/* Statistics / Tier Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MapPin size={80} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Subscription Scope</p>
            <h3 className="text-2xl font-bold text-white">{userPlan.limit}</h3>
            <div className="mt-4 flex items-center gap-2 text-sky-400 text-xs font-bold">
              <TrendingUp size={14} /> 100% Infrastructure Uptime
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={80} />
            </div>
            <p className="text-slate-400 text-sm mb-1">Active AI Agents</p>
            <h3 className="text-2xl font-bold text-white">{userPlan.activeAgents} Agents</h3>
            <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold">
              <Activity size={14} /> All Systems Operational
            </div>
          </div>

          <div className="bg-sky-500 p-6 rounded-3xl relative overflow-hidden shadow-xl shadow-sky-500/10">
            <p className="text-sky-950 text-sm font-bold mb-1 italic">Billing Cycle</p>
            <h3 className="text-2xl font-black text-slate-950">{userPlan.price}</h3>
            <button className="mt-4 bg-slate-950 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
              <CreditCard size={14} /> Manage Billing
            </button>
          </div>
        </div>

        {/* The Marketplace Hub */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-[2.5rem] overflow-hidden shadow-inner">
           <MarketplaceGrid />
        </div>
      </main>
    </div>
  );
}
