<script lang="ts">
	export let tags: { name: string; selected: boolean }[];
</script>

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
