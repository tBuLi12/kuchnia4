<script lang="ts">
	import { goto } from '$app/navigation';
	import { getRecipe } from '../+layout.svelte';
	import Button from '../../../../../components/Button.svelte';
	import Input from '../../../../../components/Input.svelte';
	import TextArea from '../../../../../components/TextArea.svelte';

	const recipe = getRecipe();
</script>

<div class="flex flex-col px-4 gap-4 lg:flex-row">
	<div class="flex flex-col gap-4">
		<span class="text-zinc-400 -mb-2">Name</span>
		<Input class="min-w-0 pl-2 h-10" placeholder="A good one" bind:value={$recipe.name} />
		<span class="text-zinc-400 -mb-2">Description</span>
		<TextArea
			class="min-w-0 pl-2 py-2 min-h-[6rem]"
			placeholder="Describe your dish in one sentence"
			value={$recipe.description ?? ''}
			on:change={(evt) => ($recipe.description = evt.currentTarget.value || null)}
		/>
	</div>
	<div class="flex flex-col gap-4 border-b border-zinc-600 pb-4 lg:grow">
		<span class="text-zinc-400 -mb-2">Image link</span>
		<Input
			class="min-w-0 pl-2 h-10"
			placeholder="to an image"
			value={$recipe.image ?? ''}
			on:change={(evt) => ($recipe.image = evt.currentTarget.value || null)}
		/>
	</div>
	<Button on:click={() => goto(`/edit/${$recipe.id ?? 'new'}/ingredients`)} class="self-end"
		>Next</Button
	>
</div>
