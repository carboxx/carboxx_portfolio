import type { Metadata } from 'next';
import PortfolioHome from '@/components/PortfolioHome';

export const metadata: Metadata = {
  title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
  description: 'Antonio Carbone è un ingegnere informatico e AI Engineer a Salerno. Esperienza in Affinity, progetti di intelligenza artificiale e percorso professionale.',
  alternates: { canonical: '/', languages: { 'it-IT': '/', en: '/en', 'x-default': '/' } },
  openGraph: {
    type: 'website',
    siteName: 'Antonio Carbone',
    url: '/',
    locale: 'it_IT',
    alternateLocale: ['en_US'],
    title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
    description: 'Esperienza, formazione e prodotti digitali costruiti tra software e intelligenza artificiale.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
    description: 'Ingegnere informatico e AI Engineer a Salerno. Esperienza, progetti e prodotti digitali.',
  },
};

export default function Home() {
  return <PortfolioHome locale="it" />;
}
