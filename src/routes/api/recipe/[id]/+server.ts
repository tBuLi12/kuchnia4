import { error, json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../../utils/auth.server';
import { getRecipe } from '$lib/repository.server';

export const GET = (async ({ params, cookies }) => {
	const user = await auth(cookies);
	const recipe = await getRecipe(user, parseInt(params.id as string));
	if (!recipe) {
		throw error(404, 'not found');
	}

	return json(recipe);
}) satisfies RequestHandler;
