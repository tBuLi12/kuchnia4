<script lang="ts">
	import { fade } from 'svelte/transition';

	export let tapped: boolean;
	export let recipe: { name: string; image: string | null };
	export let from: string;
</script>

<div
	class="border-b border-zinc-600 h-32 md:h-36 relative p-2 flex {tapped ? '' : 'cursor-pointer'}"
	on:click
>
	<div class="grow flex flex-col pb-2">
		<span class="text-2xl mb-auto">{recipe.name}</span>
		<span class="text-zinc-500">Shared by:</span>
		<span class="text-zinc-300">{from}</span>
	</div>
	<div class="hidden md:flex flex-col justify-around px-4">
		<button class="h-12 w-28 bg-amber-500 text-zinc-800 rounded-md">Add</button>
		<button class="h-12 w-28 border border-amber-500 rounded-md">Dismiss</button>
	</div>
	<img src={recipe.image} class="rounded-xl h-28 md:h-32" />
	{#if tapped}
		<div
			class="bg-zinc-800/80 absolute inset-0 flex justify-center gap-8 items-center md:hidden"
			transition:fade={{ duration: 70 }}
		>
			<button class="h-12 w-28 border border-amber-500 rounded-md">Dismiss</button>
			<button class="h-12 w-28 bg-amber-500 text-zinc-800 rounded-md">Add</button>
		</div>
	{/if}
</div>
