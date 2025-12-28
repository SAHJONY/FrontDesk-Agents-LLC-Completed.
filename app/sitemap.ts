import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es', 'fr', 'ar', 'he', 'zh', 'de'];
  const baseUrl = 'https://www.frontdeskagents.com';

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  }));
}
