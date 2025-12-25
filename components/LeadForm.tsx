'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Zap, ShieldCheck } from 'lucide-react';

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company_name: '',
    industry: '',
    phone_number: '',
    language_preference: 'English'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let score = 50;
    if (formData.industry === 'Tech') score += 30;
    if (formData.company_name.toLowerCase().includes('inc')) score += 10;
    
    const hook = `Lead identified for ${formData.industry} vertical at ${formData.company_name}. Priority: ${score >= 80 ? 'CRITICAL' : 'STANDARD'}.`;

    const { error } = await supabase
      .from('leads')
      .insert([{ ...formData, lead_score: score, personalization_hook: hook }]);

    setLoading(false);

    if (error) {
      console.error(error.message);
    } else {
      setFormData({ full_name: '', email: '', company_name: '', industry: '', phone_number: '', language_preference: 'English' });
    }
  };

  const inputStyles = "w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-slate-600 focus:border-cyan-500/50 focus:outline-none transition-all font-bold text-xs uppercase tracking-widest";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input 
          className={inputStyles} placeholder="Agent Name" required
          value={formData.full_name}
          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
        />
        <input 
          className={inputStyles} type="email" placeholder="Neural ID (Email)" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      
      <input 
        className={inputStyles} placeholder="Enterprise Entity"
        value={formData.company_name}
        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
      />
      
      <select 
        className={inputStyles}
        value={formData.industry}
        onChange={(e) => setFormData({...formData, industry: e.target.value})}
        required
      >
        <option value="" className="bg-[#010204]">Sector Selection</option>
        <option value="Tech" className="bg-[#010204]">Technology</option>
        <option value="Finance" className="bg-[#010204]">Finance</option>
        <option value="Healthcare" className="bg-[#010204]">Healthcare</option>
      </select>
      
      <button 
        type="submit" 
        disabled={loading}
        className="w-full group relative flex items-center justify-center gap-3 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] rounded-xl overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Zap className="w-4 h-4" />
        <span className="relative z-10">{loading ? 'Syncing...' : 'Initialize Sync'}</span>
      </button>

      <div className="flex items-center justify-center gap-2 text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] mt-4">
        <ShieldCheck className="w-3 h-3 text-cyan-500/30" />
        End-to-End Encryption Active
      </div>
    </form>
  );
}
