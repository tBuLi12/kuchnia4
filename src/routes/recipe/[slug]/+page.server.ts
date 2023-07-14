import type { PageServerLoad } from './$types';

export const load = (({ params }) => ({
	id: params.slug,
	name: 'Le Chicken',
	description: 'smokey chicken'
})) satisfies PageServerLoad;
