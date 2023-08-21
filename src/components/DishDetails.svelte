<script lang="ts">
	import clock from '../assets/clock.svg';
	import arrow from '../assets/arrow_orange.svg';
	import type { Recipe } from '$lib/repository.server';

	export let recipe: Recipe;
</script>

<div
	class="fixed h-2/3 lg:static z-10 lg:h-1/3 flex flex-col-reverse lg:flex-row-reverse inset-x-0 bottom-0 lg:inset-x-4 lg:bottom-4 shadow-preview-img2 lg:shadow-none lg:pt-4 lg:border-t lg:border-zinc-500 lg:ml-4 lg:mr-2"
>
	<div
		class="w-full z-10 flex flex-col px-6 bg-neutral-900 lg:bg-transparent lg:w-1/2 rounded-t-3xl lg:rounded-none"
	>
		<div class="flex gap-1 items-center px-1 mt-4 mb-2 pb-2 text-2xl border-b border-zinc-600">
			{recipe.name}
			<img src={clock} class="ml-auto w-5" /> <span class="text-xl">?</span>
		</div>
		<div class="px-1 text-zinc-300 max-h-48 overflow-auto">
			{recipe.description}
		</div>
		<div class="flex flex-wrap my-2 mb-4 items-end lg:mt-auto">
			{#each recipe.tags as tag}
				<div class="border border-yellow-800 rounded-full text-lg m-1 px-3 text-yellow-600">
					{tag}
				</div>
			{/each}
			<a class="flex justify-center items-center ml-auto mb-2 h-6 w-6" href="/recipe/{recipe.id}"
				><img src={arrow} /></a
			>
		</div>
	</div>
	<img
		src={recipe.image}
		class="w-full -mb-8 lg:mb-0 min-w-0 bg-img object-cover object-center basis-0 grow min-h-0 lg:rounded-xl rounded-2xl"
	/>
</div>

<style>
	.shadow-preview-img2 {
		box-shadow: 0 0 12px 16px rgb(0 0 0 / 0.7);
	}
	.shadow-preview-img2 > div {
		box-shadow: 0 0 12px 4px rgb(0 0 0 / 0.7);
	}
</style>
