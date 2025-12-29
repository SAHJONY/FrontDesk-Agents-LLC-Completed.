'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';
import { Globe, Shield, Zap, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from('tenants')
          .select('*')
          .single();
        setTenant(data);
      }
      setLoading(false);
    }
    fetchSettings();
  }, []);

  if (loading) return <div className="p-8 text-zinc-500">Loading Workforce Settings...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Workforce Settings</h1>
        <p className="text-zinc-500">Manage your global fleet and local market configurations.</p>
      </div>

      {/* Market Equity Card [cite: 2025-12-24] */}
      <section className="bg-white border rounded-xl overflow-hidden">
        <div className="bg-zinc-50 p-4 border-b flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold">Local Market Equity</h2>
        </div>
        <div className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-500">Your Current Multiplier</p>
            <p className="text-3xl font-black text-zinc-900">{tenant?.regional_multiplier}x</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-500">Region</p>
            <p className="font-medium text-zinc-900">{tenant?.country_code} ({tenant?.currency_code})</p>
          </div>
        </div>
        <div className="bg-blue-50/50 p-4 text-xs text-blue-700 italic">
          * This multiplier is automatically applied to ensure platform equity in your region.
        </div>
      </section>

      {/* Subscription Tier [cite: 2025-12-28] */}
      <section className="bg-white border rounded-xl overflow-hidden">
        <div className="bg-zinc-50 p-4 border-b flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h2 className="font-semibold">Workforce Tier</h2>
        </div>
        <div className="p-6 flex justify-between items-center">
          <div>
            <p className="capitalize text-2xl font-bold">{tenant?.tier} Node Fleet</p>
            <p className="text-zinc-500 text-sm">Next billing cycle: January 28, 2026</p>
          </div>
          <button className="px-4 py-2 border rounded-lg hover:bg-zinc-50 transition">
            Manage Subscription
          </button>
        </div>
      </section>

      {/* API Configuration */}
      <section className="bg-white border rounded-xl overflow-hidden">
        <div className="bg-zinc-50 p-4 border-b flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          <h2 className="font-semibold">Telephony & AI Keys</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bland.AI Public Webhook Key</label>
            <input 
              type="password" 
              disabled 
              value="••••••••••••••••"
              className="w-full p-2 bg-zinc-100 border rounded font-mono text-sm" 
            />
          </div>
          <p className="text-xs text-zinc-400">
            Keys are managed at the system level for the Sovereign Global Financial Hub.
          </p>
        </div>
      </section>
    </div>
  );
}
