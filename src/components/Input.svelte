<script lang="ts" context="module">
	import { getContext, setContext } from 'svelte';

	const formKey = Symbol();
	export const setupForm = () => setContext(formKey, writable(false));
	export const getFormInvalid = () => getContext<Writable<boolean>>(formKey);
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { writable, type Writable } from 'svelte/store';

	export let value: string = '';
	export let invalidHint: string | null = null;

	let dirty = false;

	const formInvalid: Writable<boolean> = getContext(formKey) ?? writable(false);

	interface $$Props extends HTMLInputAttributes {
		value?: string;
		'non-empty'?: boolean;
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
	$: invalid = $$props['non-empty'] && !value && (dirty || $formInvalid);
</script>

<div class="contents relative">
	{#if invalid && $formInvalid}
		<span class="absolute bottom-full text-red-500 text-sm">{invalidHint}</span>
	{/if}
	<input
		bind:value
		on:change
		on:change={() => (dirty = true)}
		on:keydown
		{...$$restProps}
		class="bg-transparent border min-w-0 w-full pl-2 h-10 text-zinc-300 outline-none  rounded-lg placeholder:text-zinc-500 {invalid
			? 'border-red-500/70 hover:border-red-500/80 focus:border-red-500'
			: 'border-amber-500/60 hover:border-amber-500/70 focus:border-amber-500'} {classes}"
	/>
</div>
