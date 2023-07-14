<script lang="ts">
	import EditStep from './EditStep.svelte';
	import Number from './Number.svelte';
	import plus from '../../../assets/plus.svg';

	let steps = [{ name: 'cook it', body: 'yeah do some cooking' }];
	let editedStep: number = 0;
</script>

<div class="flex flex-col gap-2 p-3 grow">
	{#each steps as step, i}
		{#if editedStep === i}
			<EditStep number={i + 1} bind:body={step.body} bind:name={step.name} />
		{:else}
			<div class="content cursor-pointer" on:click={() => (editedStep = i)}>
				<Number number={i + 1} name={step.name} />
				<div class="text-zinc-300 px-2">{step.body}</div>
			</div>
		{/if}
	{/each}
	<button
		class="rounded-full bg-cover flex items-center justify-center h-8 w-8 self-center text-3xl"
		style="background-image: url({plus});"
		on:click={() => {
			steps.push({ body: '', name: 'new step' });
			steps = steps;
			editedStep = steps.length - 1;
		}}
	/>
	<button class="bg-amber-500 text-zinc-800 h-10 px-4 rounded-md self-end">Save</button>
</div>
