<script lang="ts">
	import { page } from '$app/stores';
	import exit from '../../assets/exit.svg';
	import profile from '../../assets/profile.svg';
	import envelope from '../../assets/envelope.svg';
	import pen from '../../assets/pen.svg';
	import muffin from '../../assets/muffin.svg';
	import list from '../../assets/list.svg';
	import NavIcon from '../../components/NavIcon.svelte';
	import Menu from '../../components/Menu.svelte';
	import MenuItem from '../../components/MenuItem.svelte';
	import { post } from '../../utils/post';
	import { goto } from '$app/navigation';

	function getRouteHeader(routeId: string | null): string {
		if (!routeId) {
			return '';
		}

		if (routeId.startsWith('/(app)/home')) {
			return 'Home';
		} else if (routeId.startsWith('/(app)/list')) {
			return 'List';
		} else if (routeId.startsWith('/(app)/edit')) {
			return 'Edit';
		} else if (routeId.startsWith('/(app)/share')) {
			return 'Share';
		}
		return '';
	}

	async function logout() {
		await post('/logout', {});
		goto('/login');
	}
</script>

<div class="flex flex-col grow basis-0 overflow-auto max-w-5xl mx-auto items-stretch w-full">
	{#if $page.route.id !== '/(app)/recipe/[id]'}
		<div class="flex items-centers p-3 pl-2 justify-between">
			<div class="flex items-center gap-2">
				<div class="h-7 w-7 rounded-full bg-amber-500" />
				{getRouteHeader($page.route.id)}
			</div>
			<Menu>
				<img slot="btn" src={profile} class="h-6" />
				<MenuItem icon={exit} on:click={logout}>Log out</MenuItem>
			</Menu>
		</div>
	{/if}
	<slot />
</div>
<div
	class="h-20 flex justify-around px-2 items-center bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.6)] lg:hidden"
>
	<NavIcon icon={muffin} href="/home">Cook</NavIcon>
	<NavIcon icon={list} href="/list">List</NavIcon>
	<NavIcon icon={pen} href="/edit">Create</NavIcon>
	<NavIcon icon={envelope} href="/shared">Shared</NavIcon>
</div>
