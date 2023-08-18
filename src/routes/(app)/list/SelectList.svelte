<script lang="ts">
	import ListItem from '../../../components/ListItem.svelte';
	import type { Ingredient } from '../../../lib/repository.server';
	import { growRight } from '../../../utils/transitions';

	export let items: Ingredient[];
	export let multiplier: number;
	export let marked = new Set<string>();
</script>

<div>
	{#each items as item (item.name)}
		<div class="content relative overflow-hidden cursor-pointer flex flex-col-reverse">
			<ListItem
				ingredient={item}
				{multiplier}
				on:click={() => {
					if (marked.has(item.name)) {
						marked.delete(item.name);
					} else {
						marked.add(item.name);
					}
					marked = marked;
				}}
			/>
			<div class="absolute pointer-events-none inset-y-0 left-0 ml-9 text-transparent">
				{item.name}
				{#if marked.has(item.name)}
					<div
						class="absolute inset-0 flex items-center overflow-hidden pointer-events-none underline decoration-2 decoration-amber-500"
						transition:growRight
					>
						{item.name}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<div class="text-center p-4 text-zinc-600">No ingredients</div>
	{/each}
</div>
