<script lang="ts">
	import { toasts } from '../../../components/Toasts.svelte';
	import { _delete, post } from '../../../utils/post';
	import type { PageData } from './$types';
	import ListView from './ListView.svelte';

	export let data: PageData;
</script>

<ListView
	list={data.list}
	on:add={async ({ detail: ingredient }) => {
		const ok = await post('/list', [ingredient]);
		if (!ok) {
			toasts.show(`There was an error when adding ${ingredient.name}`);
		}
	}}
	on:remove={async ({ detail: ingredient }) => {
		const ok = await _delete('/list', [ingredient]);
		if (!ok) {
			toasts.show(`There was an error when adding ${ingredient}`);
		}
	}}
	on:update={async ({ detail: ingredient }) => {
		const ok = await post('/list', [ingredient]);
		if (!ok) {
			toasts.show(`There was an error when adding ${ingredient.name}`);
		}
	}}
/>
