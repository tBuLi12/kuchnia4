import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { lib as crypto, enc, PBKDF2 } from 'crypto-js';
import { db } from '../../lib/db';

export const load = (async () => {
	const salt = crypto.WordArray.random(32);
	const key = PBKDF2('', salt, { keySize: 8 });
	const keyString = key.toString();
	const saltString = salt.toString();
	if (keyString.length != 64 || saltString.length != 64) {
		throw error(500, `length is wrong ${keyString.length}, ${saltString.length}`);
	}

	await db.sql`DELETE FROM users`;
	await db.sql`INSERT INTO users(email, passhash) VALUES ('tbuli1112@gmail.com', ${
		salt + keyString
	})`;

	// await db.delete(users);
}) satisfies PageServerLoad;
