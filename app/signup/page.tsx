'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Production Signup Gateway (Elite UI)
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Phone, Mail, Lock, Building, User, Globe, Activity, ChevronRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    subdomain: '',
    countryCode: 'US',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('AUTH_ERR: Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'REGISTRATION_FAILED');
      }

      router.push('/login?signup=success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(field: string, value: string) {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Auto-generate subdomain from company name logic
      if (field === 'companyName' && !prev.subdomain) {
        newData.subdomain = value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      }
      return newData;
    });
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 selection:bg-blue-500/30">
      {/* Background Decorative Element */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-xl w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)] border border-blue-400/20">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic italic">Initialize Workforce</h1>
          <p className="text-zinc-500 font-mono text-[10px] tracking-[0.2em] uppercase mt-2">Global Revenue Operations : Trial Phase</p>
        </div>

        <div className="glass-panel bg-zinc-950/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono flex items-center gap-3">
              <Activity className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all focus:ring-1 focus:ring-blue-500/20"
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Communication</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all"
                    placeholder="Corporate Email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Access Crypt</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="password"
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Verification</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="password"
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all"
                    placeholder="Confirm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Entity Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all"
                  placeholder="Company Legal Name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Node Domain</label>
              <div className="flex group">
                <input
                  type="text"
                  value={formData.subdomain}
                  onChange={(e) => handleChange('subdomain', e.target.value)}
                  className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-l-2xl px-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all font-mono"
                  placeholder="subdomain"
                  required
                />
                <span className="px-5 py-3.5 bg-zinc-900 border border-l-0 border-zinc-800 rounded-r-2xl text-zinc-500 text-xs font-bold flex items-center uppercase tracking-tighter">
                  .frontdesk.ai
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Operational Region</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleChange('countryCode', e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:border-blue-500 outline-none transition-all appearance-none uppercase font-bold tracking-widest"
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="IN">India</option>
                  <option value="BR">Brazil</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white text-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 font-black text-xs uppercase tracking-[0.2em] mt-4 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Initializing...' : 'Confirm Registration'}
              {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
              Existing Node?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400 transition-colors">
                Authorize Here
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[8px] font-mono text-zinc-700 uppercase tracking-[0.3em] mt-10">
          © 2025 FrontDesk Agents Global. Secure Revenue Infrastructure.
        </p>
      </div>
    </div>
  );
    }
            
