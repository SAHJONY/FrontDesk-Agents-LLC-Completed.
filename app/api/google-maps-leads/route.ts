/**
 * Google Maps "Drive for Dollars" Lead Generation API
 */

import { NextRequest, NextResponse } from 'next/server';
import { googleMapsIntegration } from '@/lib/sales-workforce/google-maps-integration';
import { streetViewAIAnalyzer } from '@/lib/sales-workforce/street-view-ai-analyzer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'metrics') {
      const metrics = googleMapsIntegration.getMetrics();

      return NextResponse.json({
        success: true,
        data: metrics,
      });
    }

    if (action === 'routes') {
      const routes = googleMapsIntegration.getRoutes();

      return NextResponse.json({
        success: true,
        data: routes,
      });
    }

    if (action === 'discovered_businesses') {
      const businesses = googleMapsIntegration.getDiscoveredBusinesses();

      return NextResponse.json({
        success: true,
        data: businesses,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Google Maps API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'create_route') {
      const { name, city, state, country, industry_filter, center_lat, center_lng, radius_meters } =
        body;

      if (!name || !city || !state || !country || !center_lat || !center_lng || !radius_meters) {
        return NextResponse.json(
          {
            error:
              'Missing required parameters: name, city, state, country, center_lat, center_lng, radius_meters',
          },
          { status: 400 }
        );
      }

      const route = googleMapsIntegration.createRoute({
        name,
        city,
        state,
        country,
        industry_filter,
        center_lat,
        center_lng,
        radius_meters,
      });

      return NextResponse.json({
        success: true,
        data: route,
      });
    }

    if (action === 'execute_route') {
      const { route_id } = body;

      if (!route_id) {
        return NextResponse.json({ error: 'Missing route_id' }, { status: 400 });
      }

      const result = await googleMapsIntegration.executeRoute(route_id);

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    if (action === 'analyze_business_visual') {
      const { place_id, business_name, lat, lng, types } = body;

      if (!place_id || !lat || !lng) {
        return NextResponse.json(
          { error: 'Missing required parameters: place_id, lat, lng' },
          { status: 400 }
        );
      }

      const business = {
        place_id,
        name: business_name || 'Unknown Business',
        address: '',
        lat,
        lng,
        types: types || ['business'],
      };

      const analysis = await streetViewAIAnalyzer.analyzeBusinessFromStreetView(business);

      return NextResponse.json({
        success: true,
        data: analysis,
      });
    }

    if (action === 'batch_analyze_visual') {
      const { businesses } = body;

      if (!businesses || !Array.isArray(businesses)) {
        return NextResponse.json({ error: 'Missing or invalid businesses array' }, { status: 400 });
      }

      const analyses = await streetViewAIAnalyzer.batchAnalyzeBusinesses(businesses);

      return NextResponse.json({
        success: true,
        data: analyses,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Google Maps API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
