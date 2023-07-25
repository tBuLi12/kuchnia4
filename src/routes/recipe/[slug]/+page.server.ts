import { auth } from '../../../utils/auth';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, cookies }) => {
	const user = await auth(cookies);
	const recipe = await db.query.recipes.findFirst({
		where: and(eq(recipes.id, parseInt(params.slug)), eq(users.email, user)),
		with: {
			recipeViews: {
				with: {
					user: {
						columns: {}
					}
				},
				columns: {}
			},
			ingredients: true
		}
	});
	if (!recipe) {
		throw error(404, 'not found');
	}

	return { recipe };
}) satisfies PageServerLoad;
