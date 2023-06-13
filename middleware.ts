import { type NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/auth';

export const config = {
  matcher: ['/api/protected', '/dashboard', '/'],
};

export async function middleware(req: NextRequest) {
  // validate the user is authenticated
  const verifiedToken = await verifyAuth(req).catch((err) => {
    console.error(err.message);
  });

  // console.log(req.nextUrl.pathname, req.url);

  // Not logged in and not going to login page.
  if (!verifiedToken && req.nextUrl.pathname !== '/') {
    // if this an API request, respond with JSON.
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return new NextResponse(JSON.stringify({ error: { message: 'authentication required' } }), { status: 401 });
    } else {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else if (verifiedToken && !req.nextUrl.pathname.startsWith('/dashboard')) {
    // If we're logged in and not on the dashboard, redirect.
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}
