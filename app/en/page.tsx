import type { Metadata } from 'next';
import PortfolioHome from '@/components/PortfolioHome';

export const metadata: Metadata = {
  title: 'Antonio Carbone | Computer Engineer and AI Engineer',
  description: 'Antonio Carbone is a Computer Engineer and AI Engineer based in Salerno, Italy. Explore his work at Affinity, AI projects and professional journey.',
  alternates: { canonical: '/en', languages: { 'it-IT': '/', en: '/en' } },
  openGraph: {
    locale: 'en_US',
    alternateLocale: ['it_IT'],
    title: 'Antonio Carbone | Computer Engineer and AI Engineer',
    description: 'Experience, education and digital products built at the intersection of software and artificial intelligence.',
    url: '/en',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Antonio Carbone, Computer Engineer and AI Engineer' }],
  },
};

export default function EnglishHome() {
  return <PortfolioHome locale="en" />;
}
