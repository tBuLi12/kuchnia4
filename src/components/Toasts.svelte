<script lang="ts" context="module">
	const { subscribe, update } = writable<{ id: Symbol; text: string }[]>([]);
	export const toasts = {
		subscribe,
		show(text: string) {
			const id = Symbol();
			update((toasts) => {
				toasts.push({ text, id });
				return toasts;
			});
			setTimeout(() => {
				update((toasts) => toasts.filter((toast) => toast.id !== id));
			}, 3000);
		}
	};
</script>

<script lang="ts">
	import { writable } from 'svelte/store';
	import { slide } from 'svelte/transition';
</script>

<div class="fixed bottom-28 z-50 left-0 right-0 pointer-events-none flex flex-col gap-4">
	{#each $toasts as { text, id } (id)}
		<div
			class="mx-8 top-10 pointer-events-auto bg-neutral-800 text-neutral-300 rounded-xl p-4"
			transition:slide
		>
			{text}
		</div>
	{/each}
</div>

<style>
	div > div {
		box-shadow: 0 0 12px 2px rgb(0 0 0 / 0.5);
	}
</style>
