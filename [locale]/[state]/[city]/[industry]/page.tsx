import { languages } from '@/config/languages';
import { industryMatrix, usGrid } from '@/config/industries';

export async function generateStaticParams() {
  const paths = [];

  // Iterate through all supported languages (EN, AR, etc.)
  for (const lang of languages) {
    const locale = lang.code;

    // Iterate through Industries (Legal, Medical, etc.)
    for (const [vertical] of Object.entries(industryMatrix)) {
      
      // Iterate through Geographic Grid
      for (const region of usGrid) {
        const state = region.state.toLowerCase();

        for (const city of region.cities) {
          paths.push({ 
            locale: locale, // The missing link in your previous build
            state: state, 
            city: city.toLowerCase().replace(/\s+/g, '-'), 
            industry: vertical 
          });
        }
      }
    }
  }
  return paths;
}
