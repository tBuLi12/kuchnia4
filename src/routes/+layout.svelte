<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import profile from '../assets/profile.svg';
	import envelope from '../assets/envelope.png';
</script>

<div class="flex flex-col h-screen items-stretch font-nunito text-amber-500 text-xl">
	<div class="flex flex-col grow basis-0 bg-neutral-900 overflow-auto">
		{#if $page.route.id !== '/recipe/[slug]'}
			<div class="flex items-centers mt-4 px-2 justify-between">
				<div class="flex items-center gap-2">
					<div class="h-7 w-7 rounded-full bg-amber-500" />
					Some text
				</div>
				<img src={profile} class="h-6 mr-3" />
			</div>
		{/if}
		<slot />
	</div>
	<div
		class="h-20 flex justify-around px-2 items-center bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
	>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a href="/" class="bg-muffin bg-center bg-contain w-9 h-9" />
			<span class="pt-1">Cook</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a href="/list" class="bg-heart bg-center bg-contain w-8 h-8 m-1" />
			<span class="pt-1">Liked</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a href="/edit" class="bg-pen bg-center bg-contain bg-no-repeat w-8 h-8 m-1" />
			<span class="pt-1">Add</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a
				href="/edit"
				class="bg-center bg-contain bg-no-repeat w-8 h-8 m-1"
				style="background-image: url({envelope});"
			/>
			<span class="pt-1">Shared</span>
		</div>
	</div>
</div>
