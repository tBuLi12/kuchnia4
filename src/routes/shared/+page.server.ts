import { auth } from '../../utils/auth';
import type { PageServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	const user = await auth(cookies);
	return {
		shares: await db.query.shares.findMany({
			where: eq(users.email, user),
			with: {
				to: { columns: {} },
				from: { columns: { email: true } },
				recipe: { columns: { name: true, image: true } }
			}
		})
	};
}) satisfies PageServerLoad;
