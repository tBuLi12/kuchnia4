import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { auth } from '../../../utils/auth.server';
import { addListItems, getUsersListItems, removeListItems } from '../../../lib/repository.server';

const postAddIngredients = z.array(
	z.strictObject({
		name: z.string(),
		unit: z.string().nullable(),
		quantity: z.number()
	})
);

const postRemoveIngredients = z.array(z.string());

export const POST = (async ({ request, cookies }) => {
	const result = postAddIngredients.safeParse(await request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const ingredients = result.data;

	const user = await auth(cookies);

	await addListItems(user, ingredients);

	return json({});
}) satisfies RequestHandler;

export const DELETE = (async ({ request, cookies }) => {
	const result = postRemoveIngredients.safeParse(await request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const ingredients = result.data;

	const user = await auth(cookies);

	await removeListItems(user, ingredients);

	return json({});
}) satisfies RequestHandler;

export const GET = (async ({ cookies }) => {
	const user = await auth(cookies);
	return json(await getUsersListItems(user));
}) satisfies RequestHandler;
