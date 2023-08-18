<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	type T = $$Generic;

	interface $$Props {
		value: T;
		class?: string;
	}

	export let value: T;

	let resolve: ((value: T) => void) | null = null;

	export function open(): Promise<T> {
		return new Promise((res) => (resolve = res));
	}

	export function close(provided?: T) {
		resolve?.(provided === undefined ? value : provided);
		resolve = null;
	}
</script>

{#if resolve != null}
	<div
		class="fixed z-30 h-screen w-screen bg-black/50 flex items-center justify-center"
		on:click|self={() => {
			resolve?.(value);
			resolve = null;
		}}
	>
		<div class="bg-neutral-900 text-neutral-300 rounded-lg {$$props['class']}" transition:fly>
			<slot />
		</div>
	</div>
{/if}
