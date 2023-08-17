import { JWT_SECRET } from '$env/static/private';
import { getPasswordHashAndId } from '$lib/repository.server';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { enc, PBKDF2 } from 'crypto-js';
import { SignJWT } from 'jose';
import { z } from 'zod';

const postLogin = z.strictObject({
	email: z.string(),
	password: z.string()
});

export const POST = (async ({ request, cookies }) => {
	const result = postLogin.safeParse(await request.json());
	if (!result.success) {
		console.log('invalid shape', result.error);
		throw error(400, 'invalid shape');
	}

	const credentials = result.data;

	const userData = await getPasswordHashAndId(credentials.email);
	if (!userData) {
		throw error(401, 'invalid credentials');
	}

	const { hash, userId } = userData;

	const checkedHash = PBKDF2(credentials.password, enc.Hex.parse(hash.slice(0, 64)), {
		keySize: 8
	});
	if (checkedHash.toString() !== hash.slice(64, 128)) {
		throw error(401, 'invalid credentials');
	}

	const secret = new TextEncoder().encode(JWT_SECRET);

	const jwt = await new SignJWT({})
		.setSubject(userId.toString())
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(secret);
	cookies.set('token', jwt, { httpOnly: true, secure: true });
	return json({});
}) satisfies RequestHandler;
