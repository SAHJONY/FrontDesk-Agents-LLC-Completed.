/**
 * Google Maps Integration for "Drive for Dollars" Lead Generation
 * Automated business discovery using Google Maps and Street View
 */

import type { LeadCard } from './autonomous-sales-workforce';

interface GoogleMapsConfig {
  api_key: string;
  rate_limit_per_second: number;
  enable_street_view: boolean;
  enable_places_api: boolean;
}

interface BusinessLocation {
  place_id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  types: string[];
  rating?: number;
  user_ratings_total?: number;
  phone?: string;
  website?: string;
  opening_hours?: {
    open_now: boolean;
    weekday_text: string[];
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
}

interface StreetViewMetadata {
  location: { lat: number; lng: number };
  pano_id: string;
  date: string;
  copyright: string;
  status: 'OK' | 'ZERO_RESULTS' | 'NOT_FOUND';
}

interface StreetViewImage {
  url: string;
  heading: number;
  pitch: number;
  fov: number;
  width: number;
  height: number;
}

interface DriveForDollarsRoute {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  industry_filter?: string[];
  route_points: Array<{ lat: number; lng: number }>;
  radius_meters: number;
  discovered_businesses: number;
  status: 'planned' | 'in_progress' | 'completed';
}

interface BusinessInsights {
  business_type: string;
  estimated_size: 'small' | 'medium' | 'large';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  signage_visible: boolean;
  parking_available: boolean;
  foot_traffic: 'high' | 'medium' | 'low';
  competition_nearby: number;
  lead_quality_score: number; // 0-100
}

class GoogleMapsIntegration {
  private config: GoogleMapsConfig;
  private routes: Map<string, DriveForDollarsRoute> = new Map();
  private discoveredBusinesses: Map<string, BusinessLocation> = new Map();
  private requestCount: number = 0;
  private lastRequestTime: number = 0;

  constructor(config?: Partial<GoogleMapsConfig>) {
    this.config = {
      api_key: process.env.GOOGLE_MAPS_API_KEY || '',
      rate_limit_per_second: 10,
      enable_street_view: true,
      enable_places_api: true,
      ...config,
    };
  }

