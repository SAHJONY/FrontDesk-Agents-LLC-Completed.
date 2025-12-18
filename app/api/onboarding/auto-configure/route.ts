// app/api/onboarding/auto-configure/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple website scraping function
async function scrapeBusinessWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.status}`);
    }

    const html = await response.text();
    
    // Strip HTML tags and get text content
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Limit to first 8000 characters to avoid token limits
    return textContent.substring(0, 8000);
  } catch (error) {
    console.error('Error scraping website:', error);
    throw new Error('Failed to scrape website content');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      );
    }

    // Step 1: Scrape the business website
    const webText = await scrapeBusinessWebsite(url);

    // Step 2: Use AI to extract specifications
    const specs = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that analyzes website content to extract business information.
Extract the following information and return as JSON:
{
  "businessName": "string",
  "businessType": "string",
  "services": ["array of services"],
  "contact": {
    "phone": "string or null",
    "email": "string or null",
    "address": "string or null"
  },
  "hours": "string or null",
  "description": "brief description"
}`,
        },
        {
          role: 'user',
          content: `Analyze this website content and extract business information:\n\n${webText}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const businessInfo = specs.choices[0]?.message?.content;
    
    if (!businessInfo) {
      throw new Error('No response from OpenAI');
    }

    const parsedInfo = JSON.parse(businessInfo);

    // Step 3: Generate voice agent configuration based on business info
    const agentConfig = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant that configures voice agents for businesses.
Create a voice agent configuration and return as JSON:
{
  "greeting": "Professional greeting message",
  "systemPrompt": "Instructions for the voice agent",
  "callRouting": {
    "sales": "instructions",
    "support": "instructions",
    "appointments": "instructions"
  },
  "knowledgeBase": ["key facts about the business"],
  "tone": "professional/friendly/casual"
}`,
        },
        {
          role: 'user',
          content: `Create a voice agent configuration for this business:\n\n${JSON.stringify(parsedInfo, null, 2)}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const voiceConfig = agentConfig.choices[0]?.message?.content;
    
    if (!voiceConfig) {
      throw new Error('No voice config response from OpenAI');
    }

    const parsedConfig = JSON.parse(voiceConfig);

    return NextResponse.json({
      success: true,
      data: {
        businessInfo: parsedInfo,
        voiceAgentConfig: parsedConfig,
        sourceUrl: url,
        configuredAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in auto-configure route:', error);
    return NextResponse.json(
      {
        error: 'Failed to auto-configure',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method with a URL to auto-configure' },
    { status: 405 }
  );
}
