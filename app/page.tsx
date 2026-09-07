import type { Metadata } from 'next';
import PortfolioHome from '@/components/PortfolioHome';

export const metadata: Metadata = {
  title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
  description: 'Antonio Carbone è un ingegnere informatico e AI Engineer a Salerno. Esperienza in Affinity, progetti di intelligenza artificiale e percorso professionale.',
  alternates: { canonical: '/', languages: { 'it-IT': '/', en: '/en' } },
  openGraph: {
    locale: 'it_IT',
    alternateLocale: ['en_US'],
    title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
    description: 'Esperienza, formazione e prodotti digitali costruiti tra software e intelligenza artificiale.',
    url: '/',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Antonio Carbone, Ingegnere informatico e AI Engineer' }],
  },
};

export default function Home() {
  return <PortfolioHome locale="it" />;
}
