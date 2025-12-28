// Configuration for OpenAI/Bland AI to ensure Zero Data Retention
export const privacyHeaders = {
  "X-Privacy-Level": "Enterprise",
  "No-Training-Opt-Out": "true", // Tells the AI provider not to use this data for training
  "Encryption-Type": "AES-256-GCM"
};

export const encryptBusinessData = (data: string) => {
  // Logic to encrypt sensitive business info before it hits the database
  // Ensuring only the business owner has the decryption key
};
