'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Settings Node: System Configuration & Fiscal Orchestration
 */

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import {
  User,
  Building,
  CreditCard,
  Bell,
  Shield,
  ChevronRight,
  Database,
  Layers,
  Key,
  Lock,
  ExternalLink,
  Loader2,
  Receipt
} from 'lucide-react';
import { LegalComplianceBadge } from '@/components/legal/LegalComplianceBadge';

type TabId = 'profile' | 'company' | 'billing' | 'notifications' | 'security';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  // Safely normalize tenant data
  const tenant = useMemo(() => {
    const t = user?.tenant ?? ({} as any);
    return {
      tier: t.tier ?? 'starter',
      label: t.tier_label ?? 'Starter Node',
      status: t.subscription_status ?? 'active',
    };
  }, [user?.tenant]);

  /**
   * FISCAL GATEWAY ORCHESTRATION
   * Redirects user to the secure Stripe Customer Portal
   */
  const handleManageBilling = async () => {
    setIsBillingLoading(true);
    try {
      const response = await fetch('/api/billing/portal', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const { url, error } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error(error || "Portal initialization failed");
      }
    } catch (err) {
      console.error("❌ [BILLING_ERROR]:", err);
      // Implementation for corporate error toast would go here
    } finally {
      setIsBillingLoading(false);
    }
  };

  if (!user) return null;

  const tabs: Array<{ id: TabId; label: string; icon: React.ElementType }> = [
    { id: 'profile', label: 'Identity', icon: User },
    { id: 'company', label: 'Organization', icon: Building },
    { id: 'billing', label: 'Financials', icon: CreditCard },
    { id: 'notifications', label: 'Intelligence Alerts', icon: Bell },
    { id: 'security', label: 'Vault Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-12 selection:bg-blue-500/30 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control Node</h1>
            <LegalComplianceBadge />
          </div>
          <p className="text-zinc-500 text-[10px] font-mono tracking-[0.4em] uppercase">
            System Configuration // Version 2.2.1
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
            <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
              
              {/* Profile Matrix */}
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <SectionHeader title="Identity Matrix" subtitle="Update your operative credentials" icon={Layers} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="Full Name" defaultValue={user.fullName ?? ''} />
                    <InputField label="Email Terminal" defaultValue={user.email ?? ''} type="email" />
                  </div>
                </div>
              )}

              {/* Billing & Financials */}
              {activeTab === 'billing' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <SectionHeader title="Financial Infrastructure" subtitle="Manage enterprise subscriptions & tax documentation" icon={CreditCard} />
                  
                  <div className="p-8 bg-zinc-900/40 rounded-[2rem] border border-zinc-800 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-600/20">
                          <Receipt className="text-blue-500 w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Active Provisioning Plan</p>
                          <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">{tenant.label}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{tenant.status}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row gap-4">
                      <button 
                        onClick={handleManageBilling}
                        disabled={isBillingLoading}
                        className="flex-1 bg-white text-black py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isBillingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Manage Subscription <ExternalLink size={14} /></>}
                      </button>
                      <button className="flex-1 bg-zinc-900 text-zinc-400 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border border-zinc-800 hover:text-white transition-all">
                        View Billing History
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SecurityFeature icon={<Shield size={14} className="text-blue-500" />} text="AES-256 Encrypted Payments" />
                    <SecurityFeature icon={<Lock size={14} className="text-blue-500" />} text="PCI-DSS Compliant Gateway" />
                  </div>
                </div>
              )}

              {/* Security & API Keys */}
              {activeTab === 'security' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <SectionHeader title="Vault Security" subtitle="Infrastructure Credentials & Edge Authentication" icon={Lock} />
                  <div className="space-y-6">
                    <CredentialBlock title="Real-time Telemetry (Redis)" icon={Database} inputs={[
                      { label: 'UPSTASH_REDIS_REST_URL', placeholder: 'https://...upstash.io' },
                      { label: 'UPSTASH_REDIS_REST_TOKEN', placeholder: '••••••••••••••••' }
                    ]} />
                    <CredentialBlock title="Messaging Gateway" icon={Key} inputs={[
                      { label: 'SMS_GATEWAY_KEY', placeholder: 'SK_PROD_••••' },
                      { label: 'RESEND_API_KEY', placeholder: 're_••••••••' }
                    ]} color="text-emerald-500" />
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-end">
                <button className="px-10 py-4 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.3)] transition-all active:scale-95" type="button">
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
          background: #090909;
          border: 1px solid #1a1a1a;
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
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.1);
        }
      `}</style>
    </div>
  );
}

/* =======================
   Sub-Components
======================= */

function SectionHeader({ title, subtitle, icon: Icon }: any) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-xl font-black uppercase italic tracking-tight mb-2">{title}</h2>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{subtitle}</p>
      </div>
      <Icon className="text-blue-600 w-6 h-6" />
    </div>
  );
}

function InputField({ label, defaultValue, type = "text", placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">{label}</label>
      <input type={type} defaultValue={defaultValue} placeholder={placeholder} className="input-field" />
    </div>
  );
}

function CredentialBlock({ title, icon: Icon, inputs, color = "text-blue-500" }: any) {
  return (
    <div className="p-6 bg-zinc-900/30 rounded-3xl border border-zinc-800">
      <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Icon className={`w-3 h-3 ${color}`} /> {title}
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {inputs.map((input: any, idx: number) => (
          <InputField key={idx} label={input.label} placeholder={input.placeholder} type="password" />
        ))}
      </div>
    </div>
  );
}

function SecurityFeature({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/50">
      {icon}
      <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{text}</span>
    </div>
  );
}
