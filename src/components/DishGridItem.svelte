<script lang="ts">
	export let image: string;
</script>

<div class="flex flex-col ">
	<img src={image} class="rounded-[36px]" />
	<div class="flex flex-col pl-2">
		<span>Le Chicken</span>
		<span class="text-sm text-zinc-500">30/12/2023</span>
	</div>
</div>
