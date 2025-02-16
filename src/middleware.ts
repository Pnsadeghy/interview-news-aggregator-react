import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_COOKIE_KEY } from '@/shared/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/panel') && !authTokenIsValid(request)) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (pathname === '/') {
    const redirectTo = authTokenIsValid(request) ? '/panel' : '/auth/login';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};

const authTokenIsValid = (req: NextRequest) => !!req.cookies.get(AUTH_TOKEN_COOKIE_KEY)
