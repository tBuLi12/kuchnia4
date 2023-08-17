<script lang="ts">
	import type { Recipe, TimeTracked } from '../lib/repository.server';

	export let recipe: Recipe & TimeTracked;
</script>

<div class="flex flex-col cursor-pointer h-min" on:click>
	<img src={recipe.image} class="rounded-[24px] shadow-md" />
	<div class="flex flex-col pl-2">
		<span>{recipe.name}</span>
		<span class="text-sm text-zinc-500">{recipe.lastMade ?? '-'}</span>
	</div>
</div>
