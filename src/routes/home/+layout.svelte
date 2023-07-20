<script lang="ts">
	import { goto } from '$app/navigation';
	import DishGridItem from '../../components/DishGridItem.svelte';
	import search from '../../assets/search.svg';
	import TagList from '../../components/TagList.svelte';
	import ListView from '../list/ListView.svelte';

	let tagsVisible = false;

	let tags = [
		{ name: 'fast', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false }
	];
</script>

<div class="flex lg:relative flex-col grow">
	<div class="p-3 flex h-14 items-center justify-end gap-1">
		<input placeholder="Search" class="input grow" />
		<button style="background-image: url({search})" class="h-5 w-5 mx-2 bg-cover bg-center" />
		<button on:click={() => (tagsVisible = !tagsVisible)} class="border-l border-zinc-600 px-3"
			>#</button
		>
	</div>
	{#if tagsVisible}
		<TagList {tags} />
	{/if}
	<div
		class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-3 basis-0 grow overflow-auto"
	>
		{#each ['/morechicken.png', '/chicken.png', '/spaghetti.png', '/morechicken.png', '/chicken.png', 'spaghetti.png', '/morechicken.png', '/chicken.png', '/spaghetti.png', '/morechicken.png', '/chicken.png', 'spaghetti.png', '/morechicken.png', '/chicken.png', '/spaghetti.png', '/morechicken.png', '/chicken.png', 'spaghetti.png'] as image, i}
			<DishGridItem {image} on:click={() => goto(`/home/${i}`)} />
		{/each}
	</div>
	<slot />
</div>
