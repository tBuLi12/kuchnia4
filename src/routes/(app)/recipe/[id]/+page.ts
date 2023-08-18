import type { Ingredient, Owned, Recipe } from '$lib/repository.server';
import { use } from '../../../../utils/post';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	return { recipe: await use<Recipe & Ingredient & Owned>(fetch, `/recipe/${params.id}`) };
}) satisfies PageLoad;
