'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  GlobeAmericasIcon, 
  SignalIcon, 
  LockClosedIcon, 
  MapIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const regions = [
  { id: 'na', name: 'North America', status: 'Active', latency: '24ms', load: '12%' },
  { id: 'eu', name: 'European Union', status: 'Active', latency: '88ms', load: '45%' },
  { id: 'latam', name: 'Latin America', status: 'Standby', latency: '112ms', load: '0%' },
  { id: 'apac', name: 'Asia Pacific', status: 'Restricted', latency: '194ms', load: '0%' },
];

export default function OutreachSettings() {
  const [activeRegions, setActiveRegions] = useState(['na', 'eu']);

  return (
    <div className="min-h-screen bg-[#000814] pb-20">
      
      {/* HEADER: NEURAL SIGNAL STATUS */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Global <span className="text-cyan-500">Outreach</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
            <SignalIcon className="w-3 h-3 text-cyan-500 animate-pulse" /> 
            Active Satellite Uplink: Global Node Network
          </p>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#000d1a] border border-cyan-500/20 px-6 py-3 rounded-2xl shadow-lg shadow-cyan-500/5">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Network Integrity</p>
              <p className="text-xl font-black text-cyan-500 italic uppercase">99.9% Operational</p>
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* REGION CONTROL PANEL */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#000d1a] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-white/[0.01]">
              <h2 className="text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                <MapIcon className="w-4 h-4 text-cyan-500" /> Geographic Deployment
              </h2>
            </div>
            
            <div className="divide-y divide-white/5">
              {regions.map((region) => (
                <div key={region.id} className="p-8 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-center gap-6">
                    <div className={`w-3 h-3 rounded-full ${activeRegions.includes(region.id) ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`} />
                    <div>
                      <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{region.name}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Latency: {region.latency}</span>
                        <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Network Load: {region.load}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setActiveRegions(prev => 
                        prev.includes(region.id) ? prev.filter(r => r !== region.id) : [...prev, region.id]
                      )
                    }}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeRegions.includes(region.id) 
                      ? 'bg-cyan-500 text-[#000814]' 
                      : 'bg-white/5 text-slate-500 border border-white/10 hover:text-white'
                    }`}
                  >
                    {activeRegions.includes(region.id) ? 'Active' : 'Deploy'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLIANCE BLOCK */}
          <div className="bg-gradient-to-br from-[#000d1a] to-black border border-white/5 p-10 rounded-[40px] flex items-start gap-8">
            <div className="bg-cyan-500/10 p-4 rounded-2xl">
              <LockClosedIcon className="w-8 h-8 text-cyan-500" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-2">Automated Compliance Filters</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 uppercase font-bold tracking-tight">
                Our system automatically cross-references the "National Do Not Call Registry" and local time-zone restrictions before establishing any neural uplink.
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                   <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest italic">DNC Scrubbing Active</span>
                </div>
                <div className="flex items-center gap-2">
                   <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest italic">STIR/SHAKEN Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR: SYSTEM LOGS */}
        <div className="space-y-8">
          <div className="bg-black border border-cyan-500/20 rounded-[40px] p-8 shadow-2xl">
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Real-Time Routing</h3>
            <div className="space-y-4 font-mono">
              {[
                { time: '02:04:12', msg: 'Uplink established in Ohio (US-EAST)' },
                { time: '02:04:15', msg: 'Routing neural packet via London' },
                { time: '02:05:01', msg: 'Compliance check passed: Region NA' },
              ].map((log, i) => (
                <div key={i} className="text-[10px] leading-relaxed">
                  <span className="text-slate-700 mr-2">[{log.time}]</span>
                  <span className="text-cyan-500/80 uppercase">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-[40px] border border-white/5 h-64 shadow-2xl">
             <Image 
              src="/premium/command-center-dark.jpg" 
              alt="Global Monitoring" 
              fill 
              className="object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
             <div className="absolute bottom-6 left-6">
                <p className="text-[9px] font-black text-cyan-500 uppercase tracking-widest mb-1 italic">Network Monitoring</p>
                <p className="text-xs font-bold text-white uppercase italic">Station ID: FD-Global-01</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
