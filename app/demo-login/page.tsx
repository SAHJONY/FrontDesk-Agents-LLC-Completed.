'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DemoLoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleDemoLogin = async (role: 'owner' | 'admin' | 'user') => {
    setLoading(true);
    setMessage('');

    try {
      // Create a demo JWT token
      const demoToken = btoa(JSON.stringify({
        userId: `demo-${role}-${Date.now()}`,
        email: `${role}@demo.frontdeskagents.com`,
        role: role.toUpperCase(),
        name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24 hours
      }));

      // Set the token in a cookie
      document.cookie = `auth-token=${demoToken}; path=/; max-age=86400; SameSite=Lax`;

      setMessage(`✅ Logged in as Demo ${role.toUpperCase()}`);

      // Redirect based on role
      setTimeout(() => {
        if (role === 'owner') {
          router.push('/dashboard/owner');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } catch (error) {
      setMessage('❌ Login failed. Please try again.');
      console.error('Demo login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">FD</span>
            </div>
            <h1 className="text-2xl font-bold text-white">FrontDesk Agents</h1>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Demo Login</h2>
          <p className="text-slate-400 text-sm">Quick access for testing and demonstration</p>
        </div>

        {/* Demo Login Options */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 mb-6">
            <p className="text-cyan-400 text-sm">
              🚀 <strong>Demo Mode:</strong> No password required. Click a role below to instantly access the platform.
            </p>
          </div>

          {/* Owner Login */}
          <button
            onClick={() => handleDemoLogin('owner')}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">Owner Access</div>
                <div className="text-xs opacity-90">Full platform control + secrets management</div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </button>

          {/* Admin Login */}
          <button
            onClick={() => handleDemoLogin('admin')}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">Admin Access</div>
                <div className="text-xs opacity-90">Manage users, settings, and operations</div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </button>

          {/* User Login */}
          <button
            onClick={() => handleDemoLogin('user')}
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">User Access</div>
                <div className="text-xs opacity-90">View dashboards and basic features</div>
              </div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </button>

          {/* Status Message */}
          {message && (
            <div className={`text-center py-3 px-4 rounded-lg ${
              message.includes('✅') 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-900/50 text-slate-400">or</span>
            </div>
          </div>

          {/* Regular Login Link */}
          <Link
            href="/login"
            className="block w-full text-center py-3 px-6 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white rounded-xl transition-all"
          >
            Use Regular Login
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-xs">
            Demo accounts are temporary and reset every 24 hours
          </p>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mt-2 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
