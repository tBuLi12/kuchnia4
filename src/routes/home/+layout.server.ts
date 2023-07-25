import { getUserRecipes } from '../../lib/repository';
import { auth } from '../../utils/auth';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const user = await auth(cookies);
	return { recipes: await getUserRecipes(user) };
}) satisfies LayoutServerLoad;
