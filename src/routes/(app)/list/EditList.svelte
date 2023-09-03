<script lang="ts" context="module">
	export function parseIngredient(text: string): Ingredient | undefined {
		const pattern =
			/^\s*(?<name>[A-Za-z]([A-Za-z]|\s)*)((?<quantity>\d+)\s*((?<unit>[A-Za-z]+)\s*)?)?$/u;
		const match = text.match(pattern);
		if (!match) {
			return;
		}

		if (match.groups) {
			return {
				name: match.groups['name'].trim(),
				unit: match.groups['unit'] ?? null,
				quantity: parseInt(match.groups['quantity']) ?? 1
			};
		}
	}
</script>

<script lang="ts">
	import { enter } from '../../../utils/keys';
	import ListItem from '../../../components/ListItem.svelte';
	import EditListItem from '../../../components/EditListItem.svelte';
	import { shrink } from '../../../utils/transitions';
	import type { Ingredient } from '../../../lib/repository.server';
	import { createEventDispatcher } from 'svelte';
	import Button from '../../../components/Button.svelte';
	import Input from '../../../components/Input.svelte';

	const dispatch = createEventDispatcher<{ add: Ingredient; remove: string; update: Ingredient }>();

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

	$: currentIngredient = parseIngredient(nameToAdd);

	function addItem(_: any) {
		if (!currentIngredient) {
			return;
		}

		items.push(currentIngredient);
		items = items;
		nameToAdd = '';

		dispatch('add', currentIngredient);
	}
</script>

<div>
	{#each items as item, i (item.name)}
		<div class="content overflow-hidden flex flex-col-reverse" transition:shrink|local>
			{#if i === editedItem}
				<EditListItem
					on:exit={({ detail: newIngredient }) => {
						if (newIngredient) {
							item = newIngredient;
							dispatch('update', newIngredient);
						}
						editedItem = null;
					}}
					{item}
					on:click={() => {
						items.splice(i, 1);
						items = items;
						editedItem = null;
						dispatch('remove', item.name);
					}}
				/>
			{:else}
				<ListItem ingredient={item} marked={false} on:click={() => (editedItem = i)} />
			{/if}
		</div>
	{:else}
		<div class="text-center text-neutral-600 my-2">No ingredients</div>
	{/each}
	<div class="flex mx-6 px-1 my-1 gap-2 items-center h-14">
		<Input
			bind:value={nameToAdd}
			placeholder="Milk 1 cup"
			on:keydown={enter(addItem)}
			class="min-w-0 pl-2 h-10"
		/>
		<Button on:click={addItem} disabled={!currentIngredient}>Add</Button>
	</div>
</div>
