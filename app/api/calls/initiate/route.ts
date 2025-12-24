// Add this inside your POST handler in app/api/calls/initiate/route.ts

// 5. FETCH CLIENT CRM CONFIG (The "Last Mile" Secret)
const { data: clientConfig } = await supabase
  .from('client_configurations')
  .select('crm_api_key, crm_provider, emergency_phone')
  .eq('client_id', leadData.client_id)
  .single();

// 6. PASS CRM DATA TO AI MEMORY
// The AI will now have the ability to "Live Book" via the CRM provider
const callPayload = {
  phone_number: phoneNumber,
  task: promptBase,
  voice: "nat",
  request_data: { 
    crm_endpoint: clientConfig.crm_provider_url,
    emergency_contact: clientConfig.emergency_phone
  }
};
