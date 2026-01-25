'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Settings Node: System Configuration & Tier Management
 */

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  User,
  Building,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Zap,
  ChevronRight,
  Database,
} from 'lucide-react';
import { LegalComplianceBadge } from '@/components/legal/LegalComplianceBadge';

type TabId = 'profile' | 'company' | 'billing' | 'notifications' | 'security';

export default function SettingsPage() {
  const { user } = useAuth();

  // If auth is still loading or user is null, render nothing (or a skeleton).
  if (!user) return null;

  // Safely normalize tenant so TS never complains (and UI always has values).
  const tenant = useMemo(() => {
    const t = user.tenant ?? ({} as any);
    return {
      tier: t.tier ?? 'core',
      currencyCode: t.currencyCode ?? 'USD',
      regionalMultiplier: typeof t.regionalMultiplier === 'number' ? t.regionalMultiplier : 1.0,
    };
  }, [user.tenant]);

  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const tabs: Array<{ id: TabId; label: string; icon: React.ElementType }> = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'company', label: 'Organization', icon: Building },
    { id: 'billing', label: 'Financials', icon: CreditCard },
    { id: 'notifications', label: 'Intelligence Alerts', icon: Bell },
    { id: 'security', label: 'Vault Security', icon: Shield },
  ];

  const tierPrice =
    tenant.tier === 'elite' ? '1,499' : tenant.tier === 'growth' ? '799' : '399';

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            {/* removed duplicate "italic" class */}
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control Node</h1>
            <LegalComplianceBadge />
          </div>
          <p className="text-zinc-500 text-[10px] font-mono tracking-[0.4em] uppercase">
            System Configuration // Version 2.2.0
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.2)]'
                        : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-white' : 'text-zinc-600 group-hover:text-blue-500'
                        }`}
                      />
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        {tab.label}
                      </span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Configuration Terminal */}
          <div className="lg:col-span-3">
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Database className="w-32 h-32" />
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <div>
                    <h2 className="text-xl font-black uppercase italic tracking-tight mb-2">
                      Identity Matrix
                    </h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Update your operative credentials
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input type="text" defaultValue={user.fullName ?? ''} className="input-field" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                        Email Terminal
                      </label>
                      <input type="email" defaultValue={user.email ?? ''} className="input-field" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'company' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <div>
                    <h2 className="text-xl font-black uppercase italic tracking-tight mb-2">
                      Organization Node
                    </h2>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                      Global market & Tier settings
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">
                          Active Subscription
                        </p>
                        <h3 className="text-2xl font-black uppercase italic">{tenant.tier} Tier</h3>
                        <p className="text-zinc-500 text-[10px] mt-1 uppercase font-bold tracking-widest">
                          Permanent Price: ${tierPrice}/mo
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all" type="button">
                        Upgrade Tier
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Globe className="w-3 h-3" /> Local Market Currency
                        </label>
                        <select className="input-field appearance-none" defaultValue={tenant.currencyCode}>
                          <option value="USD">USD</option>
                          <option value="GBP">GBP</option>
                          <option value="EUR">EUR</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <Zap className="w-3 h-3" /> Regional Multiplier
                        </label>
                        {/* avoid controlled-input lint by using readOnly/defaultValue */}
                        <input
                          type="text"
                          defaultValue={`${tenant.regionalMultiplier}x`}
                          readOnly
                          className="input-field opacity-50 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-end">
                <button className="px-10 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all" type="button">
                  Commit Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 1rem 1.5rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: white;
          outline: none;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: #2563eb;
          background: #000;
        }
      `}</style>
    </div>
  );
}
