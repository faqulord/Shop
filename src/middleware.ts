import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ha az admin oldalra akar menni
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');

    // Ha nincs sütije, irány a login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  return NextResponse.next();
}

// JAVÍTOTT RÉSZ: Így biztosan minden admin oldalt elkap!
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
