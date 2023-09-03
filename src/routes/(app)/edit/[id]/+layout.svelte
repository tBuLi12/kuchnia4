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

	type EditedRecipe = Omit<Recipe, 'id'> & Ingredients & { id?: number };

	function isNotEmpty(recipe: EditedRecipe): boolean {
		return !!(
			recipe.body.length ||
			recipe.name ||
			recipe.description ||
			recipe.image ||
			recipe.ingredients.length ||
			recipe.tags.length
		);
	}
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
	import { setupForm } from '../../../../components/Input.svelte';

	const stepNames = ['header', 'ingredients', 'body'];
	const draftKey = 'recipe-draft';

	export let data: LayoutData;

	$: step = stepNames.findIndex((name) => $page.url.pathname.includes(name));

	const recipe = writable(data.recipe);
	setContext(recipeKey, recipe);
	setupForm();

	onMount(async () => {
		if (browser && data.recipe.id == null) {
			const draftStr = localStorage.getItem(draftKey);
			if (draftStr != null) {
				const draft: EditedRecipe = JSON.parse(draftStr);
				if (isNotEmpty(draft) && (await modal.open())) {
					recipe.set(draft);
				}
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
