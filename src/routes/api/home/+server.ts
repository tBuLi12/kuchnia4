import {
	getUserRecipes,
	getUserRecipesWithName,
	getUserRecipesWithNameAndTags,
	getUserRecipesWithTags
} from '$lib/repository.server';
import { json, type RequestHandler } from '@sveltejs/kit';
import { auth } from '../../../utils/auth.server';

export const GET = (async (event) => {
	const search = event.url.searchParams.get('q');
	const tags = event.url.searchParams.get('tags')?.split(',') ?? null;

	const user = await auth(event);

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
