import { error } from '@sveltejs/kit';
import { db } from './db.server';
import crypto from 'crypto-js';

export interface Recipe {
	id: number;
	name: string;
	description: string;
	body: { name: string; body: string }[];
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

export interface Owned {
	isOwned: boolean;
}

export interface Share {
	recipeId: number;
	name: string;
	image: string | null;
	from: string;
}

export async function getPasswordHashAndId(
	email: string
): Promise<{ hash: string; userId: number } | null> {
	const query = await db.sql<{ passhash: string; user_id: number }>`
        SELECT passhash, user_id FROM users WHERE email = ${email}
    `;

	if (query.rowCount != 1) {
		return null;
	}

	return { hash: query.rows[0].passhash, userId: query.rows[0].user_id };
}

export async function getUserRecipes(user_id: number): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
			recipe_id AS id,
			name,
			description,
			tags,
			image,
            last_made AS "lastMade"
		FROM recipe_views 
            JOIN recipes USING(recipe_id) 
        WHERE user_id = ${user_id}
	`;
	return recipes.rows;
}

export async function getUserRecipesWithTags(
	user_id: number,
	tags: string[]
): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
			recipe_id AS id,
			name,
			description,
			tags,
			image,
            last_made AS "lastMade"
		FROM recipe_views 
            JOIN recipes USING(recipe_id) 
        WHERE user_id = ${user_id}
			AND tags && json_array_elements_text(${JSON.stringify(tags)})
	`;
	return recipes.rows;
}
export async function getUserRecipesWithName(
	user_id: number,
	search: string
): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
			recipe_id AS id,
			name,
			description,
			tags,
			image,
            last_made AS "lastMade"
		FROM recipe_views 
            JOIN recipes USING(recipe_id) 
        WHERE user_id = ${user_id}
			AND soundex(name) = soundex(${search}) 
			AND levenshtein(lower(${search}), lower(name)) < 2
	`;
	return recipes.rows;
}

export async function getUserRecipesWithNameAndTags(
	user_id: number,
	search: string,
	tags: string[]
): Promise<(Recipe & TimeTracked)[]> {
	const recipes = await db.sql<Recipe & TimeTracked>`
		SELECT
			recipe_id AS id,
			name,
			description,
			tags,
			image,
            last_made AS "lastMade"
		FROM recipe_views 
            JOIN recipes USING(recipe_id) 
        WHERE user_id = ${user_id}
			AND tags && json_array_elements_text(${JSON.stringify(tags)})
			AND soundex(name) = soundex(${search}) 
			AND levenshtein(lower(${search}), lower(name)) < 2
	`;
	return recipes.rows;
}

export async function getUsersListItems(user_id: number): Promise<Ingredient[]> {
	const ingredients = await db.sql<Ingredient>`
		SELECT
            name,
            unit,
            quantity
		FROM list_items 
        WHERE user_id = ${user_id}
	`;
	console.log(ingredients.rows);
	return ingredients.rows;
}

export async function addListItems(user_id: number, items: Ingredient[]): Promise<void> {
	await db.sql`
        INSERT INTO list_items (name, unit, quantity, user_id)
        SELECT *, ${user_id}
        FROM json_to_recordset(${JSON.stringify(items)}) AS items(
            name varchar(63),
            unit text,
            quantity integer
        )
		ON CONFLICT (name, user_id)
		DO UPDATE SET quantity = excluded.quantity, unit = excluded.unit
    `;
}

export async function removeListItems(user_id: number, names: string[]): Promise<void> {
	await db.sql`
        DELETE FROM list_items 
        WHERE user_id = ${user_id}
            AND name IN (SELECT * FROM json_array_elements_text(${JSON.stringify(names)}))
    `;
}

export async function getRecipe(
	user_id: number,
	recipe_id: number
): Promise<(Recipe & Ingredients & Owned) | null> {
	const recipes = await db.sql<Recipe & Ingredients & Owned>`
		SELECT
            (owner = user_id) as "isOwned",
			recipe_id as id,
			name,
			description,
			body,
			tags,
			image,
			(
				SELECT coalesce(json_agg(row_to_json(i)), '[]'::json) FROM (
					SELECT name, quantity, unit FROM ingredients WHERE recipe_id = ${recipe_id}
				) 
				i
			) as ingredients
		FROM recipes 
            JOIN recipe_views USING(recipe_id)
        WHERE user_id = ${user_id}
			AND recipe_id = ${recipe_id}
	`;

	if (recipes.rowCount != 1) {
		return null;
	}

	return recipes.rows[0];
}

export async function updateRecipe(
	user_id: number,
	recipe: Recipe & Ingredients
): Promise<boolean> {
	const client = await db.connect();
	try {
		await client.sql`BEGIN`;
		const ownerId = await client.sql<{
			owner: number;
		}>`SELECT owner FROM recipes WHERE recipe_id = ${recipe.id}`;
		if (ownerId.rows[0]?.owner !== user_id) {
			console.log('not owned', ownerId.rows[0], user_id);
			await client.sql`ROLLBACK`;
			client.release();
			return false;
		}

		await client.sql`DELETE FROM ingredients WHERE recipe_id = ${recipe.id}`;
		await client.sql`
			INSERT INTO ingredients (name, unit, quantity, recipe_id)
			SELECT *, ${recipe.id}
			FROM json_to_recordset(${JSON.stringify(recipe.ingredients)}) AS items(
				name varchar(63),
				unit text,
				quantity integer
			)
		`;
		await client.sql`
			UPDATE recipes SET 
				(name, description, body, tags, image) = (
					SELECT * FROM json_to_record(${JSON.stringify(recipe)}) AS recipe(
						name text,
						description text,
						body json,
						tags text[],
						image text
					)
				)
			WHERE	
				recipe_id = ${recipe.id}
		`;

		await client.sql`COMMIT`;
	} catch (e) {
		await client.sql`ROLLBACK`;
		throw e;
	} finally {
		client.release();
	}
	return true;
}

export async function addRecipe(
	user_id: number,
	recipe: Omit<Recipe, 'id'> & Ingredients
): Promise<void> {
	const withoutIngredients: Omit<Recipe, 'id' | 'ingredients'> & { ingredients?: Ingredient[] } = {
		...recipe
	};
	delete withoutIngredients.ingredients;

	const client = await db.connect();
	try {
		await client.sql`BEGIN`;
		const newRow = await client.sql<{ recipe_id: number; user_id: number }>`
			INSERT INTO recipes (name, description, body, tags, image, owner)
			SELECT *, ${user_id}
			FROM json_to_record(${JSON.stringify(withoutIngredients)}) AS items(
				name text,
				description text,
				body json,
				tags text[],
				image text
			)
			RETURNING recipe_id
		`;

		const { recipe_id } = newRow.rows[0];

		await client.sql`
			INSERT INTO ingredients (name, unit, quantity, recipe_id)
			SELECT *, ${recipe_id}
			FROM json_to_recordset(${JSON.stringify(recipe.ingredients)}) AS items(
				name varchar(63),
				unit text,
				quantity integer
			)
		`;

		await client.sql`
			INSERT INTO recipe_views (user_id, recipe_id) VALUES (${user_id}, ${recipe_id})
		`;

		await client.sql`COMMIT`;
	} catch (e) {
		await client.sql`ROLLBACK`;
		throw e;
	} finally {
		client.release();
	}
}

export async function getSharedRecipes(user_id: number): Promise<Share[]> {
	const shares = await db.sql<Share>`
		SELECT 
			recipes.recipe_id as "recipeId",
			recipes.name as name,
			from_user.email as "from",
			recipes.image as image
		FROM shares
			JOIN users as from_user ON user_id = from_user_id
			JOIN recipes USING(recipe_id)
		WHERE to_user_id = ${user_id}
	`;

	return shares.rows;
}

export async function shareRecipe(
	from_user_id: number,
	recipe_id: number,
	to_email: string
): Promise<void> {
	await db.sql`
		INSERT INTO shares (from_user_id, to_user_id, recipe_id) VALUES (
			${from_user_id},
			(SELECT user_id FROM users WHERE email = ${to_email}),
			${recipe_id}
		)
	`;
}

export async function acceptShare(user_id: number, recipe_id: number): Promise<void> {
	const client = await db.connect();
	try {
		await client.sql`BEGIN`;
		const result = await client.sql`
			DELETE FROM shares 
			WHERE to_user_id = ${user_id}
				AND recipe_id = ${recipe_id}
		`;
		if (result.rowCount === 0) {
			throw error(401, 'invalid accept');
		}

		await client.sql`
			INSERT INTO recipe_views (user_id, recipe_id) VALUES (${user_id}, ${recipe_id})
		`;

		await client.sql`COMMIT`;
	} catch (e) {
		await client.sql`ROLLBACK`;
		throw e;
	} finally {
		client.release();
	}
}

export async function rejectShare(user_id: number, recipe_id: number): Promise<void> {
	await db.sql`
		DELETE FROM shares 
		WHERE to_user_id = ${user_id}
			AND recipe_id = ${recipe_id}
	`;
}

export async function registerUser(email: string, password: string): Promise<void> {
	const salt = crypto.lib.WordArray.random(32);
	const key = crypto.PBKDF2(password, salt, { keySize: 8 });
	const keyString = key.toString();
	const saltString = salt.toString();
	if (keyString.length != 64 || saltString.length != 64) {
		throw error(500, `length is wrong ${keyString.length}, ${saltString.length}`);
	}

	await db.sql`INSERT INTO users(email, passhash) VALUES (${email}, ${salt + keyString})`;
}

export async function doRecipe(userId: number, recipeId: number): Promise<void> {
	await db.sql`
		UPDATE recipe_views
		SET last_made = NOW()
		WHERE user_id = ${userId}
			AND recipe_id = ${recipeId}
	`;
}
