// app/api/configure/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { businessInfo } = body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that helps configure voice agents for businesses. Return your response as valid JSON only.',
        },
        {
          role: 'user',
          content: `Configure a voice agent for this business: ${JSON.stringify(businessInfo)}`,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error in configure route:', error);
    return NextResponse.json(
      { error: 'Failed to configure voice agent', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
