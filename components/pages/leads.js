import { supabase } from '../lib/supabase'

export default function LeadPage() {
  const handleAddLead = async () => {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        { 
          company_name: 'Example Corp', 
          industry: 'Technology', 
          phone_number: '+1234567890', 
          language_preference: 'English', 
          lead_score: 85, 
          personalization_hook: 'Hi there!' 
        }
      ])

    if (error) alert('Error: ' + error.message)
    else alert('Lead saved successfully!')
  }

  return (
    <button onClick={handleAddLead}>Save Lead</button>
  )
}
