'use client';

import { TrendingUp, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function UpgradeButton({ currentTier, email, region }: any) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const res = await fetch('/api/checkout/upgrade', {
      method: 'POST',
      body: JSON.stringify({ email, newPlanId: 'ELITE', region }),
    });
    
    if (res.ok) {
      window.location.reload(); // Refresh to show new Neural Balance
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleUpgrade}
      disabled={loading}
      className="group relative overflow-hidden bg-emerald-500 px-6 py-3 rounded-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
    >
      <div className="flex items-center gap-3">
        <TrendingUp className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest text-black">
          {loading ? 'CALIBRATING...' : 'Scale to Elite Node'}
        </span>
      </div>
      {/* Glitch Effect Background */}
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </button>
  );
}
