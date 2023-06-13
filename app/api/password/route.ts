import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
export const runtime = 'edge';

/**
 * Endpoint to hash password.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  const password = bcrypt.hashSync(body.password, salt);
  return NextResponse.json({ pass: true, data: password });
}
