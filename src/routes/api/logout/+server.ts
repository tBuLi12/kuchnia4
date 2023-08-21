import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ cookies }) => {
	cookies.set('token', '');
	return json({});
}) satisfies RequestHandler;
