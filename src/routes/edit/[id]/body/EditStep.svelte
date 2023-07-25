<script lang="ts">
	import EditNumber from './EditNumber.svelte';
	import Number from './Number.svelte';

	export let number: number;
	export let body: string;
	export let name: string;

	let editingNumber = true;
	let textArea: HTMLTextAreaElement;
	let text: HTMLDivElement;

	$: height = text?.clientHeight;
	// text.heigh
	// let
	// $: if ()

	function grow(node: HTMLElement) {
		if (height) {
			node.style.height = `${height}px`;
			setTimeout(() => ((node.style.height = ''), node.focus()));
		}
	}
</script>

{#if editingNumber}
	<EditNumber {number} bind:name />
	<div class="text-zinc-400 px-2" bind:this={text} on:click={() => (editingNumber = false)}>
		{body || 'Click to edit directions'}
	</div>
{:else}
	<div class="content" on:click={() => (editingNumber = true)}>
		<Number {number} {name} />
	</div>
	<textarea
		class="input w-full h-36 text-zinc-200 min-w-0 transition-[height]"
		use:grow
		bind:value={body}
		bind:this={textArea}
	/>
{/if}
