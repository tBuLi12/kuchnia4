<script lang="ts">
	export let icon: string;

	interface $$Props {
		class?: string;
		icon: string;
	}
</script>

<div
	class="flex items-center py-2 px-4 hover:bg-zinc-800 gap-3 border-zinc-500 whitespace-nowrap {$$props.class ??
		''}"
	on:click
>
	<img class="h-6 w-6 max-w-none" src={icon} /><slot />
</div>
