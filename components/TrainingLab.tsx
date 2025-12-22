'use client';

import React, { useState } from 'react';
import { BookOpen, Upload, CheckCircle, BrainCircuit } from 'lucide-react';

export const TrainingLab = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [trained, setTrained] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    // Logic: Upload to Supabase Storage -> Trigger Edge Function for Vectorization
    setTimeout(() => {
      setIsUploading(false);
      setTrained(true);
    }, 3000);
  };

  return (
    <div className="bg-[#000d1a] border border-white/5 rounded-[45px] p-10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <BrainCircuit className="w-24 h-24 text-cyan-500" />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-2xl">
          <BookOpen className="w-6 h-6 text-cyan-500" />
        </div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">Agent Training Lab</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Update Agent Knowledge Base (PDF / TXT)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-[35px] py-20 cursor-pointer transition-all ${
          trained ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/10 hover:bg-white/[0.02]'
        }`}>
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          ) : trained ? (
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          ) : (
            <Upload className="w-10 h-10 text-slate-700" />
          )}
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-6">
            {isUploading ? 'Vectorizing Knowledge...' : trained ? 'Neural Sync Complete' : 'Drop Training Manual'}
          </p>
          <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.txt" />
        </label>

        <div className="space-y-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <h4 className="text-[10px] font-black text-cyan-500 uppercase mb-2">Active Intelligence</h4>
            <p className="text-xs text-slate-400">The Growth Agent is currently using <strong>Q4_Sales_Script.pdf</strong> for objection handling.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5 opacity-50">
            <h4 className="text-[10px] font-black text-slate-500 uppercase mb-2">Pending Knowledge</h4>
            <p className="text-xs text-slate-600">No new packets in queue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
