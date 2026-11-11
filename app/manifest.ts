import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Antonio Carbone — Ingegnere informatico e AI Engineer',
    short_name: 'Antonio Carbone',
    description: 'Portfolio di Antonio Carbone, ingegnere informatico e AI Engineer.',
    start_url: '/',
    display: 'browser',
    background_color: '#f2efe7',
    theme_color: '#11110f',
    icons: [
      { src: '/brand/carboxx-c-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
