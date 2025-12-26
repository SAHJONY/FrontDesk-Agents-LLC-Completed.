// Define all known Right-to-Left (RTL) scripts for autonomous UI flipping
export const RTL_LANGS = ['ar', 'he', 'fa', 'ur', 'dv', 'ps', 'sd', 'yi'];

export interface GlobalConfig {
  code: string;     // e.g., 'fr', 'jp', 'he'
  name: string;     // e.g., 'French', 'Japanese'
  dir: 'ltr' | 'rtl';
  flag: string;
}

/**
 * Autonomously generates configuration for any language code provided by the Shadow Scraper.
 */
export const getAutonomousLanguageConfig = (code: string): GlobalConfig => {
  const cleanCode = code.toLowerCase().trim();
  
  // Use Intl API to get the native name of the language
  const languageNames = new Intl.DisplayNames(['en'], { type: 'language' });
  const name = languageNames.of(cleanCode) || 'International';

  // Determine direction autonomously
  const dir = RTL_LANGS.includes(cleanCode) ? 'rtl' : 'ltr';

  // Generate Flag Emoji from ISO Country Code (fallback logic)
  const flag = code.toUpperCase().replace(/./g, char => 
    String.fromCodePoint(char.charCodeAt(0) + 127397)
  );

  return { code: cleanCode, name, dir, flag };
};
