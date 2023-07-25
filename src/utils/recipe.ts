import type { SelectedPick } from '@xata.io/client';
import type { IngredientsRecord, RecipesRecord } from '../xata';

class Recipe {
	body: { name: string; body: string }[] = [];
	name: string = '';
	description: string = '';
	tags: string[] = [];
	imageUrl: string | null = null;
	ingredients: Ingedient[] = [];

	private record: Readonly<SelectedPick<RecipesRecord, ['*']> | null> | null;

	constructor(
		record?: Readonly<SelectedPick<RecipesRecord, ['*']> | null>,
		ingredients?: Readonly<SelectedPick<IngredientsRecord, ['*']>>[]
	) {
		if (record) {
			this.name = record.name!;
			this.description = record.description!;
			this.imageUrl = record.imageUrl ?? null;
			this.tags = record.tags!;
			this.body = JSON.parse(record.body!);
		}
		if (ingredients) {
			this.ingredients = ingredients.map((i) => ({
				name: i.name!,
				amount: i.amount!,
				unit: i.unit!
			}));
		}
	}
}
