'use client';

import { Stethoscope, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export const MedicalVerticalSection = () => {
  return (
    <section className="py-24 bg-[#020408] border-y border-white/5">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 text-cyan-500 mb-6">
              <Activity className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Vertical: Healthcare Logistics</span>
            </div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-8 text-white">
              The <span className="text-cyan-500">Autonomous</span> Clinic
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed italic">
              Eliminate patient leakage. Deploy a medical-grade SARA node that understands clinical terminology and handles intake with 100% accuracy.
            </p>
            
            <div className="space-y-6">
              {[
                { title: 'Intelligent Triage', desc: 'Identify emergencies vs. routine bookings instantly.' },
                { title: 'EHR Synchronization', desc: 'Data flows directly into your management system.' },
                { title: 'Patient Recall', desc: 'Autonomous outbound follow-ups for routine checkups.' }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
                  <div className="p-2 bg-cyan-500/10 rounded-lg h-fit">
                    <ShieldCheck className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white mb-1">{feature.title}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full" />
            <div className="relative aspect-square rounded-[40px] border border-white/10 bg-black p-12 flex flex-col items-center justify-center text-center overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
               <HeartPulse className="w-24 h-24 text-cyan-500 mb-8" />
               <h3 className="text-2xl font-black uppercase italic text-white mb-4">HIPAA <br/>Sovereignty</h3>
               <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">Neural Mesh Encrypted • Zero Data Leakage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
