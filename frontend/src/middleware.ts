import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  
  // If trying to access auth pages (login/register) while logged in, redirect to cuisines
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/recipes', request.url));
  }

  // If trying to access protected pages without token, redirect to login
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Add your protected routes here
export const config = {
  matcher: [
    '/auth/:path*',
    '/recipes/:path*',
    '/chef/:path*'
  ]
} 