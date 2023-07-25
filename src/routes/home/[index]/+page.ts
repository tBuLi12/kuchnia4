import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		index: parseInt(params.index)
	};
}) satisfies PageLoad;
