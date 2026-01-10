/**
 * Advanced Web Crawlers and Scrapers with Compliance Controls
 * Ethical, legal lead sourcing from permitted sources
 */

import type { LeadCard } from './autonomous-sales-workforce';

interface CrawlerConfig {
  source_type: 'linkedin' | 'crunchbase' | 'apollo' | 'zoominfo' | 'clearbit' | 
                'hunter' | 'lusha' | 'rocketreach' | 'company_website' | 'directory';
  compliance_mode: 'strict' | 'standard';
  rate_limit_per_minute: number;
  respect_robots_txt: boolean;
  user_agent: string;
  api_key?: string;
}

interface ScrapeResult {
  success: boolean;
  leads: LeadCard[];
  source_proof: string;
  compliance_verified: boolean;
  error?: string;
}

interface DataSource {
  id: string;
  name: string;
  type: 'api' | 'licensed' | 'permitted_crawl';
  compliance_status: 'approved' | 'review_required' | 'blocked';
  rate_limits: {
    requests_per_minute: number;
    requests_per_day: number;
  };
  cost_per_lead?: number;
  data_quality_score: number; // 0-1
}

class LeadSourcingCrawlers {
  private dataSources: Map<string, DataSource> = new Map();
  private requestCounts: Map<string, number[]> = new Map();

  constructor() {
    this.initializeDataSources();
  }

  /**
   * Initialize approved data sources
   */
  private initializeDataSources(): void {
    // API-based sources (licensed)
    this.registerDataSource({
      id: 'apollo',
      name: 'Apollo.io API',
      type: 'api',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 60,
        requests_per_day: 10000,
      },
      cost_per_lead: 0.10,
      data_quality_score: 0.9,
    });

