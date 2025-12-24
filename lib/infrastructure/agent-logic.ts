import { openai } from 'openai';
import { supabase } from '@/lib/supabase/server';

export async function processCallIntent(transcript: string, callSid: string) {
  // 1. Identify Intent via LLM
  const analysis = await openai.chat.completions.create({
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

  if (decision.includes("TRANSFER")) {
    return initiateTransfer(callSid); // Connect to the business
  } else if (decision.includes("SPAM")) {
    return endCallSilently(callSid); // Save the owner's time
  } else {
    return provideAIAnswer(transcript); // Answer from Knowledge Base
  }
}
