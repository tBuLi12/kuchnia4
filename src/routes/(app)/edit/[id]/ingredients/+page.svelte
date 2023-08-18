<script lang="ts">
	import { goto } from '$app/navigation';
	import { getRecipe } from '../+layout.svelte';
	import Button from '../../../../../components/Button.svelte';
	import TagList from '../../../../../components/TagList.svelte';
	import List from '../../../list/EditList.svelte';

	const recipe = getRecipe();
</script>

<div class="flex justify-center items-center px-2 mb-2 text-2xl">Tags</div>
<div class="px-2">
	<TagList bind:tags={$recipe.tags} />
</div>
<div class="flex justify-center items-center p-2 text-2xl border-t mx-4 border-zinc-600">
	Ingredients
</div>

<List bind:items={$recipe.ingredients} />

<div class="flex justify-end px-3 border-t border-zinc-600 mx-4 pt-4 mt-2">
	<Button on:click={() => goto(`/edit/${$recipe.id ?? 'new'}/body`)}>Next</Button>
</div>
