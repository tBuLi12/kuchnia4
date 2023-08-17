<script lang="ts">
	import { allTags } from '../utils/tags';

	export let tags: string[];

	let selection = allTags.map((tag) => ({ name: tag, selected: tags.includes(tag) }));

	$: setTags(selection);

	function setTags(selected: { name: string; selected: boolean }[]) {
		tags = selected.filter((s) => s.selected).map((s) => s.name);
	}
</script>

<div class="px-4 pb-3 flex flex-wrap">
	{#each selection as tag}
		<button
			class="rounded-full border text-lg m-1 px-3 {tag.selected
				? 'bg-amber-500 border-transparent text-neutral-900'
				: 'border-amber-500/50 text-amber-500 hover:bg-amber-500/10'}"
			on:click={() => (tag.selected = !tag.selected)}
		>
			{tag.name}
		</button>
	{/each}
</div>
