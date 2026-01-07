"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();

  // Fix hydration issues by ensuring client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Login successful - redirect handled by AuthContext
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black text-white overflow-hidden">
      {/* Full Screen Container - No Navigation */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-md px-8">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-3 text-white">
                Terminal Login
              </h1>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
                Node: PDX1 // Global Revenue Workforce
              </p>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              Secure Command Access
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              Authorized personnel only. All terminal sessions are monitored.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl backdrop-blur-sm">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
              >
                Identity
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="email@frontdeskagents.com" 
                className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none text-sm backdrop-blur-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
            
            {/* Password Input */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1"
              >
                Access Key
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none text-sm backdrop-blur-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors uppercase tracking-wider"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-white text-black font-black p-4 rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all uppercase tracking-wider text-base shadow-[0_0_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Access Command Center'}
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t border-zinc-900/50 space-y-4">
            <Link 
              href="/" 
              className="block text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
            >
              ← Return to Public Portal
            </Link>
            <p className="text-[9px] text-zinc-700 uppercase tracking-widest leading-relaxed text-center">
              By accessing this terminal, you agree to the{' '}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 underline">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