  /**
   * Create "drive for dollars" route
   */
  createRoute(params: {
    name: string;
    city: string;
    state: string;
    country: string;
    industry_filter?: string[];
    center_lat: number;
    center_lng: number;
    radius_meters: number;
  }): DriveForDollarsRoute {
    // Generate route points in a grid pattern
    const routePoints = this.generateRouteGrid(
      params.center_lat,
      params.center_lng,
      params.radius_meters
    );

    const route: DriveForDollarsRoute = {
      id: `route_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: params.name,
      city: params.city,
      state: params.state,
      country: params.country,
      industry_filter: params.industry_filter,
      route_points: routePoints,
      radius_meters: params.radius_meters,
      discovered_businesses: 0,
      status: 'planned',
    };

    this.routes.set(route.id, route);

    return route;
  }

  /**
   * Generate route grid for systematic coverage
   */
  private generateRouteGrid(
    centerLat: number,
    centerLng: number,
    radiusMeters: number
  ): Array<{ lat: number; lng: number }> {
    const points: Array<{ lat: number; lng: number }> = [];

    // Convert radius to approximate degrees (rough approximation)
    const radiusDegrees = radiusMeters / 111000; // 1 degree ≈ 111km

    // Create grid with 500m spacing
    const spacing = 500 / 111000; // 500 meters in degrees

    for (let lat = centerLat - radiusDegrees; lat <= centerLat + radiusDegrees; lat += spacing) {
      for (let lng = centerLng - radiusDegrees; lng <= centerLng + radiusDegrees; lng += spacing) {
        // Check if point is within radius
        const distance = this.calculateDistance(centerLat, centerLng, lat, lng);
        if (distance <= radiusMeters) {
          points.push({ lat, lng });
        }
      }
    }

    return points;
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Execute "drive for dollars" route
   */
  async executeRoute(routeId: string): Promise<{
    businesses_discovered: number;
    leads_generated: LeadCard[];
  }> {
    const route = this.routes.get(routeId);
    if (!route) {
      throw new Error('Route not found');
    }

    route.status = 'in_progress';

    const allBusinesses: BusinessLocation[] = [];

    // Process each route point
    for (const point of route.route_points) {
      // Search for businesses near this point
      const businesses = await this.searchNearbyBusinesses(
        point.lat,
        point.lng,
        200, // 200m radius per point
        route.industry_filter
      );

      allBusinesses.push(...businesses);

      // Rate limiting
      await this.respectRateLimit();
    }

    // Deduplicate businesses by place_id
    const uniqueBusinesses = this.deduplicateBusinesses(allBusinesses);

    // Store discovered businesses
    for (const business of uniqueBusinesses) {
      this.discoveredBusinesses.set(business.place_id, business);
    }

    // Convert to leads
    const leads = await this.convertBusinessesToLeads(uniqueBusinesses);

    route.discovered_businesses = uniqueBusinesses.length;
    route.status = 'completed';

    return {
      businesses_discovered: uniqueBusinesses.length,
      leads_generated: leads,
    };
  }

  /**
   * Search for businesses near a location using Google Places API
   */
  async searchNearbyBusinesses(
    lat: number,
    lng: number,
    radius: number,
    industryFilter?: string[]
  ): Promise<BusinessLocation[]> {
    // Simulate Google Places API call
    // In production, use actual Google Places API: https://maps.googleapis.com/maps/api/place/nearbysearch/json

    const businesses: BusinessLocation[] = [];

    // Simulate finding 3-5 businesses per location
    const count = Math.floor(Math.random() * 3) + 3;

    for (let i = 0; i < count; i++) {
      const businessTypes = this.getBusinessTypes(industryFilter);
      const selectedType = businessTypes[Math.floor(Math.random() * businessTypes.length)];

      businesses.push({
        place_id: `ChIJ${Math.random().toString(36).substr(2, 20)}`,
        name: this.generateBusinessName(selectedType),
        address: `${Math.floor(Math.random() * 9999)} Main St`,
        lat: lat + (Math.random() - 0.5) * 0.002,
        lng: lng + (Math.random() - 0.5) * 0.002,
        types: [selectedType],
        rating: Math.random() * 2 + 3, // 3.0-5.0
        user_ratings_total: Math.floor(Math.random() * 500),
        phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
        website: `https://example-${i}.com`,
        opening_hours: {
          open_now: Math.random() > 0.3,
          weekday_text: [
            'Monday: 9:00 AM – 5:00 PM',
            'Tuesday: 9:00 AM – 5:00 PM',
            'Wednesday: 9:00 AM – 5:00 PM',
            'Thursday: 9:00 AM – 5:00 PM',
            'Friday: 9:00 AM – 5:00 PM',
            'Saturday: Closed',
            'Sunday: Closed',
          ],
        },
        photos: [
          {
            photo_reference: `photo_${Math.random().toString(36).substr(2, 20)}`,
            height: 1200,
            width: 1600,
          },
        ],
      });
    }

