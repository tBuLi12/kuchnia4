<script lang="ts">
	import type { Recipe, TimeTracked } from '../lib/repository.server';
	import noImage from '../assets/no-image.png';
	import { setInvalidImage } from '../utils/invalidImage';

	export let recipe: Recipe & TimeTracked;

	function formatDate(dateStr: string | null): string {
		if (dateStr == null) {
			return '-';
		}

		const date = new Date(dateStr);
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	}
</script>

<div class="flex flex-col cursor-pointer h-min" on:click>
	<img src={recipe.image ?? noImage} on:error={setInvalidImage} class="rounded-[24px] shadow-md" />
	<div class="flex flex-col pl-2">
		<span>{recipe.name}</span>
		<span class="text-sm text-zinc-500">{formatDate(recipe.lastMade)}</span>
	</div>
</div>
