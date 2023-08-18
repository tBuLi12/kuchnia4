<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let steps: string[];
	export let step: number;

	const dispatch = createEventDispatcher<{ click: number }>();

	interface $$Props {
		class?: string;
		steps: string[];
		step: number;
	}
</script>

<div class="flex items-center justify-center gap-8 {$$props.class ?? ''}">
	{#each steps as stepName, i}
		<div
			class="
        relative h-6 w-6 flex rounded-full
        after:absolute
        after:h-1
        after:w-14
        after:right-2
        after:top-2.5
        after:z-0
        first:after:hidden
        text-neutral-900
        {i <= step ? 'after:bg-amber-500' : 'after:bg-neutral-600'}
        "
		>
			<button
				class="
            z-10 h-full w-full flex items-center justify-center rounded-full text-base font-semibold
            {i <= step ? 'bg-amber-500' : 'bg-neutral-600 text-black'}
            "
				on:click={() => dispatch('click', i)}
			>
				{i}
			</button>
		</div>
	{/each}
</div>
