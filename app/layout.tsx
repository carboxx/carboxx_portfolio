import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { siteUrl } from '@/lib/site-url';
import './globals.css';

const sharedMetadata: Metadata = {
  metadataBase: siteUrl,
  title: 'Antonio Carbone | Computer Engineer and AI Engineer',
  description: 'Portfolio of Antonio Carbone, Computer Engineer and AI Engineer based in Salerno, Italy.',
  keywords: [
    'Antonio Carbone ingegnere',
    'Antonio Carbone ingegnere informatico',
    'Antonio Carbone AI Engineer',
    'AI Engineer',
    'Ingegnere informatico Salerno',
    'Intelligenza artificiale',
  ],
  authors: [{ name: 'Antonio Carbone' }],
  creator: 'Antonio Carbone',
  applicationName: 'Antonio Carbone',
  openGraph: { type: 'website', siteName: 'Antonio Carbone' },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonio Carbone | Ingegnere informatico e AI Engineer',
    description: 'Esperienza, formazione e prodotti digitali costruiti tra software e intelligenza artificiale.',
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export async function generateMetadata(): Promise<Metadata> {
  const indexable = (await headers()).get('x-portfolio-indexable') === 'true';
  return { ...sharedMetadata, robots: { index: indexable, follow: true } };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = (await headers()).get('x-portfolio-locale') === 'en' ? 'en' : 'it';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': new URL('/#antonio-carbone', siteUrl).toString(),
              name: 'Antonio Carbone',
              url: siteUrl.toString(),
              image: new URL('/antonio-photo.jpg', siteUrl).toString(),
              description: 'Ingegnere informatico e AI Engineer a Salerno, specializzato in intelligenza artificiale, sviluppo software e prodotti digitali.',
              jobTitle: ['Ingegnere informatico e AI Engineer', 'Computer Engineer and AI Engineer'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Salerno',
                addressCountry: 'IT',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Università degli Studi di Salerno',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'Affinity',
              },
              sameAs: [
                'https://github.com/carboxx',
                'https://www.linkedin.com/in/antoniocarbone97',
              ],
              knowsAbout: [
                'Intelligenza artificiale',
                'Artificial intelligence',
                'Machine learning',
                'Sviluppo software',
                'Prodotti digitali',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': new URL('/#website', siteUrl).toString(),
              name: 'Antonio Carbone',
              alternateName: 'Antonio Carbone — Ingegnere informatico e AI Engineer',
              url: siteUrl.toString(),
              publisher: { '@id': new URL('/#antonio-carbone', siteUrl).toString() },
              inLanguage: ['it-IT', 'en'],
            }),
          }}
        />
      </body>
    </html>
  );
}
