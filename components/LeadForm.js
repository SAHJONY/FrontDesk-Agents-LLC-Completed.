'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client'; // Using the '@' alias or relative path

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

    // Calculate Score & Personalization
    let score = 50;
    if (formData.industry === 'Tech') score += 30;
    const hook = `Excited to discuss ${formData.industry} with the team at ${formData.company_name || 'your firm'}.`;

    const { error } = await supabase
      .from('leads')
      .insert([{ 
        ...formData, 
        lead_score: score, 
        personalization_hook: hook 
      }]);

    setLoading(false);

    if (error) {
      console.error("Insert error:", error.message);
      alert("Error saving lead.");
    } else {
      alert(`Lead saved! Priority Score: ${score}`);
      setFormData({ full_name: '', email: '', company_name: '', industry: '', phone_number: '', language_preference: 'English' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold text-black">FrontDesk Lead Entry</h3>
      <input 
        className="p-2 border rounded text-black" 
        placeholder="Full Name" 
        required
        value={formData.full_name}
        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
      />
      <input 
        className="p-2 border rounded text-black" 
        type="email" 
        placeholder="Email Address" 
        required
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        className="p-2 border rounded text-black" 
        placeholder="Company Name"
        value={formData.company_name}
        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
      />
      <select 
        className="p-2 border rounded text-black"
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
        className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Processing...' : 'Sync to Supabase'}
      </button>
    </form>
  );
}
