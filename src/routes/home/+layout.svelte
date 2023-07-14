<script lang="ts">
	import { goto } from '$app/navigation';
	import DishGridItem from '../../components/DishGridItem.svelte';
	import search from '../../assets/search.svg';
</script>

<div class="flex flex-col">
	<div class="p-3 flex h-14 items-center justify-end gap-1">
		<input placeholder="Search" class="input grow" />
		<img src={search} class="h-5 px-2" />
		<span class="border-l border-zinc-600 px-3">#</span>
	</div>
	<div class="grid grid-cols-2 gap-4 px-3">
		{#each ['/morechicken.png', '/chicken.png', '/spaghetti.png', '/morechicken.png', '/chicken.png', 'spaghetti.png'] as image, i}
			<DishGridItem {image} on:click={() => goto(`/home/${i}`)} />
		{/each}
		<slot />
	</div>
</div>
