'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subdomain: '',
    country: 'United States',
    accessKey: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        return value.trim().length < 2 ? 'Full name must be at least 2 characters' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
      case 'phone':
        return !/^\+?[\d\s\-()]+$/.test(value) ? 'Please enter a valid phone number' : '';
      case 'company':
        return value.trim().length < 2 ? 'Company name must be at least 2 characters' : '';
      case 'subdomain':
        return !/^[a-z0-9-]+$/.test(value) ? 'Subdomain can only contain lowercase letters, numbers, and hyphens' : '';
      case 'accessKey':
        return value.trim().length < 8 ? 'Access key must be at least 8 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // Simulate API call
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
          <h1 className="text-2xl font-bold text-white mb-2">Registration Successful!</h1>
          <p className="text-slate-300 mb-6">
            Welcome to FrontDesk Agents. Check your email for next steps.
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Command Center</h1>
          <p className="text-slate-400">Deploy your AI workforce in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
              Full Name <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`w-full bg-slate-900 border ${
                errors.fullName ? 'border-red-500' : 'border-slate-700'
              } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p id="fullName-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Business Email <span className="text-red-400" aria-label="required">*</span>
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
              className={`w-full bg-slate-900 border ${
                errors.email ? 'border-red-500' : 'border-slate-700'
              } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
              Phone Number <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full bg-slate-900 border ${
                errors.phone ? 'border-red-500' : 'border-slate-700'
              } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-300 mb-2">
              Company Name <span className="text-red-400" aria-label="required">*</span>
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
              className={`w-full bg-slate-900 border ${
                errors.company ? 'border-red-500' : 'border-slate-700'
              } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
              placeholder="Acme Corporation"
            />
            {errors.company && (
              <p id="company-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.company}
              </p>
            )}
          </div>

          {/* Subdomain */}
          <div>
            <label htmlFor="subdomain" className="block text-sm font-medium text-slate-300 mb-2">
              Subdomain <span className="text-red-400" aria-label="required">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="subdomain"
                name="subdomain"
                value={formData.subdomain}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                aria-required="true"
                aria-invalid={!!errors.subdomain}
                aria-describedby={errors.subdomain ? 'subdomain-error' : 'subdomain-preview'}
                className={`flex-1 bg-slate-900 border ${
                  errors.subdomain ? 'border-red-500' : 'border-slate-700'
                } rounded-l-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
                placeholder="acme"
              />
              <span className="bg-slate-800 border border-l-0 border-slate-700 rounded-r-lg px-4 py-3 text-slate-400">
                .frontdesk.ai
              </span>
            </div>
            {errors.subdomain && (
              <p id="subdomain-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.subdomain}
              </p>
            )}
            {!errors.subdomain && formData.subdomain && (
              <p id="subdomain-preview" className="mt-1 text-sm text-cyan-400">
                Your workspace: {formData.subdomain}.frontdesk.ai
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
              Country <span className="text-red-400" aria-label="required">*</span>
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              aria-required="true"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Access Key */}
          <div>
            <label htmlFor="accessKey" className="block text-sm font-medium text-slate-300 mb-2">
              Create Access Key <span className="text-red-400" aria-label="required">*</span>
            </label>
            <input
              type="password"
              id="accessKey"
              name="accessKey"
              value={formData.accessKey}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-required="true"
              aria-invalid={!!errors.accessKey}
              aria-describedby={errors.accessKey ? 'accessKey-error' : 'accessKey-help'}
              className={`w-full bg-slate-900 border ${
                errors.accessKey ? 'border-red-500' : 'border-slate-700'
              } rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-colors`}
              placeholder="••••••••"
            />
            {errors.accessKey && (
              <p id="accessKey-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.accessKey}
              </p>
            )}
            {!errors.accessKey && (
              <p id="accessKey-help" className="mt-1 text-sm text-slate-400">
                Minimum 8 characters. This will be your password.
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4" role="alert">
              <p className="text-red-400">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-4 rounded-lg transition-colors flex items-center justify-center"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Initializing Command Center...
              </>
            ) : (
              'INITIALIZE COMMAND CENTER'
            )}
          </button>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