    this.registerDataSource({
      id: 'zoominfo',
      name: 'ZoomInfo API',
      type: 'licensed',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 30,
        requests_per_day: 5000,
      },
      cost_per_lead: 0.25,
      data_quality_score: 0.95,
    });

    this.registerDataSource({
      id: 'clearbit',
      name: 'Clearbit API',
      type: 'api',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 60,
        requests_per_day: 10000,
      },
      cost_per_lead: 0.15,
      data_quality_score: 0.92,
    });

    this.registerDataSource({
      id: 'hunter',
      name: 'Hunter.io API',
      type: 'api',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 60,
        requests_per_day: 5000,
      },
      cost_per_lead: 0.05,
      data_quality_score: 0.85,
    });

    this.registerDataSource({
      id: 'crunchbase',
      name: 'Crunchbase API',
      type: 'api',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 30,
        requests_per_day: 3000,
      },
      cost_per_lead: 0.20,
      data_quality_score: 0.88,
    });

    // Permitted crawling sources
    this.registerDataSource({
      id: 'company_websites',
      name: 'Company Websites (robots.txt compliant)',
      type: 'permitted_crawl',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 10,
        requests_per_day: 1000,
      },
      cost_per_lead: 0.01,
      data_quality_score: 0.75,
    });

    this.registerDataSource({
      id: 'business_directories',
      name: 'Public Business Directories',
      type: 'permitted_crawl',
      compliance_status: 'approved',
      rate_limits: {
        requests_per_minute: 20,
        requests_per_day: 2000,
      },
      cost_per_lead: 0.02,
      data_quality_score: 0.70,
    });

    console.log(`Data sources initialized: ${this.dataSources.size} sources`);
  }

  /**
   * Register data source
   */
  private registerDataSource(source: DataSource): void {
    this.dataSources.set(source.id, source);
  }

  /**
   * Get approved sources for geo/vertical
   */
  getApprovedSources(geo: string, vertical: string): DataSource[] {
    // Return all approved sources
    // In production, filter by geo/vertical permissions
    return Array.from(this.dataSources.values()).filter(
      source => source.compliance_status === 'approved'
    );
  }

  /**
   * Source leads from Apollo.io API
   */
  async sourceFromApollo(params: {
    industry: string;
    country: string;
    company_size?: string;
    job_titles?: string[];
    limit: number;
  }): Promise<ScrapeResult> {
    const source = this.dataSources.get('apollo');
    if (!source) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Apollo source not configured',
      };
    }

    // Check rate limits
    if (!this.checkRateLimit(source.id, source.rate_limits)) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Rate limit exceeded',
      };
    }

    // Simulate API call
    const leads: LeadCard[] = [];

    for (let i = 0; i < Math.min(params.limit, 10); i++) {
      leads.push({
        id: `lead_apollo_${Date.now()}_${i}`,
        company_name: `Company ${i + 1}`,
        domain: `company${i + 1}.com`,
        geo: {
          country: params.country,
          city: 'City',
        },
        industry: params.industry,
        role_target: params.job_titles?.[0] || 'CEO',
        contact_email: `contact${i + 1}@company${i + 1}.com`,
        source_type: 'api',
        source_proof: `Apollo.io API - ${new Date().toISOString()}`,
        signals: [
          { type: 'company_size', value: params.company_size || '50-200', confidence: 0.9 },
          { type: 'industry', value: params.industry, confidence: 0.95 },
        ],
        lead_score: Math.floor(Math.random() * 30) + 70, // 70-100
        compliance_ok: true,
        next_best_action: 'email_outreach',
        created_at: new Date(),
        last_updated: new Date(),
      });
    }

    // Record request
    this.recordRequest(source.id);

    return {
      success: true,
      leads,
      source_proof: `Apollo.io API - Licensed data provider`,
      compliance_verified: true,
    };
  }

  /**
   * Source leads from ZoomInfo API
   */
  async sourceFromZoomInfo(params: {
    industry: string;
    country: string;
    revenue_range?: string;
    employee_range?: string;
    limit: number;
  }): Promise<ScrapeResult> {
    const source = this.dataSources.get('zoominfo');
    if (!source) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'ZoomInfo source not configured',
      };
    }

    // Check rate limits
    if (!this.checkRateLimit(source.id, source.rate_limits)) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Rate limit exceeded',
      };
    }

    // Simulate API call
    const leads: LeadCard[] = [];

    for (let i = 0; i < Math.min(params.limit, 10); i++) {
      leads.push({
        id: `lead_zoominfo_${Date.now()}_${i}`,
        company_name: `Enterprise ${i + 1}`,
        domain: `enterprise${i + 1}.com`,
        geo: {
          country: params.country,
        },
        industry: params.industry,
        role_target: 'VP Sales',
        contact_email: `vp${i + 1}@enterprise${i + 1}.com`,
        contact_phone: `+1-555-${1000 + i}`,
        source_type: 'licensed',
        source_proof: `ZoomInfo API - ${new Date().toISOString()}`,
        signals: [
          { type: 'revenue', value: params.revenue_range || '$10M-$50M', confidence: 0.92 },
          { type: 'employees', value: params.employee_range || '100-500', confidence: 0.95 },
          { type: 'tech_stack', value: 'Salesforce, HubSpot', confidence: 0.85 },
        ],
        lead_score: Math.floor(Math.random() * 20) + 80, // 80-100
        compliance_ok: true,
        next_best_action: 'personalized_email',
        created_at: new Date(),
        last_updated: new Date(),
      });
    }

    // Record request
    this.recordRequest(source.id);

    return {
      success: true,
      leads,
      source_proof: `ZoomInfo API - Licensed data provider`,
      compliance_verified: true,
    };
  }

  /**
   * Source leads from Clearbit API
   */
  async sourceFromClearbit(params: {
    domain?: string;
    company_name?: string;
    industry?: string;
  }): Promise<ScrapeResult> {
    const source = this.dataSources.get('clearbit');
    if (!source) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Clearbit source not configured',
      };
    }

    // Check rate limits
    if (!this.checkRateLimit(source.id, source.rate_limits)) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Rate limit exceeded',
      };
    }

    // Simulate enrichment
    const lead: LeadCard = {
      id: `lead_clearbit_${Date.now()}`,
      company_name: params.company_name || 'Company',
      domain: params.domain || 'company.com',
      geo: {
        country: 'United States',
        city: 'San Francisco',
      },
      industry: params.industry || 'Technology',
      role_target: 'Decision Maker',
      source_type: 'api',
      source_proof: `Clearbit API - ${new Date().toISOString()}`,
      signals: [
        { type: 'company_type', value: 'B2B SaaS', confidence: 0.90 },
        { type: 'funding', value: 'Series B', confidence: 0.85 },
      ],
      lead_score: 85,
      compliance_ok: true,
      next_best_action: 'research_decision_makers',
      created_at: new Date(),
      last_updated: new Date(),
    };

    // Record request
    this.recordRequest(source.id);

    return {
      success: true,
      leads: [lead],
      source_proof: `Clearbit API - Company enrichment`,
      compliance_verified: true,
    };
  }

  /**
   * Source leads from Hunter.io API
   */
  async sourceFromHunter(params: {
    domain: string;
    role?: string;
  }): Promise<ScrapeResult> {
    const source = this.dataSources.get('hunter');
    if (!source) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Hunter source not configured',
      };
    }

    // Check rate limits
    if (!this.checkRateLimit(source.id, source.rate_limits)) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Rate limit exceeded',
      };
    }

    // Simulate email finding
    const leads: LeadCard[] = [];

    for (let i = 0; i < 3; i++) {
      leads.push({
        id: `lead_hunter_${Date.now()}_${i}`,
        company_name: params.domain.split('.')[0],
        domain: params.domain,
        geo: {
          country: 'Unknown',
        },
        industry: 'Unknown',
        role_target: params.role || 'Contact',
        contact_email: `person${i + 1}@${params.domain}`,
        source_type: 'api',
        source_proof: `Hunter.io API - ${new Date().toISOString()}`,
        signals: [
          { type: 'email_verified', value: 'true', confidence: 0.95 },
        ],
        lead_score: 70,
        compliance_ok: true,
        next_best_action: 'verify_role',
        created_at: new Date(),
        last_updated: new Date(),
      });
    }

    // Record request
    this.recordRequest(source.id);

    return {
      success: true,
      leads,
      source_proof: `Hunter.io API - Email finder`,
      compliance_verified: true,
    };
  }

  /**
   * Crawl company website (robots.txt compliant)
   */
  async crawlCompanyWebsite(params: {
    domain: string;
    pages_to_crawl: string[];
  }): Promise<ScrapeResult> {
    const source = this.dataSources.get('company_websites');
    if (!source) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Company website crawler not configured',
      };
    }

    // Check rate limits
    if (!this.checkRateLimit(source.id, source.rate_limits)) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Rate limit exceeded',
      };
    }

    // Check robots.txt
    const robotsAllowed = await this.checkRobotsTxt(params.domain);
    if (!robotsAllowed) {
      return {
        success: false,
        leads: [],
        source_proof: '',
        compliance_verified: false,
        error: 'Crawling not permitted by robots.txt',
      };
    }

    // Simulate crawling
    const lead: LeadCard = {
      id: `lead_website_${Date.now()}`,
      company_name: params.domain.split('.')[0],
      domain: params.domain,
      geo: {
        country: 'Unknown',
      },
      industry: 'Unknown',
      role_target: 'Contact',
      source_type: 'permitted_crawl',
      source_proof: `Company website crawl - robots.txt compliant - ${new Date().toISOString()}`,
      signals: [
        { type: 'has_contact_page', value: 'true', confidence: 1.0 },
        { type: 'has_about_page', value: 'true', confidence: 1.0 },
      ],
      lead_score: 60,
      compliance_ok: true,
      next_best_action: 'enrich_with_api',
      created_at: new Date(),
      last_updated: new Date(),
    };

    // Record request
    this.recordRequest(source.id);

    return {
      success: true,
      leads: [lead],
      source_proof: `Company website - robots.txt compliant crawl`,
      compliance_verified: true,
    };
  }

  /**
   * Check robots.txt compliance
   */
  private async checkRobotsTxt(domain: string): Promise<boolean> {
    // In production, fetch and parse robots.txt
    // For now, assume allowed
    return true;
  }

  /**
   * Check rate limits
   */
  private checkRateLimit(sourceId: string, limits: { requests_per_minute: number; requests_per_day: number }): boolean {
    const now = Date.now();
    const requests = this.requestCounts.get(sourceId) || [];

    // Remove requests older than 1 day
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const recentRequests = requests.filter(timestamp => timestamp > dayAgo);

    // Check daily limit
    if (recentRequests.length >= limits.requests_per_day) {
      return false;
    }

    // Remove requests older than 1 minute
    const minuteAgo = now - 60 * 1000;
    const recentMinuteRequests = recentRequests.filter(timestamp => timestamp > minuteAgo);

    // Check per-minute limit
    if (recentMinuteRequests.length >= limits.requests_per_minute) {
      return false;
    }

    return true;
  }

  /**
   * Record request for rate limiting
   */
  private recordRequest(sourceId: string): void {
    const requests = this.requestCounts.get(sourceId) || [];
    requests.push(Date.now());
    this.requestCounts.set(sourceId, requests);
  }

  /**
   * Get data sources
   */
  getDataSources(): DataSource[] {
    return Array.from(this.dataSources.values());
  }

  /**
   * Get rate limit status
   */
  getRateLimitStatus(sourceId: string): {
    requests_last_minute: number;
    requests_last_day: number;
    limit_per_minute: number;
    limit_per_day: number;
  } {
    const source = this.dataSources.get(sourceId);
    if (!source) {
      return {
        requests_last_minute: 0,
        requests_last_day: 0,
        limit_per_minute: 0,
        limit_per_day: 0,
      };
    }

    const now = Date.now();
    const requests = this.requestCounts.get(sourceId) || [];

    const minuteAgo = now - 60 * 1000;
    const dayAgo = now - 24 * 60 * 60 * 1000;

    const requestsLastMinute = requests.filter(timestamp => timestamp > minuteAgo).length;
    const requestsLastDay = requests.filter(timestamp => timestamp > dayAgo).length;

    return {
      requests_last_minute: requestsLastMinute,
      requests_last_day: requestsLastDay,
      limit_per_minute: source.rate_limits.requests_per_minute,
      limit_per_day: source.rate_limits.requests_per_day,
    };
  }
}

// Export singleton instance
export const leadSourcingCrawlers = new LeadSourcingCrawlers();
export type { CrawlerConfig, ScrapeResult, DataSource };
