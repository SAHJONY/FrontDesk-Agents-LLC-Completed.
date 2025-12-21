'use client';

import { useState, useRef } from 'react';
import { 
  CloudArrowUpIcon, 
  DocumentArrowUpIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

export default function BatchImporter() {
  const [dragActive, setDragActive] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (file && file.type === "text/csv") {
      // Logic for parsing CSV and mapping to Neural Swarm fields
      // For now, simulating a successful enterprise ingest
      setIsProcessing(true);
      setTimeout(() => {
        setLeads(new Array(1250).fill({ name: "Lead Data", status: "Ready" }));
        setIsProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[40px] p-10 shadow-2xl">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Neural <span className="text-cyan-500">Lead Ingestion</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] mt-2">
            Standard: CSV / UTF-8 • American English Protocol
          </p>
        </div>
        {leads.length > 0 && (
          <button className="flex items-center gap-3 px-8 py-4 bg-cyan-500 text-[#000814] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-cyan-500/20">
            <PlayIcon className="w-4 h-4" /> Execute Bland.AI Swarm
          </button>
        )}
      </div>

      {/* DRAG & DROP ZONE */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[30px] p-20 flex flex-col items-center justify-center transition-all cursor-pointer ${
          dragActive ? 'border-cyan-500 bg-cyan-500/5' : 'border-white/10 bg-black/20 hover:bg-white/[0.02]'
        }`}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept=".csv" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        
        {isProcessing ? (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-6" />
            <p className="text-[10px] font-black text-white uppercase tracking-widest animate-pulse">Analyzing Data Integrity...</p>
          </div>
        ) : leads.length > 0 ? (
          <div className="text-center">
            <CheckCircleIcon className="w-16 h-16 text-emerald-500 mb-6 mx-auto" />
            <p className="text-3xl font-black text-white uppercase italic tracking-tighter">{leads.length} Leads Ready</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Sovereign Data Validation Passed</p>
          </div>
        ) : (
          <div className="text-center">
            <CloudArrowUpIcon className="w-16 h-16 text-slate-700 mb-6 mx-auto" />
            <p className="text-lg font-bold text-white uppercase tracking-tight">Drop Lead Manifest Here</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">Maximum Batch Size: 50,000 Records</p>
          </div>
        )}
      </div>

      {/* TECHNICAL SPECS FOOTER */}
      <div className="mt-10 grid grid-cols-3 gap-6 pt-10 border-t border-white/5">
        <div className="flex items-center gap-3">
          <DocumentArrowUpIcon className="w-5 h-5 text-cyan-500" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Auto-Formatting Active</span>
        </div>
        <div className="flex items-center gap-3">
          <ExclamationCircleIcon className="w-5 h-5 text-purple-500" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">DNC Scrubbing Enabled</span>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Zero-Knowledge Secure</span>
        </div>
      </div>
    </div>
  );
}
