<script lang="ts">
	import { goto } from '$app/navigation';
	import DishGridItem from '../../../components/DishGridItem.svelte';
	import search from '../../../assets/search.svg';
	import TagList from '../../../components/TagList.svelte';
	import type { LayoutData } from './$types';
	import Input from '../../../components/Input.svelte';

	export let data: LayoutData;

	let tags: string[] = [];

	let searchValue = '';

	let tagsVisible = false;

	function getSearchUrl() {
		const url = new URL('/home', location.origin);
		if (searchValue) {
			url.searchParams.append('q', searchValue);
		}
		if (tags.length) {
			url.searchParams.append('tags', tags.join(','));
		}
		return url;
	}
</script>

<div class="flex lg:relative flex-col grow">
	<div class="p-4 flex items-center justify-end gap-1">
		<Input placeholder="Search" class="grow" bind:value={searchValue} />
		<button
			style="background-image: url({search})"
			class="h-6 w-6 mx-2 bg-contain bg-no-repeat bg-center"
			on:click={() => goto(getSearchUrl())}
		/>
		<button
			on:click={() => (tagsVisible = !tagsVisible)}
			class="border-l border-zinc-600 px-3 {tagsVisible ? 'text-amber-400' : ''}">#</button
		>
	</div>
	{#if tagsVisible}
		<TagList bind:tags />
	{/if}
	<div
		class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 basis-0 grow overflow-auto"
	>
		{#each data.recipes as recipe, i}
			<DishGridItem {recipe} on:click={() => goto(`/home/${i}`)} />
		{:else}
			<div class="text-zinc-500 justify-center flex col-span-2 items-center">No recipes found</div>
		{/each}
	</div>
	<slot />
</div>
