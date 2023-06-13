import { type NextRequest, NextResponse } from 'next/server';
const { sanityClient } = require('lib/sanity');
const { jsonResponse } = require('lib/utils');
const { USER_TOKEN } = require('lib/constants');

export const runtime = 'edge';

/**
 * Endpoint to fetch all listings for a logged in user. TODO: Need to filter by user's organization.
 */
export async function GET(request: NextRequest) {
  // Fetch user token.
  const userToken = request.cookies.get(USER_TOKEN)?.value;
  if (!!userToken === false) {
    return jsonResponse(200, {
      pass: false,
      data: 'user is not logged in',
    });
  }
  console.log('userToken', userToken);

  // Fetch user to grab their organization _id.
  const sanityResponse = await sanityClient.fetch(`*[_type == 'user' && jwtToken == '${userToken}']`);
  if (!!sanityResponse === false || sanityResponse.length === 0) {
    return jsonResponse(200, { pass: false, data: 'user token not valid.' });
  }
  const user = sanityResponse[0];

  // Query listing for this user's organization.
  const listings = await sanityClient.fetch(`*[_type == "listing" && organization._ref == "${user.organization._ref}"]`);
  return jsonResponse(200, { pass: true, data: listings });
}
