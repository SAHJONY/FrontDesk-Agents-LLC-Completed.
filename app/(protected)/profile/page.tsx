'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { 
  User, 
  Key, 
  ShieldCheck, 
  Link as LinkIcon, 
  ExternalLink,
  Save,
  CheckCircle2,
  Lock
} from 'lucide-react';

const PROVIDERS = [
  { id: 'bland_ai', name: 'Bland AI', desc: 'Voice Synthesis & Calling Engine', link: 'https://app.bland.ai' },
  { id: 'twilio', name: 'Twilio', desc: 'SMS & Global Telephony', link: 'https://twilio.com' },
  { id: 'openai', name: 'OpenAI', desc: 'Conversational Intelligence', link: 'https://platform.openai.com' }
];

export default function ProfilePage() {
  const supabase = createClient();
  const [configs, setConfigs] = useState<any>({});
  const [isSaving, setIsSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchConfigs();
  }, []);

  async function fetchConfigs() {
    const { data } = await supabase.from('provider_configs').select('*');
    const configMap = data?.reduce((acc, curr) => ({ ...acc, [curr.provider_name]: curr.api_key }), {});
    setConfigs(configMap || {});
  }

  const saveConfig = async (provider: string) => {
    setIsSaving(provider);
    const { error } = await supabase
      .from('provider_configs')
      .upsert({ 
        provider_name: provider, 
        api_key: configs[provider],
        updated_at: new Date().toISOString() 
      }, { onConflict: 'provider_name' });
    
    setTimeout(() => setIsSaving(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#000814] text-slate-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <User className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">Agency Integrations</h1>
              <p className="text-[10px] text-cyan-500/50 font-bold uppercase tracking-[0.3em] mt-1">Global API & Provider Management</p>
            </div>
          </div>
        </div>

        {/* Provider Cards */}
        <div className="grid gap-6">
          {PROVIDERS.map((provider) => (
            <div key={provider.id} className="bg-[#000d1a] border border-white/5 rounded-[32px] p-8 transition-all hover:border-cyan-500/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-lg font-black text-white uppercase italic tracking-tighter">{provider.name}</h2>
                    <a href={provider.link} target="_blank" className="text-slate-600 hover:text-cyan-500 transition-colors">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{provider.desc}</p>
                </div>

                <div className="w-full md:w-2/3 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-700" />
                    <input 
                      type="password"
                      placeholder={`${provider.name} API Key`}
                      value={configs[provider.id] || ''}
                      onChange={(e) => setConfigs({ ...configs, [provider.id]: e.target.value })}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-xs font-mono text-cyan-500/80 focus:border-cyan-500/30 outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => saveConfig(provider.id)}
                    className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl hover:bg-cyan-500 hover:text-[#000814] transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    {isSaving === provider.id ? (
                      <CheckCircle2 className="w-4 h-4 animate-in zoom-in" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {isSaving === provider.id ? 'Linked' : 'Update'}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Security Footer */}
        <div className="mt-12 p-6 border border-dashed border-white/5 rounded-[32px] flex items-center gap-4 bg-cyan-500/5">
          <ShieldCheck className="w-8 h-8 text-cyan-500/40" />
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">End-to-End Encryption</p>
            <p className="text-[9px] text-slate-500 font-medium uppercase mt-1 leading-relaxed">
              API Keys are stored using AES-256 encryption. Only authorized FrontDesk Agent protocols can access these credentials during active transmission windows.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
