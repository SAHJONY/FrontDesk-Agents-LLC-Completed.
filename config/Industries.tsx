/**
 * SOVEREIGN INDUSTRY MATRIX
 * Defines all verticals and their characteristics for programmatic landing pages
 */

export const industryMatrix: Record<string, any> = {
  'hvac': {
    name: 'HVAC',
    keywords: ['furnace repair', 'ac installation', 'heating emergency', 'cooling system'],
    avgCallValue: 450,
    seasonalPeak: 'summer',
    urgencyLevel: 'high'
  },
  'plumbing': {
    name: 'Plumbing',
    keywords: ['burst pipe', 'drain cleaning', 'water heater', 'emergency plumber'],
    avgCallValue: 380,
    seasonalPeak: 'winter',
    urgencyLevel: 'critical'
  },
  'roofing': {
    name: 'Roofing',
    keywords: ['roof repair', 'leak detection', 'storm damage', 'roof replacement'],
    avgCallValue: 1200,
    seasonalPeak: 'spring',
    urgencyLevel: 'high'
  },
  'auto-repair': {
    name: 'Auto Repair',
    keywords: ['car repair', 'brake service', 'oil change', 'transmission'],
    avgCallValue: 320,
    seasonalPeak: 'year-round',
    urgencyLevel: 'medium'
  },
  'legal': {
    name: 'Legal Services',
    keywords: ['personal injury', 'car accident', 'workers comp', 'legal consultation'],
    avgCallValue: 2500,
    seasonalPeak: 'year-round',
    urgencyLevel: 'medium'
  },
  'medical': {
    name: 'Medical Services',
    keywords: ['urgent care', 'family doctor', 'medical appointment', 'health screening'],
    avgCallValue: 450,
    seasonalPeak: 'winter',
    urgencyLevel: 'high'
  },
  'landscaping': {
    name: 'Landscaping',
    keywords: ['lawn care', 'tree service', 'landscaping design', 'yard maintenance'],
    avgCallValue: 280,
    seasonalPeak: 'spring',
    urgencyLevel: 'low'
  },
  'pest-control': {
    name: 'Pest Control',
    keywords: ['termite inspection', 'rodent removal', 'bed bugs', 'exterminator'],
    avgCallValue: 220,
    seasonalPeak: 'summer',
    urgencyLevel: 'medium'
  },
  'solar': {
    name: 'Solar Installation',
    keywords: ['solar panels', 'solar energy', 'solar installation', 'renewable energy'],
    avgCallValue: 3500,
    seasonalPeak: 'year-round',
    urgencyLevel: 'low'
  },
  'pool-service': {
    name: 'Pool Service',
    keywords: ['pool cleaning', 'pool repair', 'pool maintenance', 'pool installation'],
    avgCallValue: 350,
    seasonalPeak: 'summer',
    urgencyLevel: 'medium'
  }
};

/**
 * US GEOGRAPHIC GRID
 * Major metro areas for programmatic landing page generation
 */
export const usGrid = [
  {
    state: 'Texas',
    abbr: 'TX',
    cities: ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth', 'El Paso', 'Arlington', 'Plano']
  },
  {
    state: 'California',
    abbr: 'CA',
    cities: ['Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento', 'Long Beach', 'Oakland']
  },
  {
    state: 'Florida',
    abbr: 'FL',
    cities: ['Jacksonville', 'Miami', 'Tampa', 'Orlando', 'St Petersburg', 'Hialeah', 'Tallahassee', 'Fort Lauderdale']
  },
  {
    state: 'New York',
    abbr: 'NY',
    cities: ['New York', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon']
  },
  {
    state: 'Pennsylvania',
    abbr: 'PA',
    cities: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Scranton', 'Bethlehem', 'Lancaster']
  },
  {
    state: 'Illinois',
    abbr: 'IL',
    cities: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin']
  },
  {
    state: 'Ohio',
    abbr: 'OH',
    cities: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton']
  },
  {
    state: 'Georgia',
    abbr: 'GA',
    cities: ['Atlanta', 'Columbus', 'Augusta', 'Savannah', 'Athens', 'Sandy Springs', 'Roswell', 'Macon']
  },
  {
    state: 'North Carolina',
    abbr: 'NC',
    cities: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington']
  },
  {
    state: 'Michigan',
    abbr: 'MI',
    cities: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing', 'Flint', 'Dearborn']
  },
  {
    state: 'Arizona',
    abbr: 'AZ',
    cities: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe']
  },
  {
    state: 'Massachusetts',
    abbr: 'MA',
    cities: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'Quincy', 'Lynn']
  },
  {
    state: 'Tennessee',
    abbr: 'TN',
    cities: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson']
  },
  {
    state: 'Washington',
    abbr: 'WA',
    cities: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton']
  },
  {
    state: 'Colorado',
    abbr: 'CO',
    cities: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster']
  }
];

/**
 * HELPER: Get industry details
 */
export function getIndustryDetails(industrySlug: string) {
  return industryMatrix[industrySlug] || industryMatrix['hvac']; // Default fallback
}

/**
 * HELPER: Get all industry slugs
 */
export function getAllIndustries() {
  return Object.keys(industryMatrix);
}
