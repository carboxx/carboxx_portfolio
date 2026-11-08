import { NextRequest, NextResponse } from 'next/server';
import { isIndexableHost } from '@/lib/site-url';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Explicit language URLs stay stable for visitors, shared links and crawlers.
  const publicHost = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
  const hostname = publicHost.split(',')[0].trim().split(':')[0].toLowerCase();
  const indexable = isIndexableHost(hostname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-portfolio-locale', pathname === '/en' ? 'en' : 'it');
  requestHeaders.set('x-portfolio-indexable', String(indexable));
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!indexable) response.headers.set('X-Robots-Tag', 'noindex, follow');
  return response;
}

export const config = { matcher: ['/', '/en'] };
