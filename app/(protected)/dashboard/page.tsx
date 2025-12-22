'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import * as XLSX from 'xlsx'; // Import Excel Engine
import { 
  PhoneCall, TrendingUp, Users, Clock, Upload, 
  Zap, Activity, Headset, Download, Bell, 
  Terminal, Cpu, Radio, ShieldCheck, UserPlus
} from 'lucide-react';

const BRAND_NAME = "FrontDesk Agents"; 
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
    avgPerformance: 0
  });

  // --- CLIENT ONBOARDING STATE ---
  const [inviteData, setInviteData] = useState({ name: '', email: '' });
  const [isInviting, setIsInviting] = useState(false);

  // Hardcoded for current deployment session
  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

  // --- CLIENT ONBOARDING FUNCTION ---
  const sendInvite = async () => {
    if (!inviteData.name || !inviteData.email) return alert("Validation Error: All fields required.");
    
    setIsInviting(true);
    try {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          clientName: inviteData.name, 
          clientEmail: inviteData.email 
        })
      });

      if (res.ok) {
        setInviteData({ name: '', email: '' }); 
        setLiveLogs(prev => [
          { id: Date.now().toString(), text: `SYS: Magic Link transmitted to ${inviteData.email}`, type: 'sys' },
          ...prev
        ].slice(0, 6));
      } else {
        throw new Error("Uplink Failure.");
      }
    } catch (err) {
      console.error("Invitation Error:", err);
    } finally {
      setIsInviting(false);
    }
  };

  // --- EXPORT ROI ENGINE ---
  const handleExportROI = () => {
    const reportData = leads.map(lead => ({
      'Prospect Entity': lead.full_name,
      'Contact Stream': lead.phone_number,
      'AI Analysis': lead.call_results?.[0]?.summary || 'PENDING',
      'Sentiment': lead.call_results?.[0]?.sentiment_score || 'NEUTRAL',
      'System Status': lead.call_results?.[0]?.status || 'IDLE',
      'Timestamp': new Date(lead.created_at).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operational_ROI');
    ws['!cols'] = [{ wch: 25 }, { wch: 20 }, { wch: 50 }, { wch: 15 }, { wch: 15 }, { wch: 25 }];
    XLSX.writeFile(wb, `FRONTDESK_ROI_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    setLiveLogs(prev => [
      { id: Date.now().toString(), text: "SYS: ROI Report Generated.", type: 'sys' },
      ...prev
    ].slice(0, 6));
  };

  // --- SWARM DEPLOYMENT ---
  const handleDeploySwarm = async () => {
    setIsProcessing(true);
    setLiveLogs(prev => [{ id: Date.now().toString(), text: "SYS: Initializing Swarm Protocol...", type: 'sys' }, ...prev]);
    try {
      const response = await fetch('/api/deploy-swarm', { method: 'POST' });
      const data = await response.json();
      setLiveLogs(prev => [{ id: Date.now().toString(), text: `SYS: ${data.message || 'Swarm Active'}`, type: 'sys' }, ...prev].slice(0, 6));
    } catch (error) {
      setLiveLogs(prev => [{ id: Date.now().toString(), text: "ERR: Uplink Failed.", type: 'sys' }, ...prev]);
    } finally {
      setIsProcessing(false);
      fetchOperationalData();
    }
  };

  useEffect(() => {
    fetchOperationalData();
    const channel = supabase
      .channel('frontdesk-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, () => fetchOperationalData())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchOperationalData() {
    const { data: leadsData } = await supabase
      .from('leads')
      .select('*, call_results(*)')
      .order('created_at', { ascending: false });
    
    if (leadsData) {
      setLeads(leadsData);
      setMetrics(prev => ({
        ...prev,
        totalLeads: leadsData.length,
        conversions: leadsData.filter(l => l.call_results?.[0]?.sentiment_score === 'Hot 🔥').length,
      }));
    }
    setLoading(false);
  }

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const rows = text.split('\n').slice(1);
      const leadsToInsert = rows.map(row => {
        const [full_name, phone_number] = row.split(',');
        return { full_name: full_name?.trim(), phone_number: phone_number?.trim(), user_id: userId };
      }).filter(l => l.full_name && l.phone_number);
      await supabase.from('leads').insert(leadsToInsert);
      fetchOperationalData();
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#000814]">
      <div className="flex flex-col items-center gap-4">
        <Headset className="w-12 h-12 text-cyan-500 animate-pulse" />
        <span className="text-[10px] font-black text-white uppercase tracking-widest">Initializing Systems...</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans pb-20 px-4 md:px-10 lg:px-20">
      
      {/* HEADER SECTION */}
      <div className="py-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3 uppercase italic">
            FrontDesk <span className="text-cyan-500">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Sovereign OS {SYSTEM_VERSION} • Secure Matrix</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExportROI}
            className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-500 hover:border-cyan-500/30 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" /> Export ROI Report
          </button>
        </div>
      </div>

      {/* TERMINAL & SWARM ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-[#000a14] border border-white/5 rounded-[40px] p-8 shadow-2xl h-[320px] overflow-hidden relative">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyan-500" />
              <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Command Output</h2>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/20" />
              <div className="w-2 h-2 rounded-full bg-amber-500/20" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
            </div>
          </div>
          <div className="space-y-4 font-mono">
            {liveLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-left-4">
                <span className={`text-[8px] mt-1 px-2 py-0.5 rounded font-black tracking-tighter ${log.type === 'ai' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-white/5 text-slate-600'}`}>
                  {log.type === 'ai' ? 'USR_AI' : 'SYS_LOG'}
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  <span className="text-slate-700 mr-2">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  {log.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-10 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-all" />
          <div>
            <div className="p-4 bg-cyan-500/10 rounded-2xl w-fit mb-8"><Cpu className="w-7 h-7 text-cyan-500" /></div>
            <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Deploy Swarm</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 leading-loose">Initialize global outbound protocol across all active neural nodes.</p>
          </div>
          <button 
            onClick={handleDeploySwarm}
            disabled={isProcessing}
            className="w-full py-6 bg-cyan-500 text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 mt-10"
          >
            {isProcessing ? 'Processing...' : 'Execute Protocol'}
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Entities', val: metrics.totalLeads, icon: Users, color: 'text-cyan-500' },
          { label: 'Conversions', val: metrics.conversions, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'System Credits', val: `$${metrics.creditsRemaining}`, icon: Clock, color: 'text-purple-500' },
          { label: 'Vocal Accuracy', val: '99.8%', icon: Activity, color: 'text-orange-500' }
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#000d1a] border border-white/5 p-8 rounded-[35px] hover:border-cyan-500/30 transition-all group">
            <kpi.icon className={`w-5 h-5 ${kpi.color} mb-8`} />
            <p className="text-4xl font-black text-white italic tracking-tighter">{kpi.val}</p>
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">{kpi.label}</h3>
          </div>
        ))}
      </div>

      {/* CLIENT ONBOARDING PROTOCOL */}
      <div className="bg-[#000d1a] border border-white/5 p-10 rounded-[45px] mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5">
           <UserPlus className="w-32 h-32 text-white" />
        </div>
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-white/5 rounded-2xl">
            <UserPlus className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tighter text-white italic">Client Onboarding Protocol</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Transmit Secure Access Uplink (Magic Link)</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-5">
          <input 
            type="text"
            placeholder="Legal Entity Name"
            value={inviteData.name}
            onChange={e => setInviteData({...inviteData, name: e.target.value})}
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/50 transition-all font-medium"
          />
          <input 
            type="email"
            placeholder="Corporate Uplink Email"
            value={inviteData.email}
            onChange={e => setInviteData({...inviteData, email: e.target.value})}
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/50 transition-all font-medium"
          />
          <button 
            onClick={sendInvite}
            disabled={isInviting || !inviteData.email}
            className="px-10 py-5 bg-white text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-cyan-500 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20"
          >
            {isInviting ? 'Transmitting...' : 'Establish Uplink'}
          </button>
        </div>
      </div>

      {/* DATA INGESTION & MASTER TABLE */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="bg-[#000d1a] border border-white/5 p-10 rounded-[45px] h-full">
            <h2 className="text-xs font-black uppercase tracking-widest text-white mb-6 italic">Packet Ingestion</h2>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[35px] py-20 cursor-pointer hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all">
                <Upload className="w-12 h-12 text-slate-800" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-6">Drop CSV Manifest</p>
                <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
            </label>
          </div>

          <div className="lg:col-span-2 bg-[#000d1a] border border-white/5 rounded-[45px] overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-500 tracking-widest">Entity Signature</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">Neural Status</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase text-slate-500 tracking-widest text-right">Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-10 py-20 text-center text-slate-700 font-black uppercase tracking-widest text-xs opacity-20 italic">
                      No Active Leads in Database
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="px-10 py-10">
                        <div className="font-black text-white uppercase italic tracking-tighter text-lg group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-1 tracking-widest font-bold">{lead.phone_number}</div>
                      </td>
                      <td className="px-10 py-10 text-center">
                        <span className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase italic tracking-widest border inline-block ${
                          lead.call_results?.[0]?.status === 'In Call 📞' 
                          ? 'bg-amber-500/5 text-amber-500 border-amber-500/20 animate-pulse' 
                          : 'bg-white/5 text-slate-600 border-white/5'
                        }`}>
                          {lead.call_results?.[0]?.status || 'Idle'}
                        </span>
                      </td>
                      <td className="px-10 py-10 text-right">
                        {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? (
                          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest italic">
                            Success Peak
                          </div>
                        ) : (
                          <span className="text-slate-800 text-[10px] font-black tracking-widest italic opacity-30 uppercase">Analyzing...</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}
