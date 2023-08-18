import { type Cookies, redirect, error } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';

export async function auth(cookies: Cookies): Promise<number> {
	const token = cookies.get('token');
	if (!token) {
		throw error(401, { message: 'not logged in' });
	}
	const secret = new TextEncoder().encode(JWT_SECRET);
	try {
		const { payload } = await jwtVerify(token, secret);
		return parseInt(payload.sub!);
	} catch (e) {
		throw error(401, { message: 'not logged in' });
	}
}
