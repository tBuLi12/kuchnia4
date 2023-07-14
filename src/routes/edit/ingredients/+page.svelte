<script>
	import List from '../../list/EditList.svelte';

	let tags = [
		{ name: 'fast', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false }
	];
</script>

<div class="flex justify-center items-center p-2 text-2xl">Tags</div>
<div class="px-4 pb-3 flex flex-wrap">
	{#each tags as tag}
		<button
			class="rounded-full border text-lg m-1 px-3 {tag.selected
				? 'bg-amber-500 border-transparent text-zinc-800'
				: 'border-yellow-800 text-yellow-600'}"
			on:click={() => (tag.selected = !tag.selected)}
		>
			{tag.name}
		</button>
	{/each}
</div>
<div class="flex justify-center items-center p-2 text-2xl border-t border-zinc-600">
	Ingredients
</div>

<List />

<a
	class="flex justify-center items-center bg-amber-500 text-zinc-800 h-10 px-4 mr-6 mt-4 rounded-md self-end"
	href="/edit/body">Next</a
>
