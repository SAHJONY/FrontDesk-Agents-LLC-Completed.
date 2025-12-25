import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path to your client file

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company_name: '',
    industry: '',
    lead_score: 50
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
      .from('leads')
      .insert([formData])
      .select();

    setLoading(false);

    if (error) {
      alert('Error saving lead: ' + error.message);
    } else {
      alert('Lead captured successfully!');
      setFormData({ full_name: '', email: '', company_name: '', industry: '', lead_score: 50 });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <input 
        type="text" placeholder="Full Name" required
        value={formData.full_name}
        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
      />
      <input 
        type="email" placeholder="Email" required
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <input 
        type="text" placeholder="Company Name"
        value={formData.company_name}
        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
      />
      <select 
        value={formData.industry}
        onChange={(e) => setFormData({...formData, industry: e.target.value})}
      >
        <option value="">Select Industry</option>
        <option value="Tech">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
      </select>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Add Lead'}
      </button>
    </form>
  );
}
