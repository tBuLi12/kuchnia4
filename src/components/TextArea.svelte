<script lang="ts">
	import { onMount } from 'svelte';
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

	let textArea: HTMLTextAreaElement;

	function checkSize() {
		textArea.style.height = '0px';
		Promise.resolve().then(() => {
			textArea.style.height = `${textArea.scrollHeight + 2}px`;
		});
	}

	onMount(checkSize);
</script>

<textarea
	bind:value
	on:change
	on:input={checkSize}
	on:keydown
	bind:this={textArea}
	{...$$restProps}
	class="bg-transparent border min-w-0 resize-none w-full pl-2 min-h-[4rem] py-2 border-amber-500/60 text-zinc-300 outline-none hover:border-amber-500/70 focus:border-amber-500 rounded-lg placeholder:text-zinc-500 overflow-hidden {classes}"
/>
