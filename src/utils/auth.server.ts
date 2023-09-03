import { type Cookies, redirect, error, type RequestEvent } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import { SignJWT, jwtVerify } from 'jose';

export async function auth({ cookies, request, url }: RequestEvent): Promise<number> {
	const token = cookies.get('token');
	if (!token) {
		throw error(401, { message: 'not logged in' });
	}
	const secret = new TextEncoder().encode(JWT_SECRET);
	try {
		const { payload } = await jwtVerify(token, secret);
		const forbidden =
			payload.client !== 'mobile' &&
			request.method !== 'GET' &&
			request.method !== 'HEAD' &&
			request.headers.get('origin') !== url.origin;

		if (forbidden) {
			throw error(403, {
				message: 'cross site form submissions are forbidden'
			});
		}

		const userId = parseInt(payload.sub!);

		if (payload.exp! < Date.now() + 3 * 24 * 60 * 60 * 1000) {
			await setToken(cookies, payload.client as string, userId);
		}

		return userId;
	} catch (e) {
		throw error(401, { message: 'not logged in' });
	}
}

export async function setToken(cookies: Cookies, client: string, userId: number) {
	const secret = new TextEncoder().encode(JWT_SECRET);

	const jwt = await new SignJWT({ client })
		.setSubject(userId.toString())
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('4d')
		.sign(secret);

	cookies.set('token', jwt, {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
		path: '/'
	});
}
