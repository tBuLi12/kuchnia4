<script lang="ts">
	import ListItem from '../../components/ListItem.svelte';
	import { shrink } from '../../utils/transitions';

	let items = [
		{ name: 'śmietana', marked: false },
		{ name: 'papier', marked: false },
		{ name: 'papryka', marked: false },
		{ name: 'imbir', marked: false }
	];
</script>

<div>
	{#each items.filter((item) => !item.marked) as item, i (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem name={item.name} on:click={() => (item.marked = !item.marked)} />
		</div>
	{/each}
	{#each items.filter((item) => item.marked) as item (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			<ListItem name={item.name} on:click={() => (item.marked = !item.marked)} marked />
		</div>
	{/each}
</div>
