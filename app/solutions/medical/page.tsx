import React from 'react';
import Image from 'next/image';
import { Stethoscope, Shield, Clock, Activity } from 'lucide-react';

export default function MedicalSolutionPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <div className="flex items-center gap-3 text-brand-cyan mb-6">
              <Stethoscope className="w-6 h-6" />
              <span className="uppercase tracking-widest font-bold text-sm">Healthcare Sector</span>
            </div>
            <h1 className="text-6xl font-black italic uppercase mb-8 leading-tight">
              HIPAA-Compliant <span className="text-brand-cyan">Medical AI</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              Streamline patient scheduling, prescription refills, and insurance verification with secure AI agents designed for high-volume medical practices.
            </p>
            <div className="flex gap-4">
              <button className="fd-btn fd-btn-primary px-8 py-4">Activate Medical Node</button>
              <button className="fd-btn fd-btn-ghost px-8 py-4">Compliance Specs</button>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
            <Image 
              src="/images/solution-medical.jpg" 
              alt="Medical AI Solutions" 
              fill 
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Shield, title: "HIPAA Secure", desc: "End-to-end encrypted patient data handling and secure API integrations." },
            { icon: Clock, title: "Smart Scheduling", desc: "Real-time calendar sync for appointments, reducing no-shows by 40%." },
            { icon: Activity, title: "Patient Triage", desc: "Initial symptom screening and routing to the appropriate department." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-brand-cyan/50 transition-colors">
              <feature.icon className="w-10 h-10 text-brand-cyan mb-6" />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
