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

export const POST = (async (event) => {
	const result = postAddIngredients.safeParse(await event.request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const ingredients = result.data;

	const user = await auth(event);

	await addListItems(user, ingredients);

	return json({});
}) satisfies RequestHandler;

export const DELETE = (async (event) => {
	const result = postRemoveIngredients.safeParse(await event.request.json());
	if (!result.success) {
		throw error(400, 'invalid shape');
	}
	const ingredients = result.data;

	const user = await auth(event);

	await removeListItems(user, ingredients);

	return json({});
}) satisfies RequestHandler;

export const GET = (async (event) => {
	const user = await auth(event);
	return json(await getUsersListItems(user));
}) satisfies RequestHandler;
