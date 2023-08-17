import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
	// url.searchParams.ge
	return {
		index: parseInt(params.index)
	};
}) satisfies PageLoad;
