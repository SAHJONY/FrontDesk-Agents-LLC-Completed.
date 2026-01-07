import OpenAI from 'openai';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function processLeadReply(incomingText: string, leadName: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { 
        role: "system", 
        content: `You are the FrontDesk Booking Assistant. Your goal is to schedule a discovery call. 
                  Lead Name: ${leadName}. 
                  If the user expresses interest, provide a link to the calendar. 
                  If they ask a question, answer it concisely and then ask to book.` 
      },
      { role: "user", content: incomingText }
    ],
  });

  return completion.choices[0].message.content;
}
