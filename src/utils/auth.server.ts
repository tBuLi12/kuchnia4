import { type Cookies, redirect } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';

export async function auth(cookies: Cookies): Promise<number> {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(303, '/login');
	}
	const secret = new TextEncoder().encode(JWT_SECRET);
	try {
		const { payload } = await jwtVerify(token, secret);
		return parseInt(payload.sub!);
	} catch (e) {
		throw redirect(303, '/login');
	}
}
