import { NextRequest, NextResponse } from 'next/server';
import {
  calculateMultiLocationPricing,
  generateAccountSummary,
  getVolumeDiscount,
  getDiscountTierDescription,
  formatCurrency,
  type Location,
} from '@/lib/multi-location-pricing';

/**
 * GET /api/multi-location-pricing
 * Calculate pricing for multi-location accounts
 * 
 * Query parameters:
 * - action: 'calculate' | 'discount' | 'summary'
 * 
 * Body (for POST):
 * - accountId: string
 * - accountName: string
 * - locations: Location[]
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');

    if (action === 'discount') {
      // Get discount information for a specific location count
      const locationCount = parseInt(searchParams.get('locationCount') || '1');
      const discount = getVolumeDiscount(locationCount);
      const description = getDiscountTierDescription(locationCount);

      return NextResponse.json({
        success: true,
        data: {
          locationCount,
          discount: discount * 100, // Convert to percentage
          description,
        },
      });
    }

    // Default: return discount tiers
    return NextResponse.json({
      success: true,
      data: {
        discountTiers: [
          { locations: '1', discount: '0%', description: 'Single Location' },
          { locations: '2-5', discount: '10%', description: 'Small Chain' },
          { locations: '6-10', discount: '15%', description: 'Regional Business' },
          { locations: '11-25', discount: '20%', description: 'Large Enterprise' },
          { locations: '26+', discount: 'Custom', description: 'Contact Sales' },
        ],
      },
    });
  } catch (error) {
    console.error('Error in multi-location pricing GET:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve pricing information' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/multi-location-pricing
 * Calculate pricing for a specific multi-location account
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, accountId, accountName, locations } = body;

    if (!locations || !Array.isArray(locations)) {
      return NextResponse.json(
        { success: false, error: 'Invalid locations data' },
        { status: 400 }
      );
    }

    if (action === 'calculate') {
      // Calculate pricing for the provided locations
      const pricing = calculateMultiLocationPricing(locations);

      return NextResponse.json({
        success: true,
        data: {
          baseTotal: formatCurrency(pricing.baseTotal),
          discount: `${pricing.discount * 100}%`,
          discountAmount: formatCurrency(pricing.discountAmount),
          finalTotal: formatCurrency(pricing.finalTotal),
          savings: formatCurrency(pricing.savings),
          locationCount: locations.filter((loc: Location) => loc.active).length,
          discountTier: getDiscountTierDescription(
            locations.filter((loc: Location) => loc.active).length
          ),
        },
      });
    }

    if (action === 'summary') {
      // Generate full account summary
      if (!accountId || !accountName) {
        return NextResponse.json(
          { success: false, error: 'accountId and accountName are required for summary' },
          { status: 400 }
        );
      }

      const summary = generateAccountSummary(accountId, accountName, locations);

      return NextResponse.json({
        success: true,
        data: {
          accountId: summary.accountId,
          accountName: summary.accountName,
          totalLocations: summary.totalLocations,
          discountTier: `${summary.discountTier * 100}%`,
          totalMonthlyPrice: formatCurrency(summary.totalMonthlyPrice),
          monthlySavings: formatCurrency(summary.monthlySavings),
          locations: summary.locations.map(loc => ({
            id: loc.id,
            name: loc.name,
            plan: loc.plan,
            basePrice: formatCurrency(loc.basePrice),
          })),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Use "calculate" or "summary"' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in multi-location pricing POST:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to calculate pricing' },
      { status: 500 }
    );
  }
}
