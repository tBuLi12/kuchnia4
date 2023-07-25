<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<form class="flex flex-col items-center justify-center h-full gap-4" method="POST">
	Log in
	<input class="input h-12" placeholder="Email" name="email" />
	<input class="input  h-12" placeholder="Password" type="password" name="password" />
	<button type="submit">Log in</button>
	<div class="font-mono">
		{data.data}
	</div>
</form>
