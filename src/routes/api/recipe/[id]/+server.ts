import { error, json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../../utils/auth.server';
import { doRecipe, getRecipe } from '$lib/repository.server';
import { z } from 'zod';

export const GET = (async (event) => {
	const user = await auth(event);
	const recipe = await getRecipe(user, parseInt(event.params.id as string));
	if (!recipe) {
		throw error(404, 'not found');
	}

	return json(recipe);
}) satisfies RequestHandler;

const postRecipeDone = z.strictObject({ recipeId: z.number() });

export const POST = (async (event) => {
	const result = postRecipeDone.safeParse(await event.request.json());
	if (!result.success) {
		console.log('invalid shape', result.error);
		throw error(400, 'invalid shape');
	}
	const recipe = result.data;

	const user = await auth(event);
	await doRecipe(user, recipe.recipeId);

	return json({});
}) satisfies RequestHandler;
