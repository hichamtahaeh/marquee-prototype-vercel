import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const runtime = 'edge';

/**
 * Endpoint to test password.
 */
export async function POST(request: Request) {
  const { candidatePassword, hashedPassword } = await request.json();
  return NextResponse.json({
    pass: true,
    data: bcrypt.compareSync(candidatePassword, hashedPassword),
  });
}
