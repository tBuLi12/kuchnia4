<script lang="ts">
	import { _delete, post } from '../../../utils/post';
	import type { PageData } from './$types';
	import ListView from './ListView.svelte';

	export let data: PageData;
</script>

<ListView
	list={data.list}
	on:add={({ detail: ingredient }) => {
		post('/list', [ingredient]);
	}}
	on:remove={({ detail: ingredient }) => {
		_delete('/list', [ingredient]);
	}}
	on:update={({ detail: ingredient }) => {
		post('/list', [ingredient]);
	}}
/>
