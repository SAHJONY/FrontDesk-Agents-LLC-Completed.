import axios from 'axios';
import { handleBatchLeads } from '../../lib/core/lead-handler';

/** * NATIONWIDE DYNAMIC GRID 
 * We iterate through every major US market to ensure total coverage.
 */
const usGrid = [
  { state: 'TX', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
  { state: 'IL', cities: ['Chicago', 'Aurora', 'Naperville'] },
  { state: 'NY', cities: ['New York City', 'Buffalo', 'Rochester'] },
  { state: 'FL', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] },
  { state: 'GA', cities: ['Atlanta', 'Savannah'] },
  { state: 'WA', cities: ['Seattle', 'Spokane'] },
  { state: 'CO', cities: ['Denver', 'Colorado Springs'] },
  { state: 'PA', cities: ['Philadelphia', 'Pittsburgh'] },
  { state: 'OH', cities: ['Columbus', 'Cleveland', 'Cincinnati'] },
  { state: 'CA', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] }
  // You can continue adding all 50 states here
];

const winterVerticals = ['plumbing', 'hvac', 'heating-repair'];

async function runFullNationwideScrape() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("CRITICAL: SERPAPI_KEY missing from Sovereign Vault.");

  for (const region of usGrid) {
    for (const city of region.cities) {
      for (const industry of winterVerticals) {
        console.log(`🇺🇸 NATIONWIDE SCRAPE: ${industry} in ${city}, ${region.state}`);

        try {
          const query = `${industry} in ${city}, ${region.state}`;
          const response = await axios.get(`https://serpapi.com/search`, {
            params: {
              q: query,
              engine: 'google_maps',
              api_key: apiKey
            }
          });

          if (!response.data.local_results) continue;

          const prospects = response.data.local_results.map(biz => ({
            full_name: biz.title,
            phone_number: biz.phone,
            source: 'nationwide-automated-v1',
            vertical: 'home-services', // Prioritizing winter emergency services
            notes: `State: ${region.state} | City: ${city} | Dec 2025 Winter Push`,
            metadata: {
              city: city,
              state: region.state,
              rating: biz.rating,
              reviews: biz.reviews
            }
          }));

          // PUSH TO SOVEREIGN LEAD HANDLER
          const result = await handleBatchLeads(prospects, process.env.SYSTEM_BOT_ID);
          console.log(`✅ Success for ${city}: ${result.success} leads processed.`);

          // PREVENT API THROTTLING (Rate Limit Protection)
          await new Promise(r => setTimeout(r, 2000));

        } catch (error) {
          console.error(`❌ Fail in ${city}, ${region.state}:`, error.message);
        }
      }
    }
  }
}

runFullNationwideScrape();
