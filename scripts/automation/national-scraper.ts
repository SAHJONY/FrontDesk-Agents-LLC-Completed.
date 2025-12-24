import axios from 'axios';
import { handleBatchLeads } from '../../lib/core/lead-handler';

/** * UNIVERSAL INDUSTRY MATRIX
 * We map every high-ticket niche to a core 'Vertical' in your system.
 */
const industryMatrix = {
  'home-services': ['plumbing', 'hvac', 'roofing', 'electrical', 'landscaping'],
  'medical': ['dentist', 'orthodontist', 'urgent care', 'chiropractor'],
  'legal': ['personal injury lawyer', 'family law', 'estate planning'],
  'automotive': ['auto repair', 'collision center', 'transmission shop']
};

const usGrid = [
  { state: 'TX', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
  { state: 'FL', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
  { state: 'CA', cities: ['Los Angeles', 'San Diego', 'San Francisco'] },
  // ... System iterates through all 50 states
];

async function runUniversalNationwideScrape() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("CRITICAL: SERPAPI_KEY missing.");

  for (const region of usGrid) {
    for (const city of region.cities) {
      // Loop through every Industry Sector
      for (const [vertical, niches] of Object.entries(industryMatrix)) {
        for (const niche of niches) {
          console.log(`🌍 UNIVERSAL DEPLOYMENT: ${niche} | ${city}, ${region.state}`);

          try {
            const response = await axios.get(`https://serpapi.com/search`, {
              params: {
                q: `${niche} in ${city}, ${region.state}`,
                engine: 'google_maps',
                type: 'search',
                api_key: apiKey
              }
            });

            if (!response.data.local_results) continue;

            const prospects = response.data.local_results.map(biz => ({
              full_name: biz.title,
              phone_number: biz.phone,
              address: biz.address, 
              place_id: biz.place_id,
              source: 'universal-omni-sniper',
              vertical: vertical, // Automatically assigned based on matrix
              notes: `Industry: ${niche} | Individual Target: ${biz.title}`,
              metadata: {
                city,
                state: region.state,
                niche,
                rating: biz.rating,
                street_address: biz.address ? biz.address.split(',')[0] : 'Unknown'
              }
            }));

            const result = await handleBatchLeads(prospects, process.env.SYSTEM_BOT_ID);
            console.log(`✅ ${city} [${niche}]: ${result.success} Ingested.`);

            // Protection against Google/SerpApi blocking
            await new Promise(r => setTimeout(r, 2000));

          } catch (error) {
            console.error(`❌ Fail in ${city} for ${niche}:`, error.message);
          }
        }
      }
    }
  }
}

runUniversalNationwideScrape();
