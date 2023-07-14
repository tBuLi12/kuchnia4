interface Recipe {
	body: { name: string; body: string }[];
	name: string;
	description: string;
	tags: string[];
	image: string;
	ingredients: Ingedient[];
}

interface Ingedient {
	name: string;
	unit: string;
	amount: number;
}

interface User {}

interface Share {}

interface RecipeView {}
