import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ha az admin oldalra akar menni
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Megnézzük, van-e "admin_token" nevű sütije
    const token = request.cookies.get('admin_token');

    // Ha nincs sütije, átirányítjuk a /login oldalra
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

// Csak az admin útvonalakon fusson le
export const config = {
  matcher: '/admin/:path*',
};
