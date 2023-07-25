CREATE TABLE users (
	user_id serial PRIMARY KEY NOT NULL,
	email text UNIQUE NOT NULL,
	passhash char(128) NOT NULL
);

CREATE TABLE recipes (
	recipe_id serial PRIMARY KEY NOT NULL,
	name text NOT NULL,
	description text NOT NULL,
	body json NOT NULL,
	tags text[] NOT NULL,
	image text,
	owner serial REFERENCES users(user_id) NOT NULL
);

CREATE TABLE ingredients (
	name varchar(63) NOT NULL,
	unit text,
	quantity integer NOT NULL,
	recipe_id serial REFERENCES recipes(recipe_id) NOT NULL,
	PRIMARY KEY(name,recipe_id)
);

CREATE TABLE list_items (
	name varchar(63) NOT NULL,
	unit text,
	quantity integer NOT NULL,
	user_id serial REFERENCES users(user_id) NOT NULL,
	PRIMARY KEY(name,user_id)
);

CREATE TABLE recipe_views (
	recipe_id serial REFERENCES recipes(recipe_id) NOT NULL,
	user_id serial REFERENCES users(user_id) NOT NULL,
	last_made date,
	PRIMARY KEY(recipe_id,user_id)
);

CREATE TABLE shares (
	from_user serial REFERENCES users(user_id) NOT NULL,
	to_user serial REFERENCES users(user_id) NOT NULL,
	recipe_id serial REFERENCES recipes(recipe_id) NOT NULL,
	PRIMARY KEY(to_user,recipe_id)
);

INSERT INTO users(email, passhash) VALUES ('tbuli1112@gmail.com');
