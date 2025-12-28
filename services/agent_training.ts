export const getIndustryTemplate = (industry: 'MEDICAL' | 'LEGAL' | 'REAL_ESTATE') => {
  const templates = {
    MEDICAL: {
      prompt: "Lead Patient Coordinator role...",
      tools: ["Google_Calendar_Booking", "Insurance_Lookup"],
      voice: "Soft_Professional"
    },
    LEGAL: {
      prompt: "Senior Intake Specialist role...",
      tools: ["Case_Management_Sync", "Conflict_Check"],
      voice: "Authoritative_Male"
    },
    REAL_ESTATE: {
      prompt: "Acquisition Manager role...",
      tools: ["Zillow_Data_Pull", "SMS_Offer_Link"],
      voice: "Friendly_Energetic"
    }
  };

  return templates[industry];
};
