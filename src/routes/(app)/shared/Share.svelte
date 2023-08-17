<script lang="ts">
	import type { Share } from '$lib/repository.server';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '../../../components/Button.svelte';
	import SecondaryButton from '../../../components/SecondaryButton.svelte';
	import Spinner from '../../../components/Spinner.svelte';

	const dispatch = createEventDispatcher<{ reject: never; accept: never }>();

	export let share: Share;
	export let tapped: boolean;
	export let processing: boolean;
</script>

<div
	class="border-b border-zinc-600 h-32 md:h-36 relative p-2 flex {tapped ? '' : 'cursor-pointer'}"
	on:click
>
	<div class="grow flex flex-col pb-2">
		<span class="text-2xl text-amber-500 mb-auto">{share.name}</span>
		<span class="text-zinc-500">Shared by:</span>
		<span class="text-zinc-300">{share.from}</span>
	</div>
	<div class="hidden md:flex flex-col justify-around px-4">
		<button
			class="h-12 w-28 bg-amber-500 text-zinc-800 rounded-md"
			on:click={() => dispatch('accept')}>Add</button
		>
		<button class="h-12 w-28 border border-amber-500 rounded-md" on:click={() => dispatch('reject')}
			>Dismiss</button
		>
	</div>
	<img src={share.image} class="rounded-xl h-28 md:h-32" />
	{#if tapped}
		<div
			class="bg-zinc-800/80 absolute inset-0 flex justify-center gap-8 items-center md:hidden"
			transition:fade={{ duration: 70 }}
		>
			{#if processing}
				<Spinner class="w-10" />
			{:else}
				<SecondaryButton class="h-12 w-28 !bg-neutral-900" on:click={() => dispatch('reject')}
					>Dismiss</SecondaryButton
				>
				<Button class="h-12 w-28" on:click={() => dispatch('accept')}>Add</Button>
			{/if}
		</div>
	{/if}
</div>
