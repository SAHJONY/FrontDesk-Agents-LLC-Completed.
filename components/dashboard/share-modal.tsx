"use client";

import React, { useState } from 'react';
import { Share2, Copy, Check, Link as LinkIcon, Globe } from 'lucide-react';

export function ShareDashboard({ tenantId }: { tenantId: string }) {
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateLink = async () => {
    setLoading(true);
    // This calls the API route we discussed earlier
    const res = await fetch('/api/share', {
      method: 'POST',
      body: JSON.stringify({ tenantId }),
    });
    const data = await res.json();
    setShareUrl(data.shareUrl);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.02] backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Share2 className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold">External Monitoring</h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Public Access Control</p>
        </div>
      </div>

      {!shareUrl ? (
        <button 
          onClick={generateLink}
          disabled={loading}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-tighter rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? "Generating Secure Token..." : "Generate Live Monitoring Link"}
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-black/40 rounded-xl border border-white/5">
            <LinkIcon className="w-4 h-4 text-slate-500" />
            <input 
              readOnly 
              value={shareUrl} 
              className="bg-transparent text-[10px] font-mono text-emerald-500 outline-none w-full"
            />
            <button onClick={copyToClipboard} className="text-slate-400 hover:text-white">
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[9px] text-slate-500 italic flex items-center gap-1">
            <Globe className="w-3 h-3" /> This link bypasses authentication for this specific view only.
          </p>
        </div>
      )}
    </div>
  );
}
