import { error, json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../../utils/auth.server';
import { doRecipe, getRecipe } from '$lib/repository.server';

export const GET = (async (event) => {
	const user = await auth(event);
	const recipe = await getRecipe(user, parseInt(event.params.id as string));
	if (!recipe) {
		throw error(404, 'not found');
	}

	return json(recipe);
}) satisfies RequestHandler;

export const POST = (async (event) => {
	const user = await auth(event);
	await doRecipe(user, parseInt(event.params.id as string));

	return json({});
}) satisfies RequestHandler;
