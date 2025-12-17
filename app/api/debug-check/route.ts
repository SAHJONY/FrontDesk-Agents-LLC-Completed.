import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function GET() {
  const results = {
    openai: false,
    firecrawl: false,
    twilio: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  };

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    await openai.models.list();
    results.openai = true;
  } catch (e) {}

  try {
    const res = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ url: 'https://google.com' })
    });
    if (res.ok) results.firecrawl = true;
  } catch (e) {}

  return NextResponse.json(results);
}
