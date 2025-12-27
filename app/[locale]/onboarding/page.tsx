'use client';

import React, { useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { 
  PlanTier, PlanData 
} from '@/config/plans';
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  ArrowRight, 
  Lock,
  CheckCircle2,
  Loader2
} from 'lucide-react';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  
  // FIX: Cast params to ensure the build machine recognizes 'locale'
  const params = useParams();
  const locale = params?.locale as string;
  
  /**
   * FIX: BUILD ERROR RESOLUTION
   * Changed PlanTier.PROFESSIONAL to PlanTier.CORE_STATION to align with 
   * your new Infrastructure Provisioning structure.
   */
  const planId = (searchParams?.get('plan') as PlanTier) || PlanTier.CORE_STATION;
  const selectedPlan = PlanData.find(p => p.id === planId) || PlanData[0];

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'Medical / Healthcare',
    website: '',
    email: '' 
  });

  const nextStep = () => setStep(prev => prev + 1);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: selectedPlan.stripePriceId, 
          locale: locale || 'en',
          customerEmail: formData.email,
          // metadata passed to Stripe to trigger the Aegis Silo in the webhook
          planTier: selectedPlan.id 
        }),
      });

      const { url, error } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error(error || 'Failed to initialize secure checkout.');
      }
    } catch (err) {
      console.error("Infrastructure Provisioning Failed", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#010204] text-white pt-24 pb-12 px-6 selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* PROGRESS HEADER: VISUALIZING NEURAL INITIALIZATION */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-4">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-12 h-1.5 rounded-full transition-all duration-700 ${
                  step >= num ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 animate-pulse">
            Neural Initialization: {Math.round((step / 3) * 100)}%
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-3 space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Node <span className="text-cyan-500">Parameters</span>
                </h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Define operational scope for {locale?.toUpperCase() || 'GLOBAL'} jurisdiction.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Institutional Entity Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Gotham MedSpa"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-800"
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Vertical Alignment</label>
                    <select 
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none appearance-none"
                    >
                        <option>Medical / Healthcare</option>
                        <option>Legal Services</option>
                        <option>Technical Trades</option>
                        <option>Real Estate Sovereign</option>
                    </select>
                  </div>
                </div>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.businessName}
                  className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                >
                  Confirm Parameters <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Knowledge <span className="text-cyan-500">Ingestion</span>
                </h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  Neural Mirroring of institutional intelligence.
                </p>
                <div className="space-y-4">
                   <input 
                    type="url" 
                    placeholder="https://your-business-asset.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-800"
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                  />
                  <input 
                    type="email" 
                    placeholder="Executive Billing Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-800"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center gap-4">
                   <Globe className="w-6 h-6 text-cyan-500" />
                   <p className="text-[8px] font-black text-slate-400 uppercase leading-relaxed tracking-[0.2em]">
                     Aegis Ingestion Nodes will perform a forensic mapping of your assets.
                   </p>
                </div>
                <button 
                  onClick={nextStep} 
                  disabled={!formData.website || !formData.email}
                  className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  Initiate Sync <Cpu className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-12 animate-in zoom-in duration-1000">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Node <span className="text-green-500">Authorized</span>
                </h1>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest max-w-xs mx-auto">
                  Provisioning workforce for {formData.businessName || 'Sovereign Entity'}.
                </p>
                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="px-12 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-50 flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  Provision Asset via Secure Checkout
                </button>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR: THE AEGIS SPECIFICATION */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 sticky top-24 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 text-cyan-500 mb-6">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Infrastructure Tier</span>
              </div>
              
              <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">{selectedPlan.name}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-6">
                Monthly Yield Access: <span className="text-white">${selectedPlan.price}</span>
              </p>

              <div className="space-y-4 mb-8">
                {selectedPlan.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-3 h-3 text-cyan-500 shadow-sm" />
                    <span className="text-[9px] font-black uppercase tracking-tight text-slate-300">{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-cyan-500/30 transition-colors">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Success Synthesis Fee</p>
                <p className="text-sm font-bold text-white tracking-tighter">${selectedPlan.appointmentFee || '10'} / Outcome</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
