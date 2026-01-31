'use client';

import React, { useState } from 'react';
import { X, Download, Mail, Building, User } from 'lucide-react';

export default function LeadCaptureModal({ isOpen, onClose, studyName }: { isOpen: boolean, onClose: () => void, studyName: string }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to your Lead endpoint
    setTimeout(() => {
      setLoading(false);
      alert("Technical Whitepaper has been sent to your email!");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
            <Download className="text-blue-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold">Access Technical Case Study</h2>
          <p className="text-slate-400 text-sm mt-2">Download the full architecture breakdown for {studyName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
              <input required type="email" placeholder="name@company.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Company</label>
            <div className="relative">
              <Building className="absolute left-3 top-3 text-slate-500" size={18} />
              <input required type="text" placeholder="Fortune 500 Inc." className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Download Whitepaper"}
          </button>
          
          <p className="text-[10px] text-center text-slate-600">
            By downloading, you agree to our Terms and Privacy Policy regarding Enterprise outreach.
          </p>
        </form>
      </div>
    </div>
  );
}
