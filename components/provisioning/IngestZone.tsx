'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, Globe, CheckCircle2, X } from 'lucide-react';

export default function IngestZone() {
  const [files, setFiles] = useState<{ name: string; status: string }[]>([]);
  const [url, setUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setFiles([...files, { name: newFile.name, status: 'SYNCING' }]);
      // Trigger actual upload logic here
      setTimeout(() => {
        setFiles(prev => prev.map(f => f.name === newFile.name ? { ...f, status: 'INJECTED' } : f));
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4 italic">Intelligence <span className="text-cyan-500">Ingest</span></h2>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em] mb-8">Feed the Neural Grid with Institutional Data</p>
      </div>

      {/* URL SCRAPER INPUT */}
      <div className="bg-white/5 border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Globe className="w-4 h-4 text-cyan-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">Web Domain Scraping</span>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="HTTPS://YOUR-BUSINESS.COM" 
            className="flex-1 bg-black/40 border border-white/10 p-4 text-[10px] font-bold uppercase tracking-widest focus:border-cyan-500 outline-none"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="bg-white text-black px-6 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 transition-all">
            Scrape
          </button>
        </div>
      </div>

      {/* FILE DROP ZONE */}
      <label className="group block cursor-pointer">
        <div className="border-2 border-dashed border-white/10 bg-white/[0.02] p-12 text-center group-hover:border-cyan-500/50 transition-all">
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.txt" />
          <UploadCloud className="w-10 h-10 text-slate-700 group-hover:text-cyan-500 mx-auto mb-4 transition-all" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white">
            Drop PDF, DOCX, or TXT Knowledge Base
          </p>
        </div>
      </label>

      {/* SYNC FEED */}
      <div className="space-y-2">
        {files.map((file, i) => (
          <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 p-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-cyan-500" />
              <span className="text-[9px] font-bold uppercase tracking-widest">{file.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[8px] font-black px-2 py-1 rounded ${file.status === 'INJECTED' ? 'bg-cyan-500/20 text-cyan-500' : 'bg-white/5 text-slate-500'}`}>
                {file.status}
              </span>
              <CheckCircle2 className={`w-4 h-4 ${file.status === 'INJECTED' ? 'text-cyan-500' : 'text-slate-700'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
