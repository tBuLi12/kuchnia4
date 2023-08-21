<script lang="ts">
	interface $$Props {
		class?: string;
	}

	let menuIsOpen = false;
	let btn: HTMLButtonElement;
</script>

<svelte:window
	on:click={(evt) => {
		if (evt.target instanceof Node && !btn.contains(evt.target)) {
			menuIsOpen = false;
		}
	}}
/>

<button
	bind:this={btn}
	class="relative {$$props.class ?? ''}"
	on:click={() => (menuIsOpen = !menuIsOpen)}
>
	<slot name="btn" />
	{#if menuIsOpen}
		<div
			class="text-lg absolute flex flex-col mt-4 mx-3 shadow-menu rounded-lg bg-zinc-900 top-full right-0 overflow-hidden"
		>
			<slot />
		</div>
	{/if}
</button>

<style>
	div {
		box-shadow: 0 0 12px 2px rgb(0 0 0 / 0.7);
	}
</style>
