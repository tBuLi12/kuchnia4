<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import profile from '../assets/profile.svg';
	import envelope from '../assets/envelope.svg';
	import pen from '../assets/pen.svg';
	import muffin from '../assets/muffin.svg';
	import list from '../assets/list.svg';
</script>

<div class="flex flex-col h-screen items-stretch font-nunito text-amber-500 bg-neutral-900 text-xl">
	<div class="flex flex-col grow basis-0 overflow-auto max-w-5xl mx-auto items-stretch w-full">
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
		class="h-20 flex justify-around px-2 items-center bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.6)] lg:hidden"
	>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a
				href="/home"
				class="bg-center bg-contain bg-no-repeat w-8 h-8 m-1"
				style="background-image: url({muffin});"
			/>
			<span class="pt-1">Cook</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a
				href="/list"
				class="bg-center bg-contain bg-no-repeat w-8 h-8 m-1"
				style="background-image: url({list});"
			/>
			<span class="pt-1">List</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a
				href="/edit/header"
				class="bg-center bg-contain bg-no-repeat w-8 h-8 m-1"
				style="background-image: url({pen});"
			/>
			<span class="pt-1">Create</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<a
				href="/shared"
				class="bg-center bg-contain bg-no-repeat w-8 h-8 m-1"
				style="background-image: url({envelope});"
			/>
			<span class="pt-1">Shared</span>
		</div>
	</div>
</div>
