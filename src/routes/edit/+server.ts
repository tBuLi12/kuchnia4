import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { db } from '$lib/drizzle';
import { and, eq } from 'drizzle-orm';
import { auth } from '../../utils/auth';
import { recipes, users } from '$lib/schema';

const postRecipe = z.strictObject({
	name: z.string(),
	description: z.string(),
	id: z.number().optional(),
	body: z.array(
		z.strictObject({
			name: z.string(),
			body: z.string()
		})
	),
	tags: z.array(z.string()),
	image: z.string().nullable()
});

export const POST = (async ({ request, cookies }) => {
	const result = postRecipe.safeParse(await request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const recipe = result.data;

	const user = await auth(cookies);
	const userID = db.select().from(users).where(eq(users.email, user));

	if (recipe.id) {
		db.update(recipes)
			.set(recipe)
			.where(and(eq(recipes.id, recipe.id), eq(users.id, userID)));
	} else {
		delete recipe.id;
		await db.insert(recipes).values(recipe);
	}

	return json({});
}) satisfies RequestHandler;
