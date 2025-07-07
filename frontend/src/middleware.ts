import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FRONTEND_DOMAIN, getDomainUrl, PROTOCOL } from './env';

export default async function mainMiddleware(request: NextRequest) {
  const url = request.nextUrl;

  if (
    PROTOCOL === 'http' &&
    (url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
    request.headers.get('host') !== FRONTEND_DOMAIN
  ) {
    const redirectUrl = new URL(url.pathname + url.search, getDomainUrl(FRONTEND_DOMAIN));
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
