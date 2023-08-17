<script lang="ts">
	import { navigating } from '$app/stores';
	import '../app.css';
	import dots from '../assets/dots.svg';
</script>

<div class="flex flex-col h-screen items-stretch font-nunito text-zinc-300 bg-neutral-900 text-xl">
	<slot />
</div>
{#if $navigating}
	<div class="fixed inset-0 flex items-center justify-center z-50 bg-neutral-800/50">
		<img src={dots} class="h-12 animate-spin" />
	</div>
{/if}
