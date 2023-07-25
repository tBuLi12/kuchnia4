<script lang="ts">
	import ListItem from '../../components/ListItem.svelte';
	import type { Ingredient } from '../../lib/repository';
	import { shrink } from '../../utils/transitions';

	export let items: Ingredient[];

	let marked = new Set<string>();
</script>

<div>
	{#each items.filter((item) => !marked.has(item.name)) as item (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem name={item.name} on:click={() => marked.add(item.name)} />
		</div>
	{/each}
	{#each items.filter((item) => marked.has(item.name)) as item (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem name={item.name} on:click={() => marked.delete(item.name)} marked />
		</div>
	{/each}
</div>
