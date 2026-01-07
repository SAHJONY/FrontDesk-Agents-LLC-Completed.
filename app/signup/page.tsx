'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      case 'company':
        return value.trim().length < 2 ? 'Company name must be at least 2 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Integrate with actual signup API
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      console.log('Form submitted:', formData);
    } catch (error) {
      setErrors({ submit: 'An error occurred. Please try again.' });
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to FrontDesk Agents!</h1>
          <p className="text-slate-300 mb-6">
            Your account has been created. Check your email to verify and get started.
          </p>
          <Link 
            href="/login" 
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go to Login
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
          <h2 className="text-3xl font-bold mb-2">Start Your Free Trial</h2>
          <p className="text-slate-400">14-day free trial • No credit card required</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Work Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full bg-slate-800 border ${
                  errors.email ? 'border-red-500' : 'border-slate-700'
                } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                placeholder="you@company.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className={`w-full bg-slate-800 border ${
                  errors.password ? 'border-red-500' : 'border-slate-700'
                } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                placeholder="At least 8 characters"
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-400" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? 'company-error' : undefined}
                className={`w-full bg-slate-800 border ${
                  errors.company ? 'border-red-500' : 'border-slate-700'
                } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                placeholder="Your Company"
              />
              {errors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-400" role="alert">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <p className="text-sm text-red-400 text-center" role="alert">
                {errors.submit}
              </p>
            )}

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
                  Creating Account...
                </>
              ) : (
                'Start Free Trial'
              )}
            </button>

            {/* Terms */}
            <p className="text-xs text-slate-400 text-center">
              By signing up, you agree to our{' '}
              <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                Privacy Policy
              </Link>
            </p>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
