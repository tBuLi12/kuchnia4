import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

export const db = createPool({
	connectionString: POSTGRES_URL
});
