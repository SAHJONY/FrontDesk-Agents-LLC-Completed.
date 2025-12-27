'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Layers, 
  CheckCircle, 
  RefreshCw,
  Globe,
  FileText
} from 'lucide-react';

export const IngestionMonitor = () => {
  const [progress, setProgress] = useState(0);
  const [activeLayer, setActiveLayer] = useState('Metadata Analysis');
  
  // Simulate the Knowledge Ingestion Phase
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 0.5;
      });
    }, 100);

    const layerTimer = setInterval(() => {
      const layers = [
        'Metadata Analysis', 
        'URL Topology Mapping', 
        'Content Extraction', 
        'Semantic Vectorization', 
        'Neural Mirror Synthesis'
      ];
      setActiveLayer(prev => {
        const idx = layers.indexOf(prev);
        return layers[(idx + 1) % layers.length];
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(layerTimer);
    };
  }, []);

  return (
    <div className="bg-[#020305] border border-white/10 p-8 rounded-sm font-sans selection:bg-cyan-500/30 shadow-2xl">
      
      {/* HEADER: INGESTION LOGIC */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2 italic">Data Acquisition</h2>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
            Knowledge <span className="text-slate-700">Ingestion Bridge</span>
          </h3>
        </div>
        <div className="animate-spin text-cyan-500 duration-[3000ms]">
          <RefreshCw className="w-6 h-6" />
        </div>
      </div>

      {/* PROGRESS TRACKER */}
      <div className="space-y-4 mb-10">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
          <span>{activeLayer}</span>
          <span className="text-cyan-500 tabular-nums">{Math.floor(progress)}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ASSET NODES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* WEBSPACE SCAN */}
        <div className="p-5 bg-white/[0.03] border border-white/5 flex items-center gap-5 group hover:border-cyan-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-cyan-500" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Web Domain</p>
            <p className="text-xs font-bold text-white tracking-tight">https://client-asset.com</p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`w-3 h-0.5 ${progress > i * 20 ? 'bg-cyan-500' : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* DOCUMENT INGESTION */}
        <div className="p-5 bg-white/[0.03] border border-white/5 flex items-center gap-5 group hover:border-cyan-500/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Internal Repository</p>
            <p className="text-xs font-bold text-white tracking-tight">SOP_Standard_v2.pdf</p>
            <span className="text-[8px] font-black text-purple-500 uppercase tracking-widest mt-1 inline-block">Siloed</span>
          </div>
        </div>

      </div>

      {/* LOG: NEURAL MIRRORING PROGRESS */}
      <div className="mt-10 pt-8 border-t border-white/5">
        <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6 italic">Ingestion Stream</h4>
        <div className="space-y-3">
          {[
            { tag: 'SCAN', msg: 'Indexing service hierarchy...', status: 'Active' },
            { tag: 'EXTRACT', msg: 'Forensic pricing data identified.', status: 'Done' },
            { tag: 'VECTOR', msg: 'Storing in Aegis Silo 04...', status: 'Done' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-[10px] font-medium border-b border-white/[0.02] pb-2">
              <span className={`px-2 py-0.5 text-[8px] font-black rounded-sm border ${
                item.status === 'Done' ? 'border-green-500/20 text-green-500' : 'border-cyan-500/20 text-cyan-500 animate-pulse'
              }`}>
                {item.tag}
              </span>
              <span className="text-slate-400">{item.msg}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
