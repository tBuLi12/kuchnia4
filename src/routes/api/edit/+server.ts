import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { auth } from '../../../utils/auth.server';
import { updateRecipe, type Ingredients, type Recipe, addRecipe } from '$lib/repository.server';

const postRecipe = z.strictObject({
	name: z.string(),
	description: z.string(),
	id: z.number().optional(),
	body: z.array(
		z.strictObject({
			name: z.string(),
			body: z.string()
		})
	),
	tags: z.array(z.string()),
	image: z.string().nullable(),
	ingredients: z.array(
		z.strictObject({
			name: z.string(),
			unit: z.string().nullable(),
			quantity: z.number()
		})
	)
});

export const POST = (async ({ request, cookies }) => {
	const result = postRecipe.safeParse(await request.json());
	if (!result.success) {
		console.log('invalid shape', result.error);
		throw error(400, 'invalid shape');
	}
	const recipe = result.data;

	const user = await auth(cookies);

	if (recipe.id !== undefined) {
		await updateRecipe(user, recipe as Recipe & Ingredients);
	} else {
		delete recipe.id;
		await addRecipe(user, recipe);
	}

	return json({});
}) satisfies RequestHandler;
