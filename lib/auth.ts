import type { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { SignJWT, jwtVerify } from 'jose';
import { USER_TOKEN, USER_DATA, getJwtSecretKey } from './constants';

interface UserJwtPayload {
    jti: string;
    iat: number;
}

export class AuthError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export async function verifyAuth(req: NextRequest) {
    const token = req.cookies.get(USER_TOKEN)?.value;

    if (!token) return false;

    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
        return verified.payload as UserJwtPayload;
    } catch (err) {
        throw new AuthError('Your token has expired.');
    }
}

/**
 * Adds the user token cookie to a response.
 */
export async function getUserCookie() {
    return new SignJWT({})
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(getJwtSecretKey()));
}

/**
 * Expires the user token and data cookies.
 */
export function expireUserCookie(res: NextResponse) {
    res.cookies.set(USER_TOKEN, '', { httpOnly: true, maxAge: 0 });
    res.cookies.set(USER_DATA, '', { httpOnly: true, maxAge: 0 });
    return res;
}
