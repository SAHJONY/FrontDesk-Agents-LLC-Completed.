/**
 * Google Street View Crawler with AI-Powered Image Analysis
 * Visual business identification and quality assessment
 */

import type { BusinessLocation, StreetViewImage, BusinessInsights } from './google-maps-integration';
import { googleMapsIntegration } from './google-maps-integration';

interface ImageAnalysisResult {
  business_detected: boolean;
  business_type: string;
  confidence: number;
  signage_text: string[];
  building_condition: 'excellent' | 'good' | 'fair' | 'poor';
  features_detected: string[];
  estimated_size: 'small' | 'medium' | 'large';
  parking_visible: boolean;
  foot_traffic_indicators: string[];
}

interface VisualLeadQualification {
  place_id: string;
  business_name: string;
  visual_quality_score: number; // 0-100
  insights: BusinessInsights;
  street_view_images: StreetViewImage[];
  ai_analysis: ImageAnalysisResult[];
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

class StreetViewAIAnalyzer {
  private analysisCache: Map<string, ImageAnalysisResult> = new Map();

  /**
   * Analyze business from Street View images
   */
  async analyzeBusinessFromStreetView(
    business: BusinessLocation
  ): Promise<VisualLeadQualification> {
    // Get Street View images from multiple angles
    const images = await googleMapsIntegration.getStreetViewImages360(business.lat, business.lng);

    // Analyze each image with AI
    const analyses: ImageAnalysisResult[] = [];

    for (const image of images) {
      const analysis = await this.analyzeImage(image);
      analyses.push(analysis);
    }

    // Aggregate insights from all images
    const insights = this.aggregateInsights(business, analyses);

    // Calculate visual quality score
    const visualQualityScore = this.calculateVisualQualityScore(insights, analyses);

    // Determine priority
    const priority = this.determinePriority(visualQualityScore, insights);

    // Generate recommendation
    const recommendation = this.generateRecommendation(insights, visualQualityScore);

    return {
      place_id: business.place_id,
      business_name: business.name,
      visual_quality_score: visualQualityScore,
      insights,
      street_view_images: images,
      ai_analysis: analyses,
      recommendation,
      priority,
    };
  }

  /**
   * Analyze single Street View image with AI
   */
  private async analyzeImage(image: StreetViewImage): Promise<ImageAnalysisResult> {
    // Check cache
    const cacheKey = `${image.url}_${image.heading}`;
    if (this.analysisCache.has(cacheKey)) {
      return this.analysisCache.get(cacheKey)!;
    }

    // Simulate AI image analysis
    // In production, use OpenAI Vision API, Google Cloud Vision API, or similar
    const result = await this.simulateAIImageAnalysis(image);

    // Cache result
    this.analysisCache.set(cacheKey, result);

    return result;
  }

  /**
   * Simulate AI image analysis
   * In production, replace with actual AI vision API
   */
  private async simulateAIImageAnalysis(image: StreetViewImage): Promise<ImageAnalysisResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate AI detection results
    const businessTypes = [
      'restaurant',
      'cafe',
      'retail_store',
      'office',
      'medical_clinic',
      'salon',
      'gym',
      'auto_repair',
    ];

    const features = [
      'storefront',
      'signage',
      'parking_lot',
      'entrance',
      'windows',
      'outdoor_seating',
      'awning',
      'security_camera',
    ];

    const conditions: Array<'excellent' | 'good' | 'fair' | 'poor'> = [
      'excellent',
      'good',
      'fair',
      'poor',
    ];

    const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

    return {
      business_detected: Math.random() > 0.2, // 80% detection rate
      business_type: businessTypes[Math.floor(Math.random() * businessTypes.length)],
      confidence: Math.random() * 0.3 + 0.7, // 0.7-1.0
      signage_text: this.generateSignageText(),
      building_condition: conditions[Math.floor(Math.random() * conditions.length)],
      features_detected: this.selectRandomFeatures(features, 3, 6),
      estimated_size: sizes[Math.floor(Math.random() * sizes.length)],
      parking_visible: Math.random() > 0.4,
      foot_traffic_indicators: this.generateFootTrafficIndicators(),
    };
  }

