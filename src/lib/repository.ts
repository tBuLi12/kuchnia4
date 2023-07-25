import { db, sql } from '@vercel/postgres';

export interface Recipe {
	id: number;
	name: string;
	desciption: string;
	tags: string[];
	image: string | null;
}

export interface TimeTracked {
	lastMade: Date | null;
}

export interface Ingredient {
	name: string;
	unit: string | null;
	quantity: number;
}

export interface Ingredients {
	ingredients: Ingredient[];
}

export async function getPasswordHash(email: string): Promise<string | null> {
	const query = await db.sql<{ passhash: string }>`
        SELECT passhash FROM users WHERE email = ${email}
    `;

	if (query.rowCount != 1) {
		return null;
	}

	return query.rows[0].passhash;
}

export async function getUserRecipes(email: string): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
			recipe_id AS id,
			name,
			description,
			tags,
			image,
            last_made AS "lastMade"
		FROM recipe_views 
            JOIN users USING(user_id) 
            JOIN recipes USING(recipe_id) 
        WHERE email = ${email}
	`;
	return recipes.rows;
}

export async function getUsersListItems(email: string): Promise<Ingredient[]> {
	const recipes = await db.sql<Ingredient>`
		SELECT
            name,
            unit,
            quantity
		FROM list_items 
            JOIN users USING(user_id) 
        WHERE email = ${email}
	`;
	return recipes.rows;
}

export async function addListItems(email: string, items: Ingredient[]): Promise<void> {
	await db.sql`
        INSERT INTO list_items (name, unit, quantity)
        SELECT *, (SELECT user_id FROM users WHERE email = ${email})
        FROM json_to_recordset(${items}) AS items(
            name varchar(63),
            unit text,
            quantity text
        )
    `;
}

export async function removeListItems(email: string, names: string[]): Promise<void> {
	await db.sql`
        DELETE FROM list_items 
        WHERE user_id = (SELECT user_id FROM users WHERE email = ${email})
            AND name IN (SELECT * FROM json_array_elements_text(${names}))
    `;
}

export async function getRecipe(
	email: string,
	recipe_id: number
): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
            (owner = (SELECT user_id FROM users WHERE email = ${email})) as is_owned,
		FROM recipes 
            JOIN users ON(owner = user_id) 
            JOIN recipes USING(recipe_id) 
        WHERE email = ${email}
	`;
	return recipes.rows;
}