    return businesses;
  }

  /**
   * Get business types based on industry filter
   */
  private getBusinessTypes(industryFilter?: string[]): string[] {
    const allTypes = [
      'restaurant',
      'cafe',
      'bar',
      'bakery',
      'dentist',
      'doctor',
      'lawyer',
      'real_estate_agency',
      'car_dealer',
      'car_repair',
      'hair_care',
      'beauty_salon',
      'spa',
      'gym',
      'hotel',
      'lodging',
      'store',
      'clothing_store',
      'electronics_store',
      'furniture_store',
      'hardware_store',
      'home_goods_store',
      'jewelry_store',
      'pet_store',
      'shoe_store',
      'accounting',
      'insurance_agency',
      'travel_agency',
    ];

    if (industryFilter && industryFilter.length > 0) {
      return allTypes.filter(type => industryFilter.includes(type));
    }

    return allTypes;
  }

  /**
   * Generate business name based on type
   */
  private generateBusinessName(type: string): string {
    const prefixes = ['The', 'Best', 'Quality', 'Premium', 'Elite', 'Pro', 'Expert'];
    const suffixes = ['Co', 'Group', 'Services', 'Solutions', 'Center', 'Shop', 'Store'];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    const typeNames: Record<string, string> = {
      restaurant: 'Restaurant',
      cafe: 'Cafe',
      bar: 'Bar',
      dentist: 'Dental',
      doctor: 'Medical',
      lawyer: 'Law',
      real_estate_agency: 'Realty',
      car_dealer: 'Auto',
      gym: 'Fitness',
      hotel: 'Hotel',
      store: 'Store',
    };

    const typeName = typeNames[type] || 'Business';

    return `${prefix} ${typeName} ${suffix}`;
  }

  /**
   * Get Street View metadata for a location
   */
  async getStreetViewMetadata(lat: number, lng: number): Promise<StreetViewMetadata> {
    // Simulate Google Street View Metadata API call
    // In production, use: https://maps.googleapis.com/maps/api/streetview/metadata

    await this.respectRateLimit();

    return {
      location: { lat, lng },
      pano_id: `pano_${Math.random().toString(36).substr(2, 20)}`,
      date: '2025-01',
      copyright: '© Google',
      status: 'OK',
    };
  }

  /**
   * Get Street View image for a location
   */
  async getStreetViewImage(
    lat: number,
    lng: number,
    heading: number = 0,
    pitch: number = 0,
    fov: number = 90
  ): Promise<StreetViewImage> {
    // Simulate Google Street View Static API call
    // In production, use: https://maps.googleapis.com/maps/api/streetview

    await this.respectRateLimit();

    const width = 640;
    const height = 480;

    const url = `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&fov=${fov}&key=${this.config.api_key}`;

    return {
      url,
      heading,
      pitch,
      fov,
      width,
      height,
    };
  }

  /**
   * Get multiple Street View images from different angles
   */
  async getStreetViewImages360(lat: number, lng: number): Promise<StreetViewImage[]> {
    const images: StreetViewImage[] = [];

    // Get images from 4 cardinal directions
    const headings = [0, 90, 180, 270]; // N, E, S, W

    for (const heading of headings) {
      const image = await this.getStreetViewImage(lat, lng, heading);
      images.push(image);
    }

    return images;
  }

  /**
   * Deduplicate businesses by place_id
   */
  private deduplicateBusinesses(businesses: BusinessLocation[]): BusinessLocation[] {
    const seen = new Set<string>();
    const unique: BusinessLocation[] = [];

    for (const business of businesses) {
      if (!seen.has(business.place_id)) {
        seen.add(business.place_id);
        unique.push(business);
      }
    }

    return unique;
  }

  /**
   * Convert businesses to leads
   */
  private async convertBusinessesToLeads(businesses: BusinessLocation[]): Promise<LeadCard[]> {
    const leads: LeadCard[] = [];

    for (const business of businesses) {
      // Extract domain from website
      let domain = '';
      if (business.website) {
        try {
          const url = new URL(business.website);
          domain = url.hostname.replace('www.', '');
        } catch (e) {
          domain = business.website;
        }
      }

      // Determine industry from types
      const industry = this.mapTypeToIndustry(business.types[0]);

      // Calculate lead score based on available data
      const leadScore = this.calculateLeadScore(business);

      const lead: LeadCard = {
        id: `lead_gmaps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        company_name: business.name,
        domain: domain || `${business.name.toLowerCase().replace(/\s+/g, '')}.com`,
        geo: {
          country: 'United States', // Could be extracted from address
          city: 'City', // Could be extracted from address
        },
        industry,
        role_target: 'Owner',
        contact_phone: business.phone,
        source_type: 'permitted_crawl',
        source_proof: `Google Maps - Place ID: ${business.place_id}`,
        signals: [
          { type: 'google_rating', value: business.rating?.toString() || 'N/A', confidence: 0.9 },
          {
            type: 'review_count',
            value: business.user_ratings_total?.toString() || '0',
            confidence: 0.9,
          },
          {
            type: 'has_website',
            value: business.website ? 'true' : 'false',
            confidence: 1.0,
          },
          { type: 'has_phone', value: business.phone ? 'true' : 'false', confidence: 1.0 },
          {
            type: 'currently_open',
            value: business.opening_hours?.open_now ? 'true' : 'false',
            confidence: 0.8,
          },
        ],
        lead_score: leadScore,
        compliance_ok: true,
        next_best_action: 'call_outreach',
        created_at: new Date(),
        last_updated: new Date(),
      };

      leads.push(lead);
    }

    return leads;
  }

  /**
   * Map Google Place type to industry
   */
  private mapTypeToIndustry(type: string): string {
    const mapping: Record<string, string> = {
      restaurant: 'restaurant',
      cafe: 'restaurant',
      bar: 'restaurant',
      bakery: 'restaurant',
      dentist: 'healthcare',
      doctor: 'healthcare',
      lawyer: 'legal',
      real_estate_agency: 'real-estate',
      car_dealer: 'automotive',
      car_repair: 'automotive',
      hair_care: 'beauty',
      beauty_salon: 'beauty',
      spa: 'beauty',
      gym: 'fitness',
      hotel: 'hospitality',
      lodging: 'hospitality',
      store: 'retail',
      accounting: 'professional-services',
      insurance_agency: 'insurance',
    };

    return mapping[type] || 'other';
  }

  /**
   * Calculate lead score based on business data
   */
  private calculateLeadScore(business: BusinessLocation): number {
    let score = 50; // Base score

    // Rating bonus (0-20 points)
    if (business.rating) {
      score += (business.rating - 3) * 10; // 3.0 = 0 bonus, 5.0 = 20 bonus
    }

    // Review count bonus (0-15 points)
    if (business.user_ratings_total) {
      if (business.user_ratings_total > 100) score += 15;
      else if (business.user_ratings_total > 50) score += 10;
      else if (business.user_ratings_total > 10) score += 5;
    }

    // Has website bonus (10 points)
    if (business.website) {
      score += 10;
    }

    // Has phone bonus (5 points)
    if (business.phone) {
      score += 5;
    }

    // Currently open bonus (5 points)
    if (business.opening_hours?.open_now) {
      score += 5;
    }

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Respect rate limits
   */
  private async respectRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minInterval = 1000 / this.config.rate_limit_per_second;

    if (timeSinceLastRequest < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastRequest));
    }

    this.lastRequestTime = Date.now();
    this.requestCount++;
  }

  /**
   * Get all routes
   */
  getRoutes(): DriveForDollarsRoute[] {
    return Array.from(this.routes.values());
  }

  /**
   * Get discovered businesses
   */
  getDiscoveredBusinesses(): BusinessLocation[] {
    return Array.from(this.discoveredBusinesses.values());
  }

  /**
   * Get metrics
   */
  getMetrics(): {
    total_routes: number;
    completed_routes: number;
    businesses_discovered: number;
    api_requests: number;
  } {
    const routes = Array.from(this.routes.values());

    return {
      total_routes: routes.length,
      completed_routes: routes.filter(r => r.status === 'completed').length,
      businesses_discovered: this.discoveredBusinesses.size,
      api_requests: this.requestCount,
    };
  }
}

// Export singleton instance
export const googleMapsIntegration = new GoogleMapsIntegration();
export type {
  GoogleMapsConfig,
  BusinessLocation,
  StreetViewMetadata,
  StreetViewImage,
  DriveForDollarsRoute,
  BusinessInsights,
};
