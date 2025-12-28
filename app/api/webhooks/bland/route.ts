import { getPrompt } from '@/lib/ai/prompts';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const data = await req.json(); // Data from Bland.ai
  const { transcript, call_id } = data;

  // Use your Call Analysis prompt for Outcome Maximization
  const { system, user } = getPrompt('callAnalysis', transcript);

  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "system", content: system }, { role: "user", content: user }],
    response_format: { type: "json_object" }
  });

  const analysis = JSON.parse(completion.choices[0].message.content || '{}');

  // Save the lead to your Sovereign database
  // (We'll need to create a 'leads' table next)
  return NextResponse.json({ processed: true });
}
