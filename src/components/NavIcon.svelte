<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let icon: string;
</script>

<div
	class="flex flex-col items-center {$page.url.pathname.includes(href)
		? 'text-amber-500'
		: 'text-neutral-300 hover:text-neutral-200'} text-sm"
>
	<a
		{href}
		class="w-8 h-8 m-1 {$page.url.pathname.includes(href)
			? 'bg-amber-500'
			: 'bg-neutral-300 hover:text-neutral-200'}"
		style:--mask="url({icon})"
	/>
	<span class="pt-1"><slot /></span>
</div>

<style>
	a {
		mask: var(--mask) no-repeat;
		mask-size: contain;
		mask-position: center 80%;
	}
</style>
