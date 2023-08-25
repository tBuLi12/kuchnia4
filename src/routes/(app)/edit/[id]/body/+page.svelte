<script lang="ts">
	import EditStep from './EditStep.svelte';
	import plus from '../../../../../assets/plus.svg';
	import { post } from '../../../../../utils/post';
	import { getRecipe } from '../+layout.svelte';
	import { goto } from '$app/navigation';
	import Button from '../../../../../components/Button.svelte';
	import { toasts } from '../../../../../components/Toasts.svelte';
	import { getFormInvalid } from '../../../../../components/Input.svelte';

	const recipe = getRecipe();
	const formInvalid = getFormInvalid();

	let loading = false;

	async function save() {
		if (!$recipe.name || !$recipe.description) {
			formInvalid.set(true);
			goto(`/edit/${$recipe.id ?? 'new'}/header`);
			return;
		}

		loading = true;
		const ok = await post('/edit', $recipe);
		loading = false;
		if (ok) {
			goto('/home');
		} else {
			toasts.show('There was an error when saving the recipe');
		}
	}
</script>

<div class="flex flex-col gap-6 px-4 grow">
	{#each $recipe.body as step, i}
		<EditStep number={i + 1} bind:body={step.body} bind:name={step.name} />
	{:else}
		<div class="text-center text-zinc-600 py-2">Click + to add steps</div>
	{/each}
	<button
		class="rounded-full bg-cover flex items-center justify-center h-8 w-8 self-center text-3xl"
		style="background-image: url({plus});"
		on:click={() => {
			$recipe.body.push({ body: '', name: '' });
			$recipe.body = $recipe.body;
		}}
	/>
	<Button {loading} class="self-end" on:click={save}>Save</Button>
</div>
