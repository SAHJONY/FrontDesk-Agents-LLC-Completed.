// ./app/login/page.tsx

'use client';

import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for sign-in execution
    console.log('Attempting login for:', email);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      {/* Cinematic dark container matching image theme */}
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-2xl border border-blue-900/50">
        
        {/* Brand Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-blue-400">
            FrontDesk Agents
          </h1>
          <p className="mt-2 text-xl font-semibold text-white uppercase">LOGIN</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <div className="relative">
              <EnvelopeIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-10 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <LockClosedIcon className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-10 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <a 
                href="/forgot-password" 
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 uppercase tracking-wider"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
