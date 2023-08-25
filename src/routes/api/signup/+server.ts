import { registerUser } from '$lib/repository.server';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const postSignup = z.strictObject({
	email: z.string(),
	password: z.string()
});

export const POST = (async (event) => {
	const result = postSignup.safeParse(await event.request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}

	const credentials = result.data;

	await registerUser(credentials.email, credentials.password);
	return json({});
}) satisfies RequestHandler;
