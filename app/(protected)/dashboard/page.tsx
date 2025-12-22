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

const SYSTEM_VERSION = "v4.2.0-PRO";

export default function DashboardPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [liveLogs, setLiveLogs] = useState<{id: string, text: string, type: 'ai' | 'sys'}[]>([
    { id: '1', text: "Neural Core Initialized. Awaiting Uplink...", type: 'sys' }
  ]);
  
  // Enhanced Metrics including ROI tracking
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    conversions: 0,
    creditsRemaining: 1000,
    roiGenerated: 0
  });

  const [inviteData, setInviteData] = useState({ name: '', email: '', plan: Plans.STARTER });
  const [isInviting, setIsInviting] = useState(false);

  // --- CORE SYSTEM FUNCTION: SEND INVITE & INITIALIZE PLAN ---
  const sendInvite = async () => {
    if (!inviteData.name || !inviteData.email) return alert("Validation Error: All fields required.");
    
    setIsInviting(true);
    try {
      // 1. Establish the Uplink via your API
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
        // 2. Trigger the AI CEO Welcome Protocol we built
        await emailService.sendWelcomeEmail(inviteData.email, inviteData.name, inviteData.plan);

        setInviteData({ name: '', email: '', plan: Plans.STARTER }); 
        setLiveLogs(prev => [
          { id: Date.now().toString(), text: `SYS: Magic Link & AI Welcome dispatched to ${inviteData.email}`, type: 'sys' },
          ...prev
        ].slice(0, 6));
      }
    } catch (err) {
      console.error("Invitation Error:", err);
    } finally {
      setIsInviting(false);
    }
  };

  // --- ROI EXPORT ENGINE ---
  const handleExportROI = () => {
    const reportData = leads.map(lead => ({
      'Prospect Entity': lead.full_name,
      'AI Analysis': lead.call_results?.[0]?.summary || 'PENDING',
      'Value Captured': lead.call_results?.[0]?.sentiment_score === 'Hot 🔥' ? '$150.00' : '$0.00',
      'Timestamp': new Date(lead.created_at).toLocaleString()
    }));

    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Operational_ROI');
    XLSX.writeFile(wb, `FRONTDESK_ROI_${new Date().toISOString().split('T')[0]}.xlsx`);
    
    setLiveLogs(prev => [{ id: Date.now().toString(), text: "SYS: Excel ROI Manifest Exported.", type: 'sys' }, ...prev]);
  };

  // ... (Keep your existing fetchOperationalData and handleCSVUpload functions here)

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300 font-sans pb-20 px-4 md:px-10 lg:px-20">
      {/* Existing Header, Terminal, and KPI Grid code goes here... */}
      
      {/* UPDATED ONBOARDING SECTION WITH PLAN SELECTION */}
      <div className="bg-[#000d1a] border border-white/5 p-10 rounded-[45px] mb-12 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-white/5 rounded-2xl"><UserPlus className="w-5 h-5 text-cyan-500" /></div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tighter text-white italic">Client Onboarding Protocol</h2>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Assign Tier & Transmit Secure Access</p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-5">
          <input 
            type="text" placeholder="Entity Name" value={inviteData.name}
            onChange={e => setInviteData({...inviteData, name: e.target.value})}
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50"
          />
          <input 
            type="email" placeholder="Corporate Email" value={inviteData.email}
            onChange={e => setInviteData({...inviteData, email: e.target.value})}
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50"
          />
          <select 
            value={inviteData.plan}
            onChange={e => setInviteData({...inviteData, plan: e.target.value as Plans})}
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-5 text-sm text-white outline-none focus:border-cyan-500/50 appearance-none"
          >
            <option value={Plans.STARTER}>Starter Tier</option>
            <option value={Plans.PROFESSIONAL}>Professional Tier</option>
            <option value={Plans.ENTERPRISE}>Enterprise Tier</option>
          </select>
          <button 
            onClick={sendInvite}
            disabled={isInviting || !inviteData.email}
            className="px-10 py-5 bg-white text-[#000814] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-cyan-500 transition-all"
          >
            {isInviting ? 'Transmitting...' : 'Establish Uplink'}
          </button>
        </div>
      </div>

      {/* ... (Keep your Packet Ingestion and Master Table code here) */}
    </div>
  );
}
