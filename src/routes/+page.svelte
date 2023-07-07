<script lang="ts">
	import DishDetails from '../components/DishDetails.svelte';
	import DishGridItem from '../components/DishGridItem.svelte';
</script>

<div class="grid grid-cols-2 gap-4 p-3">
	{#each ['morechicken.png', 'chicken.png', 'spaghetti.png', 'morechicken.png', 'chicken.png', 'spaghetti.png'] as image}
		<DishGridItem {image} />
	{/each}
	<DishDetails image="morechicken.png" />
</div>
