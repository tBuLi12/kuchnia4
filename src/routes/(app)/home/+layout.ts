import type {
	getUserRecipes,
	getUserRecipesWithName,
	getUserRecipesWithNameAndTags,
	getUserRecipesWithTags,
	Recipe,
	TimeTracked
} from '$lib/repository.server';
import { use } from '../../../utils/post';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	const apiUrl = new URL('/api/home');
	apiUrl.searchParams = url.searchParams;
	return { recipes: use<(Recipe & TimeTracked)[]>(fetch, apiUrl) };
}) satisfies LayoutLoad;
