import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { auth } from '../../../utils/auth';
import { db, recipes, type Recipe, type Ingredient } from '$lib/drizzle';
import { eq } from 'drizzle-orm';

export const load = (async ({ params, cookies }) => {
	const user = await auth(cookies);

	if (params.id === 'new') {
		let recipe: Omit<Recipe, 'id'> & { ingredients: Ingredient[] } = {
			body: [],
			name: '',
			description: '',
			tags: [],
			image: null,
			ingredients: []
		};
		return recipe;
	}

	const recipe: (Recipe & { ingredients: Ingredient[] }) | undefined =
		await db.query.recipes.findFirst({
			where: eq(recipes.id, parseInt(params.id)),
			with: { ingredients: true }
		});

	if (!recipe) {
		throw error(404, 'no such recipe');
	}

	return recipe;
}) satisfies LayoutServerLoad;
