<script lang="ts">
	import { post } from '../../../utils/post';
	import type { PageData } from './$types';
	import Share from './Share.svelte';
	import type { Share as ShareData } from '$lib/repository.server';
	import { toasts } from '../../../components/Toasts.svelte';

	export let data: PageData;

	let shares = data.shares;
	let tapped: ShareData | null = null;

	const processing = new WeakSet<ShareData>();

	async function accept(wasAccepted: boolean, share: ShareData) {
		processing.add(share);
		const ok = await post('/shared', { wasAccepted, recipe: share.recipeId });
		processing.delete(share);
		if (ok) {
			shares = shares.filter((s) => s !== share);
		} else {
			toasts.show(`There was an error when processing share`);
		}
	}
</script>

<div class="flex flex-col p-3">
	{#each shares as share}
		<Share
			tapped={tapped === share}
			processing={processing.has(share)}
			{share}
			on:click={() => (tapped = share)}
			on:accept={() => accept(true, share)}
			on:reject={() => accept(false, share)}
		/>
	{:else}
		<div class="text-center text-neutral-500 text-2xl py-16">Empty inbox</div>
	{/each}
</div>
