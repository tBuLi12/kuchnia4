<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export let disabled: boolean | null | undefined = undefined;

	interface $$Props extends HTMLButtonAttributes {}

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
	class="bg-neutral-800 text-amber-500 px-4 py-1.5 rounded-lg {disabled
		? 'opacity-50'
		: 'hover:bg-neutral-700'} {classes ?? ''}"
	{disabled}
>
	<slot />
</button>
