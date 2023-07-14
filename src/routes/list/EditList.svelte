<script lang="ts">
	import { enter } from '../../utils/keys';
	import ListItem from '../../components/ListItem.svelte';
	import EditListItem from '../../components/EditListItem.svelte';
	import { shrink } from '../../utils/transitions';

	export let edit = true;

	let editedItem: number | null = null;

	function resetEditedItem() {
		editedItem = null;
	}

	$: if (edit) {
		resetEditedItem();
	}

	let nameToAdd = '';
	let items = [
		{ name: 'śmietana', marked: false },
		{ name: 'papier', marked: false },
		{ name: 'papryka', marked: false },
		{ name: 'imbir', marked: false }
	];

	function addItem(_: any) {
		items.push({ name: nameToAdd, marked: false });
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
		<button on:click={addItem} class="bg-amber-500 text-zinc-800 h-10 px-2 rounded-md">Add</button>
	</div>
</div>
