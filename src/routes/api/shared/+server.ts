import { error, json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../utils/auth.server';
import { z } from 'zod';
import { acceptShare, getSharedRecipes, rejectShare } from '$lib/repository.server';

const postShareAction = z.strictObject({
	wasAccepted: z.boolean(),
	recipe: z.number()
});

export const POST = (async (event) => {
	const { request, cookies } = event;
	const result = postShareAction.safeParse(await request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const shareAction = result.data;

	const user = await auth(event);

	if (shareAction.wasAccepted) {
		await acceptShare(user, shareAction.recipe);
	} else {
		await rejectShare(user, shareAction.recipe);
	}

	return json({});
}) satisfies RequestHandler;

export const GET = (async (event) => {
	const user = await auth(event);
	return json(await getSharedRecipes(user));
}) satisfies RequestHandler;
