<script lang="ts">
	import '../app.css';
</script>

<div class="flex flex-col h-screen items-stretch font-nunito text-amber-500 text-xl">
	<div class="flex flex-col grow basis-0 bg-neutral-900 pt-6 overflow-auto">
		<div class="flex items-center gap-2 pl-2">
			<div class="h-7 w-7 rounded-full bg-amber-500" />
			Some text
		</div>
		<slot />
	</div>
	<div
		class="h-20 flex justify-around px-2 items-center bg-neutral-900 shadow-[0_0_10px_rgba(0,0,0,0.6)]"
	>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<button class="bg-muffin bg-center bg-contain w-9 h-9" />
			<span class="pt-1">Cook</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<button class="bg-heart bg-center bg-contain w-8 h-8 m-1" />
			<span class="pt-1">Liked</span>
		</div>
		<div class="flex flex-col items-center text-amber-500 text-sm">
			<button class="bg-pen bg-center bg-contain bg-no-repeat w-8 h-8 m-1" />
			<span class="pt-1">Add</span>
		</div>
		<button class="bg-muffin bg-center bg-contain w-9 h-9" />
	</div>
</div>
