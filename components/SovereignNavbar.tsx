import React from 'react';
import Link from 'next/link';

interface NavProps {
  direction: 'ltr' | 'rtl';
  market: string;
}

export const SovereignNavbar = ({ direction, market }: NavProps) => {
  return (
    <nav 
      dir={direction} 
      className="w-full bg-brand-dark border-b border-brand-slate/20 px-6 py-4 flex items-center justify-between"
    >
      {/* Brand Identity: Automatically mirrors based on direction */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 bg-brand-cyan rounded-sm animate-pulse-slow shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <span className="text-white font-mono font-bold tracking-tighter text-xl">
          FRONTDESK <span className="text-brand-cyan">SOVEREIGN</span>
        </span>
      </div>

      {/* Navigation Links: Using logical padding (ps/pe) */}
      <div className="hidden md:flex items-center gap-8 text-brand-slate font-sans text-sm">
        <Link href="/audit" className="hover:text-white transition-colors">Forensic Audit</Link>
        <Link href="/vault" className="hover:text-white transition-colors">Shadow Vault</Link>
        <Link href="/nodes" className="hover:text-white transition-colors">Global Nodes</Link>
      </div>

      {/* Market Indicator: High-Urgency Red for Alerts */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col text-end">
          <span className="text-[10px] text-brand-slate uppercase tracking-widest">Active Market</span>
          <span className="text-xs text-white font-mono">{market}</span>
        </div>
        <div className="h-2 w-2 rounded-full bg-brand-emergency shadow-[0_0_8px_#ef4444]" />
      </div>
    </nav>
  );
};
