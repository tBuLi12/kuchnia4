import { getRecipe, type Ingredients, type Recipe } from '$lib/repository.server';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../../utils/auth.server';

export const GET = (async ({ params, cookies }) => {
	const user = await auth(cookies);

	const recipe: (Recipe & Ingredients & { isOwned?: boolean }) | null = await getRecipe(
		user,
		parseInt(params.id as string)
	);
	if (!recipe) {
		throw error(404, 'no such recipe');
	}
	delete recipe.isOwned;

	return json(recipe);
}) satisfies RequestHandler;
