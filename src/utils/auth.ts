import { error, type Cookies, redirect } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';

export async function auth(cookies: Cookies): Promise<string> {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(307, '/login');
	}
	const secret = new TextEncoder().encode(JWT_SECRET);
	try {
		const { payload } = await jwtVerify(token, secret);
		return payload.email as string;
	} catch (e) {
		throw redirect(307, '/login');
	}
}
