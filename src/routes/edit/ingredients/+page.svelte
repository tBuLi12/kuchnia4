<script>
	import TagList from '../../../components/TagList.svelte';
	import List from '../../list/EditList.svelte';

	let tags = [
		{ name: 'fast', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false },
		{ name: 'dinner', selected: false }
	];
</script>

<div class="flex justify-center items-center p-2 text-2xl">Tags</div>
<TagList {tags} />
<div class="flex justify-center items-center p-2 text-2xl border-t border-zinc-600">
	Ingredients
</div>

<List />

<a
	class="flex justify-center items-center bg-amber-500 text-zinc-800 h-10 px-4 mr-6 mt-4 rounded-md self-end"
	href="/edit/body">Next</a
>
