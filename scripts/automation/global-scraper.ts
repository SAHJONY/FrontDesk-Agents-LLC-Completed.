import axios from 'axios';
import { handleBatchLeads } from '../../lib/core/lead-handler';

// Nationwide Target List
const targetMarkets = [
  { city: 'Houston, TX', industry: 'hvac' },
  { city: 'Dallas, TX', industry: 'plumbing' },
  { city: 'Miami, FL', industry: 'medical' },
  { city: 'Phoenix, AZ', industry: 'dentist' },
  { city: 'Atlanta, GA', industry: 'law-firms' }
];

async function scrapeNationalProspects() {
  const apiKey = process.env.SERPAPI_KEY; // Pulled from your hidden .env
  
  for (const market of targetMarkets) {
    console.log(`🚀 Nationwide Push: Scaping ${market.industry} in ${market.city}...`);
    
    try {
      const query = `${market.industry} in ${market.city}`;
      const response = await axios.get(`https://serpapi.com/search`, {
        params: {
          q: query,
          engine: 'google_maps',
          api_key: apiKey
        }
      });

      const prospects = response.data.local_results.map((biz: any) => ({
        full_name: biz.title,
        phone_number: biz.phone,
        source: 'automated-scraper', 
        vertical: mapVertical(market.industry),
        notes: `US Market: ${market.city} | Rating: ${biz.rating}`,
        metadata: {
          city: market.city,
          rating: biz.rating,
          reviews: biz.reviews
        }
      }));

      // Push to your Sovereign Lead Handler
      const result = await handleBatchLeads(prospects, process.env.SYSTEM_BOT_ID);
      console.log(`✅ ${market.city} Results: ${result.success} Success | ${result.failed} Failed`);

    } catch (error: any) {
      console.error(`❌ Error scraping ${market.city}:`, error.message);
    }
  }
}

// Helper to ensure leads go to the right vertical funnel
function mapVertical(industry: string) {
  const map = {
    'hvac': 'home-services',
    'plumbing': 'home-services',
    'medical': 'medical',
    'dentist': 'dental',
    'law-firms': 'law'
  };
  return map[industry as keyof typeof map] || 'general';
}

scrapeNationalProspects();
