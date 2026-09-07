import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.antoniocarbone.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          it: 'https://www.antoniocarbone.com',
          en: 'https://www.antoniocarbone.com/en',
        },
      },
    },
    {
      url: 'https://www.antoniocarbone.com/en',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          it: 'https://www.antoniocarbone.com',
          en: 'https://www.antoniocarbone.com/en',
        },
      },
    },
  ];
}
