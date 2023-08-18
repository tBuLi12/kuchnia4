import { getPasswordHashAndId } from '$lib/repository.server';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto-js';
import { z } from 'zod';
import { Capacitor } from '@capacitor/core';

const postLogin = z.strictObject({
	email: z.string(),
	password: z.string()
});

export const POST = (async (event) => {
	const { request, cookies } = event;
	const text = await request.text();
	let data;
	try {
		data = JSON.parse(text);
	} catch (e) {
		throw `not json: ${text}`;
	}

	const result = postLogin.safeParse(data);
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

	const checkedHash = crypto.PBKDF2(credentials.password, crypto.enc.Hex.parse(hash.slice(0, 64)), {
		keySize: 8
	});
	if (checkedHash.toString() !== hash.slice(64, 128)) {
		throw error(401, 'invalid credentials');
	}

	const secret = new TextEncoder().encode(JWT_SECRET);

	const jwt = await new SignJWT({ client: Capacitor.isNativePlatform() ? 'mobile' : 'web' })
		.setSubject(userId.toString())
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(secret);
	cookies.set('token', jwt, { httpOnly: true, secure: true });
	return json({});
}) satisfies RequestHandler;
