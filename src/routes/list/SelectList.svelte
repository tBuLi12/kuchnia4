<script lang="ts">
	import ListItem from '../../components/ListItem.svelte';
	import type { Ingredient } from '../../lib/repository';
	import { growRight } from '../../utils/transitions';

	export let items: Ingredient[];

	let marked = new Set<string>();
</script>

<div>
	{#each items as item, i (item.name)}
		<div class="content relative overflow-hidden flex flex-col-reverse">
			<ListItem
				name={item.name}
				on:click={() => {
					if (marked.has(item.name)) {
						marked.delete(item.name);
					} else {
						marked.add(item.name);
					}
				}}
			/>
			<div class="absolute pointer-events-none inset-y-0 left-0 ml-9 text-transparent">
				{item.name}
				{#if marked.has(item.name)}
					<div
						class="absolute inset-0 flex items-center overflow-hidden pointer-events-none underline decoration-amber-500"
						transition:growRight
					>
						{item.name}
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
