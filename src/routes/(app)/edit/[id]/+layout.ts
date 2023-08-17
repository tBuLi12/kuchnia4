import type { LayoutLoad } from './$types';
import { use } from '../../../../utils/post';
import type { Ingredients, Recipe } from '$lib/repository.server';

export const load = (async ({ params, fetch }) => {
	if (params.id === 'new') {
		let recipe: Omit<Recipe, 'id'> & Ingredients & { id?: number } = {
			body: [],
			name: '',
			description: '',
			tags: [],
			image: null,
			ingredients: []
		};
		return { recipe };
	}

	// const recipe: (Recipe & Ingredients & { isOwned?: boolean }) | null = await getRecipe(
	// 	user,
	// 	parseInt(params.id)
	// );
	// if (!recipe) {
	// 	throw error(404, 'no such recipe');
	// }
	// delete recipe.isOwned;

	return { recipe: await use<Recipe & Ingredients & { id?: number }>(fetch, `/edit/${params.id}`) };
}) satisfies LayoutLoad;
