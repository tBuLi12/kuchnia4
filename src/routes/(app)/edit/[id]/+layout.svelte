<script lang="ts" context="module">
	const recipeKey = Symbol();
	export const getRecipe = () =>
		getContext<
			Writable<
				Omit<Recipe, 'id'> &
					Ingredients & {
						id?: number | undefined;
					}
			>
		>(recipeKey);
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import Steps from '../../../../components/Steps.svelte';
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { browser } from '$app/environment';
	import Modal from '../../../../components/Modal.svelte';
	import Button from '../../../../components/Button.svelte';
	import SecondaryButton from '../../../../components/SecondaryButton.svelte';
	import type { Ingredients, Recipe } from '$lib/repository.server';
	import { writable, type Writable } from 'svelte/store';

	const stepNames = ['header', 'ingredients', 'body'];
	const draftKey = 'recipe-draft';

	export let data: LayoutData;

	$: step = stepNames.findIndex((name) => $page.url.pathname.includes(name));

	const recipe = writable(data.recipe);
	setContext(recipeKey, recipe);

	onMount(async () => {
		if (browser && data.recipe.id == null) {
			const draft = localStorage.getItem(draftKey);
			if (draft != null && (await modal.open())) {
				recipe.set(JSON.parse(draft));
			}
		}
	});

	function saveDraft() {
		if (browser) {
			localStorage.setItem(draftKey, JSON.stringify($recipe));
		}
	}

	onDestroy(saveDraft);

	let modal: Modal<boolean>;
</script>

<svelte:window on:beforeunload={saveDraft} />

<Modal bind:this={modal} value={false} class="p-4">
	<div class="p-2">
		You have an unsaved recipe draft <br />would you like to restore it?
	</div>
	<div class="flex justify-end pt-4 gap-4">
		<SecondaryButton on:click={() => modal.close(false)}>Discard</SecondaryButton>
		<Button on:click={() => modal.close(true)}>Restore</Button>
	</div>
</Modal>
<Steps
	class="mt-6 pb-6 mb-4 mx-4 border-b border-zinc-600"
	steps={['Header', 'Ingredients', 'Body']}
	{step}
	on:click={({ detail: newStep }) => {
		goto(`/edit/${data.recipe.id ?? 'new'}/${stepNames[newStep]}`);
	}}
/>
<slot />
