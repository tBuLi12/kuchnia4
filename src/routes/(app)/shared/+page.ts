import type { Share } from '$lib/repository.server';
import { use } from '../../../utils/post';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return { shares: await use<Share[]>(fetch, '/shared') };
}) satisfies PageLoad;
