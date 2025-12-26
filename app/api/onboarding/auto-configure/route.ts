import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function scrapeBusinessWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    const html = await response.text();
    
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 8000);
  } catch (error) {
    console.error('Scrape error:', error);
    throw new Error('Failed to scrape website content');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) return NextResponse.json({ error: 'URL is required' }, { status: 400 });

    const webText = await scrapeBusinessWebsite(url);

    // Step 1: Extract Business Intelligence
    const specs = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Extract business data for a high-urgency dispatch system. 
          Identify: 
          1. businessName 
          2. businessType (e.g., HVAC, Law, Plumbing) 
          3. primaryEmergency (The #1 problem they solve fast)
          4. avgTicketValue (Estimate based on industry: e.g., HVAC=$2500, Plumbing=$600)
          5. tone (High-authority/Professional)`
        },
        { role: 'user', content: webText },
      ],
      response_format: { type: 'json_object' },
    });

    const parsedInfo = JSON.parse(specs.choices[0].message.content || '{}');

    // Step 2: Generate Bland AI Specific "Emergency Dispatch" Configuration
    const agentConfig = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Create a Bland AI "Emergency Dispatch" configuration. 
          Use the "Nearby Truck" psychological trigger. 
          The output must be a strict JSON object for a voice agent.`
        },
        {
          role: 'user',
          content: `Configure an agent for: ${JSON.stringify(parsedInfo)}`
        },
      ],
      response_format: { type: 'json_object' },
    });

    const voiceConfig = JSON.parse(agentConfig.choices[0].message.content || '{}');

    // Step 3: Return ready-to-deploy data
    return NextResponse.json({
      success: true,
      data: {
        businessInfo: parsedInfo,
        blandConfig: {
          pathway_id: "emergency_dispatch_v1", // Ties into your pre-built pathway
          task: `You are Sara from ${parsedInfo.businessName}. A tech is nearby. Focus on ${parsedInfo.primaryEmergency}.`,
          first_sentence: `Hi, this is Sara from ${parsedInfo.businessName} Emergency Dispatch. We have a unit finishing a call in your neighborhood right now...`,
          voice: "sara",
          request_data: {
            business_name: parsedInfo.businessName,
            avg_ticket_value: parsedInfo.avgTicketValue
          }
        },
        configuredAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
