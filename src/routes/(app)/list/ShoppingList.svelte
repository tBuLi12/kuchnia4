<script lang="ts">
	import ListItem from '../../../components/ListItem.svelte';
	import type { Ingredient } from '../../../lib/repository.server';
	import { shrink } from '../../../utils/transitions';

	export let items: Ingredient[];

	let marked = new Set<string>();
</script>

<div>
	{#each items.filter((item) => !marked.has(item.name)) as item (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem
				ingredient={item}
				on:click={() => {
					marked.add(item.name);
					marked = marked;
				}}
			/>
		</div>
	{/each}
	{#each items.filter((item) => marked.has(item.name)) as item (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem
				ingredient={item}
				on:click={() => {
					marked.delete(item.name);
					marked = marked;
				}}
				marked
			/>
		</div>
	{/each}
</div>
