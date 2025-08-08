// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth'],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const userCookie = req.cookies.get('user')?.value;

  if (pathname === '/auth') {
    if (userCookie) {
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const protectedPaths = ['/', '/dashboard'];
  const isProtected = protectedPaths.some(p => pathname === p || pathname.startsWith(p + '/'));

  if (isProtected) {
    if (!userCookie) {
      url.pathname = '/auth';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
