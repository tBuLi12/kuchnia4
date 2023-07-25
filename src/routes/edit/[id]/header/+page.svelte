<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let recipe: Omit<Recipe, 'lastMade'> = data.recipe;
</script>

<div class="flex flex-col p-4 gap-4 grow lg:flex-row">
	<div class="flex flex-col gap-4  grow">
		<span class="text-zinc-300 -mb-2">Name</span>
		<input class="input text-zinc-200 min-w-0 pl-2 h-10" />
		<span class="text-zinc-300 -mb-2">Description</span>
		<textarea class="input text-zinc-200 min-w-0 pl-2 py-2 grow" />
	</div>
	<div class="flex flex-col gap-4 lg:grow">
		<span class="text-zinc-300 -mb-2">Image link</span>
		<input class="input text-zinc-200 min-w-0 pl-2 h-10" />
		<a
			class="flex justify-center items-center bg-amber-500 text-zinc-800 h-10 px-4 rounded-md self-end mt-auto"
			href="/edit/ingredients">Next</a
		>
	</div>
</div>
