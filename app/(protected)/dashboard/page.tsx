'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import * as XLSX from 'xlsx';
import { 
  PhoneCall, TrendingUp, Users, Clock, Upload, 
  Zap, Activity, Headset, Download, Bell, 
  Terminal, Cpu, Radio, ShieldCheck, UserPlus
} from 'lucide-react';

// Integrated Services
import { emailService } from '@/services/email.service';
import { Plans } from '@/services/plans';
import { NeuralMap } from '@/components/NeuralMap';

const SYSTEM_VERSION = "v4.2.0-PRO";

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [liveLogs, setLiveLogs] = useState<{id: string, text: string, type: 'ai' | 'sys'}[]>([
    { id: '1', text: "Neural Core Initialized. Awaiting Uplink...", type: 'sys' }
  ]);
  
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    conversions: 0,
    creditsRemaining: 1000,
    roiGenerated: 0
  });

  const [inviteData, setInviteData] = useState({ name: '', email: '', plan: Plans.STARTER });
  const [isInviting, setIsInviting] = useState(false);
  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce'; // Session ID

  // --- CORE SYSTEM FUNCTIONS ---
  const sendInvite = async () => {
    if (!inviteData.name || !inviteData.email) return alert("Validation Error: All fields required.");
    setIsInviting(true);
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientName: inviteData.name, 
          clientEmail: inviteData.email,
          plan: inviteData.plan
        })
      });
      if (res.ok) {
        await emailService.sendWelcomeEmail(inviteData.email, inviteData.name, inviteData.plan);
        setInviteData({ name: '', email: '', plan: Plans.STARTER }); 
        setLiveLogs(prev => [{ id: Date.now().toString(), text: `SYS: Magic Link transmitted to ${inviteData.email}`, type: 'sys' }, ...prev].slice(0, 6));
      }
    } catch (err) { console.error(err); } finally { setIsInviting(false); }
  };

  const fetchOperationalData = async () => {
    const { data: leadsData } = await supabase.from('leads').select('*, call_results(*)').order('created_at', { ascending: false });
    if (leadsData) {
      setLeads(leadsData);
      setMetrics(prev => ({
        ...prev,
        totalLeads: leadsData.length,
        conversions: leadsData.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length,
      }));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOperationalData();
    const channel = supabase.channel('frontdesk-sync').on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchOperationalData()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans pb-20 px-4 md:px-10 lg:px-20">
      
      {/* HEADER */}
      <div className="py-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3 uppercase italic">
            FrontDesk <span className="text-cyan-500">Command</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Sovereign OS {SYSTEM_VERSION}</span>
          </div>
        </div>
        <button onClick={fetchOperationalData} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase hover:text-cyan-400 transition-all">
          Sync Neural Core
        </button>
      </div>

      {/* NEURAL MAP & TERMINAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <NeuralMap />
        <div className="bg-[#000a14] border border-white/5 rounded-[40px] p-8 h-[400px] overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Live Feed</h2>
          </div>
          <div className="space-y-4 font-mono">
            {liveLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start text-[11px]">
                <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
                <p className={log.type === 'ai' ? 'text-cyan-400' : 'text-slate-400'}>{log.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ONBOARDING PROTOCOL */}
      <div className="bg-[#000d1a] border border-white/5 p-10 rounded-[45px] mb-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-10">
          <UserPlus className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-black uppercase tracking-tighter text-white italic">Client Onboarding</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-5">
          <input type="text" placeholder="Entity Name" value={inviteData.name} onChange={e => setInviteData({...inviteData, name: e.target.value})} className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50" />
          <input type="email" placeholder="Corporate Email" value={inviteData.email} onChange={e => setInviteData({...inviteData, email: e.target.value})} className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50" />
          <select value={inviteData.plan} onChange={e => setInviteData({...inviteData, plan: e.target.value as Plans})} className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50 appearance-none">
            <option value={Plans.STARTER}>Starter Tier</option>
            <option value={Plans.PROFESSIONAL}>Professional Tier</option>
            <option value={Plans.ENTERPRISE}>Enterprise Tier</option>
          </select>
          <button onClick={sendInvite} disabled={isInviting} className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[11px] uppercase hover:bg-cyan-500 transition-all">
            {isInviting ? 'Transmitting...' : 'Establish Uplink'}
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <KpiTile label="Entities" val={metrics.totalLeads} Icon={Users} color="text-cyan-500" />
        <KpiTile label="Conversions" val={metrics.conversions} Icon={TrendingUp} color="text-emerald-500" />
        <KpiTile label="Credits" val={`$${metrics.creditsRemaining}`} Icon={Clock} color="text-purple-500" />
        <KpiTile label="Accuracy" val="99.8%" Icon={Activity} color="text-orange-500" />
      </div>
    </div>
  );
}

function KpiTile({ label, val, Icon, color }: any) {
  return (
    <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[35px] hover:border-cyan-500/30 transition-all">
      <Icon className={`w-5 h-5 ${color} mb-8`} />
      <p className="text-4xl font-black text-white italic tracking-tighter">{val}</p>
      <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">{label}</h3>
    </div>
  );
            }
