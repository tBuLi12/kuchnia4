<script lang="ts">
	import Input from '../../../components/Input.svelte';
	import Button from '../../../components/Button.svelte';
	import { post } from '../../../utils/post';
	import { goto } from '$app/navigation';
	import { toasts } from '../../../components/Toasts.svelte';

	let email = '';
	let password = '';
	let loading = false;

	async function logIn() {
		loading = true;
		const ok = await post('/signup', { email, password });
		loading = false;
		if (ok) {
			goto('/home');
		} else {
			toasts.show(`There was an error signing the user up`);
		}
	}
</script>

<div class="text-amber-500 text-3xl my-12 gap-4 flex flex-col items-center">Sign a user up</div>
<form
	class="flex flex-col items-center h-full gap-4 max-w-xs mx-auto"
	on:submit|preventDefault={logIn}
>
	<Input class="h-12" placeholder="Email" bind:value={email} />
	<Input class="h-12" placeholder="Password" type="password" bind:value={password} />
	<Button type="submit" class="self-end" {loading}>Sign up</Button>
</form>
