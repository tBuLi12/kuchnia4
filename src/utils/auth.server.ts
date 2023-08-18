import { type Cookies, redirect, error, type RequestEvent } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import { jwtVerify } from 'jose';

export async function auth({ cookies, request, url }: RequestEvent): Promise<number> {
	const token = cookies.get('token');
	if (!token) {
		throw error(400, { message: 'not logged in' });
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
				message: `cross site form submissions are forbidden ${payload.client} ${
					request.method !== 'GET'
				} ${request.method !== 'HEAD'} ${request.headers.get('origin') !== url.origin}`
			});
		}

		return parseInt(payload.sub!);
	} catch (e) {
		console.error(e);
		throw error(401, { message: 'not logged in' });
	}
}
