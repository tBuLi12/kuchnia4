<script lang="ts">
	import DishDetails from '../../../../components/DishDetails.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<DishDetails recipe={data.recipes[data.index]} />
