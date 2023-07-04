import { NextRequest } from 'next/server';
const { jsonResponse } = require('lib/utils');

export const runtime = 'edge';

/**
 * Endpoint to fetch current user data, if logged in.
 */
export async function GET(request: NextRequest) {
    const user = JSON.parse(request.headers.get('x-user-data'));
    return jsonResponse(200, { pass: true, data: user });
}
