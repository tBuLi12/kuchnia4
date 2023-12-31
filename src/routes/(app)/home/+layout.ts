import type { Recipe, TimeTracked } from '$lib/repository.server';
import { use } from '../../../utils/post';
import type { LayoutLoad } from './$types';

export const load = (async ({ url, fetch }) => {
	return {
		recipes: use<(Recipe & TimeTracked)[]>(fetch, `/home?${url.searchParams.toString()}`)
	};
}) satisfies LayoutLoad;
