// ./app/signup/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, LockClosedIcon, UserPlusIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate signup/trial initiation logic
    console.log('Signup attempt...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-navy-dark)] p-4">
      <div className="glass-card w-full max-w-md p-8 md:p-10 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Start Your 7-Day Free Trial
          </h1>
          <p className="text-gray-400">Unlock the Elite Automation Suite now</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <UserPlusIcon className="w-5 h-5" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
                className="input-premium pl-10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Business Email"
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
                placeholder="Create Password"
                className="input-premium pl-10"
              />
            </div>
          </div>
          
          <div className="text-sm text-gray-500 text-left">
            By clicking "Start Trial," you agree to the{' '}
            <Link href="/legal/terms" className="text-[var(--color-primary)] hover:underline">Terms of Service</Link> and{' '}
            <Link href="/legal/privacy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link>.
          </div>

          <button
            type="submit"
            className="btn-premium w-full flex justify-center items-center py-4 text-lg"
          >
            Start 7-Day Free Trial
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </form>

        <p className="mt-8 text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-primary)] hover:text-[var(--color-primary-light)] font-medium transition">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
