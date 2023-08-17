<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let value: string = '';

	interface $$Props extends HTMLInputAttributes {
		value?: string;
	}

	interface $$Events {
		change: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		};
		keydown: KeyboardEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		};
	}

	const classes = $$props['class'];
</script>

<input
	bind:value
	on:change
	on:keydown
	{...$$restProps}
	class="bg-transparent border min-w-0 w-full pl-2 h-10 border-amber-500/60 text-zinc-300 outline-none hover:border-amber-500/70 focus:border-amber-500 rounded-lg placeholder:text-zinc-500 {classes}"
/>
