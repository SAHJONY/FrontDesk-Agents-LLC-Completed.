import OpenAI from 'openai';
// import { createClient } from '@/lib/supabase/server'; // Not used in current logic

// Initialize OpenAI client
// Lazy initialization of OpenAI client
let openaiClient: OpenAI | null = null;
function getOpenAI() {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '"'"',
    });
  }
  return openaiClient;
}

export async function processCallIntent(transcript: string, callSid: string) {
  // 1. Identify Intent via LLM
  const analysis = await getOpenAI().chat.completions.create({
    model: "gpt-4o",
    messages: [{
      role: "system", 
      content: "Determine if the caller needs a HUMAN transfer, an ANSWER, or is SPAM."
    }, {
      role: "user", 
      content: transcript
    }]
  });

  const decision = analysis.choices[0].message.content;

  if (decision?.includes("TRANSFER")) {
    return initiateTransfer(callSid); // Connect to the business
  } else if (decision?.includes("SPAM")) {
    return endCallSilently(callSid); // Save the owner's time
  } else {
    return provideAIAnswer(transcript); // Answer from Knowledge Base
  }
}

// Helper functions (implement these based on your call handling logic)
async function initiateTransfer(callSid: string) {
  // TODO: Implement transfer logic
  console.log(`Initiating transfer for call: ${callSid}`);
  return { action: 'transfer', callSid };
}

async function endCallSilently(callSid: string) {
  // TODO: Implement call termination
  console.log(`Ending spam call: ${callSid}`);
  return { action: 'end', callSid };
}

async function provideAIAnswer(transcript: string) {
  // TODO: Implement AI response generation
  console.log(`Providing AI answer for: ${transcript}`);
  return { action: 'answer', transcript };
}
