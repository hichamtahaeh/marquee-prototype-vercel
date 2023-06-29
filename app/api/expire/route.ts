import { type NextRequest } from 'next/server';
import { expireUserCookie } from 'lib/auth';
import { jsonResponse } from 'lib/utils';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    return expireUserCookie(jsonResponse(200, { success: true }));
}
