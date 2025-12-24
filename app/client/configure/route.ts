// After successfully saving CRM keys to Supabase...
await fetch('https://api.bland.ai/v1/calls', {
  method: 'POST',
  headers: { 'authorization': process.env.BLAND_AI_KEY! },
  body: JSON.stringify({
    phone_number: formData.ownerMobile, // Collected during onboarding
    task: WELCOME_ACTIVATION_PROMPT
      .replace('[Owner_Name]', formData.ownerName)
      .replace('[CRM_Provider]', formData.crmProvider)
      .replace('[City]', formData.city)
      .replace('[Emergency_Phone]', formData.emergencyPhone),
    voice: "nat", // Use your most professional human-like voice
    wait_for_greeting: true
  })
});
