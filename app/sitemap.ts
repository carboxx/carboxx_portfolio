import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const italianUrl = new URL('/', siteUrl).toString();
  const englishUrl = new URL('/en', siteUrl).toString();
  const languages = { 'it-IT': italianUrl, en: englishUrl };

  return [
    {
      url: italianUrl,
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: englishUrl,
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
