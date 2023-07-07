<script lang="ts">
	export let name: string;
	export let marked: boolean;
</script>

<div
	on:click
	class="flex mx-6 px-3 items-center h-14 border-b border-zinc-600 {marked
		? 'opacity-40 line-through decoration-zinc-400'
		: ''}"
>
	<span class="mr-auto">{name}</span>
	<span class="text-stone-400">3 kg</span>
</div>
