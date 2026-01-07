import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Enriched customer data
 */
export interface EnrichedCustomerData {
  email: string;
  name?: string;
  company?: string;
  companyInfo?: {
    website?: string;
    industry?: string;
    size?: string;
    location?: string;
    description?: string;
    founded?: string;
    revenue?: string;
  };
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  technologies?: string[];
  recentNews?: Array<{
    title: string;
    url: string;
    date: string;
    summary: string;
  }>;
  sentiment?: string;
  enrichmentScore: number;
  lastUpdated: Date;
}

/**
 * Web scraping and data enrichment agent
 */
export class ScrapingEnrichmentAgent {
  private cache: Map<string, EnrichedCustomerData> = new Map();
  private rateLimiter: Map<string, number> = new Map();

  /**
   * Enrich customer data from email address
   */
  async enrichCustomerData(email: string, companyDomain?: string): Promise<EnrichedCustomerData> {
    // Check cache first
    const cached = this.cache.get(email);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }

    try {
      const enrichedData: EnrichedCustomerData = {
        email,
        enrichmentScore: 0,
        lastUpdated: new Date(),
      };

      // Extract domain from email if not provided
      const domain = companyDomain || email.split('@')[1];

      // Parallel enrichment tasks
      const [companyInfo, socialProfiles, technologies, news] = await Promise.allSettled([
        this.scrapeCompanyInfo(domain),
        this.findSocialProfiles(email, domain),
        this.detectTechnologies(domain),
        this.fetchRecentNews(domain),
      ]);

      // Merge results
      if (companyInfo.status === 'fulfilled') {
        enrichedData.companyInfo = companyInfo.value;
        enrichedData.enrichmentScore += 30;
      }

      if (socialProfiles.status === 'fulfilled') {
        enrichedData.socialProfiles = socialProfiles.value;
        enrichedData.enrichmentScore += 20;
      }

      if (technologies.status === 'fulfilled') {
        enrichedData.technologies = technologies.value;
        enrichedData.enrichmentScore += 25;
      }

      if (news.status === 'fulfilled') {
        enrichedData.recentNews = news.value;
        enrichedData.enrichmentScore += 25;
      }

      // Extract name from email
      enrichedData.name = this.extractNameFromEmail(email);

      // Cache the result
      this.cache.set(email, enrichedData);

      return enrichedData;
    } catch (error) {
      console.error('Customer enrichment error:', error);
      
      return {
        email,
        enrichmentScore: 0,
        lastUpdated: new Date(),
      };
    }
  }

  /**
   * Scrape company information from website
   */
  private async scrapeCompanyInfo(domain: string): Promise<any> {
    if (!this.checkRateLimit(domain)) {
      throw new Error('Rate limit exceeded');
    }

    try {
      const url = `https://${domain}`;
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FrontDeskAgents/1.0; +https://frontdeskagents.com)',
        },
      });

      const $ = cheerio.load(response.data);

      // Extract company information
      const companyInfo: any = {
        website: url,
      };

      // Try to find company description
      const metaDescription = $('meta[name="description"]').attr('content');
      if (metaDescription) {
        companyInfo.description = metaDescription;
      }

      // Try to find company name
      const title = $('title').text();
      if (title) {
        companyInfo.name = title.split('|')[0].trim();
      }

      // Look for about page
      const aboutLink = $('a[href*="about"]').first().attr('href');
      if (aboutLink) {
        companyInfo.aboutUrl = new URL(aboutLink, url).href;
      }

      // Try to extract industry/category
      const keywords = $('meta[name="keywords"]').attr('content');
      if (keywords) {
        companyInfo.keywords = keywords.split(',').map(k => k.trim());
      }

      return companyInfo;
    } catch (error) {
      console.error(`Failed to scrape ${domain}:`, error);
      return {};
    }
  }

  /**
   * Find social media profiles
   */
  private async findSocialProfiles(email: string, domain: string): Promise<any> {
    const profiles: any = {};

    try {
      // Search for LinkedIn company page
      const linkedinSearch = await this.searchWeb(`site:linkedin.com/company ${domain}`);
      if (linkedinSearch) {
        profiles.linkedin = linkedinSearch;
      }

      // Search for Twitter profile
      const twitterSearch = await this.searchWeb(`site:twitter.com ${domain}`);
      if (twitterSearch) {
        profiles.twitter = twitterSearch;
      }

      return profiles;
    } catch (error) {
      console.error('Social profile search error:', error);
      return {};
    }
  }

  /**
   * Detect technologies used by company
   */
  private async detectTechnologies(domain: string): Promise<string[]> {
    if (!this.checkRateLimit(domain)) {
      return [];
    }

    try {
      const url = `https://${domain}`;
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FrontDeskAgents/1.0)',
        },
      });

      const technologies: string[] = [];
      const html = response.data.toLowerCase();
      const headers = response.headers;

      // Detect common technologies
      const techSignatures: Record<string, RegExp[]> = {
        'React': [/react/i, /__react/i],
        'Vue.js': [/vue\.js/i, /__vue/i],
        'Angular': [/angular/i, /ng-/i],
        'WordPress': [/wp-content/i, /wordpress/i],
        'Shopify': [/shopify/i, /cdn\.shopify/i],
        'Google Analytics': [/google-analytics/i, /gtag/i],
        'Stripe': [/stripe/i],
        'Intercom': [/intercom/i],
        'HubSpot': [/hubspot/i],
        'Salesforce': [/salesforce/i],
      };

      for (const [tech, patterns] of Object.entries(techSignatures)) {
        if (patterns.some(pattern => pattern.test(html))) {
          technologies.push(tech);
        }
      }

      // Check server headers
      if (headers['x-powered-by']) {
        technologies.push(headers['x-powered-by']);
      }

      return [...new Set(technologies)];
    } catch (error) {
      console.error(`Failed to detect technologies for ${domain}:`, error);
      return [];
    }
  }

  /**
   * Fetch recent news about company
   */
  private async fetchRecentNews(domain: string): Promise<any[]> {
    try {
      // Use AI to search for recent news
      const companyName = domain.split('.')[0];
      const newsQuery = `recent news about ${companyName} company`;

      // This would integrate with a news API in production
      // For now, return empty array
      return [];
    } catch (error) {
      console.error('News fetch error:', error);
      return [];
    }
  }

  /**
   * Search web for specific query
   */
  private async searchWeb(query: string): Promise<string | null> {
    try {
      // This would integrate with a search API (Google, Bing, etc.)
      // For now, return null
      return null;
    } catch (error) {
      console.error('Web search error:', error);
      return null;
    }
  }

  /**
   * Extract name from email address
   */
  private extractNameFromEmail(email: string): string {
    const localPart = email.split('@')[0];
    
    // Handle common patterns
    const patterns = [
      /^([a-z]+)\.([a-z]+)$/i, // firstname.lastname
      /^([a-z]+)_([a-z]+)$/i,  // firstname_lastname
      /^([a-z]+)([a-z]+)$/i,   // firstnamelastname
    ];

    for (const pattern of patterns) {
      const match = localPart.match(pattern);
      if (match) {
        const [, first, last] = match;
        return `${this.capitalize(first)} ${this.capitalize(last)}`;
      }
    }

    return this.capitalize(localPart);
  }

  /**
   * Capitalize string
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Check rate limit for domain
   */
  private checkRateLimit(domain: string): boolean {
    const now = Date.now();
    const lastRequest = this.rateLimiter.get(domain);

    if (lastRequest && now - lastRequest < 2000) {
      return false;
    }

    this.rateLimiter.set(domain, now);
    return true;
  }

  /**
   * Check if cached data is still valid
   */
  private isCacheValid(data: EnrichedCustomerData): boolean {
    const cacheValidityDays = 7;
    const now = new Date();
    const daysSinceUpdate = (now.getTime() - data.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
    
    return daysSinceUpdate < cacheValidityDays;
  }

  /**
   * Scrape specific URL with AI analysis
   */
  async scrapeAndAnalyze(url: string, analysisPrompt: string): Promise<{
    content: string;
    analysis: string;
    metadata: any;
  }> {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FrontDeskAgents/1.0)',
        },
      });

      const $ = cheerio.load(response.data);

      // Extract main content
      const content = $('body').text().trim().substring(0, 5000);

      // Extract metadata
      const metadata = {
        title: $('title').text(),
        description: $('meta[name="description"]').attr('content'),
        keywords: $('meta[name="keywords"]').attr('content'),
        author: $('meta[name="author"]').attr('content'),
      };

      // Use AI to analyze content
      const aiResponse = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert web content analyzer. Provide concise, accurate analysis.',
          },
          {
            role: 'user',
            content: `${analysisPrompt}\n\nContent:\n${content}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const analysis = aiResponse.choices[0].message.content || 'No analysis available';

      return {
        content,
        analysis,
        metadata,
      };
    } catch (error) {
      console.error('Scrape and analyze error:', error);
      throw error;
    }
  }

  /**
   * Crawl multiple pages from a domain
   */
  async crawlDomain(domain: string, maxPages: number = 10): Promise<Array<{
    url: string;
    title: string;
    content: string;
  }>> {
    const visited = new Set<string>();
    const toVisit = [`https://${domain}`];
    const results: any[] = [];

    while (toVisit.length > 0 && results.length < maxPages) {
      const url = toVisit.shift();
      if (!url || visited.has(url)) continue;

      try {
        if (!this.checkRateLimit(domain)) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        const response = await axios.get(url, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; FrontDeskAgents/1.0)',
          },
        });

        const $ = cheerio.load(response.data);

        // Extract page data
        results.push({
          url,
          title: $('title').text(),
          content: $('body').text().trim().substring(0, 2000),
        });

        visited.add(url);

        // Find more links on the same domain
        $('a[href]').each((_, elem) => {
          const href = $(elem).attr('href');
          if (href) {
            try {
              const linkUrl = new URL(href, url);
              if (linkUrl.hostname === new URL(url).hostname && !visited.has(linkUrl.href)) {
                toVisit.push(linkUrl.href);
              }
            } catch (e) {
              // Invalid URL, skip
            }
          }
        });
      } catch (error) {
        console.error(`Failed to crawl ${url}:`, error);
      }
    }

    return results;
  }

  /**
   * Extract contact information from website
   */
  async extractContactInfo(domain: string): Promise<{
    emails: string[];
    phones: string[];
    addresses: string[];
  }> {
    try {
      const url = `https://${domain}`;
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FrontDeskAgents/1.0)',
        },
      });

      const text = response.data;

      // Extract emails
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = [...new Set(text.match(emailRegex) || [])];

      // Extract phone numbers
      const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
      const phones = [...new Set(text.match(phoneRegex) || [])];

      // Extract addresses (basic pattern)
      const addressRegex = /\d+\s+[\w\s]+,\s*[\w\s]+,\s*[A-Z]{2}\s+\d{5}/g;
      const addresses = [...new Set(text.match(addressRegex) || [])];

      return { emails, phones, addresses };
    } catch (error) {
      console.error('Contact extraction error:', error);
      return { emails: [], phones: [], addresses: [] };
    }
  }

  /**
   * Get enrichment statistics
   */
  getStatistics(): {
    totalEnriched: number;
    averageScore: number;
    cacheSize: number;
  } {
    const entries = Array.from(this.cache.values());

    return {
      totalEnriched: entries.length,
      averageScore: entries.length > 0
        ? entries.reduce((sum, e) => sum + e.enrichmentScore, 0) / entries.length
        : 0,
      cacheSize: this.cache.size,
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Singleton instance
export const scrapingEnrichmentAgent = new ScrapingEnrichmentAgent();
