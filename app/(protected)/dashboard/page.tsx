'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import * as XLSX from 'xlsx'; // Import Excel Engine
import { 
  PhoneCall, TrendingUp, Users, Clock, ArrowUpTray, 
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
  const [notifications, setNotifications] = useState<{id: string, msg: string}[]>([]);
  const [liveLogs, setLiveLogs] = useState<{id: string, text: string, type: 'ai' | 'sys'}[]>([
    { id: '1', text: "System Initialized. Awaiting Uplink...", type: 'sys' }
  ]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    conversions: 0,
    creditsRemaining: 1000,
    avgPerformance: 0
  });

  // --- NEW: ONBOARDING STATE ---
  const [inviteData, setInviteData] = useState({ name: '', email: '' });
  const [isInviting, setIsInviting] = useState(false);

  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

  // --- NEW: ONBOARDING FUNCTION ---
  const sendInvite = async () => {
    if (!inviteData.name || !inviteData.email) return alert("Please fill in all fields");
    
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
        alert("Uplink Established. Magic Link Sent!");
        setInviteData({ name: '', email: '' }); // Clear form
        setLiveLogs(prev => [
          { id: Date.now().toString(), text: `SYS: Magic Link transmitted to ${inviteData.email}`, type: 'sys' },
          ...prev
        ].slice(0, 6));
      } else {
        throw new Error("Failed to send invite");
      }
    } catch (err) {
      alert("Error sending invitation.");
    } finally {
      setIsInviting(false);
    }
  };

  // --- EXPORT MASTER ROI ENGINE ---
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

    XLSX.writeFile(wb, `FRONTDESK_ROI_MASTER_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    setLiveLogs(prev => [
      { id: Date.now().toString(), text: "SYS: Master ROI Report Generated and Exported.", type: 'sys' },
      ...prev
    ].slice(0, 6));
  };

  // --- EXISTING SWARM & DATA LOGIC ---
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
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'call_results' }, (payload) => {
        const newCall = payload.new as any;
        setLiveLogs(prev => [{ id: Math.random().toString(), text: `AI: Node response received.`, type: 'ai' }, ...prev.slice(0, 5)]);
        fetchOperationalData();
      })
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
      <Headset className="w-12 h-12 text-cyan-500 animate-pulse" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans pb-20">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3 uppercase italic">
            FrontDesk <span className="text-cyan-500">Dashboard</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Core OS {SYSTEM_VERSION} • Secure Matrix</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExportROI}
            className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-cyan-500 hover:border-cyan-500/30 transition-all"
          >
            <Download className="w-4 h-4" /> Download ROI
          </button>
        </div>
      </div>

      {/* TERMINAL & SWARM ACTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-black border border-cyan-500/20 rounded-[40px] p-8 shadow-2xl h-[300px] overflow-hidden">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <h2 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Output Channel</h2>
          </div>
          <div className="space-y-3 font-mono">
            {liveLogs.map((log) => (
              <div key={log.id} className="flex gap-4 items-start animate-in fade-in slide-in-from-left-4">
                <span className={`text-[8px] mt-1 px-2 py-0.5 rounded font-bold ${log.type === 'ai' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-white/5 text-slate-600'}`}>
                  {log.type === 'ai' ? 'USR_AI' : 'SYS_LOG'}
                </span>
                <p className="text-[11px] text-slate-300 leading-relaxed truncate">
                  <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="p-3 bg-cyan-500/10 rounded-2xl w-fit mb-6"><Cpu className="w-6 h-6 text-cyan-500" /></div>
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Node Swarm</h3>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Trigger Bulk Call Sequence</p>
          </div>
          <button 
            onClick={handleDeploySwarm}
            disabled={isProcessing}
            className="w-full py-5 bg-cyan-500 text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Deploy Swarm Protocol'}
          </button>
        </div>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Entities', val: metrics.totalLeads, icon: Users, color: 'text-cyan-500' },
          { label: 'Conversions', val: metrics.conversions, icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'System Credits', val: metrics.creditsRemaining, icon: Clock, color: 'text-purple-500' },
          { label: 'Avg Accuracy', val: '99.2%', icon: Activity, color: 'text-orange-500' }
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#000d1a] border border-white/5 p-7 rounded-[32px] hover:border-cyan-500/30 transition-all group">
            <kpi.icon className={`w-5 h-5 ${kpi.color} mb-6`} />
            <p className="text-3xl font-black text-white italic tracking-tighter">{kpi.val}</p>
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{kpi.label}</h3>
          </div>
        ))}
      </div>

      {/* NEW: CLIENT ONBOARDING SECTION */}
      <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[40px] mb-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-cyan-500/10 rounded-lg">
            <UserPlus className="w-4 h-4 text-cyan-500" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">Client Onboarding Protocol</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder="Client Entity Name"
              value={inviteData.name}
              onChange={e => setInviteData({...inviteData, name: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/30 transition-all"
            />
          </div>
          <div className="flex-1 relative">
            <input 
              type="email"
              placeholder="Client Uplink Email"
              value={inviteData.email}
              onChange={e => setInviteData({...inviteData, email: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-xs text-white placeholder:text-slate-700 outline-none focus:border-cyan-500/30 transition-all"
            />
          </div>
          <button 
            onClick={sendInvite}
            disabled={isInviting}
            className="px-8 py-4 bg-cyan-500 text-[#000814] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            {isInviting ? 'Transmitting...' : 'Send Magic Link'}
          </button>
        </div>
      </div>

      {/* INGESTION & DATA TABLE */}
      <div className="space-y-8">
          <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[40px]">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[32px] py-12 cursor-pointer hover:bg-cyan-500/5 transition-all">
                <ArrowUpTray className="w-10 h-10 text-slate-700" />
                <p className="text-[11px] font-black text-white uppercase tracking-widest mt-4">Ingest Data Packet (.CSV)</p>
                <input type="file" accept=".csv" onChange={handleCSVUpload} className="hidden" />
            </label>
          </div>

          <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">Entity Signature</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-center">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-600 tracking-widest text-right">Insight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-10 py-8">
                      <div className="font-black text-white uppercase italic group-hover:text-cyan-500 transition-colors">{lead.full_name}</div>
                      <div className="text-[10px] text-slate-600 font-mono mt-1 tracking-widest">{lead.phone_number}</div>
                    </td>
                    <td className="px-10 py-8 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest border inline-block ${
                        lead.call_results?.[0]?.status === 'In Call 📞' 
                        ? 'bg-amber-500/5 text-amber-500 border-amber-500/20 animate-pulse' 
                        : 'bg-white/5 text-slate-500 border-white/5'
                      }`}>
                        {lead.call_results?.[0]?.status || 'IDLE'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      {lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? (
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest italic">
                          Success
                        </div>
                      ) : (
                        <span className="text-slate-800 text-[10px] font-black tracking-widest italic opacity-40 uppercase">Scanning...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}
