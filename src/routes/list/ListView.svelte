<script lang="ts">
	import type { Ingredient } from '../../lib/repository';
	import EditList from './EditList.svelte';
	import ShoppingList from './ShoppingList.svelte';
	let edit = false;

	export let list: Ingredient[];
</script>

<div class="pt-2 basis-0 flex flex-col grow justify-between">
	{#if edit}
		<EditList bind:items={list} />
	{:else}
		<ShoppingList items={list} />
	{/if}
	<div class="flex p-6 justify-end pr-8">
		<div
			class="flex items-strech w-44 justify-center border border-amber-600 rounded-xl h-12 overflow-hidden"
		>
			<div
				on:click={() => (edit = false)}
				class="flex cursor-pointer items-center justify-center w-1/2  border-r border-amber-600 {edit
					? ''
					: 'bg-amber-600 text-zinc-900'}"
			>
				Shop
			</div>
			<div
				on:click={() => (edit = true)}
				class="flex cursor-pointer items-center justify-center w-1/2  {edit
					? 'bg-amber-600 text-zinc-900'
					: ''}"
			>
				Edit
			</div>
		</div>
	</div>
</div>
