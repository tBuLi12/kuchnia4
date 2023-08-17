<script lang="ts">
	import Input from '../../../../../components/Input.svelte';

	export let number: number;
	export let name: string;
</script>

<div class="flex gap-2 items-center">
	<div
		class="h-6 w-6 flex items-center justify-center text-zinc-800 font-bold rounded-full bg-amber-500 {number >=
		10
			? 'text-sm'
			: 'text-lg'}"
	>
		{number}
	</div>
	<Input autofocus bind:value={name} placeholder="Step name" class="!w-44 h-8 border-zinc-600" />
</div>
