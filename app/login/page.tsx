// ./app/login/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login logic, then navigate to dashboard
    console.log('Login attempt...');
    // In a real app, this would involve API calls and routing
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy-dark)] p-4">
      <div className="glass-card w-full max-w-md p-8 md:p-10 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Client Login
          </h1>
          <p className="text-gray-400">Access your Operational Command Center</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="input-premium pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <LockClosedIcon className="w-5 h-5" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="input-premium pl-10"
              />
            </div>
          </div>
          
          <div className="text-right">
            <Link href="#" className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] text-sm font-medium transition">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn-premium w-full flex justify-center items-center py-4 text-lg"
          >
            Log In to Command Center
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          New to FrontDesk Agents?{' '}
          <Link href="/signup" className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium transition">
            Start Your Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
}
