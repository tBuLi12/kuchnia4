<script lang="ts">
	import { enter } from '../../utils/keys';
	import ListItem from '../../components/ListItem.svelte';
	let edit = false;
	let nameToAdd = '';
	let items = [
		{ name: 'śmietana', marked: false },
		{ name: 'papier', marked: false },
		{ name: 'papryka', marked: false },
		{ name: 'imbir', marked: true }
	];

	function onAdd(_: any) {
		items.push({ name: nameToAdd, marked: false });
		items = items;
		nameToAdd = '';
	}
</script>

<div class="pt-2 basis-0 flex flex-col grow justify-between">
	<div>
		{#each [...items.filter((item) => !item.marked), ...items.filter((item) => item.marked)] as item (`${item.name}${item.marked}`)}
			<div class="content">
				<ListItem
					name={item.name}
					marked={item.marked}
					on:click={() => (item.marked = !item.marked)}
				/>
			</div>
		{/each}
		<div class="flex mx-6 px-1 my-1 gap-2 items-center h-14">
			<input
				bind:value={nameToAdd}
				on:keydown={enter(onAdd)}
				on:submit={(evt) => console.log(evt)}
				class="bg-transparent border min-w-0 pl-2 border-amber-600 outline-none focus:border-amber-500 rounded-md h-10"
			/>
			<button on:click={onAdd} class="bg-amber-500 text-zinc-800 h-10 px-2 rounded-md">Add</button>
		</div>
	</div>
	<div class="flex p-6 justify-between pr-8">
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
		<button
			class="flex items-center justify-center text-zinc-800 rounded-full text-4xl bg-amber-500 w-12 h-12"
			>+</button
		>
	</div>
</div>
