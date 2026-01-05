import axios from 'axios';
import { handleBatchLeads } from '../../lib/core/lead-handler';

/** * UNIVERSAL INDUSTRY MATRIX
 */
const industryMatrix = {
  'home-services': ['plumbing', 'hvac', 'roofing', 'electrical', 'landscaping'],
  'medical': ['dentist', 'orthodontist', 'urgent care', 'chiropractor'],
  'legal': ['personal injury lawyer', 'family law', 'estate planning'],
  'automotive': ['auto repair', 'collision center', 'transmission shop']
};

/**
 * PHASE II: REGIONAL CLUSTERS
 * We now group cities into "High-Density Corridors" for strategic dominance.
 */
const usClusters = {
  'TEXAS_TRIANGLE': {
    state: 'TX',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'Waco']
  },
  'FL_CORRIDOR': {
    state: 'FL',
    cities: ['Miami', 'Orlando', 'Tampa', 'Fort Lauderdale', 'West Palm Beach']
  },
  'NE_MEGALOPOLIS': {
    state: 'NY/PA/MA',
    cities: ['New York City', 'Philadelphia', 'Boston', 'Washington DC', 'Baltimore', 'Newark']
  },
  'CALI_COAST': {
    state: 'CA',
    cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento']
  },
  'MIDWEST_HUB': {
    state: 'IL/MI/OH',
    cities: ['Chicago', 'Detroit', 'Indianapolis', 'Columbus', 'Milwaukee']
  }
};

async function runUniversalNationwideScrape() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("CRITICAL: SERPAPI_KEY missing.");

  // 1. Iterate through regional clusters
  for (const [clusterName, region] of Object.entries(usClusters)) {
    console.log(`📡 CLUSTER ACTIVATED: ${clusterName}`);

    for (const city of region.cities) {
      // 2. Loop through every Industry Sector
      for (const [vertical, niches] of Object.entries(industryMatrix)) {
        for (const niche of niches) {
          console.log(`🌍 UNIVERSAL DEPLOYMENT: ${niche} | ${city}, ${region.state}`);

          try {
            const response = await axios.get(`https://serpapi.com/search`, {
              params: {
                q: `${niche} in ${city}`,
                engine: 'google_maps',
                type: 'search',
                api_key: apiKey
              }
            });

            if (!response.data.local_results) continue;

            const prospects = response.data.local_results.map((biz: any) => ({
              full_name: biz.title,
              phone_number: biz.phone,
              address: biz.address, 
              place_id: biz.place_id,
              source: `cluster-${clusterName.toLowerCase()}`,
              vertical: vertical,
              notes: `Cluster: ${clusterName} | Industry: ${niche}`,
              metadata: {
                city,
                state: region.state,
                cluster: clusterName,
                niche,
                rating: biz.rating,
                street_address: biz.address ? biz.address.split(',')[0] : 'Unknown'
              }
            }));

            const result = await handleBatchLeads(prospects, process.env.SYSTEM_BOT_ID);
            console.log(`✅ ${city} [${niche}]: ${result.success} Ingested via ${clusterName}.`);

            // Rate limit protection
            await new Promise(r => setTimeout(r, 1500));

          } catch (error: any) {
            console.error(`❌ Fail in ${city} for ${niche}:`, error.message);
          }
        }
      }
    }
  }
}

runUniversalNationwideScrape();
