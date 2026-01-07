'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      // TODO: Integrate with actual password reset API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-cyan-500/30 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Check Your Email</h1>
          <p className="text-slate-300 mb-6">
            We have sent password reset instructions to <span className="text-cyan-400">{email}</span>
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Did not receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              try again
            </button>
          </p>
          <Link 
            href="/login" 
            className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-2xl font-bold text-cyan-400">FrontDesk Agents</h1>
          </Link>
          <h2 className="text-3xl font-bold mb-2">Reset Your Password</h2>
          <p className="text-slate-400">Enter your email and we will send you reset instructions</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
                className={`w-full bg-slate-800 border ${
                  error ? 'border-red-500' : 'border-slate-700'
                } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                placeholder="you@company.com"
              />
              {error && (
                <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