  /**
   * Generate signage text (simulated OCR)
   */
  private generateSignageText(): string[] {
    const texts = [
      'OPEN',
      'CLOSED',
      'HOURS: 9AM-5PM',
      'WELCOME',
      'PARKING IN REAR',
      'CALL FOR APPOINTMENT',
      'WALK-INS WELCOME',
      'FREE WIFI',
      'ATM INSIDE',
    ];

    return this.selectRandomFeatures(texts, 1, 3);
  }

  /**
   * Generate foot traffic indicators
   */
  private generateFootTrafficIndicators(): string[] {
    const indicators = [
      'pedestrians_visible',
      'parked_cars',
      'busy_sidewalk',
      'nearby_businesses',
      'public_transit_nearby',
      'residential_area',
      'commercial_district',
    ];

    return this.selectRandomFeatures(indicators, 2, 4);
  }

  /**
   * Select random features from array
   */
  private selectRandomFeatures(features: string[], min: number, max: number): string[] {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const shuffled = [...features].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  /**
   * Aggregate insights from multiple image analyses
   */
  private aggregateInsights(
    business: BusinessLocation,
    analyses: ImageAnalysisResult[]
  ): BusinessInsights {
    // Determine business type (most common across analyses)
    const businessType = this.getMostCommonBusinessType(analyses);

    // Determine size (most common)
    const estimatedSize = this.getMostCommonSize(analyses);

    // Determine condition (average)
    const condition = this.getAverageCondition(analyses);

    // Check if signage is visible in any image
    const signageVisible = analyses.some(a => a.signage_text.length > 0);

    // Check if parking is visible in any image
    const parkingAvailable = analyses.some(a => a.parking_visible);

    // Determine foot traffic level
    const footTraffic = this.assessFootTraffic(analyses);

    // Count nearby competition (simulated)
    const competitionNearby = Math.floor(Math.random() * 5);

    // Calculate lead quality score
    const leadQualityScore = this.calculateLeadQualityFromInsights({
      business_type: businessType,
      estimated_size: estimatedSize,
      condition,
      signage_visible: signageVisible,
      parking_available: parkingAvailable,
      foot_traffic: footTraffic,
      competition_nearby: competitionNearby,
      lead_quality_score: 0, // Will be calculated
    });

    return {
      business_type: businessType,
      estimated_size: estimatedSize,
      condition,
      signage_visible: signageVisible,
      parking_available: parkingAvailable,
      foot_traffic: footTraffic,
      competition_nearby: competitionNearby,
      lead_quality_score: leadQualityScore,
    };
  }

  /**
   * Get most common business type from analyses
   */
  private getMostCommonBusinessType(analyses: ImageAnalysisResult[]): string {
    const counts = new Map<string, number>();

    for (const analysis of analyses) {
      if (analysis.business_detected) {
        const count = counts.get(analysis.business_type) || 0;
        counts.set(analysis.business_type, count + 1);
      }
    }

    let maxCount = 0;
    let mostCommon = 'unknown';

    for (const [type, count] of counts.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mostCommon = type;
      }
    }

    return mostCommon;
  }

  /**
   * Get most common size from analyses
   */
  private getMostCommonSize(analyses: ImageAnalysisResult[]): 'small' | 'medium' | 'large' {
    const counts = { small: 0, medium: 0, large: 0 };

    for (const analysis of analyses) {
      counts[analysis.estimated_size]++;
    }

    if (counts.large > counts.medium && counts.large > counts.small) return 'large';
    if (counts.medium > counts.small) return 'medium';
    return 'small';
  }

  /**
   * Get average condition from analyses
   */
  private getAverageCondition(
    analyses: ImageAnalysisResult[]
  ): 'excellent' | 'good' | 'fair' | 'poor' {
    const conditionScores = { excellent: 4, good: 3, fair: 2, poor: 1 };
    const reverseScores: Record<number, 'excellent' | 'good' | 'fair' | 'poor'> = {
      4: 'excellent',
      3: 'good',
      2: 'fair',
      1: 'poor',
    };

    let totalScore = 0;
    for (const analysis of analyses) {
      totalScore += conditionScores[analysis.building_condition];
    }

    const avgScore = Math.round(totalScore / analyses.length);
    return reverseScores[avgScore] || 'fair';
  }

