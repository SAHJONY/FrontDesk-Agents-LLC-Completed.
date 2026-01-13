export const getClusterContext = (clusterName: string) => {
  const clusters: Record<string, any> = {
    'TEXAS_TRIANGLE': {
      landmarks: ['I-10 corridor', 'the Beltway', 'DNT'],
      vibe: 'fast-paced, high-growth, weather-resilient',
      local_slang: 'the loop',
      neighbors: 'Houston, Dallas, and Austin'
    },
    'NE_MEGALOPOLIS': {
      landmarks: ['I-95', 'the Tri-state area', 'Penn Station'],
      vibe: 'direct, efficient, high-density',
      local_slang: 'the city',
      neighbors: 'Philly, NYC, and Boston'
    },
    'FL_CORRIDOR': {
      landmarks: ['A1A', 'I-4', 'the Turnpike'],
      vibe: 'energetic, seasonal, service-heavy',
      local_slang: 'the coast',
      neighbors: 'Miami, Orlando, and Tampa'
    }
  };

  return clusters[clusterName] || { landmarks: [], vibe: 'professional', neighbors: 'nearby cities' };
};
