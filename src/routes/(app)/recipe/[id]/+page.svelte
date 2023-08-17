<script lang="ts">
	import Number from '../../edit/[id]/body/Number.svelte';
	import type { PageData } from './$types';
	import menu from '../../../../assets/menu.svg';
	import bin from '../../../../assets/bin.svg';
	import envelope from '../../../../assets/envelope.svg';
	import pen from '../../../../assets/pen.svg';
	import SelectList from '../../list/SelectList.svelte';
	import Modal from '../../../../components/Modal.svelte';
	import { _delete, post } from '../../../../utils/post';
	import Button from '../../../../components/Button.svelte';
	import SecondaryButton from '../../../../components/SecondaryButton.svelte';
	import Input from '../../../../components/Input.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const recipe = data.recipe;

	let menuIsOpen = false;
	let deleteModal: Modal<boolean>;
	let shareModal: Modal<string>;
	let selectedIngredients = new Set<string>();
	let servingsInput: number | null = 1;
	let servings: number;
	$: servings = servingsInput ?? servings;

	let adding = false;

	async function addSelectedToList() {
		adding = true;
		const ok = await post(
			'/list',
			recipe.ingredients.filter((i) => selectedIngredients.has(i.name))
		);
		adding = false;
	}

	function changeServings(difference: number) {
		if (servingsInput != null) {
			servingsInput += difference;
		}
	}

	let email: string;
</script>

<Modal bind:this={deleteModal} value={false} class="p-4"
	><div class="text-center p-2">
		Are you sure you want to <br /> delete this recipe?
	</div>
	<div class="flex justify-end pt-4 gap-4">
		<SecondaryButton on:click={() => deleteModal.close(false)}>Cancel</SecondaryButton>
		<Button on:click={() => deleteModal.close(true)}>Delete</Button>
	</div>
</Modal>
<Modal bind:this={shareModal} value="" class="p-4 max-w-xs"
	><div class="text-center p-2">
		Share recipe
		<Input bind:value={email} placeholder="Email" class="mt-2" />
	</div>
	<div class="flex justify-end pt-4 gap-4">
		<SecondaryButton on:click={() => shareModal.close()}>Cancel</SecondaryButton>
		<Button on:click={() => shareModal.close(email)}>Share</Button>
	</div>
</Modal>
<div class="flex flex-col h-full overflow-auto">
	<div
		style="background-image: url({recipe.image});"
		class="relative flex items-start bg-cover bg-center min-h-[10rem] after:shadow-main-img2 after:absolute after:content-[''] after:inset-0"
	>
		<div class="relative z-20 flex items-center justify-between w-full text-neutral-200 pt-1 px-2">
			<span class="flex items-center gap-2 text-2xl drop">
				<div class="h-6 w-6 rounded-full bg-amber-500" />
				{recipe.name}
			</span>
			<button class="p-2" on:click={() => (menuIsOpen = !menuIsOpen)}
				><img class="h-6 w-6" src={menu} /></button
			>
			{#if menuIsOpen}
				<div
					class="text-lg absolute flex flex-col mt-4 mx-3 shadow-menu rounded-lg bg-zinc-900 top-full right-0 overflow-hidden"
				>
					<!-- {#if recipe.isOwned}
						<a href="/edit/{recipe.id}/header" class="py-1 border-b border-zinc-500">Edit recipe</a>
						<button class="py-1 text-red-600">Delete recipe</button>
					{/if} -->

					<button
						class="flex items-center py-2 px-4 hover:bg-zinc-800 gap-3 border-zinc-500"
						on:click={async () => await shareModal.open()}
						><img class="h-6 w-6" src={envelope} />Share</button
					>
					<button
						class="flex items-center py-2 px-4 hover:bg-zinc-800 gap-3 border-zinc-500"
						on:click={() => goto(`/edit/${recipe.id}/header`)}
						><img class="h-6 w-6" src={pen} />Edit</button
					>
					<button
						class="flex items-center py-2 px-4 hover:bg-zinc-800 text-red-600 gap-3 border-zinc-500"
						on:click={async () => (await deleteModal.open()) && (await _delete('/edit', {}))}
						><img class="h-6 w-6" src={bin} />Delete</button
					>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex flex-col border-t border-zinc-700">
		<div class="flex justify-center items-center text-2xl p-2 pt-4">Ingredients</div>
		<SelectList
			multiplier={servings}
			items={recipe.ingredients}
			bind:marked={selectedIngredients}
		/>
		<div class="flex justify-between items-center px-8 py-4">
			<div class="flex flex-col items-stretch w-24 -mt-1 gap-1">
				<span class="text-zinc-500 text-lg text-center">servings</span>
				<div class="flex bg-amber-500/80 rounded-md">
					<button
						class="basis-0 text-center text-2xl font-bold grow text-zinc-800"
						on:click={() => changeServings(-1)}>-</button
					>
					<input
						class="outline-none basis-0 text-center bg-neutral-900 grow border border-amber-500/80 px-2 min-w-0 text-zinc-300"
						bind:value={servingsInput}
						type="number"
						min="1"
						max="99"
					/>
					<button
						class="basis-0 text-center text-2xl font-bold grow text-zinc-800"
						on:click={() => changeServings(1)}>+</button
					>
				</div>
			</div>
			<SecondaryButton class="text-md" disabled={!selectedIngredients.size}>
				add selected to<br />shopping list
			</SecondaryButton>
		</div>
	</div>
	<div class="border-t border-zinc-700">
		<span class="flex justify-center items-center text-2xl p-2 pt-4">Directions</span>
		<div class="p-4 flex flex-col gap-4">
			{#each recipe.body as body, i}
				<div>
					<Number number={i + 1} name={body.name} />
					<div class="text-zinc-200 px-4">
						{body.body}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.after\:shadow-main-img2 {
		box-shadow: inset 0 -8px 8px -4px rgb(0 0 0 / 0.8),
			inset 0 calc(8px + 3.5rem) 20px -4px rgb(0 0 0 / 0.85);
	}

	.shadow-menu {
		box-shadow: 0 0 32px 4px rgb(0 0 0 / 0.8);
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
