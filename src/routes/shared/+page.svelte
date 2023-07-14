<script lang="ts">
	import Share from './Share.svelte';

	let shared = [{}, {}, {}, {}];
	let tapped: number | null = null;
</script>

<div class="flex flex-col p-3">
	{#each shared as share, i}
		<Share tapped={tapped === i} on:click={() => (tapped = i)} />
	{/each}
</div>