  /**
   * Assess foot traffic level
   */
  private assessFootTraffic(analyses: ImageAnalysisResult[]): 'high' | 'medium' | 'low' {
    let totalIndicators = 0;

    for (const analysis of analyses) {
      totalIndicators += analysis.foot_traffic_indicators.length;
    }

    const avgIndicators = totalIndicators / analyses.length;

    if (avgIndicators >= 4) return 'high';
    if (avgIndicators >= 2) return 'medium';
    return 'low';
  }

  /**
   * Calculate lead quality score from insights
   */
  private calculateLeadQualityFromInsights(insights: BusinessInsights): number {
    let score = 50; // Base score

    // Size bonus (0-15 points)
    if (insights.estimated_size === 'large') score += 15;
    else if (insights.estimated_size === 'medium') score += 10;
    else score += 5;

    // Condition bonus (0-20 points)
    if (insights.condition === 'excellent') score += 20;
    else if (insights.condition === 'good') score += 15;
    else if (insights.condition === 'fair') score += 10;
    else score += 0;

    // Signage bonus (10 points)
    if (insights.signage_visible) score += 10;

    // Parking bonus (5 points)
    if (insights.parking_available) score += 5;

    // Foot traffic bonus (0-15 points)
    if (insights.foot_traffic === 'high') score += 15;
    else if (insights.foot_traffic === 'medium') score += 10;
    else score += 5;

    // Competition penalty (0-10 points)
    score -= Math.min(10, insights.competition_nearby * 2);

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Calculate visual quality score
   */
  private calculateVisualQualityScore(
    insights: BusinessInsights,
    analyses: ImageAnalysisResult[]
  ): number {
    // Start with lead quality score
    let score = insights.lead_quality_score;

    // Average AI confidence bonus (0-10 points)
    const avgConfidence =
      analyses.reduce((sum, a) => sum + a.confidence, 0) / analyses.length;
    score += avgConfidence * 10;

    // Detection rate bonus (0-10 points)
    const detectionRate = analyses.filter(a => a.business_detected).length / analyses.length;
    score += detectionRate * 10;

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Determine priority based on scores
   */
  private determinePriority(
    visualQualityScore: number,
    insights: BusinessInsights
  ): 'high' | 'medium' | 'low' {
    if (visualQualityScore >= 80 && insights.condition !== 'poor') return 'high';
    if (visualQualityScore >= 60) return 'medium';
    return 'low';
  }

  /**
   * Generate recommendation
   */
  private generateRecommendation(
    insights: BusinessInsights,
    visualQualityScore: number
  ): string {
    if (visualQualityScore >= 80) {
      return `High-quality lead: ${insights.estimated_size} ${insights.business_type} in ${insights.condition} condition with ${insights.foot_traffic} foot traffic. Recommend immediate outreach.`;
    }

    if (visualQualityScore >= 60) {
      return `Medium-quality lead: ${insights.estimated_size} ${insights.business_type}. ${insights.signage_visible ? 'Signage visible.' : 'No signage detected.'} ${insights.parking_available ? 'Parking available.' : ''} Recommend outreach within 48 hours.`;
    }

    return `Low-quality lead: ${insights.business_type} in ${insights.condition} condition with ${insights.competition_nearby} competitors nearby. Consider deprioritizing.`;
  }

  /**
   * Batch analyze multiple businesses
   */
  async batchAnalyzeBusinesses(
    businesses: BusinessLocation[]
  ): Promise<VisualLeadQualification[]> {
    const results: VisualLeadQualification[] = [];

    for (const business of businesses) {
      try {
        const qualification = await this.analyzeBusinessFromStreetView(business);
        results.push(qualification);
      } catch (error) {
        console.error(`Error analyzing business ${business.name}:`, error);
      }
    }

    // Sort by priority and visual quality score
    return results.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];

      if (priorityDiff !== 0) return priorityDiff;

      return b.visual_quality_score - a.visual_quality_score;
    });
  }

  /**
   * Get analysis cache size
   */
  getCacheSize(): number {
    return this.analysisCache.size;
  }

  /**
   * Clear analysis cache
   */
  clearCache(): void {
    this.analysisCache.clear();
  }
}

// Export singleton instance
export const streetViewAIAnalyzer = new StreetViewAIAnalyzer();
export type { ImageAnalysisResult, VisualLeadQualification };
