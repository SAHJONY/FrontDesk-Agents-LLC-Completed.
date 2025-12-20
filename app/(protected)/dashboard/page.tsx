'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import PersonaEditor from './PersonaEditor';
import SalesLeads from './SalesLeads';
import { 
  ShieldCheckIcon,
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({
    callsProcessed: 0,
    minutesUsed: 0,
    totalMinutes: 1000,
  });

  const userId = '42c9eda0-81fd-4d7a-b9f7-49bba359d6ce';

  useEffect(() => {
    async function fetchMetrics() {
      const { data: logs } = await supabase
        .from('consumption_log')
        .select('minutes_used')
        .eq('user_id', userId);
      
      if (logs) {
        const total = logs.reduce((acc, l) => acc + (l.minutes_used || 0), 0);
        setMetrics(prev => ({ ...prev, minutesUsed: Math.round(total) }));
      }
    }
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-[#000814] text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Command Center</h1>
          <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
            <ShieldCheckIcon className="w-4 h-4" /> User: {userId.slice(0,8)}...
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={ChartBarIcon} label="Overview" />
          <TabButton active={activeTab === 'leads'} onClick={() => setActiveTab('leads')} icon={UserGroupIcon} label="Leads" />
          <TabButton active={activeTab === 'agents'} onClick={() => setActiveTab('agents')} icon={Cog6ToothIcon} label="AI Agents" />
        </div>
      </div>

      {/* Dynamic Content Rendering */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-8">
             {/* Use your previously defined Metric Cards here */}
             <div className="bg-slate-900/40 p-8 rounded-[32px] border border-white/5 text-center">
                <p className="text-gray-500 italic">Select a tab to manage your AI SDR fleet.</p>
             </div>
          </div>
        )}

        {activeTab === 'leads' && <SalesLeads />}
        
        {activeTab === 'agents' && <PersonaEditor />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
        active ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
