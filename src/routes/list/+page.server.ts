import { getUsersListItems } from '../../lib/repository';
import { auth } from '../../utils/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const user = await auth(cookies);
	return { list: await getUsersListItems(user) };
}) satisfies PageServerLoad;
