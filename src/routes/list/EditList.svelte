<script lang="ts">
	import { enter } from '../../utils/keys';
	import ListItem from '../../components/ListItem.svelte';
	import EditListItem from '../../components/EditListItem.svelte';
	import { shrink } from '../../utils/transitions';
	import type { Ingredient } from '../../lib/repository';

	export let edit = true;
	export let items: Ingredient[];

	let editedItem: number | null = null;

	function resetEditedItem() {
		editedItem = null;
	}

	$: if (edit) {
		resetEditedItem();
	}

	let nameToAdd = '';

	function parseIngredient(text: string): Ingredient | undefined {
		const pattern = /^(?<name>[A-Za-z])+\s*((?<amount>\d+)\s*((?<unit>[A-Za-z]+)\s*)?)?$/;
		const match = text.match(pattern);
		if (!match) {
			return;
		}

		if (match.groups) {
			return {
				name: match.groups['name'],
				unit: match.groups['amount'] ?? null,
				quantity: parseInt(match.groups['quantity']) ?? 1
			};
		}
	}

	$: currentIngredient = parseIngredient(nameToAdd);

	function addItem(_: any) {
		if (!currentIngredient) {
			return;
		}

		items.push(currentIngredient);
		items = items;
		nameToAdd = '';
	}
</script>

<div>
	{#each items as item, i (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			{#if i === editedItem}
				<EditListItem
					on:exit={() => (editedItem = null)}
					bind:name={item.name}
					on:click={() => {
						items.splice(i, 1);
						items = items;
						editedItem = null;
					}}
				/>
			{:else}
				<ListItem name={item.name} marked={false} on:click={() => (editedItem = i)} />
			{/if}
		</div>
	{/each}
	<div class="flex mx-6 px-1 my-1 gap-2 items-center h-14">
		<input bind:value={nameToAdd} on:keydown={enter(addItem)} class="input min-w-0 pl-2  h-10" />
		<button
			on:click={addItem}
			disabled={!currentIngredient}
			class="bg-amber-500 text-zinc-800 h-10 px-2 rounded-md">Add</button
		>
	</div>
</div>
