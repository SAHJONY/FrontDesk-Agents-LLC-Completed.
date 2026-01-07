'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fix hydration issues by ensuring client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect based on role
      if (data.user.role === 'owner') {
        router.push('/dashboard/owner');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // Prevent SSR flash
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Layer - z-0 */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
      
      {/* Grid Pattern Overlay - z-1 */}
      <div 
        className="fixed inset-0 z-1 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content Layer - z-10 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header Section */}
        <div className="w-full max-w-md mb-8 text-center">
          <h1 className="text-5xl font-black tracking-tighter uppercase text-white mb-2">
            Terminal Login
          </h1>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
            Node: PDX1 // Global Revenue Workforce
          </p>
        </div>

        {/* Login Form Container */}
        <div className="w-full max-w-md">
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-sm text-red-400 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identity Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email"
                  className="block text-xs font-black uppercase tracking-widest text-zinc-400"
                >
                  Identity
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="frontdeskllc@outlook.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl 
                           text-white placeholder-zinc-600 
                           focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 outline-none"
                />
              </div>

              {/* Access Key Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password"
                  className="block text-xs font-black uppercase tracking-widest text-zinc-400"
                >
                  Access Key
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-zinc-700 rounded-xl 
                           text-white placeholder-zinc-600 
                           focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 
                           disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all duration-200 outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-white text-black font-black uppercase tracking-tight text-sm
                         rounded-xl shadow-lg shadow-white/10
                         hover:bg-zinc-100 hover:shadow-white/20
                         active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
                         transition-all duration-200"
              >
                {loading ? 'Authenticating...' : 'Access Command Center'}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <Link 
                href="/"
                className="block text-center text-xs font-mono uppercase tracking-widest text-zinc-600 hover:text-cyan-400 transition-colors"
              >
                ← Return to Main Portal
              </Link>
            </div>
          </div>

          {/* Legal Notice */}
          <p className="mt-6 text-center text-[10px] text-zinc-700 uppercase tracking-wider leading-relaxed">
            Authorized Access Only • Enterprise Security Enforced
          </p>
        </div>
      </div>
    </div>
  );
}
