'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle2
} from 'lucide-react';

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const { locale } = useParams();
  
  // Identify selected plan from URL or default to Professional
  const planId = searchParams.get('plan') as PlanTier || PlanTier.PROFESSIONAL;
  const selectedPlan = PlanData.find(p => p.id === planId) || PlanData[1];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    website: '',
    email: ''
  });

  const nextStep = () => setStep(prev => prev + 1);

  return (
    <div className="min-h-screen bg-[#010204] text-white pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* PROGRESS HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex gap-4">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                  step >= num ? 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 animate-pulse">
            System Initialization: {Math.round((step / 3) * 100)}%
          </span>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* MAIN FORM AREA */}
          <div className="lg:col-span-3 space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Node <span className="text-cyan-500">Parameters</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                  Define the operational scope for your {locale?.toString().toUpperCase()} agent.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Business Entity Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Gotham MedSpa"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all"
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Target Industry</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none appearance-none">
                        <option>Medical / Healthcare</option>
                        <option>Legal Services</option>
                        <option>HVAC / Technical Trades</option>
                        <option>Real Estate</option>
                    </select>
                  </div>
                </div>
                <button onClick={nextStep} className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
                  Confirm Parameters <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Knowledge <span className="text-cyan-500">Injection</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
                  Input your URL for SARA.AI to ingest your business intelligence.
                </p>
                <input 
                  type="url" 
                  placeholder="https://your-business.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:outline-none transition-all"
                />
                <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center gap-4">
                   <Globe className="w-6 h-6 text-cyan-500" />
                   <p className="text-[9px] font-bold text-slate-300 uppercase leading-relaxed tracking-wider">
                     Aegis Crawler will perform a deep-mesh scrape of your services and pricing.
                   </p>
                </div>
                <button onClick={nextStep} className="w-full py-5 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-xl flex items-center justify-center gap-3">
                  Initiate Scrape <Cpu className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center py-12 animate-in zoom-in duration-1000">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                  Node <span className="text-green-500">Authorized</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest max-w-xs mx-auto">
                  Provisioning infrastructure for {formData.businessName || 'your business'}.
                </p>
                <button className="px-12 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] rounded-xl hover:bg-cyan-500 hover:text-white transition-all">
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-[32px] p-8 sticky top-24">
              <div className="flex items-center gap-2 text-cyan-500 mb-6">
                <Lock className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Selected Tier</span>
              </div>
              
              <h3 className="text-2xl font-black uppercase italic mb-2">{selectedPlan.name}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-6">
                Monthly Node Access: <span className="text-white">${selectedPlan.price}</span>
              </p>

              <div className="space-y-4 mb-8">
                {selectedPlan.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-cyan-500" />
                    <span className="text-[9px] font-black uppercase tracking-tight text-slate-300">{f}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Performance Fee</p>
                <p className="text-sm font-bold text-white">${selectedPlan.appointmentFee} / Appointment</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
                          }
                
