<script lang="ts">
	import TextArea from '../../../../../components/TextArea.svelte';
	import EditNumber from './EditNumber.svelte';

	export let number: number;
	export let body: string;
	export let name: string;
</script>

<div class="px-2 flex flex-col gap-2">
	<EditNumber {number} bind:name />
	<TextArea bind:value={body} placeholder="Instructions" class="min-h-[6rem] border-zinc-600" />
</div>
