import { JWT_SECRET } from '$env/static/private';
import { error, type Actions, type RequestHandler, redirect } from '@sveltejs/kit';
import { PBKDF2, lib as crypto, enc } from 'crypto-js';
import { SignJWT } from 'jose';
import type { PageServerLoad } from './$types';
import { db } from '../../lib/db';
import { getPasswordHash } from '../../lib/repository';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		if (email == null) {
			throw error(400, 'missing email');
		}
		if (password == null) {
			throw error(400, 'missing password');
		}

		const passhash = await getPasswordHash(email.toString());
		if (!passhash) {
			throw error(401, 'invalid credentials');
		}

		const hash = PBKDF2(password.toString(), enc.Hex.parse(passhash.slice(0, 64)), {
			keySize: 8
		});
		if (hash.toString() !== passhash.slice(64, 128)) {
			throw error(401, `invalid credentials2 \n ${hash.toString()}, ${passhash.slice(64, 128)}`);
		}
		const secret = new TextEncoder().encode(JWT_SECRET);

		const jwt = await new SignJWT({ email: email.toString() })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime('1h')
			.sign(secret);
		cookies.set('token', jwt);
		throw redirect(300, '/home');
	}
} satisfies Actions;

export const load = (async () => {
	const passhash = (await getPasswordHash('tbuli1112@gmail.com'))!;
	const hash = PBKDF2('', enc.Hex.parse(passhash.slice(0, 64)), { keySize: 8 });
	return {
		data: `${passhash.slice(0, 64)}, ${hash.toString()}, ${passhash.slice(64, 128)}`
	};
}) satisfies PageServerLoad;
