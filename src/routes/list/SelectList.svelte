<script lang="ts">
	import ListItem from '../../components/ListItem.svelte';
	import { growRight } from '../../utils/transitions';

	let items = [
		{ name: 'śmietana', marked: false },
		{ name: 'papier', marked: false },
		{ name: 'papryka', marked: false },
		{ name: 'imbir', marked: false }
	];
</script>

<div>
	{#each items as item, i (item.name)}
		<div class="content relative overflow-hidden flex flex-col-reverse">
			<ListItem name={item.name} on:click={() => (item.marked = !item.marked)} />
			<div class="absolute pointer-events-none inset-y-0 left-0 ml-9 text-transparent">
				{item.name}
				{#if item.marked}
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
