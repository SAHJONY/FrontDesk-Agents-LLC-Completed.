'use client'; // Essential for @supabase/ssr browser clients

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client'; // Import from your centralized client

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company_name: '',
    industry: '',
    phone_number: '',
    language_preference: 'English'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- FRONTDESK AGENT LOGIC: SCORING & ENRICHMENT ---
    let finalScore = 50; 
    if (formData.industry === 'Tech') finalScore += 30;
    if (formData.industry === 'Finance') finalScore += 15;
    
    // Auto-generate personalization hook
    const hook = `Hi ${formData.full_name.split(' ')[0]}, I saw your work in ${formData.industry} and would love to connect.`;
    
    const { error } = await supabase
      .from('leads')
      .insert([{
        ...formData,
        lead_score: finalScore,
        personalization_hook: hook
      }]);
    // -------------------------------------------------

    setLoading(false);

    if (error) {
      console.error('FrontDesk Sync Error:', error.message);
      alert('Failed to sync lead to Supabase.');
    } else {
      alert(`Lead Scored (${finalScore}) and synced successfully!`);
      setFormData({ 
        full_name: '', email: '', company_name: '', 
        industry: '', phone_number: '', language_preference: 'English' 
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Lead Enrichment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
          type="text" placeholder="Full Name" required
          value={formData.full_name}
          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
        />
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
          type="email" placeholder="Email Address" required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
          type="text" placeholder="Company Name"
          value={formData.company_name}
          onChange={(e) => setFormData({...formData, company_name: e.target.value})}
        />
        <select 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
          value={formData.industry}
          onChange={(e) => setFormData({...formData, industry: e.target.value})}
          required
        >
          <option value="">Select Industry</option>
          <option value="Tech">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
        </select>
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:bg-blue-300"
        >
          {loading ? 'Processing Agent Logic...' : 'Sync Lead to Supabase'}
        </button>
      </form>
    </div>
  );
}
