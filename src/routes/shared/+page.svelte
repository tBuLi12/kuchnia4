<script lang="ts">
	import type { PageData } from './$types';
	import Share from './Share.svelte';

	export let data: PageData;

	let shares = data.shares;
	let tapped: number | null = null;
</script>

<div class="flex flex-col p-3">
	{#each shares as share, i}
		<Share
			tapped={tapped === i}
			recipe={share.recipe}
			from={share.from.email}
			on:click={() => (tapped = i)}
		/>
	{/each}
</div>
