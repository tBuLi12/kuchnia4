import type { Ingredients, Owned, Recipe } from '$lib/repository.server';
import { use } from '../../../../utils/post';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	return { recipe: await use<Recipe & Ingredients & Owned>(fetch, `/recipe/${params.id}`) };
}) satisfies PageLoad;
