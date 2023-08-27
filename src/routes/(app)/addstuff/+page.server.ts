import { addRecipe } from '$lib/repository.server';
import type { PageServerLoad } from './$types';

export const load = (() => {
	// addRecipe()
}) satisfies PageServerLoad;

const oldRecipes = [
	{
		name: 'Maple chicken',
		lastMade: '2023-02-11',
		description: 'Chcicken thighs in a smoky maple sirup sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Crème brûlée',
		lastMade: '2022-10-21',
		description: 'Rich vanilla custard topped with sugar',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Bigos',
		lastMade: '2022-08-13',
		description: 'Beef stew with vegetables',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Duck Fesenjān',
		lastMade: '2023-02-11',
		description: 'Duck slow-cooked in a walnut-saffron stew',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Passionfruit tart',
		lastMade: '2022-08-04',
		description: 'Mascarpone and white chocolate tart with passionfruit curd',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'De morney meatballs',
		lastMade: '2022-11-15',
		description: 'Turkey meatballs in de morney sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Chicken hoisin',
		lastMade: '2023-07-19',
		description: 'Chicken thigh stir fried in hoisin sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Schabowe z serem',
		lastMade: '2022-05-09',
		description: 'Kotlety schabowe smażone z serem i szynką',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Chilli con carne',
		lastMade: '2023-02-11',
		description: 'Ground beef in tomato sauce with red beans and corn',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Orange beef',
		lastMade: '2022-02-15',
		description: 'Asian beef stir fry in orange sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Schab z owocami',
		lastMade: '2022-05-09',
		description: 'Pork cooked with dried plums and other fruit inside',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Egg fried rice',
		lastMade: '2022-02-16',
		description: 'Rice stir fried with egg, chicken and vegetables in an asian sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Sous-vide salomon',
		lastMade: '2023-01-23',
		description: 'Salomon fillet cooked sous-vide in the oven',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Duck with apples and cashews',
		lastMade: '2022-02-24',
		description: 'Duck breast cooked in the oven with an apple sauce and cashew nuts',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Naleśniki',
		lastMade: '2023-03-21',
		description: 'Thin pancakes with a white cheese filling',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Mielone z fetą i szpinakiem',
		lastMade: '2023-01-23',
		description: 'Turkey meatballs with feta cheese and spinach',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'pad thai',
		lastMade: '2022-03-06',
		description: 'Rice noodles stir-fired with chicken in a tamarind-based sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'bolognese',
		lastMade: '2023-01-23',
		description: 'Spaghetti with an italian ground turkey and tomato sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Żeberka',
		lastMade: '2022-11-04',
		description: 'Slow cooked ribs?',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Lasagne',
		lastMade: '2022-11-04',
		description: 'Italian pasta layered with meat, ricotta cheese and beshamel sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Thyme Lemon Chicken',
		lastMade: '2022-11-05',
		description: 'Chichken thigh in a lemon and thyme sauce served with spaghetti',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Mustard Pork',
		lastMade: '2023-03-04',
		description: 'Pork cooked in a mustard sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Chocolate fudge',
		lastMade: '2022-03-17',
		description: 'Chewy cubes of (optionally coconut) chocolate fudge',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Lentil Curry',
		lastMade: '2023-01-23',
		description: 'Tomato, almond and coconut based indian red lentil curry',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Pizza',
		lastMade: '2023-01-23',
		description: 'Pizza.',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Pesto',
		lastMade: '2022-12-09',
		description: 'Basil and garlic green pesto served with spaghetti',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Carbonara',
		lastMade: '2023-03-04',
		description: 'A creamy mascarpone-based carbonara sauce with spaghetti',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Fruit curry chicken',
		lastMade: '2023-01-23',
		description: 'Chicken thigh cooked with a curry sauce, apples and bananas',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Karkówka smażona',
		lastMade: '2022-03-31',
		description: 'Smażona karkówka w jakiś przyprawach',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Coleslaw',
		lastMade: '2022-03-31',
		description: 'Cabbage and carrot salad in a yoghurt-based sauce',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Pad udon',
		lastMade: '2022-04-02',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Surówka z korzenia pietruszki, jabłka i kiwi',
		lastMade: '2022-04-03',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Surówka z selera z melonem i jabłkiem',
		lastMade: '2022-04-03',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Surówka z kapusty pekińskiej, ogórkiem i rzodkiewką',
		lastMade: '2022-04-03',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Surówka z ogórka kiszonego i świeżej papryki',
		lastMade: '2022-04-03',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Surówka z kalarepy, jabłka i pomarańczy',
		lastMade: '2022-04-03',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Tofu w sosie orzechowym',
		lastMade: '2023-03-04',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Tortilla',
		lastMade: '2023-02-02',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'kurczak kurma',
		lastMade: '2022-11-15',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Wołowina z cebulą',
		lastMade: '2022-04-18',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'żurek',
		lastMade: '2022-04-21',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'zupa z zielonym curry',
		lastMade: '2023-03-10',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'bataty z fetą',
		lastMade: '2023-02-11',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Kefta tagine',
		lastMade: '2022-09-20',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Łopatka z suszonymi pomidorami',
		lastMade: '2022-05-09',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Kartoflanik',
		lastMade: '2022-05-15',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Musaka',
		lastMade: '2023-02-11',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'kaczka w chińskim sosie pomidorowym',
		lastMade: '2022-06-04',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'grochówka',
		lastMade: '2023-03-21',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'bef strogonow',
		lastMade: '2023-02-11',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Beef stir fry',
		lastMade: '2023-04-26',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'Bakłażan z bolognese',
		lastMade: '2023-03-10',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'kurczak korma',
		lastMade: '2022-06-25',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'hoisin brokuły nerkowe',
		lastMade: '2022-10-06',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'gęś',
		lastMade: '2022-11-16',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'wieprzowina z cebulą',
		lastMade: '2022-12-09',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	},
	{
		name: 'zupa krem z pora',
		lastMade: '2023-03-04',
		description: '',
		body: [],
		tags: [],
		image: null,
		ingredients: []
	}
];
