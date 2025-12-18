// app/api/onboarding/auto-configure/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inline prompts to avoid import issues
const WEBSITE_SCRAPER_PROMPT = `You are an AI assistant that analyzes website content to extract business information.
Your task is to identify and extract the following information from the provided website content:

1. Business Name
2. Business Type/Industry
3. Services Offered
4. Contact Information (phone, email, address)
5. Business Hours
6. Key Features or Unique Selling Points
7. Target Audience
8. Frequently Asked Questions (if available)

Format your response as a structured JSON object with these fields:
{
  "businessName": "string",
  "businessType": "string",
  "services": ["string"],
  "contact": {
    "phone": "string",
    "email": "string",
    "address": "string"
  },
  "hours": "string",
  "features": ["string"],
  "targetAudience": "string",
  "faqs": [{"question": "string", "answer": "string"}]
}

If any information is not found, use null or an empty array as appropriate.`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { websiteUrl, websiteContent } = await request.json();

    if (!websiteContent) {
      return NextResponse.json(
        { error: 'Website content is required' },
        { status: 400 }
      );
    }

    // Use OpenAI to analyze the website content
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: WEBSITE_SCRAPER_PROMPT,
        },
        {
          role: 'user',
          content: `Please analyze the following website content and extract business information:\n\n${websiteContent}`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const analysisText = completion.choices[0]?.message?.content;
    
    if (!analysisText) {
      throw new Error('No response from OpenAI');
    }

    const businessInfo = JSON.parse(analysisText);

    return NextResponse.json({
      success: true,
      data: {
        ...businessInfo,
        websiteUrl,
        scrapedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in scrape route:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze website',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Use POST method to scrape website content' },
    { status: 405 }
  );
}
