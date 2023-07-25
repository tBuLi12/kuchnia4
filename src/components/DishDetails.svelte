<script lang="ts">
	import { fly } from 'svelte/transition';
	import clock from '../assets/clock.svg';
	import arrow from '../assets/arrow_orange.svg';
	import type { Recipe } from '$lib/drizzle';

	export let recipe: Recipe;
</script>

<div
	class="fixed h-2/3 lg:static lg:h-1/3 flex flex-col-reverse lg:flex-row-reverse inset-x-0 bottom-0 lg:inset-x-4 lg:bottom-4 shadow-xl lg:shadow-none lg:pt-4 lg:border-t lg:border-zinc-500 lg:ml-4 lg:mr-2"
	transition:fly
>
	<div
		class="w-full z-10 flex flex-col px-8 bg-neutral-800 lg:bg-transparent lg:w-1/2 rounded-t-[36px] lg:rounded-none"
	>
		<div class="flex gap-1 items-center px-1 mt-4 mb-2 pb-2 text-2xl border-b border-zinc-600">
			Le Chicken
			<img src={clock} class="ml-auto w-5" /> <span class="text-xl">1.5h</span>
		</div>
		<div class="px-1 text-zinc-300 max-h-48 overflow-auto">
			chicken thighs coocked in smoky rub and maple sirup chicken thighs coocked in smoky rub and
		</div>
		<div class="flex flex-wrap my-2 mb-4 items-end lg:mt-auto">
			{#each ['fast', 'dinner', 'dinner', 'dinner', 'dinner'] as tag}
				<div class="border border-yellow-800 rounded-full text-lg m-1 px-3 text-yellow-600">
					{tag}
				</div>
			{/each}
			<a class="flex justify-center items-center ml-auto mb-2 h-6 w-6" href="/recipe/"
				><img src={arrow} /></a
			>
		</div>
		<!-- <div class="border-t border-zinc-600" /> -->
	</div>
	<img
		src={recipe.image}
		class="w-full -mb-8 lg:mb-0 min-w-0 bg-img object-cover object-center basis-0 grow min-h-0 lg:rounded-xl"
	/>
</div>

<style>
	/* .bg-img {
		box-shadow: 0 -2px 12px 4px rgb(0 0 0 / 0.5);
	}

	.bg-img {
		box-shadow: 0px 1px 1px 3px rgb(0 0 0 / 0.8);
	} */
</style>
