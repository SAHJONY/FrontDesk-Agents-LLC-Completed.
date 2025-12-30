'use client';

/**
 * FRONTDESK AGENTS: GLOBAL REVENUE WORKFORCE
 * Entry Node: Secure Multi-Tenant Authentication
 */

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Mail, Building, ChevronRight, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password, subdomain || undefined);
    } catch (err: any) {
      setError(err.message || 'Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 selection:bg-blue-500/30">
      <div className="max-w-[440px] w-full">
        {/* Brand Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-[2rem] mb-6 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <Zap className="w-10 h-10 text-blue-500 fill-blue-500/10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none italic">
            FrontDesk <span className="text-blue-500">Agents</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-mono tracking-[0.5em] uppercase mt-3">
            Global Revenue Workforce // PDX1 Node
          </p>
        </div>

        {/* Login Terminal */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          <h2 className="text-xl font-black uppercase tracking-tight mb-8">Authorize Access</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
              <Shield className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email Terminal</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-sm font-bold focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                  placeholder="identity@vault.com"
                  required
                />
                
