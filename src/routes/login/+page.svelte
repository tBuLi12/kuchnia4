<script lang="ts">
	import Input from '../../components/Input.svelte';
	import muffin from '../../assets/muffin.svg';
	import Button from '../../components/Button.svelte';
	import { post } from '../../utils/post';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let message: string | null = null;
	let loading = false;

	async function logIn() {
		if (!email) {
			message = 'Please enter an email';
			return;
		}

		if (!password) {
			message = 'Please enter a password';
			return;
		}

		message = null;
		loading = true;
		const ok = await post('/login', {
			email,
			password,
			client: import.meta.env.VITE_SK_ADAPTER === 'static' ? 'mobile' : 'web'
		});
		loading = false;
		if (ok) {
			goto('/home');
		} else {
			message = 'invalid credentials';
		}
	}
</script>

<div class="text-amber-500 text-3xl my-12 gap-4 flex flex-col items-center">
	<img src={muffin} class="w-14" />
	Log into the kitchen
</div>
<form
	class="flex flex-col items-center h-full gap-4 max-w-xs mx-auto"
	on:submit|preventDefault={logIn}
>
	<Input non-empty class="h-12" placeholder="Email" bind:value={email} />
	<Input non-empty class="h-12" placeholder="Password" type="password" bind:value={password} />
	<Button type="submit" class="self-end" {loading}>Log in</Button>
	{#if message != null}
		{message}
	{/if}
</form>
