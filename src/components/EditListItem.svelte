<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;

	let dispatch = createEventDispatcher<{ exit: never }>();

	let div: HTMLDivElement;
</script>

<svelte:window
	on:click={(evt) => {
		if (evt.target instanceof Node && evt.target.contains(div)) {
			dispatch('exit');
		}
	}}
/>

<div bind:this={div} class="flex mx-6 gap-2 px-1 items-center h-14 border-b border-zinc-600">
	<input autofocus class="input h-10" bind:value={name} />
	<button on:click class="bg-red-700 rounded-md h-10 w-10 text-zinc-800 font-bold">D</button>
</div>
