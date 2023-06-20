import { type NextRequest, NextResponse } from 'next/server';
const { verifyAuth } = require('lib/auth');
const { jsonResponse } = require('lib/utils');
const { USER_TOKEN } = require('lib/constants');
const { sanityClient } = require('lib/sanity');

export const config = {
  matcher: ['/api/listings/:path*', '/api/expire', '/', '/dashboard/:path*', '/login'],
};

/**
 * Validate token and get latest user variables to pass along to the next middleware.
 *
 * @param request
 * @returns
 */
const validateUserWithTokenMiddleware = async (request: NextRequest) => {
  // 1. Fetch user token.
  const userToken = request.cookies.get(USER_TOKEN)?.value;
  if (!!userToken === false) {
    return jsonResponse(200, {
      pass: false,
      data: 'User is not logged in',
    });
  }

  // 2. Fetch user by token to grab their basic info.
  const sanityResponse = await sanityClient.fetch(`*[_type == 'user' && jwtToken == '${userToken}']`);
  if (!!sanityResponse === false || sanityResponse.length === 0) {
    return jsonResponse(200, { pass: false, data: 'user token not valid.' });
  }

  // 3. Pass basic user info to the next middleware via header.
  const user = sanityResponse[0];
  delete user.password;
  delete user.jwtToken;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-data', JSON.stringify(user));
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  return response;
};

/**
 * Middleware to run before all front-end and API related requests.
 * @param request
 * @returns
 */
export async function middleware(request: NextRequest) {
  // Validate token and the user is authenticated
  const validToken = await verifyAuth(request);

  // console.log('path', request.nextUrl.pathname);

  // Not logged in and not going to login page.
  if (!validToken && request.nextUrl.pathname !== '/login') {
    // if this an API request, respond with JSON.
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return jsonResponse(401, { pass: false, data: 'Authentication required' });
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (validToken && !request.nextUrl.pathname.startsWith('/dashboard')) {
    // If we're logged in, and requesting an API endpoint.
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return await validateUserWithTokenMiddleware(request);
    } else {
      // If we're logged in and not on the dashboard, redirect.
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
}
