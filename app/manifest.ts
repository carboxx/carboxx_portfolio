import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Antonio Carbone | Portfolio',
    short_name: 'Antonio Carbone',
    description: 'Portfolio di Antonio Carbone, Ingegnere informatico e AI Engineer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3f0e8',
    theme_color: '#2148d8',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
