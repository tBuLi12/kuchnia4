<script lang="ts">
	import { fade } from 'svelte/transition';

	export let tapped: boolean;
</script>

<div
	class="border-b border-zinc-600 min-h-[6rem] relative p-2 flex {tapped ? '' : 'cursor-pointer'}"
	on:click
>
	<div class="grow flex flex-col pb-2">
		<span class="text-2xl mb-auto">Le chicken</span>
		<span class="text-zinc-500">Shared by:</span>
		<span class="text-zinc-300">Myself Myself Myself </span>
	</div>
	<img src="chicken.png" class="rounded-xl h-28" />
	{#if tapped}
		<div
			class="bg-zinc-800/80 absolute inset-0 flex justify-center gap-8 items-center"
			transition:fade={{ duration: 70 }}
		>
			<button class="h-12 w-28 border border-amber-500 rounded-md">Dismiss</button>
			<button class="h-12 w-28 bg-amber-500 text-zinc-800 rounded-md">Add</button>
		</div>
	{/if}
</div>
