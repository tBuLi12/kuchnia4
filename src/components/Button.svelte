<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from './Spinner.svelte';

	export let loading = false;

	interface $$Props extends HTMLButtonAttributes {
		loading?: boolean;
	}

	interface $$Events {
		click: Event & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}

	const classes = $$props['class'];
</script>

<button
	on:click
	{...$$restProps}
	class="relative flex items-center justify-center bg-amber-500 hover:bg-amber-400 py-1.5 px-4 rounded-lg {loading
		? 'text-amber-500'
		: 'text-zinc-800'} {classes}"
>
	<slot />
	{#if loading}
		<Spinner class="absolute h-7" />
	{/if}
</button>
