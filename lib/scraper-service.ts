/**
 * Scraper Service - Fetches clean text from a URL
 */

async function fetchCleanText(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch site content");
    const html = await response.text();
    
    // Simple regex to strip HTML tags and return clean text
    return html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error("Scraping error:", error);
    return "";
  }
}

export async function scrapeWebsite(url: string) {
  // Logic to navigate and extract plain text from tags
  // <nav>, <article>, <footer> and <section>
  const rawData = await fetchCleanText(url);
  return rawData; // Raw text from the site
}
