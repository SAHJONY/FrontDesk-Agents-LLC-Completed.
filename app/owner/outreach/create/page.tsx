'use client';

import React, { useState } from 'react';
import { ArrowLeft, Zap, Target, Globe, Building2, Users, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    region: '',
    businessSize: '',
    channel: 'multi-channel',
    targetCount: 100,
  });

  const industries = [
    'Healthcare',
    'Legal Services',
    'Real Estate',
    'Property Management',
    'Hospitality',
    'Professional Services',
    'Retail',
    'Technology',
  ];

  const regions = [
    'North America',
    'Europe',
    'Asia Pacific',
    'Latin America',
    'Middle East',
    'Africa',
  ];

  const businessSizes = [
    'Small (1-50 employees)',
    'Medium (51-500 employees)',
    'Large (501+ employees)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/global-sales?action=create_campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/owner/outreach');
      } else {
        alert('Failed to create campaign');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('Error creating campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-mono uppercase tracking-widest">Back</span>
          </button>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-2">
            Create Campaign
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
            Launch AI-Powered Lead Generation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campaign Name */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <label className="block mb-2">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                Campaign Name
              </span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Q1 Healthcare Outreach"
              required
              className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
            />
          </div>

          {/* Industry Selection */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <label className="block mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Target Industry
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => setFormData({ ...formData, industry })}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-all ${
                    formData.industry === industry
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Region Selection */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <label className="block mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Geographic Region
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setFormData({ ...formData, region })}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-all ${
                    formData.region === region
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Business Size */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <label className="block mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Business Size
              </span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {businessSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFormData({ ...formData, businessSize: size })}
                  className={`px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-tight transition-all ${
                    formData.businessSize === size
                      ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Target Count */}
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6">
            <label className="block mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Target Lead Count
              </span>
            </label>
            <input
              type="number"
              value={formData.targetCount}
              onChange={(e) => setFormData({ ...formData, targetCount: parseInt(e.target.value) })}
              min="10"
              max="10000"
              step="10"
              className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all outline-none"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Number of leads to generate (10-10,000)
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 bg-zinc-900 text-white font-black uppercase tracking-tight text-sm rounded-xl hover:bg-zinc-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.name || !formData.industry || !formData.region || !formData.businessSize}
              className="flex-1 px-6 py-4 bg-cyan-500 text-black font-black uppercase tracking-tight text-sm rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              {loading ? (
                <>
                  <Zap className="w-4 h-4 animate-pulse" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Launch Campaign
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
