'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Zap, Database, Phone } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crmProvider: 'servicetitan',
    crmApiKey: '',
    emergencyPhone: '',
    businessName: ''
  });

  const handleSubmit = async () => {
    // Pushes configuration to your Sovereign Vault (Supabase)
    const res = await fetch('/api/client/configure', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    if (res.ok) window.location.href = '/dashboard?activated=true';
  };

  return (
    <div className="min-h-screen bg-[#000814] text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-[48px] p-12 shadow-2xl">
        
        {/* PROGRESS INDICATOR */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-cyan-500' : 'bg-white/10'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Identity Protocol</h2>
            <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Step 1: Business Fundamentals</p>
            <input 
              className="w-full p-4 bg-black border border-white/10 rounded-2xl focus:border-cyan-500 outline-none"
              placeholder="Legal Business Name"
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />
            <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-500 text-black font-black uppercase rounded-2xl">Next: System Link</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">CRM Infrastructure</h2>
            <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Step 2: Database Handshake</p>
            <select 
              className="w-full p-4 bg-black border border-white/10 rounded-2xl outline-none"
              onChange={(e) => setFormData({...formData, crmProvider: e.target.value})}
            >
              <option value="servicetitan">ServiceTitan</option>
              <option value="jobber">Jobber</option>
              <option value="gohighlevel">GoHighLevel</option>
            </select>
            <input 
              className="w-full p-4 bg-black border border-white/10 rounded-2xl focus:border-cyan-500 outline-none"
              placeholder="CRM API Key / Access Token"
              type="password"
              onChange={(e) => setFormData({...formData, crmApiKey: e.target.value})}
            />
            <button onClick={() => setStep(3)} className="w-full py-4 bg-cyan-500 text-black font-black uppercase rounded-2xl">Next: Emergency Routing</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Sovereign Guard</h2>
            <p className="text-slate-400 text-sm uppercase font-bold tracking-widest">Step 3: Crisis Redline</p>
            <input 
              className="w-full p-4 bg-black border border-white/10 rounded-2xl focus:border-cyan-500 outline-none"
              placeholder="Emergency Dispatch Mobile (for transfers)"
              onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
            />
            <button onClick={handleSubmit} className="w-full py-4 bg-green-500 text-black font-black uppercase rounded-2xl">Initialize System</button>
          </div>
        )}
      </div>
    </div>
  );
}
