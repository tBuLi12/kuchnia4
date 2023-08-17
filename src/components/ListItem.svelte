<script lang="ts">
	import type { Ingredient } from '$lib/repository.server';

	export let ingredient: Ingredient;
	export let multiplier = 1;
	export let marked = false;
</script>

<div
	on:click
	class="flex mx-6 px-3 items-center h-14 border-b border-zinc-600 hover:bg-neutral-800 cursor-pointer {marked
		? 'opacity-40 line-through decoration-zinc-400'
		: ''}"
>
	<span class="mr-auto">{ingredient.name}</span>
	<span class="text-stone-400">{ingredient.quantity * multiplier} {ingredient.unit ?? ''}</span>
</div>
