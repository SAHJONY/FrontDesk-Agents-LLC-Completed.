import { decryptSecret } from '@/lib/security/shadow-vault';

export async function GET() {
  const { data: config } = await supabase.from('client_configurations').select('encrypted_prompt').single();
  
  // Decrypt only for the AI's internal use
  const rawPrompt = decryptSecret(config.encrypted_prompt);
  
  // Return only safe, high-level metrics to the dashboard
  return Response.json({
    personaStatus: "Optimized",
    logicHash: "SHA-256-ENCRYPTED", // Hide the actual prompt
    activeNodes: 14
  });
}
