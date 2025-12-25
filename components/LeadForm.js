import { useState } from 'react';
import { supabase } from '../lib/supabase'; // Adjust path to your client file

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- AUTO-SCORING & PERSONALIZATION LOGIC ---
    // Start with a base score
    let finalScore = 50; 

    // Bonus for target industries
    if (formData.industry === 'Tech') finalScore += 30;
    if (formData.industry === 'Finance') finalScore += 15;

    // Bonus for established companies
    if (formData.company_name.toLowerCase().includes('inc') || formData.company_name.toLowerCase().includes('corp')) {
      finalScore += 10;
    }

    // Penalty for generic/educational emails
    if (formData.email.endsWith('.edu')) finalScore -= 20;

    const personalization = `Hi ${formData.full_name.split(' ')[0]}, I noticed your work at ${formData.company_name || 'your company'} and wanted to reach out regarding ${formData.industry} trends.`;
    
    // Combine form data with our calculated fields
    const dataToSave = {
      ...formData,
      lead_score: finalScore,
      personalization_hook: personalization
    };
    // --------------------------------------------

    const { data, error } = await supabase
      .from('leads')
      .insert([dataToSave])
      .select();

    setLoading(false);

    if (error) {
      alert('Error saving lead: ' + error.message);
    } else {
      alert(`Lead captured! Assigned Score: ${finalScore}`);
      // Reset form
      setFormData({ 
        full_name: '', 
        email: '', 
        company_name: '', 
        industry: '', 
        phone_number: '', 
        language_preference: 'English' 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', padding: '20px' }}>
      <h3>Add New Lead</h3>
      
      <input 
        type="text" placeholder="Full Name" required
        value={formData.full_name}
        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
      />
      
      <input 
        type="email" placeholder="Email Address" required
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />

      <input 
        type="text" placeholder="Phone Number"
        value={formData.phone_number}
        onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
      />
      
      <input 
        type="text" placeholder="Company Name"
        value={formData.company_name}
        onChange={(e) => setFormData({...formData, company_name: e.target.value})}
      />
      
      <select 
        value={formData.industry}
        onChange={(e) => setFormData({...formData, industry: e.target.value})}
        required
      >
        <option value="">Select Industry</option>
        <option value="Tech">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Education">Education</option>
      </select>

      <select 
        value={formData.language_preference}
        onChange={(e) => setFormData({...formData, language_preference: e.target.value})}
      >
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="French">French</option>
      </select>
      
      <button type="submit" disabled={loading} style={{ cursor: 'pointer', padding: '10px', background: '#3ecf8e', color: 'white', border: 'none', borderRadius: '4px' }}>
        {loading ? 'Processing...' : 'Score and Save Lead'}
      </button>
    </form>
  );
}
