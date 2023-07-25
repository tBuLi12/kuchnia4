<script lang="ts">
	import { users } from '$lib/schema';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="font-mono">
	{data.data}
</div>
