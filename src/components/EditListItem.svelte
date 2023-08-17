<script lang="ts">
	import type { Ingredient } from '$lib/repository.server';
	import { createEventDispatcher } from 'svelte';
	import { parseIngredient } from '../routes/(app)/list/EditList.svelte';
	import Input from './Input.svelte';

	export let item: Ingredient;
	let name = `${item.name} ${item.quantity}${item.unit ? ` ${item.unit}` : ''}`;
	let dispatch = createEventDispatcher<{ exit: Ingredient | null }>();

	let dirty = false;
	let div: HTMLDivElement;
</script>

<svelte:window
	on:click={(evt) => {
		if (evt.target instanceof Node && evt.target.contains(div)) {
			const ingredient = parseIngredient(name);
			dispatch('exit', dirty ? ingredient : null);
		}
	}}
/>

<div bind:this={div} class="flex mx-6 gap-2 px-1 py-2 border-b border-zinc-600">
	<Input autofocus class="basis-0 grow" bind:value={name} on:change={() => (dirty = true)} />
	<button on:click class="bg-red-600 rounded-md h-10 w-10 text-zinc-800 font-bold" />
</div>

<style>
	button {
		mask: url('../assets/bin.svg') center no-repeat, linear-gradient(#fff 0 0);
		mask-size: 57%;
		mask-composite: exclude;
	}
</style>
