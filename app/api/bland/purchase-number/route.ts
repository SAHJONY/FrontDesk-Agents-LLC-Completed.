import { NextResponse } from 'next/server';
import { blandAI } from '@/lib/services/bland-ai';

export async function POST(request: Request) {
  try {
    const { areaCode, countryCode } = await request.json();

    // Purchase number via Bland AI
    const number = await blandAI.purchasePhoneNumber(areaCode, countryCode);

    return NextResponse.json({
      success: true,
      phone_number: number.phone_number,
      area_code: number.area_code,
      country_code: number.country_code
    });

  } catch (error) {
    console.error('Error purchasing number:', error);
    return NextResponse.json(
      { error: 'Failed to purchase phone number', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
