'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './login.css';

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
    
    // Hide sidebar navigation
    const hideSidebar = () => {
      const sidebar = document.querySelector('nav.w-64.bg-gray-900');
      if (sidebar) {
        sidebar.style.display = 'none';
      }
      
      const flexContainer = document.querySelector('body > div > div.flex.min-h-screen');
      if (flexContainer) {
        const nav = flexContainer.querySelector('nav');
        if (nav) nav.style.display = 'none';
      }
    };
    
    // Run immediately and after a short delay to catch late-rendered elements
    hideSidebar();
    setTimeout(hideSidebar, 100);
    setTimeout(hideSidebar, 500);
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
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      // Redirect based on role (case-insensitive)
      const userRole = data.user.role.toUpperCase();
      if (userRole === 'OWNER') {
        router.push('/dashboard/owner');
      } else if (userRole === 'ADMIN') {
        router.push('/admin');
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
    <>
      {/* Global style to hide sidebar */}
      <style dangerouslySetInnerHTML={{__html: `
        nav.w-64.bg-gray-900 { display: none !important; }
        body > div > div.flex.min-h-screen > nav { display: none !important; }
        body > div > div.flex.min-h-screen { display: block !important; }
      `}} />
      
      {/* Mobile-First Container with Safe Areas */}
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Premium Visual Asset (Desktop Only) */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900">
          <Image 
            src="/images/premium/login-hero.jpg" 
            alt="Secure Access Portal" 
            fill
            className="object-cover object-center grayscale opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 max-w-md z-10">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-white">Secure Command Access</h2>
            <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest leading-relaxed">
              Authorized personnel only. All terminal sessions are monitored and recorded for compliance.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 relative min-h-screen flex flex-col items-center justify-center p-4 pt-20 md:pt-4 pb-8 bg-black">
          {/* Background Layer for Mobile */}
          <div className="lg:hidden fixed inset-0 z-0 bg-gradient-to-br from-black via-zinc-900 to-black" />
          
          {/* Grid Pattern Overlay */}
          <div 
            className="fixed inset-0 z-[1] opacity-10 md:opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Background Text */}
          <div className="fixed inset-0 z-[2] pointer-events-none select-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">
              <p className="text-[8vw] md:text-[6vw] lg:text-[5vw] font-black tracking-tighter uppercase text-white/5 whitespace-nowrap">
                Global Revenue Workforce
              </p>
            </div>
          </div>

          {/* Content Layer */}
          <div className="relative z-10 w-full max-w-md">
            {/* Header Section */}
            <div className="mb-6 md:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white mb-2">
                Terminal Login
              </h1>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500">
                Node: PDX1 // Global Revenue Workforce
              </p>
            </div>

            {/* Login Form Container */}
            <div className="bg-zinc-900/80 md:bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-in fade-in duration-200">
                  <p className="text-sm text-red-400 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
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
                    className="w-full px-4 py-3.5 sm:py-3 bg-black/50 border border-zinc-700 rounded-xl 
                             text-white text-base sm:text-sm placeholder-zinc-600 
                             focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 outline-none
                             touch-manipulation"
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
                    className="w-full px-4 py-3.5 sm:py-3 bg-black/50 border border-zinc-700 rounded-xl 
                             text-white text-base sm:text-sm placeholder-zinc-600 
                             focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             transition-all duration-200 outline-none
                             touch-manipulation"
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
                           transition-all duration-200
                           touch-manipulation min-h-[48px]"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Authenticating...
                    </span>
                  ) : (
                    'Access Command Center'
                  )}
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <Link 
                  href="/"
                  className="block text-center text-xs font-mono uppercase tracking-widest text-zinc-600 hover:text-cyan-400 transition-colors touch-manipulation"
                >
                  ← Return to Main Portal
                </Link>
              </div>
            </div>

            {/* Legal Notice */}
            <p className="mt-6 text-center text-[10px] text-zinc-700 uppercase tracking-wider leading-relaxed px-4">
              Authorized Access Only • Enterprise Security Enforced
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
