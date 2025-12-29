'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Dashboard: Fleet Phone Management (Elite UI)
 */

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Phone, Plus, Trash2, Settings, CheckCircle, XCircle, Zap, Globe, ShieldAlert } from 'lucide-react';

interface PhoneNumber {
  id: string;
  phoneNumber: string;
  countryCode: string;
  nodeType: string;
  status: string;
  capabilities: any;
  provisionedAt: string;
  todayCalls?: number;
  qualifiedLeads?: number;
}

export default function PhoneNumbersPage() {
  const { user } = useAuth();
  const [numbers, setNumbers] = useState<PhoneNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProvisionModal, setShowProvisionModal] = useState(false);

  useEffect(() => {
    if (user) fetchPhoneNumbers();
  }, [user]);

  async function fetchPhoneNumbers() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/telephony/list-numbers?tenant_id=${user?.tenant_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setNumbers(data.numbers || []);
      }
    } catch (error) {
      console.error('Fleet Retrieval Error:', error);
    } finally {
      setLoading(false);
    }
  }

  // Enforcing Permanent Pricing Tier Limits [cite: 2025-12-28]
  const getTierLimit = () => {
    const limits: Record<string, number> = {
      basic: 1,         // $199
      professional: 3,  // $399
      growth: 10,       // $799
      elite: 999,       // $1,499
    };
    return limits[user?.tier || 'basic'];
  };

  const canProvisionMore = numbers.length < getTierLimit();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Fleet Inventory</h1>
            <p className="text-blue-500 font-mono text-[10px] tracking-widest uppercase mt-1">
              {numbers.length} / {getTierLimit()} Telephony Nodes Online
            </p>
          </div>
          <button
            onClick={() => setShowProvisionModal(true)}
            disabled={!canProvisionMore}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Node</span>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-900/50 rounded-3xl animate-pulse border border-zinc-800" />
            ))}
          </div>
        ) : numbers.length === 0 ? (
          <div className="glass-panel rounded-3xl border border-zinc-800 p-20 text-center bg-zinc-950/50 backdrop-blur-xl">
            <Phone className="w-16 h-16 mx-auto mb-6 text-zinc-800" />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-2">No Active Nodes</h3>
            <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">Your workforce is currently disconnected. Provision a global number to start revenue operations.</p>
            <button
              onClick={() => setShowProvisionModal(true)}
              className="px-8 py-3 bg-zinc-900 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Initialize Fleet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {numbers.map((number) => (
              <div key={number.id} className="glass-panel group rounded-3xl border border-zinc-800 bg-zinc-950/50 hover:border-blue-500/50 transition-all p-6 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:bg-blue-600 group-hover:border-blue-400 transition-colors">
                      <Zap className="w-5 h-5 text-blue-500 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-black tracking-tight">{number.phoneNumber}</p>
                      <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{number.nodeType} NODE</p>
                    </div>
                  </div>
                  {number.status === 'active' ? (
                    <div className="flex items-center text-green-500 space-x-1">
                       <CheckCircle className="w-4 h-4 fill-current opacity-20" />
                       <span className="text-[8px] font-black uppercase">Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-red-500 space-x-1">
                       <ShieldAlert className="w-4 h-4" />
                       <span className="text-[8px] font-black uppercase">Error</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 uppercase">Market</span>
                    <span className="text-zinc-200 font-bold">{number.countryCode}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-900 pb-2">
                    <span className="text-zinc-500 uppercase">Daily Dials</span>
                    <span className="text-zinc-200 font-bold">{number.todayCalls || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="text-zinc-500 uppercase">Qualified</span>
                    <span className="text-green-500 font-bold">{number.qualifiedLeads || 0}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <button className="flex items-center justify-center space-x-2 py-3 bg-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                    <Settings className="w-3 h-3" />
                    <span>Config</span>
                  </button>
                  <button className="flex items-center justify-center py-3 bg-zinc-900 rounded-xl text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!canProvisionMore && (
          <div className="mt-10 p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Zap className="text-blue-500" />
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Fleet Capacity Reached</p>
                <p className="text-[10px] text-zinc-400 mt-1">Upgrade your tier to expand your global workforce footprint.</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Upgrade</button>
          </div>
        )}
      </div>

      {showProvisionModal && (
        <ProvisionNumberModal
          onClose={() => setShowProvisionModal(false)}
          onSuccess={() => {
            setShowProvisionModal(false);
            fetchPhoneNumbers();
          }}
        />
      )}
    </div>
  );
}

// Sub-component: Provisioning Modal (Elite Themed)
function ProvisionNumberModal({ onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] max-w-md w-full p-10 shadow-2xl">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Node Provisioning</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Market Region</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <select className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold appearance-none outline-none focus:border-blue-500">
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Logic Node Type</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 text-sm font-bold appearance-none outline-none focus:border-blue-500">
              <option value="receptionist">Inbound Receptionist</option>
              <option value="qualification">Lead Qualification</option>
              <option value="scaling">High-Volume Scale</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10">
          <button onClick={onClose} className="py-4 text-xs font-black uppercase text-zinc-500 tracking-widest">Abort</button>
          <button 
            disabled={loading}
            onClick={() => { setLoading(true); setTimeout(onSuccess, 1500); }} 
            className="py-4 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg"
          >
            {loading ? 'SYNCING...' : 'Authorize Node'}
          </button>
        </div>
      </div>
    </div>
  );
                }
