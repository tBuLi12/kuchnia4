import {
	getUserRecipes,
	getUserRecipesWithName,
	getUserRecipesWithNameAndTags,
	getUserRecipesWithTags
} from '$lib/repository.server';
import { json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../utils/auth.server';

export const GET = (async ({ cookies, url }) => {
	const search = url.searchParams.get('q');
	const tags = url.searchParams.get('tags')?.split(',') ?? null;

	const user = await auth(cookies);

	if (search) {
		if (tags) {
			return json(await getUserRecipesWithNameAndTags(user, search, tags));
		}
		return json(await getUserRecipesWithName(user, search));
	}
	if (tags) {
		return json(await getUserRecipesWithTags(user, tags));
	}
	return json(await getUserRecipes(user));
}) satisfies RequestHandler;
