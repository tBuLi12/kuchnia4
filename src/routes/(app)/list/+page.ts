import type { Ingredient } from '../../../lib/repository.server';
import { use } from '../../../utils/post';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return { list: await use<Ingredient[]>(fetch, '/list') };
}) satisfies PageLoad;
