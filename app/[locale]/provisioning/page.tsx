'use client';

import React, { useState, use } from 'react';
import { Shield, Zap, Database, CheckCircle, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

const PROVISIONING_STEPS = [
  { id: 'IDENTITY', title: 'Neural Identity', description: 'Calibrating Agent Personality' },
  { id: 'INGEST', title: 'Knowledge Ingest', description: 'Syncing Institutional Data' },
  { id: 'PROVISION', title: 'Hardware Sync', description: 'Allocating Compute Nodes' }
];

export default function ProvisioningPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleNext = async () => {
    setLoading(true);
    
    if (activeStep < PROVISIONING_STEPS.length - 1) {
      // Simulate Neural Calibration
      setTimeout(() => {
        setLoading(false);
        setActiveStep(activeStep + 1);
      }, 2000);
    } else {
      // FINAL PROVISIONING: Verify Data Integrity
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error("Session Expired");

        // Verify if the Stripe Webhook successfully added Neural Minutes
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('neural_minutes')
          .eq('id', user.id)
          .single();

        if (error || !profile || (profile.neural_minutes ?? 0) <= 0) {
          throw new Error("No Neural Minutes detected. Infrastructure pending.");
        }

        // Success: Redirect to Command Center
        window.location.href = `/${locale}/dashboard/command-center`;
      } catch (e: any) {
        console.error("Provisioning failed:", e.message);
        alert(e.message || "Provisioning failed. Minutes not found.");
        setLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#020305] text-white flex flex-col items-center justify-center p-6 font-mono">
      <div className="w-full max-w-2xl border border-white/10 bg-[#080a0f] p-12 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1 bg-cyan-500 transition-all duration-500" style={{ width: `${((activeStep + 1) / PROVISIONING_STEPS.length) * 100}%` }} />
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">AEGIS v2.1.0 // Provisioning</span>
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            {PROVISIONING_STEPS[activeStep].title}
          </h1>
          <p className="text-slate-400 text-xs mt-2">{PROVISIONING_STEPS[activeStep].description}</p>
        </div>

        <div className="py-20 flex flex-col items-center justify-center border-y border-white/5 my-12">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
              <span className="text-[10px] uppercase tracking-widest animate-pulse">Establishing Neural Link...</span>
            </div>
          ) : (
            <div className="text-center">
              <Database className="w-16 h-16 text-slate-700 mb-6 mx-auto" />
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto uppercase tracking-widest leading-loose">
                Ready to initialize node for the <span className="text-white">Professional Tier</span>. Proceed to final sync.
              </p>
            </div>
          )}
        </div>

        <button 
          onClick={handleNext}
          disabled={loading}
          className="w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.5em] hover:bg-cyan-500 transition-all disabled:opacity-50"
        >
          {activeStep === PROVISIONING_STEPS.length - 1 ? 'Activate Sovereign Node' : 'Continue to Next Phase'}
        </button>
      </div>
    </main>
  );
}
