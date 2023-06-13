const bcrypt = require('bcryptjs');
const { jsonResponse } = require('lib/utils');
const { sanityClient } = require('lib/sanity');
const { getUserCookie } = require('lib/auth');
const { USER_TOKEN } = require('lib/constants');

export const runtime = 'edge';

/**
 * Endpoint to login a user from the sanity db.
 */
export async function POST(request: Request) {
  const { candidatePassword, email } = await request.json();

  // Fetch user from sanity db.
  const sanityResponse = await sanityClient.fetch(`*[_type == 'user' && email == '${email}']`);
  if (!!sanityResponse === false) {
    return jsonResponse(200, { pass: false, data: 'Please pass in a valid GROQ.' });
  }
  if (sanityResponse.length === 0) {
    return jsonResponse(200, { pass: false, data: 'user email not found.' });
  }
  const user = sanityResponse[0];

  // Test candidate password against stored one in db.
  if (!bcrypt.compareSync(candidatePassword, user.password)) {
    // Failed login response.
    return jsonResponse(200, {
      pass: false,
      data: 'username/password not valid.',
    });
  }

  // Generate and update token in cms.
  const token = await getUserCookie();
  const result = await sanityClient.patch(user._id).set({ jwtToken: token }).commit();
  if (!!result === false || result.jwtToken !== token) {
    return jsonResponse(200, {
      pass: false,
      data: 'failed to login.',
    });
  }

  // Successful login response, set user cookie.
  const response = jsonResponse(200, { pass: true, data: 'successfully logged in and set user token' });
  response.cookies.set(USER_TOKEN, token, {
    httpOnly: true,
    maxAge: 60 * 60 * 2, // 2 hours in seconds
  });
  return response;
}
