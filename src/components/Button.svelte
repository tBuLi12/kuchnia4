<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

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
	class="bg-amber-500 hover:bg-amber-400 text-zinc-800 py-1.5 px-4 rounded-lg {classes}"
>
	<slot />
</button>
