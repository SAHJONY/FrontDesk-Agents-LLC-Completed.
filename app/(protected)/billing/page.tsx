'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  CreditCard, DollarSign, BarChart3, 
  ArrowUpRight, Users, Zap, History 
} from 'lucide-react';

export default function BillingPage() {
  const supabase = createClient();
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillingData();
  }, []);

  async function fetchBillingData() {
    const { data } = await supabase
      .from('client_invitations')
      .select('*')
      .order('usage_credits', { ascending: false });
    if (data) setClients(data);
    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/5 pb-10">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Revenue <span className="text-cyan-500">Analytics</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2">Usage Tracking & Ledger Management</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#000d1a] border border-white/5 px-6 py-3 rounded-2xl">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Gross Agency Volume</p>
              <p className="text-xl font-black text-white italic">$12,450.00</p>
           </div>
        </div>
      </div>

      {/* Client Ledger Table */}
      <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
           <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-cyan-500" />
              <h2 className="text-[10px] font-black text-white uppercase tracking-widest">Active Accounts</h2>
           </div>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/20">
              <th className="px-10 py-5 text-[9px] font-black uppercase text-slate-600 tracking-widest">Client Entity</th>
              <th className="px-10 py-5 text-[9px] font-black uppercase text-slate-600 tracking-widest">Neural Credits</th>
              <th className="px-10 py-5 text-[9px] font-black uppercase text-slate-600 tracking-widest">Total Calls</th>
              <th className="px-10 py-5 text-[9px] font-black uppercase text-slate-600 tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-10 py-6">
                  <div className="font-bold text-white uppercase italic text-sm">{client.client_name}</div>
                  <div className="text-[9px] text-slate-600 font-mono mt-0.5 uppercase tracking-tighter">ID: {client.id.split('-')[0]}</div>
                </td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500" 
                        style={{ width: `${Math.min((client.usage_credits / 5000) * 100, 100)}%` }} 
                      />
                    </div>
                    <span className="text-xs font-mono text-cyan-500 font-bold">{client.usage_credits}</span>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="text-xs font-black text-slate-400">{client.total_calls_made || 0}</span>
                </td>
                <td className="px-10 py-6 text-right">
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase text-slate-400 hover:text-white hover:bg-cyan-500 transition-all">
                    Add Credits
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Agency Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-[#001a33] to-[#000d1a] border border-cyan-500/20 p-8 rounded-[40px]">
            <Zap className="w-6 h-6 text-cyan-500 mb-4" />
            <p className="text-3xl font-black text-white italic tracking-tighter">2.4m</p>
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Seconds Processed</h3>
         </div>
         <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[40px]">
            <BarChart3 className="w-6 h-6 text-purple-500 mb-4" />
            <p className="text-3xl font-black text-white italic tracking-tighter">84%</p>
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Profit Margin</h3>
         </div>
         <div className="bg-[#000d1a] border border-white/5 p-8 rounded-[40px]">
            <History className="w-6 h-6 text-emerald-500 mb-4" />
            <p className="text-3xl font-black text-white italic tracking-tighter">12</p>
            <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active Subscriptions</h3>
         </div>
      </div>
    </div>
  );
}
