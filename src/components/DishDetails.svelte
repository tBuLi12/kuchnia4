<script lang="ts">
	import clock from '../assets/clock.svg';

	export let image: string;
</script>

<div class="fixed h-2/3 w-full inset-x-0 bottom-0 shadow-xl">
	<img src={image} class="w-full bg-img" />
	<div class="w-full px-8 h-2/5 bg-neutral-800 absolute bottom-0 rounded-t-[36px]">
		<div class="flex gap-1 items-center px-1 mt-4 mb-2 pb-2 text-2xl border-b border-zinc-600">
			Le Chicken
			<img src={clock} class="ml-auto w-5" /> <span class="text-xl text-amber-600">1.5h</span>
		</div>
		<div class="px-1 text-zinc-300">chicken thighs coocked in smoky rub and maple sirup</div>
		<div class="flex my-2">
			{#each ['fast', 'dinner'] as tag}
				<div class="border border-yellow-800 rounded-full text-lg m-1 px-3 text-yellow-600">
					{tag}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.bg-img {
		box-shadow: 0 -2px 12px 4px rgb(0 0 0 / 0.5);
	}

	.bg-img {
		box-shadow: 0px 1px 1px 3px rgb(0 0 0 / 0.8);
	}
</style>
