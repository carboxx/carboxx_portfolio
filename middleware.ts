import { NextRequest, NextResponse } from 'next/server';

const LANGUAGE_COOKIE = 'portfolio_language';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const savedLanguage = request.cookies.get(LANGUAGE_COOKIE)?.value;

  if (pathname === '/' && savedLanguage === 'en') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  if (pathname === '/en' && savedLanguage === 'it') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/' && !savedLanguage) {
    const preferredLanguage = request.headers.get('accept-language')?.split(',')[0].toLowerCase();
    if (preferredLanguage && !preferredLanguage.startsWith('it')) {
      const response = NextResponse.redirect(new URL('/en', request.url));
      response.cookies.set(LANGUAGE_COOKIE, 'en', { maxAge: 31536000, sameSite: 'lax', path: '/' });
      return response;
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-portfolio-locale', pathname === '/en' ? 'en' : 'it');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ['/', '/en'] };
