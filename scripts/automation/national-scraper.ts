import axios from 'axios';
import { handleBatchLeads } from '../../lib/core/lead-handler';

/** * NATIONWIDE DYNAMIC GRID - LOCATION INDIVIDUAL EDITION
 * Captures specific street addresses and unique identifiers for every business.
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
];

const winterVerticals = ['plumbing', 'hvac', 'heating-repair'];

async function runFullNationwideScrape() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) throw new Error("CRITICAL: SERPAPI_KEY missing from Sovereign Vault.");

  for (const region of usGrid) {
    for (const city of region.cities) {
      for (const industry of winterVerticals) {
        console.log(`🇺🇸 TARGETING INDIVIDUALS: ${industry} in ${city}, ${region.state}`);

        try {
          const response = await axios.get(`https://serpapi.com/search`, {
            params: {
              q: `${industry} in ${city}, ${region.state}`,
              engine: 'google_maps',
              type: 'search',
              api_key: apiKey
            }
          });

          if (!response.data.local_results) continue;

          const prospects = response.data.local_results.map(biz => ({
            full_name: biz.title,
            phone_number: biz.phone,
            // INDIVIDUAL DATA CAPTURE
            address: biz.address, 
            place_id: biz.place_id, // Unique Google ID for this specific location
            source: 'location-individual-targeting',
            vertical: 'home-services', 
            notes: `Individual Shop: ${biz.title} | Street: ${biz.address}`,
            metadata: {
              city: city,
              state: region.state,
              rating: biz.rating,
              reviews: biz.reviews,
              // Splitting address for hyper-local AI referencing
              street_address: biz.address ? biz.address.split(',')[0] : 'Unknown Street'
            }
          }));

          // PUSH TO SOVEREIGN LEAD HANDLER
          const result = await handleBatchLeads(prospects, process.env.SYSTEM_BOT_ID);
          console.log(`✅ ${city} Individuals: ${result.success} saved.`);

          // RATE LIMIT PROTECTION
          await new Promise(r => setTimeout(r, 2000));

        } catch (error) {
          console.error(`❌ Fail in ${city}:`, error.message);
        }
      }
    }
  }
}

runFullNationwideScrape();
