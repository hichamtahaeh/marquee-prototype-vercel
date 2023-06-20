import { NextRequest } from 'next/server';
const { sanityClient } = require('lib/sanity');
const { jsonResponse } = require('lib/utils');
const { USER_TOKEN, USER_DATA } = require('lib/constants');

export const runtime = 'edge';

/**
 * Endpoint to fetch all listings for a logged in user.
 */
export async function GET(request: NextRequest) {
  const user = JSON.parse(request.headers.get('x-user-data'));

  // Query listing for this user's organization.
  const listings = await sanityClient.fetch(`*[_type == "listing" && organization._ref == "${user.organization._ref}"]`);
  return jsonResponse(200, { pass: true, data: listings });
}

/**
 * Endpoint to create a new listing document in the sanity cms.
 */
export async function POST(request: NextRequest) {
  const user = JSON.parse(request.headers.get('x-user-data'));
  const body = await request.json();

  // Ensure these values.
  delete body._id;
  body._organization = user.organization;
  body._type = 'listing';

  // Create listing.
  try {
    const sanityResponse = sanityClient.create(body);
    if (!!sanityResponse === false) {
      return jsonResponse(200, { pass: false, data: 'failed to create listing.' });
    }
  } catch (err) {
    return jsonResponse(200, { pass: false, data: err.message });
  }
  return jsonResponse(200, { pass: true, data: 'Successfully created listing' });
}
