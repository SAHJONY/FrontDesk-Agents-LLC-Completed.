export const findExpansionLeads = async (region: string) => {
  // 1. Search local business registries/Google Maps for "Service Businesses"
  const leads = await googleMapsAPI.search(region, "convenience store, law office, retail");

  // 2. Filter for businesses with high foot traffic but low tech presence
  const highValueLeads = leads.filter(lead => lead.rating > 4.0 && !lead.hasAI);

  // 3. Trigger the Agentic Call
  highValueLeads.forEach(lead => {
    blandAI.startCall({
      phoneNumber: lead.phone,
      script: "Sovereign_Expansion_v1",
      context: { 
        businessName: lead.name, 
        city: region,
        opportunity: "High-volume money transfer potential"
      }
    });
  });
};
