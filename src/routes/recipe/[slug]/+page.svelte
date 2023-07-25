<script lang="ts">
	import Number from '../../edit/[id]/body/Number.svelte';
	import type { PageData } from './$types';
	import menu from '../../../assets/menu.svg';
	import SelectList from '../../list/SelectList.svelte';

	export let data: PageData;

	const recipe = data.recipe;
</script>

<div class="flex flex-col h-full overflow-auto">
	<div
		style="background-image: url({data.recipe.image});"
		class="relative flex items-start justify-end bg-cover bg-center h-48 min-h-[12rem] after:absolute after:shadow-main-img after:content-[''] after:inset-0"
	>
		<div
			class="relative z-20 flex items-center text-white bg-neutral-900/70 border border-neutral-900 p-3 rounded-bl-xl"
		>
			<span>{recipe.name}</span>
			{#if true}
				<button class="content">
					<img src={menu} class="h-5 px-3 ml-3" />
				</button>
				<div
					class="text-lg border border-zinc-600 absolute w-36 flex flex-col px-3 py-1 m-2 shadow-md rounded-lg bg-zinc-800 top-full right-0"
				>
					<button class="py-1 border-b border-zinc-500">Edit recipe</button>
					<button class="py-1 text-red-600">Delete recipe</button>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col border-t border-zinc-700">
		<div class="flex justify-center items-center text-2xl p-2 pt-4">Ingredients</div>
		<SelectList items={recipe.ingredients} />
		<div class="flex justify-between items-center px-8 py-4">
			<div class="flex flex-col items-stretch w-24 -mt-1 gap-1">
				<span class="text-zinc-500 text-lg text-center">servings</span>
				<div class="flex bg-amber-500 rounded-md">
					<span class="basis-0 text-center text-2xl font-bold grow text-zinc-800">-</span>
					<input
						class="outline-none basis-0 text-center bg-neutral-900 grow border border-amber-500 px-2 min-w-0 text-zinc-300"
					/>
					<span class="basis-0 text-center text-2xl font-bold grow text-zinc-800">+</span>
				</div>
			</div>
			<div class="text-lg pr-2">add selected to list</div>
		</div>
	</div>
	<div class="border-t border-zinc-700">
		<span class="flex justify-center items-center text-2xl p-2 pt-4">Directions</span>
		<div class="p-3">
			{#each recipe.body as body}
				<Number number={1} name={body.name} />
				<div class="text-zinc-300 px-2 pb-4">
					{body.body}
				</div>
			{/each}
		</div>
	</div>
</div>
