import { ImageResponse } from 'next/og';

export const alt = 'Antonio Carbone — Ingegnere informatico e AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '64px', background: '#1945d5', color: '#ffffff' }}>
      <div style={{ display: 'flex', fontSize: 30 }}>Antonio Carbone</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 88, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-4px' }}>
        <span>Computer Engineer.</span>
        <span style={{ color: '#e2f45c' }}>AI Engineer.</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.4)', paddingTop: '24px', fontSize: 24 }}>
        <span>Software · AI · Product</span><span>antoniocarbone.com</span>
      </div>
    </div>,
    size,
  );
}
